"use strict";var e=require("./_tslib-b0a4c900.js"),r=require("react");exports.useDebounce=function(t,u,n){var c=e.__read(r.useState(u),2),i=c[0],s=c[1],o=r.useRef(i);return r.useEffect((function(){var e;return o.current!==i&&(e=setTimeout((function(){t(i)}),n),o.current=i),function(){clearTimeout(e)}}),[o,t,i,n]),[i,s]};
