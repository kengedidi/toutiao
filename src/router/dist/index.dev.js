"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//明确的安装路由功能
_vue["default"].use(_vueRouter["default"]); //创建路由模块 和 添加路由配置


var router = new _vueRouter["default"]({
  //使用routes进行路由的配置
  routes: [// 登陆
  {
    name: 'login',
    path: '/login',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('@/views/login.vue'));
      });
    }
  }, // 注册
  {
    name: 'register',
    path: '/register',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('@/views/register.vue'));
      });
    }
  }, // 个人中心
  {
    name: 'personal',
    path: '/personal',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('@/views/personal.vue'));
      });
    }
  }]
}); // 
// ---------------------------------添加全局的导航守卫--前置守卫
// 所有跳转都会先经过这个，在跳转之前触发的
// 它的作用是限制用户的路由跳转，说白了，就是当前的路由到底能不能跳转，我们在跳转之前进行判断并处理
//to：目标，去哪里
//from：哪里来
// next：跳转下一个

router.beforeEach(function (to, from, next) {
  // 我们需要判断一下用户当前目标路由是否是需要验证的路由
  if (to.path.indexOf('/personal') !== -1) {
    // 如果数据多，我们会用数组来做：创建一个，就往数组里面添加一个，然后遍历数组中是否有这个值。
    // let arr = ['/personal', '/aa']
    //从本地存储当中取出token，判断token是否有值，是否有token，有token我才让你跳转，没有token连跳转都不让跳转； （判断用户是否有合法的登陆状态，如果有则继续跳转，如果没有则重定向到登陆）
    var token = localStorage.getItem('toutiao_59_token');

    if (token) {
      //如果token有值 ，则为true
      next();
    } else {
      console.log(1111); //token没有值，为undefined,undefined为false，就跳转到登陆，先登陆

      next({
        name: 'login'
      });
    }
  } else {
    next(); //!!!!!!!这里必须加next()，否则页面会不见了
  }
}); //暴露

var _default = router;
exports["default"] = _default;