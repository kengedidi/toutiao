<template>
  <div class="login">
    <div class="container">
      <div class="close"><span class="iconfont iconicon-test"></span></div>
      <div class="logo"><span class="iconfont iconnew"></span></div>
      <!-- input输入框 -->
      <div class="inputs">
        <!-- <hminput
          class="input"
          placeholder="手机号/用户名"
          @input="halder" 
          :value="user.username">
        </hminput> -->
        <hminput
          placeholder="手机号/用户名"
          v-model="user.username"
          :rules="/^1\d{10}$/"
        >
          <!-- |^1\d{4} -->
          <!-- 正则：/格式/ ， ^以1开头，\d代表0-9数字，{10} 次数为10次，| 表示或者，  ^1\d{4} ：以1开头，0-9数字，出现4次  {}表示次数，可以固定，也可以区间 // -->
        </hminput>
        <!-- v-model相当于：做了2件事：
        1. 为元素的value属性赋值
        2. 监听自组件发出的input事件
         -->
        <hminput placeholder="密码" v-model="user.password"> </hminput>
      </div>

      <p class="tips">
        没有账号？
        <a href="#/register" class="">去注册</a>
      </p>
      <!-- 登陆注册点击按钮 -->
      <hmbutton @click="login" type="paimary">
        <span class="iconfont iconicon-test"></span>
        <span>登陆</span>
      </hmbutton>
    </div>
  </div>
</template>

<script>
// 引入的自定义模块
import hmbutton from "@/components/mybutton.vue";
import hminput from "@/components/myinput.vue";
// 引入登陆方法
import { userlogin } from '@/apis/user.js' ;

export default {
  data() {
    return {
      user:{
        // username:'13800138000',
        // password:'123'
        username:'',
        password:''
      }
    };
  },
  methods: {
    // 登陆/注册 按钮
    login() {
      // console.log("登陆/注册按钮被点击了");
      // console.log(this.user.username,this.user.password);
      if(/^1\d{10}$/.test(this.user.username) && /^.{3,}$/.test(this.user.password)){
          userlogin(this.user)
          .then((res)=>{
            console.log(res);
          })
          .catch((err)=>{
            console.log(err);
          })
      }else{
        this.$toast('您的用户名和密码输入不正确')
      }
    },
    // input输入框
    halder(v) {
      // console.log(v);
      this.user.username = v;
    },
  },
  // 注册引入的自定义模块
  components: {
    hmbutton,
    hminput,
  },
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