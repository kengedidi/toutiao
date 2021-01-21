"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _App = _interopRequireDefault(require("./App.vue"));

require("@/styles/reset.less");

var _index = _interopRequireDefault(require("@/router/index.js"));

var _vant = require("vant");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].config.productionTip = false; // 引入重置文件less

_vue["default"].use(_vant.Toast); // 以后每一个组件可以直接使用


new _vue["default"]({
  //注入路由
  router: _index["default"],
  render: function render(h) {
    return h(_App["default"]);
  }
}).$mount('#app');