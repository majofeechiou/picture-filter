'use strict';
import Tools from './tools';

// 利用事件的補捉，來記錄我們的圖片運算狀況
export default class ImageDataComputeProcess extends Tools {
	constructor( json_tools ){
		super();
		this.step_image = [];
		this.setEmitter( json_tools.emitter );
	}
	static TIMMING_RESET = 'reset';
	static TIMMING_SET   = 'set';

	getStepImage(){
		return this.step_image || [] ;
	}

	setStepImage( sary, str_timmimg, json_other ){

		let _scope = this;

		sary = sary || [] ;
		str_timmimg = str_timmimg || _scope.TIMMING_SET ;
		json_other = json_other || {}

		let _sary = JSON.parse( JSON.stringify( sary ) );

		this.step_image = _sary ;

		_scope.getEmitter().emit('step.image.seted', str_timmimg, json_other);

	}

	pushStepData( json_data, sary_step_method ){
		let _scope = this;

		if( json_data.method_id===undefined ){
			let _sary_step_image = JSON.parse(JSON.stringify( _scope.getStepImage() )),
				_num_step_image = _sary_step_image.length ;
			let _sary_step_method = JSON.parse(JSON.stringify( sary_step_method )),
				_num_step_method = _sary_step_method.length;
			if( _num_step_method>=_num_step_image ){ // 去step_method中的記錄中找來用
				let _str_method_id = _sary_step_method[_num_step_image].method_id;
				json_data.method_id = _str_method_id;
			}
		}

		_scope.step_image.push(json_data) ;
		_scope.getEmitter().emit('step.image.pushed');

	}

};