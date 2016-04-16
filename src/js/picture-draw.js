'use strict';

import Settings from './Settings';
import Utils from './utils';
import MainImageFilter from './mainImageFilter';
import ImageDataComputeMethod from './imageDataComputeMethod';
import ImageDataComputeProcess from './imageDataComputeProcess';
import ImageDataOriginal from './imageDataOriginal';
import StepMethod from './stepMethod';
import GlobalConst from './globalConst';
import Emitter from '../../node_modules/component-emitter/index.js';

export default class PictureDraw extends GlobalConst {
	constructor( obj_main ){
		super();

		let _scope = this;

		let emitter = new Emitter();
		_scope.addGlobalConst( _scope, 'emitter', emitter );

		let mainImageFilter = new MainImageFilter( obj_main, {emitter:emitter} );
		let stepMethod = new StepMethod({emitter:emitter});
		let imageDataComputeProcess = new ImageDataComputeProcess({emitter:emitter});
		let imageDataComputeMethod = new ImageDataComputeMethod({emitter:emitter});
		let imageDataOriginal = new ImageDataOriginal({emitter:emitter});

		if( obj_main!==undefined ){

			// 用完運算結束後，我們要用出預覽圖
			_scope.getGlobalConst(_scope).emitter.on('step.image.final.step.computed', function(e){
				let _json_data = arguments[0];
				mainImageFilter.getObjImagePreview().src = _json_data.data ;
			});

			// 新增效果
			_scope.getGlobalConst(_scope).emitter.on('step.method.show.adding', function(e){
				// 新增顯示method的文字
				let _json_data = arguments[0];
				let _obj_result = document.createElement('span');
				_obj_result.style.marginRight = '20px' ;
				_obj_result.data = _obj_result.data || {} ;
				_obj_result.data.method_id = _json_data.method_id ;
				_obj_result.data.method = _json_data.method ;
				_obj_result.setAttribute('data-method-id',_json_data.method_id);
				_obj_result.insertAdjacentHTML('beforeend', Settings.getConstNameByEn(_json_data.method) );
				mainImageFilter.getObjMethodResult().appendChild(_obj_result);

				mainImageFilter.methodDeleteBtnAction.call( _obj_result, mainImageFilter );

				// 以下是實際執行新的圖片運算工作

				let _sary_step_data = imageDataComputeProcess.getStepImage();

				if( (_sary_step_data instanceof Array === true) && _sary_step_data.length>0 ){

					let _num_width = imageDataComputeMethod.getComputeWidth();
					let _num_height = imageDataComputeMethod.getComputeHeight();

					_scope.getGlobalConst(_scope).emitter.emit('step.image.success.loaded', {
						origin_data: _sary_step_data[(_sary_step_data.length-1)].data, // 目前得到的最後一次運算結果
						method: _json_data.method
					});

				}

			});

			_scope.getGlobalConst(_scope).emitter.on('step.method.show.deleting', function(e){
				let _json_data = arguments[0];
				let _sary_step_data = imageDataComputeProcess.getStepImage();

				if( (_sary_step_data instanceof Array === true) && _sary_step_data.length>0 ){

					let _num_step_data = _sary_step_data.length;

					let _sary_new_step_data = [];

					for( let i=0; i<_num_step_data; i++ ){
						if( _sary_step_data[i].method_id===_json_data.method_id ){
							break;
						}else{
							_sary_new_step_data.push( _sary_step_data[i] );
						}
					}

					let _num_new_step_data_length = _sary_new_step_data.length;

					if( _num_new_step_data_length<_sary_step_data.length ){
						imageDataComputeProcess.setStepImage( _sary_new_step_data );
					}
			
				}

				mainImageFilter.getObjMethodResult().removeChild(_json_data.method_btn);

			});

			_scope.getGlobalConst(_scope).emitter.on('step.method.pushing',function(){
				stepMethod.pushStepMethod(...arguments);
			});

			_scope.getGlobalConst(_scope).emitter.on('step.method.splicing',function(){
				stepMethod.spliceStepMethod(...arguments);
			});

			_scope.getGlobalConst(_scope).emitter.on('step.method.option.added', function(e){
				let _json_data = arguments[0];
				_scope.getGlobalConst(_scope).emitter.emit('step.method.show.adding', _json_data); // 要改了，先不傳這事件?!
			});

			_scope.getGlobalConst(_scope).emitter.on('step.method.option.deleted', function(e){
				let _json_data = arguments[0];
				_scope.getGlobalConst(_scope).emitter.emit('step.method.show.deleting', _json_data); // 要改了，先不傳這事件?!
			});

			_scope.getGlobalConst(_scope).emitter.on('init.data.changed', function(e){
				console.log( '----- init.data.changed -----' );
				let _json_data = arguments[0];
				imageDataComputeProcess.setStepImage( [], ImageDataComputeProcess.TIMMING_RESET, _json_data );
			});

			_scope.getGlobalConst(_scope).emitter.on('init.data.size.asking', function(e){
				console.log( '----- init.data.size.asking -----' );
				let _json_data = arguments[0];
				_json_data.setting = mainImageFilter.getOutputImageSetting()
				imageDataOriginal.operateImageSize( _json_data );
			});

			_scope.getGlobalConst(_scope).emitter.on('origin.data.changed', function(e){
				console.log( '----- origin.data.changed -----' );
				let _json_data = arguments[0];
				imageDataOriginal.getObjImage().src = _json_data.origin_data;
				mainImageFilter.getObjOriginImage().src = _json_data.origin_data;
			});

			_scope.getGlobalConst(_scope).emitter.on('step.image.success.loaded', function(e){
				let _json = arguments[0],
					_str_method = _json.method;

				if( _str_method===Settings.METHOD_SNOW ){
					imageDataComputeMethod.methodSnow( _json );

				}else if( _str_method===Settings.METHOD_DOT ){
					imageDataComputeMethod.methodDot( _json );

				}else if( _str_method===Settings.METHOD_ALPHA ){
					imageDataComputeMethod.methodAlpha( _json );

				}else if( _str_method===Settings.METHOD_GRAY ){
					imageDataComputeMethod.methodGray( _json );

				}else if( _str_method===Settings.METHOD_CONTRAST ){
					imageDataComputeMethod.methodContrast( _json );

				}else{
					imageDataComputeMethod.methodOrigin( _json );
				}

			});

			_scope.getGlobalConst(_scope).emitter.on('step.image.error.loaded', function(e){
				( '錯誤!!' );
			});

			_scope.getGlobalConst(_scope).emitter.on('step.image.success.computed', function(e){
				let _json_data = arguments[0];
				if( _json_data && (typeof _json_data.origin_data === 'string') && (_json_data.origin_data!=='') ){
					imageDataComputeProcess.pushStepData( _json_data, stepMethod.getStepMethod() );
				}
			});

			_scope.getGlobalConst(_scope).emitter.on('step.image.seted', function(e){
				let _str_timming = arguments[0],
					_json_other = arguments[1] || {};

				if( _str_timming===ImageDataComputeProcess.TIMMING_RESET ){
					imageDataComputeMethod.changeData( '', _json_other.origin_data );
				}else{
					_scope.getGlobalConst(_scope).emitter.emit('step.image.pushed');
				}
			});

			_scope.getGlobalConst(_scope).emitter.on('step.image.pushed', function(e){
				let _str_timming = arguments[0],
					_json_other = arguments[1] || {};

				let _num_step_length = imageDataComputeProcess.getStepImage().length,
					_sary_step_method = stepMethod.getStepMethod();
				let _sary_step_image = imageDataComputeProcess.getStepImage(),
					_json_data = _sary_step_image[_sary_step_image.length-1];

				if( _num_step_length<_sary_step_method.length ){ 
					// 先處理圖片
					imageDataComputeMethod.changeData( _sary_step_method[_num_step_length].method, _json_data.data );
				}else{
					// 圖片處理好了，我們現在要準備預覽
					_scope.getGlobalConst(_scope).emitter.emit('step.image.final.step.computed', _json_data);
					console.log('******************* 預覽圖片!! *******************');
				}

			});

		}

	}

};
