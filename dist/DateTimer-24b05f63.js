"use strict";function e(e){return e&&"object"==typeof e&&"default"in e?e.default:e}var t=require("react"),r=e(t),n=e(require("classnames")),a=require("./List.js"),o=require("./ListItem.js"),i=require("./_tslib-1dc84117.js");function u(e){return[e[0],e[1]].sort((function(e,t){return e.getTime()-t.getTime()}))}function s(e,t,r){var n,a,o;void 0===t&&(t=0),void 0===r&&(r="down"),e.length>1||"up"===r?(a=(n=i.__read(u([e[0],e[1]||new Date]),2))[0],o=n[1]):(o=e[0],a=new Date);var s=o.getTime()-a.getTime(),c=(s-t)/1e3;return{delta:s,days:Math.floor(c/86400),hours:Math.floor(c/3600%24),minutes:Math.floor(c%3600/60),seconds:Math.floor(c%3600%60)}}function c(e){var r=e.range,n=e.cadence,a=void 0===n?1e3:n,o=e.timerType,u=void 0===o?"down":o,c=e.onEnd,d=t.useRef(0),l=t.useRef(),m=i.__read(t.useState(s(r,d.current,u)),2),f=m[0],v=m[1],p=i.__read(r,2),h=p[0],w=p[1],g=t.useRef();return t.useLayoutEffect((function(){g.current=c}),[c]),t.useLayoutEffect((function(){return l.current=setInterval((function(){w&&(d.current+=a);var e=s([h,w],d.current,u);e.delta>=1e3?v(e):(clearInterval(l.current),v({delta:0,days:0,hours:0,minutes:0,seconds:0}))}),a),function(){clearInterval(l.current)}}),[a,h,w,u]),t.useEffect((function(){f.delta<=0&&(clearInterval(l.current),g.current&&g.current())}),[f.delta]),f}exports.DateTimer=function(e){var s=e.testid,d=e.range,l=e.timerInterval,m=void 0===l?1:l,f=e.timerType,v=void 0===f?"down":f,p=e.alwaysShowSeconds,h=void 0!==p&&p,w=e.titleMap,g=e.onEnd,y=e.customClassName,T=function(e,t){var r=e.titleMap,n=e.alwaysShowSeconds,a=[];return a=t.days>=1?["days","hours","minutes"]:t.hours>=1?["hours","minutes"]:["minutes","seconds"],n&&t.hours>=1&&a.push("seconds"),a.map((function(e){return{id:e,count:t[e].toString().padStart(2,"0"),title:(r?r[e]:void 0)||e}}))}({titleMap:w,alwaysShowSeconds:h},c({range:d,cadence:1e3*m,timerType:v,onEnd:g}));return t.useEffect((function(){var e=i.__read(u([d[0],d[1]||new Date]),1)[0];"up"===v&&e.getTime()>(new Date).getTime()&&console.error("`timerType` is `up` but `range` is not in the past",d),"down"===v&&e.getTime()<(new Date).getTime()&&console.error("`timerType` is `down` but `range` is not in the future",d)}),[d,v]),r.createElement(a,{customClassName:n("date-timer",y),testid:s,items:T},(function(e,t){return r.createElement(o,{customClassName:"date-timer-box"},r.createElement("p",{"data-testid":t+"."+e.id+".count",className:"date-timer-box__count"},e.count),r.createElement("p",{"data-testid":t+"."+e.id+".title",className:"date-timer-box__title"},e.title))}))},exports.useDateTimer=c;
