'use strict';

import Utils from './utils';

// 利用事件的補捉，來記錄我們的圖片運算狀況
export default class ImageDataComputeProcess {
	constructor(){
		let _scope = this;
		this.step_data = [];
	}
	getStepData(){
		return this.step_data || [] ;
	}
	setStepData( sary ){
		let _scope = this;

		sary = sary || [] ;

		let _sary = JSON.parse( JSON.stringify( sary ) );

		this.step_data = _sary ;

		setTimeout(function(){
			_scope.runningData();
		},1);

	}
	pushStepData( json_data, sary_step_method ){
		let _scope = this;

		if( json_data.method_id===undefined ){
			let _sary_step_data = JSON.parse(JSON.stringify( _scope.getStepData() )),
				_num_step_data = _sary_step_data.length ;
			let _sary_step_method = JSON.parse(JSON.stringify( sary_step_method )),
				_num_step_method = _sary_step_method.length;
			if( _num_step_method>=_num_step_data ){ // 去step_method中的記錄中找來用
				let _str_method_id = _sary_step_method[_num_step_data].method_id;
				json_data.method_id = _str_method_id;
			}
		}

		_scope.step_data.push(json_data) ;

		setTimeout(function(){
			_scope.runningData();
		},1);

	}
	runningData(){
		let _scope = this;
		let _num_step_length = _scope.step_data.length,
			_sary_step_method = stepMethod.getStepMethod();
		let _sary_step_data = _scope.getStepData(),
			_json_data = _sary_step_data[_sary_step_data.length-1];
		if( _num_step_length<_sary_step_method.length ){ 
			// 先處理圖片
			imageDataComputeMethod.changeData( _sary_step_method[_num_step_length].method, _json_data.data );
		}else{
			// 圖片處理好了，我們現在要準備預覽
			Utils.emitter.emit('imageData.final.step.computed', _json_data);
			console.log('******************* 預覽圖片!! *******************');
		}
	}
};