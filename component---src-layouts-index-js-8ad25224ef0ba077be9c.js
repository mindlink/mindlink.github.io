webpackJsonp([0x67ef26645b2a,60335399758886],{289:function(e,t){e.exports={data:{site:{siteMetadata:{title:"Engineering at MindLink"}}},layoutContext:{}}},383:function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}t.__esModule=!0;var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e},o=n(3),s=i(o),a=n(388),c=i(a),l=n(289),u=i(l);t.default=function(e){return s.default.createElement(c.default,r({},e,u.default))},e.exports=t.default},474:function(e,t){function n(e){var t=e.target||e.srcElement;t.__resizeRAF__&&r(t.__resizeRAF__),t.__resizeRAF__=i(function(){var n=t.__resizeTrigger__;n.__resizeListeners__.forEach(function(t){t.call(n,e)})})}var i=function(){var e=this,t=e.requestAnimationFrame||e.mozRequestAnimationFrame||e.webkitRequestAnimationFrame||function(t){return e.setTimeout(t,20)};return function(e){return t(e)}}(),r=function(){var e=this,t=e.cancelAnimationFrame||e.mozCancelAnimationFrame||e.webkitCancelAnimationFrame||e.clearTimeout;return function(e){return t(e)}}(),t=function(e,t){function i(){this.contentDocument.defaultView.__resizeTrigger__=this.__resizeElement__,this.contentDocument.defaultView.addEventListener("resize",n)}var r,o=this,s=o.document,a=s.attachEvent;if("undefined"!=typeof navigator&&(r=navigator.userAgent.match(/Trident/)||navigator.userAgent.match(/Edge/)),!e.__resizeListeners__)if(e.__resizeListeners__=[],a)e.__resizeTrigger__=e,e.attachEvent("onresize",n);else{"static"===getComputedStyle(e).position&&(e.style.position="relative");var c=e.__resizeTrigger__=s.createElement("object");c.setAttribute("style","display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; pointer-events: none; z-index: -1; opacity: 0;"),c.setAttribute("class","resize-sensor"),c.__resizeElement__=e,c.onload=i,c.type="text/html",r&&e.appendChild(c),c.data="about:blank",r||e.appendChild(c)}e.__resizeListeners__.push(t)};e.exports="undefined"==typeof window?t:t.bind(window),e.exports.unbind=function(e,t){var i=document.attachEvent;t?e.__resizeListeners__.splice(e.__resizeListeners__.indexOf(t),1):e.__resizeListeners__=[],e.__resizeListeners__.length||(i?e.detachEvent("onresize",n):(e.__resizeTrigger__.contentDocument.defaultView.removeEventListener("resize",n),delete e.__resizeTrigger__.contentDocument.defaultView.__resizeTrigger__,e.__resizeTrigger__=!e.removeChild(e.__resizeTrigger__)),delete e.__resizeListeners__)}},521:function(e,t,n){for(var i=n(522),r="undefined"==typeof window?{}:window,o=["moz","webkit"],s="AnimationFrame",a=r["request"+s],c=r["cancel"+s]||r["cancelRequest"+s],l=!0,u=0;u<o.length&&!a;u++)a=r[o[u]+"Request"+s],c=r[o[u]+"Cancel"+s]||r[o[u]+"CancelRequest"+s];if(!a||!c){l=!1;var p=0,d=0,M=[],h=1e3/60;a=function(e){if(0===M.length){var t=i(),n=Math.max(0,h-(t-p));p=n+t,setTimeout(function(){var e=M.slice(0);M.length=0;for(var t=0;t<e.length;t++)if(!e[t].cancelled)try{e[t].callback(p)}catch(e){setTimeout(function(){throw e},0)}},Math.round(n))}return M.push({handle:++d,callback:e,cancelled:!1}),d},c=function(e){for(var t=0;t<M.length;t++)M[t].handle===e&&(M[t].cancelled=!0)}}e.exports=function(e){return l?a.call(r,function(){try{e.apply(this,arguments)}catch(e){setTimeout(function(){throw e},0)}}):a.call(r,e)},e.exports.cancel=function(){c.apply(r,arguments)}},522:function(e,t,n){(function(t){(function(){var n,i,r;"undefined"!=typeof performance&&null!==performance&&performance.now?e.exports=function(){return performance.now()}:"undefined"!=typeof t&&null!==t&&t.hrtime?(e.exports=function(){return(n()-r)/1e6},i=t.hrtime,n=function(){var e;return e=i(),1e9*e[0]+e[1]},r=n()):Date.now?(e.exports=function(){return Date.now()-r},r=Date.now()):(e.exports=function(){return(new Date).getTime()-r},r=(new Date).getTime())}).call(this)}).call(t,n(242))},523:function(e,t,n){var i=n(290),r=n(474);e.exports={getInitialState:function(){return void 0!==this.props.initialComponentWidth&&null!==this.props.initialComponentWidth?{componentWidth:this.props.initialComponentWidth}:{}},componentDidMount:function(){this.setState({componentWidth:i.findDOMNode(this).getBoundingClientRect().width}),r(i.findDOMNode(this),this.onResize)},componentDidUpdate:function(){0===i.findDOMNode(this).getElementsByClassName("resize-sensor").length&&r(i.findDOMNode(this),this.onResize)},onResize:function(){this.setState({componentWidth:i.findDOMNode(this).getBoundingClientRect().width})}}},587:function(e,t,n){var i;i=n(588),e.exports={getInitialState:function(){return this.props.initialPageWidth?{pageWidth:this.props.initialPageWidth}:{}},componentDidMount:function(){return i.on(this.onResize)},componentWillUnmount:function(){return i.off(this.onResize)},onResize:function(e){return this.setState({pageWidth:e})}}},588:function(e,t,n){var i,r,o,s,a,c;o=n(521),i=void 0,s=[],a=!1,"undefined"!=typeof window&&null!==window&&(i=window.innerWidth),r=function(){if(!a)return a=!0,o(c)},c=function(){var e,t,n;for(i=window.innerWidth,e=0,t=s.length;e<t;e++)(n=s[e])(i);return a=!1},"undefined"!=typeof window&&null!==window&&window.addEventListener("resize",r),e.exports={on:function(e){return e(i),s.push(e)},off:function(e){return s.splice(s.indexOf(e),1)}}},589:function(e,t,n){var i,r,o,s,a,c;s=n(3),a=n(523),o=n(587),c=n(4),i=s.createClass({displayName:"Breakpoint",mixins:[a],propTypes:{minWidth:s.PropTypes.number,maxWidth:s.PropTypes.number},getDefaultProps:function(){return{minWidth:0,maxWidth:1e21}},renderChildren:function(){return s.Children.map(this.props.children,function(e){return function(t){var n;return"Span"===(null!=t&&null!=(n=t.type)?n.displayName:void 0)?s.cloneElement(t,{context:e.props.context}):t}}(this))},render:function(){var e,t;return e=c({},this.props),delete e.maxWidth,delete e.minWidth,delete e.widthMethod,this.state.componentWidth&&this.props.minWidth<=(t=this.state.componentWidth)&&t<this.props.maxWidth?s.createElement("div",Object.assign({},e),this.renderChildren()):s.createElement("div",null)}}),r=s.createClass({displayName:"Breakpoint",mixins:[o],propTypes:{minWidth:s.PropTypes.number,maxWidth:s.PropTypes.number},getDefaultProps:function(){return{minWidth:0,maxWidth:1e21}},renderChildren:function(){return s.Children.map(this.props.children,function(e){return function(t){var n;return"Span"===(null!=(n=t.type)?n.displayName:void 0)?s.cloneElement(t,{context:e.props.context}):t}}(this))},render:function(){var e,t;return e=c({},this.props),delete e.maxWidth,delete e.minWidth,delete e.widthMethod,this.state.pageWidth&&this.props.minWidth<=(t=this.state.pageWidth)&&t<this.props.maxWidth?s.createElement("div",Object.assign({},e),this.renderChildren()):s.createElement("div",null)}}),e.exports=s.createClass({displayName:"Breakpoint",propTypes:{widthMethod:s.PropTypes.string.isRequired,minWidth:s.PropTypes.number,maxWidth:s.PropTypes.number},getDefaultProps:function(){return{widthMethod:"pageWidth"}},render:function(){return"pageWidth"===this.props.widthMethod?s.createElement(r,Object.assign({},this.props)):"componentWidth"===this.props.widthMethod?s.createElement(i,Object.assign({},this.props)):void 0}})},590:function(e,t,n){var i,r;i=n(3),r=n(4),e.exports=i.createClass({displayName:"Container",render:function(){var e,t,n,o;return t={maxWidth:"960px",marginLeft:"auto",marginRight:"auto"},o=r(t,this.props.style),e=this.props.children,n=r({},this.props),delete n.children,delete n.style,i.createElement("div",Object.assign({},n,{style:o}),e,i.createElement("span",{style:{display:"block",clear:"both"}}," "))}})},591:function(e,t,n){var i,r;i=n(3),r=n(4),e.exports=i.createClass({displayName:"Grid",propTypes:{columns:i.PropTypes.number,gutterRatio:i.PropTypes.number},getDefaultProps:function(){return{columns:12,gutterRatio:.25}},renderChildren:function(){return i.Children.map(this.props.children,function(e){return function(t){var n,r;return"Breakpoint"===(n=null!=(r=t.type)?r.displayName:void 0)||"Span"===n?i.cloneElement(t,{context:{columns:e.props.columns,gutterRatio:e.props.gutterRatio}}):t}}(this))},render:function(){var e;return e=r({},this.props),delete e.gutterRatio,delete e.columns,i.createElement("div",Object.assign({},e),this.renderChildren(),i.createElement("span",{style:{display:"block",clear:"both"}}," "))}})},592:function(e,t,n){var i,r,o;i=n(3),r=n(4),o=n(594),e.exports=i.createClass({displayName:"Span",propTypes:{context:i.PropTypes.object,columns:i.PropTypes.number,at:i.PropTypes.number,pre:i.PropTypes.number,post:i.PropTypes.number,squish:i.PropTypes.number,last:i.PropTypes.bool,break:i.PropTypes.bool},getDefaultProps:function(){return{at:0,pre:0,post:0,squish:0,last:!1,first:!1,break:!1}},renderChildren:function(){return i.Children.map(this.props.children,function(e){return function(t){var n;return"Span"===(null!=t&&null!=(n=t.type)?n.displayName:void 0)?i.cloneElement(t,{context:{columns:e.props.columns,gutterRatio:e.props.context.gutterRatio}}):t}}(this))},render:function(){var e,t;return t=o({contextColumns:this.props.context.columns,gutterRatio:this.props.context.gutterRatio,columns:this.props.columns,at:this.props.at,pre:this.props.pre,post:this.props.post,squish:this.props.squish,last:this.props.last,break:this.props.break}),t=r(t,this.props.style),e=r({},this.props,{style:t}),delete e.at,delete e.break,delete e.columns,delete e.context,delete e.first,delete e.last,delete e.post,delete e.pre,delete e.squish,delete e.style,i.createElement("div",Object.assign({},e,{style:t}),this.renderChildren(),i.createElement("span",{style:{display:"block",clear:"both"}}," "))}})},593:function(e,t,n){t.Container=n(590),t.Grid=n(591),t.Breakpoint=n(589),t.Span=n(592)},594:function(e,t,n){var i;i=n(4),e.exports=function(e){var t,n,r,o,s,a,c,l,u,p;return r={columns:3,at:0,pre:0,post:0,squish:0,contextColumns:12,gutterRatio:.25,first:!1,last:!1},u=i(r,e),l=100/(u.contextColumns+(u.contextColumns-1)*u.gutterRatio),s=u.gutterRatio*l,n=function(e){return l*e+s*(e-1)},t=function(e){return 0===e?0:n(e)+s},p=n(u.columns),a=0===u.at&&0===u.pre&&0===u.squish?0:t(u.at)+t(u.pre)+t(u.squish),u.last&&0===u.post&&0===u.squish?c=0:0!==u.post||0!==u.squish?(c=t(u.post)+t(u.squish),u.last||(c+=s)):c=s,o=u.last?"right":"left",p+="%",a+="%",c+="%",{float:o,marginLeft:a,marginRight:c,width:p,clear:u.break?"both":"none"}}},388:function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}t.__esModule=!0,t.query=void 0;var a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e},c=n(3),l=i(c),u=n(284),p=i(u),d=n(593),M=n(51),h=n(628),g=i(h),m=function(e){function t(){return r(this,t),o(this,e.apply(this,arguments))}return s(t,e),t.prototype.render=function(){var e=this.props,t=e.location,n=e.children,i=e.data,r=i.site.siteMetadata.title,o=void 0,s="/";return s="/",o=t.pathname===s?l.default.createElement("h1",{style:a({},(0,M.scale)(1.5),{marginBottom:(0,M.rhythm)(1.5),marginTop:0})},l.default.createElement(p.default,{style:{boxShadow:"none",textDecoration:"none",color:"inherit",display:"flex",alignItems:"center"},to:"/"},l.default.createElement("span",{style:{width:"2em",height:"2em",backgroundImage:"url("+g.default+")",backgroundSize:"contain",backgroundPosition:"50%",backgroundRepeat:"no-repeat"}}),r)):l.default.createElement("h3",{style:{fontFamily:"Montserrat, sans-serif",marginTop:0,marginBottom:(0,M.rhythm)(-1)}},l.default.createElement(p.default,{style:{boxShadow:"none",textDecoration:"none",color:"inherit",display:"flex",alignItems:"center"},to:"/"},l.default.createElement("span",{style:{width:"2em",height:"2em",backgroundImage:"url("+g.default+")",backgroundSize:"contain",backgroundPosition:"50%",backgroundRepeat:"no-repeat"}}),r)),l.default.createElement(d.Container,{style:{maxWidth:(0,M.rhythm)(28),padding:(0,M.rhythm)(1.5)+" "+(0,M.rhythm)(.75)}},o,n())},t}(l.default.Component);t.default=m;t.query="** extracted graphql fragment **"},628:function(e,t){e.exports="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KPCEtLSBDcmVhdG9yOiBDb3JlbERSQVcgWDYgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMzAuNDIxMWluIiBoZWlnaHQ9IjI0LjgwMzJpbiIgdmVyc2lvbj0iMS4xIiBzdHlsZT0ic2hhcGUtcmVuZGVyaW5nOmdlb21ldHJpY1ByZWNpc2lvbjsgdGV4dC1yZW5kZXJpbmc6Z2VvbWV0cmljUHJlY2lzaW9uOyBpbWFnZS1yZW5kZXJpbmc6b3B0aW1pemVRdWFsaXR5OyBmaWxsLXJ1bGU6ZXZlbm9kZDsgY2xpcC1ydWxlOmV2ZW5vZGQiCnZpZXdCb3g9IjAgMCAzMDQyMSAyNDgwMyIKIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KIDxkZWZzPgogIDxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+CiAgIDwhW0NEQVRBWwogICAgLmZpbDAge2ZpbGw6IzUxNTE1MTtmaWxsLXJ1bGU6bm9uemVyb30KICAgXV0+CiAgPC9zdHlsZT4KIDwvZGVmcz4KIDxnIGlkPSJfX3gwMDIzX0xheWVyX3gwMDIwXzEiPgogIDxtZXRhZGF0YSBpZD0iQ29yZWxDb3JwSURfMENvcmVsLUxheWVyIi8+CiAgPGcgaWQ9Il8yODc0MDYwMjQiPgogICA8cGF0aCBjbGFzcz0iZmlsMCIgZD0iTTIwNjUzIDE3MTE2YzQ3NSwtMjU3IDkxMywtNjM1IDEyODcsLTExMTIgNzQ2LC05NTMgMTIyNiwtMjMwMyAxMjI2LC0zODAzIDAsLTExMjYgLTI2OSwtMjE2NyAtNzIwLC0zMDE4IC00NTEsLTg1MyAtMTA4MCwtMTUxMiAtMTc5MywtMTg5NyAtNDc1LC0yNTcgLTk4NywtMzk1IC0xNTI2LC0zOTYgLTY1NiwxIC0xMjcyLDIwOCAtMTgzMiw1ODQgLTEyNCwxMjYgLTQ1NSw0NDcgLTk0Nyw3NzcgLTYxMCw0MDggLTE0NjgsODM5IC0yNDc4LDg0MyAtNTI0LDEgLTEwNTEsLTEyNSAtMTUyMCwtNDE4IC00NzEsLTI5MyAtODc0LC03NDEgLTExODksLTEzMzZsLTYzIC0xMTcgMCAtNTk4NWMyLC0yNDEgLTE0MywtNDQzIC0zNDUsLTUzNWwtMjg5IC01NyAtNTk4MCAwYy0xNjEsMCAtMzAzLDY1IC00MTAsMTczIC0xMDYsMTA4IC0xNzIsMjUzIC0xNzIsNDE5bDAgMTU2MDIgLTMxNjQgMzYxMSAzMTY0IDAgMCAyNzcwYzAsMTY2IDY1LDMxMiAxNzIsNDIwIDEwNiwxMDggMjQ5LDE3MSA0MTAsMTcxbDU5ODAgMCAyOTEgLTU2YzIwMCwtOTQgMzQ1LC0yOTUgMzQzLC01MzVsMCAtNjA0MSA2MyAtMTE2YzMxNiwtNTk4IDcxOCwtMTA0NyAxMTg5LC0xMzM4IDQ3MCwtMjkzIDk5NywtNDE5IDE1MjAsLTQxOSAxMDE0LDQgMTg3Myw0MzcgMjQ4Myw4NDYgNDg5LDMzMSA4MjEsNjUyIDk0NCw3NzkgNTU4LDM3NSAxMTc1LDU4MSAxODMwLDU4MSA1MzksMCAxMDUxLC0xMzcgMTUyNiwtMzk0eiIvPgogICA8cGF0aCBjbGFzcz0iZmlsMCIgZD0iTTI3MDA3IDM5MjJsMCAtMjY4NmMwLC0xNjYgLTY1LC0zMTIgLTE3MSwtNDE5IC0xMDgsLTEwOCAtMjUwLC0xNzIgLTQxMSwtMTczbC0xMzY4OSAwYy0xNTcsMiAtMjkzLDYxIC0zOTksMTYxIC0xMDAsOTYgLTE2NCwyMjQgLTE4MCwzNzFsMyAzOSAwIDU4NTVjNCw4MiAzNSwxNzEgMTI0LDI4NiA4OCwxMTEgMjM1LDIzNCA0MTQsMzM3IDM1NywyMTIgODQ4LDM0MiAxMTcyLDMzOCA2NzksNCAxMzU1LC0zMDcgMTg2MywtNjQ3IDUwNCwtMzM0IDgzNCwtNjgxIDgzOSwtNjg5bDQwIC00MyA0OCAtMzRjNzIyLC00OTkgMTU2OSwtNzkxIDI0NjcsLTc5MCA3MjMsLTEgMTQxNCwxODkgMjAzMCw1MjIgNjE4LDMzNSAxMTY0LDgxMiAxNjE4LDEzOTIgOTA3LDExNjEgMTQ0OSwyNzMyIDE0NTAsNDQ1OCAwLDEyOTMgLTMwNiwyNTAxIC04NDEsMzUxMyAtNTM1LDEwMTIgLTEzMDAsMTgzNCAtMjIyNywyMzM2IC02MTcsMzM0IC0xMzA4LDUyMyAtMjAzMCw1MjMgLTg5OSwxIC0xNzQ1LC0yOTIgLTI0NjcsLTc5MWwtNTAgLTM0IC00MCAtNDMgLTEgLTIgLTcgLTggLTM5IC00MGMtMzUsLTM1IC04OSwtODggLTE2MSwtMTUzIC0xNDEsLTEyNyAtMzQ5LC0zMDAgLTYwMywtNDcxIC01MDgsLTM0NSAtMTE5NiwtNjY3IC0xODg5LC02NjQgLTI4MCwwIC02MTAsNDQgLTg5NiwxNDEgLTI4OCw5NyAtNTE5LDI0NiAtNjUxLDQyMCAtODcsMTE0IC0xNDMsMjQxIC0xNjUsNDIwbDAgNTg5MiAtMiAyMSAtMiAyM2MxNSwxNDUgODAsMjczIDE3NywzNjggMTA0LDk4IDIzNiwxNTcgMzg5LDE1OWwxMzcwMyAwYzE2MSwwIDMwMywtNjMgNDExLC0xNzEgMTA2LC0xMDggMTcxLC0yNTQgMTcxLC00MjBsMCAtMTU3NTQgMzI0MSAtMzU0MyAtMzI0MSAweiIvPgogIDwvZz4KIDwvZz4KPC9zdmc+Cg=="}});
//# sourceMappingURL=component---src-layouts-index-js-8ad25224ef0ba077be9c.js.map