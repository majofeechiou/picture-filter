'use strict';

import Utils from './utils';
import Settings from './Settings';
import GlobalConst from './globalConst';

export default class MainImageFilter extends GlobalConst {

	constructor( obj, json_tools ){
		super();

		this.setEmitter( json_tools.emitter );
		this.setModuleId( Utils.createUniqueId() );

		this.defaultAction( obj );

	}

	setModuleId( str ){
		this.module_id = str;
	}

	// 抓原始圖片資料
	setImageInitData( str_bas64 ){
		this.image_init_data = str_bas64 ;
		this.getEmitter().emit('init.data.changed', {
			origin_data: str_bas64
		});
	}

	setEmitter(object){
		this.emitter = object ;
	}

	getEmitter(){
		return this.emitter ;
	}

	getModuleId(){
		return this.module_id ;
	}

	// 得到用來產生版形的區塊
	getMainSection(){
		return this.getGlobalConst(this).MAIN_SECTION;
	}

	// 在預覽產生前，把這東西元件設定src
	getObjImagePreview(){
		return this.getGlobalConst(this).OBJ_IMAGE_PREVIEW;
	}

	// 效果選項的元件
	getObjMethodSelect(){
		return this.getGlobalConst(this).OBJ_METHOD_SELECT;
	}

	// 選出來什麼效果選項的元件
	getObjMethodResult(){
		return this.getGlobalConst(this).OBJ_METHOD_RESULT;
	}

	// 得到上傳圖片的按鈕
	getObjUpload(){
		return this.getGlobalConst(this).OBJ_UPLOAD;
	}

	// 上傳檔案
	returnUploadSection(){
		let _obj_upload_section 	= document.createElement('div');
		let _obj_upload 	= document.createElement('input');
		_obj_upload.type	= "file";
		this.uploadAction.call( _obj_upload, this );
		this.addGlobalConst( this, 'OBJ_UPLOAD', _obj_upload );
		_obj_upload_section.appendChild(_obj_upload);
		return _obj_upload_section;
	}
	
	// 預覽圖片
	returnCanvasSection(){
		let _obj_canvas_section 	= document.createElement('div');
		let _obj_canvas_preview = new Image();
		
		this.addGlobalConst( this, 'OBJ_IMAGE_PREVIEW', _obj_canvas_preview );

		_obj_canvas_section.appendChild( _obj_canvas_preview );

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

		this.addGlobalConst( this, 'OBJ_METHOD_SECTION', _obj_method_section );
		this.addGlobalConst( this, 'OBJ_METHOD_RESULT', _obj_method_result );
		this.addGlobalConst( this, 'OBJ_METHOD_SELECT', _obj_method_select );
		return _obj_method_section;
	}

	// 輸出圖片尺寸
	returnSizeSection(){
		let _obj_size_section = document.createElement('div');
		_obj_size_section.innerText = '圖片輸出尺寸';

		let _obj_scale_section = document.createElement('div');
		let _obj_custom_section = document.createElement('div');

		// 圖片尺寸 - 原圖等比縮放 - radio
		let _obj_size_scale = document.createElement('input');
		_obj_size_scale.type = 'radio';
		_obj_size_scale.name = 'size_'+this.getModuleId();
		_obj_size_scale.value = 'scale';
		_obj_size_scale.checked = true;
		this.addGlobalConst( this, 'OBJ_SIZE_SCALE_RADIO', _obj_size_scale );
		// 圖片尺寸 - 原圖等比縮放 - label
		let _obj_label_scale = document.createElement('label');
		_obj_label_scale.appendChild(_obj_size_scale);
		_obj_label_scale.insertAdjacentHTML('beforeend','原圖等比縮放');
		// 圖片尺寸 - 自訂尺寸 - input
		let _obj_scale_range = document.createElement('input');
		_obj_scale_range.type = 'range';
		_obj_scale_range.name = 'range_'+this.getModuleId();
		_obj_scale_range.value = 100;
		_obj_scale_range.min = 1;
		_obj_scale_range.max = 200;

		_obj_scale_section.appendChild( _obj_label_scale );
		_obj_scale_section.appendChild( _obj_scale_range );

		// 圖片尺寸 - 自訂尺寸 - radio
		let _obj_size_custom = document.createElement('input');
		_obj_size_custom.type = 'radio';
		_obj_size_custom.name = 'size_'+this.getModuleId();
		_obj_size_custom.value = 'custom';
		this.addGlobalConst( this, 'OBJ_SIZE_CUSTOM_RADIO', _obj_size_custom );
		// 圖片尺寸 - 自訂尺寸 - label
		let _obj_label_custom = document.createElement('label');
		_obj_label_custom.appendChild(_obj_size_custom);
		_obj_label_custom.insertAdjacentHTML('beforeend','自訂尺寸');
		let _obj_custom_width = document.createElement('input');
		_obj_custom_width.type = 'number';
		_obj_custom_width.name = 'custom_width_'+this.getModuleId();
		_obj_custom_width.min = 10;
		_obj_custom_width.max = 3000;
		_obj_custom_width.value = 200;
		let _obj_custom_height = document.createElement('input');
		_obj_custom_height.type = 'number';
		_obj_custom_height.name = 'custom_height_'+this.getModuleId();
		_obj_custom_height.min = 10;
		_obj_custom_height.max = 3000;
		_obj_custom_height.value = 200;
		// 圖片尺寸 - 自訂尺寸 - cover - radio
		let _obj_size_custom_cover = document.createElement('input');
		_obj_size_custom_cover.type = 'radio';
		_obj_size_custom_cover.name = 'custom_'+this.getModuleId();
		_obj_size_custom_cover.value = 'cover';
		_obj_size_custom_cover.checked = true;
		this.addGlobalConst( this, 'OBJ_SIZE_CUSTOM_RADIO', _obj_size_custom_cover );
		// 圖片尺寸 - 自訂尺寸 - cover - label
		let _obj_label_custom_cover = document.createElement('label');
		_obj_label_custom_cover.appendChild(_obj_size_custom_cover);
		_obj_label_custom_cover.insertAdjacentHTML('beforeend','COVER');
		// 圖片尺寸 - 自訂尺寸 - contain - radio
		let _obj_size_custom_contain = document.createElement('input');
		_obj_size_custom_contain.type = 'radio';
		_obj_size_custom_contain.name = 'custom_'+this.getModuleId();
		_obj_size_custom_contain.value = 'contain';
		this.addGlobalConst( this, 'OBJ_SIZE_CUSTOM_RADIO', _obj_size_custom_contain );
		// 圖片尺寸 - 自訂尺寸 - contain - label
		let _obj_label_custom_contain = document.createElement('label');
		_obj_label_custom_contain.appendChild(_obj_size_custom_contain);
		_obj_label_custom_contain.insertAdjacentHTML('beforeend','CONTAIN');

		_obj_custom_section.appendChild( _obj_label_custom );
		_obj_custom_section.insertAdjacentHTML('beforeend','寬');
		_obj_custom_section.appendChild( _obj_custom_width );
		_obj_custom_section.insertAdjacentHTML('beforeend','高');
		_obj_custom_section.appendChild( _obj_custom_height );
		_obj_custom_section.appendChild( _obj_label_custom_cover );
		_obj_custom_section.appendChild( _obj_label_custom_contain );

		// 圖片尺寸 - 自訂尺寸 - radio
		let _obj_size_submit = document.createElement('button');
		_obj_size_submit.innerText = '確定';

		_obj_size_section.appendChild( _obj_scale_section );
		_obj_size_section.appendChild( _obj_custom_section );
		_obj_size_section.appendChild( _obj_size_submit );
		return _obj_size_section;
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

			// 輸出圖片尺寸
			let _obj_size_section = this.returnSizeSection();

			// 新增效果
			let _obj_method_section = this.returnMethodSection();

			_obj_main.appendChild(_obj_upload_section);
			_obj_main.appendChild(_obj_method_section);
			_obj_main.appendChild(_obj_size_section);
			_obj_main.appendChild(_obj_canvas_section);

		}

	}

	defaultAction( obj ){
		let _scope = this;
		_scope.initGlobalConst(this);

		if( obj.nodeType>=1 ){
			_scope.addGlobalConst( this, 'MAIN_SECTION', obj );
			_scope.makeTempate();
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
				scope_calss.getEmitter().emit('step.method.pushing',{
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
			scope_calss.getEmitter().emit('step.method.splicing',{
				method: _obj_self.data.method,
				method_id: _obj_self.data.method_id,
				method_btn:this
			});
		}
	}

};