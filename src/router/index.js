//模块化
import Vue from 'vue'
import VueRouter from 'vue-router'
//明确的安装路由功能
Vue.use(VueRouter);


//创建路由模块 和 添加路由配置
const router = new VueRouter({
  //使用routes进行路由的配置
  routes: [
    //重定义（默认页面跳转首页）
    {
      name: 'default',
      path: '/',
      component: () => import('@/views/index.vue')
    },
    //首页
    {
      name: 'index',
      path: '/index',
      component: () => import('@/views/index.vue')
    },
    // 登陆页面
    {
      name: 'login',
      path: '/login',
      component: () => import('@/views/login.vue')
    },
    // 注册页面
    {
      name: 'register',
      path: '/register',
      component: () => import('@/views/register.vue')
    },
    // 个人中心页面
    {
      name: 'personal',
      path: '/personal/:id',
      component: () => import('@/views/personal.vue')
    },
    //编辑用户信息页面
    {
      name: 'editUserInfo',
      path: '/editUserInfo/:id',
      component: () => import('@/views/editUserInfo.vue')
    },
     //文章详情页面
     {
      name: 'articleDetail',
      path: '/articleDetail/:id',
      component: () => import('@/views/articleDetail.vue')
    },
  ]
})
// 
// ---------------------------------添加全局的导航守卫--前置守卫
// 所有跳转都会先经过这个，在跳转之前触发的
// 它的作用是限制用户的路由跳转，说白了，就是当前的路由到底能不能跳转，我们在跳转之前进行判断并处理
//to：目标，去哪里
//from：哪里来
// next：跳转下一个
router.beforeEach((to,from,next)=>{
   // 我们需要判断一下用户当前目标路由是否是需要验证的路由

  if(to.path.indexOf('/personal') !== -1 || to.path.indexOf('/editUserInfo') !== -1  ){
    // 如果数据多，我们会用数组来做：创建一个，就往数组里面添加一个，然后遍历数组中是否有这个值。
    // let arr = ['/personal', '/aa']

      //从本地存储当中取出token，判断token是否有值，是否有token，有token我才让你跳转，没有token连跳转都不让跳转； （判断用户是否有合法的登陆状态，如果有则继续跳转，如果没有则重定向到登陆）
      let token = localStorage.getItem('toutiao_59_token');
      if(token){
        //如果token有值 ，则为true
        next();
      }else{
        // console.log(1111);
        //token没有值，为undefined,undefined为false，就跳转到登陆，先登陆
        // 重定向到登陆页面
        next({name : 'login'})
      }
  }else{
    next()   //!!!!!!!这里必须加next()，否则页面会不见了
  }
})

//暴露
export default router;