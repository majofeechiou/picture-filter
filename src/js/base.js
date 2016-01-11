// 用input抓原始圖片資料
// 用canvas修改圖片資料
// 預覽圖（固定某大小做為預覽圖）
// 送給php產生圖檔，以進一步存下新的圖檔

(function body (window) {

	class PainterStyle {

		snow( obj_img ) {

			let obj_canvas = document.createElement('canvas');
			let obj_canvas_2d = obj_canvas.getContext('2d');

			let _num_width = obj_img.width;
			let _num_height = obj_img.height;

			obj_canvas.width = _num_width;
			obj_canvas.height = _num_height;

			obj_canvas_2d.drawImage(obj_img, 0, 0, _num_width, _num_height);

			// console.log( _num_width, _num_height );

			painterAction.drawImageCover( obj_canvas_2d, obj_img, 0, 0, _num_width, _num_height );

			// Draw snowflakes.
			for (let i = 0; i <= 500; i++) {
				// Get random positions for flakes.
				var x = Math.floor(Math.random() * _num_width);
				var y = Math.floor(Math.random() * _num_height);

				// Make the flakes white
				obj_canvas_2d.fillStyle = "white";

				// Draw an individual flakes.
				obj_canvas_2d.beginPath();
				obj_canvas_2d.arc(x, y, 3, 0, Math.PI * 2, true);
				obj_canvas_2d.closePath();
				obj_canvas_2d.fill();
			}

			let _data_url = obj_canvas.toDataURL();

			return _data_url;

		}
	}

	class PainterAction {

		// 圖片 - cover模式
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

	}

	class Pfilter{

		constructor( obj, json_size ){

			this.defindEvent = new DefindEvent;

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
		setImageOriginData( str_bas64 ){
			this.image_origin_data = str_bas64 ;
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

		paintStep( json_detail, fn_painter_style, callback ){
			json_detail = json_detail || {} ;
			let _me = this;
			let imageProcess = new ImageProcess( json_detail.data, fn_painter_style).then( function( response ){
				if( callback && (callback instanceof Function===true) ){
					callback( response );
				}
			});
		}

		painterRun( json, fn_painter_style ){
			json = json || {} ;
			let _me = this ;
			let _num_index = json.step || 0 ;
			let imageProcess = new ImageProcess( json.data, fn_painter_style).then( function( json_res ){

				if( json_res.success===true ){

					_me.defindEvent.createListen( 'image.data.changed.'+_num_index, {step: _num_index, origin_data:json.data, data:json_res.data} );

					_me.getMainSection().removeEventListener('image.data.changed.'+_num_index);
					_me.getMainSection().addEventListener('image.data.changed.'+_num_index, function( e ){
						console.log( '------', _num_index );
						if( _num_index<3 ){
							_me.paintStep( e.detail, fn_painter_style, function(){
								let _json_e_detail = e.detail || {} ;
								_json_e_detail.step = _json_e_detail.step+1;
								console.trace();
								_me.painterRun( _json_e_detail, fn_painter_style );
							} );
						}else if(_num_index===3){
							console.log('end');
							_me.paintInCanvas( e.detail );
						}

					});

				}

			}).then(function(){
				if( _num_index<=3 ){
					_me.defindEvent.dispatchEvent( 'image.data.changed.'+_num_index, _me.getMainSection() );
				}
			});
		}

		paintInCanvas( json ){
			json = json || {} ;
			let _me = this;
			let _obj_canvas_preview = _me.getObjCanvasPreview();
			let _obj_canvas_2d = _obj_canvas_preview.getContext("2d");
			let _obj_img = new Image();
		    _obj_img.onload = function(){
				painterAction.drawImageCover( _obj_canvas_2d, _obj_img, 0, 0, _me.getPreviewSize().width, _me.getPreviewSize().height );
		    };
			_obj_img.src = json.data ;
		}

		// 實際開始執行任務
		create(){
			let _me = this;
			
			this.getObjUpload().onchange = function( e ){

				let windowURL = window.URL || window.webkitURL;
				let _bb = windowURL.createObjectURL(this.files[0]);

				_me.setImageOriginData( _bb );

				let _fn_painter_style = painterStyle.snow;

				let _json = {
					step: 0,
					data: _bb
				};

				_me.painterRun( _json, _fn_painter_style );

				// let imageProcess01 = new ImageProcess( _bb, _fn_painter_style).then( function( json_res ){

				// 	if( json_res.success===true ){

				// 		_me.defindEvent.createListen( 'image.data.changed', 'step0', {step: 0, origin_data:_bb, data:json_res.data} );

				// 		_me.getMainSection().addEventListener('image.data.changed', function( e ){
				// 			_me.paintStep( e.detail, _fn_painter_style );
				// 		});

				// 		_me.defindEvent.dispatchEvent( 'step0', _me.getMainSection() );

				// 	}

				// });

				// let imageProcess01 = new ImageProcess( _bb, _pp).then( function( rr ){
				// 	let imageProcess02 = new ImageProcess( rr.data, _pp).then( function( rr2 ){
						
				// 		console.log( 'rr2 ::: ', rr2 );

				// 		let _obj_img_snow = new Image();
				// 	    _obj_img_snow.onload = function(){
				// 			painterAction.drawImageCover( _obj_canvas_2d, _obj_img_snow, 0, 0, _me.getPreviewSize().width, _me.getPreviewSize().height );
				// 	    };
				// 		_obj_img_snow.src = rr2.data;
				// 		_obj_img_snow.crossOrigin = null;

				// 	} );
				// } );



				// setTimeout(function(){

				// let imageProcess02 = new ImageProcess( _bb, _pp ).then( function( rr2 ){
					
				// 	console.log( 'rr2 ::: ', rr2 );

				// 	let _obj_img_snow = new Image();
				//     _obj_img_snow.onload = function(){
				// 		painterAction.drawImageCover( _obj_canvas_2d, _obj_img_snow, 0, 0, _me.getPreviewSize().width, _me.getPreviewSize().height );
				//     };

				// 	_obj_img_snow.src = rr2.data;
				// 	_obj_img_snow.crossOrigin = null;
					
				// } );
				
				// },3000);



				// let _obj_img = new Image();
				// _obj_img.onload = function(){
				//     // let _bb_snow = painterStyle.snow( _obj_img, _me.getPreviewSize().width, _me.getPreviewSize().height );
				//     let _bb_snow = painterStyle.snow( _obj_img );

				//     let _obj_img_snow = new Image();
				//     console.log( '_bb_snow :: ', _bb_snow );
				//     _obj_img_snow.onload = function(){
				// 		painterAction.drawImageCover( _obj_canvas_2d, _obj_img_snow, 0, 0, _me.getPreviewSize().width, _me.getPreviewSize().height );
				//     };
				//     _obj_img_snow.src = _bb_snow;
				//     _obj_img_snow.crossOrigin = null;

				// };
				// // _obj_img.src = _bb2;
				// _obj_img.src = _bb;
				// console.log( '_bb :: ', _bb );
				// _obj_img.crossOrigin = null;

			};
		}

	}

	class ImageProcess{

		constructor( str_image_base64, painter_style, callback ){

			let _obj_process = this.getData( str_image_base64, painter_style );

			if( callback ){
				_obj_process.then( callback );
			}else{
				return _obj_process;
			}

		}

		getData( src, painter_style ){

			let promise = new Promise( function (resolve, reject) {

			    let obj_image = new Image();

		        obj_image.onload = function () {
		        	let _bb_snow = painter_style( this );
		        	resolve({
		        		success: true,
		        		data: _bb_snow
		        	});
		        };
		        obj_image.onerror = function () {
					reject({
						success: true,
						error_message: '產生錯誤，未成功得到資料'
					});
		        };

		        obj_image.crossOrigin = null;
		        obj_image.src = src ;

			});

			// Return the promise
			return promise;

		}

	}

	class DefindEvent{

		constructor(){
			this.triggers = {} ;
		}

		createListen( str_event_name, json_data ){
			if( this.triggers[ str_event_name ]!==undefined ){
				this.triggers[ str_event_name ] = null ;
				delete this.triggers[ str_event_name ] ;
			}
			this.triggers[ str_event_name ] = new CustomEvent(str_event_name, {detail:json_data});
		}

		dispatchEvent( str_event_name, obj_elem ){
			obj_elem.dispatchEvent( this.triggers[ str_event_name ] );
		}

	}

	// class EndPainter {
	// 	constructor(obj_scope) {
	// 		this.event = new CustomEvent('build',{detail:{rr:11}});

	// 		this.obj_scope = obj_scope ;

	// 		// Listen for the event.
	// 		this.obj_scope.addEventListener('build', function (e) { 
	// 			let _json_detail = e.detail || {} ;
	// 			// callback( _json_detail );
	// 			console.log('_json_detail :: ', _json_detail); 
	// 		}, false);
			
	// 	}
	
	// 	dispatchEvent(){
	// 		// Dispatch the event.
	// 		this.obj_scope.dispatchEvent(this.event);
	// 	}
	// }

	let painterStyle = new PainterStyle;
	let painterAction = new PainterAction;

	window.Pfilter = Pfilter;

	let _obj_main = document.querySelectorAll('[data-majo="picture-filter"]');

	let a = new Pfilter(_obj_main[0]);
	let b = new Pfilter(_obj_main[1],{width: 450, height: 100});

	setTimeout(function() {
		a.create();
		b.create();
	}, 0);
	

})(window);