// 用input抓原始圖片資料
// 用canvas修改圖片資料
// 預覽圖（固定某大小做為預覽圖）
// 送給php產生圖檔，以進一步存下新的圖檔

(function body (window) {

	let Emitter = require('../../node_modules/component-emitter/index.js'); // 監聽事件

	class MainImageGilter{

		constructor( obj, json_size ){

			// this.defindEvent = new DefindEvent;

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

		// 得到Canvas預覽的區塊
		getObjCanvasPreview(){
			return this.getConst(this).OBJ_CANVAS_PREVIEW;
		}

		// 得到Canvas預覽的區塊長寬
		getPreviewSize(){
			return this.getConst(this).PREVIEW_SIZE;
		}

		// 得到上傳圖片的按鈕
		getObjUpload(){
			return this.getConst(this).OBJ_UPLOAD;
		}

		// 用dom去產生頁面上的排版
		makeTempate(){

			let _scope = this;

			let _obj_upload 	= document.createElement('input');
			_obj_upload.type	= "file";

			let _json_size  = this.getPreviewSize(),
				_obj_canvas_preview = document.createElement( 'canvas' );
			_obj_canvas_preview.setAttribute('data-obj','preview');
			_obj_canvas_preview.width = _json_size.width;
			_obj_canvas_preview.height = _json_size.height;

			let _obj_main = this.getMainSection();

			if( _obj_main!==undefined ){

				emitter.on('imageData.final.step.computed', function(e){
					let _json_data = arguments[0];
					_scope.getObjImagePreview().src = _json_data.data;

				});

				this.uploadAction.call( _obj_upload, this );
				this.addConst( this, 'OBJ_UPLOAD', _obj_upload );
				// this.addConst( this, 'OBJ_CANVAS', _obj_canvas_preview );
				_obj_main.appendChild(_obj_upload);
				_obj_main.appendChild(_obj_canvas_preview);

				// this.addConst( this, 'OBJ_CANVAS_PREVIEW', _obj_main.querySelectorAll('[data-obj="preview"]')[0] );
				this.addConst( this, 'OBJ_CANVAS_PREVIEW', _obj_canvas_preview );

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
					let _obj_canvas_2d = _obj_canvas_preview.getContext('2d');
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
				let _obj_canvas_2d = _obj_canvas_preview.getContext('2d');
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

	}

	// 運算的方式
	class ImageDataComputMethod{
		constructor(){
			let _scope = this;

			_scope.obj_canvas = document.createElement('canvas');
			_scope.obj_canvas_2d = _scope.obj_canvas.getContext('2d');

			_scope.obj_image = new Image();

			emitter.on('imageData.step.success.loaded', function(e){
				let _json = arguments[0],
					_str_method = _json.painter_method;

				if( _str_method==='SNOW' ){
					console.log('SNOW');
					_scope.methodSnow( _json );

				}else if( _str_method==='DOT' ){
					console.log('DOT');
					_scope.methodDot( _json );

				}else if( _str_method==='ALPHA' ){
					console.log('ALPHA');
					_scope.methodAlpha( _json );

				}else if( _str_method==='GRAY' ){
					console.log('GRAY');
					_scope.methodGray( _json );

				}else{
					console.log('ooooother');
					_scope.methodOrigin( _json );
				}

			});

			_scope.obj_image.onload = function(){

				if( (typeof this.src === 'string') && this.src!=='' ){

					let _num_width = this.width;
					let _num_height = this.height;
					console.log(_num_width, _num_height);
					_scope.obj_canvas.width = _num_width ;
					_scope.obj_canvas.height = _num_height ;
					_scope.obj_canvas_2d.drawImage(this, 0, 0, _num_width, _num_height);

					emitter.emit('imageData.step.success.loaded', {
						origin_data: this.src,
						painter_method: _scope.getPainterMethod(),
						image_origin_width: _num_width,
						image_origin_height: _num_height
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

		changeData( painter_method, str_base64 ){
			let _scope = this;
			_scope.painter_method = painter_method;
			_scope.obj_image.src = str_base64;
		}

		// 傳來什麼，就如實地回傳
		methodOrigin( json ){
			let _scope = this;
			let _data_url = _scope.obj_canvas.toDataURL();

			emitter.emit('imageData.step.success.computed', {
				origin_data: json.origin_data,
				data: _data_url
			});
		}

		// 雪花
		// https://msdn.microsoft.com/zh-cn/library/gg589486(v=vs.85).aspx
		methodSnow( json ){
			let _scope = this;
			let _num_width = json.image_origin_width,
				_num_height = json.image_origin_height;

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
			let _num_width = json.image_origin_width,
				_num_height = json.image_origin_height;

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

			let _num_width = json.image_origin_width,
				_num_height = json.image_origin_height;

			console.log( 'json :: ', json );
			console.log( '_scope.obj_canvas_2d :: ', _scope.obj_canvas_2d );

	        let _json_image_data = _scope.obj_canvas_2d.getImageData(0, 0, _num_width, _num_height);
			console.log( '_json_image_data :: ', _json_image_data );

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

			let _num_width = json.image_origin_width,
				_num_height = json.image_origin_height;

			console.log( 'json :: ', json );
			console.log( '_scope.obj_canvas_2d :: ', _scope.obj_canvas_2d );

	        let _json_image_data = _scope.obj_canvas_2d.getImageData(0, 0, _num_width, _num_height);
			console.log( '_json_image_data :: ', _json_image_data );

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

		emitAfterMethod( json ){
			let _scope = this;
			let _data_url = _scope.obj_canvas.toDataURL();

			emitter.emit('imageData.step.success.computed', {
				origin_data: json.origin_data,
				data: _data_url
			});
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
				imageDataComputMethod.changeData( '', _json_data.origin_data );
			});
			emitter.on('imageData.step.success.computed', function(e){
				let _json_data = arguments[0];
				if( _json_data && (typeof _json_data.origin_data === 'string') && (_json_data.origin_data!=='') ){
					_scope.step_data.push(_json_data);

					let _num_step_length = _scope.step_data.length,
						_sary_step_method = stepMethod.getStepMethod();
					if( _num_step_length<_sary_step_method.length ){ 
						// 先處理圖片
						imageDataComputMethod.changeData( _sary_step_method[_num_step_length].method, _json_data.data );
					}else{
						// 圖片處理好了，我們現在要準備預覽
						emitter.emit('imageData.final.step.computed', _json_data);
					}

				}
			});
			emitter.emit('imageData.step.success.computed');
		}
	}

	class StepMethod{
		constructor(){
			this.init_step_method = [ 
				{
					method: ''
				}
			];
			let _sary_step_method_other = [
				{
					method: 'SNOW'
				}, 
				{
					method: 'ALPHA'
				}, 
				{
					method: 'DOT'
				}, 
				{
					method: 'GRAY'
				} 
			];

			this.step_method = this.init_step_method.concat( _sary_step_method_other );
		}
		getStepMethod(){
			return this.step_method || [] ;
		}
	}


	window.mainImageGilter = MainImageGilter; // 便於debug

	let stepMethod = new StepMethod;
	let emitter = new Emitter;
	let imageDataComputeProcess = new ImageDataComputeProcess;
	let imageDataComputMethod = new ImageDataComputMethod;

	let _obj_main = document.querySelectorAll('[data-majo="picture-filter"]');

	let a = new MainImageGilter(_obj_main[0]);
	// let b = new MainImageGilter(_obj_main[1],{width: 450, height: 100});
	

})(window);