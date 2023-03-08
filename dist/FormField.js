"use strict";var e=require("react"),s=require("classnames"),t=require("./List.js"),r=require("./ListItem.js");function a(t){var r=t.customClassName,a=t.type,l=t.message,m=t.testid;return e.createElement("p",{"data-testid":m,className:s("form-field-message",r,"form-field-message--is-".concat(a))},l)}require("uuid"),require("./keyboardEventConstants-395320ec.js"),module.exports=function(l){var m=l.label,i=l.labelledBy,o=l.labelFor,n=l.customClassName,c=l.children,d=l.errorMessages,u=l.helperMessages,f=l.testid,_=Boolean(null==d?void 0:d.length),g=Boolean(null==u?void 0:u.length),p=s("form-field",n,{"form-field--has-error":_});return e.createElement("div",{className:p,"data-testid":f},e.createElement("label",{id:i,htmlFor:o,className:"form-field__label"},Boolean(m)&&e.createElement("span",{className:"form-field__title"},m),c),_&&e.createElement(t,{testid:"".concat(f,".error-messages"),customClassName:"form-field__error-message-list",items:d},(function(s,t){return e.createElement(r,{customClassName:"form-field__error-message-list__item"},e.createElement(a,{type:"error",message:s,testid:t}))})),!_&&g&&e.createElement(t,{testid:"".concat(f,".helper-messages"),customClassName:"form-field__helper-message-list",items:u},(function(s,t){return e.createElement(r,{customClassName:"form-field__helper-message-list__item"},e.createElement(a,{type:"helper",message:s,testid:t}))})))};
