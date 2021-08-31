"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[4211],{3905:function(e,t,n){n.d(t,{Zo:function(){return s},kt:function(){return m}});var a=n(67294);function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,l=function(e,t){if(null==e)return{};var n,a,l={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(l[n]=e[n]);return l}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(l[n]=e[n])}return l}var p=a.createContext({}),u=function(e){var t=a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},s=function(e){var t=u(e.components);return a.createElement(p.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,l=e.mdxType,r=e.originalType,p=e.parentName,s=o(e,["components","mdxType","originalType","parentName"]),d=u(n),m=l,f=d["".concat(p,".").concat(m)]||d[m]||c[m]||r;return n?a.createElement(f,i(i({ref:t},s),{},{components:n})):a.createElement(f,i({ref:t},s))}));function m(e,t){var n=arguments,l=t&&t.mdxType;if("string"==typeof e||l){var r=n.length,i=new Array(r);i[0]=d;var o={};for(var p in t)hasOwnProperty.call(t,p)&&(o[p]=t[p]);o.originalType=e,o.mdxType="string"==typeof e?e:l,i[1]=o;for(var u=2;u<r;u++)i[u]=n[u];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},58215:function(e,t,n){var a=n(67294);t.Z=function(e){var t=e.children,n=e.hidden,l=e.className;return a.createElement("div",{role:"tabpanel",hidden:n,className:l},t)}},55064:function(e,t,n){n.d(t,{Z:function(){return c}});var a=n(67294),l=n(79443);var r=function(){var e=(0,a.useContext)(l.Z);if(null==e)throw new Error('"useUserPreferencesContext" is used outside of "Layout" component.');return e},i=n(86010),o="tabItem_1uMI",p="tabItemActive_2DSg";var u=37,s=39;var c=function(e){var t=e.lazy,n=e.block,l=e.defaultValue,c=e.values,d=e.groupId,m=e.className,f=r(),h=f.tabGroupChoices,y=f.setTabGroupChoices,b=(0,a.useState)(l),v=b[0],k=b[1],g=a.Children.toArray(e.children),P=[];if(null!=d){var T=h[d];null!=T&&T!==v&&c.some((function(e){return e.value===T}))&&k(T)}var x=function(e){var t=e.currentTarget,n=P.indexOf(t),a=c[n].value;k(a),null!=d&&(y(d,a),setTimeout((function(){var e,n,a,l,r,i,o,u;(e=t.getBoundingClientRect(),n=e.top,a=e.left,l=e.bottom,r=e.right,i=window,o=i.innerHeight,u=i.innerWidth,n>=0&&r<=u&&l<=o&&a>=0)||(t.scrollIntoView({block:"center",behavior:"smooth"}),t.classList.add(p),setTimeout((function(){return t.classList.remove(p)}),2e3))}),150))},w=function(e){var t,n;switch(e.keyCode){case s:var a=P.indexOf(e.target)+1;n=P[a]||P[0];break;case u:var l=P.indexOf(e.target)-1;n=P[l]||P[P.length-1]}null==(t=n)||t.focus()};return a.createElement("div",{className:"tabs-container"},a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,i.Z)("tabs",{"tabs--block":n},m)},c.map((function(e){var t=e.value,n=e.label;return a.createElement("li",{role:"tab",tabIndex:v===t?0:-1,"aria-selected":v===t,className:(0,i.Z)("tabs__item",o,{"tabs__item--active":v===t}),key:t,ref:function(e){return P.push(e)},onKeyDown:w,onFocus:x,onClick:x},n)}))),t?(0,a.cloneElement)(g.filter((function(e){return e.props.value===v}))[0],{className:"margin-vert--md"}):a.createElement("div",{className:"margin-vert--md"},g.map((function(e,t){return(0,a.cloneElement)(e,{key:t,hidden:e.props.value!==v})}))))}},79443:function(e,t,n){var a=(0,n(67294).createContext)(void 0);t.Z=a},59448:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return u},contentTitle:function(){return s},metadata:function(){return c},toc:function(){return d},default:function(){return f}});var a=n(87462),l=n(63366),r=(n(67294),n(3905)),i=n(55064),o=n(58215),p=["components"],u={id:"multiple-output-types",title:"Mapping multiple output types for the same class",sidebar_label:"Class with multiple output types"},s=void 0,c={unversionedId:"multiple-output-types",id:"version-4.2/multiple-output-types",isDocsHomePage:!1,title:"Mapping multiple output types for the same class",description:"Available in GraphQLite 4.0+",source:"@site/versioned_docs/version-4.2/multiple-output-types.mdx",sourceDirName:".",slug:"/multiple-output-types",permalink:"/docs/4.2/multiple-output-types",editUrl:"https://github.com/thecodingmachine/graphqlite/edit/master/website/versioned_docs/version-4.2/multiple-output-types.mdx",tags:[],version:"4.2",lastUpdatedBy:"Jacob Thomason",lastUpdatedAt:1630412896,formattedLastUpdatedAt:"8/31/2021",frontMatter:{id:"multiple-output-types",title:"Mapping multiple output types for the same class",sidebar_label:"Class with multiple output types"},sidebar:"version-4.2/docs",previous:{title:"Extending an input type",permalink:"/docs/4.2/extend-input-type"},next:{title:"Symfony specific features",permalink:"/docs/4.2/symfony-bundle-advanced"}},d=[{value:"Example",id:"example",children:[]},{value:"Extending a non-default type",id:"extending-a-non-default-type",children:[]}],m={toc:d};function f(e){var t=e.components,n=(0,l.Z)(e,p);return(0,r.kt)("wrapper",(0,a.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("small",null,"Available in GraphQLite 4.0+"),(0,r.kt)("p",null,"In most cases, you have one PHP class and you want to map it to one GraphQL output type."),(0,r.kt)("p",null,"But in very specific cases, you may want to use different GraphQL output type for the same class.\nFor instance, depending on the context, you might want to prevent the user from accessing some fields of your object."),(0,r.kt)("p",null,'To do so, you need to create 2 output types for the same PHP class. You typically do this using the "default" attribute of the ',(0,r.kt)("inlineCode",{parentName:"p"},"@Type")," annotation."),(0,r.kt)("h2",{id:"example"},"Example"),(0,r.kt)("p",null,"Here is an example. Say we are manipulating products. When I query a ",(0,r.kt)("inlineCode",{parentName:"p"},"Product")," details, I want to have access to all fields.\nBut for some reason, I don't want to expose the price field of a product if I query the list of all products."),(0,r.kt)(i.Z,{defaultValue:"php8",values:[{label:"PHP 8",value:"php8"},{label:"PHP 7",value:"php7"}],mdxType:"Tabs"},(0,r.kt)(o.Z,{value:"php8",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-php"},"#[Type]\nclass Product\n{\n    // ...\n\n    #[Field]\n    public function getName(): string\n    {\n        return $this->name;\n    }\n\n    #[Field]\n    public function getPrice(): ?float\n    {\n        return $this->price;\n    }\n}\n"))),(0,r.kt)(o.Z,{value:"php7",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-php"},"/**\n * @Type()\n */\nclass Product\n{\n    // ...\n\n    /**\n     * @Field()\n     */\n    public function getName(): string\n    {\n        return $this->name;\n    }\n\n    /**\n     * @Field()\n     */\n    public function getPrice(): ?float\n    {\n        return $this->price;\n    }\n}\n")))),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"Product"),' class is declaring a classic GraphQL output type named "Product".'),(0,r.kt)(i.Z,{defaultValue:"php8",values:[{label:"PHP 8",value:"php8"},{label:"PHP 7",value:"php7"}],mdxType:"Tabs"},(0,r.kt)(o.Z,{value:"php8",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-php"},'#[Type(class: Product::class, name: "LimitedProduct", default: false)]\n#[SourceField(name: "name")]\nclass LimitedProductType\n{\n    // ...\n}\n'))),(0,r.kt)(o.Z,{value:"php7",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-php"},'/**\n * @Type(class=Product::class, name="LimitedProduct", default=false)\n * @SourceField(name="name")\n */\nclass LimitedProductType\n{\n    // ...\n}\n')))),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"LimitedProductType")," also declares an ",(0,r.kt)("a",{parentName:"p",href:"/docs/4.2/external-type-declaration"},'"external" type')," mapping the ",(0,r.kt)("inlineCode",{parentName:"p"},"Product")," class.\nBut pay special attention to the ",(0,r.kt)("inlineCode",{parentName:"p"},"@Type")," annotation."),(0,r.kt)("p",null,"First of all, we specify ",(0,r.kt)("inlineCode",{parentName:"p"},'name="LimitedProduct"'),'. This is useful to avoid having colliding names with the "Product" GraphQL output type\nthat is already declared.'),(0,r.kt)("p",null,"Then, we specify ",(0,r.kt)("inlineCode",{parentName:"p"},"default=false"),". This means that by default, the ",(0,r.kt)("inlineCode",{parentName:"p"},"Product")," class should not be mapped to the ",(0,r.kt)("inlineCode",{parentName:"p"},"LimitedProductType"),".\nThis type will only be used when we explicitly request it."),(0,r.kt)("p",null,"Finally, we can write our requests:"),(0,r.kt)(i.Z,{defaultValue:"php8",values:[{label:"PHP 8",value:"php8"},{label:"PHP 7",value:"php7"}],mdxType:"Tabs"},(0,r.kt)(o.Z,{value:"php8",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-php"},'class ProductController\n{\n    /**\n     * This field will use the default type.\n     */\n    #[Field]\n    public function getProduct(int $id): Product { /* ... */ }\n\n    /**\n     * Because we use the "outputType" attribute, this field will use the other type.\n     *\n     * @return Product[]\n     */\n    #[Field(outputType: "[LimitedProduct!]!")]\n    public function getProducts(): array { /* ... */ }\n}\n'))),(0,r.kt)(o.Z,{value:"php7",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-php"},'class ProductController\n{\n    /**\n     * This field will use the default type.\n     *\n     * @Field\n     */\n    public function getProduct(int $id): Product { /* ... */ }\n\n    /**\n     * Because we use the "outputType" attribute, this field will use the other type.\n     *\n     * @Field(outputType="[LimitedProduct!]!")\n     * @return Product[]\n     */\n    public function getProducts(): array { /* ... */ }\n}\n')))),(0,r.kt)("p",null,'Notice how the "outputType" attribute is used in the ',(0,r.kt)("inlineCode",{parentName:"p"},"@Field")," annotation to force the output type."),(0,r.kt)("p",null,"Is a result, when the end user calls the ",(0,r.kt)("inlineCode",{parentName:"p"},"product")," query, we will have the possibility to fetch the ",(0,r.kt)("inlineCode",{parentName:"p"},"name")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"price")," fields,\nbut if he calls the ",(0,r.kt)("inlineCode",{parentName:"p"},"products")," query, each product in the list will have a ",(0,r.kt)("inlineCode",{parentName:"p"},"name")," field but no ",(0,r.kt)("inlineCode",{parentName:"p"},"price")," field. We managed\nto successfully expose a different set of fields based on the query context."),(0,r.kt)("h2",{id:"extending-a-non-default-type"},"Extending a non-default type"),(0,r.kt)("p",null,"If you want to extend a type using the ",(0,r.kt)("inlineCode",{parentName:"p"},"@ExtendType")," annotation and if this type is declared as non-default,\nyou need to target the type by name instead of by class."),(0,r.kt)("p",null,"So instead of writing:"),(0,r.kt)(i.Z,{defaultValue:"php8",values:[{label:"PHP 8",value:"php8"},{label:"PHP 7",value:"php7"}],mdxType:"Tabs"},(0,r.kt)(o.Z,{value:"php8",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-php"},"#[ExtendType(class: Product::class)]\n"))),(0,r.kt)(o.Z,{value:"php7",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-php"},"/**\n * @ExtendType(class=Product::class)\n */\n")))),(0,r.kt)("p",null,"you will write:"),(0,r.kt)(i.Z,{defaultValue:"php8",values:[{label:"PHP 8",value:"php8"},{label:"PHP 7",value:"php7"}],mdxType:"Tabs"},(0,r.kt)(o.Z,{value:"php8",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-php"},'#ExtendType(name: "LimitedProduct")\n'))),(0,r.kt)(o.Z,{value:"php7",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-php"},'/**\n * @ExtendType(name="LimitedProduct")\n */\n')))),(0,r.kt)("p",null,'Notice how we use the "name" attribute instead of the "class" attribute in the ',(0,r.kt)("inlineCode",{parentName:"p"},"@ExtendType")," annotation."))}f.isMDXComponent=!0},86010:function(e,t,n){function a(e){var t,n,l="";if("string"==typeof e||"number"==typeof e)l+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(n=a(e[t]))&&(l&&(l+=" "),l+=n);else for(t in e)e[t]&&(l&&(l+=" "),l+=t);return l}function l(){for(var e,t,n=0,l="";n<arguments.length;)(e=arguments[n++])&&(t=a(e))&&(l&&(l+=" "),l+=t);return l}n.d(t,{Z:function(){return l}})}}]);