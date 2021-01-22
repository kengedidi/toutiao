<template>
  <div class="editUserInfo">
    <!-- 顶部区域 -->
    <myheader title="编辑资料" >
      <!-- slot:指定内容放置到那个插槽中 -->
      <!-- @click="$router.back() 还回上一层 -->
      <span class="iconfont iconjiantou2" slot='left'  @click="$router.back()"></span>
      <span
        class="van-icon van-icon-wap-home-o"
        style="font-size: 22px; color: red"
        slot='right'
      ></span>
    </myheader>
    <!-- 头像区域 -->
    <div class="userimg">
      <img class="img" :src="current.head_img" alt="加载失败" />
      <!-- 文件上传组件 -->
      <van-uploader :after-read="afterRead" />
    </div>
    <!-- 单元格区域 -->
    <hmcell title="昵称" :desc="current.nickname"> </hmcell>
    <hmcell title="密码" desc="******"> </hmcell>
    <hmcell title="性别" :desc="current.gender == 1 ? '男' : '女' "> </hmcell>
  </div>
</template>

<script>
// 引入封装好的头部组件
import myheader from "@/components/myheader.vue";
// 引入封装好的单元格
import hmcell from "@/components/hmcell.vue";
// 引入封装好的axios/api
import {uploadFile} from '@/apis/upload.js'
import {getUserInfo} from '@/apis/user.js'
import axios from '@/utils/myaxios.js'

export default {
  components: {
    myheader,
    hmcell,
  },
  data () {
    return {
      current:{}
    }
  },
  methods: {
   async afterRead(myfile) {
      // 此时可以自行将文件上传至服务器
      // console.log(myfile);
      // 收集文件数据
      let formdata = new FormData;
      formdata.append('file',myfile.file)
      // 实现文件上传
      let res = await uploadFile(formdata)
      // console.log(res);
    },
  },
 async mounted () {
    // 页面一加载完，就根据路由参数id获取个人详情信息
    let res = await getUserInfo(this.$route.params.id)
    // 对img路径数据改造
    res.data.data.head_img = axios.defaults.baseURL + res.data.data.head_img;
    this.current = res.data.data
      console.log(this.current);
  }
};
</script>

<style lang="less" scoped>
.userimg {
  padding: 30px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  .img {
    width: 100 * 100vw / 360;
    height: 100 * 100vw / 360;
    border-radius: 50%;
  }

  /deep/ .van-uploader {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
  }
  /deep/ .van-uploader__upload {
    width: 100 / 360 * 100vw;
    height: 100 / 360 * 100vw;
    margin: 0;
  }
}
</style>