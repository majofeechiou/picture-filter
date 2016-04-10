'use strict';

export default class GlobalConst{

    constructor(){

        this.WEAK_MAP = new WeakMap();

        this.initGlobalConst = function( object ){
            let data = {};
            this.WEAK_MAP.set(object, data);
            return data;
        };
        this.getGlobalConst = function( object ){
            return this.WEAK_MAP.get(object);
        };
        this.addGlobalConst = function( object, str_key, data_value ){
            let data = this.WEAK_MAP || {};
            data[str_key] = data_value
            this.WEAK_MAP.set(object, data);
            return data;
        };

    }

};