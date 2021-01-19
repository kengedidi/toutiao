//引入封装的axios
import axios from '@/utils/myaxios.js'

//登陆 
export const userlogin = function (data) {
  return axios({
    url:'/login',
    method:'post',
    data
  })
}

//注册
export const userRegister = function (data){
  return axios({
    url:'/register',
    method:'post',
    data
  })
}