"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[2301],{19365:(e,t,n)=>{n.d(t,{A:()=>i});var a=n(96540),r=n(20053);const l={tabItem:"tabItem_Ymn6"};function i(e){let{children:t,hidden:n,className:i}=e;return a.createElement("div",{role:"tabpanel",className:(0,r.A)(l.tabItem,i),hidden:n},t)}},11470:(e,t,n)=>{n.d(t,{A:()=>w});var a=n(58168),r=n(96540),l=n(20053),i=n(23104),o=n(56347),s=n(57485),u=n(31682),p=n(89466);function c(e){return function(e){return r.Children.map(e,(e=>{if(!e||(0,r.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}(e).map((e=>{let{props:{value:t,label:n,attributes:a,default:r}}=e;return{value:t,label:n,attributes:a,default:r}}))}function d(e){const{values:t,children:n}=e;return(0,r.useMemo)((()=>{const e=t??c(n);return function(e){const t=(0,u.X)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,n])}function h(e){let{value:t,tabValues:n}=e;return n.some((e=>e.value===t))}function y(e){let{queryString:t=!1,groupId:n}=e;const a=(0,o.W6)(),l=function(e){let{queryString:t=!1,groupId:n}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return n??null}({queryString:t,groupId:n});return[(0,s.aZ)(l),(0,r.useCallback)((e=>{if(!l)return;const t=new URLSearchParams(a.location.search);t.set(l,e),a.replace({...a.location,search:t.toString()})}),[l,a])]}function g(e){const{defaultValue:t,queryString:n=!1,groupId:a}=e,l=d(e),[i,o]=(0,r.useState)((()=>function(e){let{defaultValue:t,tabValues:n}=e;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!h({value:t,tabValues:n}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${n.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const a=n.find((e=>e.default))??n[0];if(!a)throw new Error("Unexpected error: 0 tabValues");return a.value}({defaultValue:t,tabValues:l}))),[s,u]=y({queryString:n,groupId:a}),[c,g]=function(e){let{groupId:t}=e;const n=function(e){return e?`docusaurus.tab.${e}`:null}(t),[a,l]=(0,p.Dv)(n);return[a,(0,r.useCallback)((e=>{n&&l.set(e)}),[n,l])]}({groupId:a}),m=(()=>{const e=s??c;return h({value:e,tabValues:l})?e:null})();(0,r.useLayoutEffect)((()=>{m&&o(m)}),[m]);return{selectedValue:i,selectValue:(0,r.useCallback)((e=>{if(!h({value:e,tabValues:l}))throw new Error(`Can't select invalid tab value=${e}`);o(e),u(e),g(e)}),[u,g,l]),tabValues:l}}var m=n(92303);const f={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};function b(e){let{className:t,block:n,selectedValue:o,selectValue:s,tabValues:u}=e;const p=[],{blockElementScrollPositionUntilNextRender:c}=(0,i.a_)(),d=e=>{const t=e.currentTarget,n=p.indexOf(t),a=u[n].value;a!==o&&(c(t),s(a))},h=e=>{let t=null;switch(e.key){case"Enter":d(e);break;case"ArrowRight":{const n=p.indexOf(e.currentTarget)+1;t=p[n]??p[0];break}case"ArrowLeft":{const n=p.indexOf(e.currentTarget)-1;t=p[n]??p[p.length-1];break}}t?.focus()};return r.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,l.A)("tabs",{"tabs--block":n},t)},u.map((e=>{let{value:t,label:n,attributes:i}=e;return r.createElement("li",(0,a.A)({role:"tab",tabIndex:o===t?0:-1,"aria-selected":o===t,key:t,ref:e=>p.push(e),onKeyDown:h,onClick:d},i,{className:(0,l.A)("tabs__item",f.tabItem,i?.className,{"tabs__item--active":o===t})}),n??t)})))}function v(e){let{lazy:t,children:n,selectedValue:a}=e;const l=(Array.isArray(n)?n:[n]).filter(Boolean);if(t){const e=l.find((e=>e.props.value===a));return e?(0,r.cloneElement)(e,{className:"margin-top--md"}):null}return r.createElement("div",{className:"margin-top--md"},l.map(((e,t)=>(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==a}))))}function T(e){const t=g(e);return r.createElement("div",{className:(0,l.A)("tabs-container",f.tabList)},r.createElement(b,(0,a.A)({},e,t)),r.createElement(v,(0,a.A)({},e,t)))}function w(e){const t=(0,m.A)();return r.createElement(T,(0,a.A)({key:String(t)},e))}},50257:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>s,default:()=>y,frontMatter:()=>o,metadata:()=>u,toc:()=>c});var a=n(58168),r=(n(96540),n(15680)),l=(n(67443),n(11470)),i=n(19365);const o={id:"queries",title:"Queries",sidebar_label:"Queries"},s=void 0,u={unversionedId:"queries",id:"version-7.0.0/queries",title:"Queries",description:"In GraphQLite, GraphQL queries are created by writing methods in controller classes.",source:"@site/versioned_docs/version-7.0.0/queries.mdx",sourceDirName:".",slug:"/queries",permalink:"/docs/queries",draft:!1,editUrl:"https://github.com/thecodingmachine/graphqlite/edit/master/website/versioned_docs/version-7.0.0/queries.mdx",tags:[],version:"7.0.0",lastUpdatedBy:"Andrii Dembitskyi",lastUpdatedAt:1732663950,formattedLastUpdatedAt:"Nov 26, 2024",frontMatter:{id:"queries",title:"Queries",sidebar_label:"Queries"},sidebar:"docs",previous:{title:"Other frameworks / No framework",permalink:"/docs/other-frameworks"},next:{title:"Mutations",permalink:"/docs/mutations"}},p={},c=[{value:"Simple query",id:"simple-query",level:2},{value:"About annotations / attributes",id:"about-annotations--attributes",level:2},{value:"Testing the query",id:"testing-the-query",level:2},{value:"Query with a type",id:"query-with-a-type",level:2}],d={toc:c},h="wrapper";function y(e){let{components:t,...o}=e;return(0,r.yg)(h,(0,a.A)({},d,o,{components:t,mdxType:"MDXLayout"}),(0,r.yg)("p",null,"In GraphQLite, GraphQL queries are created by writing methods in ",(0,r.yg)("em",{parentName:"p"},"controller")," classes."),(0,r.yg)("p",null,"Those classes must be in the controllers namespaces which has been defined when you configured GraphQLite.\nFor instance, in Symfony, the controllers namespace is ",(0,r.yg)("inlineCode",{parentName:"p"},"App\\Controller")," by default."),(0,r.yg)("h2",{id:"simple-query"},"Simple query"),(0,r.yg)("p",null,"In a controller class, each query method must be annotated with the ",(0,r.yg)("inlineCode",{parentName:"p"},"@Query")," annotation. For instance:"),(0,r.yg)(l.A,{defaultValue:"php8",values:[{label:"PHP 8",value:"php8"},{label:"PHP 7",value:"php7"}],mdxType:"Tabs"},(0,r.yg)(i.A,{value:"php8",mdxType:"TabItem"},(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-php"},"namespace App\\Controller;\n\nuse TheCodingMachine\\GraphQLite\\Annotations\\Query;\n\nclass MyController\n{\n    #[Query]\n    public function hello(string $name): string\n    {\n        return 'Hello ' . $name;\n    }\n}\n"))),(0,r.yg)(i.A,{value:"php7",mdxType:"TabItem"},(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-php"},"namespace App\\Controller;\n\nuse TheCodingMachine\\GraphQLite\\Annotations\\Query;\n\nclass MyController\n{\n    /**\n     * @Query\n     */\n    public function hello(string $name): string\n    {\n        return 'Hello ' . $name;\n    }\n}\n")))),(0,r.yg)("p",null,"This query is equivalent to the following ",(0,r.yg)("a",{parentName:"p",href:"https://graphql.org/learn/schema/#type-language"},"GraphQL type language"),":"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-graphql"},"Type Query {\n    hello(name: String!): String!\n}\n")),(0,r.yg)("p",null,"As you can see, GraphQLite will automatically do the mapping between PHP types and GraphQL types."),(0,r.yg)("div",{class:"alert alert--warning"},(0,r.yg)("strong",null,"Heads up!")," If you are not using a framework with an autowiring container (like Symfony or Laravel), please be aware that the ",(0,r.yg)("code",null,"MyController")," class must exist in the container of your application. Furthermore, the identifier of the controller in the container MUST be the fully qualified class name of controller."),(0,r.yg)("h2",{id:"about-annotations--attributes"},"About annotations / attributes"),(0,r.yg)("p",null,"GraphQLite relies a lot on annotations (we call them attributes since PHP 8)."),(0,r.yg)("p",null,'It supports both the old "Doctrine annotations" style (',(0,r.yg)("inlineCode",{parentName:"p"},"@Query"),") and the new PHP 8 attributes (",(0,r.yg)("inlineCode",{parentName:"p"},"#[Query]"),")."),(0,r.yg)("p",null,"Read the ",(0,r.yg)("a",{parentName:"p",href:"/docs/doctrine-annotations-attributes"},"Doctrine annotations VS attributes")," documentation if you are not familiar with this concept."),(0,r.yg)("h2",{id:"testing-the-query"},"Testing the query"),(0,r.yg)("p",null,"The default GraphQL endpoint is ",(0,r.yg)("inlineCode",{parentName:"p"},"/graphql"),"."),(0,r.yg)("p",null,"The easiest way to test a GraphQL endpoint is to use ",(0,r.yg)("a",{parentName:"p",href:"https://github.com/graphql/graphiql"},"GraphiQL")," or\n",(0,r.yg)("a",{parentName:"p",href:"https://altair.sirmuel.design/"},"Altair")," clients (they are available as Chrome or Firefox plugins)"),(0,r.yg)("div",{class:"alert alert--info"},"If you are using the Symfony bundle, GraphiQL is also directly embedded.",(0,r.yg)("br",null),"Simply head to ",(0,r.yg)("code",null,"http://[path-to-my-app]/graphiql")),(0,r.yg)("p",null,"Here a query using our simple ",(0,r.yg)("em",{parentName:"p"},"Hello World")," example:"),(0,r.yg)("p",null,(0,r.yg)("img",{src:n(67258).A,width:"1132",height:"352"})),(0,r.yg)("h2",{id:"query-with-a-type"},"Query with a type"),(0,r.yg)("p",null,"So far, we simply declared a query. But we did not yet declare a type."),(0,r.yg)("p",null,"Let's assume you want to return a product:"),(0,r.yg)(l.A,{defaultValue:"php8",values:[{label:"PHP 8",value:"php8"},{label:"PHP 7",value:"php7"}],mdxType:"Tabs"},(0,r.yg)(i.A,{value:"php8",mdxType:"TabItem"},(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-php"},"namespace App\\Controller;\n\nuse TheCodingMachine\\GraphQLite\\Annotations\\Query;\n\nclass ProductController\n{\n    #[Query]\n    public function product(string $id): Product\n    {\n        // Some code that looks for a product and returns it.\n    }\n}\n"))),(0,r.yg)(i.A,{value:"php7",mdxType:"TabItem"},(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-php"},"namespace App\\Controller;\n\nuse TheCodingMachine\\GraphQLite\\Annotations\\Query;\n\nclass ProductController\n{\n    /**\n     * @Query\n     */\n    public function product(string $id): Product\n    {\n        // Some code that looks for a product and returns it.\n    }\n}\n")))),(0,r.yg)("p",null,"As the ",(0,r.yg)("inlineCode",{parentName:"p"},"Product")," class is not a scalar type, you must tell GraphQLite how to handle it:"),(0,r.yg)(l.A,{defaultValue:"php8",values:[{label:"PHP 8",value:"php8"},{label:"PHP 7",value:"php7"}],mdxType:"Tabs"},(0,r.yg)(i.A,{value:"php8",mdxType:"TabItem"},(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-php"},"namespace App\\Entities;\n\nuse TheCodingMachine\\GraphQLite\\Annotations\\Field;\nuse TheCodingMachine\\GraphQLite\\Annotations\\Type;\n\n#[Type]\nclass Product\n{\n    // ...\n\n    #[Field]\n    public function getName(): string\n    {\n        return $this->name;\n    }\n\n    #[Field]\n    public function getPrice(): ?float\n    {\n        return $this->price;\n    }\n}\n"))),(0,r.yg)(i.A,{value:"php7",mdxType:"TabItem"},(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-php"},"namespace App\\Entities;\n\nuse TheCodingMachine\\GraphQLite\\Annotations\\Field;\nuse TheCodingMachine\\GraphQLite\\Annotations\\Type;\n\n/**\n * @Type()\n */\nclass Product\n{\n    // ...\n\n    /**\n     * @Field()\n     */\n    public function getName(): string\n    {\n        return $this->name;\n    }\n\n    /**\n     * @Field()\n     */\n    public function getPrice(): ?float\n    {\n        return $this->price;\n    }\n}\n")))),(0,r.yg)("p",null,"The ",(0,r.yg)("inlineCode",{parentName:"p"},"@Type")," annotation is used to inform GraphQLite that the ",(0,r.yg)("inlineCode",{parentName:"p"},"Product")," class is a GraphQL type."),(0,r.yg)("p",null,"The ",(0,r.yg)("inlineCode",{parentName:"p"},"@Field")," annotation is used to define the GraphQL fields. This annotation must be put on a ",(0,r.yg)("strong",{parentName:"p"},"public method"),"."),(0,r.yg)("p",null,"The ",(0,r.yg)("inlineCode",{parentName:"p"},"Product")," class must be in one of the ",(0,r.yg)("em",{parentName:"p"},"types")," namespaces. As for ",(0,r.yg)("em",{parentName:"p"},"controller")," classes, you configured this namespace when you installed\nGraphQLite. By default, in Symfony, the allowed types namespaces are ",(0,r.yg)("inlineCode",{parentName:"p"},"App\\Entity")," and ",(0,r.yg)("inlineCode",{parentName:"p"},"App\\Types"),"."),(0,r.yg)("p",null,"This query is equivalent to the following ",(0,r.yg)("a",{parentName:"p",href:"https://graphql.org/learn/schema/#type-language"},"GraphQL type language"),":"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-graphql"},"Type Product {\n    name: String!\n    price: Float\n}\n")),(0,r.yg)("div",{class:"alert alert--info"},(0,r.yg)("p",null,"If you are used to  ",(0,r.yg)("a",{href:"https://en.wikipedia.org/wiki/Domain-driven_design"},"Domain driven design"),", you probably realize that the ",(0,r.yg)("code",null,"Product")," class is part of your ",(0,r.yg)("i",null,"domain"),"."),(0,r.yg)("p",null,"GraphQL annotations are adding some serialization logic that is out of scope of the domain. These are ",(0,r.yg)("i",null,"just")," annotations and for most project, this is the fastest and easiest route."),(0,r.yg)("p",null,"If you feel that GraphQL annotations do not belong to the domain, or if you cannot modify the class directly (maybe because it is part of a third party library), there is another way to create types without annotating the domain class. We will explore that in the next chapter.")))}y.isMDXComponent=!0},67258:(e,t,n)=>{n.d(t,{A:()=>a});const a=n.p+"assets/images/query1-5a22bbe2398efcc725ea571a07ff2c9b.png"}}]);