// 用input抓原始圖片資料
// 用canvas修改圖片資料
// 預覽圖（固定某大小做為預覽圖）
// 送給php產生圖檔，以進一步存下新的圖檔

(function body (window) {

	class Pfilter{

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

		setNowCreaterIndex( num ){
			this.now_creator_index = num;
		}

		// 抓原始圖片資料
		setImageOriginData( str_bas64 ){
			this.image_origin_data = str_bas64 ;
		}

		getNowCreaterIndex(){
			return this.now_creator;
		}

		getNowCreater(){
			return _creator[this.getNowCreaterIndex()];
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

		changeImageDataSnow( obj_img, _num_width2, _num_height2 ) {

			let obj_canvas = document.createElement('canvas');
			let ctx = obj_canvas.getContext('2d');

			let _num_width = obj_img.width;
			let _num_height = obj_img.height;

			obj_canvas.width = _num_width;
			obj_canvas.height = _num_height;

			ctx.drawImage(obj_img, 0, 0, _num_width, _num_height);

			console.log( _num_width, _num_height );

			this.drawImageCover( ctx, obj_img, 0, 0, _num_width, _num_height );


					// Draw snowflakes.
					for (let i = 0; i <= 500; i++) {
						// Get random positions for flakes.
						var x = Math.floor(Math.random() * _num_width);
						var y = Math.floor(Math.random() * _num_height);
						// var x = i;
						// var y = i;

						// var x = i;
						// var y = i;

						// Make the flakes white
						ctx.fillStyle = "white";

						// Draw an individual flakes.
						ctx.beginPath();
						ctx.arc(x, y, 3, 0, Math.PI * 2, true);
						ctx.closePath();
						ctx.fill();
					}

			document.getElementsByTagName('body')[0].appendChild(obj_canvas);

			// ctx.drawImage(obj_img, 0, 0);

			let _data_url = obj_canvas.toDataURL();

			// let _data = ctx.getImageData(0, 0, _num_width, _num_height).data;

			// console.log( '_data_url :: ', _data_url );
			// console.log( '_data :: ', _data );

			return _data_url;

		}

		// 在預覽圖片時，我們會需要對圖片做縮放，才能讓整張圖都秀出來
		drawImageCover(obj_canvas_2d, obj_img, x, y, w, h, offsetX, offsetY) {

		    if (arguments.length === 2) {
		        x = y = 0;
		        w = obj_canvas_2d.canvas.width;
		        h = obj_canvas_2d.canvas.height;
		    }

		    // default offset is center
		    offsetX = typeof offsetX === "number" ? offsetX : 0.5;
		    offsetY = typeof offsetY === "number" ? offsetY : 0.5;

		    // keep bounds [0.0, 1.0]
		    if (offsetX < 0) offsetX = 0;
		    if (offsetY < 0) offsetY = 0;
		    if (offsetX > 1) offsetX = 1;
		    if (offsetY > 1) offsetY = 1;

		    let iw = obj_img.width,
		        ih = obj_img.height,
		        r = Math.min(w / iw, h / ih),
		        nw = iw * r,   // new prop. width
		        nh = ih * r,   // new prop. height
		        cx, cy, cw, ch, ar = 1;

		    // decide which gap to fill    
		    if (nw < w) ar = w / nw;
		    if (nh < h) ar = h / nh;
		    nw *= ar;
		    nh *= ar;

		    // calc source rectangle
		    cw = iw / (nw / w);
		    ch = ih / (nh / h);

		    cx = (iw - cw) * offsetX;
		    cy = (ih - ch) * offsetY;

		    // make sure source rectangle is valid
		    if (cx < 0) cx = 0;
		    if (cy < 0) cy = 0;
		    if (cw > iw) cw = iw;
		    if (ch > ih) ch = ih;

		    // fill image in dest. rectangle
		    obj_canvas_2d.drawImage(obj_img, cx, cy, cw, ch,  x, y, w, h);
		}

		// 實際開始執行任務
		create(){
			let _me = this;
			this.getObjUpload().onchange = function( e ){

				let windowURL = window.URL || window.webkitURL;
				let _bb = windowURL.createObjectURL(this.files[0]);

				_me.setImageOriginData( _bb );

				let _obj_main = _me.getMainSection();
				let _obj_canvas_preview = _me.getObjCanvasPreview();
				let _obj_canvas_2d = _obj_canvas_preview.getContext("2d");

				_obj_canvas_preview.style.border = '1px solid #f00';

				let _obj_img = new Image();
				_obj_img.onload = function(){
				    let _bb_snow = _me.changeImageDataSnow( _obj_img, _me.getPreviewSize().width, _me.getPreviewSize().height );

				    let _obj_img_snow = new Image();
				    console.log( '_bb_snow :: ', _bb_snow );
				    _obj_img_snow.onload = function(){
						_me.drawImageCover( _obj_canvas_2d, _obj_img_snow, 0, 0, _me.getPreviewSize().width, _me.getPreviewSize().height );
						// _obj_canvas_2d.drawImage(_obj_img, 0, 0);
				    };
				    _obj_img_snow.src = _bb_snow;
				    _obj_img_snow.crossOrigin = null;

				};
				// _obj_img.src = _bb2;
				_obj_img.src = _bb;
				console.log( '_bb :: ', _bb );
				_obj_img.crossOrigin = null;

			};
		}

	}

	window.Pfilter = Pfilter;

	let _obj_main = document.querySelectorAll('[data-majo="picture-filter"]');

	let a = new Pfilter(_obj_main[0]);
	let b = new Pfilter(_obj_main[1],{width: 450, height: 100});
	a.create();
	b.create();

})(window);