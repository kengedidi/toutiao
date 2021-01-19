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