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
            <p>{{ value.user.nickname }}</p>
            <span>{{ value.user.create_date | offsetTimeFormat }}</span>
          </div>
          <span @click="replayComment(value)">回复</span>
        </div>
        <commentltem v-if="value.parent" :parent="value.parent" @send="replayComment"></commentltem>
        <div class="text">{{ value.content }}</div>
      </div>
    </div>
    <commentFooter :article="post" @refreshData="refreshData" :comment="temp" @reset="temp=null"></commentFooter>
  </div>
</template>
<script>
import myheader from "@/components/myheader.vue";
import { getPostCommentList } from "@/apis/post.js";
import axios from '@/utils/myaxios.js'
// 引入封装的评论块
import commentltem from '@/components/commentltem.vue'
 // 过滤器
import {offsetTimeFormat} from '@/utils/myfilters.js'
// 复用 底部评论块
import commentFooter from '@/components/commentFooter.vue'
import {getPostById} from '@/apis/user.js'
export default {
  data() {
    return {
      commentList: [],
      post:{},
      temp:{}
    };
  },
  components: {
    myheader,commentltem,commentFooter
  },
  filters: {
    offsetTimeFormat
  },
   mounted() {
      this.init()
  },
  methods: {
   async init(){
      //获取文章ID
    let id = this.$route.params.id;
    // 
    let res = await getPostCommentList(id);
    //数据改造，并且赋值commentList成员，在渲染页面
    this.commentList = res.data.data.map((v) => {
        v.user.head_img = axios.defaults.baseURL + v.user.head_img
        return v
    });
    // console.log(this.commentList);

    // 获取文章ID获取 文章详情
    this.post = (await getPostById(id)).data.data
    // console.log(this.post);
    },
    //子组件发表评论后 触发 -- 刷新页面 
    refreshData(){
      // 刷新页面
      this.init()
      // 回到顶部
      window.scrollTo(0,0)
    },
    // 点击回复按钮，显示输入框
    replayComment(value){
      this.temp = value
    }
  }
};
</script>

<style lang='less' scoped>
.lists {
  // 加样式
  .commentItem {
    padding: 5px;
    border: 1px solid #ccc;
    margin-top: 5px;
    .top {
      width: 100%;
      display: flex;
      justify-content: space-between;
      color: #ccc;
      font-size: 12px;
    }
    .buttom {
      padding: 10px 0;
    }
  }
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
.comments {
  padding-bottom: 70px;
}
</style>