<template>
  <div class="editUserInfo">
    <!-- 顶部区域 -->
    <myheader title="编辑资料">
      <!-- slot:指定内容放置到那个插槽中 -->
      <!-- @click="$router.back() 还回上一层 -->
      <span
        class="iconfont iconjiantou2"
        slot="left"
        @click="$router.back()"
      ></span>
      <span
        class="van-icon van-icon-wap-home-o"
        style="font-size: 22px; color: red"
        slot="right"
      ></span>
    </myheader>

    <!-- 头像区域 -->
    <div class="userimg">
      <img class="img" :src="current.head_img" alt="加载失败" />
      <!-- 文件上传组件 -->
      <van-uploader :after-read="afterRead" />
    </div>

    <!-- 单元格区域 -->
    <!-- 昵称 -->
    <hmcell @click="nickshow = !nickshow" title="昵称" :desc="current.nickname">
    </hmcell>
    <!-- required 必填项 -->
    <!-- @confirm="updateNickname" : 当用户提交后，触发updateNickname函数，修改对应的值 -->
    <!-- @cancel="editvalue.nickname = current.nickname" ： 当用户点击取消后，修改对应的值 -->

    <van-dialog v-model="nickshow" title="编辑昵称" show-cancel-button  @confirm="updateNickname" @cancel="editvalue.nickname = current.nickname">
    <!--  v-model="editvalue.nickname" ： 这里如果绑定current ，则用户打开弹出框，修改了然后又取消了。页面也会改变了 -->
      <van-field
        v-model="editvalue.nickname"
        error
        required
        label="昵称"
        placeholder="请输入昵称"
      />
    </van-dialog>


    <!-- 密码 -->
    <hmcell title="密码" desc="******"> </hmcell>
    <!-- 性别 -->
    <hmcell title="性别" :desc="current.gender == 1 ? '男' : '女'"> </hmcell>
  </div>
</template>

<script>
// 引入封装好的头部组件
import myheader from "@/components/myheader.vue";
// 引入封装好的单元格
import hmcell from "@/components/hmcell.vue";
// 引入封装好的axios/api
import { uploadFile } from "@/apis/upload.js";
import { getUserInfo, updateUserInfo } from "@/apis/user.js";
import axios from "@/utils/myaxios.js";

export default {
  components: {
    myheader,
    hmcell,
  },
  data() {
    return {
      // current 是用来渲染页面的一个对象。  current 绑定是显示页面的值
      current: {},
      nickshow: false,
      // editvalue 是用来方便我们编辑时的数据展示和数据获取。 editvalue： 绑定是弹出框的值
      editvalue: {},
    };
  },
  methods: {
    // --------文件上传及头像编辑
    async afterRead(myfile) {
      // 此时可以自行将文件上传至服务器
      // console.log(myfile);
      // 收集文件数据
      let formdata = new FormData();
      formdata.append("file", myfile.file);
      // 01----------实现文件上传
      let res = await uploadFile(formdata);
      // console.log(res);
      if (res.data.message == "文件上传成功") {
        // 02----------编辑用户头像
        let res2 = await updateUserInfo(this.current.id, {
          head_img: res.data.data.url,
        });
        // console.log(res2);
        //弹框提示修改成功 ,不用引入，因为在main.js 已经use全局了。
        this.$toast(res2.data.message);
        // 重新渲染头像，自动刷新
        this.current.head_img = axios.defaults.baseURL + res.data.data.url;
      }
    },
    // ---------编辑昵称 （点解提交后触发）
    async updateNickname(){
      let res = await updateUserInfo(this.current.id,{nickname:this.editvalue.nickname})
      console.log(res);
      // 修改成功后,修改 展示页面current的nickname值
      this.current.nickname = this.editvalue.nickname
      // 并且提示修改成功
      this.$toast('昵称修改成功')
    }
  },
  async mounted() {
    // 页面一加载完，就根据路由参数id获取个人详情信息
    let res = await getUserInfo(this.$route.params.id);
    // 对img路径数据改造
    res.data.data.head_img = axios.defaults.baseURL + res.data.data.head_img;
    this.current = res.data.data;
    // console.log(this.current);
    // 仅仅是方便我们编辑时的数据展示和数据获取
    // {...this.current} ...是展开运算符(深拷贝）
    this.editvalue = { ...this.current };
    // console.log(this.editvalue);
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