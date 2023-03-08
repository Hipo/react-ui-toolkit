"use strict";var t=require("react"),e=require("classnames"),a=require("./_tslib-5624c8ef.js"),s=require("react-dom"),o=require("./List.js"),r=require("./ListItem.js"),n=require("./Button.js"),i=require("./arrayUtils-3f7240f6.js"),u=require("./numberUtils-cdae8d95.js");var c=t.createContext({toastId:""});function l(e){var r=e.customRootId,n=v(),i=a.__read(t.useState(null),2),u=i[0],c=i[1];return t.useLayoutEffect((function(){var t=r&&document.querySelector("#".concat(r));if(t)c(t);else{var e=document.createElement("div");e.setAttribute("id","toast-root"),document.body.append(e),c(e)}}),[r]),u&&s.createPortal(n.toastStack.length?t.createElement(o,{testid:"ToastStack",items:n.toastStack,customClassName:"toast-stack"},(function(e,a){return t.createElement(g,{testid:a,data:e})})):t.createElement(t.Fragment,null),u)}c.displayName="ToastItemContext";var d=4e3,_={toastStack:[],autoCloseToasts:!0,defaultAutoCloseTimeout:d};function m(t){return function(e){return!t(e)}}function T(t){return function(e){return t===e.id}}function f(t,e){var s=t;switch(e.type){case"DISPLAY":var o=e.toastData,r=a.__spreadArray(a.__spreadArray([],a.__read(t.toastStack.filter(m(T(o.id)))),!1),[o],!1);s=a.__assign(a.__assign({},t),{toastStack:i.limitArrayLengthFromTheEnd(t.limit,r)});break;case"HIDE":s=a.__assign(a.__assign({},t),{toastStack:t.toastStack.filter(m(T(e.toastId)))});break;case"HIDE_ALL":s=a.__assign(a.__assign({},t),{toastStack:[]});break;case"UPDATE":var n=t.toastStack.findIndex(T(e.toastId));if(!(n>-1))throw new Error("Trying to update a Toast that is already removed");s=a.__assign(a.__assign({},t),{toastStack:i.updateAtIndex(t.toastStack,n,a.__assign(a.__assign({},t.toastStack[n]),e.toastData))});break;case"SET_LIMIT":var c=e.limit;s=a.__assign(a.__assign({},t),{limit:c,toastStack:i.limitArrayLengthFromTheEnd(c,t.toastStack)});break;case"SET_AUTO_CLOSE":s=a.__assign(a.__assign({},t),{autoCloseToasts:e.autoCloseToasts});break;case"SET_DEFAULT_AUTO_CLOSE_TIMEOUT_FOR_ALL_TOASTS":var l=e.timeout;u.isNonNegativeNumber(l)&&(s=a.__assign(a.__assign({},t),{defaultAutoCloseTimeout:l}))}return s}var C=t.createContext(null),E=t.createContext(null);function v(){var e=t.useContext(C);if(!e)throw new Error("Trying to consume ToastStateContext outside of its provider.");return e}function S(){var e=t.useContext(E);if(!e)throw new Error("Trying to consume ToastDispatchContext outside of its provider");return{display:t.useCallback((function(t){var s,o,r,n,i,u,c=t.id||(r=(o=s||{}).radix,n=void 0===r?36:r,i=o.substringStartIndex,u=void 0===i?7:i,Math.random().toString(n).substring(u));return e({type:"DISPLAY",toastData:a.__assign(a.__assign({},t),{id:c})}),c}),[e]),hide:t.useCallback((function(t){e({type:"HIDE",toastId:t})}),[e]),update:t.useCallback((function(t,a){e({type:"UPDATE",toastId:t,toastData:a})}),[e]),hideAll:t.useCallback((function(){e({type:"HIDE_ALL"})}),[e])}}function g(a){var s=a.testid,o=a.data,n=v(),i=S().hide,u=o.timeout,l=void 0===u?n.defaultAutoCloseTimeout:u,d=o.render,_=o.customClassName,m=o.id,T="boolean"==typeof o.autoClose?o.autoClose:n.autoCloseToasts;return t.useLayoutEffect((function(){var t;return T&&(t=setTimeout((function(){i(m)}),l)),function(){t&&clearTimeout(t)}}),[T,l,i,m]),t.createElement(c.Provider,{value:{toastId:m}},t.createElement(r,{testid:s,customClassName:e("toast",_)},d()))}E.displayName="ToastDispatchContext",C.displayName="ToastStateContext",g.CloseButton=function(e){var a=e.children,s=e.testid,o=S().hide,r=function(){var e=t.useContext(c);if(!e)throw new Error("Trying to consume ToastItemContext outside of its provider");return e}().toastId;return t.createElement(n,{testid:s,onClick:function(){o(r)},customClassName:"toast-close-button"},a)},exports.Toast=g,exports.ToastContextProvider=function(e){var s=e.children,o=e.customRootId,r=e.autoCloseToasts,n=void 0===r||r,i=e.limit,c=e.defaultAutoCloseTimeout,m=void 0===c?d:c,T=a.__read(t.useReducer(f,a.__assign(a.__assign({},_),{autoCloseToasts:n,limit:i,defaultAutoCloseTimeout:m})),2),v=T[0],S=T[1];return t.useEffect((function(){u.isNonNegativeNumber(i)&&S({type:"SET_LIMIT",limit:i})}),[i]),t.useEffect((function(){S({type:"SET_AUTO_CLOSE",autoCloseToasts:n})}),[n]),t.useEffect((function(){S({type:"SET_DEFAULT_AUTO_CLOSE_TIMEOUT_FOR_ALL_TOASTS",timeout:m})}),[m]),t.createElement(C.Provider,{value:v},t.createElement(E.Provider,{value:S},s,t.createElement(l,{customRootId:o})))},exports.ToastDispatchContext=E,exports.ToastStateContext=C,exports.useToastContextState=v,exports.useToaster=S;
