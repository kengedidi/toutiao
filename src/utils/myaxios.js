// 此文件封装axios
import axios from 'axios'

// 配置基准路径,基准路径最终会拼接到url前面
axios.defaults.baseURL = 'http://localhost:3000'

//暴露
export default axios