'use strict';

export default class Utils{
    static createNowId = function(){
        return Date.now();
    }
    static createUniqueId = function(){
        return Math.floor(Math.random()*1000);
    }
	static createMethodId = function(){
		return Date.now()+'-'+Math.floor(Math.random()*100);
	}
};