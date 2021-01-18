import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 引入重置文件less
import '@/styles/reset.less'

new Vue({
  render: h => h(App),
}).$mount('#app')
