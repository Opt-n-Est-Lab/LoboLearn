"use strict";(()=>{var we=Object.defineProperty,Ce=Object.defineProperties;var Ae=Object.getOwnPropertyDescriptors;var W=Object.getOwnPropertySymbols;var Te=Object.prototype.hasOwnProperty,Be=Object.prototype.propertyIsEnumerable;var L=(t,e,n)=>e in t?we(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,B=(t,e)=>{for(var n in e||(e={}))Te.call(e,n)&&L(t,n,e[n]);if(W)for(var n of W(e))Be.call(e,n)&&L(t,n,e[n]);return t},E=(t,e)=>Ce(t,Ae(e));var P=(t,e,n)=>L(t,typeof e!="symbol"?e+"":e,n);function I(t){document.readyState==="interactive"||document.readyState==="complete"?t():document.addEventListener("DOMContentLoaded",()=>{t()})}var N=typeof Buffer=="function",Y=typeof TextDecoder=="function"?new TextDecoder:void 0,Ke=typeof TextEncoder=="function"?new TextEncoder:void 0,Ee="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",ve=Array.prototype.slice.call(Ee),v=(t=>{let e={};return t.forEach((n,r)=>e[n]=r),e})(ve),$e=/^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/,x=String.fromCharCode.bind(String),Z=typeof Uint8Array.from=="function"?Uint8Array.from.bind(Uint8Array):t=>new Uint8Array(Array.prototype.slice.call(t,0));var J=t=>t.replace(/[^A-Za-z0-9\+\/]/g,"");var Oe=/[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g,Fe=t=>{switch(t.length){case 4:var e=(7&t.charCodeAt(0))<<18|(63&t.charCodeAt(1))<<12|(63&t.charCodeAt(2))<<6|63&t.charCodeAt(3),n=e-65536;return x((n>>>10)+55296)+x((n&1023)+56320);case 3:return x((15&t.charCodeAt(0))<<12|(63&t.charCodeAt(1))<<6|63&t.charCodeAt(2));default:return x((31&t.charCodeAt(0))<<6|63&t.charCodeAt(1))}},De=t=>t.replace(Oe,Fe),je=t=>{if(t=t.replace(/\s+/g,""),!$e.test(t))throw new TypeError("malformed base64.");t+="==".slice(2-(t.length&3));let e,n="",r,s;for(let o=0;o<t.length;)e=v[t.charAt(o++)]<<18|v[t.charAt(o++)]<<12|(r=v[t.charAt(o++)])<<6|(s=v[t.charAt(o++)]),n+=r===64?x(e>>16&255):s===64?x(e>>16&255,e>>8&255):x(e>>16&255,e>>8&255,e&255);return n},X=typeof atob=="function"?t=>atob(J(t)):N?t=>Buffer.from(t,"base64").toString("binary"):je,Re=N?t=>Z(Buffer.from(t,"base64")):t=>Z(X(t).split("").map(e=>e.charCodeAt(0)));var Ue=N?t=>Buffer.from(t,"base64").toString("utf8"):Y?t=>Y.decode(Re(t)):t=>De(X(t)),ke=t=>J(t.replace(/[-_]/g,e=>e=="-"?"+":"/")),K=t=>Ue(ke(t));var Le={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&#34;","'":"&#39;"},Pe=/[&<>'"]/g;function Ie(t){return Le[t]||t}function ee(t){return t==null?"":String(t).replace(Pe,Ie)}function O(t){if(t instanceof C)return t.toString();if(Array.isArray(t))return t.map(e=>O(e)).join("");if(typeof t=="string"||typeof t=="number"||typeof t=="bigint"||typeof t=="boolean")return ee(String(t));if(t==null)return"";throw typeof t=="object"?new Error(`Cannot interpolate object in template: ${JSON.stringify(t)}`):new Error(`Unexpected type in template: ${typeof t} for value ${JSON.stringify(t)}`)}var C=class{constructor(e,n){P(this,"strings");P(this,"values");this.strings=e,this.values=n}toString(){return this.values.reduce((e,n,r)=>e+O(n)+this.strings[r+1],this.strings[0])}};function p(t,...e){return new C(t,e)}function te(t){return F(ee(t.toString()))}function F(t){return new C([t],[])}function D(t,e=""){return F(t.map(O).join(O(e)))}function q(t){var s;let e=(s=document.getElementById(t))==null?void 0:s.textContent;if(e==null)throw new Error(`No data found in element with ID "${t}"`);let n=K(e);return JSON.parse(n)}function ne({assessment:t,hideLink:e=!1,urlPrefix:n,plainUrlPrefix:r,course_instance_id:s,publicURL:o=!1}){return e?p`<span class="badge color-${t.color}">${t.label}</span>`:(o?n=`${r}/public/course_instance/${s}`:n===void 0&&(n=`${r}/course_instance/${s}/instructor`),p`
    <a
      href="${n}/assessment/${t.assessment_id}"
      class="btn btn-badge color-${t.color}"
    >
      ${t.label}
    </a>
  `)}var M=function(t,e){return Object.defineProperty?Object.defineProperty(t,"raw",{value:e}):t.raw=e,t},c;(function(t){t[t.EOS=0]="EOS",t[t.Text=1]="Text",t[t.Incomplete=2]="Incomplete",t[t.ESC=3]="ESC",t[t.Unknown=4]="Unknown",t[t.SGR=5]="SGR",t[t.OSCURL=6]="OSCURL"})(c||(c={}));var j=class{constructor(){this.VERSION="6.0.5",this.setup_palettes(),this._use_classes=!1,this.bold=!1,this.faint=!1,this.italic=!1,this.underline=!1,this.fg=this.bg=null,this._buffer="",this._url_allowlist={http:1,https:1},this._escape_html=!0,this.boldStyle="font-weight:bold",this.faintStyle="opacity:0.7",this.italicStyle="font-style:italic",this.underlineStyle="text-decoration:underline"}set use_classes(e){this._use_classes=e}get use_classes(){return this._use_classes}set url_allowlist(e){this._url_allowlist=e}get url_allowlist(){return this._url_allowlist}set escape_html(e){this._escape_html=e}get escape_html(){return this._escape_html}set boldStyle(e){this._boldStyle=e}get boldStyle(){return this._boldStyle}set faintStyle(e){this._faintStyle=e}get faintStyle(){return this._faintStyle}set italicStyle(e){this._italicStyle=e}get italicStyle(){return this._italicStyle}set underlineStyle(e){this._underlineStyle=e}get underlineStyle(){return this._underlineStyle}setup_palettes(){this.ansi_colors=[[{rgb:[0,0,0],class_name:"ansi-black"},{rgb:[187,0,0],class_name:"ansi-red"},{rgb:[0,187,0],class_name:"ansi-green"},{rgb:[187,187,0],class_name:"ansi-yellow"},{rgb:[0,0,187],class_name:"ansi-blue"},{rgb:[187,0,187],class_name:"ansi-magenta"},{rgb:[0,187,187],class_name:"ansi-cyan"},{rgb:[255,255,255],class_name:"ansi-white"}],[{rgb:[85,85,85],class_name:"ansi-bright-black"},{rgb:[255,85,85],class_name:"ansi-bright-red"},{rgb:[0,255,0],class_name:"ansi-bright-green"},{rgb:[255,255,85],class_name:"ansi-bright-yellow"},{rgb:[85,85,255],class_name:"ansi-bright-blue"},{rgb:[255,85,255],class_name:"ansi-bright-magenta"},{rgb:[85,255,255],class_name:"ansi-bright-cyan"},{rgb:[255,255,255],class_name:"ansi-bright-white"}]],this.palette_256=[],this.ansi_colors.forEach(r=>{r.forEach(s=>{this.palette_256.push(s)})});let e=[0,95,135,175,215,255];for(let r=0;r<6;++r)for(let s=0;s<6;++s)for(let o=0;o<6;++o){let a={rgb:[e[r],e[s],e[o]],class_name:"truecolor"};this.palette_256.push(a)}let n=8;for(let r=0;r<24;++r,n+=10){let s={rgb:[n,n,n],class_name:"truecolor"};this.palette_256.push(s)}}escape_txt_for_html(e){return this._escape_html?e.replace(/[&<>"']/gm,n=>{if(n==="&")return"&amp;";if(n==="<")return"&lt;";if(n===">")return"&gt;";if(n==='"')return"&quot;";if(n==="'")return"&#x27;"}):e}append_buffer(e){var n=this._buffer+e;this._buffer=n}get_next_packet(){var e={kind:c.EOS,text:"",url:""},n=this._buffer.length;if(n==0)return e;var r=this._buffer.indexOf("\x1B");if(r==-1)return e.kind=c.Text,e.text=this._buffer,this._buffer="",e;if(r>0)return e.kind=c.Text,e.text=this._buffer.slice(0,r),this._buffer=this._buffer.slice(r),e;if(r==0){if(n<3)return e.kind=c.Incomplete,e;var s=this._buffer.charAt(1);if(s!="["&&s!="]"&&s!="(")return e.kind=c.ESC,e.text=this._buffer.slice(0,1),this._buffer=this._buffer.slice(1),e;if(s=="["){this._csi_regex||(this._csi_regex=re(se||(se=M([`
                        ^                           # beginning of line
                                                    #
                                                    # First attempt
                        (?:                         # legal sequence
                          \x1B[                      # CSI
                          ([<-?]?)              # private-mode char
                          ([d;]*)                    # any digits or semicolons
                          ([ -/]?               # an intermediate modifier
                          [@-~])                # the command
                        )
                        |                           # alternate (second attempt)
                        (?:                         # illegal sequence
                          \x1B[                      # CSI
                          [ -~]*                # anything legal
                          ([\0-:])              # anything illegal
                        )
                    `],[`
                        ^                           # beginning of line
                                                    #
                                                    # First attempt
                        (?:                         # legal sequence
                          \\x1b\\[                      # CSI
                          ([\\x3c-\\x3f]?)              # private-mode char
                          ([\\d;]*)                    # any digits or semicolons
                          ([\\x20-\\x2f]?               # an intermediate modifier
                          [\\x40-\\x7e])                # the command
                        )
                        |                           # alternate (second attempt)
                        (?:                         # illegal sequence
                          \\x1b\\[                      # CSI
                          [\\x20-\\x7e]*                # anything legal
                          ([\\x00-\\x1f:])              # anything illegal
                        )
                    `]))));let a=this._buffer.match(this._csi_regex);if(a===null)return e.kind=c.Incomplete,e;if(a[4])return e.kind=c.ESC,e.text=this._buffer.slice(0,1),this._buffer=this._buffer.slice(1),e;a[1]!=""||a[3]!="m"?e.kind=c.Unknown:e.kind=c.SGR,e.text=a[2];var o=a[0].length;return this._buffer=this._buffer.slice(o),e}else if(s=="]"){if(n<4)return e.kind=c.Incomplete,e;if(this._buffer.charAt(2)!="8"||this._buffer.charAt(3)!=";")return e.kind=c.ESC,e.text=this._buffer.slice(0,1),this._buffer=this._buffer.slice(1),e;this._osc_st||(this._osc_st=Ne(ie||(ie=M([`
                        (?:                         # legal sequence
                          (\x1B\\)                    # ESC                           |                           # alternate
                          (\x07)                      # BEL (what xterm did)
                        )
                        |                           # alternate (second attempt)
                        (                           # illegal sequence
                          [\0-]                 # anything illegal
                          |                           # alternate
                          [\b-]                 # anything illegal
                          |                           # alternate
                          [-]                 # anything illegal
                        )
                    `],[`
                        (?:                         # legal sequence
                          (\\x1b\\\\)                    # ESC \\
                          |                           # alternate
                          (\\x07)                      # BEL (what xterm did)
                        )
                        |                           # alternate (second attempt)
                        (                           # illegal sequence
                          [\\x00-\\x06]                 # anything illegal
                          |                           # alternate
                          [\\x08-\\x1a]                 # anything illegal
                          |                           # alternate
                          [\\x1c-\\x1f]                 # anything illegal
                        )
                    `])))),this._osc_st.lastIndex=0;{let b=this._osc_st.exec(this._buffer);if(b===null)return e.kind=c.Incomplete,e;if(b[3])return e.kind=c.ESC,e.text=this._buffer.slice(0,1),this._buffer=this._buffer.slice(1),e}{let b=this._osc_st.exec(this._buffer);if(b===null)return e.kind=c.Incomplete,e;if(b[3])return e.kind=c.ESC,e.text=this._buffer.slice(0,1),this._buffer=this._buffer.slice(1),e}this._osc_regex||(this._osc_regex=re(oe||(oe=M([`
                        ^                           # beginning of line
                                                    #
                        \x1B]8;                    # OSC Hyperlink
                        [ -:<-~]*       # params (excluding ;)
                        ;                           # end of params
                        ([!-~]{0,512})        # URL capture
                        (?:                         # ST
                          (?:\x1B\\)                  # ESC                           |                           # alternate
                          (?:\x07)                    # BEL (what xterm did)
                        )
                        ([ -~]+)              # TEXT capture
                        \x1B]8;;                   # OSC Hyperlink End
                        (?:                         # ST
                          (?:\x1B\\)                  # ESC                           |                           # alternate
                          (?:\x07)                    # BEL (what xterm did)
                        )
                    `],[`
                        ^                           # beginning of line
                                                    #
                        \\x1b\\]8;                    # OSC Hyperlink
                        [\\x20-\\x3a\\x3c-\\x7e]*       # params (excluding ;)
                        ;                           # end of params
                        ([\\x21-\\x7e]{0,512})        # URL capture
                        (?:                         # ST
                          (?:\\x1b\\\\)                  # ESC \\
                          |                           # alternate
                          (?:\\x07)                    # BEL (what xterm did)
                        )
                        ([\\x20-\\x7e]+)              # TEXT capture
                        \\x1b\\]8;;                   # OSC Hyperlink End
                        (?:                         # ST
                          (?:\\x1b\\\\)                  # ESC \\
                          |                           # alternate
                          (?:\\x07)                    # BEL (what xterm did)
                        )
                    `]))));let a=this._buffer.match(this._osc_regex);if(a===null)return e.kind=c.ESC,e.text=this._buffer.slice(0,1),this._buffer=this._buffer.slice(1),e;e.kind=c.OSCURL,e.url=a[1],e.text=a[2];var o=a[0].length;return this._buffer=this._buffer.slice(o),e}else if(s=="(")return e.kind=c.Unknown,this._buffer=this._buffer.slice(3),e}}ansi_to_html(e){this.append_buffer(e);for(var n=[];;){var r=this.get_next_packet();if(r.kind==c.EOS||r.kind==c.Incomplete)break;r.kind==c.ESC||r.kind==c.Unknown||(r.kind==c.Text?n.push(this.transform_to_html(this.with_state(r))):r.kind==c.SGR?this.process_ansi(r):r.kind==c.OSCURL&&n.push(this.process_hyperlink(r)))}return n.join("")}with_state(e){return{bold:this.bold,faint:this.faint,italic:this.italic,underline:this.underline,fg:this.fg,bg:this.bg,text:e.text}}process_ansi(e){let n=e.text.split(";");for(;n.length>0;){let r=n.shift(),s=parseInt(r,10);if(isNaN(s)||s===0)this.fg=null,this.bg=null,this.bold=!1,this.faint=!1,this.italic=!1,this.underline=!1;else if(s===1)this.bold=!0;else if(s===2)this.faint=!0;else if(s===3)this.italic=!0;else if(s===4)this.underline=!0;else if(s===21)this.bold=!1;else if(s===22)this.faint=!1,this.bold=!1;else if(s===23)this.italic=!1;else if(s===24)this.underline=!1;else if(s===39)this.fg=null;else if(s===49)this.bg=null;else if(s>=30&&s<38)this.fg=this.ansi_colors[0][s-30];else if(s>=40&&s<48)this.bg=this.ansi_colors[0][s-40];else if(s>=90&&s<98)this.fg=this.ansi_colors[1][s-90];else if(s>=100&&s<108)this.bg=this.ansi_colors[1][s-100];else if((s===38||s===48)&&n.length>0){let o=s===38,a=n.shift();if(a==="5"&&n.length>0){let d=parseInt(n.shift(),10);d>=0&&d<=255&&(o?this.fg=this.palette_256[d]:this.bg=this.palette_256[d])}if(a==="2"&&n.length>2){let d=parseInt(n.shift(),10),b=parseInt(n.shift(),10),_=parseInt(n.shift(),10);if(d>=0&&d<=255&&b>=0&&b<=255&&_>=0&&_<=255){let w={rgb:[d,b,_],class_name:"truecolor"};o?this.fg=w:this.bg=w}}}}}transform_to_html(e){let n=e.text;if(n.length===0||(n=this.escape_txt_for_html(n),!e.bold&&!e.italic&&!e.faint&&!e.underline&&e.fg===null&&e.bg===null))return n;let r=[],s=[],o=e.fg,a=e.bg;e.bold&&r.push(this._boldStyle),e.faint&&r.push(this._faintStyle),e.italic&&r.push(this._italicStyle),e.underline&&r.push(this._underlineStyle),this._use_classes?(o&&(o.class_name!=="truecolor"?s.push(`${o.class_name}-fg`):r.push(`color:rgb(${o.rgb.join(",")})`)),a&&(a.class_name!=="truecolor"?s.push(`${a.class_name}-bg`):r.push(`background-color:rgb(${a.rgb.join(",")})`))):(o&&r.push(`color:rgb(${o.rgb.join(",")})`),a&&r.push(`background-color:rgb(${a.rgb})`));let d="",b="";return s.length&&(d=` class="${s.join(" ")}"`),r.length&&(b=` style="${r.join(";")}"`),`<span${b}${d}>${n}</span>`}process_hyperlink(e){let n=e.url.split(":");return n.length<1||!this._url_allowlist[n[0]]?"":`<a href="${this.escape_txt_for_html(e.url)}">${this.escape_txt_for_html(e.text)}</a>`}};function re(t,...e){let n=t.raw[0],r=/^\s+|\s+\n|\s*#[\s\S]*?\n|\n/gm,s=n.replace(r,"");return new RegExp(s)}function Ne(t,...e){let n=t.raw[0],r=/^\s+|\s+\n|\s*#[\s\S]*?\n|\n/gm,s=n.replace(r,"");return new RegExp(s,"g")}var se,ie,oe;var ae=(t=0)=>e=>`\x1B[${e+t}m`,le=(t=0)=>e=>`\x1B[${38+t};5;${e}m`,ue=(t=0)=>(e,n,r)=>`\x1B[${38+t};2;${e};${n};${r}m`,h={modifier:{reset:[0,0],bold:[1,22],dim:[2,22],italic:[3,23],underline:[4,24],overline:[53,55],inverse:[7,27],hidden:[8,28],strikethrough:[9,29]},color:{black:[30,39],red:[31,39],green:[32,39],yellow:[33,39],blue:[34,39],magenta:[35,39],cyan:[36,39],white:[37,39],blackBright:[90,39],gray:[90,39],grey:[90,39],redBright:[91,39],greenBright:[92,39],yellowBright:[93,39],blueBright:[94,39],magentaBright:[95,39],cyanBright:[96,39],whiteBright:[97,39]},bgColor:{bgBlack:[40,49],bgRed:[41,49],bgGreen:[42,49],bgYellow:[43,49],bgBlue:[44,49],bgMagenta:[45,49],bgCyan:[46,49],bgWhite:[47,49],bgBlackBright:[100,49],bgGray:[100,49],bgGrey:[100,49],bgRedBright:[101,49],bgGreenBright:[102,49],bgYellowBright:[103,49],bgBlueBright:[104,49],bgMagentaBright:[105,49],bgCyanBright:[106,49],bgWhiteBright:[107,49]}},bt=Object.keys(h.modifier),qe=Object.keys(h.color),Me=Object.keys(h.bgColor),gt=[...qe,...Me];function Qe(){let t=new Map;for(let[e,n]of Object.entries(h)){for(let[r,s]of Object.entries(n))h[r]={open:`\x1B[${s[0]}m`,close:`\x1B[${s[1]}m`},n[r]=h[r],t.set(s[0],s[1]);Object.defineProperty(h,e,{value:n,enumerable:!1})}return Object.defineProperty(h,"codes",{value:t,enumerable:!1}),h.color.close="\x1B[39m",h.bgColor.close="\x1B[49m",h.color.ansi=ae(),h.color.ansi256=le(),h.color.ansi16m=ue(),h.bgColor.ansi=ae(10),h.bgColor.ansi256=le(10),h.bgColor.ansi16m=ue(10),Object.defineProperties(h,{rgbToAnsi256:{value(e,n,r){return e===n&&n===r?e<8?16:e>248?231:Math.round((e-8)/247*24)+232:16+36*Math.round(e/255*5)+6*Math.round(n/255*5)+Math.round(r/255*5)},enumerable:!1},hexToRgb:{value(e){let n=/[a-f\d]{6}|[a-f\d]{3}/i.exec(e.toString(16));if(!n)return[0,0,0];let[r]=n;r.length===3&&(r=[...r].map(o=>o+o).join(""));let s=Number.parseInt(r,16);return[s>>16&255,s>>8&255,s&255]},enumerable:!1},hexToAnsi256:{value:e=>h.rgbToAnsi256(...h.hexToRgb(e)),enumerable:!1},ansi256ToAnsi:{value(e){if(e<8)return 30+e;if(e<16)return 90+(e-8);let n,r,s;if(e>=232)n=((e-232)*10+8)/255,r=n,s=n;else{e-=16;let d=e%36;n=Math.floor(e/36)/5,r=Math.floor(d/6)/5,s=d%6/5}let o=Math.max(n,r,s)*2;if(o===0)return 30;let a=30+(Math.round(s)<<2|Math.round(r)<<1|Math.round(n));return o===2&&(a+=60),a},enumerable:!1},rgbToAnsi:{value:(e,n,r)=>h.ansi256ToAnsi(h.rgbToAnsi256(e,n,r)),enumerable:!1},hexToAnsi:{value:e=>h.ansi256ToAnsi(h.hexToAnsi256(e)),enumerable:!1}}),h}var He=Qe(),m=He;var R=(()=>{if(!("navigator"in globalThis))return 0;if(globalThis.navigator.userAgentData){let t=navigator.userAgentData.brands.find(({brand:e})=>e==="Chromium");if(t&&t.version>93)return 3}return/\b(Chrome|Chromium)\//.test(globalThis.navigator.userAgent)?1:0})(),ce=R!==0&&{level:R,hasBasic:!0,has256:R>=2,has16m:R>=3},Ge={stdout:ce,stderr:ce},fe=Ge;function he(t,e,n){let r=t.indexOf(e);if(r===-1)return t;let s=e.length,o=0,a="";do a+=t.slice(o,r)+e+n,o=r+s,r=t.indexOf(e,o);while(r!==-1);return a+=t.slice(o),a}function pe(t,e,n,r){let s=0,o="";do{let a=t[r-1]==="\r";o+=t.slice(s,a?r-1:r)+e+(a?`\r
`:`
`)+n,s=r+1,r=t.indexOf(`
`,s)}while(r!==-1);return o+=t.slice(s),o}var{stdout:de,stderr:be}=fe,Q=Symbol("GENERATOR"),y=Symbol("STYLER"),A=Symbol("IS_EMPTY"),ge=["ansi","ansi","ansi256","ansi16m"],S=Object.create(null),Ve=(t,e={})=>{if(e.level&&!(Number.isInteger(e.level)&&e.level>=0&&e.level<=3))throw new Error("The `level` option should be an integer from 0 to 3");let n=de?de.level:0;t.level=e.level===void 0?n:e.level},U=class{constructor(e){return me(e)}},me=t=>{let e=(...n)=>n.join(" ");return Ve(e,t),Object.setPrototypeOf(e,T.prototype),e};function T(t){return me(t)}Object.setPrototypeOf(T.prototype,Function.prototype);for(let[t,e]of Object.entries(m))S[t]={get(){let n=k(this,G(e.open,e.close,this[y]),this[A]);return Object.defineProperty(this,t,{value:n}),n}};S.visible={get(){let t=k(this,this[y],!0);return Object.defineProperty(this,"visible",{value:t}),t}};var H=(t,e,n,...r)=>t==="rgb"?e==="ansi16m"?m[n].ansi16m(...r):e==="ansi256"?m[n].ansi256(m.rgbToAnsi256(...r)):m[n].ansi(m.rgbToAnsi(...r)):t==="hex"?H("rgb",e,n,...m.hexToRgb(...r)):m[n][t](...r),ze=["rgb","hex","ansi256"];for(let t of ze){S[t]={get(){let{level:n}=this;return function(...r){let s=G(H(t,ge[n],"color",...r),m.color.close,this[y]);return k(this,s,this[A])}}};let e="bg"+t[0].toUpperCase()+t.slice(1);S[e]={get(){let{level:n}=this;return function(...r){let s=G(H(t,ge[n],"bgColor",...r),m.bgColor.close,this[y]);return k(this,s,this[A])}}}}var We=Object.defineProperties(()=>{},E(B({},S),{level:{enumerable:!0,get(){return this[Q].level},set(t){this[Q].level=t}}})),G=(t,e,n)=>{let r,s;return n===void 0?(r=t,s=e):(r=n.openAll+t,s=e+n.closeAll),{open:t,close:e,openAll:r,closeAll:s,parent:n}},k=(t,e,n)=>{let r=(...s)=>Ye(r,s.length===1?""+s[0]:s.join(" "));return Object.setPrototypeOf(r,We),r[Q]=t,r[y]=e,r[A]=n,r},Ye=(t,e)=>{if(t.level<=0||!e)return t[A]?"":e;let n=t[y];if(n===void 0)return e;let{openAll:r,closeAll:s}=n;if(e.includes("\x1B"))for(;n!==void 0;)e=he(e,n.close,n.open),n=n.parent;let o=e.indexOf(`
`);return o!==-1&&(e=pe(e,s,r,o)),r+e+s};Object.defineProperties(T.prototype,S);var Ct=T(),At=T({level:be?be.level:0});var $t=new U({level:3}),_e=new j;_e.faintStyle="opacity: 0.7; display: var(--verbose-display);";function xe(t){return _e.ansi_to_html(t!=null?t:"").replaceAll(`</span>
`,`
</span>`)}function V({output:t,type:e}){let n=e==="error"?"Sync Errors":"Sync Warnings",r=e==="error"?"fa-times text-danger":"fa-exclamation-triangle text-warning",s=p`<pre
    class="text-white rounded p-3 mb-0"
    style="background-color: black;"
  >
${F(xe(t))}</pre
  >`;return p`
    <button
      class="btn btn-xs btn-ghost me-1"
      data-bs-toggle="popover"
      data-bs-container="body"
      data-bs-html="true"
      data-bs-title="${n}"
      data-bs-content="${te(s)}"
      data-bs-custom-class="popover-wide"
    >
      <i class="fa ${r}" aria-hidden="true"></i>
    </button>
  `}function Ze(t){return p`<span class="badge color-${t.color}">${t.name}</span>`}function ye(t){var e;return D((e=t==null?void 0:t.map(Ze))!=null?e:[]," ")}function Se(t){return p`<span class="badge color-${t.color}">${t.name}</span>`}I(()=>{let{course_instance_ids:t,showAddQuestionButton:e,showAiGenerateQuestionButton:n,qidPrefix:r,urlPrefix:s,plainUrlPrefix:o}=q("questions-table-data");window.topicList=function(){let l=$("#questionsTable").bootstrapTable("getData");return Object.fromEntries(l.map(({topic:i})=>[i.name,i.name]))},window.tagsList=function(){let l=$("#questionsTable").bootstrapTable("getData");return Object.fromEntries(l.flatMap(i=>{var u;return(u=i.tags)!=null?u:[]}).map(({name:i})=>[i,i]))},window.sharingSetsList=function(){let l=$("#questionsTable").bootstrapTable("getData"),i=Object.fromEntries(l.flatMap(u=>{var f;return(f=u.sharing_sets)!=null?f:[]}).map(({name:u})=>[u,u]));return i.Public="Public",i["Public source"]="Public source",i},window.versionList=function(){let l=$("#questionsTable").bootstrapTable("getData");return Object.fromEntries(l.map(({display_type:i})=>[i,i]))},window.qidFormatter=function(l,i){var g;let u="";i.sync_errors?u+=V({type:"error",output:i.sync_errors}):i.sync_warnings&&(u+=V({type:"warning",output:i.sync_warnings}));let f=r&&i.share_publicly?r:"";return u+=p`
      <a class="formatter-data" href="${s}/question/${i.id}/preview">
        ${f}${i.qid}
      </a>
    `,i.open_issue_count>0&&(u+=p`<a
        class="badge rounded-pill text-bg-danger ms-1"
        href="${s}/course_admin/issues?q=is%3Aopen+qid%3A${encodeURIComponent((g=i.qid)!=null?g:"")}"
        >${i.open_issue_count}</a
      >`),u.toString()},window.topicFormatter=function(l,i){return Se(i.topic).toString()},window.tagsFormatter=function(l,i){return ye(i.tags).toString()},window.sharingSetFormatter=function(l,i){var f;let u=[];return i.share_publicly&&u.push(p`<span class="badge color-green3">Public</span>`),i.share_source_publicly&&u.push(p`<span class="badge color-green3">Public source</span>`),u.push(...((f=i.sharing_sets)!=null?f:[]).map(g=>p`<span class="badge color-gray1">${g.name}</span>`)),D(u," ").toString()},window.versionFormatter=function(l,i){return p`<span class="badge color-${i.display_type==="v3"?"green1":"red1"}"
      >${i.display_type}</span
    >`.toString()},window.topicSorter=function(l,i){var u,f;return(f=l.name)==null?void 0:f.localeCompare((u=i.name)!=null?u:"")},window.genericFilterSearch=function(l,i){return $("<div>").html(i).find(".formatter-data").text().toUpperCase().includes(l.toUpperCase())},window.badgeFilterSearch=function(l,i){return l==="(none)"?i==="":!!$("<div>").html(i).find(".badge, .btn-badge").filter((f,g)=>$(g).text().trim().toUpperCase()===l.trim().toUpperCase()).length};let a=function(l,i){var u;return((u=i.assessments)!=null?u:[]).filter(f=>f.course_instance_id.toString()===l.toString()).map(f=>ne({plainUrlPrefix:o,course_instance_id:l,assessment:f}).toString()).join(" ")},d=function(l){let u=$("#questionsTable").bootstrapTable("getData").flatMap(f=>{var g;return(g=f.assessments)!=null?g:[]}).filter(f=>f&&f.course_instance_id===l);return E(B({},Object.fromEntries(u.map(({label:f})=>[f,f]))),{"(None)":"(None)"})};t.forEach(l=>{window[`assessments${l}List`]=function(){return d(l)},window[`assessments${l}Formatter`]=function(i,u){return a(l,u)}});let b={iconsPrefix:"fa",icons:{columns:"fa-table-list"},buttons:{clearFilters:{text:"Clear filters",icon:"fa-times",attributes:{title:"Clear all set question filters"},event:()=>{$("#questionsTable").bootstrapTable("clearFilterControl")}}},onResetView(){document.querySelectorAll("#questionsTable .form-control, #questionsTable .form-select").forEach(i=>{var u,f,g;i.setAttribute("aria-label",`Filter by ${(g=(f=(u=i.closest("th"))==null?void 0:u.querySelector("div.th-inner"))==null?void 0:f.textContent)==null?void 0:g.trim()}`)})}};e&&(b.buttons.addQuestion={text:"Add Question",icon:"fa-plus",attributes:{title:"Create a new question"},event:()=>{$("#createQuestionModal").modal("show")}}),n&&(b.buttons.aiGenerateQuestion={html:p`
        <a class="btn btn-secondary" href="${s}/ai_generate_question_drafts">
          <i class="fa fa-wand-magic-sparkles" aria-hidden="true"></i>
          Generate Question with AI
        </a>
      `.toString()}),$("#questionsTable").bootstrapTable(b);let _=document.querySelector("#start_from"),w=document.querySelector("#template_qid"),z=document.querySelector("#templateContainer");!_||!w||!z||(_.addEventListener("change",()=>{w.disabled=_.value!=="Template",z.hidden=_.value!=="Template"}),$(document).keydown(l=>{(l.ctrlKey||l.metaKey)&&String.fromCharCode(l.which).toLowerCase()==="f"&&($(".sticky-header-container:visible input.bootstrap-table-filter-control-qid").length?$(".sticky-header-container:visible input.bootstrap-table-filter-control-qid").focus():$("input.bootstrap-table-filter-control-qid").focus(),l.preventDefault())}))});})();
//# sourceMappingURL=instructorQuestionsClient-U357YY7Z.js.map
