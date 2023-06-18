import{l as n,d as e}from"../../../preact.v10.5.15-92968d95.js";var t,a,_,r=0,o=[],i=n.__b,c=n.__r,s=n.diffed,l=n.__c,d=n.unmount;function u(e,t){n.__h&&n.__h(a,e,r||t),r=0;var _=a.__H||(a.__H={__:[],__h:[]});return e>=_.__.length&&_.__.push({}),_.__[e]}function m(n){return r=1,function(n,e,_){var r=u(t++,2);return r.t=n,r.__c||(r.__=[_?_(e):g(void 0,e),function(n){var e=r.t(r.__[0],n);r.__[0]!==e&&(r.__=[e,r.__[1]],r.__c.setState({}))}],r.__c=a),r.__}(g,n)}function h(){o.forEach((function(e){if(e.__P)try{e.__H.__h.forEach(p),e.__H.__h.forEach(f),e.__H.__h=[]}catch(t){e.__H.__h=[],n.__e(t,e.__v)}})),o=[]}n.__b=function(n){a=null,i&&i(n)},n.__r=function(n){c&&c(n),t=0;var e=(a=n.__c).__H;e&&(e.__h.forEach(p),e.__h.forEach(f),e.__h=[])},n.diffed=function(e){s&&s(e);var t=e.__c;t&&t.__H&&t.__H.__h.length&&(1!==o.push(t)&&_===n.requestAnimationFrame||((_=n.requestAnimationFrame)||function(n){var e,t=function(){clearTimeout(a),x&&cancelAnimationFrame(e),setTimeout(n)},a=setTimeout(t,100);x&&(e=requestAnimationFrame(t))})(h)),a=null},n.__c=function(e,t){t.some((function(e){try{e.__h.forEach(p),e.__h=e.__h.filter((function(n){return!n.__||f(n)}))}catch(a){t.some((function(n){n.__h&&(n.__h=[])})),t=[],n.__e(a,e.__v)}})),l&&l(e,t)},n.unmount=function(e){d&&d(e);var t=e.__c;if(t&&t.__H)try{t.__H.__.forEach(p)}catch(e){n.__e(e,t.__v)}};var x="function"==typeof requestAnimationFrame;function p(n){var e=a;"function"==typeof n.__c&&n.__c(),a=e}function f(n){var e=a;n.__c=n.__(),a=e}function g(n,e){return"function"==typeof e?e(n):e}let y="_Card_1axyx_1",b="_Icon__Plugin_1axyx_18",w="_CardList_1axyx_26",v="_CardName_1axyx_32",C="_CardHeader_1axyx_38",S="_CardDesc_1axyx_42",H="_CardSubtitle_1axyx_49",k="_Count_1axyx_55",z="_Form_1axyx_70",I="_Loading_1axyx_87",q="_Input_1axyx_92",F="_Submit_1axyx_111",E="_Results_1axyx_115";if("undefined"!=typeof document){const n=document.createElement("style"),e=document.createTextNode("._Card_1axyx_1 {\n  margin: 0.5rem 0.25em;\n  border-radius: 4px;\n  padding: 0.25rem 0.5rem 0.5rem 3.5rem;\n  flex-direction: column;\n  position: relative;\n  display: flex;\n  grid-column: span 1;\n  overflow: hidden;\n  font-family: Open Sans, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans,\n    sans-serif, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;\n  color: #1a202c;\n  -webkit-font-smoothing: antialiased;\n  box-sizing: border-box;\n  border: 1px solid #e2e8f0;\n}\n\n._Card_1axyx_1:nth-child(3n + 2) ._Icon__Plugin_1axyx_18 {\n  filter: hue-rotate(-60deg);\n}\n\n._Card_1axyx_1:nth-child(3n + 3) ._Icon__Plugin_1axyx_18 {\n  filter: hue-rotate(-120deg);\n}\n\n._CardList_1axyx_26 {\n  list-style: none;\n  max-width: 600px;\n  padding-left: 0;\n}\n\n._CardName_1axyx_32 {\n  margin: 0;\n  font-size: 24px;\n  font-weight: 500;\n}\n\n._CardHeader_1axyx_38 {\n  font-size: 1.1447rem;\n}\n\n._CardDesc_1axyx_42 {\n  max-width: 80ch;\n  margin-top: 0.25em;\n  margin-bottom: 0.25em;\n  line-height: 1.25;\n}\n\n._CardSubtitle_1axyx_49 {\n  margin: 0;\n  color: #7986a5;\n  font-size: 0.8735804647362989em;\n}\n\n._Count_1axyx_55 {\n  max-width: 600px;\n  min-height: 24px;\n  margin: 0.5rem 0 1rem;\n  color: rgba(black, 0.6);\n  font-weight: 300;\n  font-size: 1em;\n  font-style: italic;\n  text-align: center;\n\n  @media (min-width: 600px) {\n    font-size: 1.2em;\n  }\n}\n\n._Form_1axyx_70 {\n  display: flex;\n  width: 100%;\n  max-width: 600px;\n}\n\n._Icon__Plugin_1axyx_18 {\n  height: 52px;\n  width: 52px;\n  opacity: 0.5;\n  transform: rotate(45deg);\n  /* background: radial-gradient(to top,red,blue); */\n  position: absolute;\n  top: 13px;\n  left: 0px;\n}\n\n._Loading_1axyx_87 {\n  margin: 1rem;\n  text-align: center;\n}\n\n._Input_1axyx_92 {\n  flex-grow: 1;\n  flex-shrink: 0;\n  box-sizing: border-box;\n  padding: 0.25em 0.75em;\n  font-size: 1em;\n  border-width: 1px 0 1px 1px;\n  border-radius: 4px 0 0 4px;\n  box-shadow: 0 0 0 2px rgba(46, 94, 130, 0);\n  transition: box-shadow 150ms linear;\n  -webkit-appearance: none;\n     -moz-appearance: none;\n          appearance: none;\n}\n\n._Input_1axyx_92:focus {\n  border-color: #2e5e82;\n  outline: none;\n  box-shadow: 0 0 0 2px rgba(46, 94, 130, 1);\n}\n\n._Input_1axyx_92:focus + ._Submit_1axyx_111 {\n  box-shadow: 0 0 0 2px rgba(46, 94, 130, 1);\n}\n\n._Results_1axyx_115 {\n  max-width: 600px;\n}\n\n._Submit_1axyx_111 {\n  padding: 0.5em 1em;\n  color: white;\n  font-weight: 700;\n  font-size: 1em;\n  font-family: 'Overpass', sans-serif;\n  background-color: #2e5e82;\n  border: none;\n  border-radius: 0 4px 4px 0;\n  box-shadow: 0 0 0 2px rgba(46, 94, 130, 0);\n  transition: box-shadow 150ms linear;\n  -webkit-appearance: none;\n     -moz-appearance: none;\n          appearance: none;\n}\n");n.type="text/css",n.appendChild(e),document.head.appendChild(n)}var P=0;function L(e,t,a,_,r){var o,i,c={};for(i in t)"ref"==i?o=t[i]:c[i]=t[i];var s={type:e,props:c,key:a,ref:o,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:--P,__source:_,__self:r};if("function"==typeof e&&(o=e.defaultProps))for(i in o)void 0===c[i]&&(c[i]=o[i]);return n.vnode&&n.vnode(s),s}async function A(n){const e=new URLSearchParams([["q","snowpack plugin "+(n||"")],["count","100"]]),t=await fetch(`https://api.skypack.dev/v1/search?${e.toString()}`);return(await t.json()).results}function R({result:n}){const e=Intl.DateTimeFormat("en",{month:"long",day:"numeric",year:"numeric"}).format(Date.parse(n.updatedAt));return L("li",{class:y,children:[L("img",{class:b,src:"/img/plug-light.svg"}),L("header",{class:C,children:L("h3",{class:v,children:L("a",{href:`https://www.npmjs.com/package/${n.name}`,target:"_blank",children:L("span",{itemprop:"name",children:n.name})})})}),L("p",{class:S,itemprop:"description",children:n.description.split(". ")[0]}),L("p",{class:H,children:["Updated ",L("time",{class:"",datetime:n.updatedAt,children:e})]})]})}function U(){const _=new URLSearchParams(window.location.search),[r,o]=m(null),[i,c]=m(_.get("q"));return function(e,_){var r=u(t++,3);!n.__s&&function(n,e){return!n||n.length!==e.length||e.some((function(e,t){return e!==n[t]}))}(r.__H,_)&&(r.__=e,r.__H=_,a.__H.__h.push(r))}((()=>{(async()=>{o(await A(_.get("q")))})()}),[]),L(e,{children:[L("form",{name:"myform",id:"myform",class:z,action:"https://www.npmjs.com/search",method:"GET",onSubmit:async function(n){n.preventDefault();const e=new FormData(n.target).get("q"),t=new URLSearchParams(window.location.search);return t.set("q",e),window.history.pushState(null,null,"?"+t.toString()),c(e),o(await A(e)),!1},children:[L("input",{type:"search",name:"q",defaultValue:i,placeholder:"搜索 Sass, sitemaps, image optimization...",class:q}),L("button",{type:"submit",class:F,children:"搜索"})]}),L("div",{class:k,id:"total-result-count",children:!i&&r&&r.length>50&&`${r.length}+ 插件可用！`}),L("section",{id:"search-results",class:E,children:[!r&&L("div",{id:"loading-message",class:I,children:"Loading..."}),r&&0===r.length&&L("ul",{class:w,children:L("li",{style:"margin: 1rem; text-align: center;",children:"No results found."})}),r&&r.length>0&&L("ul",{class:w,children:r.map((n=>L(R,{result:n})))})]})]})}function D(n){return L(U,{...n})}export{D as default};