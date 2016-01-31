'use strict';

let Emitter = require('../../node_modules/component-emitter/index.js'); // 監聽事件
let emitter = new Emitter();

export default class Utils{
	static createMethodId = function(){
		return Date.now()+'-'+Math.floor(Math.random()*100);
	}
	static emitter = emitter;
};