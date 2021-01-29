<template>
  <!-- 评论页面 -->
  <div class="comments">
    <!-- 头部 -->
    <myheader title="精彩评论">
      <span
        slot="left"
        class="iconfont iconjiantou2"
        @click="$router.back()"
      ></span>
    </myheader>

    <div class="lists">
      <!-- 一个item 就是一个新闻块 -->
      <div class="item" v-for="value in commentList" :key="value.id">
        <div class="head">
          <img :src="value.user.head_img" alt />
          <div>
            <p>{{value.user.nickname}}</p>
            <span>{{value.user.create_date | offsetTimeFormat}}</span>
          </div>
          <span>回复</span>
        </div>
        <div class="text">{{value.content}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import myheader from "@/components/myheader.vue";
import { getPostCommentList } from "@/apis/post.js";
import axios from '@/utils/myaxios.js'
// 过滤器
import {offsetTimeFormat} from '@/utils/myfilters.js'
export default {
  data() {
    return {
      commentList: [],
    };
  },
  components: {
    myheader,
  },
  filters: {
    offsetTimeFormat
  },
  async mounted() {
    //获取文章ID
    let id = this.$route.params.id;
    //调用api方法获取所有评论数据
    let res = await getPostCommentList(id);
    //数据改造，并且赋值commentList成员，在渲染页面
    this.commentList = res.data.data.map((v) => {
        v.user.head_img = axios.defaults.baseURL + v.user.head_img
        return v
    });
  },
};
</script>

<style lang='less' scoped>
.lists {
  // border-top: 5px solid #ddd;
  padding: 0 15px;
  .item {
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
    .head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      > img {
        width: 50/360 * 100vw;
        height: 50/360 * 100vw;
        display: block;
        border-radius: 50%;
      }
      > div {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        > span {
          font-size: 12px;
          color: #999;
          line-height: 25px;
        }
      }
      > span {
        color: #999;
        font-size: 13px;
      }
    }
    .text {
      font-size: 14px;
      color: #333;
      padding: 20px 0 10px 0;
    }
  }
}
</style>