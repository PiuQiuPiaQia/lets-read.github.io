"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.getFontType=getFontType,exports.normalizeFontName=normalizeFontName,exports.recoverGlyphName=recoverGlyphName,exports.type1FontGlyphMapping=type1FontGlyphMapping,exports.SEAC_ANALYSIS_ENABLED=exports.MacStandardGlyphOrdering=exports.FontFlags=void 0;var _util=require("../shared/util.js"),_encodings=require("./encodings.js"),_glyphlist=require("./glyphlist.js"),_unicode=require("./unicode.js");const SEAC_ANALYSIS_ENABLED=!0;exports.SEAC_ANALYSIS_ENABLED=SEAC_ANALYSIS_ENABLED;const FontFlags={FixedPitch:1,Serif:2,Symbolic:4,Script:8,Nonsymbolic:32,Italic:64,AllCap:65536,SmallCap:131072,ForceBold:262144};exports.FontFlags=FontFlags;const MacStandardGlyphOrdering=[".notdef",".null","nonmarkingreturn","space","exclam","quotedbl","numbersign","dollar","percent","ampersand","quotesingle","parenleft","parenright","asterisk","plus","comma","hyphen","period","slash","zero","one","two","three","four","five","six","seven","eight","nine","colon","semicolon","less","equal","greater","question","at","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","bracketleft","backslash","bracketright","asciicircum","underscore","grave","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","braceleft","bar","braceright","asciitilde","Adieresis","Aring","Ccedilla","Eacute","Ntilde","Odieresis","Udieresis","aacute","agrave","acircumflex","adieresis","atilde","aring","ccedilla","eacute","egrave","ecircumflex","edieresis","iacute","igrave","icircumflex","idieresis","ntilde","oacute","ograve","ocircumflex","odieresis","otilde","uacute","ugrave","ucircumflex","udieresis","dagger","degree","cent","sterling","section","bullet","paragraph","germandbls","registered","copyright","trademark","acute","dieresis","notequal","AE","Oslash","infinity","plusminus","lessequal","greaterequal","yen","mu","partialdiff","summation","product","pi","integral","ordfeminine","ordmasculine","Omega","ae","oslash","questiondown","exclamdown","logicalnot","radical","florin","approxequal","Delta","guillemotleft","guillemotright","ellipsis","nonbreakingspace","Agrave","Atilde","Otilde","OE","oe","endash","emdash","quotedblleft","quotedblright","quoteleft","quoteright","divide","lozenge","ydieresis","Ydieresis","fraction","currency","guilsinglleft","guilsinglright","fi","fl","daggerdbl","periodcentered","quotesinglbase","quotedblbase","perthousand","Acircumflex","Ecircumflex","Aacute","Edieresis","Egrave","Iacute","Icircumflex","Idieresis","Igrave","Oacute","Ocircumflex","apple","Ograve","Uacute","Ucircumflex","Ugrave","dotlessi","circumflex","tilde","macron","breve","dotaccent","ring","cedilla","hungarumlaut","ogonek","caron","Lslash","lslash","Scaron","scaron","Zcaron","zcaron","brokenbar","Eth","eth","Yacute","yacute","Thorn","thorn","minus","multiply","onesuperior","twosuperior","threesuperior","onehalf","onequarter","threequarters","franc","Gbreve","gbreve","Idotaccent","Scedilla","scedilla","Cacute","cacute","Ccaron","ccaron","dcroat"];function getFontType(e,r,t=!1){switch(e){case"Type1":return t?_util.FontType.TYPE1STANDARD:"Type1C"===r?_util.FontType.TYPE1C:_util.FontType.TYPE1;case"CIDFontType0":return"CIDFontType0C"===r?_util.FontType.CIDFONTTYPE0C:_util.FontType.CIDFONTTYPE0;case"OpenType":return _util.FontType.OPENTYPE;case"TrueType":return _util.FontType.TRUETYPE;case"CIDFontType2":return _util.FontType.CIDFONTTYPE2;case"MMType1":return _util.FontType.MMTYPE1;case"Type0":return _util.FontType.TYPE0;default:return _util.FontType.UNKNOWN}}function recoverGlyphName(e,r){if(void 0!==r[e])return e;const t=(0,_unicode.getUnicodeForGlyph)(e,r);if(-1!==t)for(const i in r)if(r[i]===t)return i;return(0,_util.info)("Unable to recover a standard glyph name for: "+e),e}function type1FontGlyphMapping(e,r,t){const i=Object.create(null);let n,a,o;const l=!!(e.flags&FontFlags.Symbolic);if(e.isInternalFont)for(o=r,a=0;a<o.length;a++)n=t.indexOf(o[a]),i[a]=n>=0?n:0;else if(e.baseEncodingName)for(o=(0,_encodings.getEncoding)(e.baseEncodingName),a=0;a<o.length;a++)n=t.indexOf(o[a]),i[a]=n>=0?n:0;else if(l)for(a in r)i[a]=r[a];else for(o=_encodings.StandardEncoding,a=0;a<o.length;a++)n=t.indexOf(o[a]),i[a]=n>=0?n:0;const c=e.differences;let s;if(c)for(a in c){const e=c[a];if(n=t.indexOf(e),-1===n){s||(s=(0,_glyphlist.getGlyphsUnicode)());const r=recoverGlyphName(e,s);r!==e&&(n=t.indexOf(r))}i[a]=n>=0?n:0}return i}function normalizeFontName(e){return e.replace(/[,_]/g,"-").replace(/\s/g,"")}exports.MacStandardGlyphOrdering=MacStandardGlyphOrdering;