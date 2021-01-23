//引入封装的axios
import axios from '@/utils/myaxios.js'

//登陆 
export const userlogin = function (data) {
  return axios({
    url: '/login',
    method: 'post',
    data
  })
}

//注册
export const userRegister = function (data) {
  return axios({
    url: '/register',
    method: 'post',
    data
  })
}

//个人中心页面
//id 是谁调用谁传进来
export const getUserInfo = function (id) {
  return axios({
    // 一定要注意，参数是路由参数
    //默认是get请求，所以可以不用写method:'get',
    url: `/user/${id}`,
    // 添加了拦截器就不用每个需要授权的请求都传递 请求报文头token了
    // headers: { Authorization: localStorage.getItem('toutiao_59_token') }
  })
}

//编辑用户信息
//文档说明用户编辑 要传id和需要修改的数据
export const updateUserInfo = function (id,data){
   return axios ({
      method:'post',
      url:`/user_update/${id}`,
      data
   })
}