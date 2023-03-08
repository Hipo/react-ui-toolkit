"use strict";function e(e){return e&&"object"==typeof e&&"default"in e?e.default:e}var t=require("./_tslib-5fa49119.js"),r=e(require("date-fns-tz/utcToZonedTime")),a=e(require("date-fns-tz/format")),n=e(require("date-fns/fp/formatWithOptions")),o=e(require("date-fns/locale/en-CA")),i={DEFAULT:"MMM d, yyyy",LONG_TIME_FORMAT:"hh:mm a"};function s(e){return[e[0],e[1]].sort((function(e,t){return e.getTime()-t.getTime()}))}exports.DATE_FORMAT=i,exports.SECOND_IN_MS=1e3,exports.calculateRemainingTimeBreakdown=function(e,r,a){var n,o,i;void 0===r&&(r=0),void 0===a&&(a="down"),e.length>1||"up"===a?(o=(n=t.__read(s([e[0],e[1]||new Date]),2))[0],i=n[1]):(i=e[0],o=new Date);var g=i.getTime()-o.getTime(),l=(g-r)/1e3;return{delta:g,days:Math.floor(l/86400),hours:Math.floor(l/3600%24),minutes:Math.floor(l%3600/60),seconds:Math.floor(l%3600%60)}},exports.formatDateWithOptions=function(e){var t=e||{},s=t.format,g=void 0===s?i.DEFAULT:s,l=t.shouldShiftDateToCompensateForTimezone,c=void 0===l||l,u=t.isProvidedDateInUTC,p=void 0===u||u,f=t.timeZone;return function(e){var t=e;return f?p&&(t=r(e,f)):c&&(t=function(e){return new Date(e.getTime()- -1*e.getTimezoneOffset()*6e4)}(e)),f?a(t,g,{locale:o,timeZone:f}):n({locale:o},g)(t)}},exports.parseTime=function(e,t){void 0===t&&(t="g:i A");var r,a,n=e.replace(/[^0-9]/g,""),o=null!==e.match(/p/i);switch(n.length){case 4:r=parseInt(n[0]+n[1],10),a=parseInt(n[2]+n[3],10);break;case 3:r=parseInt(n[0],10),a=parseInt(n[1]+n[2],10);break;case 2:case 1:r=parseInt(n[0]+(n[1]||""),10),a=0;break;default:return""}return o&&r>0&&r<12&&(r+=12),r>=13&&r<=23&&(o=!0),(r<=0||r>=24)&&(r=0),(a<0||a>59)&&(a=0),t.replace(/g/g,0===r?"12":"g").replace(/g/g,r>12?(r-12).toString().padStart(2,"0"):r.toString().padStart(2,"0")).replace(/G/g,String(r)).replace(/h/g,String(r.toString().length>1?r>12?r-12:r:"0"+(r>12?r-12:r))).replace(/H/g,String(r.toString().length>1?r:"0"+r)).replace(/i/g,String(a.toString().length>1?a:"0"+a)).replace(/s/g,"00").replace(/a/g,o?"pm":"am").replace(/A/g,o?"PM":"AM")},exports.sortDateRange=s;
