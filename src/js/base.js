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

		// 得到Canvas預覽的區塊
		getObjCanvasPreview(){
			return this.getConst(this).OBJ_CANVAS_PREVIEW;
		}

		// 得到Canvas預覽的區塊長寬
		getPreviewSize(){
			return this.getConst(this).PREVIEW_SIZE;
		}

		// 得到Canvas區塊
		getObjUpload(){
			return this.getConst(this).OBJ_UPLOAD;
		}

		// 用dom去產生頁面上的排版
		makeTempate(){

			let _obj_upload 	= document.createElement('input');
			_obj_upload.type	= "file";

			let _json_size  = this.getPreviewSize(),
				_obj_canvas = document.createElement( 'canvas' );
			_obj_canvas.setAttribute('data-obj','preview');
			_obj_canvas.width = _json_size.width;
			_obj_canvas.height = _json_size.height;

			let _obj_main = this.getMainSection();

			if( _obj_main!==undefined ){
				this.uploadAction.call( _obj_upload, this );
				this.addConst( this, 'OBJ_UPLOAD', _obj_upload );
				this.addConst( this, 'OBJ_CANVAS', _obj_canvas );
				_obj_main.appendChild(_obj_upload);
				_obj_main.appendChild(_obj_canvas);
				this.addConst( this, 'OBJ_CANVAS_PREVIEW', _obj_main.querySelectorAll('[data-obj="preview"]')[0] );
			}

		}

		defaultAction( obj, json_size ){
			this.initConst(this);
			json_size = json_size || {} ;
			json_size.width = (json_size.width>0)? json_size.width : 600 ;
			json_size.height = (json_size.height>0)? json_size.height : 450 ;

			if( obj.nodeType>=1 ){
				this.addConst( this, 'MAIN_SECTION', obj );
				this.addConst( this, 'PREVIEW_SIZE', json_size );
				this.makeTempate();
			}
		}

		uploadAction( scope_calss ){
			let _scope = this;
			_scope.onchange = function( e ){ // 從頭更換圖片
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
					_scope.methodSnow( _json );

				}else if( _str_method==='DOT' ){
					console.log('DOT');
					_scope.methodDot( _json );

				}else{
					console.log('ooooother');
				}

			});

			_scope.obj_image.onload = function(){

				if( (typeof this.src === 'string') && this.src!=='' ){

					let _num_width = this.width;
					let _num_height = this.height;
					_scope.obj_canvas_2d.drawImage(this, 0, 0, _num_width, _num_height);

					emitter.emit('imageData.step.success.loaded', {
						origin_data: this.src,
						painter_method: _scope.getPainterMethod(),
						image_width: _num_width,
						image_height: _num_height
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

		// 雪花
		// https://msdn.microsoft.com/zh-cn/library/gg589486(v=vs.85).aspx
		methodSnow( json ){
			let _scope = this;
			let _num_width = json.image_width,
				_num_height = json.image_height;

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

			let _data_url = _scope.obj_canvas.toDataURL();

			emitter.emit('imageData.step.success.computed', {
				origin_data: json.origin_data,
				data: _data_url
			});

		}

		// 在照片中添加纹理
		// https://msdn.microsoft.com/zh-cn/library/gg589486(v=vs.85).aspx
		methodDot( json ){
			let _scope = this;
			let _num_width = json.image_width,
				_num_height = json.image_height;

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

			let _data_url = _scope.obj_canvas.toDataURL();

			document.getElementsByTagName('body')[0].appendChild( _scope.obj_canvas );

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
				imageDataComputMethod.changeData( 'SNOW', _json_data.origin_data );
			});
			emitter.on('imageData.step.success.computed', function(e){
				let _json_data = arguments[0];
				if( _json_data && (typeof _json_data.origin_data === 'string') && (_json_data.origin_data!=='') ){
					_scope.step_data.push(_json_data);
					console.log( '_scope.step_data :: ', _scope.step_data );
					if( _scope.step_data.length===1 && _scope.step_data[0] ){ // debug
						imageDataComputMethod.changeData( 'DOT', _json_data.data );
					}
					console.log( '_scope.step_data :: ', _scope.step_data );
				}
			});
			emitter.emit('imageData.step.success.computed');
		}
	}

	window.mainImageGilter = MainImageGilter; // 便於debug

	let emitter = new Emitter;
	let imageDataComputeProcess = new ImageDataComputeProcess;
	let imageDataComputMethod = new ImageDataComputMethod;

	let _obj_main = document.querySelectorAll('[data-majo="picture-filter"]');

	let a = new MainImageGilter(_obj_main[0]);
	let b = new MainImageGilter(_obj_main[1],{width: 450, height: 100});
	

})(window);