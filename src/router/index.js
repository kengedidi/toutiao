//模块化
import Vue from 'vue'
import VueRouter from 'vue-router'
//明确的安装路由功能
Vue.use(VueRouter);


//创建路由模块 和 添加路由配置
const router = new VueRouter({
  //使用routes进行路由的配置
   routes:[
    {
    name:'login',
    path:'/login',
    component:() => import('@/views/login.vue')
    }  
  ]
})

//暴露
export default router;
