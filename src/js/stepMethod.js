'use strict';

import Settings from './Settings';
import Utils from './utils';

export default class StepMethod {
	constructor(){

		this.init_step_method = [ 
			{
				method: '',
				method_id: Utils.createMethodId()
			}
		];
		let _sary_step_method_other = [];

		this.step_method = this.init_step_method.concat( _sary_step_method_other );
	}

	getStepMethod(){
		return this.step_method || [] ;
	}

	pushStepMethod( json ){
		if( json!==undefined ){
			json.method_id = json.method_id || Utils.createMethodId();
			this.step_method.push( json );
			Utils.emitter.emit('step.method.option.added', json);
		}
	}

	spliceStepMethod( json ){
		if( json!==undefined && ( (typeof json.method_id === 'string') && json.method_id!=='' ) ){
			let _num_index;
			for( let i=0;i<this.step_method.length;i++ ){
				if( this.step_method[i].method_id===json.method_id ){
					_num_index = i;
					break;
				}
			}
			if( _num_index>=0 ){
				this.step_method.splice(_num_index,1);
				Utils.emitter.emit('step.method.option.deleted', json);
			}
		}
	}

};