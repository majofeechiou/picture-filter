'use strict';
import Tools from './tools';

// 運算的方式
export default class ImageDataComputeMethod extends Tools {
	constructor( json_tools ){
		super();

		let _scope = this;

		_scope.setEmitter( json_tools.emitter );

		_scope.obj_canvas = document.createElement('canvas');
		_scope.obj_canvas_2d = _scope.obj_canvas.getContext('2d');

		_scope.obj_image = new Image();

		_scope.obj_image.onload = function(){

			if( (typeof this.src === 'string') && this.src!=='' ){

				let _num_width = this.width;
				let _num_height = this.height;
				_scope.obj_canvas.width = _num_width ;
				_scope.obj_canvas.height = _num_height ;
				_scope.obj_canvas_2d.drawImage(this, 0, 0, _num_width, _num_height);

				_scope.setComputeWidth( _num_width ); // 在此先用圖片本身的長寬去做的
				_scope.setComputeHeight( _num_height ); // 在此先用圖片本身的長寬去做的

				_scope.getEmitter().emit('step.image.success.loaded', {
					origin_data: this.src,
					method: _scope.getPainterMethod()
				});

			}else{
				console.log( '***' );
			}

		}

		_scope.obj_image.error = function(){
			_scope.getEmitter().emit('step.image.error.loaded', {
				origin_data: this.src
			});
		}

	}

	getPainterMethod(){
		let _scope = this;
		return _scope.painter_method;
	}
	// 圖片運算是用多大寬度運算出來的
	getComputeWidth(){
		return this.compute_width;
	}
	// 圖片運算是用多大高度運算出來的
	getComputeHeight(){
		return this.compute_height;
	}

	// 圖片運算是用多大寬度運算出來的
	setComputeWidth( num ){
		this.compute_width = num || 0 ;
	}
	// 圖片運算是用多大高度運算出來的
	setComputeHeight( num ){
		this.compute_height = num || 0 ;
	}

	changeData( str_painter_method, str_base64 ){
		let _scope = this;
		_scope.painter_method = str_painter_method;
		_scope.obj_image.src = str_base64;
	}

	// 傳來什麼，就如實地回傳
	methodOrigin( json ){
		let _scope = this;
		_scope.emitAfterMethod( json );

	}

	// 雪花
	// https://msdn.microsoft.com/zh-cn/library/gg589486(v=vs.85).aspx
	methodSnow( json ){
		let _scope = this;
		let _num_width = _scope.getComputeWidth(),
			_num_height = _scope.getComputeHeight();

		let x,
			y;

		// Draw snowflakes. // 雪花
		for (let i = 0; i <= 500; i++) {
			// Get random positions for flakes.
			x = Math.floor(Math.random() * _num_width);
			y = Math.floor(Math.random() * _num_height);

			// Make the flakes white
			_scope.obj_canvas_2d.fillStyle = "white";

			// Draw an individual flakes.
			_scope.obj_canvas_2d.beginPath();
			_scope.obj_canvas_2d.arc(x, y, 3, 0, Math.PI * 2, true);
			_scope.obj_canvas_2d.closePath();
			_scope.obj_canvas_2d.fill();
		}

		_scope.emitAfterMethod( json );

	}

	// 在照片中添加纹理
	// https://msdn.microsoft.com/zh-cn/library/gg589486(v=vs.85).aspx
	methodDot( json ){
		let _scope = this;
		let _num_width = _scope.getComputeWidth(),
			_num_height = _scope.getComputeHeight();

		let x,
			y;

		// Draw snowflakes. // 雪花
		for (let i = 0; i <= 150; i++) {
			// Get random positions for flakes.
			x = Math.floor(Math.random() * _num_width);
			y = Math.floor(Math.random() * _num_height);

			// Make the flakes white
			_scope.obj_canvas_2d.fillStyle = "black";

			// Draw an individual flakes.
			_scope.obj_canvas_2d.beginPath();
			_scope.obj_canvas_2d.arc(x, y, 5, 0, Math.PI * 2, true);
			_scope.obj_canvas_2d.closePath();
			_scope.obj_canvas_2d.fill();
		}

		_scope.emitAfterMethod( json );
		
	}

	// 透明
	// https://msdn.microsoft.com/zh-cn/library/gg589493(v=vs.85).aspx
	methodAlpha( json ){
		let _scope = this;

		let _num_width = _scope.getComputeWidth(),
			_num_height = _scope.getComputeHeight();

        let _json_image_data = _scope.obj_canvas_2d.getImageData(0, 0, _num_width, _num_height);

        // Loop through data.
        for (var i = 0; i < (_num_width*_num_height*4); i += 4) {

          // First bytes are red bytes.        
          // Second bytes are green bytes.
          // Third bytes are blue bytes.
          // Fourth bytes are alpha bytes
          // Test of alpha channel at 50%.
          // _json_image_data.data[i + 3] = 128;
          _json_image_data.data[i + 3] = _json_image_data.data[i + 3]*0.5;
        }
		_scope.obj_canvas_2d.putImageData(_json_image_data, 0, 0);

		_scope.emitAfterMethod( json );

	}

	// 灰階
	// https://msdn.microsoft.com/zh-cn/library/gg589527(v=vs.85).aspx
	methodGray( json ){
		let _scope = this;

		let _num_width = _scope.getComputeWidth(),
			_num_height = _scope.getComputeHeight();

        let _json_image_data = _scope.obj_canvas_2d.getImageData(0, 0, _num_width, _num_height);

		let _num_red,
			_num_green,
			_num_blue,
			_num_gray;

        // Loop through data.
        for (var i = 0; i < (_num_width*_num_height*4); i += 4) {

			// First bytes are red bytes.        
			// Get red value.
			_num_red = _json_image_data.data[i];

			// Second bytes are green bytes.
			// Get green value.
			_num_green = _json_image_data.data[i + 1];

			// Third bytes are blue bytes.
			// Get blue value.
			_num_blue = _json_image_data.data[i + 2];

			// Fourth bytes are alpha bytes
			// We don't care about alpha here.
			// Add the three values and divide by three.
			// Make it an integer.
			_num_gray = parseInt((_num_red + _num_green + _num_blue) / 3);

			// Assign average to red, green, and blue.
			_json_image_data.data[i] = _num_gray;
			_json_image_data.data[i + 1] = _num_gray;
			_json_image_data.data[i + 2] = _num_gray;

        }

		_scope.obj_canvas_2d.putImageData(_json_image_data, 0, 0);

		_scope.emitAfterMethod( json );

	}

	// 對比
	// http://stackoverflow.com/questions/10521978/html5-canvas-image-contrast
	methodContrast( json ){
		let _scope = this;

		let _num_width = _scope.getComputeWidth(),
			_num_height = _scope.getComputeHeight();

        let _json_image_data = _scope.obj_canvas_2d.getImageData(0, 0, _num_width, _num_height);

        let contrast = -50;

	    var factor = (259 * (contrast + 255)) / (255 * (259 - contrast));

	    for(var i=0;i<_json_image_data.data.length;i+=4){
	        _json_image_data.data[i] = factor * (_json_image_data.data[i] - 128) + 128;
	        _json_image_data.data[i+1] = factor * (_json_image_data.data[i+1] - 128) + 128;
	        _json_image_data.data[i+2] = factor * (_json_image_data.data[i+2] - 128) + 128;
	    }
	    
	    _scope.obj_canvas_2d.putImageData(_json_image_data, 0, 0);

	    _scope.emitAfterMethod( json );
	}

	emitAfterMethod( json ){
		json = json || {} ;

		let _scope = this;
		let _data_url = _scope.obj_canvas.toDataURL();

		let _json_emit = {
			origin_data: json.origin_data,
			data: _data_url
		};

		if( json.method_id!==undefined ){
			_json_emit.method_id = json.method_id ;
			// _json_emit.method = json.method ;
		}

		_scope.getEmitter().emit('step.image.success.computed', _json_emit);
	}

}