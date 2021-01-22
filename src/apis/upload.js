// 引入封装的axios
import axios from '@/utils/myaxios.js'

// 实现文件上传
export const uploadFile = function (data){
    return axios ({
      method:'post',
      url:'/upload',
      data
    })
}