"use strict";var TestReporter=function(t,e){function n(e,i,s){var o=new XMLHttpRequest;o.open("POST",e,!0),o.setRequestHeader("Content-Type","application/json"),o.onreadystatechange=function(t){4===o.readyState&&(200!==o.status?n(e,i,s):s&&s())},i["browser"]=t,o.send(JSON.stringify(i))}function i(t){n("/info",{message:t})}function s(t,e,i){var s={status:t,description:e};"undefined"!==typeof i&&(s["error"]=i),n("/submit_task_results",s)}function o(){n("/tellMeToQuit?path="+escape(e),{})}this.now=function(){return(new Date).getTime()},this.jasmineStarted=function(e){this.runnerStartTime=this.now(),i("Started tests for "+t+".")},this.suiteStarted=function(t){},this.specStarted=function(t){},this.specDone=function(t){if(0===t.failedExpectations.length)s("TEST-PASSED",t.description);else{for(var e="",n=t.failedExpectations,i=0,o=n.length;i<o;i++)e+=n[i].message+" ";s("TEST-UNEXPECTED-FAIL",t.description,e)}},this.suiteDone=function(t){},this.jasmineDone=function(){setTimeout(o,500)}};