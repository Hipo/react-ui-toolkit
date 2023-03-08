"use strict";var e=require("./_tslib-1ad748a0.js"),t=require("react"),r=require("classnames"),n=require("./timeUtils-4224bec9.js"),a=require("./List.js"),i=require("./ListItem.js");function s(r){var a=r.range,i=r.cadence,s=void 0===i?n.SECOND_IN_MS:i,u=r.timerType,c=void 0===u?"down":u,o=r.onEnd,d=t.useRef(0),m=t.useRef(),l=e.__read(t.useState(n.calculateRemainingTimeBreakdown(a,d.current,c)),2),f=l[0],p=l[1],v=e.__read(a,2),_=v[0],w=v[1],S=t.useRef();return t.useLayoutEffect((function(){S.current=o}),[o]),t.useLayoutEffect((function(){return m.current=setInterval((function(){w&&(d.current+=s);var e=n.calculateRemainingTimeBreakdown([_,w],d.current,c);e.delta>=n.SECOND_IN_MS?p(e):(clearInterval(m.current),p({delta:0,days:0,hours:0,minutes:0,seconds:0}))}),s),function(){clearInterval(m.current)}}),[s,_,w,c]),t.useEffect((function(){f.delta<=0&&(clearInterval(m.current),S.current&&S.current())}),[f.delta]),f}exports.DateTimer=function(u){var c=u.testid,o=u.range,d=u.timerInterval,m=void 0===d?1:d,l=u.timerType,f=void 0===l?"down":l,p=u.alwaysShowSeconds,v=void 0!==p&&p,_=u.titleMap,w=u.onEnd,S=u.customClassName,E=function(e,t){var r=e.titleMap,n=e.alwaysShowSeconds,a=[];return a=t.days>=1?["days","hours","minutes"]:t.hours>=1?["hours","minutes"]:["minutes","seconds"],n&&t.hours>=1&&a.push("seconds"),a.map((function(e){return{id:e,count:t[e].toString().padStart(2,"0"),title:(r?r[e]:void 0)||e}}))}({titleMap:_,alwaysShowSeconds:v},s({range:o,cadence:m*n.SECOND_IN_MS,timerType:f,onEnd:w}));return t.useEffect((function(){var t=e.__read(n.sortDateRange([o[0],o[1]||new Date]),1)[0];"up"===f&&t.getTime()>(new Date).getTime()&&console.error("`timerType` is `up` but `range` is not in the past",o),"down"===f&&t.getTime()<(new Date).getTime()&&console.error("`timerType` is `down` but `range` is not in the future",o)}),[o,f]),t.createElement(a,{customClassName:r("date-timer",S),testid:c,items:E},(function(e,r){return t.createElement(i,{customClassName:"date-timer-box"},t.createElement("p",{"data-testid":"".concat(r,".").concat(e.id,".count"),className:"date-timer-box__count"},e.count),t.createElement("p",{"data-testid":"".concat(r,".").concat(e.id,".title"),className:"date-timer-box__title"},e.title))}))},exports.useDateTimer=s;
