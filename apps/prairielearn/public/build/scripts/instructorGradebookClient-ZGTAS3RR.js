"use strict";(()=>{var U=Object.defineProperty;var L=(t,e,n)=>e in t?U(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var b=(t,e,n)=>L(t,typeof e!="symbol"?e+"":e,n);function g(t){document.readyState==="interactive"||document.readyState==="complete"?t():document.addEventListener("DOMContentLoaded",()=>{t()})}function _(t,e){typeof e!="string"&&(e=e.toString());let n=t.createElement("template");return n.innerHTML=e,t.importNode(n.content,!0)}function h(t,e){let n=_(t,e);if(n.childElementCount!==1)throw new Error("Expected HTML to contain exactly one element");return n.firstElementChild}var x=typeof Buffer=="function",w=typeof TextDecoder=="function"?new TextDecoder:void 0,Q=typeof TextEncoder=="function"?new TextEncoder:void 0,v="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",R=Array.prototype.slice.call(v),p=(t=>{let e={};return t.forEach((n,a)=>e[n]=a),e})(R),F=/^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/,c=String.fromCharCode.bind(String),C=typeof Uint8Array.from=="function"?Uint8Array.from.bind(Uint8Array):t=>new Uint8Array(Array.prototype.slice.call(t,0));var E=t=>t.replace(/[^A-Za-z0-9\+\/]/g,"");var k=/[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g,H=t=>{switch(t.length){case 4:var e=(7&t.charCodeAt(0))<<18|(63&t.charCodeAt(1))<<12|(63&t.charCodeAt(2))<<6|63&t.charCodeAt(3),n=e-65536;return c((n>>>10)+55296)+c((n&1023)+56320);case 3:return c((15&t.charCodeAt(0))<<12|(63&t.charCodeAt(1))<<6|63&t.charCodeAt(2));default:return c((31&t.charCodeAt(0))<<6|63&t.charCodeAt(1))}},I=t=>t.replace(k,H),O=t=>{if(t=t.replace(/\s+/g,""),!F.test(t))throw new TypeError("malformed base64.");t+="==".slice(2-(t.length&3));let e,n="",a,s;for(let o=0;o<t.length;)e=p[t.charAt(o++)]<<18|p[t.charAt(o++)]<<12|(a=p[t.charAt(o++)])<<6|(s=p[t.charAt(o++)]),n+=a===64?c(e>>16&255):s===64?c(e>>16&255,e>>8&255):c(e>>16&255,e>>8&255,e&255);return n},S=typeof atob=="function"?t=>atob(E(t)):x?t=>Buffer.from(t,"base64").toString("binary"):O,M=x?t=>C(Buffer.from(t,"base64")):t=>C(S(t).split("").map(e=>e.charCodeAt(0)));var P=x?t=>Buffer.from(t,"base64").toString("utf8"):w?t=>w.decode(M(t)):t=>I(S(t)),j=t=>E(t.replace(/[-_]/g,e=>e=="-"?"+":"/")),B=t=>P(j(t));var N={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&#34;","'":"&#39;"},q=/[&<>'"]/g;function z(t){return N[t]||t}function V(t){return t==null?"":String(t).replace(q,z)}function D(t){if(t instanceof m)return t.toString();if(Array.isArray(t))return t.map(e=>D(e)).join("");if(typeof t=="string"||typeof t=="number"||typeof t=="bigint"||typeof t=="boolean")return V(String(t));if(t==null)return"";throw typeof t=="object"?new Error(`Cannot interpolate object in template: ${JSON.stringify(t)}`):new Error(`Unexpected type in template: ${typeof t} for value ${JSON.stringify(t)}`)}var m=class{constructor(e,n){b(this,"strings");b(this,"values");this.strings=e,this.values=n}toString(){return this.values.reduce((e,n,a)=>e+D(n)+this.strings[a+1],this.strings[0])}};function i(t,...e){return new m(t,e)}function y(t){var s;let e=(s=document.getElementById(t))==null?void 0:s.textContent;if(e==null)throw new Error(`No data found in element with ID "${t}"`);let n=B(e);return JSON.parse(n)}function T({assessment:t,hideLink:e=!1,urlPrefix:n,plainUrlPrefix:a,course_instance_id:s,publicURL:o=!1}){return e?i`<span class="badge color-${t.color}">${t.label}</span>`:(o?n=`${a}/public/course_instance/${s}`:n===void 0&&(n=`${a}/course_instance/${s}/instructor`),i`
    <a
      href="${n}/assessment/${t.assessment_id}"
      class="btn btn-badge color-${t.color}"
    >
      ${t.label}
    </a>
  `)}g(()=>{let{urlPrefix:t,csvFilename:e,csrfToken:n,hasCourseInstancePermissionEdit:a,courseAssessments:s}=y("gradebook-data");$("#gradebook-table").bootstrapTable({iconsPrefix:"fa",icons:{refresh:"fa-sync",columns:"fa-table-list"},url:`${t}/instance_admin/gradebook/raw_data.json`,uniqueId:"user_id",classes:"table table-sm table-hover table-bordered",theadClasses:"table-light",showButtonText:!0,minimumCountColumns:0,search:!0,showColumns:!0,showColumnsToggleAll:!0,showRefresh:!0,pagination:!0,paginationVAlign:"both",paginationHAlign:"left",paginationDetailHAlign:"right",pageList:[10,20,50,100,200,500,"unlimited"],pageSize:50,smartDisplay:!1,showExtendedPagination:!0,toolbar:".fixed-table-pagination:nth(0)",stickyHeader:!0,buttons:{download:{text:"Download",icon:"fa-download",attributes:{title:"Download gradebook data in CSV format"},event:()=>{window.location.href=`${t}/instance_admin/gradebook/${e}`}},studentsOnly:{text:"Students Only",icon:"fa-user-graduate",attributes:{title:"List only enrolled students"},event:()=>{let o=$("#gradebook-table"),r=!o.data("filter-student-only");o.data("filter-student-only",r),$(".columns button[name=studentsOnly]").toggleClass("active",r),o.bootstrapTable("filterBy",r?{role:"Student"}:{})}}},onPreBody(){document.querySelectorAll(".spinning-wheel").forEach(o=>o.style.display=""),$("button.edit-score").popover("hide")},onResetView(){J(n),document.querySelectorAll(".spinning-wheel").forEach(o=>o.style.display="none")},columns:[{field:"uid",title:"UID",sortable:!0,class:"text-nowrap sticky-column",switchable:!1,escape:!0},{field:"uin",title:"UIN",sortable:!0,class:"text-nowrap gradebook-uin",formatter:o=>i`${o!=null?o:""}`.toString()},{field:"user_name",title:"Name",sortable:!0,class:"text-nowrap",formatter:o=>i`${o!=null?o:""}`.toString()},{field:"role",title:i`Role
          <button
            class="btn btn-xs btn-ghost"
            type="button"
            aria-label="Roles help"
            data-bs-toggle="modal"
            data-bs-target="#role-help"
          >
            <i class="bi-question-circle-fill" aria-hidden="true"></i>
          </button>`.toString(),sortable:!0,sortOrder:"desc"},...s.map(o=>({field:`scores.${o.assessment_id}.score_perc`,title:T({urlPrefix:t,assessment:o}).toString(),class:"text-nowrap",searchable:!1,sortable:!0,sortOrder:"desc",formatter:(r,f)=>{var d;if(r==null)return"&mdash;";let{assessment_instance_id:l,uid_other_users_group:u}=(d=f.scores[o.assessment_id])!=null?d:{},A=a?i`
                <button
                  type="button"
                  class="btn btn-xs btn-secondary edit-score ms-1"
                  aria-label="Edit score"
                  data-assessment-instance-id="${l}"
                  data-score="${r}"
                  data-other-users="${JSON.stringify(u!=null?u:[])}"
                >
                  <i class="bi-pencil-square" aria-hidden="true"></i>
                </button>
              `:"";return i`
            <a href="${t}/assessment_instance/${l}">
              ${Math.floor(r)}%
            </a>
            ${A}
          `.toString()}}))]}),document.addEventListener("keydown",o=>{if((o.ctrlKey||o.metaKey)&&o.key.toLowerCase()==="f"){let r=document.querySelector(".fixed-table-toolbar .search input");r!=null&&r!==document.activeElement&&(r.focus(),o.preventDefault())}}),$('[data-bs-toggle="modal"]').click(function(o){o.stopPropagation(),$($(o.currentTarget).data("bs-target")).modal("show")})});function J(t){$("button.edit-score").popover({sanitize:!1,placement:"auto",container:"body",html:!0,content(){var f;let e=this,{assessmentInstanceId:n,score:a,otherUsers:s}=e.dataset,o=JSON.parse(s||"[]"),r=h(document,i`
            <form name="edit-total-score-perc-form" method="POST">
              <input type="hidden" name="__action" value="edit_total_score_perc" />
              <input type="hidden" name="__csrf_token" value="${t}" />
              <input type="hidden" name="assessment_instance_id" value="${n}" />
              <div class="mb-3">
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    name="score_perc"
                    value="${a}"
                    aria-label="Score percentage"
                  />
                  <span class="input-group-text">%</span>
                </div>
              </div>
              ${o!=null&&o.length?i`
                    <div class="alert alert-info">
                      <small>
                        This is a group assessment. Updating this grade will also update grades for:
                      </small>
                      <ul>
                        ${o.map(l=>i`<li><small>${l}</small></li>`)}
                      </ul>
                    </div>
                  `:""}
              <p>
                <small>
                  This change will be overwritten if further questions are answered by the student.
                </small>
              </p>
              <button type="button" class="btn btn-secondary me-2 js-popover-cancel-button">
                Cancel
              </button>
              <button type="submit" class="btn btn-primary">Change</button>
            </form>
          `);return(f=r.querySelector(".js-popover-cancel-button"))==null||f.addEventListener("click",()=>{$(e).popover("hide")}),r.addEventListener("submit",function(l){l.preventDefault(),fetch(r.action,{method:"POST",body:new URLSearchParams(new FormData(r,l.submitter))}).then(async u=>{(await u.json()).forEach(d=>{$("#gradebook-table").bootstrapTable("updateCellByUniqueId",{id:d.user_id,field:`scores.${d.assessment_id}.score_perc`,value:d.score_perc})}),$(e).popover("hide")})}),r},title:"Change total percentage score",trigger:"click"}).on("show.bs.popover",function(){$("button.edit-score").not(this).popover("hide")})}})();
//# sourceMappingURL=instructorGradebookClient-ZGTAS3RR.js.map
