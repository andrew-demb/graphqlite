<?php

declare(strict_types=1);

namespace TheCodingMachine\GraphQLite\Integration;

use GraphQL\Error\DebugFlag;
use GraphQL\GraphQL;
use PHPUnit\Framework\TestCase;
use Symfony\Component\Cache\Adapter\ArrayAdapter;
use Symfony\Component\Cache\Psr16Cache;
use TheCodingMachine\GraphQLite\Containers\BasicAutoWiringContainer;
use TheCodingMachine\GraphQLite\Containers\EmptyContainer;
use TheCodingMachine\GraphQLite\Schema;
use TheCodingMachine\GraphQLite\SchemaFactory;

/**
 * End-to-end verification of SchemaFactory::stripFieldPrefixes().
 *
 * A #[SourceField(name: 'stock')] resolves against Product::hasStock() only once "has" is registered
 * as a getter prefix; the default getters ("get", "is") leave hassers invisible (covered by the
 * PropertyAccessor and NamingStrategy unit tests).
 */
class StripFieldPrefixesTest extends TestCase
{
    /** @param list<string> $getters */
    private function buildSchema(array $getters): Schema
    {
        $factory = new SchemaFactory(
            new Psr16Cache(new ArrayAdapter()),
            new BasicAutoWiringContainer(new EmptyContainer()),
        );
        $factory->addNamespace('TheCodingMachine\\GraphQLite\\Fixtures\\StripFieldPrefixes');
        $factory->stripFieldPrefixes(getters: $getters);

        return $factory->createSchema();
    }

    public function testHasserSourceFieldResolvesWhenPrefixConfigured(): void
    {
        $schema = $this->buildSchema(['get', 'is', 'has']);

        $result = GraphQL::executeQuery(
            $schema,
            '
            query {
                product {
                    name
                    stock
                }
            }
            ',
        );

        $this->assertSame(
            [
                'product' => [
                    'name' => 'Widget',
                    'stock' => true,
                ],
            ],
            $result->toArray(DebugFlag::RETHROW_INTERNAL_EXCEPTIONS)['data']
                ?? $result->toArray(DebugFlag::RETHROW_INTERNAL_EXCEPTIONS)['errors'],
        );
    }
}
