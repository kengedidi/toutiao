// 此文件封装axios
import axios from 'axios'
import {Toast} from 'vant'
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


// 添加响应拦截器,所有响应都会经过这个响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  //console.dir() 打印对象
  console.dir(error);
  // 对响应错误做点什么:  
   //只有是token相关的错误，才会进行重定向
  if(error.response.data.message == '用户信息验证失败'){
      Toast.fail('用户信息验证失败,请重新登陆')

      // 重定向到登陆页
    console.log('href:', location.href);
    console.log('hash:', location.hash.substr(1));
      // 重点细节：to会被解析为锚链接：#/url
      window.location.href = '#/login?redirecturl=' + location.href; 
      //第一种方式 对应：登陆页面操作：location.href = redirecturl
      
      // window.location.href = '#/login?redirecturl=' + location.hash.substr(1); 
      //第二种方式 对应：登陆页面操作： this.$router.push({ path: redirecturl })
    
  }else{
    Toast.fail(error.response.data.message)
  }
  return Promise.reject(error);
});

//暴露
export default axios