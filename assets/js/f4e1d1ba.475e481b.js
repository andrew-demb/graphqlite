"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[9327],{16070:function(e,n,t){t.r(n),t.d(n,{frontMatter:function(){return o},contentTitle:function(){return d},metadata:function(){return s},toc:function(){return u},default:function(){return c}});var i=t(87462),a=t(63366),r=(t(67294),t(3905)),l=["components"],o={id:"field-middlewares",title:"Adding custom annotations with Field middlewares",sidebar_label:"Custom annotations"},d=void 0,s={unversionedId:"field-middlewares",id:"version-4.2/field-middlewares",isDocsHomePage:!1,title:"Adding custom annotations with Field middlewares",description:"Available in GraphQLite 4.0+",source:"@site/versioned_docs/version-4.2/field-middlewares.md",sourceDirName:".",slug:"/field-middlewares",permalink:"/docs/4.2/field-middlewares",editUrl:"https://github.com/thecodingmachine/graphqlite/edit/master/website/versioned_docs/version-4.2/field-middlewares.md",tags:[],version:"4.2",lastUpdatedBy:"St\xe9phane",lastUpdatedAt:1638404694,formattedLastUpdatedAt:"12/2/2021",frontMatter:{id:"field-middlewares",title:"Adding custom annotations with Field middlewares",sidebar_label:"Custom annotations"},sidebar:"version-4.2/docs",previous:{title:"Custom types",permalink:"/docs/4.2/custom-types"},next:{title:"Custom argument resolving",permalink:"/docs/4.2/argument-resolving"}},u=[{value:"Field middlewares",id:"field-middlewares",children:[],level:2},{value:"Annotations parsing",id:"annotations-parsing",children:[],level:2}],p={toc:u};function c(e){var n=e.components,o=(0,a.Z)(e,l);return(0,r.kt)("wrapper",(0,i.Z)({},p,o,{components:n,mdxType:"MDXLayout"}),(0,r.kt)("small",null,"Available in GraphQLite 4.0+"),(0,r.kt)("p",null,"Just like the ",(0,r.kt)("inlineCode",{parentName:"p"},"@Logged")," or ",(0,r.kt)("inlineCode",{parentName:"p"},"@Right")," annotation, you can develop your own annotation that extends/modifies the behaviour of a field/query/mutation."),(0,r.kt)("div",{class:"alert alert--warning"},"If you want to create an annotation that targets a single argument (like ",(0,r.kt)("code",null,'@AutoWire(for="$service")'),"), you should rather check the documentation about ",(0,r.kt)("a",{href:"argument-resolving"},"custom argument resolving")),(0,r.kt)("h2",{id:"field-middlewares"},"Field middlewares"),(0,r.kt)("p",null,"GraphQLite is based on the Webonyx/Graphql-PHP library. In Webonyx, fields are represented by the ",(0,r.kt)("inlineCode",{parentName:"p"},"FieldDefinition")," class.\nIn order to create a ",(0,r.kt)("inlineCode",{parentName:"p"},"FieldDefinition"),' instance for your field, GraphQLite goes through a series of "middlewares".'),(0,r.kt)("p",null,(0,r.kt)("img",{src:t(78979).Z})),(0,r.kt)("p",null,"Each middleware is passed a ",(0,r.kt)("inlineCode",{parentName:"p"},"TheCodingMachine\\GraphQLite\\QueryFieldDescriptor")," instance. This object contains all the\nparameters used to initialize the field (like the return type, the list of arguments, the resolver to be used, etc...)"),(0,r.kt)("p",null,"Each middleware must return a ",(0,r.kt)("inlineCode",{parentName:"p"},"GraphQL\\Type\\Definition\\FieldDefinition")," (the object representing a field in Webonyx/GraphQL-PHP)."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-php"},"/**\n * Your middleware must implement this interface.\n */\ninterface FieldMiddlewareInterface\n{\n    public function process(QueryFieldDescriptor $queryFieldDescriptor, FieldHandlerInterface $fieldHandler): ?FieldDefinition;\n}\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-php"},"class QueryFieldDescriptor\n{\n    public function getName() { /* ... */ }\n    public function setName(string $name)  { /* ... */ }\n    public function getType() { /* ... */ }\n    public function setType($type): void  { /* ... */ }\n    public function getParameters(): array  { /* ... */ }\n    public function setParameters(array $parameters): void  { /* ... */ }\n    public function getPrefetchParameters(): array  { /* ... */ }\n    public function setPrefetchParameters(array $prefetchParameters): void  { /* ... */ }\n    public function getPrefetchMethodName(): ?string { /* ... */ }\n    public function setPrefetchMethodName(?string $prefetchMethodName): void { /* ... */ }\n    public function setCallable(callable $callable): void { /* ... */ }\n    public function setTargetMethodOnSource(?string $targetMethodOnSource): void { /* ... */ }\n    public function isInjectSource(): bool { /* ... */ }\n    public function setInjectSource(bool $injectSource): void { /* ... */ }\n    public function getComment(): ?string { /* ... */ }\n    public function setComment(?string $comment): void { /* ... */ }\n    public function getMiddlewareAnnotations(): MiddlewareAnnotations { /* ... */ }\n    public function setMiddlewareAnnotations(MiddlewareAnnotations $middlewareAnnotations): void { /* ... */ }\n    public function getOriginalResolver(): ResolverInterface { /* ... */ }\n    public function getResolver(): callable { /* ... */ }\n    public function setResolver(callable $resolver): void { /* ... */ }\n}\n")),(0,r.kt)("p",null,"The role of a middleware is to analyze the ",(0,r.kt)("inlineCode",{parentName:"p"},"QueryFieldDescriptor")," and modify it (or to directly return a ",(0,r.kt)("inlineCode",{parentName:"p"},"FieldDefinition"),")."),(0,r.kt)("p",null,"If you want the field to purely disappear, your middleware can return ",(0,r.kt)("inlineCode",{parentName:"p"},"null"),"."),(0,r.kt)("h2",{id:"annotations-parsing"},"Annotations parsing"),(0,r.kt)("p",null,"Take a look at the ",(0,r.kt)("inlineCode",{parentName:"p"},"QueryFieldDescriptor::getMiddlewareAnnotations()"),"."),(0,r.kt)("p",null,"It returns the list of annotations applied to your field that implements the ",(0,r.kt)("inlineCode",{parentName:"p"},"MiddlewareAnnotationInterface"),"."),(0,r.kt)("p",null,"Let's imagine you want to add a ",(0,r.kt)("inlineCode",{parentName:"p"},"@OnlyDebug")," annotation that displays a field/query/mutation only in debug mode (and\nhides the field in production). That could be useful, right?"),(0,r.kt)("p",null,"First, we have to define the annotation. Annotations are handled by the great ",(0,r.kt)("a",{parentName:"p",href:"https://www.doctrine-project.org/projects/doctrine-annotations/en/1.6/index.html"},"doctrine/annotations")," library (for PHP 7+) and/or by PHP 8 attributes."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-php",metastring:'title="OnlyDebug.php"',title:'"OnlyDebug.php"'},'namespace App\\Annotations;\n\nuse Attribute;\nuse TheCodingMachine\\GraphQLite\\Annotations\\MiddlewareAnnotationInterface;\n\n/**\n * @Annotation\n * @Target({"METHOD", "ANNOTATION"})\n */\n#[Attribute(Attribute::TARGET_METHOD)]\nclass OnlyDebug implements MiddlewareAnnotationInterface\n{\n}\n')),(0,r.kt)("p",null,"Apart from being a classical annotation/attribute, this class implements the ",(0,r.kt)("inlineCode",{parentName:"p"},"MiddlewareAnnotationInterface"),'. This interface is a "marker" interface. It does not have any methods. It is just used to tell GraphQLite that this annotation is to be used by middlewares.'),(0,r.kt)("p",null,"Now, we can write a middleware that will act upon this annotation."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-php"},"namespace App\\Middlewares;\n\nuse App\\Annotations\\OnlyDebug;\nuse TheCodingMachine\\GraphQLite\\Middlewares\\FieldMiddlewareInterface;\nuse GraphQL\\Type\\Definition\\FieldDefinition;\nuse TheCodingMachine\\GraphQLite\\QueryFieldDescriptor;\n\n/**\n * Middleware in charge of hiding a field if it is annotated with @OnlyDebug and the DEBUG constant is not set\n */\nclass OnlyDebugFieldMiddleware implements FieldMiddlewareInterface\n{\n    public function process(QueryFieldDescriptor $queryFieldDescriptor, FieldHandlerInterface $fieldHandler): ?FieldDefinition\n    {\n        $annotations = $queryFieldDescriptor->getMiddlewareAnnotations();\n\n        /**\n         * @var OnlyDebug $onlyDebug\n         */\n        $onlyDebug = $annotations->getAnnotationByType(OnlyDebug::class);\n\n        if ($onlyDebug !== null && !DEBUG) {\n            // If the onlyDebug annotation is present, returns null.\n            // Returning null will hide the field.\n            return null;\n        }\n\n        // Otherwise, let's continue the middleware pipe without touching anything.\n        return $fieldHandler->handle($queryFieldDescriptor);\n    }\n}\n")),(0,r.kt)("p",null,"The final thing we have to do is to register the middleware."),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Assuming you are using the ",(0,r.kt)("inlineCode",{parentName:"p"},"SchemaFactory")," to initialize GraphQLite, you can register the field middleware using:"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-php"},"$schemaFactory->addFieldMiddleware(new OnlyDebugFieldMiddleware());\n"))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"If you are using the Symfony bundle, you can register your field middleware services by tagging them with the ",(0,r.kt)("inlineCode",{parentName:"p"},"graphql.field_middleware")," tag."))))}c.isMDXComponent=!0},78979:function(e,n,t){n.Z=t.p+"assets/images/field_middleware-5c3e3b4da480c49d048d527f93cc970d.svg"}}]);