///引入已封装好的axios
import axios from '@/utils/myaxios.js'

// --------此文件封装 新闻列表数据 的api：

// 文章列表 :根据栏目id 获取对应的栏目 新闻文章数据  --接口文档说明要传栏目id参数
// export是暴露
export const getPostList = function (params) {
  return axios({
    //get请求 ，可以不写默认get
    url: '/post',
    params
  })  
}