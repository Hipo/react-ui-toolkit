"use strict";var e=require("./_tslib-5624c8ef.js"),r=require("./numberUtils-cdae8d95.js");exports.filterOutItemsByKey=function(e,r,t){var n=t.map((function(e){return e[r]}));return e.reduce((function(e,t){return n.includes(t[r])||e.push(t),e}),[])},exports.limitArrayLengthFromTheEnd=function(e,t){var n=t;return r.isNonNegativeNumber(e)&&t.length>e&&(n=t.slice(t.length-e)),n},exports.updateAtIndex=function(r,t,n){var u=e.__spreadArray([],e.__read(r),!1);return u.splice(t,1,n),u};
