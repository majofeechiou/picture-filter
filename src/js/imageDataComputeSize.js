'use strict';

export default class ImageDataComputeSize {

	// 圖片運算是用多大寬度運算出來的
	setComputeWidth( num ){
		this.compute_width = num || 0 ;
	}

	// 圖片運算是用多大高度運算出來的
	setComputeHeight( num ){
		this.compute_height = num || 0 ;
	}

	// 圖片運算是用多大寬度運算出來的
	getComputeWidth(){
		return this.compute_width;
	}

	// 圖片運算是用多大高度運算出來的
	getComputeHeight(){
		return this.compute_height;
	}

}