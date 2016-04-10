/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(2);

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _pictureDraw = __webpack_require__(3);

	var _pictureDraw2 = _interopRequireDefault(_pictureDraw);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	(function body() {

		// let PictureDraw = require('./picture-draw');

		var _obj_main = document.querySelectorAll('[data-majo="picture-filter"]');

		// new PictureDraw( _obj_main[0], {} );
		var pictureDraw = new _pictureDraw2.default(_obj_main[0], {});

		new _pictureDraw2.default(_obj_main[1], { width: 250, height: 100 });
		new _pictureDraw2.default(_obj_main[2], { width: 250, height: 100 });
	})(); // 用input抓原始圖片資料
	// 用canvas修改圖片資料
	// 預覽圖（固定某大小做為預覽圖）
	// 送給php產生圖檔，以進一步存下新的圖檔

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _Settings = __webpack_require__(4);

	var _Settings2 = _interopRequireDefault(_Settings);

	var _utils = __webpack_require__(5);

	var _utils2 = _interopRequireDefault(_utils);

	var _mainImageFilter = __webpack_require__(7);

	var _mainImageFilter2 = _interopRequireDefault(_mainImageFilter);

	var _imageDataComputeMethod = __webpack_require__(8);

	var _imageDataComputeMethod2 = _interopRequireDefault(_imageDataComputeMethod);

	var _imageDataComputeProcess = __webpack_require__(10);

	var _imageDataComputeProcess2 = _interopRequireDefault(_imageDataComputeProcess);

	var _stepMethod = __webpack_require__(11);

	var _stepMethod2 = _interopRequireDefault(_stepMethod);

	var _globalConst = __webpack_require__(12);

	var _globalConst2 = _interopRequireDefault(_globalConst);

	var _index = __webpack_require__(6);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var PictureDraw = (function (_GlobalConst) {
		_inherits(PictureDraw, _GlobalConst);

		function PictureDraw(obj_main, json_size) {
			_classCallCheck(this, PictureDraw);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PictureDraw).call(this));

			var _scope = _this;

			json_size = json_size || {};

			var emitter = new _index2.default();
			_scope.addGlobalConst(_scope, 'emitter', emitter);

			var mainImageFilter = new _mainImageFilter2.default(obj_main, json_size, { emitter: emitter });
			var stepMethod = new _stepMethod2.default({ emitter: emitter });
			var imageDataComputeProcess = new _imageDataComputeProcess2.default({ emitter: emitter });
			var imageDataComputeMethod = new _imageDataComputeMethod2.default({ emitter: emitter });

			if (obj_main !== undefined) {

				// 用完運算結束後，我們要用出預覽圖
				_scope.getGlobalConst(_scope).emitter.on('step.image.final.step.computed', function (e) {
					var _json_data = arguments[0];
					mainImageFilter.getObjImagePreview().src = _json_data.data;
				});

				// 新增效果
				_scope.getGlobalConst(_scope).emitter.on('step.method.show.adding', function (e) {
					// 新增顯示method的文字
					var _json_data = arguments[0];
					var _obj_result = document.createElement('span');
					_obj_result.style.marginRight = '20px';
					_obj_result.data = _obj_result.data || {};
					_obj_result.data.method_id = _json_data.method_id;
					_obj_result.data.method = _json_data.method;
					_obj_result.setAttribute('data-method-id', _json_data.method_id);
					_obj_result.insertAdjacentHTML('beforeend', _Settings2.default.getConstNameByEn(_json_data.method));
					mainImageFilter.getObjMethodResult().appendChild(_obj_result);

					mainImageFilter.methodDeleteBtnAction.call(_obj_result, mainImageFilter);

					// 以下是實際執行新的圖片運算工作

					var _sary_step_data = imageDataComputeProcess.getStepImage();

					if (_sary_step_data instanceof Array === true && _sary_step_data.length > 0) {

						var _num_width = imageDataComputeMethod.getComputeWidth();
						var _num_height = imageDataComputeMethod.getComputeHeight();

						_scope.getGlobalConst(_scope).emitter.emit('step.image.success.loaded', {
							origin_data: _sary_step_data[_sary_step_data.length - 1].data, // 目前得到的最後一次運算結果
							method: _json_data.method
						});
					}
				});

				_scope.getGlobalConst(_scope).emitter.on('step.method.show.deleting', function (e) {
					var _json_data = arguments[0];
					var _sary_step_data = imageDataComputeProcess.getStepImage();

					if (_sary_step_data instanceof Array === true && _sary_step_data.length > 0) {

						var _num_step_data = _sary_step_data.length;

						var _sary_new_step_data = [];

						for (var i = 0; i < _num_step_data; i++) {
							if (_sary_step_data[i].method_id === _json_data.method_id) {
								break;
							} else {
								_sary_new_step_data.push(_sary_step_data[i]);
							}
						}

						var _num_new_step_data_length = _sary_new_step_data.length;

						if (_num_new_step_data_length < _sary_step_data.length) {
							imageDataComputeProcess.setStepImage(_sary_new_step_data);
						}
					}

					mainImageFilter.getObjMethodResult().removeChild(_json_data.method_btn);
				});

				_scope.getGlobalConst(_scope).emitter.on('step.method.pushing', function () {
					stepMethod.pushStepMethod.apply(stepMethod, arguments);
				});

				_scope.getGlobalConst(_scope).emitter.on('step.method.splicing', function () {
					stepMethod.spliceStepMethod.apply(stepMethod, arguments);
				});

				_scope.getGlobalConst(_scope).emitter.on('step.method.option.added', function (e) {
					var _json_data = arguments[0];
					_scope.getGlobalConst(_scope).emitter.emit('step.method.show.adding', _json_data); // 要改了，先不傳這事件?!
				});

				_scope.getGlobalConst(_scope).emitter.on('step.method.option.deleted', function (e) {
					var _json_data = arguments[0];
					_scope.getGlobalConst(_scope).emitter.emit('step.method.show.deleting', _json_data); // 要改了，先不傳這事件?!
				});

				_scope.getGlobalConst(_scope).emitter.on('init.data.changed', function (e) {
					var _json_data = arguments[0];
					imageDataComputeProcess.setStepImage([], _imageDataComputeProcess2.default.TIMMING_RESET, _json_data);
				});

				_scope.getGlobalConst(_scope).emitter.on('step.image.success.loaded', function (e) {
					var _json = arguments[0],
					    _str_method = _json.method;

					if (_str_method === _Settings2.default.METHOD_SNOW) {
						imageDataComputeMethod.methodSnow(_json);
					} else if (_str_method === _Settings2.default.METHOD_DOT) {
						imageDataComputeMethod.methodDot(_json);
					} else if (_str_method === _Settings2.default.METHOD_ALPHA) {
						imageDataComputeMethod.methodAlpha(_json);
					} else if (_str_method === _Settings2.default.METHOD_GRAY) {
						imageDataComputeMethod.methodGray(_json);
					} else if (_str_method === _Settings2.default.METHOD_CONTRAST) {
						imageDataComputeMethod.methodContrast(_json);
					} else {
						imageDataComputeMethod.methodOrigin(_json);
					}
				});

				_scope.getGlobalConst(_scope).emitter.on('step.image.error.loaded', function (e) {});

				_scope.getGlobalConst(_scope).emitter.on('step.image.success.computed', function (e) {
					var _json_data = arguments[0];
					if (_json_data && typeof _json_data.origin_data === 'string' && _json_data.origin_data !== '') {
						imageDataComputeProcess.pushStepData(_json_data, stepMethod.getStepMethod());
					}
				});

				_scope.getGlobalConst(_scope).emitter.on('step.image.seted', function (e) {
					var _str_timming = arguments[0],
					    _json_other = arguments[1] || {};

					if (_str_timming === _imageDataComputeProcess2.default.TIMMING_RESET) {
						imageDataComputeMethod.changeData('', _json_other.origin_data);
					} else {
						_scope.getGlobalConst(_scope).emitter.emit('step.image.pushed');
					}
				});

				_scope.getGlobalConst(_scope).emitter.on('step.image.pushed', function (e) {
					var _str_timming = arguments[0],
					    _json_other = arguments[1] || {};

					var _num_step_length = imageDataComputeProcess.getStepImage().length,
					    _sary_step_method = stepMethod.getStepMethod();
					var _sary_step_image = imageDataComputeProcess.getStepImage(),
					    _json_data = _sary_step_image[_sary_step_image.length - 1];

					if (_num_step_length < _sary_step_method.length) {
						// 先處理圖片
						imageDataComputeMethod.changeData(_sary_step_method[_num_step_length].method, _json_data.data);
					} else {
						// 圖片處理好了，我們現在要準備預覽
						_scope.getGlobalConst(_scope).emitter.emit('step.image.final.step.computed', _json_data);
						console.log('******************* 預覽圖片!! *******************');
					}
				});
			}

			return _this;
		}

		return PictureDraw;
	})(_globalConst2.default);

	exports.default = PictureDraw;
	;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Settings = (function () {
		function Settings() {
			_classCallCheck(this, Settings);
		}

		_createClass(Settings, null, [{
			key: 'getConstNameByEn',
			value: function getConstNameByEn(str) {
				if (typeof str === 'string' && str !== '') {
					return Settings['METHOD_' + str + '_NAME'];
				}
			}
		}]);

		return Settings;
	})();

	Settings.METHOD_SNOW = 'SNOW';
	Settings.METHOD_SNOW_NAME = '雪花';
	Settings.METHOD_DOT = 'DOT';
	Settings.METHOD_DOT_NAME = '黑點';
	Settings.METHOD_ALPHA = 'ALPHA';
	Settings.METHOD_ALPHA_NAME = '透明';
	Settings.METHOD_GRAY = 'GRAY';
	Settings.METHOD_GRAY_NAME = '灰階';
	Settings.METHOD_BRIGHTNESS = 'BRIGHTNESS';
	Settings.METHOD_BRIGHTNESS_NAME = '亮度';
	Settings.METHOD_CONTRAST = 'CONTRAST';
	Settings.METHOD_CONTRAST_NAME = '對比';
	Settings.METHOD_SATURATE = 'SATURATE';
	Settings.METHOD_SATURATE_NAME = '彩度';
	Settings.METHOD_HUE_ROTATE = 'HUE_ROTATE';
	Settings.METHOD_HUE_ROTATE_NAME = '色相轉換';
	Settings.METHOD_INVERT = 'INVERT';
	Settings.METHOD_INVERT_NAME = '負片';
	Settings.METHOD_SEPIA = 'SEPIA';
	Settings.METHOD_SEPIA_NAME = '復古';
	exports.default = Settings;
	;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Utils = function Utils() {
		_classCallCheck(this, Utils);
	};

	Utils.createMethodId = function () {
		return Date.now() + '-' + Math.floor(Math.random() * 100);
	};

	exports.default = Utils;
	;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Expose `Emitter`.
	 */

	module.exports = Emitter;

	/**
	 * Initialize a new `Emitter`.
	 *
	 * @api public
	 */

	function Emitter(obj) {
	  if (obj) return mixin(obj);
	};

	/**
	 * Mixin the emitter properties.
	 *
	 * @param {Object} obj
	 * @return {Object}
	 * @api private
	 */

	function mixin(obj) {
	  for (var key in Emitter.prototype) {
	    obj[key] = Emitter.prototype[key];
	  }
	  return obj;
	}

	/**
	 * Listen on the given `event` with `fn`.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.on = Emitter.prototype.addEventListener = function (event, fn) {
	  this._callbacks = this._callbacks || {};
	  (this._callbacks['$' + event] = this._callbacks['$' + event] || []).push(fn);
	  return this;
	};

	/**
	 * Adds an `event` listener that will be invoked a single
	 * time then automatically removed.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.once = function (event, fn) {
	  function on() {
	    this.off(event, on);
	    fn.apply(this, arguments);
	  }

	  on.fn = fn;
	  this.on(event, on);
	  return this;
	};

	/**
	 * Remove the given callback for `event` or all
	 * registered callbacks.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function (event, fn) {
	  this._callbacks = this._callbacks || {};

	  // all
	  if (0 == arguments.length) {
	    this._callbacks = {};
	    return this;
	  }

	  // specific event
	  var callbacks = this._callbacks['$' + event];
	  if (!callbacks) return this;

	  // remove all handlers
	  if (1 == arguments.length) {
	    delete this._callbacks['$' + event];
	    return this;
	  }

	  // remove specific handler
	  var cb;
	  for (var i = 0; i < callbacks.length; i++) {
	    cb = callbacks[i];
	    if (cb === fn || cb.fn === fn) {
	      callbacks.splice(i, 1);
	      break;
	    }
	  }
	  return this;
	};

	/**
	 * Emit `event` with the given args.
	 *
	 * @param {String} event
	 * @param {Mixed} ...
	 * @return {Emitter}
	 */

	Emitter.prototype.emit = function (event) {
	  this._callbacks = this._callbacks || {};
	  var args = [].slice.call(arguments, 1),
	      callbacks = this._callbacks['$' + event];

	  if (callbacks) {
	    callbacks = callbacks.slice(0);
	    for (var i = 0, len = callbacks.length; i < len; ++i) {
	      callbacks[i].apply(this, args);
	    }
	  }

	  return this;
	};

	/**
	 * Return array of callbacks for `event`.
	 *
	 * @param {String} event
	 * @return {Array}
	 * @api public
	 */

	Emitter.prototype.listeners = function (event) {
	  this._callbacks = this._callbacks || {};
	  return this._callbacks['$' + event] || [];
	};

	/**
	 * Check if this emitter has `event` handlers.
	 *
	 * @param {String} event
	 * @return {Boolean}
	 * @api public
	 */

	Emitter.prototype.hasListeners = function (event) {
	  return !!this.listeners(event).length;
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _Settings = __webpack_require__(4);

	var _Settings2 = _interopRequireDefault(_Settings);

	var _globalConst = __webpack_require__(12);

	var _globalConst2 = _interopRequireDefault(_globalConst);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var MainImageFilter = (function (_GlobalConst) {
		_inherits(MainImageFilter, _GlobalConst);

		function MainImageFilter(obj, json_size, json_tools) {
			_classCallCheck(this, MainImageFilter);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MainImageFilter).call(this));

			_this.setEmitter(json_tools.emitter);

			// this.WEAK_MAP = new WeakMap();
			// this.initGlobalConst = function( object ){
			// 	let data = {};
			// 	this.WEAK_MAP.set(object, data);
			// 	return data;
			// };
			// this.getGlobalConst = function( object ){
			// 	return this.WEAK_MAP.get(object);
			// };
			// this.addGlobalConst = function( object, str_key, data_value ){
			// 	let data = this.WEAK_MAP || {};
			// 	data[str_key] = data_value
			// 	this.WEAK_MAP.set(object, data);
			// 	return data;
			// };

			_this.defaultAction(obj, json_size);

			return _this;
		}

		// 抓原始圖片資料

		_createClass(MainImageFilter, [{
			key: 'setImageInitData',
			value: function setImageInitData(str_bas64) {
				this.image_init_data = str_bas64;
				this.getEmitter().emit('init.data.changed', {
					origin_data: str_bas64
				});
			}
		}, {
			key: 'setEmitter',
			value: function setEmitter(object) {
				this.emitter = object;
			}
		}, {
			key: 'getEmitter',
			value: function getEmitter() {
				return this.emitter;
			}

			// 得到用來產生版形的區塊

		}, {
			key: 'getMainSection',
			value: function getMainSection() {
				return this.getGlobalConst(this).MAIN_SECTION;
			}

			// 在預覽產生前，把這東西元件設定src

		}, {
			key: 'getObjImagePreview',
			value: function getObjImagePreview() {
				return this.getGlobalConst(this).OBJ_IMAGE_PREVIEW;
			}

			// 效果選項的元件

		}, {
			key: 'getObjMethodSelect',
			value: function getObjMethodSelect() {
				return this.getGlobalConst(this).OBJ_METHOD_SELECT;
			}

			// 選出來什麼效果選項的元件

		}, {
			key: 'getObjMethodResult',
			value: function getObjMethodResult() {
				return this.getGlobalConst(this).OBJ_METHOD_RESULT;
			}

			// 得到Canvas預覽的區塊

		}, {
			key: 'getObjCanvasPreview',
			value: function getObjCanvasPreview() {
				return this.getGlobalConst(this).OBJ_CANVAS_PREVIEW;
			}

			// 得到Canvas預覽的區塊

		}, {
			key: 'getObjCanvasPreview2d',
			value: function getObjCanvasPreview2d() {
				return this.getGlobalConst(this).OBJ_CANVAS_PREVIEW_2D;
			}

			// 得到Canvas預覽的區塊長寬

		}, {
			key: 'getPreviewSize',
			value: function getPreviewSize() {
				return this.getGlobalConst(this).PREVIEW_SIZE;
			}

			// 得到上傳圖片的按鈕

		}, {
			key: 'getObjUpload',
			value: function getObjUpload() {
				return this.getGlobalConst(this).OBJ_UPLOAD;
			}

			// 上傳檔案

		}, {
			key: 'returnUploadSection',
			value: function returnUploadSection() {
				var _obj_upload_section = document.createElement('div');
				var _obj_upload = document.createElement('input');
				_obj_upload.type = "file";
				this.uploadAction.call(_obj_upload, this);
				this.addGlobalConst(this, 'OBJ_UPLOAD', _obj_upload);
				_obj_upload_section.appendChild(_obj_upload);
				return _obj_upload_section;
			}

			// 預覽圖片

		}, {
			key: 'returnCanvasSection',
			value: function returnCanvasSection() {
				var _obj_canvas_section = document.createElement('div');
				var _json_size = this.getPreviewSize(),
				    _obj_canvas_preview = document.createElement('canvas');
				_obj_canvas_preview.setAttribute('data-obj', 'preview');
				_obj_canvas_preview.width = _json_size.width;
				_obj_canvas_preview.height = _json_size.height;
				this.addGlobalConst(this, 'OBJ_CANVAS_PREVIEW', _obj_canvas_preview);

				_obj_canvas_section.appendChild(_obj_canvas_preview);

				var _obj_canvas_2d = _obj_canvas_preview.getContext('2d');
				this.addGlobalConst(this, 'OBJ_CANVAS_PREVIEW_2D', _obj_canvas_2d);

				return _obj_canvas_section;
			}

			// 新增效果

		}, {
			key: 'returnMethodSection',
			value: function returnMethodSection() {
				var _obj_method_section = document.createElement('div');

				// 選出了哪些效果
				var _obj_method_result = document.createElement('span');
				_obj_method_section.appendChild(_obj_method_result);

				// 下拉式選單
				var _obj_method_select = document.createElement('select');
				_obj_method_select.name = 'method';
				var _str_method_select = '';
				_str_method_select += '<option value="">---請選擇---</option>';
				_str_method_select += '<option value="' + _Settings2.default.METHOD_SNOW + '">' + _Settings2.default.METHOD_SNOW_NAME + '</option>';
				_str_method_select += '<option value="' + _Settings2.default.METHOD_ALPHA + '">' + _Settings2.default.METHOD_ALPHA_NAME + '</option>';
				_str_method_select += '<option value="' + _Settings2.default.METHOD_DOT + '">' + _Settings2.default.METHOD_DOT_NAME + '</option>';
				_str_method_select += '<option value="' + _Settings2.default.METHOD_GRAY + '">' + _Settings2.default.METHOD_GRAY_NAME + '</option>';
				_str_method_select += '<option value="' + _Settings2.default.METHOD_CONTRAST + '">' + _Settings2.default.METHOD_CONTRAST_NAME + '</option>';
				_obj_method_select.insertAdjacentHTML('afterbegin', _str_method_select);

				// 新增按鈕
				var _obj_method_button = document.createElement('button');
				_obj_method_button.innerText = '新增效果';
				this.methodAddBtnAction.call(_obj_method_button, this);
				_obj_method_section.appendChild(_obj_method_select);
				_obj_method_section.appendChild(_obj_method_button);

				this.addGlobalConst(this, 'OBJ_METHOD_SECTION', _obj_method_section);
				this.addGlobalConst(this, 'OBJ_METHOD_RESULT', _obj_method_result);
				this.addGlobalConst(this, 'OBJ_METHOD_SELECT', _obj_method_select);
				return _obj_method_section;
			}

			// 用dom去產生頁面上的排版

		}, {
			key: 'makeTempate',
			value: function makeTempate() {

				var _scope = this;

				var _obj_main = this.getMainSection();

				if (_obj_main !== undefined) {

					// 上傳檔案
					var _obj_upload_section = this.returnUploadSection();

					// 預覽圖片
					var _obj_canvas_section = this.returnCanvasSection();

					// 新增效果
					var _obj_method_section = this.returnMethodSection();

					_obj_main.appendChild(_obj_upload_section);
					_obj_main.appendChild(_obj_method_section);
					_obj_main.appendChild(_obj_canvas_section);
				}
			}
		}, {
			key: 'defaultAction',
			value: function defaultAction(obj, json_size) {
				var _scope = this;
				_scope.initGlobalConst(this);
				json_size = json_size || {};
				json_size.width = json_size.width > 0 ? json_size.width : 600; // 預覽圓片大小
				json_size.height = json_size.height > 0 ? json_size.height : 450; // 預覽圓片大小

				if (obj.nodeType >= 1) {

					var _obj_image = new Image();

					_scope.imagePreviewOnLoad.call(_obj_image, this);

					_scope.addGlobalConst(this, 'MAIN_SECTION', obj);
					_scope.addGlobalConst(this, 'PREVIEW_SIZE', json_size);
					_scope.addGlobalConst(this, 'OBJ_IMAGE_PREVIEW', _obj_image);
					_scope.makeTempate();
				}
			}
		}, {
			key: 'imagePreviewOnLoad',
			value: function imagePreviewOnLoad(scope_calss) {
				var _obj_self = this;
				_obj_self.onload = function () {
					console.log('onload');
					var _obj_canvas_preview = scope_calss.getObjCanvasPreview();
					var _obj_canvas_2d = scope_calss.getObjCanvasPreview2d();
					_obj_canvas_2d.clearRect(0, 0, _obj_canvas_preview.width, _obj_canvas_preview.height);
					_obj_canvas_2d.drawImage(this, 0, 0, _obj_canvas_preview.width, _obj_canvas_preview.height);
				};
			}
		}, {
			key: 'uploadAction',
			value: function uploadAction(scope_calss) {
				var _obj_self = this;
				_obj_self.onchange = function (e) {
					// 從頭更換圖片
					var windowURL = window.URL || window.webkitURL;
					var _str_image_data = windowURL.createObjectURL(this.files[0]);
					scope_calss.setImageInitData(_str_image_data);
				};
			}

			// 新增效果的按鈕

		}, {
			key: 'methodAddBtnAction',
			value: function methodAddBtnAction(scope_calss) {
				var _obj_self = this;
				_obj_self.onclick = function (e) {
					var _str_method_value = scope_calss.getObjMethodSelect().value;
					if (_str_method_value !== '') {
						scope_calss.getEmitter().emit('step.method.pushing', {
							method: _str_method_value
						});
					} else {
						console.log('不應為空!!');
					}
				};
			}

			// 刪除效果的按鈕

		}, {
			key: 'methodDeleteBtnAction',
			value: function methodDeleteBtnAction(scope_calss) {
				var _obj_self = this;
				_obj_self.onclick = function (e) {
					// 先直接發出刪除methodid的事件，之後再來擴充
					scope_calss.getEmitter().emit('step.method.splicing', {
						method: _obj_self.data.method,
						method_id: _obj_self.data.method_id,
						method_btn: this
					});
				};
			}
		}]);

		return MainImageFilter;
	})(_globalConst2.default);

	exports.default = MainImageFilter;
	;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _ImageDataComputeSize2 = __webpack_require__(9);

	var _ImageDataComputeSize3 = _interopRequireDefault(_ImageDataComputeSize2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// 運算的方式

	var ImageDataComputeMethod = (function (_ImageDataComputeSize) {
		_inherits(ImageDataComputeMethod, _ImageDataComputeSize);

		function ImageDataComputeMethod(json_tools) {
			_classCallCheck(this, ImageDataComputeMethod);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ImageDataComputeMethod).call(this));

			var _scope = _this;

			_scope.setEmitter(json_tools.emitter);

			_scope.obj_canvas = document.createElement('canvas');
			_scope.obj_canvas_2d = _scope.obj_canvas.getContext('2d');

			_scope.obj_image = new Image();

			_scope.obj_image.onload = function () {

				if (typeof this.src === 'string' && this.src !== '') {

					var _num_width = this.width;
					var _num_height = this.height;
					_scope.obj_canvas.width = _num_width;
					_scope.obj_canvas.height = _num_height;
					_scope.obj_canvas_2d.drawImage(this, 0, 0, _num_width, _num_height);

					_scope.setComputeWidth(_num_width); // 在此先用圖片本身的長寬去做的
					_scope.setComputeHeight(_num_height); // 在此先用圖片本身的長寬去做的

					_scope.getEmitter().emit('step.image.success.loaded', {
						origin_data: this.src,
						method: _scope.getPainterMethod()
					});
				} else {
					console.log('***');
				}
			};

			_scope.obj_image.error = function () {
				_scope.getEmitter().emit('step.image.error.loaded', {
					origin_data: this.src
				});
			};

			return _this;
		}

		_createClass(ImageDataComputeMethod, [{
			key: 'getPainterMethod',
			value: function getPainterMethod() {
				var _scope = this;
				return _scope.painter_method;
			}
		}, {
			key: 'getEmitter',
			value: function getEmitter() {
				return this.emitter;
			}
		}, {
			key: 'setEmitter',
			value: function setEmitter(object) {
				this.emitter = object;
			}
		}, {
			key: 'changeData',
			value: function changeData(str_painter_method, str_base64) {
				var _scope = this;
				_scope.painter_method = str_painter_method;
				_scope.obj_image.src = str_base64;
			}

			// 傳來什麼，就如實地回傳

		}, {
			key: 'methodOrigin',
			value: function methodOrigin(json) {
				var _scope = this;
				// let _data_url = _scope.obj_canvas.toDataURL();

				// _scope.getEmitter().emit('step.image.success.computed', {
				// 	origin_data: json.origin_data,
				// 	data: _data_url
				// });

				_scope.emitAfterMethod(json);
			}

			// 雪花
			// https://msdn.microsoft.com/zh-cn/library/gg589486(v=vs.85).aspx

		}, {
			key: 'methodSnow',
			value: function methodSnow(json) {
				var _scope = this;
				var _num_width = _scope.getComputeWidth(),
				    _num_height = _scope.getComputeHeight();

				var x = undefined,
				    y = undefined;

				// Draw snowflakes. // 雪花
				for (var i = 0; i <= 500; i++) {
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

				_scope.emitAfterMethod(json);
			}

			// 在照片中添加纹理
			// https://msdn.microsoft.com/zh-cn/library/gg589486(v=vs.85).aspx

		}, {
			key: 'methodDot',
			value: function methodDot(json) {
				var _scope = this;
				var _num_width = _scope.getComputeWidth(),
				    _num_height = _scope.getComputeHeight();

				var x = undefined,
				    y = undefined;

				// Draw snowflakes. // 雪花
				for (var i = 0; i <= 150; i++) {
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

				_scope.emitAfterMethod(json);
			}

			// 透明
			// https://msdn.microsoft.com/zh-cn/library/gg589493(v=vs.85).aspx

		}, {
			key: 'methodAlpha',
			value: function methodAlpha(json) {
				var _scope = this;

				var _num_width = _scope.getComputeWidth(),
				    _num_height = _scope.getComputeHeight();

				var _json_image_data = _scope.obj_canvas_2d.getImageData(0, 0, _num_width, _num_height);

				// Loop through data.
				for (var i = 0; i < _num_width * _num_height * 4; i += 4) {

					// First bytes are red bytes.       
					// Second bytes are green bytes.
					// Third bytes are blue bytes.
					// Fourth bytes are alpha bytes
					// Test of alpha channel at 50%.
					// _json_image_data.data[i + 3] = 128;
					_json_image_data.data[i + 3] = _json_image_data.data[i + 3] * 0.5;
				}
				_scope.obj_canvas_2d.putImageData(_json_image_data, 0, 0);

				_scope.emitAfterMethod(json);
			}

			// 灰階
			// https://msdn.microsoft.com/zh-cn/library/gg589527(v=vs.85).aspx

		}, {
			key: 'methodGray',
			value: function methodGray(json) {
				var _scope = this;

				var _num_width = _scope.getComputeWidth(),
				    _num_height = _scope.getComputeHeight();

				var _json_image_data = _scope.obj_canvas_2d.getImageData(0, 0, _num_width, _num_height);

				var _num_red = undefined,
				    _num_green = undefined,
				    _num_blue = undefined,
				    _num_gray = undefined;

				// Loop through data.
				for (var i = 0; i < _num_width * _num_height * 4; i += 4) {

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

				_scope.emitAfterMethod(json);
			}

			// 對比
			// http://stackoverflow.com/questions/10521978/html5-canvas-image-contrast

		}, {
			key: 'methodContrast',
			value: function methodContrast(json) {
				var _scope = this;

				var _num_width = _scope.getComputeWidth(),
				    _num_height = _scope.getComputeHeight();

				var _json_image_data = _scope.obj_canvas_2d.getImageData(0, 0, _num_width, _num_height);

				var contrast = -50;

				var factor = 259 * (contrast + 255) / (255 * (259 - contrast));

				for (var i = 0; i < _json_image_data.data.length; i += 4) {
					_json_image_data.data[i] = factor * (_json_image_data.data[i] - 128) + 128;
					_json_image_data.data[i + 1] = factor * (_json_image_data.data[i + 1] - 128) + 128;
					_json_image_data.data[i + 2] = factor * (_json_image_data.data[i + 2] - 128) + 128;
				}

				_scope.obj_canvas_2d.putImageData(_json_image_data, 0, 0);

				_scope.emitAfterMethod(json);
			}
		}, {
			key: 'emitAfterMethod',
			value: function emitAfterMethod(json) {
				json = json || {};

				var _scope = this;
				var _data_url = _scope.obj_canvas.toDataURL();

				var _json_emit = {
					origin_data: json.origin_data,
					data: _data_url
				};

				if (json.method_id !== undefined) {
					_json_emit.method_id = json.method_id;
					// _json_emit.method = json.method ;
				}

				_scope.getEmitter().emit('step.image.success.computed', _json_emit);
			}
		}]);

		return ImageDataComputeMethod;
	})(_ImageDataComputeSize3.default);

	exports.default = ImageDataComputeMethod;

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ImageDataComputeSize = (function () {
		function ImageDataComputeSize() {
			_classCallCheck(this, ImageDataComputeSize);
		}

		_createClass(ImageDataComputeSize, [{
			key: 'setComputeWidth',

			// 圖片運算是用多大寬度運算出來的
			value: function setComputeWidth(num) {
				this.compute_width = num || 0;
			}

			// 圖片運算是用多大高度運算出來的

		}, {
			key: 'setComputeHeight',
			value: function setComputeHeight(num) {
				this.compute_height = num || 0;
			}

			// 圖片運算是用多大寬度運算出來的

		}, {
			key: 'getComputeWidth',
			value: function getComputeWidth() {
				return this.compute_width;
			}

			// 圖片運算是用多大高度運算出來的

		}, {
			key: 'getComputeHeight',
			value: function getComputeHeight() {
				return this.compute_height;
			}
		}]);

		return ImageDataComputeSize;
	})();

	exports.default = ImageDataComputeSize;

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	// 利用事件的補捉，來記錄我們的圖片運算狀況

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ImageDataComputeProcess = (function () {
		function ImageDataComputeProcess(json_tools) {
			_classCallCheck(this, ImageDataComputeProcess);

			this.step_image = [];
			this.setEmitter(json_tools.emitter);
		}

		_createClass(ImageDataComputeProcess, [{
			key: 'getEmitter',
			value: function getEmitter() {
				return this.emitter;
			}
		}, {
			key: 'getStepImage',
			value: function getStepImage() {
				return this.step_image || [];
			}
		}, {
			key: 'setEmitter',
			value: function setEmitter(object) {
				this.emitter = object;
			}
		}, {
			key: 'setStepImage',
			value: function setStepImage(sary, str_timmimg, json_other) {

				var _scope = this;

				sary = sary || [];
				str_timmimg = str_timmimg || _scope.TIMMING_SET;
				json_other = json_other || {};

				var _sary = JSON.parse(JSON.stringify(sary));

				this.step_image = _sary;

				_scope.getEmitter().emit('step.image.seted', str_timmimg, json_other);
			}
		}, {
			key: 'pushStepData',
			value: function pushStepData(json_data, sary_step_method) {
				var _scope = this;

				if (json_data.method_id === undefined) {
					var _sary_step_image = JSON.parse(JSON.stringify(_scope.getStepImage())),
					    _num_step_image = _sary_step_image.length;
					var _sary_step_method = JSON.parse(JSON.stringify(sary_step_method)),
					    _num_step_method = _sary_step_method.length;
					if (_num_step_method >= _num_step_image) {
						// 去step_method中的記錄中找來用
						var _str_method_id = _sary_step_method[_num_step_image].method_id;
						json_data.method_id = _str_method_id;
					}
				}

				_scope.step_image.push(json_data);

				console.log('_scope.step_image :: ', _scope.step_image);

				_scope.getEmitter().emit('step.image.pushed');
			}
		}]);

		return ImageDataComputeProcess;
	})();

	ImageDataComputeProcess.TIMMING_RESET = 'reset';
	ImageDataComputeProcess.TIMMING_SET = 'set';
	exports.default = ImageDataComputeProcess;
	;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _Settings = __webpack_require__(4);

	var _Settings2 = _interopRequireDefault(_Settings);

	var _utils = __webpack_require__(5);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var StepMethod = (function () {
		function StepMethod(json_tools) {
			_classCallCheck(this, StepMethod);

			this.init_step_method = [{
				method: '',
				method_id: _utils2.default.createMethodId()
			}];
			var _sary_step_method_other = [];

			this.step_method = this.init_step_method.concat(_sary_step_method_other);
			this.setEmitter(json_tools.emitter);
		}

		_createClass(StepMethod, [{
			key: 'getStepMethod',
			value: function getStepMethod() {
				return this.step_method || [];
			}
		}, {
			key: 'getEmitter',
			value: function getEmitter() {
				return this.emitter;
			}
		}, {
			key: 'setEmitter',
			value: function setEmitter(object) {
				this.emitter = object;
			}
		}, {
			key: 'pushStepMethod',
			value: function pushStepMethod(json) {
				if (json !== undefined) {
					json.method_id = json.method_id || _utils2.default.createMethodId();
					this.step_method.push(json);
					console.log('this.step_method :: ', this.step_method);
					this.getEmitter().emit('step.method.option.added', json);
				}
			}
		}, {
			key: 'spliceStepMethod',
			value: function spliceStepMethod(json) {
				if (json !== undefined && typeof json.method_id === 'string' && json.method_id !== '') {
					var _num_index = undefined;
					for (var i = 0; i < this.step_method.length; i++) {
						if (this.step_method[i].method_id === json.method_id) {
							_num_index = i;
							break;
						}
					}
					if (_num_index >= 0) {
						this.step_method.splice(_num_index, 1);
						this.getEmitter().emit('step.method.option.deleted', json);
					}
				}
			}
		}]);

		return StepMethod;
	})();

	exports.default = StepMethod;
	;

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var GlobalConst = function GlobalConst() {
	    _classCallCheck(this, GlobalConst);

	    this.WEAK_MAP = new WeakMap();

	    this.initGlobalConst = function (object) {
	        var data = {};
	        this.WEAK_MAP.set(object, data);
	        return data;
	    };
	    this.getGlobalConst = function (object) {
	        return this.WEAK_MAP.get(object);
	    };
	    this.addGlobalConst = function (object, str_key, data_value) {
	        var data = this.WEAK_MAP || {};
	        data[str_key] = data_value;
	        this.WEAK_MAP.set(object, data);
	        return data;
	    };
	};

	exports.default = GlobalConst;
	;

/***/ }
/******/ ]);