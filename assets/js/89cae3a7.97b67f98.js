"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[7858],{81295:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>r,default:()=>c,frontMatter:()=>o,metadata:()=>l,toc:()=>u});var a=n(58168),i=(n(96540),n(15680));n(67443);const o={id:"external-type-declaration",title:"External type declaration",sidebar_label:"External type declaration"},r=void 0,l={unversionedId:"external-type-declaration",id:"external-type-declaration",title:"External type declaration",description:"In some cases, you cannot or do not want to put an attribute on a domain class.",source:"@site/docs/external-type-declaration.mdx",sourceDirName:".",slug:"/external-type-declaration",permalink:"/docs/next/external-type-declaration",draft:!1,editUrl:"https://github.com/thecodingmachine/graphqlite/edit/master/website/docs/external-type-declaration.mdx",tags:[],version:"current",lastUpdatedBy:"dependabot[bot]",lastUpdatedAt:1731361033,formattedLastUpdatedAt:"Nov 11, 2024",frontMatter:{id:"external-type-declaration",title:"External type declaration",sidebar_label:"External type declaration"},sidebar:"docs",previous:{title:"Extending a type",permalink:"/docs/next/extend-type"},next:{title:"Input types",permalink:"/docs/next/input-types"}},s={},u=[{value:"<code>#[Type]</code> attribute with the <code>class</code> attribute",id:"type-attribute-with-the-class-attribute",level:2},{value:"<code>#[SourceField]</code> attribute",id:"sourcefield-attribute",level:2},{value:"<code>#[MagicField]</code> attribute",id:"magicfield-attribute",level:2},{value:"Authentication and authorization",id:"authentication-and-authorization",level:3},{value:"Declaring fields dynamically (without attributes)",id:"declaring-fields-dynamically-without-attributes",level:2}],d={toc:u},p="wrapper";function c(e){let{components:t,...n}=e;return(0,i.yg)(p,(0,a.A)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,i.yg)("p",null,"In some cases, you cannot or do not want to put an attribute on a domain class."),(0,i.yg)("p",null,"For instance:"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},"The class you want to annotate is part of a third party library and you cannot modify it"),(0,i.yg)("li",{parentName:"ul"},"You are doing domain-driven design and don't want to clutter your domain object with attributes from the view layer"),(0,i.yg)("li",{parentName:"ul"},"etc.")),(0,i.yg)("h2",{id:"type-attribute-with-the-class-attribute"},(0,i.yg)("inlineCode",{parentName:"h2"},"#[Type]")," attribute with the ",(0,i.yg)("inlineCode",{parentName:"h2"},"class")," attribute"),(0,i.yg)("p",null,"GraphQLite allows you to use a ",(0,i.yg)("em",{parentName:"p"},"proxy")," class thanks to the ",(0,i.yg)("inlineCode",{parentName:"p"},"#[Type]")," attribute with the ",(0,i.yg)("inlineCode",{parentName:"p"},"class")," attribute:"),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-php"},"namespace App\\Types;\n\nuse TheCodingMachine\\GraphQLite\\Annotations\\Type;\nuse TheCodingMachine\\GraphQLite\\Annotations\\Field;\nuse App\\Entities\\Product;\n\n#[Type(class: Product::class)]\nclass ProductType\n{\n    #[Field]\n    public function getId(Product $product): string\n    {\n        return $product->getId();\n    }\n}\n")),(0,i.yg)("p",null,"The ",(0,i.yg)("inlineCode",{parentName:"p"},"ProductType")," class must be in the ",(0,i.yg)("em",{parentName:"p"},"types")," namespace. You configured this namespace when you installed GraphQLite."),(0,i.yg)("p",null,"The ",(0,i.yg)("inlineCode",{parentName:"p"},"ProductType")," class is actually a ",(0,i.yg)("strong",{parentName:"p"},"service"),". You can therefore inject dependencies in it."),(0,i.yg)("div",{class:"alert alert--warning"},(0,i.yg)("strong",null,"Heads up!")," The ",(0,i.yg)("code",null,"ProductType")," class must exist in the container of your application and the container identifier MUST be the fully qualified class name.",(0,i.yg)("br",null),(0,i.yg)("br",null),"If you are using the Symfony bundle (or a framework with autowiring like Laravel), this is usually not an issue as the container will automatically create the controller entry if you do not explicitly declare it."),(0,i.yg)("p",null,"In methods with a ",(0,i.yg)("inlineCode",{parentName:"p"},"#[Field]")," attribute, the first parameter is the ",(0,i.yg)("em",{parentName:"p"},"resolved object")," we are working on. Any additional parameters are used as arguments."),(0,i.yg)("h2",{id:"sourcefield-attribute"},(0,i.yg)("inlineCode",{parentName:"h2"},"#[SourceField]")," attribute"),(0,i.yg)("p",null,"If you don't want to rewrite all ",(0,i.yg)("em",{parentName:"p"},"getters")," of your base class, you may use the ",(0,i.yg)("inlineCode",{parentName:"p"},"#[SourceField]")," attribute:"),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-php"},'use TheCodingMachine\\GraphQLite\\Annotations\\Type;\nuse TheCodingMachine\\GraphQLite\\Annotations\\SourceField;\nuse App\\Entities\\Product;\n\n#[Type(class: Product::class)]\n#[SourceField(name: "name")]\n#[SourceField(name: "price")]\nclass ProductType\n{\n}\n')),(0,i.yg)("p",null,"By doing so, you let GraphQLite know that the type exposes the ",(0,i.yg)("inlineCode",{parentName:"p"},"getName")," method of the underlying ",(0,i.yg)("inlineCode",{parentName:"p"},"Product")," object."),(0,i.yg)("p",null,"Internally, GraphQLite will look for methods named ",(0,i.yg)("inlineCode",{parentName:"p"},"name()"),", ",(0,i.yg)("inlineCode",{parentName:"p"},"getName()")," and ",(0,i.yg)("inlineCode",{parentName:"p"},"isName()"),").\nYou can set different name to look for with ",(0,i.yg)("inlineCode",{parentName:"p"},"sourceName")," attribute."),(0,i.yg)("h2",{id:"magicfield-attribute"},(0,i.yg)("inlineCode",{parentName:"h2"},"#[MagicField]")," attribute"),(0,i.yg)("p",null,"If your object has no getters, but instead uses magic properties (using the magic ",(0,i.yg)("inlineCode",{parentName:"p"},"__get")," method), you should use the ",(0,i.yg)("inlineCode",{parentName:"p"},"#[MagicField]")," attribute:"),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-php"},'use TheCodingMachine\\GraphQLite\\Annotations\\Type;\nuse TheCodingMachine\\GraphQLite\\Annotations\\SourceField;\nuse App\\Entities\\Product;\n\n#[Type]\n#[MagicField(name: "name", outputType: "String!")]\n#[MagicField(name: "price", outputType: "Float")]\nclass ProductType\n{\n    public function __get(string $property) {\n        // return some magic property\n    }\n}\n')),(0,i.yg)("p",null,'By doing so, you let GraphQLite know that the type exposes "name" and the "price" magic properties of the underlying ',(0,i.yg)("inlineCode",{parentName:"p"},"Product")," object.\nYou can set different name to look for with ",(0,i.yg)("inlineCode",{parentName:"p"},"sourceName")," attribute."),(0,i.yg)("p",null,"This is particularly useful in frameworks like Laravel, where Eloquent is making a very wide use of such properties."),(0,i.yg)("p",null,"Please note that GraphQLite has no way to know the type of a magic property. Therefore, you have specify the GraphQL type\nof each property manually."),(0,i.yg)("h3",{id:"authentication-and-authorization"},"Authentication and authorization"),(0,i.yg)("p",null,'You may also check for logged users or users with a specific right using the "annotations" argument.'),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-php"},'use TheCodingMachine\\GraphQLite\\Annotations\\Type;\nuse TheCodingMachine\\GraphQLite\\Annotations\\SourceField;\nuse TheCodingMachine\\GraphQLite\\Annotations\\Logged;\nuse TheCodingMachine\\GraphQLite\\Annotations\\Right;\nuse TheCodingMachine\\GraphQLite\\Annotations\\FailWith;\nuse App\\Entities\\Product;\n\n#[Type(class: Product::class)]\n#[SourceField(name: "name")]\n#[SourceField(name: "price", annotations: [new Logged(), new Right("CAN_ACCESS_Price"), new FailWith(null)])]\nclass ProductType extends AbstractAnnotatedObjectType\n{\n}\n')),(0,i.yg)("p",null,"Any attributes described in the ",(0,i.yg)("a",{parentName:"p",href:"/docs/next/authentication-authorization"},"Authentication and authorization page"),", or any attribute this is actually a ",(0,i.yg)("a",{parentName:"p",href:"/docs/next/field-middlewares"},'"field middleware"')," can be used in the ",(0,i.yg)("inlineCode",{parentName:"p"},"#[SourceField]"),' "annotations" argument.'),(0,i.yg)("h2",{id:"declaring-fields-dynamically-without-attributes"},"Declaring fields dynamically (without attributes)"),(0,i.yg)("p",null,"In some very particular cases, you might not know exactly the list of ",(0,i.yg)("inlineCode",{parentName:"p"},"#[SourceField]")," attributes at development time.\nIf you need to decide the list of ",(0,i.yg)("inlineCode",{parentName:"p"},"#[SourceField]")," at runtime, you can implement the ",(0,i.yg)("inlineCode",{parentName:"p"},"FromSourceFieldsInterface"),":"),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-php"},"use TheCodingMachine\\GraphQLite\\FromSourceFieldsInterface;\n\n#[Type(class: Product::class)]\nclass ProductType implements FromSourceFieldsInterface\n{\n    /**\n     * Dynamically returns the array of source fields\n     * to be fetched from the original object.\n     *\n     * @return SourceFieldInterface[]\n     */\n    public function getSourceFields(): array\n    {\n        // You may want to enable fields conditionally based on feature flags...\n        if (ENABLE_STATUS_GLOBALLY) {\n            return [\n                new SourceField(['name'=>'status', 'annotations'=>[new Logged()]]),\n            ];\n        } else {\n            return [];\n        }\n    }\n}\n")))}c.isMDXComponent=!0}}]);