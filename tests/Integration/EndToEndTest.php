<?php

declare(strict_types=1);

namespace TheCodingMachine\GraphQLite\Integration;

use GraphQL\Error\DebugFlag;
use GraphQL\GraphQL;
use GraphQL\Server\Helper;
use GraphQL\Server\OperationParams;
use GraphQL\Server\ServerConfig;
use Psr\Container\ContainerInterface;
use stdClass;
use Symfony\Component\Cache\Adapter\ArrayAdapter;
use Symfony\Component\Cache\Psr16Cache;
use TheCodingMachine\GraphQLite\Containers\BasicAutoWiringContainer;
use TheCodingMachine\GraphQLite\Containers\EmptyContainer;
use TheCodingMachine\GraphQLite\Context\Context;
use TheCodingMachine\GraphQLite\Exceptions\WebonyxErrorHandler;
use TheCodingMachine\GraphQLite\FieldsBuilder;
use TheCodingMachine\GraphQLite\Fixtures\Inputs\ValidationException;
use TheCodingMachine\GraphQLite\Fixtures\Inputs\Validator;
use TheCodingMachine\GraphQLite\Fixtures\Integration\Models\Color;
use TheCodingMachine\GraphQLite\Fixtures\Integration\Models\Position;
use TheCodingMachine\GraphQLite\Fixtures\Integration\Models\Size;
use TheCodingMachine\GraphQLite\GraphQLRuntimeException;
use TheCodingMachine\GraphQLite\InputTypeGenerator;
use TheCodingMachine\GraphQLite\InputTypeUtils;
use TheCodingMachine\GraphQLite\Loggers\ExceptionLogger;
use TheCodingMachine\GraphQLite\Mappers\CannotMapTypeException;
use TheCodingMachine\GraphQLite\Middlewares\MissingAuthorizationException;
use TheCodingMachine\GraphQLite\Schema;
use TheCodingMachine\GraphQLite\SchemaFactory;
use TheCodingMachine\GraphQLite\Security\AuthenticationServiceInterface;
use TheCodingMachine\GraphQLite\Security\AuthorizationServiceInterface;
use TheCodingMachine\GraphQLite\Security\VoidAuthenticationService;
use TheCodingMachine\GraphQLite\TypeMismatchRuntimeException;
use TheCodingMachine\GraphQLite\Utils\AccessPropertyException;
use function array_filter;
use function assert;
use function count;
use function in_array;
use function json_encode;
use const JSON_PRETTY_PRINT;

class EndToEndTest extends IntegrationTestCase
{
    public function testEndToEnd(): void
    {
        $schema = $this->mainContainer->get(Schema::class);
        assert($schema instanceof Schema);

        $schema->assertValid();

        $queryString = '
        query {
            contacts {
                name
                company
                uppercaseName
                repeatName(prefix:"foo", suffix:"bar")
                repeatInnerName
                ... on User {
                    email
                }
            }
        }
        ';

        $result = GraphQL::executeQuery(
            $schema,
            $queryString,
            null,
            new Context(),
        );

        $this->assertSame([
            'contacts' => [
                [
                    'name' => 'Joe',
                    'company' => 'Joe Ltd',
                    'uppercaseName' => 'JOE',
                    'repeatName' => 'fooJoebar',
                    'repeatInnerName' => 'Joe',
                ],
                [
                    'name' => 'Bill',
                    'company' => 'Bill Ltd',
                    'uppercaseName' => 'BILL',
                    'repeatName' => 'fooBillbar',
                    'repeatInnerName' => 'Bill',
                    'email' => 'bill@example.com',
                ],

            ],
        ], $this->getSuccessResult($result));

        // Let's redo this to test cache.
        $result = GraphQL::executeQuery(
            $schema,
            $queryString,
            null,
            new Context(),
        );

        $this->assertSame([
            'contacts' => [
                [
                    'name' => 'Joe',
                    'company' => 'Joe Ltd',
                    'uppercaseName' => 'JOE',
                    'repeatName' => 'fooJoebar',
                    'repeatInnerName' => 'Joe',
                ],
                [
                    'name' => 'Bill',
                    'company' => 'Bill Ltd',
                    'uppercaseName' => 'BILL',
                    'repeatName' => 'fooBillbar',
                    'repeatInnerName' => 'Bill',
                    'email' => 'bill@example.com',
                ],

            ],
        ], $this->getSuccessResult($result));
    }

    public function testBatchPrefetching(): void
    {
        $schema = $this->mainContainer->get(Schema::class);
        assert($schema instanceof Schema);

        $schema->assertValid();

        $queryContact = 'query { contact (name: "Joe") { name  posts { id  title } } } ';
        $queryCompanyWithContact = 'query { company (id: "1"){ name contact  { name  posts { id  title } } } } ';

        $config = ServerConfig::create(
            [
                'schema' => $schema,
                'context' => new Context(),
                'queryBatching' => true,
                'errorFormatter' => [WebonyxErrorHandler::class, 'errorFormatter'],
                'errorsHandler' => [WebonyxErrorHandler::class, 'errorHandler'],
            ]
        );

        $result = (new Helper())->executeBatch(
            $config,
            [
                /** Set specific prefetch result to buffer */
                OperationParams::create(['query' => $queryContact]),
                /** Use prefetch data from previous operation instead of getting specific prefetch */
                OperationParams::create(['query' => $queryCompanyWithContact]),
            ]
        );

        $this->assertSame(
            [
                'contact' => [
                    'name' => 'Joe',
                    'posts' => [
                        [
                            'id' => 1,
                            'title' => 'First Joe post',
                        ],
                    ],
                ],
            ],
            $this->getSuccessResult($result[0])
        );

        $this->assertSame(
            [
                'company' => [
                    'name' => 'Company',
                    'contact' => [
                        'name' => 'Kate',
                        'posts' => [
                            [
                                'id' => 3,
                                'title' => 'First Kate post',
                            ],
                        ],
                    ],
                ],
            ],
            $this->getSuccessResult($result[1])
        );
    }

    public function testDeprecatedField(): void
    {
        $schema = $this->mainContainer->get(Schema::class);
        assert($schema instanceof Schema);

        $schema->assertValid();

        $queryString = '
        query {
            contacts {
                name
                uppercaseName
                deprecatedUppercaseName
                deprecatedName
            }
        }
        ';

        $result = GraphQL::executeQuery(
            $schema,
            $queryString,
            null,
            new Context(),
        );

        $this->assertSame([
            'contacts' => [
                [
                    'name' => 'Joe',
                    'uppercaseName' => 'JOE',
                    'deprecatedUppercaseName' => 'JOE',
                    'deprecatedName' => 'Joe',
                ],
                [
                    'name' => 'Bill',
                    'uppercaseName' => 'BILL',
                    'deprecatedUppercaseName' => 'BILL',
                    'deprecatedName' => 'Bill',
                ],

            ],
        ], $this->getSuccessResult($result));

        // Let's introspect to see if the field is marked as deprecated
        // in the resulting GraphQL schema
        $queryString = '
            query deprecatedField {
              __type(name: "Contact") {
                fields(includeDeprecated: true) {
                  name
                  isDeprecated
                  deprecationReason
                }
              }
            }
        ';

        $result = GraphQL::executeQuery(
            $schema,
            $queryString,
            null,
            new Context(),
        );

        $fields = $this->getSuccessResult($result)['__type']['fields'];
        $deprecatedFields = [
            'deprecatedUppercaseName',
            'deprecatedName',
        ];
        $fields = array_filter($fields, static function ($field) use ($deprecatedFields) {
            if (in_array($field['name'], $deprecatedFields)) {
                return true;
            }
            return false;
        });
        $this->assertCount(
            count($deprecatedFields),
            $fields,
            'Missing deprecated fields on GraphQL Schema',
        );
        foreach ($fields as $field) {
            $this->assertTrue(
                $field['isDeprecated'],
                'Field ' . $field['name'] . ' must be marked deprecated, but is not',
            );
            $this->assertStringContainsString(
                'use field ',
                $field['deprecationReason'],
                'Field ' . $field['name'] . ' is misssing a deprecation reason',
            );
        }
    }

    public function testPrefetchException(): void
    {
        $schema = $this->mainContainer->get(Schema::class);
        assert($schema instanceof Schema);

        $schema->assertValid();

        $queryString = '
        query {
            contacts {
                name
                company
                uppercaseName
                repeatName(prefix:"foo", suffix:"bar")
                repeatInnerName
                ... on User {
                    email
                }
            }
        }
        ';

        $result = GraphQL::executeQuery(
            $schema,
            $queryString,
        );

        $this->expectException(GraphQLRuntimeException::class);
        $this->expectExceptionMessage('When using "prefetch", you should ensure that the GraphQL execution "context" (passed to the GraphQL::executeQuery method) is an instance of \\TheCodingMachine\\GraphQLite\\Context');
        $result->toArray(DebugFlag::RETHROW_INTERNAL_EXCEPTIONS);
    }

    public function testEndToEndInputTypeDate(): void
    {
        $schema = $this->mainContainer->get(Schema::class);
        assert($schema instanceof Schema);
        $queryString = '
        mutation {
          saveBirthDate(birthDate: "1942-12-24T00:00:00+00:00")  {
            name
            birthDate
          }
        }
        ';

        $result = GraphQL::executeQuery(
            $schema,
            $queryString,
        );

        $this->assertSame([
            'saveBirthDate' => [
                'name' => 'Bill',
                'birthDate' => '1942-12-24T00:00:00+00:00',
            ],
        ], $this->getSuccessResult($result));
    }

    public function testEndToEndInputTypeDateAsParam(): void
    {
        $schema = $this->mainContainer->get(Schema::class);
        assert($schema instanceof Schema);
        $queryString = '
        mutation($birthDate: DateTime!) {
          saveBirthDate(birthDate: $birthDate) {
            name
            birthDate
          }
        }
        ';

        $result = GraphQL::executeQuery(
            $schema,
            $queryString,
            null,
            null,
            ['birthDate' => '1942-12-24T00:00:00+00:00'],
        );

        $this->assertSame([
            'saveBirthDate' => [
                'name' => 'Bill',
                'birthDate' => '1942-12-24T00:00:00+00:00',
            ],
        ], $this->getSuccessResult($result));
    }

    public function testEndToEndInputType(): void
    {
        $schema = $this->mainContainer->get(Schema::class);
        assert($schema instanceof Schema);
        $queryString = '
        mutation {
          saveContact(
            contact: {
                name: "foo",
                birthDate: "1942-12-24T00:00:00+00:00",
                relations: [
                    {
                        name: "bar"
                    }
                ]
            }
          ) {
            name,
            birthDate,
            relations {
              name
            }
          }
        }
        ';

        $result = GraphQL::executeQuery(
            $schema,
            $queryString,
        );

        $this->assertSame([
            'saveContact' => [
                'name' => 'foo',
                'birthDate' => '1942-12-24T00:00:00+00:00',
                'relations' => [
                    ['name' => 'bar'],
                ],
            ],
        ], $this->getSuccessResult($result));
    }

    public function testEndToEndPorpaginas(): void
    {
        $schema = $this->mainContainer->get(Schema::class);
        assert($schema instanceof Schema);

        $queryString = '
        query {
            contactsIterator {
                items(limit: 1, offset: 1) {
                    name
                    uppercaseName
                    ... on User {
                        email
                    }
                }
                count
            }
        }
        ';

        $result = GraphQL::executeQuery(
            $schema,
            $queryString,
        );

        $this->assertSame([
            'contactsIterator' => [
                'items' => [
                    [
                        'name' => 'Bill',
                        'uppercaseName' => 'BILL',
                        'email' => 'bill@example.com',
                    ],
                ],
                'count' => 2,
            ],
        ], $this->getSuccessResult($result));

        // Let's redo this to test cache.
        $result = GraphQL::executeQuery(
            $schema,
            $queryString,
        );

        $this->assertSame([
            'contactsIterator' => [
                'items' => [
                    [
                        'name' => 'Bill',
                        'uppercaseName' => 'BILL',
                        'email' => 'bill@example.com',
                    ],
                ],
                'count' => 2,
            ],
        ], $this->getSuccessResult($result));

        // Let's run a query with no limit but an offset
        $invalidQueryString = '
        query {
            contactsIterator {
                items(offset: 1) {
                    name
                    ... on User {
                        email
                    }
                }
                count
            }
        }
        ';

        $result = GraphQL::executeQuery(
            $schema,
            $invalidQueryString,
        );

        $this->assertSame('In the items field of a result set, you cannot add a "offset" without also adding a "limit"', $result->toArray(DebugFlag::RETHROW_UNSAFE_EXCEPTIONS)['errors'][0]['message']);

        // Let's run a query with no limit offset
        $invalidQueryString = '
        query {
            contactsIterator {
                items {
                    name
                    ... on User {
                        email
                    }
                }
                count
            }
        }
        ';

        $result = GraphQL::executeQuery(
            $schema,
            $invalidQueryString,
        );

        $this->assertSame([
            'contactsIterator' => [
                'items' => [
                    ['name' => 'Joe'],
                    [
                        'name' => 'Bill',
                        'email' => 'bill@example.com',
                    ],
                ],
                'count' => 2,
            ],
        ], $this->getSuccessResult($result));
    }

    public function testEndToEndPorpaginasOnScalarType(): void
    {
        $schema = $this->mainContainer->get(Schema::class);
        assert($schema instanceof Schema);

        $queryString = '
        query {
            contactsNamesIterator {
                items(limit: 1, offset: 1)
                count
            }
        }
        ';

        $result = GraphQL::executeQuery(
            $schema,
            $queryString,
        );

        $this->assertSame([
            'contactsNamesIterator' => [
                'items' => ['Bill'],
                'count' => 2,
            ],
        ], $this->getSuccessResult($result));
    }

    /**
     * This tests is used to be sure that the PorpaginasIterator types are not mixed up when cached (because it has a subtype)
     */
    public function testEndToEnd2Iterators(): void
    {
        $schema = $this->mainContainer->get(Schema::class);
        assert($schema instanceof Schema);

        $queryString = '
        query {
            contactsIterator {
                items(limit: 1, offset: 1) {
                    name
                    uppercaseName
                    ... on User {
                        email
                    }
                }
                count
            }
            products {
                items {
                    name
                    price
                    unauthorized
                }
                count
            }
        }
        ';

        $result = GraphQL::executeQuery(
            $schema,
            $queryString,
        );

        $this->assertSame([
            'contactsIterator' => [
                'items' => [
                    [
                        'name' => 'Bill',
                        'uppercaseName' => 'BILL',
                        'email' => 'bill@example.com',
                    ],
                ],
                'count' => 2,
            ],
            'products' => [
                'items' => [
                    [
                        'name' => 'Foo',
                        'price' => 42.0,
                        'unauthorized' => null,
                    ],
                ],
                'count' => 1,
            ],
        ], $this->getSuccessResult($result));
    }

    public function testEndToEndStaticFactories(): void
    {
        $schema = $this->mainContainer->get(Schema::class);
        assert($schema instanceof Schema);

        $queryString = '
        query {
            echoFilters(filter: {values: ["foo", "bar"], moreValues: [12, 42], evenMoreValues: [62]})
        }
        ';

        $result = GraphQL::executeQuery(
            $schema,
            $queryString,
        );

        $this->assertSame([
            'echoFilters' => ['foo', 'bar', '12', '42', '62'],
        ], $this->getSuccessResult($result));

        // Call again to test ClassFinderTypeMapper cache
        $result = GraphQL::executeQuery(
            $schema,
            $queryString,
        );

        $this->assertSame([
            'echoFilters' => ['foo', 'bar', '12', '42', '62'],
        ], $this->getSuccessResult($result));
    }

    public function testNonNullableTypesWithOptionnalFactoryArguments(): void
    {
        $schema = $this->mainContainer->get(Schema::class);
        assert($schema instanceof Schema);

        $queryString = '
        query {
            echoFilters
        }
        ';

        $result = GraphQL::executeQuery(
            $schema,
            $queryString,
        );

        $this->assertSame([
            'echoFilters' => [],
        ], $this->getSuccessResult($result));
    }

    public function testNullableTypesWithOptionnalFactoryArguments(): void
    {
        $schema = $this->mainContainer->get(Schema::class);
        assert($schema instanceof Schema);

        $queryString = '
        query {
            echoNullableFilters
        }
        ';

        $result = GraphQL::executeQuery(
            $schema,
            $queryString,
        );

        $this->assertSame(['echoNullableFilters' => null], $this->getSuccessResult($result));
    }

    public function testEndToEndResolveInfo(): void
    {
        $schema = $this->mainContainer->get(Schema::class);
        assert($schema instanceof Schema);

        $queryString = '
        query {
            echoResolveInfo
        }
        ';

        $result = GraphQL::executeQuery(
            $schema,
            $queryString,
        );

        $this->assertSame(['echoResolveInfo' => 'echoResolveInfo'], $this->getSuccessResult($result));
    }

    public function testEndToEndRightIssues(): void
    {
        $schema = $this->mainContainer->get(Schema::class);
        assert($schema instanceof Schema);

        $queryString = '
        query {
            contacts {
                name
                onlyLogged
                secret
            }
        }
        ';

        $result = GraphQL::executeQuery(
            $schema,
            $queryString,
        );

        $this->assertSame('You need to be logged to access this field', $result->toArray(DebugFlag::RETHROW_UNSAFE_EXCEPTIONS)['errors'][0]['message']);

        $queryString = '
        query {
            contacts {
                name
                forLogged
            }
        }
        ';

        $result = GraphQL::executeQuery(
            $schema,
            $queryString,
        );

        $this->assertSame('You need to be logged to access this field', $result->toArray(DebugFlag::RETHROW_UNSAFE_EXCEPTIONS)['errors'][0]['message']);

        $queryString = '
        query {
            contacts {
                secret
            }
        }
        ';

        $result = GraphQL::executeQuery(
            $schema,
            $queryString,
        );

        $this->assertSame('You do not have sufficient rights to access this field', $result->toArray(DebugFlag::RETHROW_UNSAFE_EXCEPTIONS)['errors'][0]['message']);

        $queryString = '
        query {
            contacts {
                withRight
            }
        }
        ';

        $result = GraphQL::executeQuery(
            $schema,
            $queryString,
        );

        $this->assertSame('You do not have sufficient rights to access this field', $result->toArray(DebugFlag::RETHROW_UNSAFE_EXCEPTIONS)['errors'][0]['message']);

        $queryString = '
        query {
            contacts {
                name
                hidden
            }
        }
        ';

        $result = GraphQL::executeQuery(
            $schema,
            $queryString,
        );

        $this->assertSame('Cannot query field "hidden" on type "ContactInterface".', $result->toArray(DebugFlag::RETHROW_UNSAFE_EXCEPTIONS)['errors'][0]['message']);
    }

    public function testAutowireService(): void
    {
        $schema = $this->mainContainer->get(Schema::class);
        assert($schema instanceof Schema);

        $queryString = '
        query {
            contacts {
                injectService
            }
        }
        ';

        $result = GraphQL::executeQuery(
            $schema,
            $queryString,
        );

        $this->assertSame([
            'contacts' => [
                ['injectService' => 'OK'],
                ['injectService' => 'OK'],

            ],
        ], $this->getSuccessResult($result));
    }

    public function testParameterAnnotationsInSourceField(): void
    {
        $schema = $this->mainContainer->get(Schema::class);
        assert($schema instanceof Schema);

        $queryString = '
        query {
            contacts {
                injectServiceFromExternal
            }
        }
        ';

        $result = GraphQL::executeQuery(
            $schema,
            $queryString,
        );

        $this->assertSame([
            'contacts' => [
                ['injectServiceFromExternal' => 'OK'],
                ['injectServiceFromExternal' => 'OK'],

            ],
        ], $this->getSuccessResult($result));
    }

    public function testEndToEndEnums(): void
    {
        $schema = $this->mainContainer->get(Schema::class);
        assert($schema instanceof Schema);

        $queryString = '
        query {
            echoProductType(productType: NON_FOOD)
        }
        ';

        $result = GraphQL::executeQuery(
            $schema,
            $queryString,
        );

        $this->assertSame(['echoProductType' => 'NON_FOOD'], $this->getSuccessResult($result));
    }

    public function testEndToEndEnums2(): void
    {
        $schema = $this->mainContainer->get(Schema::class);
        assert($schema instanceof Schema);

        $queryString = '
        query {
            echoSomeProductType
        }
        ';

        $result = GraphQL::executeQuery(
            $schema,
            $queryString,
        );

        $this->assertSame(['echoSomeProductType' => 'FOOD'], $this->getSuccessResult($result));
    }

    public function testEndToEndEnums3(): void
    {
        $schema = $this->mainContainer->get(Schema::class);
        assert($schema instanceof Schema);

        $queryString = '
        query echo($productType: ProductTypes!) {
            echoProductType(productType: $productType)
        }
        ';

        $variables = ['productType' => 'NON_FOOD'];

        $result = GraphQL::executeQuery(
            $schema,
            $queryString,
            null,
            null,
            $variables,
        );

        $this->assertSame(['echoProductType' => 'NON_FOOD'], $this->getSuccessResult($result));
    }

    public function testEndToEndMutationNativeEnums(): void
    {
        $schema = $this->mainContainer->get(Schema::class);
        assert($schema instanceof Schema);

        $gql = '
        mutation($size:Size!) {
            singleEnum(size: $size)
        }
        ';
        $result = GraphQL::executeQuery(
            $schema,
            $gql,
            variableValues: [
                'size' => Size::L->name,
            ],
        );

        $this->assertSame([
            'singleEnum' => 'L',
        ], $this->getSuccessResult($result));
    }

    public function testEndToEndInputVars(): void
    {
        $schema = $this->mainContainer->get(Schema::class);
        assert($schema instanceof Schema);

        $queryString = '
            mutation ($contact: ContactInput!) {
                saveContact(contact: $contact) {
                    name,
                    birthDate
                }
            }
        ';

        $result = GraphQL::executeQuery(
            $schema,
            $queryString,
            variableValues: [
                'contact' => [
                    'name' => "foo",
                    'birthDate' => "1942-12-24T00:00:00+00:00"
                ]
            ]
        );

        $this->assertSame([
            'saveContact' => [
                'name' => 'foo',
                'birthDate' => '1942-12-24T00:00:00+00:00'
            ],
        ], $this->getSuccessResult($result));
    }

    public function testEndToEndNativeEnums(): void
    {
        $schema = $this->mainContainer->get(Schema::class);
        assert($schema instanceof Schema);

        $gql = '
            query {
                button(color: red, size: M, state: Off) {
                    color
                    size
                    state
                }
            }
        ';

        $result = GraphQL::executeQuery(
            $schema,
            $gql,
        );

        $this->assertSame([
            'button' => [
                'color' => 'red',
                'size' => 'M',
                'state' => 'Off',
            ],
        ], $this->getSuccessResult($result));

        $gql = '
            mutation($color:Color!,$size:Size!,$state:Position!) {
                updateButton(color: $color, size: $size, state: $state) {
                    color
                    size
                    state
                }
            }
        ';

        $result = GraphQL::executeQuery(
            $schema,
            $gql,
            variableValues: [
                'color' => Color::Red->value,
                'size' => Size::M->name,
                'state' => Position::Off->name,
            ],
        );
        $this->assertSame([
            'updateButton' => [
                'color' => 'red',
                'size' => 'M',
                'state' => 'Off',
            ],
        ], $this->getSuccessResult($result));

        $gql = '
            mutation($size:Size!) {
                singleEnum(size: $size)
            }
        ';

        $result = GraphQL::executeQuery(
            $schema,
            $gql,
            variableValues: [
                'size' => Size::L->name,
            ],
        );
        $this->assertSame([
            'singleEnum' => 'L',
        ], $this->getSuccessResult($result));
    }

    public function testEndToEndDateTime(): void
    {
        $schema = $this->mainContainer->get(Schema::class);
        assert($schema instanceof Schema);

        $queryString = '
        query {
            echoDate(date: "2019-05-05T01:02:03+00:00")
        }
        ';

        $result = GraphQL::executeQuery(
            $schema,
            $queryString,
        );

        $this->assertSame(['echoDate' => '2019-05-05T01:02:03+00:00'], $this->getSuccessResult($result));
    }

    public function testEndToEndErrorHandlingOfInconstentTypesInArrays(): void
    {
        $schema = $this->mainContainer->get(Schema::class);
        assert($schema instanceof Schema);

        $queryString = '
        query {
            productsBadType {
                name
            }
        }
        ';

        $result = GraphQL::executeQuery(
            $schema,
            $queryString,
        );

        $this->expectException(TypeMismatchRuntimeException::class);
        $this->expectExceptionMessage('In TheCodingMachine\\GraphQLite\\Fixtures\\Integration\\Controllers\\ProductController::getProductsBadType() (declaring field "productsBadType"): Expected resolved value to be an object but got "array"');
        $result->toArray(DebugFlag::RETHROW_INTERNAL_EXCEPTIONS);
    }

    public function testEndToEndNonDefaultOutputType(): void
    {
        $schema = $this->mainContainer->get(Schema::class);
        assert($schema instanceof Schema);

        $queryString = '
        query {
            otherContact {
                name
                fullName
                phone
            }
        }
        ';

        $result = GraphQL::executeQuery(
            $schema,
            $queryString,
        );

        $this->assertSame([
            'otherContact' => [
                'name' => 'Joe',
                'fullName' => 'JOE',
                'phone' => '0123456789',
            ],
        ], $this->getSuccessResult($result));
    }

    public function testEndToEndSecurityAnnotation(): void
    {
        $schema = $this->mainContainer->get(Schema::class);
        assert($schema instanceof Schema);

        $queryString = '
        query {
            secretPhrase(secret: "foo")
        }
        ';

        $result = GraphQL::executeQuery(
            $schema,
            $queryString,
        );

        $this->assertSame(['secretPhrase' => 'you can see this secret only if passed parameter is "foo"'], $this->getSuccessResult($result));

        $queryString = '
        query {
            secretPhrase(secret: "bar")
        }
        ';

        $result = GraphQL::executeQuery(
            $schema,
            $queryString,
        );

        $this->expectException(MissingAuthorizationException::class);
        $this->expectExceptionMessage('Wrong secret passed');
        $result->toArray(DebugFlag::RETHROW_INTERNAL_EXCEPTIONS);
    }

    public function testEndToEndSecurityFailWithAnnotation(): void
    {
        $schema = $this->mainContainer->get(Schema::class);
        assert($schema instanceof Schema);

        // Test with failWith attribute
        $queryString = '
        query {
            nullableSecretPhrase(secret: "bar")
        }
        ';

        $result = GraphQL::executeQuery(
            $schema,
            $queryString,
        );

        $this->assertSame(['nullableSecretPhrase' => null], $this->getSuccessResult($result));

        // Test with @FailWith annotation
        $queryString = '
        query {
            nullableSecretPhrase2(secret: "bar")
        }
        ';

        $result = GraphQL::executeQuery(
            $schema,
            $queryString,
        );

        $this->assertSame(['nullableSecretPhrase2' => null], $this->getSuccessResult($result));

        // Test with @FailWith annotation on property
        $queryString = '
        query {
            contacts {
              failWithNull
            }
        }
        ';

        $result = GraphQL::executeQuery(
            $schema,
            $queryString,
        );

        $data = $this->getSuccessResult($result);
        $this->assertSame(null, $data['contacts'][0]['failWithNull']);
    }

    public function testEndToEndSecurityWithUser(): void
    {
        $schema = $this->mainContainer->get(Schema::class);
        assert($schema instanceof Schema);

        // Test with failWith attribute
        $queryString = '
        query {
            secretUsingUser
        }
        ';

        $result = GraphQL::executeQuery(
            $schema,
            $queryString,
        );

        $this->assertSame('Access denied.', $result->toArray(DebugFlag::RETHROW_UNSAFE_EXCEPTIONS)['errors'][0]['message']);
    }

    public function testEndToEndSecurityWithUserConnected(): void
    {
        $container = $this->createContainer([
            AuthenticationServiceInterface::class => static function () {
                return new class implements AuthenticationServiceInterface {
                    public function isLogged(): bool
                    {
                        return true;
                    }

                    public function getUser(): object|null
                    {
                        $user = new stdClass();
                        $user->bar = 42;
                        return $user;
                    }
                };
            },
            AuthorizationServiceInterface::class => static function () {
                return new class implements AuthorizationServiceInterface {
                    public function isAllowed(string $right, $subject = null): bool
                    {
                        return $right === 'CAN_EDIT' && $subject->bar === 42;
                    }
                };
            },

        ]);

        $schema = $container->get(Schema::class);
        assert($schema instanceof Schema);

        // Test with failWith attribute
        $queryString = '
        query {
            secretUsingUser
        }
        ';

        $result = GraphQL::executeQuery(
            $schema,
            $queryString,
        );

        $this->assertSame('you can see this secret only if user.bar is set to 42', $result->toArray(DebugFlag::RETHROW_UNSAFE_EXCEPTIONS)['data']['secretUsingUser']);

        // Test with failWith attribute
        $queryString = '
        query {
            secretUsingIsGranted
        }
        ';

        $result = GraphQL::executeQuery(
            $schema,
            $queryString,
        );

        $this->assertSame('you can see this secret only if user has right "CAN_EDIT"', $result->toArray(DebugFlag::RETHROW_UNSAFE_EXCEPTIONS)['data']['secretUsingIsGranted']);
    }

    public function testEndToEndSecurityWithThis(): void
    {
        $schema = $this->mainContainer->get(Schema::class);
        assert($schema instanceof Schema);

        $queryString = '
        query {
            secretUsingThis(secret:"41")
        }
        ';

        $result = GraphQL::executeQuery(
            $schema,
            $queryString,
        );

        $this->assertSame('Access denied.', $result->toArray(DebugFlag::RETHROW_UNSAFE_EXCEPTIONS)['errors'][0]['message']);

        $queryString = '
        query {
            secretUsingThis(secret:"42")
        }
        ';

        $result = GraphQL::executeQuery(
            $schema,
            $queryString,
        );

        $this->assertSame('you can see this secret only if isAllowed() returns true', $result->toArray(DebugFlag::RETHROW_UNSAFE_EXCEPTIONS)['data']['secretUsingThis']);
    }

    public function testEndToEndSecurityInField(): void
    {
        $schema = $this->mainContainer->get(Schema::class);
        assert($schema instanceof Schema);

        $queryString = '
        query {
            products {
                items {
                    margin(secret: "12")
                }
            }
        }
        ';

        $result = GraphQL::executeQuery(
            $schema,
            $queryString,
        );

        $this->assertSame('Access denied.', $result->toArray(DebugFlag::RETHROW_UNSAFE_EXCEPTIONS)['errors'][0]['message']);

        $queryString = '
        query {
            contacts {
                secured
            }
        }
        ';

        $result = GraphQL::executeQuery(
            $schema,
            $queryString,
        );

        $this->assertSame('Access denied.', $result->toArray(DebugFlag::RETHROW_UNSAFE_EXCEPTIONS)['errors'][0]['message']);
    }

    public function testEndToEndUnions(): void
    {
        $schema = $this->mainContainer->get(Schema::class);
        assert($schema instanceof Schema);

        $queryString = '
        query {
            getProduct{
                __typename
                ... on SpecialProduct{
                    name
                    special
                }
            }
        }
        ';

        $result = GraphQL::executeQuery(
            $schema,
            $queryString,
        );
        $resultArray = $result->toArray(DebugFlag::RETHROW_UNSAFE_EXCEPTIONS);

        $this->assertEquals('SpecialProduct', $resultArray['data']['getProduct']['__typename']);
        $this->assertEquals('Special box', $resultArray['data']['getProduct']['name']);
        $this->assertEquals('unicorn', $resultArray['data']['getProduct']['special']);
    }

    public function testEndToEndUnionsInIterables(): void
    {
        $schema = $this->mainContainer->get(Schema::class);
        assert($schema instanceof Schema);

        $queryString = '
        query {
            getProducts2{
                __typename
                ... on SpecialProduct{
                    name
                    special
                }
            }
        }
        ';

        $result = GraphQL::executeQuery(
            $schema,
            $queryString,
        );
        $resultArray = $result->toArray(DebugFlag::RETHROW_UNSAFE_EXCEPTIONS);

        $this->assertEquals('SpecialProduct', $resultArray['data']['getProducts2'][0]['__typename']);
        $this->assertEquals('Special box', $resultArray['data']['getProducts2'][0]['name']);
        $this->assertEquals('unicorn', $resultArray['data']['getProducts2'][0]['special']);
    }

    public function testEndToEndMagicFieldWithPhpType(): void
    {
        $schema = $this->mainContainer->get(Schema::class);
        assert($schema instanceof Schema);

        $queryString = '
        query {
            contacts {
                magicContact {
                    name
                }
            }
        }
        ';

        $result = GraphQL::executeQuery(
            $schema,
            $queryString,
        );

        $this->assertSame([
            'contacts' => [
                [
                    'magicContact' => ['name' => 'foo'],
                ],
                [
                    'magicContact' => ['name' => 'foo'],
                ],
            ],
        ], $this->getSuccessResult($result));
    }

    public function testEndToEndInjectUser(): void
    {
        $container = $this->createContainer([
            AuthenticationServiceInterface::class => static function () {
                return new class implements AuthenticationServiceInterface {
                    public function isLogged(): bool
                    {
                        return true;
                    }

                    public function getUser(): object|null
                    {
                        $user = new stdClass();
                        $user->bar = 42;
                        return $user;
                    }
                };
            },
        ]);

        $schema = $container->get(Schema::class);
        assert($schema instanceof Schema);

        // Test with failWith attribute
        $queryString = '
        query {
            injectedUser
        }
        ';

        $result = GraphQL::executeQuery(
            $schema,
            $queryString,
        );

        $this->assertSame(42, $result->toArray(DebugFlag::RETHROW_UNSAFE_EXCEPTIONS)['data']['injectedUser']);
    }

    public function testEndToEndInjectUserUnauthenticated(): void
    {
        $container = $this->createContainer([
            AuthenticationServiceInterface::class => static fn() => new VoidAuthenticationService(),
        ]);

        $schema = $container->get(Schema::class);
        assert($schema instanceof Schema);

        $queryString = '
            query {
                injectedUser
            }
        ';

        $result = GraphQL::executeQuery(
            $schema,
            $queryString,
        );

        $this->assertSame('You need to be logged to access this field', $result->toArray(DebugFlag::RETHROW_UNSAFE_EXCEPTIONS)['errors'][0]['message']);
    }

    public function testInputOutputNameConflict(): void
    {
        $arrayAdapter = new ArrayAdapter();
        $arrayAdapter->setLogger(new ExceptionLogger());
        $schemaFactory = new SchemaFactory(new Psr16Cache($arrayAdapter), new BasicAutoWiringContainer(new EmptyContainer()));
        $schemaFactory->addNamespace('TheCodingMachine\\GraphQLite\\Fixtures\\InputOutputNameConflict');

        $schema = $schemaFactory->createSchema();

        $this->expectException(CannotMapTypeException::class);
        $this->expectExceptionMessage('For parameter $inAndOut, in TheCodingMachine\\GraphQLite\\Fixtures\\InputOutputNameConflict\\Controllers\\InAndOutController::testInAndOut, type "InAndOut" must be an input type (if you declared an input type with the name "InAndOut", make sure that there are no output type with the same name as this is forbidden by the GraphQL spec).');

        $schema->validate();
    }

    public function testNullableResult(): void
    {
        $schema = $this->mainContainer->get(Schema::class);
        assert($schema instanceof Schema);

        $queryString = '
        query {
            nullableResult {
                count
            }
        }
        ';

        $result = GraphQL::executeQuery(
            $schema,
            $queryString,
        );
        $resultArray = $result->toArray(DebugFlag::RETHROW_UNSAFE_EXCEPTIONS);
        if (isset($resultArray['errors']) || !isset($resultArray['data'])) {
            $this->fail('Expected a successful answer. Got ' . json_encode($resultArray, JSON_PRETTY_PRINT));
        }
        $this->assertNull($resultArray['data']['nullableResult']);
    }

    public function testEndToEndFieldAnnotationInProperty(): void
    {
        $schema = $this->mainContainer->get(Schema::class);
        assert($schema instanceof Schema);

        $queryString = '
        query {
            contacts {
                age
                nickName
                status
                address
            }
        }
        ';

        $result = GraphQL::executeQuery(
            $schema,
            $queryString,
        );

        $data = $this->getSuccessResult($result);

        $this->assertSame(42, $data['contacts'][0]['age']);
        $this->assertSame('foo', $data['contacts'][0]['nickName']);
        $this->assertSame('bar', $data['contacts'][0]['status']);
        $this->assertSame('foo', $data['contacts'][0]['address']);

        $queryString = '
        query {
            contacts {
                private
            }
        }
        ';

        GraphQL::executeQuery(
            $schema,
            $queryString,
        );

        $this->expectException(AccessPropertyException::class);
        $this->expectExceptionMessage("Could not get value from property 'TheCodingMachine\GraphQLite\Fixtures\Integration\Models\Contact::private'. Either make the property public or add a public getter for it like 'getPrivate' or 'isPrivate' with no required parameters");

        $queryString = '
        query {
            contacts {
                zipcode
            }
        }
        ';

        $result = GraphQL::executeQuery(
            $schema,
            $queryString,
        );

        $this->expectException(AccessPropertyException::class);
        $this->expectExceptionMessage("Could not get value from property 'TheCodingMachine\GraphQLite\Fixtures\Integration\Models\Contact::zipcode'. Either make the property public or add a public getter for it like 'getZipcode' or 'isZipcode' with no required parameters");
        $result->toArray(DebugFlag::RETHROW_INTERNAL_EXCEPTIONS);
    }

    public function testEndToEndInputAnnotations(): void
    {
        $schema = $this->mainContainer->get(Schema::class);
        assert($schema instanceof Schema);
        $queryString = '
        mutation {
            createPost(
                post: {
                    title: "foo",
                    publishedAt: "2021-01-24T00:00:00+00:00"
                    author: {
                      name: "foo",
                      birthDate: "1942-12-24T00:00:00+00:00",
                      relations: [
                        {
                            name: "bar"
                        }
                      ]
                    }
                }
            ) {
                id
                title
                publishedAt
                comment
                summary
                author {
                  name
                }
            }
            updatePost(
                id: 100,
                post: {
                    title: "bar"
                }
            ) {
                id
                title
                comment
                summary
            }
            createArticle(
                article: {
                    title: "foo",
                    comment: "some description",
                    magazine: "bar",
                    author: {
                      name: "foo",
                      birthDate: "1942-12-24T00:00:00+00:00",
                      relations: [
                        {
                            name: "bar"
                        }
                      ]
                    }
                }
            ) {
                id
                title
                comment
                summary
                magazine
                author {
                  name
                }
            }
        }
        ';

        $result = GraphQL::executeQuery(
            $schema,
            $queryString,
        );

        $this->assertSame([
            'createPost' => [
                'id' => 1,
                'title' => 'foo',
                'publishedAt' => '2021-01-24T00:00:00+00:00',
                'comment' => 'foo',
                'summary' => 'foo',
                'author' => ['name' => 'foo'],
            ],
            'updatePost' => [
                'id' => 100,
                'title' => 'bar',
                'comment' => 'bar',
                'summary' => 'foo',
            ],
            'createArticle' => [
                'id' => 2,
                'title' => 'foo',
                'comment' => 'some description',
                'summary' => 'foo',
                'magazine' => 'bar',
                'author' => ['name' => 'foo'],
            ],
        ], $this->getSuccessResult($result));
    }

    public function testEndToEndInputAnnotationIssues(): void
    {
        $schema = $this->mainContainer->get(Schema::class);
        assert($schema instanceof Schema);
        $queryString = '
        mutation {
            createPost(
                post: {
                    id: 20,
                }
            ) {
                id
            }
        }
        ';

        $result = GraphQL::executeQuery(
            $schema,
            $queryString,
        );

        $this->assertSame('Field PostInput.title of required type String! was not provided.', $result->toArray(DebugFlag::RETHROW_UNSAFE_EXCEPTIONS)['errors'][0]['message']);
        $this->assertSame('Field PostInput.publishedAt of required type DateTime! was not provided.', $result->toArray(DebugFlag::RETHROW_UNSAFE_EXCEPTIONS)['errors'][1]['message']);
        $this->assertSame('Field "id" is not defined by type "PostInput".', $result->toArray(DebugFlag::RETHROW_UNSAFE_EXCEPTIONS)['errors'][2]['message']);

        $queryString = '
        mutation {
            createArticle(
                article: {
                    id: 20,
                    publishedAt: "2021-01-24T00:00:00+00:00"
                }
            ) {
                id
                publishedAt
            }
        }
        ';

        $result = GraphQL::executeQuery(
            $schema,
            $queryString,
        );

        $this->assertSame('Field ArticleInput.title of required type String! was not provided.', $result->toArray(DebugFlag::RETHROW_UNSAFE_EXCEPTIONS)['errors'][0]['message']);
        $this->assertSame('Field "id" is not defined by type "ArticleInput".', $result->toArray(DebugFlag::RETHROW_UNSAFE_EXCEPTIONS)['errors'][1]['message']);
        $this->assertSame('Field "publishedAt" is not defined by type "ArticleInput".', $result->toArray(DebugFlag::RETHROW_UNSAFE_EXCEPTIONS)['errors'][2]['message']);

        $queryString = '
        mutation {
            updatePost(
                id: 100,
                post: {
                    title: "foo",
                    inaccessible: "foo"
                }
            ) {
                id
            }
        }
        ';

        $result = GraphQL::executeQuery(
            $schema,
            $queryString,
        );

        $this->expectException(AccessPropertyException::class);
        $this->expectExceptionMessage("Could not set value for property 'TheCodingMachine\GraphQLite\Fixtures\Integration\Models\Post::inaccessible'. Either make the property public or add a public setter for it like this: 'setInaccessible'");
        $result->toArray(DebugFlag::RETHROW_INTERNAL_EXCEPTIONS);
    }

    public function testEndToEndInputEmptyValues(): void
    {
        $schema = $this->mainContainer->get(Schema::class);
        assert($schema instanceof Schema);

        $queryString = '
        mutation {
            updatePreferences(
                preferences: {
                    id: 0,
                    options: [],
                    enabled: false,
                    name: ""
                }
            ) {
                id
                options
                enabled
                name
            }
        }
        ';

        $result = GraphQL::executeQuery(
            $schema,
            $queryString,
        );

        $this->assertSame([
            'updatePreferences' => [
                'id' => 0,
                'options' => [],
                'enabled' => false,
                'name' => '',
            ],
        ], $this->getSuccessResult($result));
    }

    public function testEndToEndInputTypeValidation(): void
    {
        $validator = new Validator();

        $container = $this->createContainer([
            InputTypeGenerator::class => static function (ContainerInterface $container) use ($validator) {
                return new InputTypeGenerator(
                    $container->get(InputTypeUtils::class),
                    $container->get(FieldsBuilder::class),
                    $validator,
                );
            },
        ]);

        $arrayAdapter = new ArrayAdapter();
        $arrayAdapter->setLogger(new ExceptionLogger());
        $schemaFactory = new SchemaFactory(new Psr16Cache($arrayAdapter), new BasicAutoWiringContainer(new EmptyContainer()));
        $schemaFactory->addNamespace('TheCodingMachine\\GraphQLite\\Fixtures\\Integration');
        $schemaFactory->setAuthenticationService($container->get(AuthenticationServiceInterface::class));
        $schemaFactory->setAuthorizationService($container->get(AuthorizationServiceInterface::class));
        $schemaFactory->setInputTypeValidator($validator);

        $schema = $schemaFactory->createSchema();

        // Test any mutation, we just need a trigger an InputType to be resolved
        $queryString = '
            mutation {
                createArticle(
                    article: {
                        title: "Old Man and the Sea"
                    }
                ) {
                    title
                }
            }
        ';

        $this->expectException(ValidationException::class);
        $result = GraphQL::executeQuery($schema, $queryString);
        $result->toArray(DebugFlag::RETHROW_INTERNAL_EXCEPTIONS);
    }

    public function testEndToEndInputConstructor(): void
    {
        $schema = $this->mainContainer->get(Schema::class);
        assert($schema instanceof Schema);

        $queryString = '
        mutation {
            updateArticle(input: {
                magazine: "Test"
            }) {
                magazine
                summary
            }
        }
        ';

        $result = GraphQL::executeQuery(
            $schema,
            $queryString,
        );

        $data = $this->getSuccessResult($result);
        $this->assertSame('Test', $data['updateArticle']['magazine']);
        $this->assertSame('default', $data['updateArticle']['summary']);
        $queryString = '
        mutation {
            updateArticle(input: {
                magazine: "NYTimes"
            }) {
                magazine
            }
        }
        ';

        $result = GraphQL::executeQuery(
            $schema,
            $queryString,
        );

        $this->assertSame('Access denied.', $result->toArray(DebugFlag::RETHROW_UNSAFE_EXCEPTIONS)['errors'][0]['message']);
    }

    public function testEndToEndSetterWithSecurity(): void
    {
        $container = $this->createContainer([
            AuthenticationServiceInterface::class => static function () {
                return new class implements AuthenticationServiceInterface {
                    public function isLogged(): bool
                    {
                        return true;
                    }

                    public function getUser(): object|null
                    {
                        $user = new stdClass();
                        $user->bar = 42;
                        return $user;
                    }
                };
            },
            AuthorizationServiceInterface::class => static function () {
                return new class implements AuthorizationServiceInterface {
                    public function isAllowed(string $right, $subject = null): bool
                    {
                        return $right === 'CAN_SET_SECRET' || $right === 'CAN_SEE_SECRET';
                    }
                };
            },

        ]);

        $schema = $container->get(Schema::class);
        assert($schema instanceof Schema);

        $queryString = '
        query {
            trickyProduct {
                conditionalSecret(key: 1234)
            }
        }
        ';

        $result = GraphQL::executeQuery(
            $schema,
            $queryString,
        );

        $data = $this->getSuccessResult($result);
        $this->assertSame('preset{secret}', $data['trickyProduct']['conditionalSecret']);
        $queryString = '
        mutation {
            updateTrickyProduct(
                product: {
                    name: "secret product"
                    price: 12.22
                    multi: 11
                    secret: "123"
                    conditionalSecret: "actually{secret}"
                }
            ) {
                name
                price
                multi
                conditionalSecret(key: 1234)
            }
        }
        ';

        $result = GraphQL::executeQuery(
            $schema,
            $queryString,
        );

        $data = $this->getSuccessResult($result);
        $this->assertSame('actually{secret}', $data['updateTrickyProduct']['conditionalSecret']);
        $this->assertSame('secret product foo', $data['updateTrickyProduct']['name']);
        $this->assertSame(12.22, $data['updateTrickyProduct']['price']);
        $this->assertSame(11.0, $data['updateTrickyProduct']['multi']);

        $queryString = '
        query {
            trickyProduct {
                name
                price
                multi
                secret
            }
        }
        ';

        $result = GraphQL::executeQuery(
            $schema,
            $queryString,
        );

        $data = $this->getSuccessResult($result);
        $this->assertSame('Special box', $data['trickyProduct']['name']);
        $this->assertSame(11.99, $data['trickyProduct']['price']);
        $this->assertSame('hello', $data['trickyProduct']['secret']);
        $this->assertSame(11.11, $data['trickyProduct']['multi']);

        $queryString = '
        mutation {
            createTrickyProduct(
                product: {
                    name: "Special"
                    price: 11.99
                    secret: "1234"
                    conditionalSecret: "actually{secret}"
                }
            ) {
                name
                price
            }
        }
        ';

        $result = GraphQL::executeQuery(
            $schema,
            $queryString,
        );

        $data = $this->getSuccessResult($result);
        $this->assertSame('Special foo', $data['createTrickyProduct']['name']);
        $this->assertSame(11.99, $data['createTrickyProduct']['price']);
    }

    public function testEndToEndSetterWithSecurityError(): void
    {
        $container = $this->createContainer([
            AuthenticationServiceInterface::class => static function () {
                return new class implements AuthenticationServiceInterface {
                    public function isLogged(): bool
                    {
                        return true;
                    }

                    public function getUser(): object|null
                    {
                        $user = new stdClass();
                        $user->bar = 42;
                        return $user;
                    }
                };
            },
            AuthorizationServiceInterface::class => static function () {
                return new class implements AuthorizationServiceInterface {
                    public function isAllowed(string $right, $subject = null): bool
                    {
                        return $right === 'CAN_SET_SECRET' || $right === 'CAN_SEE_SECRET';
                    }
                };
            },

        ]);
        $schema = $container->get(Schema::class);
        assert($schema instanceof Schema);

        // try getConditionalSecret with wrong key
        $queryString = '
        query {
            trickyProduct {
                conditionalSecret(key: 12345)
            }
        }
        ';

        $result = GraphQL::executeQuery(
            $schema,
            $queryString,
        );

        $this->assertSame('Access denied.', $result->toArray(DebugFlag::RETHROW_UNSAFE_EXCEPTIONS)['errors'][0]['message']);

        // try setConditionalSecret with wrong secret
        $queryString = '
        mutation {
            updateTrickyProduct(
                product: {
                    name: "secret product"
                    price: 12.22
                    multi: 11
                    secret: "123"
                    conditionalSecret: "actually{notsosecret}"
                }
            ) {
                name
                price
                conditionalSecret(key: 1234)
            }
        }
        ';

        $result = GraphQL::executeQuery(
            $schema,
            $queryString,
        );

        $this->assertSame('Access denied.', $result->toArray(DebugFlag::RETHROW_UNSAFE_EXCEPTIONS)['errors'][0]['message']);

        $container = $this->createContainer([
            AuthenticationServiceInterface::class => static function () {
                return new class implements AuthenticationServiceInterface {
                    public function isLogged(): bool
                    {
                        return true;
                    }

                    public function getUser(): object|null
                    {
                        $user = new stdClass();
                        $user->bar = 42;
                        return $user;
                    }
                };
            },
            AuthorizationServiceInterface::class => static function () {
                return new class implements AuthorizationServiceInterface {
                    public function isAllowed(string $right, $subject = null): bool
                    {
                        return false;
                    }
                };
            },

        ]);
        $schema = $container->get(Schema::class);
        assert($schema instanceof Schema);

        // try getSecret with sufficient rights
        $queryString = '
        query {
            trickyProduct {
                name
                price
                secret
            }
        }
        ';

        $result = GraphQL::executeQuery(
            $schema,
            $queryString,
        );

        $this->assertSame('You do not have sufficient rights to access this field', $result->toArray(DebugFlag::RETHROW_UNSAFE_EXCEPTIONS)['errors'][0]['message']);

        // try setSecret with sufficient rights
        $queryString = '
        mutation {
            updateTrickyProduct(
                product: {
                    name: "secret product"
                    price: 12.22
                    multi: 11
                    secret: "123"
                    conditionalSecret: "actually{secret}"
                }
            ) {
                name
                price
                conditionalSecret(key: 1234)
            }
        }
        ';

        $result = GraphQL::executeQuery(
            $schema,
            $queryString,
        );
        $this->assertSame('You do not have sufficient rights to access this field', $result->toArray(DebugFlag::RETHROW_UNSAFE_EXCEPTIONS)['errors'][0]['message']);
        $container = $this->createContainer([
            AuthenticationServiceInterface::class => static function () {
                return new class implements AuthenticationServiceInterface {
                    public function isLogged(): bool
                    {
                        return true;
                    }

                    public function getUser(): object|null
                    {
                        $user = new stdClass();
                        $user->bar = 43;
                        return $user;
                    }
                };
            },
            AuthorizationServiceInterface::class => static function () {
                return new class implements AuthorizationServiceInterface {
                    public function isAllowed(string $right, $subject = null): bool
                    {
                        return $right === 'CAN_SET_SECRET' || $right === 'CAN_SEE_SECRET';
                    }
                };
            },
        ]);
        $schema = $container->get(Schema::class);

        // set conditionalSecret with wrong user
        $result = GraphQL::executeQuery(
            $schema,
            $queryString,
        );
        $this->assertSame('Access denied.', $result->toArray(DebugFlag::RETHROW_UNSAFE_EXCEPTIONS)['errors'][0]['message']);
    }

    public function testCircularInput(): void
    {
        $arrayAdapter = new ArrayAdapter();
        $arrayAdapter->setLogger(new ExceptionLogger());
        $schemaFactory = new SchemaFactory(new Psr16Cache($arrayAdapter), new BasicAutoWiringContainer(new EmptyContainer()));
        $schemaFactory->addNamespace('TheCodingMachine\\GraphQLite\\Fixtures\\CircularInputReference');

        $schema = $schemaFactory->createSchema();

        $errors = $schema->validate();
        $this->assertSame([], $errors);
    }

    public function testArrayInput(): void
    {
        $container = $this->createContainer([
            AuthenticationServiceInterface::class => static function () {
                return new class implements AuthenticationServiceInterface {
                    public function isLogged(): bool
                    {
                        return true;
                    }

                    public function getUser(): object|null
                    {
                        $user = new stdClass();
                        $user->bar = 42;
                        return $user;
                    }
                };
            },
            AuthorizationServiceInterface::class => static function () {
                return new class implements AuthorizationServiceInterface {
                    public function isAllowed(string $right, $subject = null): bool
                    {
                        return $right === 'CAN_SET_SECRET' || $right === 'CAN_SEE_SECRET';
                    }
                };
            },

        ]);

        $schema = $container->get(Schema::class);

        $queryString = '
        mutation {
            updateTrickyProduct(
                product: {
                    name: "fooby"
                    price: 12.22
                    multi: 11
                    secret: "123"
                    conditionalSecret: "actually{secret}"
                    list: ["graph", "ql"]
                }
            ) {
                list
            }
        }
        ';

        $result = GraphQL::executeQuery(
            $schema,
            $queryString,
        );

        $data = $this->getSuccessResult($result);
        $this->assertSame(['graph', 'ql'], $data['updateTrickyProduct']['list']);
    }

    public function testEndToEndVoidResult(): void
    {
        $schema = $this->mainContainer->get(Schema::class);
        assert($schema instanceof Schema);

        $gql = '
            mutation($id: ID!) {
                deleteButton(id: $id)
            }
        ';

        $result = GraphQL::executeQuery(
            $schema,
            $gql,
            variableValues: [
                'id' => 123,
            ],
        );

        self::assertSame([
            'deleteButton' => null,
        ], $this->getSuccessResult($result));
    }

    public function testEndToEndSubscription(): void
    {
        $schema = $this->mainContainer->get(Schema::class);
        assert($schema instanceof Schema);
        $queryString = '
        subscription {
          contactAdded  {
            nickName
            age
          }
        }
        ';

        $result = GraphQL::executeQuery($schema, $queryString);

        $this->assertSame([
            'contactAdded' => [
                'nickName' => 'foo',
                'age' => 42,
            ],
        ], $this->getSuccessResult($result));
    }

    public function testEndToEndSubscriptionWithInput(): void
    {
        $schema = $this->mainContainer->get(Schema::class);
        assert($schema instanceof Schema);
        $queryString = '
        subscription {
          contactAddedWithFilter(
            contact: {
                name: "foo",
                birthDate: "1942-12-24T00:00:00+00:00",
                relations: [
                    {
                        name: "bar"
                    }
                ]
            }
          ) {
            name,
            birthDate,
            relations {
              name
            }
          }
        }
        ';

        $result = GraphQL::executeQuery(
            $schema,
            $queryString,
        );

        $this->assertSame([
            'contactAddedWithFilter' => null,
        ], $this->getSuccessResult($result));
    }

    public function testPrefetchingOfSameTypeInDifferentNestingLevels(): void
    {
        $schema = $this->mainContainer->get(Schema::class);
        assert($schema instanceof Schema);

        $schema->assertValid();

        $queryString = '
        query {
            blogs {
                id
                subBlogs {
                    id
                    posts {
                        title
                        comments {
                            text
                        }
                    }
                }
                author {
                    email
                }
                posts {
                    title
                    comments {
                        text
                    }
                }
            }
        }
        ';

        $result = GraphQL::executeQuery(
            $schema,
            $queryString,
            null,
            new Context(),
        );

        $this->assertSame([
            'blogs' => [
                [
                    'id' => '1',
                    'subBlogs' => [
                        [
                            'id' => '10',
                            'posts' => [
                                [
                                    'title' => 'post-10.1',
                                    'comments' => [
                                        ['text' => 'comment for post-10.1'],
                                    ],
                                ],
                                [
                                    'title' => 'post-10.2',
                                    'comments' => [
                                        ['text' => 'comment for post-10.2'],
                                    ],
                                ],
                            ],
                        ],
                    ],
                    'author' => [
                        'email' => 'author@graphqlite',
                    ],
                    'posts' => [
                        [
                            'title' => 'post-1.1',
                            'comments' => [
                                ['text' => 'comment for post-1.1'],
                            ],
                        ],
                        [
                            'title' => 'post-1.2',
                            'comments' => [
                                ['text' => 'comment for post-1.2'],
                            ],
                        ],
                    ],
                ],
                [
                    'id' => '2',
                    'subBlogs' => [
                        [
                            'id' => '20',
                            'posts' => [
                                [
                                    'title' => 'post-20.1',
                                    'comments' => [
                                        ['text' => 'comment for post-20.1'],
                                    ],
                                ],
                                [
                                    'title' => 'post-20.2',
                                    'comments' => [
                                        ['text' => 'comment for post-20.2'],
                                    ],
                                ],
                            ],
                        ],
                    ],
                    'author' => [
                        'email' => 'author@graphqlite',
                    ],
                    'posts' => [
                        [
                            'title' => 'post-2.1',
                            'comments' => [
                                ['text' => 'comment for post-2.1'],
                            ],
                        ],
                        [
                            'title' => 'post-2.2',
                            'comments' => [
                                ['text' => 'comment for post-2.2'],
                            ],
                        ],
                    ],
                ],
            ],
        ], $this->getSuccessResult($result));
    }
}
