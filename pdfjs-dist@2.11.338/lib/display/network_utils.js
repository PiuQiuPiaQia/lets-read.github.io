"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.createResponseStatusError=createResponseStatusError,exports.extractFilenameFromHeader=extractFilenameFromHeader,exports.validateRangeRequestCapabilities=validateRangeRequestCapabilities,exports.validateResponseStatus=validateResponseStatus;var _util=require("../shared/util.js"),_content_disposition=require("./content_disposition.js"),_display_utils=require("./display_utils.js");function validateRangeRequestCapabilities({getResponseHeader:e,isHttp:t,rangeChunkSize:s,disableRange:n}){(0,_util.assert)(s>0,"Range chunk size must be larger than zero");const i={allowRangeRequests:!1,suggestedLength:void 0},r=parseInt(e("Content-Length"),10);if(!Number.isInteger(r))return i;if(i.suggestedLength=r,r<=2*s)return i;if(n||!t)return i;if("bytes"!==e("Accept-Ranges"))return i;const a=e("Content-Encoding")||"identity";return"identity"!==a||(i.allowRangeRequests=!0),i}function extractFilenameFromHeader(e){const t=e("Content-Disposition");if(t){let e=(0,_content_disposition.getFilenameFromContentDispositionHeader)(t);if(e.includes("%"))try{e=decodeURIComponent(e)}catch(s){}if((0,_display_utils.isPdfFile)(e))return e}return null}function createResponseStatusError(e,t){return 404===e||0===e&&t.startsWith("file:")?new _util.MissingPDFException('Missing PDF "'+t+'".'):new _util.UnexpectedResponseException(`Unexpected server response (${e}) while retrieving PDF "${t}".`,e)}function validateResponseStatus(e){return 200===e||206===e}