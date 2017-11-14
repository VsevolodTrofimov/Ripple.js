var ripple=function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var n={};return e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=5)}([function(t,e,n){"use strict";function r(t,e){return function(){var n=[],r=void 0,o=function(o,i){var a=i||t;r=Date.now(),n.push({effect:e.create(),state:"shown"}),n[n.length-1].effect.show(a,o)},i=function(t){for(var e=0;e<n.length;e++)!function(t){var r=n[t];switch(r.state){case"shown":r.state="hiding",r.effect.hide(function(){r.state="hidden"});case"hidden":n.splice(t,1),t--}e=t}(e)};return{end:function t(e){var n=Date.now()-r;n<=100?setTimeout(t,100-n):i()},start:o}}()}function o(t,e){function n(){o.forEach(function(t){t.el.removeEventListener("mousedown",t.handle.start),t.el.removeEventListener("mouseup",t.handle.end),t.el.removeEventListener("mouseout",t.handle.end)})}var o=[];return t.forEach(function(t){var n=r(t,e);o.push({el:t,handle:n}),t.addEventListener("mousedown",n.start),t.addEventListener("mouseup",n.end),t.addEventListener("mouseout",n.end)}),n}function i(){function t(){o.removeEventListener("mousedown",a),o.removeEventListener("mouseup",s),o.removeEventListener("mouseout",s)}var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"*",n=arguments[1],o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:document,i=r(o,n),a=function(t){for(var n=t.target;n!==o;){if(n.matches(e)){n.classList.add("ripple--mouseout-protected"),i.start(t,n);break}n=n.parentNode}},s=function(t,n){t.target&&t.target!==document&&t.target.matches(e)&&(i.end(t,t.target),t.target.classList.remove("ripple--mouseout-protected"))};return o.addEventListener("mousedown",a),o.addEventListener("mouseup",s),o.addEventListener("mouseout",s),t}Object.defineProperty(e,"__esModule",{value:!0});var a={bind:o,watch:i};e.default=a},function(t,e,n){"use strict";function r(t){a=i(a,t)}function o(){return a}Object.defineProperty(e,"__esModule",{value:!0});var i=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t};e.setDefaults=r,e.getDefaults=o;var a={color:"#fafafa",opacity:.21,borderRadius:"auto",borderWidth:"auto",zIndex:999,transitionDuration:500,timingFunction:"cubic-bezier(.4,0`,.42,1)",constant:!1}},function(t,e,n){"use strict";function r(t,e){if(t instanceof NodeList){var n=t;t=[];for(var r=0;r<n.length;r++)t.push(n[r])}t instanceof Node&&(t=[t]);var o=new u.RippleFactory(e);return{factory:o,remove:a.default.bind(t,o)}}function o(t,e,n){var r=new u.RippleFactory(e);return{factory:r,remove:a.default.watch(t,r,n)}}Object.defineProperty(e,"__esModule",{value:!0});var i=n(0),a=function(t){return t&&t.__esModule?t:{default:t}}(i),s=n(1),u=n(3);e.default={bindTo:r,watch:o,setDefaults:s.setDefaults}},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0}),e.RippleFactory=e.Ripple=void 0;var o=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},i=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),a=n(0),s=(function(t){t&&t.__esModule}(a),n(1)),u=n(4);n(6);var c=e.Ripple=function(){function t(e){r(this,t),this.props=e,this.$=document.createElement("div"),this.$.classList.add("ripple"),this.$.innerHTML='<div class="ripple__effect ripple__effect--hidden"></div>',this.$effect=this.$.querySelector(".ripple__effect"),this.$.style.zIndex=e.zIndex,document.body.appendChild(this.$)}return i(t,[{key:"show",value:function(t,e){var n=this,r=this.getRect(t),o=0,i=0;"undefined"!=typeof TouchEvent&&e instanceof TouchEvent?(o=e.touches[0].pageX,i=e.touches[0].pageY):(o=e.pageX,i=e.pageY);var a={left:Math.abs(r.left-o),top:Math.abs(r.top-i)},s=void 0,c=void 0;this.radius=this.calcRadius(a,r);var d=this.calcTransition(),l=this.$.style,f=this.$effect.style;c="auto"===this.props.borderRadius?(0,u.getStyle)(t,"border-radius"):this.props.borderRadius,s="auto"===this.props.borderWidth?(0,u.getStyle)(t,"border-width"):this.props.borderWidth,c=(0,u.parseShorthand)(c),s=(0,u.parseShorthand)(s),l.left=r.left+"px",l.top=r.top+"px",l.width=r.width+"px",l.height=r.height+"px",l.borderRadius=c.val,l.borderWidth=s.val,f.width=2*this.radius+"px",f.height=2*this.radius+"px",f.left=a.left-this.radius-s.left+"px",f.top=a.top-this.radius-s.top+"px",f.transitionTimingFunction=this.props.timingFunction,f.transitionDuration=d+"ms",f.background=this.props.color,f.opacity=this.props.opacity,setTimeout(function(){n.$effect.classList.remove("ripple__effect--hidden")},1)}},{key:"hide",value:function(t){var e=this,n=this.calcTransition();this.$effect.style.transitionDuration=n+"ms",this.$effect.classList.add("ripple__effect--hide"),setTimeout(function(){return e.$.remove(),delete e.$,t()},n)}},{key:"calcTransition",value:function(){return this.props.constant?this.props.transitionDuration:this.props.transitionDuration+1.1*this.radius}},{key:"calcRadius",value:function(t,e){var n=Math.max(t.top,e.height-t.top),r=Math.max(t.left,e.width-t.left);return Math.sqrt(n*n+r*r)}},{key:"getRect",value:function(t){var e=document.body.getBoundingClientRect(),n=t.getBoundingClientRect(),r=parseInt((0,u.getStyle)(document.body,"margin-top"),10),o=parseInt((0,u.getStyle)(document.body.parentElement,"margin-top"),10)+parseInt((0,u.getStyle)(document.body.parentElement,"padding-top"),10),i=parseInt((0,u.getStyle)(document.body,"margin-left"),10),a=parseInt((0,u.getStyle)(document.body.parentElement,"margin-left"),10)+parseInt((0,u.getStyle)(document.body.parentElement,"padding-left"),10);return{top:n.top-e.top+r+o,left:n.left-e.left+i+a,width:n.width,height:n.height}}}]),t}();e.RippleFactory=function(){function t(e){r(this,t),e=e||{},this.rippleProps=o({},(0,s.getDefaults)(),e)}return i(t,[{key:"create",value:function(){return new c(this.rippleProps)}}]),t}()},function(t,e,n){"use strict";function r(t,e,n){var r="";return e.forEach(function(e,o){r+=t.getPropertyValue("border-"+e+"-"+n),o<3&&(r+=" ")}),r}function o(t,e){var n=window.getComputedStyle(t,null);return"border-width"===e?r(n,["top","right","bottom","left"],"width"):"border-radius"===e?r(n,["top-left","top-right","bottom-right","bottom-left"],"radius"):n.getPropertyValue(e)}function i(t){var e=t.split(" ");switch(e.length){case 1:var n=parseInt(t,10);return{val:t,top:n,left:n,right:n,bottom:n};case 2:var r=parseInt(e[0],10),o=parseInt(e[1],10);return{val:t,top:r,left:o,right:o,bottom:r};case 4:var i={val:t};return["top","right","bottom","left"].forEach(function(t,n){var r=parseInt(e[n],10);i[t]=r}),i;default:return{val:"",top:0,left:0,right:0,bottom:0}}}Object.defineProperty(e,"__esModule",{value:!0}),e.getStyle=o,e.parseShorthand=i,window.Element&&function(t){t.matches=t.matches||t.matchesSelector||t.webkitMatchesSelector||t.msMatchesSelector||function(t){for(var e=this,n=(e.parentNode||e.document).querySelectorAll(t),r=-1;n[++r]&&n[r]!=e;);return!!n[r]}}(Element.prototype),"remove"in Element.prototype||(Element.prototype.remove=function(){this.parentNode&&this.parentNode.removeChild(this)})},function(t,e,n){"use strict";var r=n(2),o=function(t){return t&&t.__esModule?t:{default:t}}(r);e.bindTo=o.default.bindTo,e.watch=o.default.watch,e.setDefaults=o.default.setDefaults},function(t,e){}]);