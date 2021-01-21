<template>
  <div class="personal">
    <router-link to="/edit_profile">
      <div class="profile">
        <img :src="'http://127.0.0.1:3000' + current.head_img" alt />
        <div class="profile-center">
          <div class="name">
            <span class="iconfont iconxingbienan"></span>{{ current.nickname }}
          </div>
          <div class="time">{{ current.create_date | dateFormat}}</div>
        </div>
        <span class="iconfont iconjiantou1"></span>
      </div>
    </router-link>

    <hmcell title="我的关注" desc="关注的用户"></hmcell>
    <hmcell title="我的跟帖" desc="跟帖/回复"></hmcell>
    <hmcell title="我的收藏" desc="文章/视频"></hmcell>
    <hmcell title="设置"></hmcell>
  </div>
</template>

<script>
import hmcell from "@/components/hmcell.vue";
import { getUserInfo } from "@/apis/user.js";
// import axios from '@/utils/myaxios.vue'
// import moment from 'moment'
import {dateFormat} from '@/utils/myfilters.js'
export default {
  data() {
    return {
      current: {},
    };
  },
  components: {
    hmcell,
  },
  //使用过滤器 局部过滤器：在组件内部创建的过滤器， dateFormat在外部封装了
  filters: {
    dateFormat
  },
  //钩子函数，页面加载完毕后自动触发 //获取路由参数 this.$router
  async mounted() {
    // console.log(this.$route.params.id);
    let res = await getUserInfo(this.$route.params.id);
    // console.log(res);
    if (res.data.message == "获取成功") {
      this.current = res.data.data;
      // console.log(this.current.head_img);
    }
  },
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
