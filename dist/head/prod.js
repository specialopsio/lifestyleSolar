!function(){if(-1!==window.location.href.indexOf("lifestylesolar.com")){t=function(){return function n(a,o,s){function i(r,e){if(!o[r]){if(!a[r]){var t="function"==typeof require&&require;if(!e&&t)return t(r,!0);if(c)return c(r,!0);e=new Error("Cannot find module '"+r+"'");throw e.code="MODULE_NOT_FOUND",e}t=o[r]={exports:{}};a[r][0].call(t.exports,function(e){var t=a[r][1][e];return i(t||e)},t,t.exports,n,a,o,s)}return o[r].exports}for(var c="function"==typeof require&&require,e=0;e<s.length;e++)i(s[e]);return i}({1:[function(e,t,r){"use strict";var n=e("./init");t.exports={init:function(e){this.get=n(e),e&&e.callback&&"function"==typeof e.callback&&e.callback(this.get)}}},{"./init":6}],2:[function(e,t,r){"use strict";var n=e("./terms"),a=e("./helpers/utils"),o={containers:{current:"sbjs_current",current_extra:"sbjs_current_add",first:"sbjs_first",first_extra:"sbjs_first_add",session:"sbjs_session",udata:"sbjs_udata",promocode:"sbjs_promo"},service:{migrations:"sbjs_migrations"},delimiter:"|||",aliases:{main:{type:"typ",source:"src",medium:"mdm",campaign:"cmp",content:"cnt",term:"trm"},extra:{fire_date:"fd",entrance_point:"ep",referer:"rf"},session:{pages_seen:"pgs",current_page:"cpg"},udata:{visits:"vst",ip:"uip",agent:"uag"},promo:"code"},pack:{main:function(e){return o.aliases.main.type+"="+e.type+o.delimiter+o.aliases.main.source+"="+e.source+o.delimiter+o.aliases.main.medium+"="+e.medium+o.delimiter+o.aliases.main.campaign+"="+e.campaign+o.delimiter+o.aliases.main.content+"="+e.content+o.delimiter+o.aliases.main.term+"="+e.term},extra:function(e){return o.aliases.extra.fire_date+"="+a.setDate(new Date,e)+o.delimiter+o.aliases.extra.entrance_point+"="+document.location.href+o.delimiter+o.aliases.extra.referer+"="+(document.referrer||n.none)},user:function(e,t){return o.aliases.udata.visits+"="+e+o.delimiter+o.aliases.udata.ip+"="+t+o.delimiter+o.aliases.udata.agent+"="+navigator.userAgent},session:function(e){return o.aliases.session.pages_seen+"="+e+o.delimiter+o.aliases.session.current_page+"="+document.location.href},promo:function(e){return o.aliases.promo+"="+a.setLeadingZeroToInt(a.randomInt(e.min,e.max),e.max.toString().length)}}};t.exports=o},{"./helpers/utils":5,"./terms":9}],3:[function(e,t,r){"use strict";var l=e("../data").delimiter;t.exports={encodeData:function(e){return encodeURIComponent(e).replace(/\!/g,"%21").replace(/\~/g,"%7E").replace(/\*/g,"%2A").replace(/\'/g,"%27").replace(/\(/g,"%28").replace(/\)/g,"%29")},decodeData:function(t){try{return decodeURIComponent(t).replace(/\%21/g,"!").replace(/\%7E/g,"~").replace(/\%2A/g,"*").replace(/\%27/g,"'").replace(/\%28/g,"(").replace(/\%29/g,")")}catch(e){try{return unescape(t)}catch(e){return""}}},set:function(e,t,r,n,a){var r=r?((o=new Date).setTime(o.getTime()+60*r*1e3),"; expires="+o.toGMTString()):"",o=n&&!a?";domain=."+n:"";document.cookie=this.encodeData(e)+"="+this.encodeData(t)+r+o+"; path=/"},get:function(e){for(var t=this.encodeData(e)+"=",r=document.cookie.split(";"),n=0;n<r.length;n++){for(var a=r[n];" "===a.charAt(0);)a=a.substring(1,a.length);if(0===a.indexOf(t))return this.decodeData(a.substring(t.length,a.length))}return null},destroy:function(e,t,r){this.set(e,"",-1,t,r)},parse:function(e){var t=[],r={};if("string"==typeof e)t.push(e);else for(var n in e)e.hasOwnProperty(n)&&t.push(e[n]);for(var a=0;a<t.length;a++){r[this.unsbjs(t[a])]={};for(var o=this.get(t[a])?this.get(t[a]).split(l):[],s=0;s<o.length;s++){var i=o[s].split("="),c=i.splice(0,1);c.push(i.join("=")),r[this.unsbjs(t[a])][c[0]]=this.decodeData(c[1])}}return r},unsbjs:function(e){return e.replace("sbjs_","")}}},{"../data":2}],4:[function(e,t,r){"use strict";t.exports={parse:function(e){for(var n=this.parseOptions,t=n.parser[n.strictMode?"strict":"loose"].exec(e),a={},r=14;r--;)a[n.key[r]]=t[r]||"";return a[n.q.name]={},a[n.key[12]].replace(n.q.parser,function(e,t,r){t&&(a[n.q.name][t]=r)}),a},parseOptions:{strictMode:!1,key:["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],q:{name:"queryKey",parser:/(?:^|&)([^&=]*)=?([^&]*)/g},parser:{strict:/^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,loose:/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/}},getParam:function(e){for(var t={},r=(e||window.location.search.substring(1)).split("&"),n=0;n<r.length;n++){var a,o=r[n].split("=");void 0===t[o[0]]?t[o[0]]=o[1]:"string"==typeof t[o[0]]?(a=[t[o[0]],o[1]],t[o[0]]=a):t[o[0]].push(o[1])}return t},getHost:function(e){return this.parse(e).host.replace("www.","")}}},{}],5:[function(e,t,r){"use strict";t.exports={escapeRegexp:function(e){return e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")},setDate:function(e,t){var r=e.getTimezoneOffset()/60,n=e.getHours();return e.setHours(n+r+(t||0===t?t:-r)),e.getFullYear()+"-"+this.setLeadingZeroToInt(e.getMonth()+1,2)+"-"+this.setLeadingZeroToInt(e.getDate(),2)+" "+this.setLeadingZeroToInt(e.getHours(),2)+":"+this.setLeadingZeroToInt(e.getMinutes(),2)+":"+this.setLeadingZeroToInt(e.getSeconds(),2)},setLeadingZeroToInt:function(e,t){for(var r=e+"";r.length<t;)r="0"+r;return r},randomInt:function(e,t){return Math.floor(Math.random()*(t-e+1))+e}}},{}],6:[function(e,t,r){"use strict";var v=e("./data"),b=e("./terms"),x=e("./helpers/cookies"),_=e("./helpers/uri"),E=e("./helpers/utils"),I=e("./params"),w=e("./migrations");t.exports=function(e){var t,o,r,n,a,s,i,c,l=I.fetch(e),d=_.getParam(),u=l.domain.host,m=l.domain.isolate,p=l.lifetime;function g(e){switch(e){case b.traffic.utm:t=b.traffic.utm,o=void 0!==d.utm_source?d.utm_source:void 0!==d.gclid?"google":void 0!==d.yclid?"yandex":b.none,r=void 0!==d.utm_medium?d.utm_medium:void 0!==d.gclid||void 0!==d.yclid?"cpc":b.none,n=void 0!==d.utm_campaign?d.utm_campaign:void 0!==d[l.campaign_param]?d[l.campaign_param]:void 0!==d.gclid?"google_cpc":void 0!==d.yclid?"yandex_cpc":b.none,a=void 0!==d.utm_content?d.utm_content:void 0!==d[l.content_param]?d[l.content_param]:b.none,s=void 0!==d.utm_term?d.utm_term:void 0!==d[l.term_param]?d[l.term_param]:function(){var e=document.referrer;{if(d.utm_term)return d.utm_term;if(!(e&&_.parse(e).host&&_.parse(e).host.match(/^(?:.*\.)?yandex\..{2,9}$/i)))return!1;try{return _.getParam(_.parse(document.referrer).query).text}catch(e){return!1}}}()||b.none;break;case b.traffic.organic:t=b.traffic.organic,o=o||_.getHost(document.referrer),r=b.referer.organic,n=b.none,a=b.none,s=b.none;break;case b.traffic.referral:t=b.traffic.referral,o=o||_.getHost(document.referrer),r=r||b.referer.referral,n=b.none,a=_.parse(document.referrer).path,s=b.none;break;case b.traffic.typein:t=b.traffic.typein,o=l.typein_attributes.source,r=l.typein_attributes.medium,n=b.none,a=b.none,s=b.none;break;default:t=b.oops,o=b.oops,r=b.oops,n=b.oops,a=b.oops,s=b.oops}e={type:t,source:o,medium:r,campaign:n,content:a,term:s};return v.pack.main(e)}function f(e){var t=document.referrer;switch(e){case b.traffic.organic:return t&&h(t)&&function(e){var t=new RegExp("^(?:.*\\.)?"+E.escapeRegexp("yandex")+"\\..{2,9}$"),r=new RegExp(".*"+E.escapeRegexp("text")+"=.*"),n=new RegExp("^(?:www\\.)?"+E.escapeRegexp("google")+"\\..{2,9}$");{if(_.parse(e).query&&_.parse(e).host.match(t)&&_.parse(e).query.match(r))return o="yandex";if(_.parse(e).host.match(n))return o="google";if(_.parse(e).query)for(var a=0;a<l.organics.length;a++){if(_.parse(e).host.match(new RegExp("^(?:.*\\.)?"+E.escapeRegexp(l.organics[a].host)+"$","i"))&&_.parse(e).query.match(new RegExp(".*"+E.escapeRegexp(l.organics[a].param)+"=.*","i")))return o=l.organics[a].display||l.organics[a].host,1;if(a+1===l.organics.length)return}}}(t);case b.traffic.referral:return t&&h(t)&&function(e){{if(!(0<l.referrals.length))return o=_.getHost(e),1;for(var t=0;t<l.referrals.length;t++){if(_.parse(e).host.match(new RegExp("^(?:.*\\.)?"+E.escapeRegexp(l.referrals[t].host)+"$","i")))return o=l.referrals[t].display||l.referrals[t].host,r=l.referrals[t].medium||b.referer.referral,1;if(t+1===l.referrals.length)return o=_.getHost(e),1}}}(t);default:return}}function h(e){var t;return l.domain?m?_.getHost(e)!==_.getHost(u):(t=new RegExp("^(?:.*\\.)?"+E.escapeRegexp(u)+"$","i"),!_.getHost(e).match(t)):_.getHost(e)!==_.getHost(document.location.href)}function y(){x.set(v.containers.current_extra,v.pack.extra(l.timezone_offset),p,u,m),x.get(v.containers.first_extra)||x.set(v.containers.first_extra,v.pack.extra(l.timezone_offset),p,u,m)}return w.go(p,u,m),x.set(v.containers.current,function(){var e;if(void 0!==d.utm_source||void 0!==d.utm_medium||void 0!==d.utm_campaign||void 0!==d.utm_content||void 0!==d.utm_term||void 0!==d.gclid||void 0!==d.yclid||void 0!==d[l.campaign_param]||void 0!==d[l.term_param]||void 0!==d[l.content_param])y(),e=g(b.traffic.utm);else if(f(b.traffic.organic))y(),e=g(b.traffic.organic);else if(!x.get(v.containers.session)&&f(b.traffic.referral))y(),e=g(b.traffic.referral);else{if(x.get(v.containers.first)||x.get(v.containers.current))return x.get(v.containers.current);y(),e=g(b.traffic.typein)}return e}(),p,u,m),x.get(v.containers.first)||x.set(v.containers.first,x.get(v.containers.current),p,u,m),i=x.get(v.containers.udata)?(i=parseInt(x.parse(v.containers.udata)[x.unsbjs(v.containers.udata)][v.aliases.udata.visits])||1,i=x.get(v.containers.session)?i:i+1,v.pack.user(i,l.user_ip)):v.pack.user(i=1,l.user_ip),x.set(v.containers.udata,i,p,u,m),x.get(v.containers.session)?(c=parseInt(x.parse(v.containers.session)[x.unsbjs(v.containers.session)][v.aliases.session.pages_seen])||1,c+=1):c=1,x.set(v.containers.session,v.pack.session(c),l.session_length,u,m),l.promocode&&!x.get(v.containers.promocode)&&x.set(v.containers.promocode,v.pack.promo(l.promocode),p,u,m),x.parse(v.containers)}},{"./data":2,"./helpers/cookies":3,"./helpers/uri":4,"./helpers/utils":5,"./migrations":7,"./params":8,"./terms":9}],7:[function(e,t,r){"use strict";var c=e("./data"),l=e("./helpers/cookies");t.exports={go:function(e,t,r){var n=this.migrations,a={l:e,d:t,i:r};if(l.get(c.containers.first)||l.get(c.service.migrations)){if(!l.get(c.service.migrations))for(s=0;s<n.length;s++)n[s].go(n[s].id,a)}else{for(var o=[],s=0;s<n.length;s++)o.push(n[s].id);var i="";for(s=0;s<o.length;s++)i+=o[s]+"=1",s<o.length-1&&(i+=c.delimiter);l.set(c.service.migrations,i,a.l,a.d,a.i)}},migrations:[{id:"1418474375998",version:"1.0.0-beta",go:function(t,r){function e(e,t,r){return t||r?e:c.delimiter}var n=t+"=1",t=t+"=0";try{var a,o=[];for(a in c.containers)c.containers.hasOwnProperty(a)&&o.push(c.containers[a]);for(var s,i=0;i<o.length;i++)l.get(o[i])&&(s=l.get(o[i]).replace(/(\|)?\|(\|)?/g,e),l.destroy(o[i],r.d,r.i),l.destroy(o[i],r.d,!r.i),l.set(o[i],s,r.l,r.d,r.i));l.get(c.containers.session)&&l.set(c.containers.session,c.pack.session(0),r.l,r.d,r.i),l.set(c.service.migrations,n,r.l,r.d,r.i)}catch(e){l.set(c.service.migrations,t,r.l,r.d,r.i)}}}]}},{"./data":2,"./helpers/cookies":3}],8:[function(e,t,r){"use strict";var o=e("./terms"),s=e("./helpers/uri");t.exports={fetch:function(e){var t=e||{},r={};if(r.lifetime=this.validate.checkFloat(t.lifetime)||6,r.lifetime=parseInt(30*r.lifetime*24*60),r.session_length=this.validate.checkInt(t.session_length)||30,r.timezone_offset=this.validate.checkInt(t.timezone_offset),r.campaign_param=t.campaign_param||!1,r.term_param=t.term_param||!1,r.content_param=t.content_param||!1,r.user_ip=t.user_ip||o.none,t.promocode?(r.promocode={},r.promocode.min=parseInt(t.promocode.min)||1e5,r.promocode.max=parseInt(t.promocode.max)||999999):r.promocode=!1,t.typein_attributes&&t.typein_attributes.source&&t.typein_attributes.medium?(r.typein_attributes={},r.typein_attributes.source=t.typein_attributes.source,r.typein_attributes.medium=t.typein_attributes.medium):r.typein_attributes={source:"(direct)",medium:"(none)"},t.domain&&this.validate.isString(t.domain)?r.domain={host:t.domain,isolate:!1}:t.domain&&t.domain.host?r.domain=t.domain:r.domain={host:s.getHost(document.location.hostname),isolate:!1},r.referrals=[],t.referrals&&0<t.referrals.length)for(var n=0;n<t.referrals.length;n++)t.referrals[n].host&&r.referrals.push(t.referrals[n]);if(r.organics=[],t.organics&&0<t.organics.length)for(var a=0;a<t.organics.length;a++)t.organics[a].host&&t.organics[a].param&&r.organics.push(t.organics[a]);return r.organics.push({host:"bing.com",param:"q",display:"bing"}),r.organics.push({host:"yahoo.com",param:"p",display:"yahoo"}),r.organics.push({host:"about.com",param:"q",display:"about"}),r.organics.push({host:"aol.com",param:"q",display:"aol"}),r.organics.push({host:"ask.com",param:"q",display:"ask"}),r.organics.push({host:"globososo.com",param:"q",display:"globo"}),r.organics.push({host:"go.mail.ru",param:"q",display:"go.mail.ru"}),r.organics.push({host:"rambler.ru",param:"query",display:"rambler"}),r.organics.push({host:"tut.by",param:"query",display:"tut.by"}),r.referrals.push({host:"t.co",display:"twitter.com"}),r.referrals.push({host:"plus.url.google.com",display:"plus.google.com"}),r},validate:{checkFloat:function(e){return!(!e||!this.isNumeric(parseFloat(e)))&&parseFloat(e)},checkInt:function(e){return!(!e||!this.isNumeric(parseInt(e)))&&parseInt(e)},isNumeric:function(e){return!isNaN(e)},isString:function(e){return"[object String]"===Object.prototype.toString.call(e)}}}},{"./helpers/uri":4,"./terms":9}],9:[function(e,t,r){"use strict";t.exports={traffic:{utm:"utm",organic:"organic",referral:"referral",typein:"typein"},referer:{referral:"referral",organic:"organic",social:"social"},none:"(none)",oops:"(Houston, we have a problem)"}},{}]},{},[1])(1)},"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):("undefined"!=typeof window?i=window:"undefined"!=typeof global?i=global:"undefined"!=typeof self&&(i=self),i.sbjs=t());let r,n,a,o;function s(e){var t=document.querySelector(`#${e}-calc button`);t&&t.classList.contains("disabled")&&("hero"===e&&r||"nav"===e&&n||"cta"===e&&a||"exit"===e&&o)&&t.classList.remove("disabled")}function e(){var e,t=document.getElementById("dateYear");t&&(e=(new Date).getFullYear(),t.innerText=e)}google.maps.event.addDomListener(window,"load",function(){document.querySelectorAll(".address-input").forEach(function(e){var t=new google.maps.places.Autocomplete(e);t.addListener("place_changed",function(){console.debug("place changed",e.closest("div").parentElement),"hero-calc"===e.closest("div").parentElement.id?(r=t.getPlace(),s("hero")):"nav-calc"===e.closest("div").parentElement.id?(n=t.getPlace(),s("nav")):"cta-calc"===e.closest("div").parentElement.id?(a=t.getPlace(),s("cta")):"exit-calc"===e.closest("div").parentElement.id?(o=t.getPlace(),s("exit")):"hero-calc"===e.closest("div").parentElement.parentElement.id?(r=t.getPlace(),s("hero")):"nav-calc"===e.closest("div").parentElement.parentElement.id?(n=t.getPlace(),s("nav")):"cta-calc"===e.closest("div").parentElement.parentElement.id?(a=t.getPlace(),s("cta")):"exit-calc"===e.closest("div").parentElement.parentElement.id&&(o=t.getPlace(),s("exit"))})})}),document.querySelectorAll(".slider-container").forEach(function(e){var t=e.querySelector('input[type="range"]');const r=e.querySelector("span");t.addEventListener("input",function(){r.innerText="$"+this.value})}),document.addEventListener("DOMContentLoaded",function(){var e=new URLSearchParams(window.location.search),t=e.get("password"),r=e.get("user");const n=e.get("form");e=e.get("heading");let a;function o(){if(a){let r=!0;return document.querySelectorAll("#preInstall select").forEach(e=>{var t=document.querySelector(`label[for='${e.id}']`);"Select your answer"===e.value?(r=!1,t.classList.add("text-red-600"),document.getElementById("error").classList.remove("opacity-0")):t.classList.remove("text-red-600")}),r&&document.getElementById("error").classList.add("opacity-0"),r}}function s(){var e=document.querySelector(".rating-scale .selected"),t=document.querySelector("label[for='rating']");return e?(t.classList.remove("text-red-600"),document.getElementById("error").classList.add("opacity-0"),document.getElementById("ratingLabel").classList.remove("text-red-500"),!0):(t.classList.add("text-red-600"),document.getElementById("ratingLabel").classList.add("text-red-500"),document.getElementById("error").classList.remove("opacity-0"),!1)}function i(){var e,t={customerId:document.getElementById("customerId").value,formId:document.getElementById("formId").value};return!1===document.getElementById("preInstall").classList.contains("hidden")?(t.motivation=document.getElementById("motivation").value,t.blocker=document.getElementById("blocker").value,t.knowledge=document.getElementById("knowledge").value,t.concern=document.getElementById("concern").value,t.comments=document.getElementById("comments").value):(e=document.querySelector(".rating-scale .selected"),t.rating=e?e.innerText:null,t.feedback=document.getElementById("feedback").value),t}t&&r&&n&&"MnVGNFo3NA=="===btoa(t)&&["1","10","22","50","0","99"].includes(n)?(document.getElementById("mainApp").classList.remove("hidden"),document.getElementById("customerId").value=r,"1"===(document.getElementById("formId").value=n)?(document.getElementById("preInstall").classList.remove("hidden"),document.querySelectorAll("#preInstall select").forEach(e=>{e.addEventListener("change",o)})):(document.getElementById("nps").classList.remove("hidden"),document.querySelectorAll(".rating-scale button").forEach(t=>{t.addEventListener("click",()=>{document.querySelectorAll(".rating-scale button").forEach(e=>{e.classList.remove("selected","bg-red-500","border-red-500","focus:ring-red-500","bg-yellow-400","border-yellow-400","focus:ring-yellow-400","bg-[#00BA81]","border-[#00BA81]","focus:ring-[#00BA81]","text-white")}),t.classList.add("selected");var e=parseInt(t.textContent);1<=e&&e<=3?t.classList.add("bg-red-500","border-red-500","focus:ring-red-500","text-white"):4<=e&&e<=7?t.classList.add("bg-yellow-400","border-yellow-400","focus:ring-yellow-400"):8<=e&&e<=10&&t.classList.add("bg-[#00BA81]","border-[#00BA81]","focus:ring-[#00BA81]","text-white"),s()})})),"1"===n?document.getElementById("heading").innerText="Pre-Install Survey":"0"===n?document.getElementById("heading").innerText="We miss hearing from you!":"10"===n?document.getElementById("heading").innerText="How was your consultation?":"22"===n?document.getElementById("heading").innerText="Ready for your install?":"50"===n?document.getElementById("heading").innerText="Enjoying solar so far?":document.getElementById("heading").innerText=e,document.getElementById("propertyForm").addEventListener("submit",function(e){a=!0,e.preventDefault(),("1"===n?o:s)()&&(i(),e=i(),fetch("https://hook.us1.make.com/vlol7xw9f5kvv1lsun0ck8c0qb9vzt1a",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then(e=>{if(e.ok)return e.text();throw new Error("Network response was not ok")}).then(e=>{"Accepted"===e?(document.getElementById("app").classList.add("hidden"),document.getElementById("surveyHeading").classList.add("hidden"),document.getElementById("error").classList.add("hidden"),document.getElementById("surveySuccess").classList.remove("hidden")):console.error("An error occurred while submitting the form.")}).catch(e=>{console.error("An error occurred while submitting the form.")}))}),document.querySelectorAll("#preInstall select").forEach(t=>{t.addEventListener("change",()=>{var e=document.querySelector(`label[for='${t.id}']`);"Select your answer"!==t.value&&e.classList.remove("text-red-600"),o()&&document.getElementById("error").classList.add("opacity-0")})}),document.querySelectorAll(".rating-scale button").forEach(e=>{e.addEventListener("click",()=>{document.querySelector("label[for='rating']").classList.remove("text-red-600"),document.getElementById("error").classList.add("opacity-0")})})):window.location.href="https://www.lifestylesolar.com"}),e();i=new Date,t=new Date(i.getFullYear()+1,0,1);setTimeout(()=>{e(),document.getElementById("dateYear")&&setInterval(e,31536e6)},t-i)}var t,i}();