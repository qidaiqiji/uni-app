(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/wxlogin/wxlogin"],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib/index.js?!D:\\myCode\\app_shop\\pages\\wxlogin\\wxlogin.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--18-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!D:/myCode/app_shop/pages/wxlogin/wxlogin.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, \"__esModule\", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ \"./node_modules/@babel/runtime/regenerator/index.js\"));\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nvar _base = _interopRequireDefault(__webpack_require__(/*! @/common/base64.js */ \"D:\\\\myCode\\\\app_shop\\\\common\\\\base64.js\"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err);}_next(undefined);});};}var _default =\n{\n  data: function data() {\n    return {\n      weixinCode: '',\n      // 测试debug\n      services: '',\n      weixinServiceText: '',\n      authorizeFail: '',\n      unService: '',\n      unServiceFail: '',\n      userinfo: '',\n      sendMessage: '' };\n\n  },\n  methods: {\n    backHome: function backHome() {\n      uni.switchTab({\n        url: '../index/index' });\n\n    },\n    weixinLogin: function weixinLogin() {\n      var _this = this;\n\n      var weixinService = null;\n      // http://www.html5plus.org/doc/zh_cn/oauth.html#plus.oauth.getServices\n      plus.oauth.getServices(\n      function (services) {\n        // _this.services = JSON.stringify(services);\n        if (services && services.length) {\n          for (var i = 0, len = services.length; i < len; i++) {\n            if (services[i].id === 'weixin') {\n              weixinService = services[i];\n              break;\n            }\n          }\n          if (!weixinService) {\n            _this.$api.showMessage('没有微信登录授权服务');\n            return;\n          }\n          // http://www.html5plus.org/doc/zh_cn/oauth.html#plus.oauth.AuthService.authorize\n          weixinService.authorize(\n          function (event) {\n            _this.weixinCode = event.code; //用户换取 access_token 的 code\n            _this.requestLogin();\n          },\n          function (error) {\n            // _this.authorizeFail = JSON.stringify(error);\n            _this.$api.showMessage(error.message);\n          },\n          {\n            // http://www.html5plus.org/doc/zh_cn/oauth.html#plus.oauth.AuthOptions\n            appid: 'wx0072a3996011abdf', //开放平台的应用标识。未设置则使用manifest.json的SDK配置项\n            appsecret: '7ac7557b576dc4e174dd533903906073', //登录授权认证服务平台申请的appsecret。未设置则使用manifest.json的SDK配置项\n            scope: 'snsapi_userinfo' //授权获取用户信息\n          });\n\n        } else {\n          _this.$api.showMessage('无可用的登录授权服务');\n        }\n      },\n      function (error) {\n        _this.$api.showMessage('授权失败');\n        // _this.unServiceFail = JSON.stringify(error);\n      });\n\n\n    },\n    requestLogin: function () {var _requestLogin = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var _this, res, _res$data, userId, nickName, access_token, userRank, rankName, balance, token, _res$data2, openId, unionid;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:\n                _this = this;\n                // 这里请求服务端授权登录\n                // this.sendMessage = '这里请求服务端授权登录' + this.$api.user_apploginwithcode;\n                _context.next = 3;return this.$api.request({\n                  method: 'POST',\n                  url: this.$api.user_apploginwithcode,\n                  data: {\n                    code: _this.weixinCode } });case 3:res = _context.sent;\n\n\n                // _this.unServiceFail = 'unUserinfo111---' + JSON.stringify(res);\n                if (res.code == 0) {\n                  // _this.userinfo = JSON.stringify(res);\n                  _res$data = res.data, userId = _res$data.userId, nickName = _res$data.nickName, access_token = _res$data.access_token, userRank = _res$data.userRank, rankName = _res$data.rankName, balance = _res$data.balance;\n                  token = \"Basic \".concat(_base.default.encode(access_token + ':'));\n                  if (userId) {\n                    uni.setStorageSync('userId', userId);\n                  }\n                  uni.setStorageSync('access_token', token);\n\n                  uni.showToast({\n                    icon: 'none',\n                    title: res.msg,\n                    duration: 1000,\n                    success: function success() {\n                      uni.switchTab({\n                        url: '../index/index' });\n\n                    } });\n\n                } else if (res.code == 1) {\n                  // 未注册绑定用户\n                  _res$data2 = res.data, openId = _res$data2.openId, unionid = _res$data2.unionid;\n                  uni.showModal({\n                    title: '提示',\n                    content: '您还未绑定注册',\n                    success: function success(res) {\n                      if (res.confirm) {\n                        _this.$api.goNavigateTo(\"../login/login?openId=\".concat(openId ? openId : '', \"&unionid=\").concat(unionid ? unionid : ''));\n                      } else if (res.cancel) {\n                        _this.$api.showMessage('取消绑定注册');\n                      }\n                    } });\n\n                } else if (res.code == 2 || res.code == 3) {\n                  // 系统错误提示\n                  this.$api.showMessage(res.msg);\n                }case 5:case \"end\":return _context.stop();}}}, _callee, this);}));function requestLogin() {return _requestLogin.apply(this, arguments);}return requestLogin;}() } };exports.default = _default;\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ \"./node_modules/@dcloudio/uni-app-plus/dist/index.js\")[\"default\"]))\n\n//# sourceURL=uni-app:///pages/wxlogin/wxlogin.vue?vue&type=script&lang=js&?d056");

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/less-loader/dist/cjs.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/vue-loader/lib/index.js?!D:\\myCode\\app_shop\\pages\\wxlogin\\wxlogin.vue?vue&type=style&index=0&id=154cb346&lang=less&scoped=scoped&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--10-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-oneOf-1-1!./node_modules/css-loader??ref--10-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--10-oneOf-1-3!./node_modules/less-loader/dist/cjs.js??ref--10-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-oneOf-1-5!./node_modules/vue-loader/lib??vue-loader-options!D:/myCode/app_shop/pages/wxlogin/wxlogin.vue?vue&type=style&index=0&id=154cb346&lang=less&scoped=scoped& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=D:/myCode/app_shop/pages/wxlogin/wxlogin.vue?vue&type=style&index=0&id=154cb346&lang=less&scoped=scoped&");

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib/index.js?!D:\\myCode\\app_shop\\pages\\wxlogin\\wxlogin.vue?vue&type=template&id=154cb346&scoped=true&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!D:/myCode/app_shop/pages/wxlogin/wxlogin.vue?vue&type=template&id=154cb346&scoped=true& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\"view\", { staticClass: \"authorization\" }, [\n    _vm._m(0),\n    _vm._m(1),\n    _c(\n      \"view\",\n      {\n        staticClass: \"button\",\n        attrs: { eventid: \"8dfe7cf4-0\" },\n        on: { tap: _vm.weixinLogin }\n      },\n      [_c(\"view\", { staticClass: \"btn\" }, [_vm._v(\"点击进行微信授权\")])]\n    ),\n    _c(\n      \"view\",\n      {\n        staticClass: \"button back-button\",\n        attrs: { eventid: \"8dfe7cf4-1\" },\n        on: {\n          tap: function($event) {\n            _vm.backHome()\n          }\n        }\n      },\n      [_c(\"view\", { staticClass: \"btn\" }, [_vm._v(\"返回首页\")])]\n    )\n  ])\n}\nvar staticRenderFns = [\n  function() {\n    var _vm = this\n    var _h = _vm.$createElement\n    var _c = _vm._self._c || _h\n    return _c(\"view\", { staticClass: \"logo\" }, [\n      _c(\"image\", {\n        staticClass: \"image\",\n        attrs: { src: \"../../static/images/login/xm-logo.png\", mode: \"\" }\n      })\n    ])\n  },\n  function() {\n    var _vm = this\n    var _h = _vm.$createElement\n    var _c = _vm._self._c || _h\n    return _c(\"view\", { staticClass: \"info\" }, [\n      _c(\"image\", {\n        staticClass: \"image\",\n        attrs: { src: \"../../static/images/login/img_photo@2x.png\", mode: \"\" }\n      })\n    ])\n  }\n]\nrender._withStripped = true\n\n\n\n//# sourceURL=D:/myCode/app_shop/pages/wxlogin/wxlogin.vue?vue&type=template&id=154cb346&scoped=true&");

/***/ }),

/***/ "D:\\myCode\\app_shop\\main.js?{\"page\":\"pages%2Fwxlogin%2Fwxlogin\"}":
/*!***********************************************************************!*\
  !*** D:/myCode/app_shop/main.js?{"page":"pages%2Fwxlogin%2Fwxlogin"} ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("__webpack_require__(/*! uni-pages */ \"D:\\\\myCode\\\\app_shop\\\\pages.json\");\nvar _mpvuePageFactory = _interopRequireDefault(__webpack_require__(/*! mpvue-page-factory */ \"./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mpvue-page-factory/index.js\"));\nvar _wxlogin = _interopRequireDefault(__webpack_require__(/*! ./pages/wxlogin/wxlogin.vue */ \"D:\\\\myCode\\\\app_shop\\\\pages\\\\wxlogin\\\\wxlogin.vue\"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}\nPage((0, _mpvuePageFactory.default)(_wxlogin.default));\n\n//# sourceURL=D:/myCode/app_shop/main.js?%7B%22page%22:%22pages%252Fwxlogin%252Fwxlogin%22%7D");

/***/ }),

/***/ "D:\\myCode\\app_shop\\pages\\wxlogin\\wxlogin.vue":
/*!****************************************************!*\
  !*** D:/myCode/app_shop/pages/wxlogin/wxlogin.vue ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _wxlogin_vue_vue_type_template_id_154cb346_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./wxlogin.vue?vue&type=template&id=154cb346&scoped=true& */ \"D:\\\\myCode\\\\app_shop\\\\pages\\\\wxlogin\\\\wxlogin.vue?vue&type=template&id=154cb346&scoped=true&\");\n/* harmony import */ var _wxlogin_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./wxlogin.vue?vue&type=script&lang=js& */ \"D:\\\\myCode\\\\app_shop\\\\pages\\\\wxlogin\\\\wxlogin.vue?vue&type=script&lang=js&\");\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _wxlogin_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _wxlogin_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n/* harmony import */ var _wxlogin_vue_vue_type_style_index_0_id_154cb346_lang_less_scoped_scoped___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./wxlogin.vue?vue&type=style&index=0&id=154cb346&lang=less&scoped=scoped& */ \"D:\\\\myCode\\\\app_shop\\\\pages\\\\wxlogin\\\\wxlogin.vue?vue&type=style&index=0&id=154cb346&lang=less&scoped=scoped&\");\n/* harmony import */ var _C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(\n  _wxlogin_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _wxlogin_vue_vue_type_template_id_154cb346_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _wxlogin_vue_vue_type_template_id_154cb346_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  \"154cb346\",\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"D:/myCode/app_shop/pages/wxlogin/wxlogin.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=D:/myCode/app_shop/pages/wxlogin/wxlogin.vue");

/***/ }),

/***/ "D:\\myCode\\app_shop\\pages\\wxlogin\\wxlogin.vue?vue&type=script&lang=js&":
/*!*****************************************************************************!*\
  !*** D:/myCode/app_shop/pages/wxlogin/wxlogin.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_wxlogin_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--18-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!./wxlogin.vue?vue&type=script&lang=js& */ \"./node_modules/babel-loader/lib/index.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib/index.js?!D:\\\\myCode\\\\app_shop\\\\pages\\\\wxlogin\\\\wxlogin.vue?vue&type=script&lang=js&\");\n/* harmony import */ var _C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_wxlogin_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_wxlogin_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_wxlogin_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_wxlogin_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n /* harmony default export */ __webpack_exports__[\"default\"] = (_C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_wxlogin_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); \n\n//# sourceURL=uni-app:///pages/wxlogin/wxlogin.vue?vue&type=script&lang=js&?905b");

/***/ }),

/***/ "D:\\myCode\\app_shop\\pages\\wxlogin\\wxlogin.vue?vue&type=style&index=0&id=154cb346&lang=less&scoped=scoped&":
/*!****************************************************************************************************************!*\
  !*** D:/myCode/app_shop/pages/wxlogin/wxlogin.vue?vue&type=style&index=0&id=154cb346&lang=less&scoped=scoped& ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_1_C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_10_oneOf_1_2_C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_5_C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_wxlogin_vue_vue_type_style_index_0_id_154cb346_lang_less_scoped_scoped___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--10-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-oneOf-1-1!./node_modules/css-loader??ref--10-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--10-oneOf-1-3!./node_modules/less-loader/dist/cjs.js??ref--10-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-oneOf-1-5!./node_modules/vue-loader/lib??vue-loader-options!./wxlogin.vue?vue&type=style&index=0&id=154cb346&lang=less&scoped=scoped& */ \"./node_modules/mini-css-extract-plugin/dist/loader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/less-loader/dist/cjs.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/vue-loader/lib/index.js?!D:\\\\myCode\\\\app_shop\\\\pages\\\\wxlogin\\\\wxlogin.vue?vue&type=style&index=0&id=154cb346&lang=less&scoped=scoped&\");\n/* harmony import */ var _C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_1_C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_10_oneOf_1_2_C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_5_C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_wxlogin_vue_vue_type_style_index_0_id_154cb346_lang_less_scoped_scoped___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_1_C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_10_oneOf_1_2_C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_5_C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_wxlogin_vue_vue_type_style_index_0_id_154cb346_lang_less_scoped_scoped___WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_1_C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_10_oneOf_1_2_C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_5_C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_wxlogin_vue_vue_type_style_index_0_id_154cb346_lang_less_scoped_scoped___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_1_C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_10_oneOf_1_2_C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_5_C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_wxlogin_vue_vue_type_style_index_0_id_154cb346_lang_less_scoped_scoped___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n /* harmony default export */ __webpack_exports__[\"default\"] = (_C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_1_C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_10_oneOf_1_2_C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_5_C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_wxlogin_vue_vue_type_style_index_0_id_154cb346_lang_less_scoped_scoped___WEBPACK_IMPORTED_MODULE_0___default.a); \n\n//# sourceURL=D:/myCode/app_shop/pages/wxlogin/wxlogin.vue?vue&type=style&index=0&id=154cb346&lang=less&scoped=scoped&");

/***/ }),

/***/ "D:\\myCode\\app_shop\\pages\\wxlogin\\wxlogin.vue?vue&type=template&id=154cb346&scoped=true&":
/*!***********************************************************************************************!*\
  !*** D:/myCode/app_shop/pages/wxlogin/wxlogin.vue?vue&type=template&id=154cb346&scoped=true& ***!
  \***********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_wxlogin_vue_vue_type_template_id_154cb346_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!./wxlogin.vue?vue&type=template&id=154cb346&scoped=true& */ \"./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib/index.js?!D:\\\\myCode\\\\app_shop\\\\pages\\\\wxlogin\\\\wxlogin.vue?vue&type=template&id=154cb346&scoped=true&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_wxlogin_vue_vue_type_template_id_154cb346_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_C_Users_lei_DESKTOP_3Q48182_Downloads_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_wxlogin_vue_vue_type_template_id_154cb346_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=D:/myCode/app_shop/pages/wxlogin/wxlogin.vue?vue&type=template&id=154cb346&scoped=true&");

/***/ })

},[["D:\\myCode\\app_shop\\main.js?{\"page\":\"pages%2Fwxlogin%2Fwxlogin\"}","common/runtime","common/vendor"]]]);