<template>
  <div class="editUserInfo">
    <!-- 顶部区域 -->
    <myheader title="编辑资料">
      <!-- slot:指定内容放置到那个插槽中 -->
      <span class="iconfont iconjiantou2" slot="left"></span>
      <span
        class="van-icon van-icon-wap-home-o"
        style="font-size: 22px; color: red"
        slot="right"
      ></span>
    </myheader>
    <!-- 头像区域 -->
    <div class="userimg">
      <img class="img" src="../assets/aa.png" alt="加载失败" />
      <!-- 文件上传组件 -->
      <van-uploader :after-read="afterRead" />
    </div>
    <!-- 单元格区域 -->
    <hmcell title="昵称" desc="火星人"> </hmcell>
    <hmcell title="密码" desc="******"> </hmcell>
    <hmcell title="性别" desc="男"> </hmcell>
  </div>
</template>

<script>
// 引入封装好的头部组件
import myheader from "@/components/myheader.vue";
// 引入封装好的单元格
import hmcell from "@/components/hmcell.vue";
// 引入封装好的axios/api
import {uploadFile} from '@/apis/upload.js'
export default {
  components: {
    myheader,
    hmcell,
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
      console.log(res);
    },
  },
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