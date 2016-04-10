'use strict';

export default class Utils{
	static createMethodId = function(){
		return Date.now()+'-'+Math.floor(Math.random()*100);
	}
};