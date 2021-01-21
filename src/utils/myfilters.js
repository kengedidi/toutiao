//封装过滤器
//过滤器本质是一个函数
import moment from 'moment'
export const dateFormat =function (data, spe = '/'){
   // 处理
  // 一个小问题，如果是自己使用api方法来实现，记得将数据data先转换为日期格式，否则不能调用日期api方法
  // data = new Date(data) // 将字符串转换为日期格式，再去调用api
  //格式化：
  // console.log(data); //时间是服务器传过来的
  return moment(data).format(`YYYY${spe}MM${spe}DD HH:mm:ss`)
}