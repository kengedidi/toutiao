// 此文件封装axios
import axios from 'axios'

// 配置基准路径,基准路径最终会拼接到url前面
axios.defaults.baseURL = 'http://localhost:3000'


// 添加请求拦截器,所有请求都会经过这个请求拦截器
//添加拦截器，可以不用多次写 请求头传递token
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么,获取token进行传递
  let token = localStorage.getItem('toutiao_59_token')
  // 通过请求头的方式传递token
  // console.log(config); //config是默认的参数，但默认里面是没有请求报文头Authorization，所以 config.headers.Authorization添加一个 然后赋值token
    if(token){  
      // 判断有无token，有就
      config.headers.Authorization = token
    }
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});


//暴露
export default axios