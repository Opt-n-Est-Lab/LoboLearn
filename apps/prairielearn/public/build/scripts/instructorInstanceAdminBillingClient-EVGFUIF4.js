"use strict";(()=>{var le=Object.freeze,ce=Object.defineProperty,Me=Object.defineProperties;var ke=Object.getOwnPropertyDescriptors;var ue=Object.getOwnPropertySymbols;var He=Object.prototype.hasOwnProperty,qe=Object.prototype.propertyIsEnumerable;var W=(e,t,n)=>t in e?ce(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,de=(e,t)=>{for(var n in t||(t={}))He.call(t,n)&&W(e,n,t[n]);if(ue)for(var n of ue(t))qe.call(t,n)&&W(e,n,t[n]);return e},fe=(e,t)=>Me(e,ke(t));var Y=(e,t,n)=>W(e,typeof t!="symbol"?t+"":t,n);var me=(e,t)=>le(ce(e,"raw",{value:le(t||e.slice())}));var pe=11;function Ve(e,t){var n=t.attributes,r,a,s,u,p;if(!(t.nodeType===pe||e.nodeType===pe)){for(var b=n.length-1;b>=0;b--)r=n[b],a=r.name,s=r.namespaceURI,u=r.value,s?(a=r.localName||a,p=e.getAttributeNS(s,a),p!==u&&(r.prefix==="xmlns"&&(a=r.name),e.setAttributeNS(s,a,u))):(p=e.getAttribute(a),p!==u&&e.setAttribute(a,u));for(var h=e.attributes,x=h.length-1;x>=0;x--)r=h[x],a=r.name,s=r.namespaceURI,s?(a=r.localName||a,t.hasAttributeNS(s,a)||e.removeAttributeNS(s,a)):t.hasAttribute(a)||e.removeAttribute(a)}}var z,ze="http://www.w3.org/1999/xhtml",g=typeof document=="undefined"?void 0:document,Ge=!!g&&"content"in g.createElement("template"),je=!!g&&g.createRange&&"createContextualFragment"in g.createRange();function Ze(e){var t=g.createElement("template");return t.innerHTML=e,t.content.childNodes[0]}function Ke(e){z||(z=g.createRange(),z.selectNode(g.body));var t=z.createContextualFragment(e);return t.childNodes[0]}function Qe(e){var t=g.createElement("body");return t.innerHTML=e,t.childNodes[0]}function Xe(e){return e=e.trim(),Ge?Ze(e):je?Ke(e):Qe(e)}function G(e,t){var n=e.nodeName,r=t.nodeName,a,s;return n===r?!0:(a=n.charCodeAt(0),s=r.charCodeAt(0),a<=90&&s>=97?n===r.toUpperCase():s<=90&&a>=97?r===n.toUpperCase():!1)}function Je(e,t){return!t||t===ze?g.createElement(e):g.createElementNS(t,e)}function We(e,t){for(var n=e.firstChild;n;){var r=n.nextSibling;t.appendChild(n),n=r}return t}function ee(e,t,n){e[n]!==t[n]&&(e[n]=t[n],e[n]?e.setAttribute(n,""):e.removeAttribute(n))}var be={OPTION:function(e,t){var n=e.parentNode;if(n){var r=n.nodeName.toUpperCase();r==="OPTGROUP"&&(n=n.parentNode,r=n&&n.nodeName.toUpperCase()),r==="SELECT"&&!n.hasAttribute("multiple")&&(e.hasAttribute("selected")&&!t.selected&&(e.setAttribute("selected","selected"),e.removeAttribute("selected")),n.selectedIndex=-1)}ee(e,t,"selected")},INPUT:function(e,t){ee(e,t,"checked"),ee(e,t,"disabled"),e.value!==t.value&&(e.value=t.value),t.hasAttribute("value")||e.removeAttribute("value")},TEXTAREA:function(e,t){var n=t.value;e.value!==n&&(e.value=n);var r=e.firstChild;if(r){var a=r.nodeValue;if(a==n||!n&&a==e.placeholder)return;r.nodeValue=n}},SELECT:function(e,t){if(!t.hasAttribute("multiple")){for(var n=-1,r=0,a=e.firstChild,s,u;a;)if(u=a.nodeName&&a.nodeName.toUpperCase(),u==="OPTGROUP")s=a,a=s.firstChild;else{if(u==="OPTION"){if(a.hasAttribute("selected")){n=r;break}r++}a=a.nextSibling,!a&&s&&(a=s.nextSibling,s=null)}e.selectedIndex=n}}},I=1,ge=11,he=3,xe=8;function S(){}function Ye(e){if(e)return e.getAttribute&&e.getAttribute("id")||e.id}function et(e){return function(n,r,a){if(a||(a={}),typeof r=="string")if(n.nodeName==="#document"||n.nodeName==="HTML"||n.nodeName==="BODY"){var s=r;r=g.createElement("html"),r.innerHTML=s}else r=Xe(r);else r.nodeType===ge&&(r=r.firstElementChild);var u=a.getNodeKey||Ye,p=a.onBeforeNodeAdded||S,b=a.onNodeAdded||S,h=a.onBeforeElUpdated||S,x=a.onElUpdated||S,B=a.onBeforeNodeDiscarded||S,A=a.onNodeDiscarded||S,N=a.onBeforeElChildrenUpdated||S,$=a.skipFromChildren||S,L=a.addChild||function(i,o){return i.appendChild(o)},_=a.childrenOnly===!0,y=Object.create(null),R=[];function O(i){R.push(i)}function ie(i,o){if(i.nodeType===I)for(var d=i.firstChild;d;){var l=void 0;o&&(l=u(d))?O(l):(A(d),d.firstChild&&ie(d,o)),d=d.nextSibling}}function M(i,o,d){B(i)!==!1&&(o&&o.removeChild(i),A(i),ie(i,d))}function Z(i){if(i.nodeType===I||i.nodeType===ge)for(var o=i.firstChild;o;){var d=u(o);d&&(y[d]=o),Z(o),o=o.nextSibling}}Z(n);function K(i){b(i);for(var o=i.firstChild;o;){var d=o.nextSibling,l=u(o);if(l){var c=y[l];c&&G(o,c)?(o.parentNode.replaceChild(c,o),k(c,o)):K(o)}else K(o);o=d}}function Le(i,o,d){for(;o;){var l=o.nextSibling;(d=u(o))?O(d):M(o,i,!0),o=l}}function k(i,o,d){var l=u(o);if(l&&delete y[l],!d){var c=h(i,o);if(c===!1||(c instanceof HTMLElement&&(i=c,Z(i)),e(i,o),x(i),N(i,o)===!1))return}i.nodeName!=="TEXTAREA"?Re(i,o):be.TEXTAREA(i,o)}function Re(i,o){var d=$(i,o),l=o.firstChild,c=i.firstChild,T,v,E,q,C;e:for(;l;){for(q=l.nextSibling,T=u(l);!d&&c;){if(E=c.nextSibling,l.isSameNode&&l.isSameNode(c)){l=q,c=E;continue e}v=u(c);var V=c.nodeType,P=void 0;if(V===l.nodeType&&(V===I?(T?T!==v&&((C=y[T])?E===C?P=!1:(i.insertBefore(C,c),v?O(v):M(c,i,!0),c=C,v=u(c)):P=!1):v&&(P=!1),P=P!==!1&&G(c,l),P&&k(c,l)):(V===he||V==xe)&&(P=!0,c.nodeValue!==l.nodeValue&&(c.nodeValue=l.nodeValue))),P){l=q,c=E;continue e}v?O(v):M(c,i,!0),c=E}if(T&&(C=y[T])&&G(C,l))d||L(i,C),k(C,l);else{var J=p(l);J!==!1&&(J&&(l=J),l.actualize&&(l=l.actualize(i.ownerDocument||g)),L(i,l),K(l))}l=q,c=E}Le(i,c,v);var se=be[i.nodeName];se&&se(i,o)}var m=n,H=m.nodeType,oe=r.nodeType;if(!_){if(H===I)oe===I?G(n,r)||(A(n),m=We(n,Je(r.nodeName,r.namespaceURI))):m=r;else if(H===he||H===xe){if(oe===H)return m.nodeValue!==r.nodeValue&&(m.nodeValue=r.nodeValue),m;m=r}}if(m===r)A(n);else{if(r.isSameNode&&r.isSameNode(m))return;if(k(m,r,_),R)for(var Q=0,Oe=R.length;Q<Oe;Q++){var X=y[R[Q]];X&&M(X,X.parentNode,!1)}}return!_&&m!==n&&n.parentNode&&(m.actualize&&(m=m.actualize(n.ownerDocument||g)),n.parentNode.replaceChild(m,n)),m}}var tt=et(Ve),ve=tt;function te(e){document.readyState==="interactive"||document.readyState==="complete"?e():document.addEventListener("DOMContentLoaded",()=>{e()})}var w=typeof Buffer=="function",Ae=typeof TextDecoder=="function"?new TextDecoder:void 0,ye=typeof TextEncoder=="function"?new TextEncoder:void 0,nt="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",F=Array.prototype.slice.call(nt),j=(e=>{let t={};return e.forEach((n,r)=>t[n]=r),t})(F),rt=/^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/,f=String.fromCharCode.bind(String),Ce=typeof Uint8Array.from=="function"?Uint8Array.from.bind(Uint8Array):e=>new Uint8Array(Array.prototype.slice.call(e,0)),at=e=>e.replace(/=/g,"").replace(/[+\/]/g,t=>t=="+"?"-":"_"),Se=e=>e.replace(/[^A-Za-z0-9\+\/]/g,""),it=e=>{let t,n,r,a,s="",u=e.length%3;for(let p=0;p<e.length;){if((n=e.charCodeAt(p++))>255||(r=e.charCodeAt(p++))>255||(a=e.charCodeAt(p++))>255)throw new TypeError("invalid character found");t=n<<16|r<<8|a,s+=F[t>>18&63]+F[t>>12&63]+F[t>>6&63]+F[t&63]}return u?s.slice(0,u-3)+"===".substring(u):s},Be=typeof btoa=="function"?e=>btoa(e):w?e=>Buffer.from(e,"binary").toString("base64"):it,ot=w?e=>Buffer.from(e).toString("base64"):e=>{let n=[];for(let r=0,a=e.length;r<a;r+=4096)n.push(f.apply(null,e.subarray(r,r+4096)));return Be(n.join(""))};var st=e=>{if(e.length<2){var t=e.charCodeAt(0);return t<128?e:t<2048?f(192|t>>>6)+f(128|t&63):f(224|t>>>12&15)+f(128|t>>>6&63)+f(128|t&63)}else{var t=65536+(e.charCodeAt(0)-55296)*1024+(e.charCodeAt(1)-56320);return f(240|t>>>18&7)+f(128|t>>>12&63)+f(128|t>>>6&63)+f(128|t&63)}},lt=/[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g,ut=e=>e.replace(lt,st),Pe=w?e=>Buffer.from(e,"utf8").toString("base64"):ye?e=>ot(ye.encode(e)):e=>Be(ut(e)),Te=(e,t=!1)=>t?at(Pe(e)):Pe(e);var ct=/[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g,dt=e=>{switch(e.length){case 4:var t=(7&e.charCodeAt(0))<<18|(63&e.charCodeAt(1))<<12|(63&e.charCodeAt(2))<<6|63&e.charCodeAt(3),n=t-65536;return f((n>>>10)+55296)+f((n&1023)+56320);case 3:return f((15&e.charCodeAt(0))<<12|(63&e.charCodeAt(1))<<6|63&e.charCodeAt(2));default:return f((31&e.charCodeAt(0))<<6|63&e.charCodeAt(1))}},ft=e=>e.replace(ct,dt),mt=e=>{if(e=e.replace(/\s+/g,""),!rt.test(e))throw new TypeError("malformed base64.");e+="==".slice(2-(e.length&3));let t,n="",r,a;for(let s=0;s<e.length;)t=j[e.charAt(s++)]<<18|j[e.charAt(s++)]<<12|(r=j[e.charAt(s++)])<<6|(a=j[e.charAt(s++)]),n+=r===64?f(t>>16&255):a===64?f(t>>16&255,t>>8&255):f(t>>16&255,t>>8&255,t&255);return n},Ee=typeof atob=="function"?e=>atob(Se(e)):w?e=>Buffer.from(e,"base64").toString("binary"):mt,pt=w?e=>Ce(Buffer.from(e,"base64")):e=>Ce(Ee(e).split("").map(t=>t.charCodeAt(0)));var bt=w?e=>Buffer.from(e,"base64").toString("utf8"):Ae?e=>Ae.decode(pt(e)):e=>ft(Ee(e)),gt=e=>Se(e.replace(/[-_]/g,t=>t=="-"?"+":"/")),we=e=>bt(gt(e));var ht={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&#34;","'":"&#39;"},xt=/[&<>'"]/g;function vt(e){return ht[e]||e}function At(e){return e==null?"":String(e).replace(xt,vt)}function Ne(e){if(e instanceof U)return e.toString();if(Array.isArray(e))return e.map(t=>Ne(t)).join("");if(typeof e=="string"||typeof e=="number"||typeof e=="bigint"||typeof e=="boolean")return At(String(e));if(e==null)return"";throw typeof e=="object"?new Error(`Cannot interpolate object in template: ${JSON.stringify(e)}`):new Error(`Unexpected type in template: ${typeof e} for value ${JSON.stringify(e)}`)}var U=class{constructor(t,n){Y(this,"strings");Y(this,"values");this.strings=t,this.values=n}toString(){return this.values.reduce((t,n,r)=>t+Ne(n)+this.strings[r+1],this.strings[0])}};function D(e,...t){return new U(e,t)}function _e(e){return new U([e],[])}var Ie;function ne(e,t){let n=_e(Te(JSON.stringify(e)));return D(Ie||(Ie=me(['<script id="',`" type="application/base64">
    `,`
  <\/script>`])),t,n)}function re(e){var a;let t=(a=document.getElementById(e))==null?void 0:a.textContent;if(t==null)throw new Error(`No data found in element with ID "${e}"`);let n=we(t);return JSON.parse(n)}var yt={basic:{features:["course-instance-access"]},compute:{features:["workspaces","external-grading"]},everything:{features:["workspaces","external-grading"]}};function Fe(e){let t=new Set;for(let n of e)yt[n].features.forEach(r=>t.add(r));return Array.from(t)}function ae(e,t){let n=Fe(e),r=Fe(t);return n.length===r.length&&n.every(a=>r.includes(a))}function Ct(e){let t=e.initialRequiredPlans.includes("basic"),n=e.desiredRequiredPlans.includes("basic"),r=ae(e.institutionPlanGrants,["compute"]),a=ae(e.courseInstancePlanGrants,["compute"]),s=!n&&(r||a)||e.desiredRequiredPlans.includes("compute"),u=e.editable,p=e.initialRequiredPlans.includes("basic")!==e.desiredRequiredPlans.includes("basic"),b=null;if(t&&e.enrollmentCount>e.enrollmentLimit){u=!1;let A=e.enrollmentCount===1?"is":"are",N=e.enrollmentCount===1?"enrollment":"enrollments";b={message:[`There ${A} ${e.enrollmentCount} ${N} in this course, which exceeds the limit of ${e.enrollmentLimit}.`,"To disable student billing, first remove excess enrollments."].join(" "),color:"warning"}}let h=e.editable,x=e.initialRequiredPlans.includes("compute")!==e.desiredRequiredPlans.includes("compute"),B=null;return!n&&(r||a)&&(h=!1,B={message:"This course instance already has access to compute features without additional payment.",color:"success"}),{studentBillingEnabled:n,studentBillingCanChange:u,studentBillingDidChange:p,studentBillingAlert:b,computeEnabled:s,computeCanChange:h,computeDidChange:x,computeAlert:B}}function $e(e){let{enrollmentCount:t,enrollmentLimit:n,enrollmentLimitSource:r,externalGradingQuestionCount:a,workspaceQuestionCount:s,editable:u,csrfToken:p}=e,{studentBillingEnabled:b,studentBillingCanChange:h,studentBillingAlert:x,computeEnabled:B,computeCanChange:A,computeAlert:N}=Ct(e),$=Math.min(100,t/n*100),L=t>n,_=Math.max(2,$),y=L?"bg-danger":$>90?"bg-warning":"bg-primary";return D`
    <form method="POST" class="js-billing-form">
      ${ne(e,"billing-form-data")}
      <h2 class="h4">Enrollments</h2>
      <div class="mb-3">
        <div class="d-flex flex-row align-items-center">
          <span class="me-2">
            ${St(t,n,b)}
          </span>
          <div
            class="progress flex-grow-1 ${b?"d-none":""}"
            style="max-width: 100px"
          >
            <div
              class="progress-bar ${y}"
              role="progressbar"
              style="width: ${_}%"
              aria-valuenow="${t}"
              aria-valuemin="0"
              aria-valuemax="${n}"
            ></div>
          </div>
        </div>
        <div class="small text-muted">
          ${Pt({studentBillingEnabled:b,enrollmentLimit:n,enrollmentLimitSource:r})}
        </div>
      </div>

      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          name="student_billing_enabled"
          ${b?"checked":""}
          value="1"
          id="studentBillingEnabled"
          ${h?"":"disabled"}
        />
        <label class="form-check-label" for="studentBillingEnabled">
          Enable student billing for enrollments
        </label>
        <p class="small text-muted">
          When student billing is enabled, students pay for access to your course instance. Enabling
          student billing will allow your course instance to exceed any enrollment limits that would
          otherwise apply.
        </p>
        ${Ue(x)}
      </div>

      <h2 class="h4">Features</h2>
      <p>
        If your course requires certain features, you can enable them so that students can pay for
        them.
      </p>

      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          name="compute_enabled"
          ${B?"checked":""}
          value="1"
          id="computeEnabled"
          ${A?"":"disabled"}
        />
        <label class="form-check-label" for="computeEnabled">
          External grading and workspaces
        </label>
        <p class="small text-muted">
          Students will be able to use questions that utilize external grading and/or workspaces.
          This course has
          <strong>${De(a)}</strong> that use external
          grading and <strong>${De(s)}</strong> that use
          workspaces.
        </p>
        ${Ue(N)}
      </div>

      <div
        class="alert alert-warning js-student-billing-warning"
        data-student-billing-enabled="${b}"
        data-compute-enabled="${B}"
        data-enrollment-count="${t}"
        data-enrollment-limit="${n}"
        hidden
      >
        Any students currently enrolled in your course will lose access until they have paid for the
        above features. If your course is currently in session, you should carefully consider the
        impact of enabling student billing. Before proceeding, you should communicate this change to
        your students.
      </div>

      <input type="hidden" name="__csrf_token" value="${p}" />
      <button type="submit" class="btn btn-primary" ${u?null:"disabled"}>Save</button>
    </form>
  `}function Ue(e){return e?D`<div class="alert alert-${e.color}">${e.message}</div>`:null}function Pt({studentBillingEnabled:e,enrollmentLimit:t,enrollmentLimitSource:n}){return e?"Student billing for enrollments is enabled, so there is no enrollment limit.":n==="course_instance"?`This course instance has an enrollment limit of ${t}.`:`This course's institution has a per-course-instance enrollment limit of ${t}.`}function De(e){return e===1?`${e} question`:`${e} questions`}function St(e,t,n){return n?`${e} ${e===1?"enrollment":"enrollments"}`:`${e} / ${t} ${t===1?"enrollment":"enrollments"}`}te(()=>{let e=document.querySelector(".js-billing-form"),t=re("billing-form-data"),n=document.querySelector("#studentBillingEnabled"),r=document.querySelector("#computeEnabled");!e||!n||!r||e.addEventListener("change",()=>{let a=n.checked,s=r.checked,u=[];a&&u.push("basic"),s&&u.push("compute"),ve(e,$e(fe(de({},t),{desiredRequiredPlans:u})).toString())})});})();
//# sourceMappingURL=instructorInstanceAdminBillingClient-EVGFUIF4.js.map
