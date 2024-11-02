"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.PDFFindBar=void 0;var _pdf_find_controller=require("./pdf_find_controller.js");const MATCHES_COUNT_LIMIT=1e3;class PDFFindBar{constructor(t,e,i){this.opened=!1,this.bar=t.bar,this.toggleButton=t.toggleButton,this.findField=t.findField,this.highlightAll=t.highlightAllCheckbox,this.caseSensitive=t.caseSensitiveCheckbox,this.entireWord=t.entireWordCheckbox,this.findMsg=t.findMsg,this.findResultsCount=t.findResultsCount,this.findPreviousButton=t.findPreviousButton,this.findNextButton=t.findNextButton,this.eventBus=e,this.l10n=i,this.toggleButton.addEventListener("click",(()=>{this.toggle()})),this.findField.addEventListener("input",(()=>{this.dispatchEvent("")})),this.bar.addEventListener("keydown",(t=>{switch(t.keyCode){case 13:t.target===this.findField&&this.dispatchEvent("again",t.shiftKey);break;case 27:this.close();break}})),this.findPreviousButton.addEventListener("click",(()=>{this.dispatchEvent("again",!0)})),this.findNextButton.addEventListener("click",(()=>{this.dispatchEvent("again",!1)})),this.highlightAll.addEventListener("click",(()=>{this.dispatchEvent("highlightallchange")})),this.caseSensitive.addEventListener("click",(()=>{this.dispatchEvent("casesensitivitychange")})),this.entireWord.addEventListener("click",(()=>{this.dispatchEvent("entirewordchange")})),this.eventBus._on("resize",this._adjustWidth.bind(this))}reset(){this.updateUIState()}dispatchEvent(t,e){this.eventBus.dispatch("find",{source:this,type:t,query:this.findField.value,phraseSearch:!0,caseSensitive:this.caseSensitive.checked,entireWord:this.entireWord.checked,highlightAll:this.highlightAll.checked,findPrevious:e})}updateUIState(t,e,i){let s=Promise.resolve(""),n="";switch(t){case _pdf_find_controller.FindState.FOUND:break;case _pdf_find_controller.FindState.PENDING:n="pending";break;case _pdf_find_controller.FindState.NOT_FOUND:s=this.l10n.get("find_not_found"),n="notFound";break;case _pdf_find_controller.FindState.WRAPPED:s=this.l10n.get("find_reached_"+(e?"top":"bottom"));break}this.findField.setAttribute("data-status",n),s.then((t=>{this.findMsg.textContent=t,this._adjustWidth()})),this.updateResultsCount(i)}updateResultsCount({current:t=0,total:e=0}={}){const i=MATCHES_COUNT_LIMIT;let s=Promise.resolve("");if(e>0)if(e>i){let t="find_match_count_limit";s=this.l10n.get(t,{limit:i})}else{let i="find_match_count";s=this.l10n.get(i,{current:t,total:e})}s.then((t=>{this.findResultsCount.textContent=t,this.findResultsCount.classList.toggle("hidden",!e),this._adjustWidth()}))}open(){this.opened||(this.opened=!0,this.toggleButton.classList.add("toggled"),this.toggleButton.setAttribute("aria-expanded","true"),this.bar.classList.remove("hidden")),this.findField.select(),this.findField.focus(),this._adjustWidth()}close(){this.opened&&(this.opened=!1,this.toggleButton.classList.remove("toggled"),this.toggleButton.setAttribute("aria-expanded","false"),this.bar.classList.add("hidden"),this.eventBus.dispatch("findbarclose",{source:this}))}toggle(){this.opened?this.close():this.open()}_adjustWidth(){if(!this.opened)return;this.bar.classList.remove("wrapContainers");const t=this.bar.clientHeight,e=this.bar.firstElementChild.clientHeight;t>e&&this.bar.classList.add("wrapContainers")}}exports.PDFFindBar=PDFFindBar;