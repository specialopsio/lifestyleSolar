!function(){if(-1!==window.location.href.indexOf("lifestylesolar.com")){let s,d,n=void document.addEventListener("DOMContentLoaded",function(){function t(){var e;(e=document.getElementById("error")).textContent="",e.style.opacity=0,n=setInterval(function(){l+=10;var a=document.getElementById("dynamic"),r=document.getElementById("current-progress");a&&(a.style.width=l+"%",a.setAttribute("aria-valuenow",l),r.textContent=l<=25?"Searching address":l<=50?"Analyzing roof":l<=75?"Measuring sunlight":"Getting quote",100<=l)&&(clearInterval(n),setTimeout(function(){var e=document.getElementById("formAddress"),t=document.getElementById("quote1"),n=document.getElementById("quote2"),o=document.getElementById("quote3");selectedPlaceCTA||e&&""!==e.value.trim()?(n&&(n.style.display="none"),o&&(o.style.display="block"),s=!0,d&&(i(),f())):(t&&(t.style.display="block"),n&&(n.style.display="none"),o&&(o.style.display="none"),a&&(a.style.width="0%",a.setAttribute("aria-valuenow",0),r.textContent=""),l=0,I("Please input your addrress."))},250))},500)}var n,e,o,l=0,a=(window.location.hash&&(e=document.getElementById("quote1"),o=document.getElementById("quote2"),e&&(e.style.display="none"),o)&&(o.style.display="block",t()),document.getElementById("quote2")),r=(new MutationObserver(function(e){e.forEach(function(e){"attributes"===e.type&&"style"===e.attributeName&&"block"===a.style.display&&t()})}).observe(a,{attributes:!0}),document.getElementById("quote1"));new MutationObserver(function(e){e.forEach(function(e){"attributes"===e.type&&"style"===e.attributeName&&"none"===r.style.display&&a&&(a.style.display="block")})}).observe(r,{attributes:!0})}),y=null;let l=["00000A","91009C","E64616","FEB400","FFFFF6"];const B=["E8EAF6","1A237E"];let u=[],c,m;async function i(){var e,t,n,o,a=(new Date).getTime(),r=(document.getElementById("gmap_canvas"),document.getElementById("userFrontHouse"));r.src=y.icon_url+"&time="+a,r.srcset=y.icon_url+"&time="+a,document.getElementById("userAddress").textContent=y.home_address+" in "+y.city,document.getElementById("sunlightHours").textContent=y.sunlight_hours,document.getElementById("roofSize").textContent=y.roof_area,document.getElementById("savingsDollars").textContent=y.year_twenty_savings,document.getElementById("formAddress").value=y.display_address,document.getElementById("bill").value=y.bill,document.querySelectorAll('[id="billValue"]').forEach(function(e){e.textContent="$"+y.bill}),document.getElementById("array_area").value=y.array_area,document.getElementById("formStreet").value=y.home_address,document.getElementById("formCity").value=y.city,document.getElementById("formStateShort").value=y.state,document.getElementById("formZip").value=y.zip,document.getElementById("formStateLong").value=y.stateLong,document.getElementById("roof_area").value=y.roof_area,document.getElementById("max_panels").value=y.max_panels,document.getElementById("wattage").value=y.wattage,document.getElementById("sunlight_hours").value=y.sunlight_hours,document.getElementById("lat").value=y.lat,document.getElementById("lon").value=y.lon,document.getElementById("carbon_offset").value=y.carbon_offset,m=function(e,t,n){const o=new google.maps.LatLng(e,t),a={center:o,zoom:20,tilt:0,mapTypeId:"satellite",mapTypeControl:!1,fullscreenControl:!1,rotateControl:!1,streetViewControl:!1,zoomControl:!1},r=document.getElementById(n),l=new google.maps.Map(r,a);return l.addListener("zoom_changed",function(){console.debug("Map",l.getZoom()),l.getZoom()<18&&l.setZoom(18)}),l}(y.lat,y.lon,"map_container"),y.geoTiff&&({fluxData:a,maskData:r}=await async function(e,t){try{var n=await g(t),o=await g(e);return{maskData:n,fluxData:o}}catch(e){console.error("Fetching TIFFs failed",e)}}((r=y.geoTiff).flux,r.mask),console.debug("maskdata",r),n=r.width,o=r.height,e=Math.floor(n/2),t=Math.floor(o/2),o=function(e,n,o){let a=1/0,r=null;return e.forEach(e=>{var t=function(e){let t=0,n=0;return e.forEach(e=>{t+=e.x,n+=e.y}),{x:t/e.length,y:n/e.length}}(e),t=Math.sqrt(Math.pow(t.x-n,2)+Math.pow(t.y-o,2));t<a&&(a=t,r=e)}),r}(function(n,o,a){const r=[],l=new Set;for(let t=0;t<a;t++)for(let e=0;e<o;e++){var s=t*o+e;1!==n[s]||l.has(s)||(s=function(e,t,n,o,a){var r=new Set,l=[{x:t,y:n}],s=[];for(;0<l.length;){var{x:d,y:u}=l.shift(),c=u*o+d;if(!r.has(c)&&0!==e[c]){r.add(c),s.push({x:d,y:u});for(const i of function(n,o,a,r){var l=[];for(let t=-1;t<=1;t++)for(let e=-1;e<=1;e++){var s,d;0===t&&0===e||(s=n+t,d=o+e,0<=s&&s<a&&0<=d&&d<r&&l.push({x:s,y:d}))}return l}(d,u,o,a)){var m=i.y*o+i.x;r.has(m)||1!==e[m]||l.push(i)}}}return s}(n,e,t,o,a),r.push(s),s.forEach(e=>l.add(e.y*o+e.x)))}return r}(r.rasters[0],n,o),e,t),r.rasters[0]=function(e,t,n){const o=new Array(e.length).fill(0);return n.forEach(e=>{e=e.y*t+e.x;o[e]=1}),o}(r.rasters[0],n,o),e=function(n,o,e,a,r){var l=document.createElement("canvas"),t=(l.width=o.width,l.height=o.height,l.getContext("2d")),s=t.createImageData(l.width,l.height),d=E(e);for(let t=0;t<l.height;t++)for(let e=0;e<l.width;e++){var u=t*l.width+e,c=v(n.rasters[0][u],a,r),c=255<Math.round(c*(d.length-1))?255:Math.round(c*(d.length-1)),c=d[c];s.data[4*u+0]=c.r,s.data[4*u+1]=c.g,s.data[4*u+2]=c.b,s.data[4*u+3]=o.rasters[0][u]?255:0}return t.putImageData(s,0,0),l}(a,r,l,0,1800),t=e,n=a.bounds,o=m,t=t.toDataURL(),(t=new google.maps.GroundOverlay(t,n)).setMap(o),c=y.solar_potential,async function(e){u.forEach(e=>e.setMap(null));const r=c,l=(E(B,256),r.solarPanels[r.solarPanels.length-1].yearlyEnergyDcKwh),s=r.solarPanels[0].yearlyEnergyDcKwh,t=(u=r.solarPanels.map(n=>{var[e,t]=[r.panelWidthMeters/2,r.panelHeightMeters/2],e=[{x:+e,y:+t},{x:+e,y:-t},{x:-e,y:-t},{x:-e,y:+t},{x:+e,y:+t}];const o="PORTRAIT"===n.orientation?90:0,a=r.roofSegmentStats[n.segmentIndex].azimuthDegrees;Math.round(255*v(n.yearlyEnergyDcKwh,s,l));return new google.maps.Polygon({paths:e.map(({x:e,y:t})=>google.maps.geometry.spherical.computeOffset(new google.maps.LatLng(n.center.latitude,n.center.longitude),Math.sqrt(e*e+t*t),Math.atan2(t,e)*(180/Math.PI)+o+a)),strokeColor:"#B0BEC5",strokeOpacity:.9,strokeWeight:1,fillColor:"#0f0f0f",fillOpacity:.9})}),Math.ceil((u.length-1)/4));h(e,4<t?t:3)}(m),document.getElementById("solarPanelSlider").max=c.solarPanelConfigs[c.solarPanelConfigs.length-1].panelsCount,document.getElementById("solarPanelSlider").min=c.solarPanelConfigs[0].panelsCount,document.getElementById("solarPanelSlider").value=c.solarPanelConfigs[c.solarPanelConfigs.length-1].panelsCount/4,document.getElementById("solarPanelSlider").addEventListener("input",e=>{e=parseInt(e.target.value,10);h(m,e-1)}),(r=document.getElementById("solarPanelSliderContainer")).style.display="flex",m.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(r))}async function g(e){try{var t=await fetch(e);if(200!==t.status)throw new Error("Failed to download GeoTIFF from url:",e);var n=await t.arrayBuffer(),o=await(await GeoTIFF.fromArrayBuffer(n)).getImage(),a=await o.readRasters(),r=(u=y.lat,c=y.lon,m=30,i=(m/=1e3)/6371,m=Math.asin(m/(6371*Math.cos(Math.PI*u/180))),g=u+180*i/Math.PI,u-=180*i/Math.PI,i=c+180*m/Math.PI,c-=180*m/Math.PI,{north:g,south:u,east:i,west:c}),l=o.getGeoKeys(),s=o.getBoundingBox(),d=proj4(l.ProjLinearUnitsGeoKey||"WGS84");d.forward({x:s[0],y:s[1]}),d.forward({x:s[2],y:s[3]});return{width:o.getWidth(),height:o.getHeight(),rasters:a,bounds:r}}catch(e){throw console.error("Error processing GeoTIFF:",e),e}var u,c,m,i,g}function h(t,n){u.forEach(e=>e.setMap(null));for(let e=0;e<=n;e++)u[e].setMap(t);var e=document.getElementById("sliderValue");e.innerText=n+1,e.value=n;let o=c.solarPanelConfigs.findIndex(e=>e.panelsCount>=n);-1===o&&(o=c.solarPanelConfigs.length-1);e=c.solarPanelConfigs[o];c.panelCapacityWatts;e.panelsCount;let a=.85*+e.yearlyEnergyDcKwh;e=[...Array(20).keys()].map(e=>a*.995**e).map((e,t)=>Math.max(.13*(300/.13*12-e)*1.022**t/1.04**t,0)).reduce((e,t)=>e+t,0),e=Array.from({length:20},(e,t)=>3600*Math.pow(1.022,t)/Math.pow(1.04,t)).reduce((e,t)=>e+t,0)-(e-7e3);document.getElementById("savingsDollars").textContent="$"+e.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g,",")}function f(){document.getElementById("quote3").style.display="block",document.getElementById("quote2").style.display="none"}google.maps.event.addDomListener(window,"load",function(){document.querySelectorAll(".address-input").forEach(function(e){var t=new google.maps.places.Autocomplete(e);t.addListener("place_changed",function(){var e;n=t.getPlace(),(e=document.getElementById("calculateButton")).classList.contains("disabled")&&n&&e.classList.remove("disabled")})})});const t=new URLSearchParams(window.location.search);function o(e){e=e.startsWith("#")?e.slice(1):e;return{r:parseInt(e.substring(0,2),16),g:parseInt(e.substring(2,4),16),b:parseInt(e.substring(4,6),16)}}function p(e,t,n){return e+n*(t-e)}function E(e,t=256){const a=e.map(o),r=(a.length-1)/(t-1);return Array.from({length:t},(e,t)=>{var t=t*r,n=Math.floor(t),o=Math.ceil(t);return{r:p(a[n].r,a[o].r,t-n),g:p(a[n].g,a[o].g,t-n),b:p(a[n].b,a[o].b,t-n)}})}function v(e,t,n){return(e-t)/(n-t)}function I(e){var t=document.getElementById("error");t.textContent=e,t.style.opacity=1,document.getElementById("address")&&!document.getElementById("address").value&&document.getElementById("address").classList.add("bg-red-50")}function e(t,n,o=2e3){return new Promise(e=>{setTimeout(()=>{document.getElementById(t).textContent=n,document.getElementById("skeleton-"+t).remove(),e()},o)})}document.addEventListener("DOMContentLoaded",function(){if("true"===new URLSearchParams(window.location.search).get("commercial"))document.getElementById("commercial").style.display="block",document.getElementById("modal").style.display="none",document.getElementById("app").style.display="none";else if(t.has("hash"))try{document.getElementById("quote1").style.display="none";var e=t.get("hash");fetch("https://vj61befm45.execute-api.us-east-1.amazonaws.com/default/solar_hash?data_hash="+e,{method:"GET"}).then(e=>e.json()).then(e=>{e.lat&&(d=!0,y=e,document.getElementById("formAddress").value=y.display_address,s)&&(i(),f())})}catch(e){console.debug("ERROR",e)}}),document.addEventListener("DOMContentLoaded",function(){var e,s;"undefined"!=typeof google&&google.maps&&google.maps.places&&(e=document.getElementById("formAddress"),(s=new google.maps.places.Autocomplete(e)).setFields(["address_components","geometry","name"]),s.addListener("place_changed",function(){for(var e=s.getPlace().address_components,t="",n="",o="",a="",r="",l=0;l<e.length;l++)switch(e[l].types[0]){case"street_number":t+=e[l].long_name+" ";break;case"route":t+=e[l].long_name;break;case"locality":n=e[l].long_name;break;case"administrative_area_level_1":o=e[l].short_name,a=e[l].long_name;break;case"postal_code":r=e[l].long_name}document.getElementById("formStreet").value=t,document.getElementById("formCity").value=n,document.getElementById("formStateShort").value=o,document.getElementById("formStateLong").value=a,document.getElementById("formZip").value=r})),document.getElementById("propertyForm").addEventListener("submit",function(e){e.preventDefault();var e=document.getElementById("name").value,t=document.getElementById("formAddress").value,n=document.getElementById("phone").value,o=document.getElementById("credit-score").value,a=document.getElementById("owner").checked;!function(e,t,n,o,a){document.getElementById("error").style.opacity=0,["name","address","phone","credit-score","owner"].forEach(e=>{document.getElementById(e).classList.remove("bg-red-50"),document.querySelector("label[for='owner']").classList.replace("text-red-500","text-gray-900")});var r=!0;e&&t&&n&&"Credit Score"!==o&&a||(I("Please complete all fields."),function(e){for(var t in e)e[t]&&("creditScore"!==t||"Credit Score"!==e[t])||(t="creditScore"===t?"credit-score":t,document.getElementById(t).classList.add("bg-red-50"))}({name:e,address:t,phone:n,creditScore:o,owner:a}),r=!1);return r}(e,t,n,o,a)?(e=document.querySelector("label[for='owner']"),a||(e.classList.remove("text-gray-900"),e.classList.add("text-red-500"))):(t=function(){var e={name:document.getElementById("name").value,address:document.getElementById("formAddress").value,phone:document.getElementById("phone").value,credit_score:document.getElementById("credit-score").value,bill:document.getElementById("billSlider").value,owner:document.getElementById("owner").checked,array_area:document.getElementById("array_area").value,roof_area:document.getElementById("roof_area").value,max_panels:document.getElementById("max_panels").value,wattage:document.getElementById("wattage").value,sunlight_hours:document.getElementById("sunlight_hours").value,lat:document.getElementById("lat").value,lon:document.getElementById("lon").value,street:document.getElementById("formStreet").value,city:document.getElementById("formCity").value,state_short:document.getElementById("formStateShort").value,state_long:document.getElementById("formStateLong").value,zip:document.getElementById("formZip").value,carbon_offset:document.getElementById("carbon_offset").value};return e}(),n=function(){try{if(window.sbjs)return{utm_term:window.sbjs.get.current.trm,utm_source:window.sbjs.get.current.src,utm_campaign:window.sbjs.get.current.cmp,utm_content:window.sbjs.get.current.cnt,utm_medium:window.sbjs.get.current.mdm}}catch(e){console.debug("ERROR LOADING SBJS")}return{}}(),t={...t,...n},fetch("https://hook.us1.make.com/8xt51qbsf0c2o58sd12w62gv5gypn8ms",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}).then(e=>{if(e.ok)return e.text();throw new Error("Network response was not ok")}).then(e=>{"Accepted"===e?(document.getElementById("app").style.display="block",document.getElementById("quote3").style.display="none",document.getElementById("modal").style.display="none","function"==typeof fbq&&fbq("track","Lead")):I("An error occurred while submitting the form.")}).catch(e=>{I("An error occurred while submitting the form.")}))}),document.getElementById("credit-score").addEventListener("change",function(){"Credit Score"!==this.value?(this.classList.remove("text-gray-400"),this.classList.add("text-gray-900")):(this.classList.remove("text-gray-900"),this.classList.add("text-gray-400"))}),document.getElementById("phone").addEventListener("input",function(e){var t,n=e.target.value.replace(/\D/g,"");n.startsWith("1")?(t="1+ ",n=n.substr(1)):t="",3<n.length?(t+="("+n.substr(0,3)+") ",6<=n.length?t+=n.substr(3,3)+"-"+n.substr(6,4):t+=n.substr(3)):t+=n,e.target.value=t}),["name","address","phone","credit-score","owner","formAddress"].forEach(e=>{document.getElementById(e).addEventListener("input",function(){this.classList.remove("bg-red-50"),"owner"===e&&document.querySelector("label[for='owner']").classList.replace("text-red-500","text-gray-900")})})}),["sunlightHours","kwHours","savingsDollars"].forEach(e=>{var t,n,o=document.getElementById(e),e=(e="skeleton-"+e,t="skeleton-rectangle",(n=document.createElement("div")).id=e,n.className="skeleton "+t,n);o.parentElement.insertBefore(e,o)}),Promise.all([e("sunlightHours","2,187"),e("kwHours","4kw"),e("savingsDollars","$8,000")]).then(()=>{})}}();