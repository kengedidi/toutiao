//引入已封装好的axios
import axios from '@/utils/myaxios.js'

// --------此文件封装 新闻数据 的api：

// 栏目 :获取所有栏目数据  --接口文档没说明要传参数
// export是暴露
export const getCateList = function () {
  return axios({
    //get请求 ，可以不写默认get
    url: '/category'
  })
}