"use strict";function e(e){return e&&"object"==typeof e&&"default"in e?e.default:e}var t=require("react"),r=e(t),n=e(require("classnames")),a=require("./List.js"),i=require("./ListItem.js"),s=require("./_tslib-afbe92ee.js"),u=require("./timeUtils-cf263521.js");function o(e){var r=e.range,n=e.cadence,a=void 0===n?u.SECOND_IN_MS:n,i=e.timerType,o=void 0===i?"down":i,c=e.onEnd,d=t.useRef(0),l=t.useRef(),m=s.__read(t.useState(u.calculateRemainingTimeBreakdown(r,d.current,o)),2),f=m[0],p=m[1],v=s.__read(r,2),_=v[0],w=v[1],S=t.useRef();return t.useLayoutEffect((function(){S.current=c}),[c]),t.useLayoutEffect((function(){return l.current=setInterval((function(){w&&(d.current+=a);var e=u.calculateRemainingTimeBreakdown([_,w],d.current,o);e.delta>=u.SECOND_IN_MS?p(e):(clearInterval(l.current),p({delta:0,days:0,hours:0,minutes:0,seconds:0}))}),a),function(){clearInterval(l.current)}}),[a,_,w,o]),t.useEffect((function(){f.delta<=0&&(clearInterval(l.current),S.current&&S.current())}),[f.delta]),f}exports.DateTimer=function(e){var c=e.testid,d=e.range,l=e.timerInterval,m=void 0===l?1:l,f=e.timerType,p=void 0===f?"down":f,v=e.alwaysShowSeconds,_=void 0!==v&&v,w=e.titleMap,S=e.onEnd,y=e.customClassName,E=function(e,t){var r=e.titleMap,n=e.alwaysShowSeconds,a=[];return a=t.days>=1?["days","hours","minutes"]:t.hours>=1?["hours","minutes"]:["minutes","seconds"],n&&t.hours>=1&&a.push("seconds"),a.map((function(e){return{id:e,count:t[e].toString().padStart(2,"0"),title:(r?r[e]:void 0)||e}}))}({titleMap:w,alwaysShowSeconds:_},o({range:d,cadence:m*u.SECOND_IN_MS,timerType:p,onEnd:S}));return t.useEffect((function(){var e=s.__read(u.sortDateRange([d[0],d[1]||new Date]),1)[0];"up"===p&&e.getTime()>(new Date).getTime()&&console.error("`timerType` is `up` but `range` is not in the past",d),"down"===p&&e.getTime()<(new Date).getTime()&&console.error("`timerType` is `down` but `range` is not in the future",d)}),[d,p]),r.createElement(a,{customClassName:n("date-timer",y),testid:c,items:E},(function(e,t){return r.createElement(i,{customClassName:"date-timer-box"},r.createElement("p",{"data-testid":t+"."+e.id+".count",className:"date-timer-box__count"},e.count),r.createElement("p",{"data-testid":t+"."+e.id+".title",className:"date-timer-box__title"},e.title))}))},exports.useDateTimer=o;
