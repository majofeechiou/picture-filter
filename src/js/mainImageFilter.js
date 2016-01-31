'use strict';

import Settings from './Settings';
import Utils from './utils';

export default class MainImageFilter{

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
		Utils.emitter.emit('initData.changed', {
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
		_str_method_select += '<option value="'+Settings.METHOD_SNOW+'">'+Settings.METHOD_SNOW_NAME+'</option>';
		_str_method_select += '<option value="'+Settings.METHOD_ALPHA+'">'+Settings.METHOD_ALPHA_NAME+'</option>';
		_str_method_select += '<option value="'+Settings.METHOD_DOT+'">'+Settings.METHOD_DOT_NAME+'</option>';
		_str_method_select += '<option value="'+Settings.METHOD_GRAY+'">'+Settings.METHOD_GRAY_NAME+'</option>';
		_str_method_select += '<option value="'+Settings.METHOD_CONTRAST+'">'+Settings.METHOD_CONTRAST_NAME+'</option>';
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
				Utils.emitter.emit('step.method.pushing',{
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
			// 先直接發出刪除methodid的事件，之後再來擴充
			Utils.emitter.emit('step.method.splicing',{
				method: _obj_self.data.method,
				method_id: _obj_self.data.method_id,
				method_btn:this
			});
		}
	}

};