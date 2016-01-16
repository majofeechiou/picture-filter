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
			let _me = this;
			_me.onchange = function( e ){ // 從頭更換圖片
				let windowURL = window.URL || window.webkitURL;
				let _str_image_data = windowURL.createObjectURL(this.files[0]);
				scope_calss.setImageInitData( _str_image_data );
			}
		}

	}

	// 運算的方式
	class ImageDataComputMethod{
		constructor(){
			let _me = this;

			this.obj_canvas = document.createElement('canvas');
			this.obj_canvas_2d = this.obj_canvas.getContext('2d');
			console.log( 'this.obj_canvas :: ', this.obj_canvas );
			console.log( 'this.obj_canvas_2d :: ', this.obj_canvas_2d );

			this.obj_image = new Image();
			this.obj_image.onload = function(){
				let _num_width = this.width;
				let _num_height = this.height;
				_me.obj_canvas_2d.drawImage(this, 0, 0, _num_width, _num_height);

				// Draw snowflakes.
				for (let i = 0; i <= 500; i++) {
					// Get random positions for flakes.
					var x = Math.floor(Math.random() * _num_width);
					var y = Math.floor(Math.random() * _num_height);

					// Make the flakes white
					_me.obj_canvas_2d.fillStyle = "white";

					// Draw an individual flakes.
					_me.obj_canvas_2d.beginPath();
					_me.obj_canvas_2d.arc(x, y, 3, 0, Math.PI * 2, true);
					_me.obj_canvas_2d.closePath();
					_me.obj_canvas_2d.fill();
				}

				let _data_url = _me.obj_canvas.toDataURL();

				emitter.emit('imageData.step.computed', {
					origin_data: this.src,
					data: _data_url
				});

			}
		}
		changeData( str_base64 ){
			this.obj_image.src = str_base64;
		}
	}

	// 利用事件的補捉，來記錄我們的圖片運算狀況
	class ImageDataComputeProcess{
		constructor(){
			let _me = this;
			this.step_data = [];
			emitter.on('initData.changed', function(e){
				_me.step_data = [];
				let _json_data = arguments[0];
				imageDataComputMethod.changeData( _json_data.origin_data );
			});
			emitter.on('imageData.step.computed', function(e){
				let _json_data = arguments[0];
				_me.step_data.push(_json_data);
			});
			emitter.emit('imageData.step.computed');
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