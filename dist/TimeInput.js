"use strict";var e=require("./_tslib-5624c8ef.js"),t=require("react"),a=require("classnames"),r=require("./Input.js"),i=require("./timeUtils-637607c6.js"),n=require("./useDebounce-0721237d.js");require("date-fns-tz/utcToZonedTime"),require("date-fns-tz/format"),require("date-fns/fp/formatWithOptions"),require("date-fns/locale/en-CA");var s=i.formatDateWithOptions({format:i.DATE_FORMAT.LONG_TIME_FORMAT,shouldShiftDateToCompensateForTimezone:!1}),u=100;module.exports=function(o){var l=o.testid,m=o.initialDateTime,c=o.value,d=o.onChange,p=o.placeholder,f=void 0===p?"03:30 PM":p,T=o.name,h=void 0===T?"TimeInput":T,q=o.customClassName,v=e.__rest(o,["testid","initialDateTime","value","onChange","placeholder","name","customClassName"]),_=e.__read(n.useDebounce(d,m?s(m):null,u),2),C=_[0],D=_[1];return t.createElement(r,e.__assign({type:"text",testid:"".concat(l,".input"),customClassName:a("time-input",q),name:h,value:C,placeholder:f,onChange:function(e){D(e.currentTarget.value)},onBlur:function(){var e=i.parseTime(c);m&&c.length<1&&(e=s(m));D(e)}},v))};
