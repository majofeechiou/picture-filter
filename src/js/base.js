// 用input抓原始圖片資料
// 用canvas修改圖片資料
// 預覽圖（固定某大小做為預覽圖）
// 送給php產生圖檔，以進一步存下新的圖檔

import PictureDraw from "./picture-draw";

(function body () {

	// let PictureDraw = require('./picture-draw');

	let _obj_main = document.querySelectorAll('[data-majo="picture-filter"]');
	
	// new PictureDraw( _obj_main[0], {} );
	let pictureDraw = new PictureDraw( _obj_main[0], {} );

    new PictureDraw( _obj_main[1], {width: 250, height: 100} ); 
	new PictureDraw( _obj_main[2], {width: 250, height: 100} ); 

})();