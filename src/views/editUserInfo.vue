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
        @click="$router.push({name:'index'})"
      ></span>
    </myheader>

    <!-- 头像区域 -->
    <div class="userimg">
      <img class="img" :src="current.head_img" alt="加载失败" />
      <!-- 文件上传组件 -->
      <van-uploader :after-read="afterRead" />
    </div>

    <!-- 单元格区域 -->
    <!-- ------------昵称 -->
    <hmcell @click="nickshow = !nickshow" title="昵称" :desc="current.nickname">
    </hmcell>
    <!-- required 必填项 -->
    <!-- @confirm="updateNickname" : 当用户提交后，触发updateNickname函数，修改对应的值 -->
    <!-- @cancel="editvalue.nickname = current.nickname" ： 当用户点击取消后，修改对应的值 -->
    <van-dialog
      v-model="nickshow"
      title="编辑昵称"
      show-cancel-button
      @confirm="updateNickname"
      @cancel="editvalue.nickname = current.nickname"
    >
      <!--  v-model="editvalue.nickname" ： 这里如果绑定current ，则用户打开弹出框，修改了然后又取消了。页面也会改变了 -->
      <van-field
        v-model="editvalue.nickname"
        error
        required
        label="昵称"
        placeholder="请输入昵称"
      />
    </van-dialog>

    <!-- ------------密码 -->
    <hmcell title="密码" desc="******" @click="passshow = !passshow"> </hmcell>
    <van-dialog
      v-model="passshow"
      title="编辑密码"
      show-cancel-button
      @confirm="updatePass"
      @cancel="editvalue.originpass = editvalue.newpass = ''"
      :before-close="beforeClose"
    >
      <van-field
        error
        required
        label="旧密码"
        placeholder="请输入原密码"
        v-model="editvalue.originpass"
      />
      <van-field
        error
        required
        label="新密码"
        placeholder="请输入新密码"
        v-model="editvalue.newpass"
      />
    </van-dialog>

    <!-- ------------性别 -->
    <hmcell title="性别" :desc="current.gender == 1 ? '男' : '女'" @click="gendershow = !gendershow "> </hmcell>
    <van-dialog
      v-model="gendershow"
      title="编辑性别"
      show-cancel-button
     @confirm='updateGender'
     @cancel="current.gender = editvalue.gender"
    >
    <van-picker :columns="['女','男']"
                  :default-index="current.gender"
                  @change='genderChange' />
   </van-dialog>
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
      // 编辑昵称
      nickshow: false,
      // 编辑密码
      passshow: false,
      //编辑性别
      gendershow:false,
      // editvalue 是用来方便我们编辑时的数据展示和数据获取。 editvalue： 绑定是弹出框的值
      editvalue: {
        originpass: "", //原密码
        newpass: "", //用户输入的新密码
      },
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
        //弹框提示修改成功 ,不用引入，因为在main.js 已经use全局了。
        this.$toast(res2.data.message);
        // 重新渲染头像，自动刷新
        this.current.head_img = axios.defaults.baseURL + res.data.data.url;
      }
    },
    // ---------修改昵称 （点击提交后触发）
    async updateNickname() {
      let res = await updateUserInfo(this.current.id, {
        nickname: this.editvalue.nickname,
      });
      console.log(res);
      // 修改成功后,修改 展示页面current的nickname值
      this.current.nickname = this.editvalue.nickname;
      // 并且提示修改成功
      this.$toast("昵称修改成功");
    },
    // ---------修改密码 （点击提交后触发）
    async updatePass() {
      //获取本地存储好的用户密码
      let userobj = JSON.parse(localStorage.getItem("toutiao_59_password"));
      // console.log(toutiao_password);
      //判断用户输入的原密码是否输入正确
      if (userobj.password == this.editvalue.originpass) {
        // 原密码正确：在判断新密码是否符合正则
        if (/^.{3,}$/.test(this.editvalue.newpass)) {
          //符合正则：发送服务器请求 进行密码修改
          let res = await updateUserInfo(this.current.id, {
            password: this.editvalue.newpass,
          });
          // console.log(res);
          // 修改成功后：
          // 更新本地存储的数据
          userobj.password = this.editvalue.newpass;
          localStorage.setItem("toutiao_59_password", JSON.stringify(userobj));
          // 提示用户
          this.$toast.success("密码修改成功");
          //清空输入框
          this.editvalue.originpass = this.editvalue.newpass = "";
        } else {
          //新密码不符合正则
          this.$toast.fail("请输入3位及以上的新密码");
        }
      } else {
        // 原密码不正确：
        this.$toast.fail("原密码输入错误");
      }
    },
    // ---------修改密码---添加用户体验，阻止模态框的关闭
    beforeClose(action, done) {
      // 调用方法：  done(false)
      // console.log(action);
      if (action == "confirm") {
        //点击确认
        let toutiao_59_password = JSON.parse(
          localStorage.getItem("toutiao_59_password")
        );
        if (this.editvalue.originpass !== toutiao_59_password.password) {
          //原密码不正确
          done(false);
        } else {
          console.log(111);
          // 原密码正确，再判断新密码正则
          if (!/^.{3,}$/.test(this.editvalue.newpass)) {
            //新密码正则 不符合
            done(false);
          } else {
            // 新密码正则 符合
            done();
          }
        }
      } else {
        //单击取消
        done();
      }
    },
    // ----------修改性别
   async updateGender(){
      let res = await updateUserInfo(this.current.id,{gender:this.editvalue.gender})
      // console.log(res);
      // 更新页面
      this.current.gender = this.editvalue.gender
      // 提示用户
      this.$toast.success('性别修改成功')
    },
    //  ----------修改性别-获取gender值
    genderChange(q,qq,index){
        // console.log(index);
        this.editvalue.gender = index
    }
  },
  async mounted() {
    // 页面一加载完，就根据路由参数id获取个人详情信息
    let res = await getUserInfo(this.$route.params.id);
    // 对img路径数据改造
    res.data.data.head_img = axios.defaults.baseURL + res.data.data.head_img;
    this.current = res.data.data;
    console.log(this.current);
    // console.log(this.current);
    // 仅仅是方便我们编辑时的数据展示和数据获取
    // {...this.current} ...是展开运算符(深拷贝）
    this.editvalue.nickname = this.current.nickname;
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