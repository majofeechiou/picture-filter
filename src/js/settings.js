'use strict';

export default class Settings {

	static METHOD_SNOW = 'SNOW';
	static METHOD_SNOW_NAME = '雪花';

	static METHOD_DOT = 'DOT';
	static METHOD_DOT_NAME = '黑點';

	static METHOD_ALPHA = 'ALPHA';
	static METHOD_ALPHA_NAME = '透明';

	static METHOD_GRAY = 'GRAY';
	static METHOD_GRAY_NAME = '灰階';

	static METHOD_BRIGHTNESS = 'BRIGHTNESS';
	static METHOD_BRIGHTNESS_NAME = '亮度';

	static METHOD_CONTRAST = 'CONTRAST';
	static METHOD_CONTRAST_NAME = '對比';

	static METHOD_SATURATE = 'SATURATE';
	static METHOD_SATURATE_NAME = '彩度';

	static METHOD_HUE_ROTATE = 'HUE_ROTATE';
	static METHOD_HUE_ROTATE_NAME = '色相轉換';

	static METHOD_INVERT = 'INVERT';
	static METHOD_INVERT_NAME = '負片';

	static METHOD_SEPIA = 'SEPIA';
	static METHOD_SEPIA_NAME = '復古';

	static OUTPUT_SIZE_SCALE = 'scale';
	static OUTPUT_SIZE_CUSTOM = 'custom';

	static OUTPUT_CUSTOM_COVER = 'cover';
	static OUTPUT_CUSTOM_CONTAIN = 'contain';
	static OUTPUT_CUSTOM_FILL = 'fill';
	static OUTPUT_CUSTOM_CLIP = 'clip';

	static getConstNameByEn( str ){
		if( (typeof str === 'string') && (str!=='') ){
			return Settings['METHOD_'+str+'_NAME'];
		}
	}

	static getInitOutputImageScale(){
		return {
			size: this.OUTPUT_SIZE_SCALE,
			range: 100
		};
	}
	static getInitOutputImageCustom(){
		return {
			size: this.OUTPUT_SIZE_CUSTOM,
			width: 500,
			height: 300,
			custom: this.OUTPUT_CUSTOM_COVER
			// custom: this.OUTPUT_CUSTOM_CONTAIN
			// custom: this.OUTPUT_CUSTOM_FILL
			// custom: this.OUTPUT_CUSTOM_CLIP
		};
	}

};