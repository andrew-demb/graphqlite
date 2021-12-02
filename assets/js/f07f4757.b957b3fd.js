"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[7517],{58215:function(e,n,t){var a=t(67294);n.Z=function(e){var n=e.children,t=e.hidden,l=e.className;return a.createElement("div",{role:"tabpanel",hidden:t,className:l},n)}},55064:function(e,n,t){t.d(n,{Z:function(){return m}});var a=t(87462),l=t(67294),r=t(72389),i=t(79443);var s=function(){var e=(0,l.useContext)(i.Z);if(null==e)throw new Error('"useUserPreferencesContext" is used outside of "Layout" component.');return e},p=t(83039),c=t(86010),o="tabItem_vU9c";function u(e){var n,t,a,r=e.lazy,i=e.block,u=e.defaultValue,m=e.values,d=e.groupId,h=e.className,f=l.Children.map(e.children,(function(e){if((0,l.isValidElement)(e)&&void 0!==e.props.value)return e;throw new Error("Docusaurus error: Bad <Tabs> child <"+("string"==typeof e.type?e.type:e.type.name)+'>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.')})),g=null!=m?m:f.map((function(e){var n=e.props;return{value:n.value,label:n.label}})),k=(0,p.lx)(g,(function(e,n){return e.value===n.value}));if(k.length>0)throw new Error('Docusaurus error: Duplicate values "'+k.map((function(e){return e.value})).join(", ")+'" found in <Tabs>. Every value needs to be unique.');var v=null===u?u:null!=(n=null!=u?u:null==(t=f.find((function(e){return e.props.default})))?void 0:t.props.value)?n:null==(a=f[0])?void 0:a.props.value;if(null!==v&&!g.some((function(e){return e.value===v})))throw new Error('Docusaurus error: The <Tabs> has a defaultValue "'+v+'" but none of its children has the corresponding value. Available values are: '+g.map((function(e){return e.value})).join(", ")+". If you intend to show no default tab, use defaultValue={null} instead.");var y=s(),b=y.tabGroupChoices,N=y.setTabGroupChoices,T=(0,l.useState)(v),C=T[0],I=T[1],U=[],w=(0,p.o5)().blockElementScrollPositionUntilNextRender;if(null!=d){var x=b[d];null!=x&&x!==C&&g.some((function(e){return e.value===x}))&&I(x)}var P=function(e){var n=e.currentTarget,t=U.indexOf(n),a=g[t].value;a!==C&&(w(n),I(a),null!=d&&N(d,a))},L=function(e){var n,t=null;switch(e.key){case"ArrowRight":var a=U.indexOf(e.currentTarget)+1;t=U[a]||U[0];break;case"ArrowLeft":var l=U.indexOf(e.currentTarget)-1;t=U[l]||U[U.length-1]}null==(n=t)||n.focus()};return l.createElement("div",{className:"tabs-container"},l.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,c.Z)("tabs",{"tabs--block":i},h)},g.map((function(e){var n=e.value,t=e.label;return l.createElement("li",{role:"tab",tabIndex:C===n?0:-1,"aria-selected":C===n,className:(0,c.Z)("tabs__item",o,{"tabs__item--active":C===n}),key:n,ref:function(e){return U.push(e)},onKeyDown:L,onFocus:P,onClick:P},null!=t?t:n)}))),r?(0,l.cloneElement)(f.filter((function(e){return e.props.value===C}))[0],{className:"margin-vert--md"}):l.createElement("div",{className:"margin-vert--md"},f.map((function(e,n){return(0,l.cloneElement)(e,{key:n,hidden:e.props.value!==C})}))))}function m(e){var n=(0,r.Z)();return l.createElement(u,(0,a.Z)({key:String(n)},e))}},45595:function(e,n,t){t.r(n),t.d(n,{frontMatter:function(){return c},contentTitle:function(){return o},metadata:function(){return u},toc:function(){return m},default:function(){return h}});var a=t(87462),l=t(63366),r=(t(67294),t(3905)),i=t(55064),s=t(58215),p=["components"],c={id:"inheritance-interfaces",title:"Inheritance and interfaces",sidebar_label:"Inheritance and interfaces"},o=void 0,u={unversionedId:"inheritance-interfaces",id:"version-3.0/inheritance-interfaces",isDocsHomePage:!1,title:"Inheritance and interfaces",description:"Modeling inheritance",source:"@site/versioned_docs/version-3.0/inheritance-interfaces.mdx",sourceDirName:".",slug:"/inheritance-interfaces",permalink:"/docs/3.0/inheritance-interfaces",editUrl:"https://github.com/thecodingmachine/graphqlite/edit/master/website/versioned_docs/version-3.0/inheritance-interfaces.mdx",tags:[],version:"3.0",lastUpdatedBy:"St\xe9phane",lastUpdatedAt:1638404694,formattedLastUpdatedAt:"12/2/2021",frontMatter:{id:"inheritance-interfaces",title:"Inheritance and interfaces",sidebar_label:"Inheritance and interfaces"}},m=[{value:"Modeling inheritance",id:"modeling-inheritance",children:[],level:2},{value:"Mapping interfaces",id:"mapping-interfaces",children:[{value:"Implementing interfaces",id:"implementing-interfaces",children:[],level:3},{value:"Interfaces without an explicit implementing type",id:"interfaces-without-an-explicit-implementing-type",children:[],level:3}],level:2}],d={toc:m};function h(e){var n=e.components,t=(0,l.Z)(e,p);return(0,r.kt)("wrapper",(0,a.Z)({},d,t,{components:n,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"modeling-inheritance"},"Modeling inheritance"),(0,r.kt)("p",null,"Some of your entities may extend other entities. GraphQLite will do its best to represent this hierarchy of objects in GraphQL using interfaces."),(0,r.kt)("p",null,"Let's say you have two classes, ",(0,r.kt)("inlineCode",{parentName:"p"},"Contact")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"User")," (which extends ",(0,r.kt)("inlineCode",{parentName:"p"},"Contact"),"):"),(0,r.kt)(i.Z,{defaultValue:"php8",values:[{label:"PHP 8",value:"php8"},{label:"PHP 7",value:"php7"}],mdxType:"Tabs"},(0,r.kt)(s.Z,{value:"php8",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-php"},"#[Type]\nclass Contact\n{\n    // ...\n}\n\n#[Type]\nclass User extends Contact\n{\n    // ...\n}\n"))),(0,r.kt)(s.Z,{value:"php7",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-php"},"/**\n * @Type\n */\nclass Contact\n{\n    // ...\n}\n\n/**\n * @Type\n */\nclass User extends Contact\n{\n    // ...\n}\n")))),(0,r.kt)("p",null,"Now, let's assume you have a query that returns a contact:"),(0,r.kt)(i.Z,{defaultValue:"php8",values:[{label:"PHP 8",value:"php8"},{label:"PHP 7",value:"php7"}],mdxType:"Tabs"},(0,r.kt)(s.Z,{value:"php8",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-php"},"class ContactController\n{\n    #[Query]\n    public function getContact(): Contact\n    {\n        // ...\n    }\n}\n"))),(0,r.kt)(s.Z,{value:"php7",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-php"},"class ContactController\n{\n    /**\n     * @Query()\n     */\n    public function getContact(): Contact\n    {\n        // ...\n    }\n}\n")))),(0,r.kt)("p",null,"When writing your GraphQL query, you are able to use fragments to retrieve fields from the ",(0,r.kt)("inlineCode",{parentName:"p"},"User")," type:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-graphql"},"contact {\n    name\n    ... User {\n       email\n    }\n}\n")),(0,r.kt)("p",null,"Written in ",(0,r.kt)("a",{parentName:"p",href:"https://graphql.org/learn/schema/#type-language"},"GraphQL type language"),", the representation of types\nwould look like this:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-graphql"},"interface ContactInterface {\n    // List of fields declared in Contact class\n}\n\ntype Contact implements ContactInterface {\n    // List of fields declared in Contact class\n}\n\ntype User implements ContactInterface {\n    // List of fields declared in Contact and User classes\n}\n")),(0,r.kt)("p",null,"Behind the scene, GraphQLite will detect that the ",(0,r.kt)("inlineCode",{parentName:"p"},"Contact")," class is extended by the ",(0,r.kt)("inlineCode",{parentName:"p"},"User")," class.\nBecause the class is extended, a GraphQL ",(0,r.kt)("inlineCode",{parentName:"p"},"ContactInterface")," interface is created dynamically."),(0,r.kt)("p",null,"The GraphQL ",(0,r.kt)("inlineCode",{parentName:"p"},"User")," type will also automatically implement this ",(0,r.kt)("inlineCode",{parentName:"p"},"ContactInterface"),". The interface contains all the fields\navailable in the ",(0,r.kt)("inlineCode",{parentName:"p"},"Contact")," type."),(0,r.kt)("h2",{id:"mapping-interfaces"},"Mapping interfaces"),(0,r.kt)("p",null,"If you want to create a pure GraphQL interface, you can also add a ",(0,r.kt)("inlineCode",{parentName:"p"},"@Type")," annotation on a PHP interface."),(0,r.kt)(i.Z,{defaultValue:"php8",values:[{label:"PHP 8",value:"php8"},{label:"PHP 7",value:"php7"}],mdxType:"Tabs"},(0,r.kt)(s.Z,{value:"php8",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-php"},"#[Type]\ninterface UserInterface\n{\n    #[Field]\n    public function getUserName(): string;\n}\n"))),(0,r.kt)(s.Z,{value:"php7",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-php"},"/**\n * @Type\n */\ninterface UserInterface\n{\n    /**\n     * @Field\n     */\n    public function getUserName(): string;\n}\n")))),(0,r.kt)("p",null,"This will automatically create a GraphQL interface whose description is:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-graphql"},"interface UserInterface {\n    userName: String!\n}\n")),(0,r.kt)("h3",{id:"implementing-interfaces"},"Implementing interfaces"),(0,r.kt)("p",null,'You don\'t have to do anything special to implement an interface in your GraphQL types.\nSimply "implement" the interface in PHP and you are done!'),(0,r.kt)(i.Z,{defaultValue:"php8",values:[{label:"PHP 8",value:"php8"},{label:"PHP 7",value:"php7"}],mdxType:"Tabs"},(0,r.kt)(s.Z,{value:"php8",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-php"},"#[Type]\nclass User implements UserInterface\n{\n    public function getUserName(): string;\n}\n"))),(0,r.kt)(s.Z,{value:"php7",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-php"},"/**\n * @Type\n */\nclass User implements UserInterface\n{\n    public function getUserName(): string;\n}\n")))),(0,r.kt)("p",null,"This will translate in GraphQL schema as:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-graphql"},"interface UserInterface {\n    userName: String!\n}\n\ntype User implements UserInterface {\n    userName: String!\n}\n")),(0,r.kt)("p",null,"Please note that you do not need to put the ",(0,r.kt)("inlineCode",{parentName:"p"},"@Field")," annotation again in the implementing class."),(0,r.kt)("h3",{id:"interfaces-without-an-explicit-implementing-type"},"Interfaces without an explicit implementing type"),(0,r.kt)("p",null,"You don't have to explicitly put a ",(0,r.kt)("inlineCode",{parentName:"p"},"@Type")," annotation on the class implementing the interface (though this\nis usually a good idea)."),(0,r.kt)(i.Z,{defaultValue:"php8",values:[{label:"PHP 8",value:"php8"},{label:"PHP 7",value:"php7"}],mdxType:"Tabs"},(0,r.kt)(s.Z,{value:"php8",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-php"},"/**\n * Look, this class has no #Type attribute\n */\nclass User implements UserInterface\n{\n    public function getUserName(): string;\n}\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-php"},"class UserController\n{\n    #[Query]\n    public function getUser(): UserInterface // This will work!\n    {\n        // ...\n    }\n}\n"))),(0,r.kt)(s.Z,{value:"php7",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-php"},"/**\n * Look, this class has no @Type annotation\n */\nclass User implements UserInterface\n{\n    public function getUserName(): string;\n}\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-php"},"class UserController\n{\n    /**\n     * @Query()\n     */\n    public function getUser(): UserInterface // This will work!\n    {\n        // ...\n    }\n}\n")))),(0,r.kt)("div",{class:"alert alert--info"},'If GraphQLite cannot find a proper GraphQL Object type implementing an interface, it will create an object type "on the fly".'),(0,r.kt)("p",null,"In the example above, because the ",(0,r.kt)("inlineCode",{parentName:"p"},"User")," class has no ",(0,r.kt)("inlineCode",{parentName:"p"},"@Type")," annotations, GraphQLite will\ncreate a ",(0,r.kt)("inlineCode",{parentName:"p"},"UserImpl")," type that implements ",(0,r.kt)("inlineCode",{parentName:"p"},"UserInterface"),"."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-graphql"},"interface UserInterface {\n    userName: String!\n}\n\ntype UserImpl implements UserInterface {\n    userName: String!\n}\n")))}h.isMDXComponent=!0}}]);