'use strict';
import Tools from './tools';
import Settings from './Settings';

// 運算的方式
export default class ImageDataOriginal extends Tools {
    constructor( json_tools ){
        super();

        let _scope = this;

        _scope.setEmitter( json_tools.emitter );

        _scope.obj_image = document.createElement('img');

        _scope.obj_image.onload = function(){
            console.log( 'onload', this.width );
        };

        _scope.obj_canvas = document.createElement('canvas');
        _scope.obj_canvas_2d = _scope.obj_canvas.getContext('2d');

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

    operateImageSize( _json_data ){
        console.log( '_json_data ::: ', _json_data );
        let _scope = this ;

        _scope.obj_canvas_2d.clearRect( 0, 0, _scope.obj_canvas.width, _scope.obj_canvas.height );

        let _str_output = '';

        // **************** 圖片
        // let _json_setting = _scope.getOutputImageSetting(),
        let _json_setting = _json_data.setting,
            _str_size = _json_setting.size;
        _scope.obj_image.src = _json_data.data;

        if( _str_size===Settings.OUTPUT_SIZE_SCALE ){
            let _num_width = Math.floor(_json_data.origin_width * _json_setting.range / 100);
            let _num_height = Math.floor(_json_data.origin_height * _json_setting.range / 100);
            _scope.obj_canvas.width = _num_width ;
            _scope.obj_canvas.height = _num_height ;
            _scope.obj_canvas_2d.drawImage( _scope.obj_image, 0, 0, _json_data.origin_width, _json_data.origin_height, 0, 0, _num_width, _num_height );
            // _scope.getObjImagePreview().src = _scope.obj_canvas.toDataURL();
            _str_output = _scope.obj_canvas.toDataURL();

        }else if( _str_size===Settings.OUTPUT_SIZE_CUSTOM ){
            _scope.obj_canvas.width = _json_setting.width ;
            _scope.obj_canvas.height = _json_setting.height ;

            let _num_origin_ratio = _json_data.origin_height / _json_data.origin_width ;
            let _num_output_ratio = _json_setting.height / _json_setting.width ;

            let _num_outreal_height = _json_setting.width/_json_data.origin_width*_json_data.origin_height ;
            let _num_outreal_width = _json_setting.height/_json_data.origin_height*_json_data.origin_width ;

            if( _json_setting.custom===Settings.OUTPUT_CUSTOM_COVER ){ // 填滿區域，可能造成圖片放大的失真
                if( _num_origin_ratio>_num_output_ratio ){
                    _scope.baseOnWidth( _json_data, _json_setting );
                }else if( _num_origin_ratio<_num_output_ratio ){
                    _scope.baseOnHeight( _json_data, _json_setting );
                }else{
                    _scope.baseOnWidthHeight( _json_data, _json_setting );
                }
            }else if( _json_setting.custom===Settings.OUTPUT_CUSTOM_CONTAIN ){ // 內容全放入，可能造成空白
                if( _num_origin_ratio>_num_output_ratio ){
                    _scope.baseOnHeight( _json_data, _json_setting );
                }else if( _num_origin_ratio<_num_output_ratio ){
                    _scope.baseOnWidth( _json_data, _json_setting );
                }else{
                    _scope.baseOnWidthHeight( _json_data, _json_setting );
                }
            }else if( _json_setting.custom===Settings.OUTPUT_CUSTOM_FILL ){ // 填滿（不考慮寬高比）
                _scope.baseOnWidthHeight( _json_data, _json_setting );
            }else if( _json_setting.custom===Settings.OUTPUT_CUSTOM_CLIP ){ // 裁切
                _scope.baseOnClip( _json_data, _json_setting );
            }
            // _scope.getObjImagePreview().src = _scope.obj_canvas.toDataURL() ;
            _str_output = _scope.obj_canvas.toDataURL();

        }

        if( _str_output!=='' ){
            console.log( '_str_output :: ', _str_output );

            _scope.setOriginImage( {origin_data:_str_output} );

            // _scope.getEmitter().emit('init.data.changed',{
            //     method: _str_output
            // });
        }

    }

    // 固定輸出的寬度
    baseOnWidth( json_data, json_setting ){
        let _scope = this;
        let _num_outreal_height = json_setting.width/json_data.origin_width*json_data.origin_height ;
        _scope.obj_canvas_2d.drawImage( _scope.obj_image, 0, 0, json_data.origin_width, json_data.origin_height, 0, json_setting.height/2-(_num_outreal_height/2), json_setting.width, _num_outreal_height );
    }

    // 固定輸出的高度
    baseOnHeight( json_data, json_setting ){
        let _scope = this;
        let _num_outreal_width = json_setting.height/json_data.origin_height*json_data.origin_width ;
        _scope.obj_canvas_2d.drawImage( _scope.obj_image, 0, 0, json_data.origin_width, json_data.origin_height, json_setting.width/2-(_num_outreal_width/2), 0, _num_outreal_width, json_setting.height );
    }

    // 填滿（不考慮寬高比）
    baseOnWidthHeight( json_data, json_setting ){
        let _scope = this;
        _scope.obj_canvas_2d.drawImage( _scope.obj_image, 0, 0, json_data.origin_width, json_data.origin_height, 0, 0, json_setting.width, json_setting.height );
    }

    // 裁切
    baseOnClip( json_data, json_setting ){
        let _scope = this;
        _scope.obj_canvas_2d.drawImage( _scope.obj_image, json_data.origin_width/2-json_setting.width/2, json_data.origin_height/2-json_setting.height/2, json_setting.width, json_setting.height, 0, 0, json_setting.width, json_setting.height );
    }

}