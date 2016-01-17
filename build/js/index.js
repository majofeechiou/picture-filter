!function(t){function e(i){if(a[i])return a[i].exports;var n=a[i]={exports:{},id:i,loaded:!1};return t[i].call(n.exports,n,n.exports,e),n.loaded=!0,n.exports}var a={};return e.m=t,e.c=a,e.p="",e(0)}([function(t,e,a){t.exports=a(2)},function(t,e){"use strict";function a(t){return t?i(t):void 0}function i(t){for(var e in a.prototype)t[e]=a.prototype[e];return t}t.exports=a,a.prototype.on=a.prototype.addEventListener=function(t,e){return this._callbacks=this._callbacks||{},(this._callbacks["$"+t]=this._callbacks["$"+t]||[]).push(e),this},a.prototype.once=function(t,e){function a(){this.off(t,a),e.apply(this,arguments)}return a.fn=e,this.on(t,a),this},a.prototype.off=a.prototype.removeListener=a.prototype.removeAllListeners=a.prototype.removeEventListener=function(t,e){if(this._callbacks=this._callbacks||{},0==arguments.length)return this._callbacks={},this;var a=this._callbacks["$"+t];if(!a)return this;if(1==arguments.length)return delete this._callbacks["$"+t],this;for(var i,n=0;n<a.length;n++)if(i=a[n],i===e||i.fn===e){a.splice(n,1);break}return this},a.prototype.emit=function(t){this._callbacks=this._callbacks||{};var e=[].slice.call(arguments,1),a=this._callbacks["$"+t];if(a){a=a.slice(0);for(var i=0,n=a.length;n>i;++i)a[i].apply(this,e)}return this},a.prototype.listeners=function(t){return this._callbacks=this._callbacks||{},this._callbacks["$"+t]||[]},a.prototype.hasListeners=function(t){return!!this.listeners(t).length}},function(t,e,a){"use strict";a(3)},function(t,e,a){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var n=function(){function t(t,e){for(var a=0;a<e.length;a++){var i=e[a];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,a,i){return a&&t(e.prototype,a),i&&t(e,i),e}}();!function(t){var e=a(1),o=function(){function e(t,a){i(this,e),this.WEAK_MAP=new WeakMap,this.initConst=function(t){var e={};return this.WEAK_MAP.set(t,e),e},this.getConst=function(t){return this.WEAK_MAP.get(t)},this.addConst=function(t,e,a){var i=this.WEAK_MAP||{};return i[e]=a,this.WEAK_MAP.set(t,i),i},this.defaultAction(t,a)}return n(e,[{key:"setImageInitData",value:function(t){this.image_init_data=t,c.emit("initData.changed",{origin_data:t})}},{key:"getMainSection",value:function(){return this.getConst(this).MAIN_SECTION}},{key:"getObjImagePreview",value:function(){return this.getConst(this).OBJ_IMAGE_PREVIEW}},{key:"getObjMethodSelect",value:function(){return this.getConst(this).OBJ_METHOD_SELECT}},{key:"getObjMethodResult",value:function(){return this.getConst(this).OBJ_METHOD_RESULT}},{key:"getObjCanvasPreview",value:function(){return this.getConst(this).OBJ_CANVAS_PREVIEW}},{key:"getPreviewSize",value:function(){return this.getConst(this).PREVIEW_SIZE}},{key:"getObjUpload",value:function(){return this.getConst(this).OBJ_UPLOAD}},{key:"returnUploadSection",value:function(){var t=document.createElement("div"),e=document.createElement("input");return e.type="file",this.uploadAction.call(e,this),this.addConst(this,"OBJ_UPLOAD",e),t.appendChild(e),t}},{key:"returnCanvasSection",value:function(){var t=document.createElement("div"),e=this.getPreviewSize(),a=document.createElement("canvas");return a.setAttribute("data-obj","preview"),a.width=e.width,a.height=e.height,this.addConst(this,"OBJ_CANVAS_PREVIEW",a),t.appendChild(a),t}},{key:"returnMethodSection",value:function(){var t=document.createElement("div"),e=document.createElement("span");t.appendChild(e);var a=document.createElement("select");a.name="method";var i="";i+='<option value="">---請選擇---</option>',i+='<option value="'+d.METHOD_SNOW+'">'+d.METHOD_SNOW_NAME+"</option>",i+='<option value="'+d.METHOD_ALPHA+'">'+d.METHOD_ALPHA_NAME+"</option>",i+='<option value="'+d.METHOD_DOT+'">'+d.METHOD_DOT_NAME+"</option>",i+='<option value="'+d.METHOD_GRAY+'">'+d.METHOD_GRAY_NAME+"</option>",i+='<option value="'+d.METHOD_CONTRAST+'">'+d.METHOD_CONTRAST_NAME+"</option>",a.insertAdjacentHTML("afterbegin",i);var n=document.createElement("button");return n.innerText="新增效果",this.methodAddBtnAction.call(n,this),t.appendChild(a),t.appendChild(n),this.addConst(this,"OBJ_METHOD_SECTION",t),this.addConst(this,"OBJ_METHOD_RESULT",e),this.addConst(this,"OBJ_METHOD_SELECT",a),t}},{key:"makeTempate",value:function(){var t=this,e=this.getMainSection();if(void 0!==e){var a=this.returnUploadSection(),i=this.returnCanvasSection(),n=this.returnMethodSection();c.on("imageData.final.step.computed",function(e){var a=arguments[0];t.getObjImagePreview().src=a.data}),c.on("method.option.adding",function(e){var a=arguments[0];t.getObjMethodResult().insertAdjacentHTML("beforeend",d.getConstNameByEn(a.method))}),e.appendChild(a),e.appendChild(n),e.appendChild(i)}}},{key:"defaultAction",value:function(t,e){var a=this;if(a.initConst(this),e=e||{},e.width=e.width>0?e.width:600,e.height=e.height>0?e.height:450,t.nodeType>=1){var i=new Image;i.onload=function(t){var e=a.getObjCanvasPreview(),i=e.getContext("2d");i.drawImage(this,0,0,e.width,e.height)},a.imagePreviewOnLoad.call(i,this),a.addConst(this,"MAIN_SECTION",t),a.addConst(this,"PREVIEW_SIZE",e),a.addConst(this,"OBJ_IMAGE_PREVIEW",i),a.makeTempate()}}},{key:"imagePreviewOnLoad",value:function(t){var e=this;e.onload=function(e){var a=t.getObjCanvasPreview(),i=a.getContext("2d");i.drawImage(this,0,0,a.width,a.height)}}},{key:"uploadAction",value:function(e){var a=this;a.onchange=function(a){var i=t.URL||t.webkitURL,n=i.createObjectURL(this.files[0]);e.setImageInitData(n)}}},{key:"methodAddBtnAction",value:function(t){var e=this;console.log("_obj_self :: ",e),e.onclick=function(e){var a=t.getObjMethodSelect().value;console.log("_str_method_value :: ",a),""!==a?c.emit("method.option.adding",{method:a}):console.log("不應為空!!")}}}]),e}(),s=function(){function t(){i(this,t);var e=this;e.obj_canvas=document.createElement("canvas"),e.obj_canvas_2d=e.obj_canvas.getContext("2d"),e.obj_image=new Image,c.on("imageData.step.success.loaded",function(t){var a=arguments[0],i=a.painter_method;console.log("METHOD :: ",i),i===d.METHOD_SNOW?e.methodSnow(a):i===d.METHOD_DOT?e.methodDot(a):i===d.METHOD_ALPHA?e.methodAlpha(a):i===d.METHOD_GRAY?e.methodGray(a):i===d.METHOD_CONTRAST?e.methodContrast(a):e.methodOrigin(a)}),e.obj_image.onload=function(){if("string"==typeof this.src&&""!==this.src){var t=this.width,a=this.height;e.obj_canvas.width=t,e.obj_canvas.height=a,e.obj_canvas_2d.drawImage(this,0,0,t,a),c.emit("imageData.step.success.loaded",{origin_data:this.src,painter_method:e.getPainterMethod(),image_origin_width:t,image_origin_height:a})}else console.log("***")},e.obj_image.error=function(){c.emit("imageData.step.error.loaded",{origin_data:this.src})}}return n(t,[{key:"getPainterMethod",value:function(){var t=this;return t.painter_method}},{key:"changeData",value:function(t,e){var a=this;a.painter_method=t,a.obj_image.src=e}},{key:"methodOrigin",value:function(t){var e=this,a=e.obj_canvas.toDataURL();c.emit("imageData.step.success.computed",{origin_data:t.origin_data,data:a})}},{key:"methodSnow",value:function(t){for(var e=this,a=t.image_origin_width,i=t.image_origin_height,n=void 0,o=void 0,s=0;500>=s;s++)n=Math.floor(Math.random()*a),o=Math.floor(Math.random()*i),e.obj_canvas_2d.fillStyle="white",e.obj_canvas_2d.beginPath(),e.obj_canvas_2d.arc(n,o,3,0,2*Math.PI,!0),e.obj_canvas_2d.closePath(),e.obj_canvas_2d.fill();e.emitAfterMethod(t)}},{key:"methodDot",value:function(t){for(var e=this,a=t.image_origin_width,i=t.image_origin_height,n=void 0,o=void 0,s=0;150>=s;s++)n=Math.floor(Math.random()*a),o=Math.floor(Math.random()*i),e.obj_canvas_2d.fillStyle="black",e.obj_canvas_2d.beginPath(),e.obj_canvas_2d.arc(n,o,5,0,2*Math.PI,!0),e.obj_canvas_2d.closePath(),e.obj_canvas_2d.fill();e.emitAfterMethod(t)}},{key:"methodAlpha",value:function(t){for(var e=this,a=t.image_origin_width,i=t.image_origin_height,n=e.obj_canvas_2d.getImageData(0,0,a,i),o=0;a*i*4>o;o+=4)n.data[o+3]=128;e.obj_canvas_2d.putImageData(n,0,0),e.emitAfterMethod(t)}},{key:"methodGray",value:function(t){for(var e=this,a=t.image_origin_width,i=t.image_origin_height,n=e.obj_canvas_2d.getImageData(0,0,a,i),o=void 0,s=void 0,r=void 0,h=void 0,d=0;a*i*4>d;d+=4)o=n.data[d],s=n.data[d+1],r=n.data[d+2],h=parseInt((o+s+r)/3),n.data[d]=h,n.data[d+1]=h,n.data[d+2]=h;e.obj_canvas_2d.putImageData(n,0,0),e.emitAfterMethod(t)}},{key:"methodContrast",value:function(t){for(var e=this,a=t.image_origin_width,i=t.image_origin_height,n=e.obj_canvas_2d.getImageData(0,0,a,i),o=-50,s=259*(o+255)/(255*(259-o)),r=0;r<n.data.length;r+=4)n.data[r]=s*(n.data[r]-128)+128,n.data[r+1]=s*(n.data[r+1]-128)+128,n.data[r+2]=s*(n.data[r+2]-128)+128;e.obj_canvas_2d.putImageData(n,0,0),e.emitAfterMethod(t)}},{key:"emitAfterMethod",value:function(t){var e=this,a=e.obj_canvas.toDataURL();c.emit("imageData.step.success.computed",{origin_data:t.origin_data,data:a})}}]),t}(),r=function l(){i(this,l);var t=this;this.step_data=[],c.on("initData.changed",function(e){t.step_data=[];var a=arguments[0];u.changeData("",a.origin_data)}),c.on("imageData.step.success.computed",function(e){var a=arguments[0];if(a&&"string"==typeof a.origin_data&&""!==a.origin_data){t.step_data.push(a);var i=t.step_data.length,n=d.getStepMethod();i<n.length?u.changeData(n[i].method,a.data):c.emit("imageData.final.step.computed",a)}}),c.emit("imageData.step.success.computed")},h=function(){function t(){i(this,t),this.METHOD_SNOW="SNOW",this.METHOD_ALPHA="ALPHA",this.METHOD_DOT="DOT",this.METHOD_GRAY="GRAY",this.METHOD_CONTRAST="CONTRAST",this.METHOD_SNOW_NAME="雪花",this.METHOD_ALPHA_NAME="透明",this.METHOD_DOT_NAME="黑點",this.METHOD_GRAY_NAME="灰階",this.METHOD_CONTRAST_NAME="對比",this.init_step_method=[{method:""}];var e=[{method:this.METHOD_CONTRAST}];this.step_method=this.init_step_method.concat(e)}return n(t,[{key:"getStepMethod",value:function(){return this.step_method||[]}},{key:"getConstNameByEn",value:function(t){return"string"==typeof t&&""!==t?this["METHOD_"+t+"_NAME"]:void 0}}]),t}();t.mainImageGilter=o;var d=new h,c=new e,u=(new r,new s),_=document.querySelectorAll('[data-majo="picture-filter"]');new o(_[0])}(window)}]);