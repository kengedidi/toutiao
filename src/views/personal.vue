<template>
<!-- 个人中心页面 -->
  <div class="personal">
    <!-- 传递id动态绑定 跳转到 编辑用户信息 页面 -->
    <router-link :to="'/editUserInfo/' + $route.params.id">
      <div class="profile">
        <!-- 渲染之前，就对数据进行改造。改造好了再渲染 -->
        <img :src=" current.head_img" alt />
        <div class="profile-center">
          <div class="name">
            <span :class="{iconfont:true, iconxingbienan : current.gender == 1 ,iconxingbienv : current.gender == 0 }"></span>{{ current.nickname }}
          </div>
          <div class="time">{{ current.create_date | dateFormat }}</div>
        </div>
        <span class="iconfont iconjiantou1"></span>
      </div>
    </router-link>

    <hmcell title="我的关注" desc="关注的用户" @click="$router.push({name:'myfollows'})"></hmcell>
    <hmcell title="我的跟帖" desc="跟帖/回复"></hmcell>
    <hmcell title="我的收藏" desc="文章/视频" @click="$router.push({name:'mystars'})"></hmcell>
    <hmcell title="设置"></hmcell>
    <hmbutton type="danger" style="margin:20px auto 0" @click="exit">退出</hmbutton>
  </div>
</template>

<script>
import hmcell from "@/components/hmcell.vue";
import { getUserInfo } from "@/apis/user.js";
// axios 引入之后可以使用，但是并不是当前组件实例的成员，所以不能this.调成，this.是调用当前vue组件成员的
import axios from "@/utils/myaxios.js";
import { dateFormat } from "@/utils/myfilters.js";
import hmbutton from "@/components/mybutton.vue";
export default {
  data() {
    return {
      current: {},
      // 第一种方式： 把axios变成当前vue实例组件成员
      //方法： 在当前组件定义一个成员axios，然后把引入的axios指向/赋值给新定义的当前实例成员。这样当前实例就有引入axios的这个成员了，就可以this.调用了  //但是这种不推荐
      // axios: axios,
    };
  },
  components: {
    hmcell,
    hmbutton
  },
  //使用过滤器 局部过滤器：在组件内部创建的过滤器， dateFormat在外部封装了
  filters: {
    dateFormat,
  },
  //钩子函数，页面加载完毕后自动触发 //获取路由参数 this.$router
  async mounted() {
    // console.log(this.$route.params.id);
    let res = await getUserInfo(this.$route.params.id);
    // console.log(res);
    if (res.data.message == "获取成功") {
      // 第二种：（推荐）把axios变成当前vue实例组件成员 ： 渲染之前，就对数据进行改造。改造好了再渲染。
      res.data.data.head_img =  axios.defaults.baseURL + res.data.data.head_img;
      this.current = res.data.data;
      // console.log(this.current.head_img);
    }
  },
  methods: {
    // 退出
    exit(){
      // 删除本地存储的密码 和 token
      localStorage.removeItem('toutiao_59_password')
      localStorage.removeItem('toutiao_59_token')
      // 跳转到首页
      this.$router.push({path:'/index'})
    }
  }
};
</script>

<style lang='less' scoped>
.personal {
  width: 100vw;
  height: 100vh;
  background-color: #eee;
  
}
a {
  color: #666;
}
.profile {
  display: flex;
  padding: 20px 10px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 5px #ddd solid;

  img {
    width: 70 / 360 * 100vw;
    height: 70 / 360 * 100vw;
    border-radius: 50%;
  }

  .profile-center {
    flex: 1;
    padding: 0 10px;
  }

  .name {
    span {
      color: #75b9eb;
    }
  }

  .time {
    color: #666;
    font-size: 14px;
    margin-top: 5px;
  }
}
</style>
