'use strict';
import Tools from './tools';

// 運算的方式
export default class ImageDataOriginal extends Tools {
    constructor( json_tools ){
        super();

        let _scope = this;

        _scope.setEmitter( json_tools.emitter );

    }

    /*
       origin_data -> bas64
    */
    setOriginImage( json_data ){
        let _scope = this;
        _scope.origin_data = json_data;
        _scope.getEmitter().emit('init.data.changed', {
            origin_data: json_data.origin_data
        });
    }

}