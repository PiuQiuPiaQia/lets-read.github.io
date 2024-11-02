"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.TextMeasure=void 0;var _fonts=require("./fonts.js");const WIDTH_FACTOR=1.02;class FontInfo{constructor(t,o,e,s){if(this.lineHeight=e,this.paraMargin=o||{top:0,bottom:0,left:0,right:0},!t)return void([this.pdfFont,this.xfaFont]=this.defaultFont(s));this.xfaFont={typeface:t.typeface,posture:t.posture,weight:t.weight,size:t.size,letterSpacing:t.letterSpacing};const n=s.find(t.typeface);n?(this.pdfFont=(0,_fonts.selectFont)(t,n),this.pdfFont||([this.pdfFont,this.xfaFont]=this.defaultFont(s))):[this.pdfFont,this.xfaFont]=this.defaultFont(s)}defaultFont(t){const o=t.find("Helvetica",!1)||t.find("Myriad Pro",!1)||t.find("Arial",!1)||t.getDefault();if(o&&o.regular){const t=o.regular,e=t.cssFontInfo,s={typeface:e.fontFamily,posture:"normal",weight:"normal",size:10,letterSpacing:0};return[t,s]}const e={typeface:"Courier",posture:"normal",weight:"normal",size:10,letterSpacing:0};return[null,e]}}class FontSelector{constructor(t,o,e,s){this.fontFinder=s,this.stack=[new FontInfo(t,o,e,s)]}pushData(t,o,e){const s=this.stack[this.stack.length-1];for(const i of["typeface","posture","weight","size","letterSpacing"])t[i]||(t[i]=s.xfaFont[i]);for(const i of["top","bottom","left","right"])isNaN(o[i])&&(o[i]=s.paraMargin[i]);const n=new FontInfo(t,o,e||s.lineHeight,this.fontFinder);n.pdfFont||(n.pdfFont=s.pdfFont),this.stack.push(n)}popFont(){this.stack.pop()}topFont(){return this.stack[this.stack.length-1]}}class TextMeasure{constructor(t,o,e,s){this.glyphs=[],this.fontSelector=new FontSelector(t,o,e,s),this.extraHeight=0}pushData(t,o,e){this.fontSelector.pushData(t,o,e)}popFont(t){return this.fontSelector.popFont()}addPara(){const t=this.fontSelector.topFont();this.extraHeight+=t.paraMargin.top+t.paraMargin.bottom}addString(t){if(!t)return;const o=this.fontSelector.topFont(),e=o.xfaFont.size;if(o.pdfFont){const s=o.xfaFont.letterSpacing,n=o.pdfFont,i=n.lineHeight||1.2,a=o.lineHeight||Math.max(1.2,i)*e,h=void 0===n.lineGap?.2:n.lineGap,r=i-h,p=Math.max(1,r)*e,f=e/1e3,c=n.defaultWidth||n.charsToGlyphs(" ")[0].width;for(const o of t.split(/[\u2029\n]/)){const t=n.encodeString(o).join(""),e=n.charsToGlyphs(t);for(const o of e){const t=o.width||c;this.glyphs.push([t*f+s,a,p,o.unicode,!1])}this.glyphs.push([0,0,0,"\n",!0])}this.glyphs.pop()}else{for(const o of t.split(/[\u2029\n]/)){for(const t of o.split(""))this.glyphs.push([e,1.2*e,e,t,!1]);this.glyphs.push([0,0,0,"\n",!0])}this.glyphs.pop()}}compute(t){let o=-1,e=0,s=0,n=0,i=0,a=0,h=!1,r=!0;for(let p=0,f=this.glyphs.length;p<f;p++){const[f,c,l,u,g]=this.glyphs[p],F=" "===u,d=r?l:c;g?(s=Math.max(s,i),i=0,n+=a,a=d,o=-1,e=0,r=!1):F?i+f>t?(s=Math.max(s,i),i=0,n+=a,a=d,o=-1,e=0,h=!0,r=!1):(a=Math.max(d,a),e=i,i+=f,o=p):i+f>t?(n+=a,a=d,-1!==o?(p=o,s=Math.max(s,e),i=0,o=-1,e=0):(s=Math.max(s,i),i=f),h=!0,r=!1):(i+=f,a=Math.max(d,a))}return s=Math.max(s,i),n+=a+this.extraHeight,{width:WIDTH_FACTOR*s,height:n,isBroken:h}}}exports.TextMeasure=TextMeasure;