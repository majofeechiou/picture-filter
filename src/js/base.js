// 用input抓原始圖片資料
// 用canvas修改圖片資料
// 預覽圖（固定某大小做為預覽圖）
// 送給php產生圖檔，以進一步存下新的圖檔

(function body (window) {

	let Emitter = require('../../node_modules/component-emitter/index.js'); // 監聽事件

	class MainImageGilter{

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
					let _json_data = arguments[0];
					_scope.getObjMethodResult().insertAdjacentHTML('beforeend', stepMethod.getConstNameByEn(_json_data.method) );
				});
				emitter.on('stepMethod.option.added', function(e){
					let _json_data = arguments[0];
					emitter.emit('stepMethod.show.adding', _json_data);
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

		methodAddBtnAction( scope_calss ){
			let _obj_self = this;
			_obj_self.onclick = function( e ){
				let _str_method_value = scope_calss.getObjMethodSelect().value;
				console.log( '_str_method_value :: ', _str_method_value );
				if( _str_method_value!=='' ){
					stepMethod.pushStepMethod({
						method: _str_method_value
					});

				}else{
					console.log( '不應為空!!' );
				}
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

				console.log('METHOD :: ', _str_method);

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

			let _num_width = json.image_origin_width,
				_num_height = json.image_origin_height;

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

			let _num_width = json.image_origin_width,
				_num_height = json.image_origin_height;

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
					method: ''
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
				this.step_method.push( json );
				emitter.emit('stepMethod.option.added', json);
			}
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