"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.getMetrics=getMetrics,exports.selectFont=selectFont,exports.FontFinder=void 0;var _xfa_object=require("./xfa_object.js"),_utils=require("./utils.js"),_util=require("../../shared/util.js");class FontFinder{constructor(t){this.fonts=new Map,this.cache=new Map,this.warned=new Set,this.defaultFont=null,this.add(t)}add(t,e=null){for(const i of t)this.addPdfFont(i);for(const i of this.fonts.values())i.regular||(i.regular=i.italic||i.bold||i.bolditalic);if(!e||0===e.size)return;const s=this.fonts.get("PdfJS-Fallback-PdfJS-XFA");for(const i of e)this.fonts.set(i,s)}addPdfFont(t){const e=t.cssFontInfo,s=e.fontFamily;let i=this.fonts.get(s);i||(i=Object.create(null),this.fonts.set(s,i),this.defaultFont||(this.defaultFont=i));let n="";const o=parseFloat(e.fontWeight);0!==parseFloat(e.italicAngle)?n=o>=700?"bolditalic":"italic":o>=700&&(n="bold"),n||((t.name.includes("Bold")||t.psName&&t.psName.includes("Bold"))&&(n="bold"),(t.name.includes("Italic")||t.name.endsWith("It")||t.psName&&(t.psName.includes("Italic")||t.psName.endsWith("It")))&&(n+="italic")),n||(n="regular"),i[n]=t}getDefault(){return this.defaultFont}find(t,e=!0){let s=this.fonts.get(t)||this.cache.get(t);if(s)return s;const i=/,|-|_| |bolditalic|bold|italic|regular|it/gi;let n=t.replace(i,"");if(s=this.fonts.get(n),s)return this.cache.set(t,s),s;n=n.toLowerCase();const o=[];for(const[a,l]of this.fonts.entries())a.replace(i,"").toLowerCase().startsWith(n)&&o.push(l);if(0===o.length)for(const[,a]of this.fonts.entries())a.regular.name&&a.regular.name.replace(i,"").toLowerCase().startsWith(n)&&o.push(a);if(0===o.length){n=n.replace(/psmt|mt/gi,"");for(const[t,e]of this.fonts.entries())t.replace(i,"").toLowerCase().startsWith(n)&&o.push(e)}if(0===o.length)for(const a of this.fonts.values())a.regular.name&&a.regular.name.replace(i,"").toLowerCase().startsWith(n)&&o.push(a);return o.length>=1?(1!==o.length&&e&&(0,_util.warn)(`XFA - Too many choices to guess the correct font: ${t}`),this.cache.set(t,o[0]),o[0]):(e&&!this.warned.has(t)&&(this.warned.add(t),(0,_util.warn)(`XFA - Cannot find the font: ${t}`)),null)}}function selectFont(t,e){return"italic"===t.posture?"bold"===t.weight?e.bolditalic:e.italic:"bold"===t.weight?e.bold:e.regular}function getMetrics(t,e=!1){let s=null;if(t){const e=(0,_utils.stripQuotes)(t.typeface),i=t[_xfa_object.$globalData].fontFinder.find(e);s=selectFont(t,i)}if(!s)return{lineHeight:12,lineGap:2,lineNoGap:10};const i=t.size||10,n=s.lineHeight?Math.max(e?0:1.2,s.lineHeight):1.2,o=void 0===s.lineGap?.2:s.lineGap;return{lineHeight:n*i,lineGap:o*i,lineNoGap:Math.max(1,n-o)*i}}exports.FontFinder=FontFinder;