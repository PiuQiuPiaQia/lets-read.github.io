"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.PDFCursorTools=exports.CursorTool=void 0;var _createClass=function(){function o(o,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(o,r.key,r)}}return function(e,t,r){return t&&o(e.prototype,t),r&&o(e,r),e}}(),_grab_to_pan=require("./grab_to_pan");function _classCallCheck(o,e){if(!(o instanceof e))throw new TypeError("Cannot call a class as a function")}var CursorTool={SELECT:0,HAND:1,ZOOM:2},PDFCursorTools=function(){function o(e){var t=this,r=e.container,s=e.eventBus,n=e.cursorToolOnLoad,i=void 0===n?CursorTool.SELECT:n;_classCallCheck(this,o),this.container=r,this.eventBus=s,this.active=CursorTool.SELECT,this.activeBeforePresentationMode=null,this.handTool=new _grab_to_pan.GrabToPan({element:this.container}),this._addEventListeners(),Promise.resolve().then((function(){t.switchTool(i)}))}return _createClass(o,[{key:"switchTool",value:function(o){var e=this;if(null===this.activeBeforePresentationMode&&o!==this.active){var t=function(){switch(e.active){case CursorTool.SELECT:break;case CursorTool.HAND:e.handTool.deactivate();break;case CursorTool.ZOOM:}};switch(o){case CursorTool.SELECT:t();break;case CursorTool.HAND:t(),this.handTool.activate();break;case CursorTool.ZOOM:default:return void console.error('switchTool: "'+o+'" is an unsupported value.')}this.active=o,this._dispatchEvent()}}},{key:"_dispatchEvent",value:function(){this.eventBus.dispatch("cursortoolchanged",{source:this,tool:this.active})}},{key:"_addEventListeners",value:function(){var o=this;this.eventBus.on("switchcursortool",(function(e){o.switchTool(e.tool)})),this.eventBus.on("presentationmodechanged",(function(e){if(!e.switchInProgress){var t=void 0;e.active?(t=o.active,o.switchTool(CursorTool.SELECT),o.activeBeforePresentationMode=t):(t=o.activeBeforePresentationMode,o.activeBeforePresentationMode=null,o.switchTool(t))}}))}},{key:"activeTool",get:function(){return this.active}}]),o}();exports.CursorTool=CursorTool,exports.PDFCursorTools=PDFCursorTools;