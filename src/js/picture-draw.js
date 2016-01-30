
function PictureDraw ( obj_main, json_size ) {

	json_size = json_size || {} ;

	let Emitter = require('../../node_modules/component-emitter/index.js'); // 監聽事件

	class MainImageFilter{

		constructor( obj, json_size ){

			this.WEAK_MAP = new WeakMap();

			this.initConst = function( object ){
				let data = {};
				this.WEAK_MAP.set(object, data);
				return data;
			};
			this.getConst = function( object ){
				return this.WEAK_MAP.get(object);
			};
			this.addConst = function( object, str_key, data_value ){
				let data = this.WEAK_MAP || {};
				data[str_key] = data_value
				this.WEAK_MAP.set(object, data);
				return data;
			};

			this.defaultAction( obj, json_size );

		}

		// 抓原始圖片資料
		setImageInitData( str_bas64 ){
			this.image_init_data = str_bas64 ;
			emitter.emit('initData.changed', {
				origin_data: str_bas64
			});
		}

		// 得到用來產生版形的區塊
		getMainSection(){
			return this.getConst(this).MAIN_SECTION;
		}

		// 在預覽產生前，把這東西元件設定src
		getObjImagePreview(){
			return this.getConst(this).OBJ_IMAGE_PREVIEW;
		}

		// 效果選項的元件
		getObjMethodSelect(){
			return this.getConst(this).OBJ_METHOD_SELECT;
		}

		// 選出來什麼效果選項的元件
		getObjMethodResult(){
			return this.getConst(this).OBJ_METHOD_RESULT;
		}

		// 得到Canvas預覽的區塊
		getObjCanvasPreview(){
			return this.getConst(this).OBJ_CANVAS_PREVIEW;
		}

		// 得到Canvas預覽的區塊
		getObjCanvasPreview2d(){
			return this.getConst(this).OBJ_CANVAS_PREVIEW_2D;
		}

		// 得到Canvas預覽的區塊長寬
		getPreviewSize(){
			return this.getConst(this).PREVIEW_SIZE;
		}

		// 得到上傳圖片的按鈕
		getObjUpload(){
			return this.getConst(this).OBJ_UPLOAD;
		}

		// 上傳檔案
		returnUploadSection(){
			let _obj_upload_section 	= document.createElement('div');
			let _obj_upload 	= document.createElement('input');
			_obj_upload.type	= "file";
			this.uploadAction.call( _obj_upload, this );
			this.addConst( this, 'OBJ_UPLOAD', _obj_upload );
			_obj_upload_section.appendChild(_obj_upload);
			return _obj_upload_section;
		}

		// 預覽圖片
		returnCanvasSection(){
			let _obj_canvas_section 	= document.createElement('div');
			let _json_size  = this.getPreviewSize(),
				_obj_canvas_preview = document.createElement( 'canvas' );
			_obj_canvas_preview.setAttribute('data-obj','preview');
			_obj_canvas_preview.width = _json_size.width;
			_obj_canvas_preview.height = _json_size.height;
			this.addConst( this, 'OBJ_CANVAS_PREVIEW', _obj_canvas_preview );

			_obj_canvas_section.appendChild(_obj_canvas_preview);

			let _obj_canvas_2d = _obj_canvas_preview.getContext('2d');
			this.addConst( this, 'OBJ_CANVAS_PREVIEW_2D', _obj_canvas_2d );

			return _obj_canvas_section;
		}

		// 新增效果
		returnMethodSection(){
			let _obj_method_section = document.createElement('div');

			// 選出了哪些效果
			let _obj_method_result = document.createElement('span');
			_obj_method_section.appendChild(_obj_method_result);

			// 下拉式選單
			let _obj_method_select = document.createElement('select');
			_obj_method_select.name = 'method';
			let _str_method_select = '';
			_str_method_select += '<option value="">---請選擇---</option>';
			_str_method_select += '<option value="'+stepMethod.METHOD_SNOW+'">'+stepMethod.METHOD_SNOW_NAME+'</option>';
			_str_method_select += '<option value="'+stepMethod.METHOD_ALPHA+'">'+stepMethod.METHOD_ALPHA_NAME+'</option>';
			_str_method_select += '<option value="'+stepMethod.METHOD_DOT+'">'+stepMethod.METHOD_DOT_NAME+'</option>';
			_str_method_select += '<option value="'+stepMethod.METHOD_GRAY+'">'+stepMethod.METHOD_GRAY_NAME+'</option>';
			_str_method_select += '<option value="'+stepMethod.METHOD_CONTRAST+'">'+stepMethod.METHOD_CONTRAST_NAME+'</option>';
			_obj_method_select.insertAdjacentHTML('afterbegin',_str_method_select);

			// 新增按鈕
			let _obj_method_button = document.createElement('button');
			_obj_method_button.innerText = '新增效果';
			this.methodAddBtnAction.call( _obj_method_button, this );
			_obj_method_section.appendChild(_obj_method_select);
			_obj_method_section.appendChild(_obj_method_button);

			this.addConst( this, 'OBJ_METHOD_SECTION', _obj_method_section );
			this.addConst( this, 'OBJ_METHOD_RESULT', _obj_method_result );
			this.addConst( this, 'OBJ_METHOD_SELECT', _obj_method_select );
			return _obj_method_section;
		}

		// 用dom去產生頁面上的排版
		makeTempate(){

			let _scope = this;

			let _obj_main = this.getMainSection();

			if( _obj_main!==undefined ){

				// 上傳檔案
				let _obj_upload_section = this.returnUploadSection();

				// 預覽圖片
				let _obj_canvas_section = this.returnCanvasSection();

				// 新增效果
				let _obj_method_section = this.returnMethodSection();

				// 用完運算結束後，我們要用出預覽圖
				emitter.on('imageData.final.step.computed', function(e){
					let _json_data = arguments[0];
					_scope.getObjImagePreview().src = _json_data.data;
				});

				// 新增效果
				emitter.on('stepMethod.show.adding', function(e){
					// 新增顯示method的文字
					let _json_data = arguments[0];
					let _obj_result = document.createElement('span');
					_obj_result.style.marginRight = '20px' ;
					_obj_result.data = _obj_result.data || {} ;
					_obj_result.data.method_id = _json_data.method_id ;
					_obj_result.data.method = _json_data.method ;
					_obj_result.setAttribute('data-method-id',_json_data.method_id);
					_obj_result.insertAdjacentHTML('beforeend', stepMethod.getConstNameByEn(_json_data.method) );
					_scope.getObjMethodResult().appendChild(_obj_result);

					_scope.methodDeleteBtnAction.call( _obj_result, _scope );

					// 以下是實際執行新的圖片運算工作

					let _sary_step_data = imageDataComputeProcess.getStepData();

					if( (_sary_step_data instanceof Array === true) && _sary_step_data.length>0 ){

						let _num_width = imageDataComputeMethod.getComputeWidth();
						let _num_height = imageDataComputeMethod.getComputeHeight();

						emitter.emit('imageData.step.success.loaded', {
							origin_data: _sary_step_data[(_sary_step_data.length-1)].data, // 目前得到的最後一次運算結果
							method: _json_data.method
						});

					}

				});
				emitter.on('stepMethod.show.deleting', function(e){
					let _json_data = arguments[0];
					let _sary_step_data = imageDataComputeProcess.getStepData();

					if( (_sary_step_data instanceof Array === true) && _sary_step_data.length>0 ){

								// let _num_width = imageDataComputeMethod.getComputeWidth();
								// let _num_height = imageDataComputeMethod.getComputeHeight();

								// emitter.emit('imageData.step.success.loaded', {
								// 	origin_data: _sary_step_data[(_sary_step_data.length-1)].data, // 目前得到的最後一次運算結果
								// 	method: _json_data.method
								// });

						let _num_step_data = _sary_step_data.length;

						let _sary_new_step_data = [];

						for( let i=0; i<_num_step_data; i++ ){
							console.log( '----i', i );
							if( _sary_step_data[i].method_id===_json_data.method_id ){
								break;
							}else{
								_sary_new_step_data.push( _sary_step_data[i] );
							}
						}

						console.log( '_sary_new_step_data :: ', _sary_new_step_data );
						console.log( 'stepMethod.getStepMethod() :: ', stepMethod.getStepMethod() );

						let _num_new_step_data_length = _sary_new_step_data.length;

						if( _num_new_step_data_length<_sary_step_data.length ){
							// console.log('********** 改成emiiter出去來處理會更好!! **********');
							imageDataComputeProcess.setStepData( _sary_new_step_data );

								// setTimeout(function(){

								// 	let _sary_step_method = stepMethod.getStepMethod();
								// 	if( _sary_step_method.length>_num_new_step_data_length ){

								// 		console.log('*********************在cut資料後，如何進行後面的運算動作，並用出預覽來*********************');

								// 		let _json_next_step = _sary_step_method[_num_new_step_data_length];

								// 		// let _json = {
								// 		// 	origin_data: _sary_new_step_data[(_num_new_step_data_length-1)].data, // 目前得到的最後一次運算結果
								// 		// 	method: _json_next_step.method,
								// 		// 	method_id: _json_next_step.method_id
								// 		// };

								// 		// console.log('_sary_new_step_data :: ', _sary_new_step_data);
								// 		// console.log('_json :: ', _json);
								// 		// console.log('imageDataComputeProcess.getStepData() :: ', imageDataComputeProcess.getStepData());

								// 		// emitter.emit('imageData.step.success.loaded', _json);

								// 		// console.log( '_num_new_step_data_length :: ', _num_new_step_data_length );
								// 		console.log( 'c :: ', _sary_new_step_data.length, _sary_new_step_data );
								// 		console.log( 'a :: ', _sary_new_step_data[(_num_new_step_data_length-1)] );
								// 		// console.log( 'b :: ', _json_next_step );
								// 		console.log( '_json_data :: ', _json_data, '.........................................' );

								// 		// 要改?!
								// 		setTimeout(function(){
								// 			emitter.emit('imageData.step.success.loaded', {
								// 				origin_data: _sary_new_step_data[(_num_new_step_data_length-1)].data,
								// 				method: _json_next_step.method,
								// 				method_id: _json_next_step.method_id
								// 			});
								// 		},1000);


								// 					// NONONONO!!
								// 					// emitter.emit('imageData.step.success.computed', {
								// 					// 	origin_data: _sary_new_step_data[(_num_new_step_data_length-1)].origin_data,
								// 					// 	data: _sary_new_step_data[(_num_new_step_data_length-1)].data
								// 					// });

								// 	}else if( _sary_step_method.length===_num_new_step_data_length ){
								// 		console.log('end here !!!');

								// 		// eData.step.success.compu
								// 	}

								// },1000);

						}
	
					}

					_scope.getObjMethodResult().removeChild(_json_data.method_btn);

				});
				emitter.on('stepMethod.option.added', function(e){
					let _json_data = arguments[0];
					emitter.emit('stepMethod.show.adding', _json_data); // 要改了，先不傳這事件?!
				});
				emitter.on('stepMethod.option.deleted', function(e){
					console.log('stepMethod.option.deleted');
					let _json_data = arguments[0];
					emitter.emit('stepMethod.show.deleting', _json_data); // 要改了，先不傳這事件?!
				});

				_obj_main.appendChild(_obj_upload_section);
				_obj_main.appendChild(_obj_method_section);
				_obj_main.appendChild(_obj_canvas_section);

			}

		}

		defaultAction( obj, json_size ){
			let _scope = this;
			_scope.initConst(this);
			json_size = json_size || {} ;
			json_size.width = (json_size.width>0)? json_size.width : 600 ; // 預覽圓片大小
			json_size.height = (json_size.height>0)? json_size.height : 450 ; // 預覽圓片大小

			if( obj.nodeType>=1 ){

				let _obj_image = new Image();
				_obj_image.onload = function(e){
					let _obj_canvas_preview = _scope.getObjCanvasPreview();
					let _obj_canvas_2d = _scope.getObjCanvasPreview2d();
					_obj_canvas_2d.clearRect(0, 0, _obj_canvas_preview.width, _obj_canvas_preview.height);
					_obj_canvas_2d.drawImage(this, 0, 0, _obj_canvas_preview.width, _obj_canvas_preview.height);
				}

				_scope.imagePreviewOnLoad.call( _obj_image, this );

				_scope.addConst( this, 'MAIN_SECTION', obj );
				_scope.addConst( this, 'PREVIEW_SIZE', json_size );
				_scope.addConst( this, 'OBJ_IMAGE_PREVIEW', _obj_image );
				_scope.makeTempate();
			}

		}

		imagePreviewOnLoad( scope_calss ){
			let _obj_self = this;
			_obj_self.onload = function(e){
				let _obj_canvas_preview = scope_calss.getObjCanvasPreview();
				let _obj_canvas_2d = scope_calss.getObjCanvasPreview2d();
				_obj_canvas_2d.clearRect(0, 0, _obj_canvas_preview.width, _obj_canvas_preview.height);
				_obj_canvas_2d.drawImage(this, 0, 0, _obj_canvas_preview.width, _obj_canvas_preview.height);
			}
		}

		uploadAction( scope_calss ){
			let _obj_self = this;
			_obj_self.onchange = function( e ){ // 從頭更換圖片
				let windowURL = window.URL || window.webkitURL;
				let _str_image_data = windowURL.createObjectURL(this.files[0]);
				scope_calss.setImageInitData( _str_image_data );
			}
		}

		// 新增效果的按鈕
		methodAddBtnAction( scope_calss ){
			let _obj_self = this;
			_obj_self.onclick = function( e ){
				let _str_method_value = scope_calss.getObjMethodSelect().value;
				if( _str_method_value!=='' ){
					stepMethod.pushStepMethod({
						method: _str_method_value
					});
				}else{
					console.log( '不應為空!!' );
				}
			}
		}

		// 刪除效果的按鈕
		methodDeleteBtnAction( scope_calss ){
			let _obj_self = this;
			_obj_self.onclick = function( e ){
				// debug
				// 先直接發出刪除methodid的事件，之後再來擴充
				stepMethod.spliceStepMethod({
					method: _obj_self.data.method,
					method_id: _obj_self.data.method_id,
					method_btn:this
				});
			}
		}

	}

	class ImageDataComputeSize{

		// 圖片運算是用多大寬度運算出來的
		setComputeWidth( num ){
			this.compute_width = num || 0 ;
		}

		// 圖片運算是用多大高度運算出來的
		setComputeHeight( num ){
			this.compute_height = num || 0 ;
		}

		// 圖片運算是用多大寬度運算出來的
		getComputeWidth(){
			return this.compute_width;
		}

		// 圖片運算是用多大高度運算出來的
		getComputeHeight(){
			return this.compute_height;
		}

	}

	// 運算的方式
	class ImageDataComputeMethod extends ImageDataComputeSize{
		constructor(){
			super();

			let _scope = this;

			_scope.obj_canvas = document.createElement('canvas');
			_scope.obj_canvas_2d = _scope.obj_canvas.getContext('2d');

			_scope.obj_image = new Image();

			emitter.on('imageData.step.success.loaded', function(e){
				let _json = arguments[0],
					_str_method = _json.method;

				console.log('METHOD :: ', _str_method);

			// let _json_output = // ===================== fixed it ?

				if( _str_method===stepMethod.METHOD_SNOW ){
					_scope.methodSnow( _json );

				}else if( _str_method===stepMethod.METHOD_DOT ){
					_scope.methodDot( _json );

				}else if( _str_method===stepMethod.METHOD_ALPHA ){
					_scope.methodAlpha( _json );

				}else if( _str_method===stepMethod.METHOD_GRAY ){
					_scope.methodGray( _json );

				}else if( _str_method===stepMethod.METHOD_CONTRAST ){
					_scope.methodContrast( _json );

				}else{
					_scope.methodOrigin( _json );
				}

			});

			_scope.obj_image.onload = function(){

				if( (typeof this.src === 'string') && this.src!=='' ){

					let _num_width = this.width;
					let _num_height = this.height;
					_scope.obj_canvas.width = _num_width ;
					_scope.obj_canvas.height = _num_height ;
					_scope.obj_canvas_2d.drawImage(this, 0, 0, _num_width, _num_height);

					_scope.setComputeWidth( _num_width ); // 在此先用圖片本身的長寬去做的
					_scope.setComputeHeight( _num_height ); // 在此先用圖片本身的長寬去做的

					emitter.emit('imageData.step.success.loaded', {
						origin_data: this.src,
						method: _scope.getPainterMethod()
					});

				}else{
					console.log( '***' );
				}

			}

			_scope.obj_image.error = function(){
				emitter.emit('imageData.step.error.loaded', {
					origin_data: this.src
				});
			}

		}

		getPainterMethod(){
			let _scope = this;
			return _scope.painter_method;
		}

		changeData( str_painter_method, str_base64 ){
			let _scope = this;
			_scope.painter_method = str_painter_method;
			_scope.obj_image.src = str_base64;
		}

		// 傳來什麼，就如實地回傳
		methodOrigin( json ){
			let _scope = this;
				// let _data_url = _scope.obj_canvas.toDataURL();

				// emitter.emit('imageData.step.success.computed', {
				// 	origin_data: json.origin_data,
				// 	data: _data_url
				// });

			_scope.emitAfterMethod( json );

		}

		// 雪花
		// https://msdn.microsoft.com/zh-cn/library/gg589486(v=vs.85).aspx
		methodSnow( json ){
			let _scope = this;
			let _num_width = _scope.getComputeWidth(),
				_num_height = _scope.getComputeHeight();

			let x,
				y;

			// Draw snowflakes. // 雪花
			for (let i = 0; i <= 500; i++) {
				// Get random positions for flakes.
				x = Math.floor(Math.random() * _num_width);
				y = Math.floor(Math.random() * _num_height);

				// Make the flakes white
				_scope.obj_canvas_2d.fillStyle = "white";

				// Draw an individual flakes.
				_scope.obj_canvas_2d.beginPath();
				_scope.obj_canvas_2d.arc(x, y, 3, 0, Math.PI * 2, true);
				_scope.obj_canvas_2d.closePath();
				_scope.obj_canvas_2d.fill();
			}

			_scope.emitAfterMethod( json );

		}

		// 在照片中添加纹理
		// https://msdn.microsoft.com/zh-cn/library/gg589486(v=vs.85).aspx
		methodDot( json ){
			let _scope = this;
			let _num_width = _scope.getComputeWidth(),
				_num_height = _scope.getComputeHeight();

			let x,
				y;

			// Draw snowflakes. // 雪花
			for (let i = 0; i <= 150; i++) {
				// Get random positions for flakes.
				x = Math.floor(Math.random() * _num_width);
				y = Math.floor(Math.random() * _num_height);

				// Make the flakes white
				_scope.obj_canvas_2d.fillStyle = "black";

				// Draw an individual flakes.
				_scope.obj_canvas_2d.beginPath();
				_scope.obj_canvas_2d.arc(x, y, 5, 0, Math.PI * 2, true);
				_scope.obj_canvas_2d.closePath();
				_scope.obj_canvas_2d.fill();
			}

			_scope.emitAfterMethod( json );
			
		}

		// 透明
		// https://msdn.microsoft.com/zh-cn/library/gg589493(v=vs.85).aspx
		methodAlpha( json ){
			let _scope = this;

			let _num_width = _scope.getComputeWidth(),
				_num_height = _scope.getComputeHeight();

	        let _json_image_data = _scope.obj_canvas_2d.getImageData(0, 0, _num_width, _num_height);

	        // Loop through data.
	        for (var i = 0; i < (_num_width*_num_height*4); i += 4) {

	          // First bytes are red bytes.        
	          // Second bytes are green bytes.
	          // Third bytes are blue bytes.
	          // Fourth bytes are alpha bytes
	          // Test of alpha channel at 50%.
	          _json_image_data.data[i + 3] = 128;
	        }
			_scope.obj_canvas_2d.putImageData(_json_image_data, 0, 0);

			_scope.emitAfterMethod( json );

		}

		// 灰階
		// https://msdn.microsoft.com/zh-cn/library/gg589527(v=vs.85).aspx
		methodGray( json ){
			let _scope = this;

			let _num_width = _scope.getComputeWidth(),
				_num_height = _scope.getComputeHeight();

	        let _json_image_data = _scope.obj_canvas_2d.getImageData(0, 0, _num_width, _num_height);

			let _num_red,
				_num_green,
				_num_blue,
				_num_gray;

	        // Loop through data.
	        for (var i = 0; i < (_num_width*_num_height*4); i += 4) {

				// First bytes are red bytes.        
				// Get red value.
				_num_red = _json_image_data.data[i];

				// Second bytes are green bytes.
				// Get green value.
				_num_green = _json_image_data.data[i + 1];

				// Third bytes are blue bytes.
				// Get blue value.
				_num_blue = _json_image_data.data[i + 2];

				// Fourth bytes are alpha bytes
				// We don't care about alpha here.
				// Add the three values and divide by three.
				// Make it an integer.
				_num_gray = parseInt((_num_red + _num_green + _num_blue) / 3);

				// Assign average to red, green, and blue.
				_json_image_data.data[i] = _num_gray;
				_json_image_data.data[i + 1] = _num_gray;
				_json_image_data.data[i + 2] = _num_gray;

	        }

			_scope.obj_canvas_2d.putImageData(_json_image_data, 0, 0);

			_scope.emitAfterMethod( json );

		}

		// 對比
		// http://stackoverflow.com/questions/10521978/html5-canvas-image-contrast
		methodContrast( json ){
			let _scope = this;

			let _num_width = _scope.getComputeWidth(),
				_num_height = _scope.getComputeHeight();

	        let _json_image_data = _scope.obj_canvas_2d.getImageData(0, 0, _num_width, _num_height);

	        let contrast = -50;

		    var factor = (259 * (contrast + 255)) / (255 * (259 - contrast));

		    for(var i=0;i<_json_image_data.data.length;i+=4){
		        _json_image_data.data[i] = factor * (_json_image_data.data[i] - 128) + 128;
		        _json_image_data.data[i+1] = factor * (_json_image_data.data[i+1] - 128) + 128;
		        _json_image_data.data[i+2] = factor * (_json_image_data.data[i+2] - 128) + 128;
		    }
		    
		    _scope.obj_canvas_2d.putImageData(_json_image_data, 0, 0);

		    _scope.emitAfterMethod( json );
		}

		emitAfterMethod( json ){
			json = json || {} ;

			let _scope = this;
			let _data_url = _scope.obj_canvas.toDataURL();

			let _json_emit = {
				origin_data: json.origin_data,
				data: _data_url
			};

			if( json.method_id!==undefined ){
				_json_emit.method_id = json.method_id ;
				// _json_emit.method = json.method ;
			}

			emitter.emit('imageData.step.success.computed', _json_emit);
		}

	}

	// 利用事件的補捉，來記錄我們的圖片運算狀況
	class ImageDataComputeProcess{
		constructor(){
			let _scope = this;
			this.step_data = [];
			emitter.on('initData.changed', function(e){
				_scope.step_data = [];
				let _json_data = arguments[0];
				imageDataComputeMethod.changeData( '', _json_data.origin_data );
			});
			emitter.on('imageData.step.success.computed', function(e){
				let _json_data = arguments[0];
				if( _json_data && (typeof _json_data.origin_data === 'string') && (_json_data.origin_data!=='') ){
					_scope.pushStepData(_json_data);

					let _num_step_length = _scope.step_data.length,
						_sary_step_method = stepMethod.getStepMethod();
					if( _num_step_length<_sary_step_method.length ){ 
						// 先處理圖片
						imageDataComputeMethod.changeData( _sary_step_method[_num_step_length].method, _json_data.data );
					}else{
						// 圖片處理好了，我們現在要準備預覽
						emitter.emit('imageData.final.step.computed', _json_data);
						console.log('******************* 預覽圖片!! *******************');
					}

				}
			});
		}
		getStepData(){
			return this.step_data || [] ;
		}
		setStepData( sary ){
			sary = sary || [] ;

			let _sary = JSON.parse( JSON.stringify( sary ) );

			console.log( '_sary :: ', _sary );

			this.step_data = _sary ;

			let _sary_method = JSON.parse( JSON.stringify( stepMethod.getStepMethod() ) );

			console.log( '=====', _sary_method.length, _sary_method );
			if( _sary_method.length>_sary.length ){
				let _json_next_step = _sary_method[_sary.length];

				// console.log( '_json_next_step :: ', _json_next_step );

				// let _json_emit = {
				// 	origin_data: _sary[(_sary.length-1)].data,
				// 	method: _json_next_step.method /* ,
				// 	method_id: _json_next_step.method_id */
				// };

				// console.log( '_json_emit :: ', _json_emit );

				imageDataComputeMethod.changeData( _json_next_step.method, _sary[(_sary.length-1)].data );


					// emitter.emit('imageData.step.success.loaded', {
					// 	origin_data: this.src,
					// 	method: _scope.getPainterMethod()
					// });

				// emitter.emit('imageData.step.success.loaded', _json_emit);
				// emitter.emit('imageData.step.success.computed', _json_emit); // NONONONONO

			}else if( _sary_method.length===_sary.length ){
				console.log('end here !!');

				let _json_data = _sary[(_sary.length-1)];

				// 圖片處理好了，我們現在要準備預覽
				emitter.emit('imageData.final.step.computed', _json_data);
				console.log('******************* 預覽圖片!! *******************');

			}

		}
		pushStepData(json_data){
			let _scope = this;

			if( json_data.method_id===undefined ){
				let _sary_step_data = JSON.parse(JSON.stringify( _scope.getStepData() )),
					_num_step_data = _sary_step_data.length ;
				console.log( '_num_step_data :: ', _num_step_data );
				let _sary_step_method = JSON.parse(JSON.stringify( stepMethod.getStepMethod() )),
					_num_step_method = _sary_step_method.length;
				console.log( '_num_step_method :: ', _num_step_method );
				if( _num_step_method>=_num_step_data ){ // 去step_method中的記錄中找來用
					let _str_method_id = _sary_step_method[_num_step_data].method_id;
					json_data.method_id = _str_method_id;
				}
			}

			_scope.step_data.push(json_data) ;

		}
	}

	class StepMethod{
		constructor(){

			this.METHOD_SNOW = 'SNOW';
			this.METHOD_ALPHA = 'ALPHA';
			this.METHOD_DOT = 'DOT';
			this.METHOD_GRAY = 'GRAY';
			this.METHOD_CONTRAST = 'CONTRAST';
			this.METHOD_SNOW_NAME = '雪花';
			this.METHOD_ALPHA_NAME = '透明';
			this.METHOD_DOT_NAME = '黑點';
			this.METHOD_GRAY_NAME = '灰階';
			this.METHOD_CONTRAST_NAME = '對比';

			this.init_step_method = [ 
				{
					method: '',
					method_id: utils.createMethodId()
				}
			];
			let _sary_step_method_other = [];
			// let _sary_step_method_other = [
			// 	{
			// 		method: this.METHOD_SNOW
			// 	}, 
			// 	{
			// 		method: this.METHOD_ALPHA
			// 	},
			// 	{
			// 		method: this.METHOD_CONTRAST
			// 	}, 
			// 	{
			// 		method: this.METHOD_DOT
			// 	}, 
			// 	{
			// 		method: this.METHOD_GRAY
			// 	} 
			// ];

			this.step_method = this.init_step_method.concat( _sary_step_method_other );
		}

		getStepMethod(){
			return this.step_method || [] ;
		}

		getConstNameByEn( str ){
			if( (typeof str === 'string') && (str!=='') ){
				return this['METHOD_'+str+'_NAME'];
			}
		}

		pushStepMethod( json ){
			if( json!==undefined ){
				json.method_id = json.method_id || utils.createMethodId();
				this.step_method.push( json );
				emitter.emit('stepMethod.option.added', json);
			}
		}

		spliceStepMethod( json ){
			if( json!==undefined && ( (typeof json.method_id === 'string') && json.method_id!=='' ) ){
				let _num_index;
				for( let i=0;i<this.step_method.length;i++ ){
					if( this.step_method[i].method_id===json.method_id ){
						_num_index = i;
						break;
					}
				}
				if( _num_index>=0 ){
					this.step_method.splice(_num_index,1);
					emitter.emit('stepMethod.option.deleted', json);
				}
			}
		}

	}

	class Utils{
		createMethodId(){
			return Date.now()+'-'+Math.floor(Math.random()*100);
		}
	}

	let utils = new Utils();
	let stepMethod = new StepMethod;
	let emitter = new Emitter;
	let imageDataComputeProcess = new ImageDataComputeProcess;
	let imageDataComputeMethod = new ImageDataComputeMethod;

			// window.methodDetail = stepMethod.getStepMethod() ;
			// window.stepData = imageDataComputeProcess.step_data ;

	new MainImageFilter( obj_main, json_size );

}

module.exports = PictureDraw;
