!function(t){var e=window.webpackHotUpdate;window.webpackHotUpdate=function(t,r){!function(t,e){if(!b[t]||!y[t])return;for(var r in y[t]=!1,e)Object.prototype.hasOwnProperty.call(e,r)&&(p[r]=e[r]);0==--m&&0===x&&E()}(t,r),e&&e(t,r)};var r,i=!0,n="94f32ee030bfdd71e848",a={},o=[],s=[];function c(t){var e=S[t];if(!e)return C;var i=function(i){return e.hot.active?(S[i]?-1===S[i].parents.indexOf(t)&&S[i].parents.push(t):(o=[t],r=i),-1===e.children.indexOf(i)&&e.children.push(i)):(console.warn("[HMR] unexpected require("+i+") from disposed module "+t),o=[]),C(i)},n=function(t){return{configurable:!0,enumerable:!0,get:function(){return C[t]},set:function(e){C[t]=e}}};for(var a in C)Object.prototype.hasOwnProperty.call(C,a)&&"e"!==a&&"t"!==a&&Object.defineProperty(i,a,n(a));return i.e=function(t){return"ready"===u&&h("prepare"),x++,C.e(t).then(e,(function(t){throw e(),t}));function e(){x--,"prepare"===u&&(v[t]||P(t),0===x&&0===m&&E())}},i.t=function(t,e){return 1&e&&(t=i(t)),C.t(t,-2&e)},i}function l(e){var i={_acceptedDependencies:{},_declinedDependencies:{},_selfAccepted:!1,_selfDeclined:!1,_selfInvalidated:!1,_disposeHandlers:[],_main:r!==e,active:!0,accept:function(t,e){if(void 0===t)i._selfAccepted=!0;else if("function"==typeof t)i._selfAccepted=t;else if("object"==typeof t)for(var r=0;r<t.length;r++)i._acceptedDependencies[t[r]]=e||function(){};else i._acceptedDependencies[t]=e||function(){}},decline:function(t){if(void 0===t)i._selfDeclined=!0;else if("object"==typeof t)for(var e=0;e<t.length;e++)i._declinedDependencies[t[e]]=!0;else i._declinedDependencies[t]=!0},dispose:function(t){i._disposeHandlers.push(t)},addDisposeHandler:function(t){i._disposeHandlers.push(t)},removeDisposeHandler:function(t){var e=i._disposeHandlers.indexOf(t);e>=0&&i._disposeHandlers.splice(e,1)},invalidate:function(){switch(this._selfInvalidated=!0,u){case"idle":(p={})[e]=t[e],h("ready");break;case"ready":j(e);break;case"prepare":case"check":case"dispose":case"apply":(g=g||[]).push(e)}},check:_,apply:A,status:function(t){if(!t)return u;d.push(t)},addStatusHandler:function(t){d.push(t)},removeStatusHandler:function(t){var e=d.indexOf(t);e>=0&&d.splice(e,1)},data:a[e]};return r=void 0,i}var d=[],u="idle";function h(t){u=t;for(var e=0;e<d.length;e++)d[e].call(null,t)}var f,p,w,g,m=0,x=0,v={},y={},b={};function M(t){return+t+""===t?+t:t}function _(t){if("idle"!==u)throw new Error("check() is only allowed in idle status");return i=t,h("check"),(e=1e4,e=e||1e4,new Promise((function(t,r){if("undefined"==typeof XMLHttpRequest)return r(new Error("No browser support"));try{var i=new XMLHttpRequest,a=C.p+""+n+".hot-update.json";i.open("GET",a,!0),i.timeout=e,i.send(null)}catch(t){return r(t)}i.onreadystatechange=function(){if(4===i.readyState)if(0===i.status)r(new Error("Manifest request to "+a+" timed out."));else if(404===i.status)t();else if(200!==i.status&&304!==i.status)r(new Error("Manifest request to "+a+" failed."));else{try{var e=JSON.parse(i.responseText)}catch(t){return void r(t)}t(e)}}}))).then((function(t){if(!t)return h(O()?"ready":"idle"),null;y={},v={},b=t.c,w=t.h,h("prepare");var e=new Promise((function(t,e){f={resolve:t,reject:e}}));p={};return P(0),"prepare"===u&&0===x&&0===m&&E(),e}));var e}function P(t){b[t]?(y[t]=!0,m++,function(t){var e=document.createElement("script");e.charset="utf-8",e.src=C.p+""+t+"."+n+".hot-update.js",document.head.appendChild(e)}(t)):v[t]=!0}function E(){h("ready");var t=f;if(f=null,t)if(i)Promise.resolve().then((function(){return A(i)})).then((function(e){t.resolve(e)}),(function(e){t.reject(e)}));else{var e=[];for(var r in p)Object.prototype.hasOwnProperty.call(p,r)&&e.push(M(r));t.resolve(e)}}function A(e){if("ready"!==u)throw new Error("apply() is only allowed in ready status");return function e(i){var s,c,l,d,u;function f(t){for(var e=[t],r={},i=e.map((function(t){return{chain:[t],id:t}}));i.length>0;){var n=i.pop(),a=n.id,o=n.chain;if((d=S[a])&&(!d.hot._selfAccepted||d.hot._selfInvalidated)){if(d.hot._selfDeclined)return{type:"self-declined",chain:o,moduleId:a};if(d.hot._main)return{type:"unaccepted",chain:o,moduleId:a};for(var s=0;s<d.parents.length;s++){var c=d.parents[s],l=S[c];if(l){if(l.hot._declinedDependencies[a])return{type:"declined",chain:o.concat([c]),moduleId:a,parentId:c};-1===e.indexOf(c)&&(l.hot._acceptedDependencies[a]?(r[c]||(r[c]=[]),m(r[c],[a])):(delete r[c],e.push(c),i.push({chain:o.concat([c]),id:c})))}}}}return{type:"accepted",moduleId:t,outdatedModules:e,outdatedDependencies:r}}function m(t,e){for(var r=0;r<e.length;r++){var i=e[r];-1===t.indexOf(i)&&t.push(i)}}O();var x={},v=[],y={},_=function(){console.warn("[HMR] unexpected require("+E.moduleId+") to disposed module")};for(var P in p)if(Object.prototype.hasOwnProperty.call(p,P)){var E;u=M(P),E=p[P]?f(u):{type:"disposed",moduleId:P};var A=!1,j=!1,D=!1,F="";switch(E.chain&&(F="\nUpdate propagation: "+E.chain.join(" -> ")),E.type){case"self-declined":i.onDeclined&&i.onDeclined(E),i.ignoreDeclined||(A=new Error("Aborted because of self decline: "+E.moduleId+F));break;case"declined":i.onDeclined&&i.onDeclined(E),i.ignoreDeclined||(A=new Error("Aborted because of declined dependency: "+E.moduleId+" in "+E.parentId+F));break;case"unaccepted":i.onUnaccepted&&i.onUnaccepted(E),i.ignoreUnaccepted||(A=new Error("Aborted because "+u+" is not accepted"+F));break;case"accepted":i.onAccepted&&i.onAccepted(E),j=!0;break;case"disposed":i.onDisposed&&i.onDisposed(E),D=!0;break;default:throw new Error("Unexception type "+E.type)}if(A)return h("abort"),Promise.reject(A);if(j)for(u in y[u]=p[u],m(v,E.outdatedModules),E.outdatedDependencies)Object.prototype.hasOwnProperty.call(E.outdatedDependencies,u)&&(x[u]||(x[u]=[]),m(x[u],E.outdatedDependencies[u]));D&&(m(v,[E.moduleId]),y[u]=_)}var I,R=[];for(c=0;c<v.length;c++)u=v[c],S[u]&&S[u].hot._selfAccepted&&y[u]!==_&&!S[u].hot._selfInvalidated&&R.push({module:u,parents:S[u].parents.slice(),errorHandler:S[u].hot._selfAccepted});h("dispose"),Object.keys(b).forEach((function(t){!1===b[t]&&function(t){delete installedChunks[t]}(t)}));var T,V,H=v.slice();for(;H.length>0;)if(u=H.pop(),d=S[u]){var k={},U=d.hot._disposeHandlers;for(l=0;l<U.length;l++)(s=U[l])(k);for(a[u]=k,d.hot.active=!1,delete S[u],delete x[u],l=0;l<d.children.length;l++){var X=S[d.children[l]];X&&((I=X.parents.indexOf(u))>=0&&X.parents.splice(I,1))}}for(u in x)if(Object.prototype.hasOwnProperty.call(x,u)&&(d=S[u]))for(V=x[u],l=0;l<V.length;l++)T=V[l],(I=d.children.indexOf(T))>=0&&d.children.splice(I,1);h("apply"),void 0!==w&&(n=w,w=void 0);for(u in p=void 0,y)Object.prototype.hasOwnProperty.call(y,u)&&(t[u]=y[u]);var L=null;for(u in x)if(Object.prototype.hasOwnProperty.call(x,u)&&(d=S[u])){V=x[u];var B=[];for(c=0;c<V.length;c++)if(T=V[c],s=d.hot._acceptedDependencies[T]){if(-1!==B.indexOf(s))continue;B.push(s)}for(c=0;c<B.length;c++){s=B[c];try{s(V)}catch(t){i.onErrored&&i.onErrored({type:"accept-errored",moduleId:u,dependencyId:V[c],error:t}),i.ignoreErrored||L||(L=t)}}}for(c=0;c<R.length;c++){var N=R[c];u=N.module,o=N.parents,r=u;try{C(u)}catch(t){if("function"==typeof N.errorHandler)try{N.errorHandler(t)}catch(e){i.onErrored&&i.onErrored({type:"self-accept-error-handler-errored",moduleId:u,error:e,originalError:t}),i.ignoreErrored||L||(L=e),L||(L=t)}else i.onErrored&&i.onErrored({type:"self-accept-errored",moduleId:u,error:t}),i.ignoreErrored||L||(L=t)}}if(L)return h("fail"),Promise.reject(L);if(g)return e(i).then((function(t){return v.forEach((function(e){t.indexOf(e)<0&&t.push(e)})),t}));return h("idle"),new Promise((function(t){t(v)}))}(e=e||{})}function O(){if(g)return p||(p={}),g.forEach(j),g=void 0,!0}function j(e){Object.prototype.hasOwnProperty.call(p,e)||(p[e]=t[e])}var S={};function C(e){if(S[e])return S[e].exports;var r=S[e]={i:e,l:!1,exports:{},hot:l(e),parents:(s=o,o=[],s),children:[]};return t[e].call(r.exports,r,r.exports,c(e)),r.l=!0,r.exports}C.m=t,C.c=S,C.d=function(t,e,r){C.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},C.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},C.t=function(t,e){if(1&e&&(t=C(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(C.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)C.d(r,i,function(e){return t[e]}.bind(null,i));return r},C.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return C.d(e,"a",e),e},C.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},C.p="",C.h=function(){return n},c(4)(C.s=4)}([function(t,e,r){"use strict";var i=this&&this.__createBinding||(Object.create?function(t,e,r,i){void 0===i&&(i=r),Object.defineProperty(t,i,{enumerable:!0,get:function(){return e[r]}})}:function(t,e,r,i){void 0===i&&(i=r),t[i]=e[r]}),n=this&&this.__exportStar||function(t,e){for(var r in t)"default"===r||Object.prototype.hasOwnProperty.call(e,r)||i(e,t,r)};Object.defineProperty(e,"__esModule",{value:!0}),e.str2rgb=e.radian2angle=e.angle2radian=e.Martix=e.Martix4=e.WebGL=void 0;var a=r(6);Object.defineProperty(e,"WebGL",{enumerable:!0,get:function(){return a.default}});var o=r(2);Object.defineProperty(e,"Martix4",{enumerable:!0,get:function(){return o.Martix4}}),Object.defineProperty(e,"Martix",{enumerable:!0,get:function(){return o.Martix}}),n(r(7),e);var s=r(1);Object.defineProperty(e,"angle2radian",{enumerable:!0,get:function(){return s.angle2radian}}),Object.defineProperty(e,"radian2angle",{enumerable:!0,get:function(){return s.radian2angle}}),Object.defineProperty(e,"str2rgb",{enumerable:!0,get:function(){return s.str2rgb}})},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.p2p=e.radian2angle=e.angle2radian=e.str2rgb=void 0;e.str2rgb=t=>{const e={r:0,g:0,b:0,a:1};try{const r=(t="#"===t[0]?t.slice(1):t).length;if(3===r)e.r=Number(`0x${t[0]}${t[0]}`),e.g=Number(`0x${t[1]}${t[1]}`),e.b=Number(`0x${t[2]}${t[2]}`);else{if(6!==r)throw new Error("str is not valid");e.r=Number(`0x${t[0]}${t[1]}`),e.g=Number(`0x${t[2]}${t[3]}`),e.b=Number(`0x${t[4]}${t[5]}`)}}catch(t){return!1}return e};e.angle2radian=t=>t/180*Math.PI;e.radian2angle=t=>180*t/Math.PI;e.p2p=(t,e,r,i,n=1,a=1)=>Math.sqrt(Math.pow(t-i,2)+Math.pow(e-n,2)+Math.pow(r-a,2))},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Martix4=e.Martix=void 0;const i=r(1),n=r(3),{sin:a,cos:o}=Math;class s{constructor(t,e,r=null){Array.isArray(t)&&(t=new Float32Array(t));const i=t.length,n=e*(r=r||Math.ceil(i/e));if(n>i){const e=new Float32Array(n);e.set(t,0),t=e}else if(n<i){const e=new Float32Array(n);t=e.map((e,r)=>t[r])}this.data=t,this.row=e,this.col=r}multiX(t){if(this.col!==t.row||this.row!==t.col)throw new Error("The row and col of two matrices are not equal");let e=new s([],this.row,t.col);return e.data=e.data.map((e,r)=>{const i=Math.floor(r/t.col),n=r%t.col,a=this.getRow(i),o=t.getCol(n);return a.map((t,e)=>t*o[e]).reduce((t,e)=>t+e)}),e}multiScalar(t){return new s(this.data.map(e=>e*t),this.row,this.col)}getRow(t){const e=t*this.col;return this.data.slice(e,e+this.col)}getCol(t){return this.data.filter((e,r)=>r%this.col==t)}copy(){return new s(this.data.slice(),this.row)}rank(){return 0}transpose(){const t=new Array(this.col);for(let e=0;e<this.col;e++)t[e]=[];for(let e=0;e<this.data.length;e++)t[e%this.row].push(this.data[e]);let e=[];return t.forEach(t=>{e=e.concat(t)}),new s(e,this.col,this.row)}}e.Martix=s;class c extends s{static default(){return c.init(new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]))}static init(t){return new c(t)}static viewTransform(t,e,r,i,a,o,s,l,d){const u=n.Vector3.init([s,l,d]),h=n.Vector3.init([t,e,r]),f=n.Vector3.init([i,a,o]).sub(h),p=f.toUnit(),w=p.multiX(u).toUnit(),g=w.multiX(p),m=c.init([w.x,g.x,-p.x,0,w.y,g.y,-p.y,0,w.z,g.z,-p.z,0,0,0,0,1]);c.init().translate(f.x,f.y);return m}static perspectTransform(t,e,r,i){t=Math.PI*t/180/2;const n=Math.sin(t),a=1/(i-r),o=Math.cos(t)/n;return new c([o/e,0,0,0,0,o,0,0,0,0,-(i+r)*a,-1,0,0,-2*r*i*a,0])}static orthoTransform(t,e,r,i,n=.1,a=2e3){if(t>e)throw new Error("left must less than right");if(i>r)throw new Error("bottom must less than top");const o=c.init(),s=1/(e-t),l=1/(r-i),d=1/(a-n);return o.data.set([2*s,0,0,0,0,2*l,0,0,0,0,-2*d,0,-(e+t)*s,-(r+i)*l,-(a+n)*d,1]),o}constructor(t){super(t||c.default().data,4,4)}multiX(t){return c.init(s.prototype.multiX.call(this,t).data)}transpose(){return c.init(s.prototype.transpose.call(this).data)}translate(t=0,e=0,r=0){const i=new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,t,e,r,1]);return this.multiX(c.init(i))}rotateZ(t=0){const e=a(i.angle2radian(t)),r=o(i.angle2radian(t)),n=new Float32Array([r,e,0,0,-e,r,0,0,0,0,1,0,0,0,0,1]);return this.multiX(c.init(n))}rotateX(t=0){const e=a(i.angle2radian(t)),r=o(i.angle2radian(t)),n=new Float32Array([1,0,0,0,0,r,-e,0,0,e,r,0,0,0,0,1]);return this.multiX(c.init(n))}rotateY(t=0){const e=a(i.angle2radian(t)),r=o(i.angle2radian(t)),n=new Float32Array([r,0,-e,0,0,1,0,0,e,0,r,0,0,0,0,1]);return this.multiX(c.init(n))}scaling(t=1,e=1,r=1){const i=new Float32Array([t,0,0,0,0,e,0,0,0,0,r,0,0,0,0,1]);return this.multiX(c.init(i))}multiScalar(t){return new c(this.data.map(e=>e*t))}}e.Martix4=c},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Vector3=e.Vector=void 0;class i{constructor(t,e){t=t instanceof Float32Array?t:new Float32Array(t),this.len=e||t.length,this.data=t}static init(t,e){return new i(t,e)}norm(){let t=0;for(let e=0;e<this.data.length;e++)t+=Math.pow(this.data[e],2);return Math.sqrt(t)}toUnit(){const t=this.norm();return i.init(this.data.map(e=>e/t))}multi(t){if(t.len!==this.len)throw new Error("The length of the two vectors must be equal");let e=0;return this.data.forEach((r,i)=>{e+=r*t.data[i]}),e}multiScalar(t){return new i(this.data.map(e=>e*t))}add(t){if(t.len!==this.len)throw new Error("The length of the two vectors must be equal");return new i(this.data.map((e,r)=>e+t.data[r]))}sub(t){if(t.len!==this.len)throw new Error("The length of the two vectors must be equal");return new i(this.data.map((e,r)=>e-t.data[r]))}}e.Vector=i;class n extends i{static init(t){return new n(t)}constructor(t){super(t.slice(0,3),3)}multiX(t){const e=this.data,r=t.data,i=new Float32Array([e[1]*r[2]-r[1]*e[2],e[2]*r[0]-r[2]*e[0],e[0]*r[1]-r[0]*e[1]]);return n.init(i)}toUnit(){return n.init(i.init(this.data).toUnit().data)}multiScalar(t){return n.init(i.init(this.data).multiScalar(t).data)}add(t){return n.init(i.init(this.data).add(i.init(t.data)).data)}sub(t){return n.init(i.init(this.data).sub(i.init(t.data)).data)}get x(){return this.data[0]}set x(t){this.data[0]=t}get y(){return this.data[1]}set y(t){this.data[1]=t}get z(){return this.data[2]}set z(t){this.data[2]=t}}e.Vector3=n},function(t,e,r){r(5)},function(t,e,r){"use strict";r.r(e);var i=r(0);const n=new i.WebGL("#webgl_test");let a=i.Martix4.init();const o=n.width,s=n.height;console.log("width",o,s);const c=o/s;n.width,n.width,n.width,n.width;const l=new i.OrthoCamera(-1,1,1,-1,-1,1);l.setPosition(1,1,1),l.lookAt(0,0,0),l.setUp(0,0,1),n.setCamera(l),n.setBgColor("#000"),n.setPointWidth(10),n.clear(),n.gl.enable(n.gl.DEPTH_TEST);const d=[-1,0,0,1,0,0,1,0,0,1,0,0,0,-1,0,1,0,0,0,1,0,1,0,0,0,0,-1,1,0,0,0,0,1,1,0,0],u=[0,0,0,1,0,0,0,.5,0,0,1,0,.5,0,0,0,0,1,.5,.5,0,1,0,0,.5,0,.5,0,1,0,.5,.5,.5,0,0,1,0,0,.5,0,0,1,0,.5,.5,0,0,1],h=new Uint8Array([0,1,2,2,1,3,3,2,4,4,3,5,5,4,6,6,5,7,7,6,0,0,7,1,0,2,4,0,4,6,1,3,5,1,5,7]);document.querySelector("#webgl_test").addEventListener("mousewheel",t=>{const{deltaY:e}=t,{x:r,y:i,z:a}=l.position,o=e>0?.1:-.1;l.setPosition(r,i,a+o),n.setCamera(l)});!function t(){n.clear(),n.setVertices(d),n.gl.drawArrays(n.gl.LINES,0,6),n.setVertices(u),n.setIndeces(h),n.gl.drawElements(n.gl.TRIANGLES,h.length,n.gl.UNSIGNED_BYTE,0),a=a.rotateZ(1),n.setXFormMatrix(a),requestAnimationFrame(t)}()},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const i=r(1),n=r(2);class a{constructor(t=null){if(this.viewport=[],"string"==typeof t){const e=document.querySelector(t),r=e.getBoundingClientRect();this.width=r.width,this.height=r.height,this.gl=e.getContext("webgl")}else{const t=document.createElement("canvas");t.setAttribute("width",window.innerWidth+""),t.setAttribute("height",window.innerHeight+""),t.style.position="fixed",t.style.top="0",t.style.left="0",this.width=window.innerWidth,this.height=window.innerHeight,this.gl=t.getContext("webgl"),document.body.appendChild(t)}this._init("\n  attribute vec4 a_Position;\n  attribute float a_PointSize;\n  attribute vec4 a_Color;\n\n  uniform mat4 u_xformMatrix;\n  uniform mat4 u_ViewMartix;\n  uniform mat4 u_PerspectiveMartix;\n  \n  varying vec4 v_Color;\n  \n  void main() {\n    gl_Position = u_PerspectiveMartix * u_ViewMartix * u_xformMatrix * a_Position;\n    gl_PointSize = a_PointSize;\n    v_Color = a_Color;\n  }\n","\n  precision mediump float;\n  varying vec4 v_Color;\n  void main() {\n    gl_FragColor = v_Color;\n  }\n")}_getAttr(t){return"u"===t[0]?this.gl.getUniformLocation(this.program,t):this.gl.getAttribLocation(this.program,t)}_init(t,e){const r=this.gl,i=r.createShader(r.VERTEX_SHADER),a=r.createShader(r.FRAGMENT_SHADER);r.shaderSource(i,t),r.shaderSource(a,e),r.compileShader(i),r.compileShader(a);const o=r.createProgram();r.attachShader(o,i),r.attachShader(o,a),r.linkProgram(o),r.useProgram(o),this.program=o,this.a_Position=this._getAttr("a_Position"),this.a_PointSize=this._getAttr("a_PointSize"),this.a_Color=this._getAttr("a_Color"),this.u_xformMatrix=this._getAttr("u_xformMatrix"),this.u_ViewMartix=this._getAttr("u_ViewMartix"),this.u_PerspectiveMartix=this._getAttr("u_PerspectiveMartix");const s=r.createBuffer(),c=r.createBuffer();r.bindBuffer(r.ARRAY_BUFFER,s),r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,c),r.enableVertexAttribArray(this.a_Position),r.enableVertexAttribArray(this.a_Color);const l=n.Martix4.default();this.setXFormMatrix(l),this.setViewMartix(l),this.setPerspectiveMartix(l)}setBgColor(t){let e={r:0,g:0,b:0,a:1};if("string"==typeof t?e=i.str2rgb(t):"object"==typeof t&&(e=Object.assign(e,t)),!e)throw Error("color is not valid");this.gl.clearColor(e.r,e.g,e.b,e.a)}clear(){this.gl.clear(this.gl.COLOR_BUFFER_BIT)}setVertices(t,e=3,r=3,i=0,n=0){this.vertices=t instanceof Float32Array?t:new Float32Array(t);const a=this.vertices.BYTES_PER_ELEMENT;i=i+e+r,this.gl.bufferData(this.gl.ARRAY_BUFFER,this.vertices,this.gl.STATIC_DRAW),this.gl.vertexAttribPointer(this.a_Position,e,this.gl.FLOAT,!1,i*a,n*a),this.gl.vertexAttribPointer(this.a_Color,r,this.gl.FLOAT,!1,i*a,e*a)}setIndeces(t){this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER,t,this.gl.STATIC_DRAW)}setPointWidth(t){if(!(t>=0))throw new Error("width is not valid");this.gl.vertexAttrib1f(this.a_PointSize,t)}setXFormMatrix(t){this.xformMatrix=t instanceof n.Martix4?t:n.Martix4.init(t),this.gl.uniformMatrix4fv(this.u_xformMatrix,!1,this.xformMatrix.data)}setViewMartix(t){this.viewMartix=t instanceof n.Martix4?t:n.Martix4.init(t),this.gl.uniformMatrix4fv(this.u_ViewMartix,!1,this.viewMartix.data)}setPerspectiveMartix(t){this.perspectiveMartix=t instanceof n.Martix4?t:n.Martix4.init(t),this.gl.uniformMatrix4fv(this.u_PerspectiveMartix,!1,this.perspectiveMartix.data)}setCamera(t){t.bind(this)}}(()=>{let t=WebGLRenderingContext.prototype;try{for(const e in t){const r=t[e];"function"!=typeof r&&Reflect.defineProperty(a.prototype,e,{value:r,writable:!1,configurable:!0,enumerable:!0})}}catch(t){}})(),e.default=a},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Camera=e.PerspectiveCamera=e.OrthoCamera=void 0;const i=r(3);r(8);const n=r(2);class a{constructor(){this.xformMartix=n.Martix4.init(),this.viewMartix=n.Martix4.init(),this.perspectMartix=n.Martix4.init()}setPosition(t,e,r){this.position=new i.Vector3([t,e,r])}lookAt(t,e,r){this.look=new i.Vector3([t,e,r])}setUp(t,e,r){this.up=new i.Vector3([t,e,r])}updateViewMartix(){this.viewMartix=n.Martix4.viewTransform(this.position.x,this.position.y,this.position.z,this.look.x,this.look.y,this.look.z,this.up.x,this.up.y,this.up.z)}updateMartix(){this.updateViewMartix()}bind(t){}translate(t=0,e=0,r=0){this.xformMartix=this.xformMartix.translate(t,e,r)}rotateX(t){this.xformMartix.rotateX(t)}rotateY(t){this.xformMartix.rotateY(t)}rotateZ(t){this.xformMartix.rotateY(t)}scaling(t=0,e=0,r=0){this.xformMartix.scaling(t,e,r)}}e.Camera=a;e.OrthoCamera=class extends a{constructor(t,e,r,i,n,a){super(),this.left=t,this.right=e,this.top=r,this.bottom=i,this.near=n,this.far=a}updatePerspectMartix(){const{left:t,right:e,top:r,bottom:i,near:a,far:o}=this;this.perspectMartix=n.Martix4.orthoTransform(t,e,r,i,a,o)}updateMartix(){this.updateViewMartix(),this.updatePerspectMartix()}bind(t){this.updateMartix(),t.setViewMartix(this.viewMartix),t.setPerspectiveMartix(this.perspectMartix.multiX(this.xformMartix))}};e.PerspectiveCamera=class extends a{constructor(t,e,r,i){super(),this.fovy=t,this.aspect=e,this.near=r,this.far=i}updateMartix(){this.updateViewMartix();let{fovy:t,aspect:e,near:r,far:i}=this;if(r===i||0==e)throw new Error("null frustum");if(r<=0)throw new Error("near <= 0");if(i<=0)throw new Error("far <= 0");t=Math.PI*t/180/2;let a=Math.sin(t);if(0===a)throw new Error("null frustum");let o=1/(i-r),s=Math.cos(t)/a;this.perspectMartix=n.Martix4.init([s/e,0,0,0,0,s,0,0,0,0,-(i+r)*o,-1,0,0,-2*r*i*o,0])}bind(t){this.updateMartix(),t.setPerspectiveMartix(this.perspectMartix),t.setViewMartix(this.viewMartix)}}},function(t,e){}]);