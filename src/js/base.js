// 用input抓原始圖片資料
// 用canvas修改圖片資料
// 預覽圖（固定某大小做為預覽圖）
// 送給php產生圖檔，以進一步存下新的圖檔

(function body (window) {

	class Pfilter{

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

		// paintStep( json_detail, fn_painter_style, callback ){
		// 	json_detail = json_detail || {} ;
		// 	let _me = this;
		// 	if( _me.imageProcess===undefined ){
		// 		delete _me.imageProcess;
		// 	}
		// 		_me.imageProcess = new ImageProcess( json_detail.data, fn_painter_style).then( function( response ){
		// 			delete this;
		// 			if( callback && (callback instanceof Function===true) ){
		// 				callback( response );
		// 			}
		// 		});
		// }

		// painterRun( json, fn_painter_style ){
		// 	json = json || {} ;
		// 	let _me = this ;
		// 	let _num_index = json.step || 0 ;
		// 	let imageProcess = new ImageProcess( json.data, fn_painter_style).then( function( json_res ){

		// 		delete this;

		// 		if( json_res.success===true ){

		// 			_me.defindEvent.createListen( 'image.data.changed.'+_num_index, {step: _num_index, origin_data:json.data, data:json_res.data} );

		// 			_me.getMainSection().removeEventListener('image.data.changed.'+_num_index);
		// 			_me.getMainSection().addEventListener('image.data.changed.'+_num_index, function( e ){
		// 				console.log( '------', _num_index );
		// 				if( _num_index<3 ){
		// 					_me.paintStep( e.detail, fn_painter_style, function(){
		// 						let _json_e_detail = e.detail || {} ;
		// 						_json_e_detail.step = _json_e_detail.step+1;
		// 						console.trace();
		// 						_me.painterRun( _json_e_detail, fn_painter_style );
		// 					}, false );
		// 				}else if(_num_index===3){
		// 					console.log('end');
		// 					_me.paintInCanvas( e.detail );
		// 				}

		// 			});

		// 		}

		// 	}).then(function(){
		// 		if( _num_index<=3 ){
		// 			_me.defindEvent.dispatchEvent( 'image.data.changed.'+_num_index, _me.getMainSection() );
		// 		}
		// 	});
		// }

		// paintInCanvas( json ){
		// 	json = json || {} ;
		// 	let _me = this;
		// 	let _obj_canvas_preview = _me.getObjCanvasPreview();
		// 	let _obj_canvas_2d = _obj_canvas_preview.getContext("2d");
		// 	// -- 以下改class控制
		// 	if( _me._obj_img===undefined ){
		// 		console.log('new Image()');
		// 		_me._obj_img = new Image();
		// 	    _me._obj_img.onload = function(){
		// 			painterAction.drawImageCover( _obj_canvas_2d, _me._obj_img, 0, 0, _me.getPreviewSize().width, _me.getPreviewSize().height );
		// 	    };
		// 	}
		// 	_me._obj_img.src = json.data ;
		// }

		uploadAction( scope_calss ){
			let _me = this;
			_me.onchange = function( e ){
				let windowURL = window.URL || window.webkitURL;
				let _str_image_data = windowURL.createObjectURL(this.files[0]);
				console.log( '_str_image_data :: ', _str_image_data );
				scope_calss.setImageOriginData( _str_image_data );
			}
		}

		// // 實際開始執行任務
		// create(){
		// 	let _me = this;
			
		// 	this.getObjUpload().onchange = function( e ){

		// 		let windowURL = window.URL || window.webkitURL;
		// 		let _str_image_data = windowURL.createObjectURL(this.files[0]);

		// 		_me.setImageOriginData( _str_image_data );

		// 		// let _fn_painter_style = painterStyle.snow;

		// 		// let _json = {
		// 		// 	step: 0,
		// 		// 	data: _str_image_data
		// 		// };

		// 		// _me.painterRun( _json, _fn_painter_style );

		// 	};
		// }

	}

	window.Pfilter = Pfilter;

	let _obj_main = document.querySelectorAll('[data-majo="picture-filter"]');

	let a = new Pfilter(_obj_main[0]);
	let b = new Pfilter(_obj_main[1],{width: 450, height: 100});
	

})(window);