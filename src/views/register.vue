<template>
  <!-- 这是注册页面 -->
  <div class="register">
    <div class="container">
      <div class="close"><span class="iconfont iconicon-test"></span></div>
      <div class="logo"><span class="iconfont iconnew"></span></div>
      <!-- input输入框 -->
      <div class="inputs">
        <hminput
          placeholder="手机号/用户名"
          v-model="user.username"
          :rules="/^1\d{10}$/"
        >
        </hminput>
        <!-- v-model相当于：做了2件事：
        1. 为元素的value属性赋值
        2. 监听自组件发出的input事件
         -->
        <hminput placeholder="密码" v-model="user.password"> </hminput>
        <hminput placeholder="昵称" v-model="user.nickname"> </hminput>
      </div>
      <p class="tips">
        已有账号？
        <a href="#/login" class="">去登陆</a>
      </p>
      <!-- 登陆注册点击按钮 -->
      <hmbutton type="paimary" @click="register">
        <span class="iconfont iconicon-test"></span>
        <span>注册</span>
      </hmbutton>
    </div>
  </div>
</template>

<script>
// 引入的自定义模块
import hmbutton from "@/components/mybutton.vue";
import hminput from "@/components/myinput.vue";

//引入封装的注册的axios
import { userRegister } from '@/apis/user.js'

export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
        nickname: "",
      },
    };
  },
  //注册引入的自定义模块
  components: {
    hmbutton,hminput
  },
  methods: {  
    async register(e){
      let res = await userRegister(this.user);
            // console.log(res);
        if(res.status == 200 ){
          this.$toast.success(res.data.message);
          //注册成功就跳转页面
          this.$router.push({name:'login'})
        }else{
          this.$toast.fail('注册失败，请重试')
        }
    }
  }
};
</script>


<style lang="less" scoped>
.container {
  padding: 20px;
}

.close {
  span {
    //适配方案：vw和vh
    // vw是视图的宽度的单位，100vw意思是 与屏幕100%同宽
    //vw是指视口的宽度(viewport width),每个屏幕都会将宽度分为100份，每一份就是一个vw。高度也分为100份，每一份就是一个vh
    //我们的ui稿件是以360来进行制作的
    font-size: 27 / 360 * 100vw;
  }
}

.logo {
  display: flex;
  justify-content: center;

  span {
    display: block;
    font-size: 126 / 360 * 100vw;
    color: #d81e06;
  }
}

.inputs {
  input {
    margin-bottom: 20px;
  }
}

.tips {
  text-align: right;
  margin-bottom: 20px;

  a {
    color: #3385ff;
  }
}
</style>