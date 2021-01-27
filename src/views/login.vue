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
        username:'13800138000',
        password:'123'
      }
    };
  },
  methods: {
    // 登陆/注册 按钮
    async login() {
      // console.log("登陆/注册按钮被点击了");
      // console.log(this.user.username,this.user.password);
      if(/^1\d{10}$/.test(this.user.username) && /^.{3,}$/.test(this.user.password)){
          // userlogin(this.user)
          // .then((res)=>{
          //   console.log(res);
          // })
          // .catch((err)=>{
          //   console.log(err);
          // })
        // await:等待，它可以实现   先等待异步操作执行完毕，再继续后面的代码的执行
        // 它可以获取then中的回调参数，并返回
        // await必须保证它所在的函数是async函数
        //  --正则验证正确，符合正则，然后就再发送后台请求数据
          try{
              let res = await userlogin(this.user);
              console.log(res);
              
              if(res.status == 200){
                 // 后台请求数据--登陆成功：
                this.$toast(res.data.message)
                // 登陆成功，将token存储到本地存储当中
                localStorage.setItem('toutiao_59_token',res.data.data.token);
                // 登陆成功，将密码存储到本地存储当中（这样做虽然不安全，但是以后公司会加密？）
                localStorage.setItem('toutiao_59_password',JSON.stringify({...this.user,id:res.data.data.user.id}));

                //---------文章详情页跳转到登陆页之后的页面回跳
                // 获取地址
                let redirecturl = location.href.split('=')[1];
                // 解码：decodeURIComponent()
                redirecturl = decodeURIComponent(redirecturl)
                console.log(redirecturl);
                // 如果redirecturl2 有值，并且不等于undefined undefined是字符串 一定要加引号
                // 为什么要加redirecturl2 !== 'undefined' ： 是因为用户不是从其他页面跳转过来回跳，而且直接正常登陆，那么地址是没有参数的，所以redirecturl2是undefined,undefined是true就会走if第一个，则就跳去首页了，我们是要正常登陆后跳转到个人中心页面
                if(redirecturl && redirecturl !== 'undefined'){
                  // 回跳
                      location.href = redirecturl  //第一种方式
                      //  this.$router.push({ path: redirecturl })  //第二种方式
                }else{
                  // 正常登陆 -- 跳转到个人中心页面
                  this.$router.push({path:'personal/' + res.data.data.user.id})
                }

              }
          }
          catch{
            // 登陆失败，在数据库没有对应的匹配数据
            this.$toast('用户名或密码输入不正确，在数据库没有对应的匹配数据')
          }

      }else{
        //正则验证失败，用户名和密码输入不正确
        this.$toast('请输入正确的用户名和密码，还没有去请求')
      }
    },
    // input输入框-- 有了v-model就不需要这个
    // halder(v) {8
    //   // console.log(v);
    //   this.user.username = v;
    // },
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