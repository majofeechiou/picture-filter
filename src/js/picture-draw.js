'use strict';

import Settings from './Settings';
import Utils from './utils';
import MainImageFilter from './mainImageFilter';
import ImageDataComputeMethod from './imageDataComputeMethod';
import ImageDataComputeProcess from './imageDataComputeProcess';
import StepMethod from './stepMethod';

export default class PictureDraw {
	constructor( obj_main, json_size ){

		json_size = json_size || {} ;

		let mainImageFilter = new MainImageFilter( obj_main, json_size );
		let stepMethod = new StepMethod();
		let imageDataComputeProcess = new ImageDataComputeProcess();
		let imageDataComputeMethod = new ImageDataComputeMethod();

		if( obj_main!==undefined ){

			// 用完運算結束後，我們要用出預覽圖
			Utils.emitter.on('step.image.final.step.computed', function(e){
				let _json_data = arguments[0];
				mainImageFilter.getObjImagePreview().src = _json_data.data;
			});

			// 新增效果
			Utils.emitter.on('step.method.show.adding', function(e){
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

					Utils.emitter.emit('step.image.success.loaded', {
						origin_data: _sary_step_data[(_sary_step_data.length-1)].data, // 目前得到的最後一次運算結果
						method: _json_data.method
					});

				}

			});

			Utils.emitter.on('step.method.show.deleting', function(e){
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

			Utils.emitter.on('step.method.pushing',function(){
				stepMethod.pushStepMethod(...arguments);
			});

			Utils.emitter.on('step.method.splicing',function(){
				stepMethod.spliceStepMethod(...arguments);
			});

			Utils.emitter.on('step.method.option.added', function(e){
				let _json_data = arguments[0];
				Utils.emitter.emit('step.method.show.adding', _json_data); // 要改了，先不傳這事件?!
			});

			Utils.emitter.on('step.method.option.deleted', function(e){
				let _json_data = arguments[0];
				Utils.emitter.emit('step.method.show.deleting', _json_data); // 要改了，先不傳這事件?!
			});

			Utils.emitter.on('init.data.changed', function(e){
				let _json_data = arguments[0];
				imageDataComputeProcess.setStepImage( [], ImageDataComputeProcess.TIMMING_RESET, _json_data );
			});

			Utils.emitter.on('step.image.success.loaded', function(e){
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

			Utils.emitter.on('step.image.error.loaded', function(e){
				( '錯誤!!' );
			});

			Utils.emitter.on('step.image.success.computed', function(e){
				let _json_data = arguments[0];
				if( _json_data && (typeof _json_data.origin_data === 'string') && (_json_data.origin_data!=='') ){
					imageDataComputeProcess.pushStepData( _json_data, stepMethod.getStepMethod() );
				}
			});

			Utils.emitter.on('step.image.seted', function(e){
				let _str_timming = arguments[0],
					_json_other = arguments[1] || {};

				if( _str_timming===ImageDataComputeProcess.TIMMING_RESET ){
					imageDataComputeMethod.changeData( '', _json_other.origin_data );
				}else{
					Utils.emitter.emit('step.image.pushed');
				}
			});

			Utils.emitter.on('step.image.pushed', function(e){
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
					Utils.emitter.emit('step.image.final.step.computed', _json_data);
					console.log('******************* 預覽圖片!! *******************');
				}

			});

		}

	}

};
