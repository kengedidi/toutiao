import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 引入重置文件less
import '@/styles/reset.less'
//引入路由
import router from '@/router/index.js'

new Vue({
  //注入路由
  router,
  render: h => h(App),
}).$mount('#app')
