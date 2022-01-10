"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[3239],{58215:function(e,t,n){var a=n(67294);t.Z=function(e){var t=e.children,n=e.hidden,i=e.className;return a.createElement("div",{role:"tabpanel",hidden:n,className:i},t)}},55064:function(e,t,n){n.d(t,{Z:function(){return p}});var a=n(87462),i=n(67294),r=n(72389),o=n(79443);var l=function(){var e=(0,i.useContext)(o.Z);if(null==e)throw new Error('"useUserPreferencesContext" is used outside of "Layout" component.');return e},s=n(83039),u=n(86010),c="tabItem_vU9c";function d(e){var t,n,a,r=e.lazy,o=e.block,d=e.defaultValue,p=e.values,h=e.groupId,m=e.className,f=i.Children.map(e.children,(function(e){if((0,i.isValidElement)(e)&&void 0!==e.props.value)return e;throw new Error("Docusaurus error: Bad <Tabs> child <"+("string"==typeof e.type?e.type:e.type.name)+'>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.')})),v=null!=p?p:f.map((function(e){var t=e.props;return{value:t.value,label:t.label}})),g=(0,s.lx)(v,(function(e,t){return e.value===t.value}));if(g.length>0)throw new Error('Docusaurus error: Duplicate values "'+g.map((function(e){return e.value})).join(", ")+'" found in <Tabs>. Every value needs to be unique.');var y=null===d?d:null!=(t=null!=d?d:null==(n=f.find((function(e){return e.props.default})))?void 0:n.props.value)?t:null==(a=f[0])?void 0:a.props.value;if(null!==y&&!v.some((function(e){return e.value===y})))throw new Error('Docusaurus error: The <Tabs> has a defaultValue "'+y+'" but none of its children has the corresponding value. Available values are: '+v.map((function(e){return e.value})).join(", ")+". If you intend to show no default tab, use defaultValue={null} instead.");var b=l(),k=b.tabGroupChoices,w=b.setTabGroupChoices,T=(0,i.useState)(y),A=T[0],N=T[1],x=[],I=(0,s.o5)().blockElementScrollPositionUntilNextRender;if(null!=h){var C=k[h];null!=C&&C!==A&&v.some((function(e){return e.value===C}))&&N(C)}var E=function(e){var t=e.currentTarget,n=x.indexOf(t),a=v[n].value;a!==A&&(I(t),N(a),null!=h&&w(h,a))},L=function(e){var t,n=null;switch(e.key){case"ArrowRight":var a=x.indexOf(e.currentTarget)+1;n=x[a]||x[0];break;case"ArrowLeft":var i=x.indexOf(e.currentTarget)-1;n=x[i]||x[x.length-1]}null==(t=n)||t.focus()};return i.createElement("div",{className:"tabs-container"},i.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,u.Z)("tabs",{"tabs--block":o},m)},v.map((function(e){var t=e.value,n=e.label;return i.createElement("li",{role:"tab",tabIndex:A===t?0:-1,"aria-selected":A===t,className:(0,u.Z)("tabs__item",c,{"tabs__item--active":A===t}),key:t,ref:function(e){return x.push(e)},onKeyDown:L,onFocus:E,onClick:E},null!=n?n:t)}))),r?(0,i.cloneElement)(f.filter((function(e){return e.props.value===A}))[0],{className:"margin-vert--md"}):i.createElement("div",{className:"margin-vert--md"},f.map((function(e,t){return(0,i.cloneElement)(e,{key:t,hidden:e.props.value!==A})}))))}function p(e){var t=(0,r.Z)();return i.createElement(d,(0,a.Z)({key:String(t)},e))}},46475:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return u},contentTitle:function(){return c},metadata:function(){return d},toc:function(){return p},default:function(){return m}});var a=n(87462),i=n(63366),r=(n(67294),n(3905)),o=n(55064),l=n(58215),s=["components"],u={id:"autowiring",title:"Autowiring services",sidebar_label:"Autowiring services"},c=void 0,d={unversionedId:"autowiring",id:"version-5.0/autowiring",isDocsHomePage:!1,title:"Autowiring services",description:"GraphQLite can automatically inject services in your fields/queries/mutations signatures.",source:"@site/versioned_docs/version-5.0/autowiring.mdx",sourceDirName:".",slug:"/autowiring",permalink:"/docs/autowiring",editUrl:"https://github.com/thecodingmachine/graphqlite/edit/master/website/versioned_docs/version-5.0/autowiring.mdx",tags:[],version:"5.0",lastUpdatedBy:"dependabot[bot]",lastUpdatedAt:1641853042,formattedLastUpdatedAt:"1/10/2022",frontMatter:{id:"autowiring",title:"Autowiring services",sidebar_label:"Autowiring services"},sidebar:"version-5.0/docs",previous:{title:"Type mapping",permalink:"/docs/type-mapping"},next:{title:"Extending a type",permalink:"/docs/extend-type"}},p=[{value:"Sample",id:"sample",children:[],level:2},{value:"Best practices",id:"best-practices",children:[],level:2},{value:"Fetching a service by name (discouraged!)",id:"fetching-a-service-by-name-discouraged",children:[],level:2},{value:"Alternative solution",id:"alternative-solution",children:[],level:2}],h={toc:p};function m(e){var t=e.components,n=(0,i.Z)(e,s);return(0,r.kt)("wrapper",(0,a.Z)({},h,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"GraphQLite can automatically inject services in your fields/queries/mutations signatures."),(0,r.kt)("p",null,"Some of your fields may be computed. In order to compute these fields, you might need to call a service."),(0,r.kt)("p",null,"Most of the time, your ",(0,r.kt)("inlineCode",{parentName:"p"},"@Type")," annotation will be put on a model. And models do not have access to services.\nHopefully, if you add a type-hinted service in your field's declaration, GraphQLite will automatically fill it with\nthe service instance."),(0,r.kt)("h2",{id:"sample"},"Sample"),(0,r.kt)("p",null,"Let's assume you are running an international store. You have a ",(0,r.kt)("inlineCode",{parentName:"p"},"Product")," class. Each product has many names (depending\non the language of the user)."),(0,r.kt)(o.Z,{defaultValue:"php8",values:[{label:"PHP 8",value:"php8"},{label:"PHP 7",value:"php7"}],mdxType:"Tabs"},(0,r.kt)(l.Z,{value:"php8",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-php"},"namespace App\\Entities;\n\nuse TheCodingMachine\\GraphQLite\\Annotations\\Autowire;\nuse TheCodingMachine\\GraphQLite\\Annotations\\Field;\nuse TheCodingMachine\\GraphQLite\\Annotations\\Type;\n\nuse Symfony\\Component\\Translation\\TranslatorInterface;\n\n#[Type]\nclass Product\n{\n    // ...\n\n    #[Field]\n    public function getName(\n            #[Autowire]\n            TranslatorInterface $translator\n        ): string\n    {\n        return $translator->trans('product_name_'.$this->id);\n    }\n}\n"))),(0,r.kt)(l.Z,{value:"php7",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-php"},"namespace App\\Entities;\n\nuse TheCodingMachine\\GraphQLite\\Annotations\\Autowire;\nuse TheCodingMachine\\GraphQLite\\Annotations\\Field;\nuse TheCodingMachine\\GraphQLite\\Annotations\\Type;\n\nuse Symfony\\Component\\Translation\\TranslatorInterface;\n\n/**\n * @Type()\n */\nclass Product\n{\n    // ...\n\n    /**\n     * @Field()\n     * @Autowire(for=\"$translator\")\n     */\n    public function getName(TranslatorInterface $translator): string\n    {\n        return $translator->trans('product_name_'.$this->id);\n    }\n}\n")))),(0,r.kt)("p",null,"When GraphQLite queries the name, it will automatically fetch the translator service."),(0,r.kt)("div",{class:"alert alert--warning"},"As with most autowiring solutions, GraphQLite assumes that the service identifier in the container is the fully qualified class name of the type-hint. So in the example above, GraphQLite will look for a service whose name is ",(0,r.kt)("code",null,"Symfony\\Component\\Translation\\TranslatorInterface"),"."),(0,r.kt)("h2",{id:"best-practices"},"Best practices"),(0,r.kt)("p",null,"It is a good idea to refrain from type-hinting on concrete implementations.\nMost often, your field declaration will be in your model. If you add a type-hint on a service, you are binding your domain\nwith a particular service implementation. This makes your code tightly coupled and less testable."),(0,r.kt)("div",{class:"alert alert--danger"},"Please don't do that:",(0,r.kt)("pre",null,(0,r.kt)("code",null,"#[Field] public function getName(#[Autowire] MyTranslator $translator): string"))),(0,r.kt)("p",null,"Instead, be sure to type-hint against an interface."),(0,r.kt)("div",{class:"alert alert--success"},"Do this instead:",(0,r.kt)("pre",null,(0,r.kt)("code",null,"#[Field] public function getName(#[Autowire] TranslatorInterface $translator): string"))),(0,r.kt)("p",null,"By type-hinting against an interface, your code remains testable and is decoupled from the service implementation."),(0,r.kt)("h2",{id:"fetching-a-service-by-name-discouraged"},"Fetching a service by name (discouraged!)"),(0,r.kt)("p",null,"Optionally, you can specify the identifier of the service you want to fetch from the controller:"),(0,r.kt)(o.Z,{defaultValue:"php8",values:[{label:"PHP 8",value:"php8"},{label:"PHP 7",value:"php7"}],mdxType:"Tabs"},(0,r.kt)(l.Z,{value:"php8",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-php"},'#[Autowire(identifier: "translator")]\n'))),(0,r.kt)(l.Z,{value:"php7",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-php"},'/**\n * @Autowire(for="$translator", identifier="translator")\n */\n')))),(0,r.kt)("div",{class:"alert alert--danger"},"While GraphQLite offers the possibility to specify the name of the service to be autowired, we would like to emphasize that this is ",(0,r.kt)("strong",null,"highly discouraged"),'. Hard-coding a container identifier in the code of your class is akin to using the "service locator" pattern, which is known to be an anti-pattern. Please refrain from doing this as much as possible.'),(0,r.kt)("h2",{id:"alternative-solution"},"Alternative solution"),(0,r.kt)("p",null,"You may find yourself uncomfortable with the autowiring mechanism of GraphQLite. For instance maybe:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Your service identifier in the container is not the fully qualified class name of the service (this is often true if you are not using a container supporting autowiring)"),(0,r.kt)("li",{parentName:"ul"},"You do not want to inject a service in a domain object"),(0,r.kt)("li",{parentName:"ul"},"You simply do not like the magic of injecting services in a method signature")),(0,r.kt)("p",null,"If you do not want to use autowiring and if you still need to access services to compute a field, please read on\nthe next chapter to learn ",(0,r.kt)("a",{parentName:"p",href:"extend-type"},"how to extend a type"),"."))}m.isMDXComponent=!0}}]);