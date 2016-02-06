!function(t){function e(a){if(n[a])return n[a].exports;var i=n[a]={exports:{},id:a,loaded:!1};return t[a].call(i.exports,i,i.exports,e),i.loaded=!0,i.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){t.exports=n(4)},function(t,e,n){"use strict";function a(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var i=n(3),o=new i,r=function u(){a(this,u)};r.createMethodId=function(){return Date.now()+"-"+Math.floor(100*Math.random())},r.emitter=o,e.default=r},function(t,e){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var a=function(){function t(t,e){for(var n=0;n<e.length;n++){var a=e[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}return function(e,n,a){return n&&t(e.prototype,n),a&&t(e,a),e}}();Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(){n(this,t)}return a(t,null,[{key:"getConstNameByEn",value:function(e){return"string"==typeof e&&""!==e?t["METHOD_"+e+"_NAME"]:void 0}}]),t}();i.METHOD_SNOW="SNOW",i.METHOD_SNOW_NAME="雪花",i.METHOD_DOT="DOT",i.METHOD_DOT_NAME="黑點",i.METHOD_ALPHA="ALPHA",i.METHOD_ALPHA_NAME="透明",i.METHOD_GRAY="GRAY",i.METHOD_GRAY_NAME="灰階",i.METHOD_BRIGHTNESS="BRIGHTNESS",i.METHOD_BRIGHTNESS_NAME="亮度",i.METHOD_CONTRAST="CONTRAST",i.METHOD_CONTRAST_NAME="對比",i.METHOD_SATURATE="SATURATE",i.METHOD_SATURATE_NAME="彩度",i.METHOD_HUE_ROTATE="HUE_ROTATE",i.METHOD_HUE_ROTATE_NAME="色相轉換",i.METHOD_INVERT="INVERT",i.METHOD_INVERT_NAME="負片",i.METHOD_SEPIA="SEPIA",i.METHOD_SEPIA_NAME="復古",e.default=i},function(t,e){"use strict";function n(t){return t?a(t):void 0}function a(t){for(var e in n.prototype)t[e]=n.prototype[e];return t}t.exports=n,n.prototype.on=n.prototype.addEventListener=function(t,e){return this._callbacks=this._callbacks||{},(this._callbacks["$"+t]=this._callbacks["$"+t]||[]).push(e),this},n.prototype.once=function(t,e){function n(){this.off(t,n),e.apply(this,arguments)}return n.fn=e,this.on(t,n),this},n.prototype.off=n.prototype.removeListener=n.prototype.removeAllListeners=n.prototype.removeEventListener=function(t,e){if(this._callbacks=this._callbacks||{},0==arguments.length)return this._callbacks={},this;var n=this._callbacks["$"+t];if(!n)return this;if(1==arguments.length)return delete this._callbacks["$"+t],this;for(var a,i=0;i<n.length;i++)if(a=n[i],a===e||a.fn===e){n.splice(i,1);break}return this},n.prototype.emit=function(t){this._callbacks=this._callbacks||{};var e=[].slice.call(arguments,1),n=this._callbacks["$"+t];if(n){n=n.slice(0);for(var a=0,i=n.length;i>a;++a)n[a].apply(this,e)}return this},n.prototype.listeners=function(t){return this._callbacks=this._callbacks||{},this._callbacks["$"+t]||[]},n.prototype.hasListeners=function(t){return!!this.listeners(t).length}},function(t,e,n){"use strict";n(6)},function(t,e){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var a=function(){function t(t,e){for(var n=0;n<e.length;n++){var a=e[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}return function(e,n,a){return n&&t(e.prototype,n),a&&t(e,a),e}}();Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(){n(this,t)}return a(t,[{key:"setComputeWidth",value:function(t){this.compute_width=t||0}},{key:"setComputeHeight",value:function(t){this.compute_height=t||0}},{key:"getComputeWidth",value:function(){return this.compute_width}},{key:"getComputeHeight",value:function(){return this.compute_height}}]),t}();e.default=i},function(t,e,n){"use strict";function a(t){return t&&t.__esModule?t:{"default":t}}var i=n(10),o=a(i);!function(){var t=document.querySelectorAll('[data-majo="picture-filter"]');new o.default(t[0],{})}()},function(t,e,n){"use strict";function a(t){return t&&t.__esModule?t:{"default":t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function r(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var u=function(){function t(t,e){for(var n=0;n<e.length;n++){var a=e[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}return function(e,n,a){return n&&t(e.prototype,n),a&&t(e,a),e}}();Object.defineProperty(e,"__esModule",{value:!0});var d=n(1),s=a(d),c=n(5),h=a(c),l=function(t){function e(){i(this,e);var t=o(this,Object.getPrototypeOf(e).call(this)),n=t;return n.obj_canvas=document.createElement("canvas"),n.obj_canvas_2d=n.obj_canvas.getContext("2d"),n.obj_image=new Image,n.obj_image.onload=function(){if("string"==typeof this.src&&""!==this.src){var t=this.width,e=this.height;n.obj_canvas.width=t,n.obj_canvas.height=e,n.obj_canvas_2d.drawImage(this,0,0,t,e),n.setComputeWidth(t),n.setComputeHeight(e),s.default.emitter.emit("step.image.success.loaded",{origin_data:this.src,method:n.getPainterMethod()})}else console.log("***")},n.obj_image.error=function(){s.default.emitter.emit("step.image.error.loaded",{origin_data:this.src})},t}return r(e,t),u(e,[{key:"getPainterMethod",value:function(){var t=this;return t.painter_method}},{key:"changeData",value:function(t,e){var n=this;n.painter_method=t,n.obj_image.src=e}},{key:"methodOrigin",value:function(t){var e=this;e.emitAfterMethod(t)}},{key:"methodSnow",value:function(t){for(var e=this,n=e.getComputeWidth(),a=e.getComputeHeight(),i=void 0,o=void 0,r=0;500>=r;r++)i=Math.floor(Math.random()*n),o=Math.floor(Math.random()*a),e.obj_canvas_2d.fillStyle="white",e.obj_canvas_2d.beginPath(),e.obj_canvas_2d.arc(i,o,3,0,2*Math.PI,!0),e.obj_canvas_2d.closePath(),e.obj_canvas_2d.fill();e.emitAfterMethod(t)}},{key:"methodDot",value:function(t){for(var e=this,n=e.getComputeWidth(),a=e.getComputeHeight(),i=void 0,o=void 0,r=0;150>=r;r++)i=Math.floor(Math.random()*n),o=Math.floor(Math.random()*a),e.obj_canvas_2d.fillStyle="black",e.obj_canvas_2d.beginPath(),e.obj_canvas_2d.arc(i,o,5,0,2*Math.PI,!0),e.obj_canvas_2d.closePath(),e.obj_canvas_2d.fill();e.emitAfterMethod(t)}},{key:"methodAlpha",value:function(t){for(var e=this,n=e.getComputeWidth(),a=e.getComputeHeight(),i=e.obj_canvas_2d.getImageData(0,0,n,a),o=0;n*a*4>o;o+=4)i.data[o+3]=.5*i.data[o+3];e.obj_canvas_2d.putImageData(i,0,0),e.emitAfterMethod(t)}},{key:"methodGray",value:function(t){for(var e=this,n=e.getComputeWidth(),a=e.getComputeHeight(),i=e.obj_canvas_2d.getImageData(0,0,n,a),o=void 0,r=void 0,u=void 0,d=void 0,s=0;n*a*4>s;s+=4)o=i.data[s],r=i.data[s+1],u=i.data[s+2],d=parseInt((o+r+u)/3),i.data[s]=d,i.data[s+1]=d,i.data[s+2]=d;e.obj_canvas_2d.putImageData(i,0,0),e.emitAfterMethod(t)}},{key:"methodContrast",value:function(t){for(var e=this,n=e.getComputeWidth(),a=e.getComputeHeight(),i=e.obj_canvas_2d.getImageData(0,0,n,a),o=-50,r=259*(o+255)/(255*(259-o)),u=0;u<i.data.length;u+=4)i.data[u]=r*(i.data[u]-128)+128,i.data[u+1]=r*(i.data[u+1]-128)+128,i.data[u+2]=r*(i.data[u+2]-128)+128;e.obj_canvas_2d.putImageData(i,0,0),e.emitAfterMethod(t)}},{key:"emitAfterMethod",value:function(t){t=t||{};var e=this,n=e.obj_canvas.toDataURL(),a={origin_data:t.origin_data,data:n};void 0!==t.method_id&&(a.method_id=t.method_id),s.default.emitter.emit("step.image.success.computed",a)}}]),e}(h.default);e.default=l},function(t,e,n){"use strict";function a(t){return t&&t.__esModule?t:{"default":t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var a=e[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}return function(e,n,a){return n&&t(e.prototype,n),a&&t(e,a),e}}();Object.defineProperty(e,"__esModule",{value:!0});var r=n(1),u=a(r),d=function(){function t(){i(this,t);this.step_image=[]}return o(t,[{key:"getStepImage",value:function(){return this.step_image||[]}},{key:"setStepImage",value:function(t,e,n){var a=this;t=t||[],e=e||a.TIMMING_SET,n=n||{};var i=JSON.parse(JSON.stringify(t));this.step_image=i,u.default.emitter.emit("step.image.seted",e,n)}},{key:"pushStepData",value:function(t,e){var n=this;if(void 0===t.method_id){var a=JSON.parse(JSON.stringify(n.getStepImage())),i=a.length,o=JSON.parse(JSON.stringify(e)),r=o.length;if(r>=i){var d=o[i].method_id;t.method_id=d}}n.step_image.push(t),u.default.emitter.emit("step.image.pushed")}}]),t}();d.TIMMING_RESET="reset",d.TIMMING_SET="set",e.default=d},function(t,e,n){"use strict";function a(t){return t&&t.__esModule?t:{"default":t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var a=e[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}return function(e,n,a){return n&&t(e.prototype,n),a&&t(e,a),e}}();Object.defineProperty(e,"__esModule",{value:!0});var r=n(2),u=a(r),d=n(1),s=a(d),c=function(){function t(e,n){i(this,t),this.WEAK_MAP=new WeakMap,this.initConst=function(t){var e={};return this.WEAK_MAP.set(t,e),e},this.getConst=function(t){return this.WEAK_MAP.get(t)},this.addConst=function(t,e,n){var a=this.WEAK_MAP||{};return a[e]=n,this.WEAK_MAP.set(t,a),a},this.defaultAction(e,n)}return o(t,[{key:"setImageInitData",value:function(t){this.image_init_data=t,s.default.emitter.emit("init.data.changed",{origin_data:t})}},{key:"getMainSection",value:function(){return this.getConst(this).MAIN_SECTION}},{key:"getObjImagePreview",value:function(){return this.getConst(this).OBJ_IMAGE_PREVIEW}},{key:"getObjMethodSelect",value:function(){return this.getConst(this).OBJ_METHOD_SELECT}},{key:"getObjMethodResult",value:function(){return this.getConst(this).OBJ_METHOD_RESULT}},{key:"getObjCanvasPreview",value:function(){return this.getConst(this).OBJ_CANVAS_PREVIEW}},{key:"getObjCanvasPreview2d",value:function(){return this.getConst(this).OBJ_CANVAS_PREVIEW_2D}},{key:"getPreviewSize",value:function(){return this.getConst(this).PREVIEW_SIZE}},{key:"getObjUpload",value:function(){return this.getConst(this).OBJ_UPLOAD}},{key:"returnUploadSection",value:function(){var t=document.createElement("div"),e=document.createElement("input");return e.type="file",this.uploadAction.call(e,this),this.addConst(this,"OBJ_UPLOAD",e),t.appendChild(e),t}},{key:"returnCanvasSection",value:function(){var t=document.createElement("div"),e=this.getPreviewSize(),n=document.createElement("canvas");n.setAttribute("data-obj","preview"),n.width=e.width,n.height=e.height,this.addConst(this,"OBJ_CANVAS_PREVIEW",n),t.appendChild(n);var a=n.getContext("2d");return this.addConst(this,"OBJ_CANVAS_PREVIEW_2D",a),t}},{key:"returnMethodSection",value:function(){var t=document.createElement("div"),e=document.createElement("span");t.appendChild(e);var n=document.createElement("select");n.name="method";var a="";a+='<option value="">---請選擇---</option>',a+='<option value="'+u.default.METHOD_SNOW+'">'+u.default.METHOD_SNOW_NAME+"</option>",a+='<option value="'+u.default.METHOD_ALPHA+'">'+u.default.METHOD_ALPHA_NAME+"</option>",a+='<option value="'+u.default.METHOD_DOT+'">'+u.default.METHOD_DOT_NAME+"</option>",a+='<option value="'+u.default.METHOD_GRAY+'">'+u.default.METHOD_GRAY_NAME+"</option>",a+='<option value="'+u.default.METHOD_CONTRAST+'">'+u.default.METHOD_CONTRAST_NAME+"</option>",n.insertAdjacentHTML("afterbegin",a);var i=document.createElement("button");return i.innerText="新增效果",this.methodAddBtnAction.call(i,this),t.appendChild(n),t.appendChild(i),this.addConst(this,"OBJ_METHOD_SECTION",t),this.addConst(this,"OBJ_METHOD_RESULT",e),this.addConst(this,"OBJ_METHOD_SELECT",n),t}},{key:"makeTempate",value:function(){var t=this.getMainSection();if(void 0!==t){var e=this.returnUploadSection(),n=this.returnCanvasSection(),a=this.returnMethodSection();t.appendChild(e),t.appendChild(a),t.appendChild(n)}}},{key:"defaultAction",value:function(t,e){var n=this;if(n.initConst(this),e=e||{},e.width=e.width>0?e.width:600,e.height=e.height>0?e.height:450,t.nodeType>=1){var a=new Image;a.onload=function(t){var e=n.getObjCanvasPreview(),a=n.getObjCanvasPreview2d();a.clearRect(0,0,e.width,e.height),a.drawImage(this,0,0,e.width,e.height)},n.imagePreviewOnLoad.call(a,this),n.addConst(this,"MAIN_SECTION",t),n.addConst(this,"PREVIEW_SIZE",e),n.addConst(this,"OBJ_IMAGE_PREVIEW",a),n.makeTempate()}}},{key:"imagePreviewOnLoad",value:function(t){var e=this;e.onload=function(e){var n=t.getObjCanvasPreview(),a=t.getObjCanvasPreview2d();a.clearRect(0,0,n.width,n.height),a.drawImage(this,0,0,n.width,n.height)}}},{key:"uploadAction",value:function(t){var e=this;e.onchange=function(e){var n=window.URL||window.webkitURL,a=n.createObjectURL(this.files[0]);t.setImageInitData(a)}}},{key:"methodAddBtnAction",value:function(t){var e=this;e.onclick=function(e){var n=t.getObjMethodSelect().value;""!==n?s.default.emitter.emit("step.method.pushing",{method:n}):console.log("不應為空!!")}}},{key:"methodDeleteBtnAction",value:function(t){var e=this;e.onclick=function(t){s.default.emitter.emit("step.method.splicing",{method:e.data.method,method_id:e.data.method_id,method_btn:this})}}}]),t}();e.default=c},function(t,e,n){"use strict";function a(t){return t&&t.__esModule?t:{"default":t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var o=n(2),r=a(o),u=n(1),d=a(u),s=n(9),c=a(s),h=n(7),l=a(h),f=n(8),m=a(f),p=n(11),_=a(p),g=function v(t,e){i(this,v),e=e||{};var n=new c.default(t,e),a=new _.default,o=new m.default,u=new l.default;void 0!==t&&(d.default.emitter.on("step.image.final.step.computed",function(t){var e=arguments[0];n.getObjImagePreview().src=e.data}),d.default.emitter.on("step.method.show.adding",function(t){var e=arguments[0],a=document.createElement("span");a.style.marginRight="20px",a.data=a.data||{},a.data.method_id=e.method_id,a.data.method=e.method,a.setAttribute("data-method-id",e.method_id),a.insertAdjacentHTML("beforeend",r.default.getConstNameByEn(e.method)),n.getObjMethodResult().appendChild(a),n.methodDeleteBtnAction.call(a,n);var i=o.getStepImage();if(i instanceof Array==!0&&i.length>0){u.getComputeWidth(),u.getComputeHeight();d.default.emitter.emit("step.image.success.loaded",{origin_data:i[i.length-1].data,method:e.method})}}),d.default.emitter.on("step.method.show.deleting",function(t){var e=arguments[0],a=o.getStepImage();if(a instanceof Array==!0&&a.length>0){for(var i=a.length,r=[],u=0;i>u&&a[u].method_id!==e.method_id;u++)r.push(a[u]);var d=r.length;d<a.length&&o.setStepImage(r)}n.getObjMethodResult().removeChild(e.method_btn)}),d.default.emitter.on("step.method.pushing",function(){a.pushStepMethod.apply(a,arguments)}),d.default.emitter.on("step.method.splicing",function(){a.spliceStepMethod.apply(a,arguments)}),d.default.emitter.on("step.method.option.added",function(t){var e=arguments[0];d.default.emitter.emit("step.method.show.adding",e)}),d.default.emitter.on("step.method.option.deleted",function(t){var e=arguments[0];d.default.emitter.emit("step.method.show.deleting",e)}),d.default.emitter.on("init.data.changed",function(t){var e=arguments[0];o.setStepImage([],m.default.TIMMING_RESET,e)}),d.default.emitter.on("step.image.success.loaded",function(t){var e=arguments[0],n=e.method;n===r.default.METHOD_SNOW?u.methodSnow(e):n===r.default.METHOD_DOT?u.methodDot(e):n===r.default.METHOD_ALPHA?u.methodAlpha(e):n===r.default.METHOD_GRAY?u.methodGray(e):n===r.default.METHOD_CONTRAST?u.methodContrast(e):u.methodOrigin(e)}),d.default.emitter.on("step.image.error.loaded",function(t){}),d.default.emitter.on("step.image.success.computed",function(t){var e=arguments[0];e&&"string"==typeof e.origin_data&&""!==e.origin_data&&o.pushStepData(e,a.getStepMethod())}),d.default.emitter.on("step.image.seted",function(t){var e=arguments[0],n=arguments[1]||{};e===m.default.TIMMING_RESET?u.changeData("",n.origin_data):d.default.emitter.emit("step.image.pushed")}),d.default.emitter.on("step.image.pushed",function(t){var e=(arguments[0],arguments[1]||{},o.getStepImage().length),n=a.getStepMethod(),i=o.getStepImage(),r=i[i.length-1];e<n.length?u.changeData(n[e].method,r.data):(d.default.emitter.emit("step.image.final.step.computed",r),console.log("******************* 預覽圖片!! *******************"))}))};e.default=g},function(t,e,n){"use strict";function a(t){return t&&t.__esModule?t:{"default":t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var a=e[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}return function(e,n,a){return n&&t(e.prototype,n),a&&t(e,a),e}}();Object.defineProperty(e,"__esModule",{value:!0});var r=n(2),u=(a(r),n(1)),d=a(u),s=function(){function t(){i(this,t),this.init_step_method=[{method:"",method_id:d.default.createMethodId()}];var e=[];this.step_method=this.init_step_method.concat(e)}return o(t,[{key:"getStepMethod",value:function(){return this.step_method||[]}},{key:"pushStepMethod",value:function(t){void 0!==t&&(t.method_id=t.method_id||d.default.createMethodId(),this.step_method.push(t),d.default.emitter.emit("step.method.option.added",t))}},{key:"spliceStepMethod",value:function(t){if(void 0!==t&&"string"==typeof t.method_id&&""!==t.method_id){for(var e=void 0,n=0;n<this.step_method.length;n++)if(this.step_method[n].method_id===t.method_id){e=n;break}e>=0&&(this.step_method.splice(e,1),d.default.emitter.emit("step.method.option.deleted",t))}}}]),t}();e.default=s}]);