<template>
  <!-- 文章详情页面 -->
  <div class="articaldetail">
    <!-- 文章顶部标题 -->
    <div class="header">
      <div class="left">
        <!--  @click="$router.back() 返回上一层 -->
        <van-icon
          name="arrow-left back"
          @click="$router.back()"
        />
        <span class="iconfont iconnew new"></span>
      </div>
      <!-- -----------------关注 -->
      <span :class="{ active: post.has_follow }" @click="ClickFollowUser">{{
        post.has_follow ? "已关注" : "关注"
      }}</span>
    </div>
    <!-- 文章内容 -->
    <div class="detail">
      <div class="title">{{ post.title }}</div>
      <div class="desc">
        <!-- 访问对象的不存在的属性>>undefined -->
        <!-- 这里使用短路运算符 ，只要第一个post.user为ture有值了才会往后面走post.user.nickname ，所以一开页面已经解析完了，后台数据还没回来，所以如果只写post.user.nickname 系统会报错，因为undefined不会报错，但是如果是undefined.它的成员就会报错 ，所以避免报错 ，加了&& -->
        <span>{{ post.user && post.user.nickname }}</span> &nbsp;&nbsp;
        <!-- ---------------使用过滤器 | 管道符 -->
        <span>{{ post.create_date | singledateFormat }}</span>
      </div>
      <!-- 要使用v-html 否则解析不了标签  img图片在这里结构里面-->
      <!-- ----------------图片文章 -->
      <div class="content" v-html="post.content" v-if="post.type == 1"></div>
      <!-- ----------------视频文章 -->
      <!-- 播放器的基本属性配置 
      controls:是否显示播放器控制面板，如果没有控制面板，则播放器不可见
      src:视频文件的路径
      poster:设置第一帧的画面--封面
      autoplay:自动播放，谷歌不支持
      loop:循环播放-->
      <video
        :src="axios.defaults.baseURL + post.content"
        controls
        v-if="post.type == 2"
        style="width: 100%"
      ></video>
      <!-- -----------------点赞 -->
      <div class="opt">
        <span
          class="like"
          @click="likeArticle"
          :class="{ likeClass: post.has_like }"
          :key="post.id"
        >
          <van-icon class="likevan" name="good-job-o" />{{
            post.comment_length || 0
          }}
        </span>
        <span class="chat"> <van-icon name="chat" class="w" />微信 </span>
      </div>
    </div>

    <!-- 精彩跟帖 -->
    <div class="keeps">
      <h2>精彩跟帖</h2>
      <div class="item" v-for="value in list" :key="value.id">
        <div class="head">
          <img :src="value.user.head_img" alt />
          <div>
            <p>{{ value.user.nickname }}</p>
            <span>{{ value.create_date | offsetTimeFormat }}</span>
          </div>
          <span @click="artReplya(value)">回复</span>
        </div>
        <!-- 封装的组件 -->
        <commentltem
          v-if="value.parent"
          :parent="value.parent"
          @send="artReplya"
        ></commentltem>

        <div class="text">{{ value.content }}</div>
      </div>
      <div class="more">更多跟帖</div>
    </div>
    <!-- 底部评论块 -->
    <commentFooter
      :article="post"
      @artrefresh="artrefresh"
      :comment="temp"
      @reset="temp = null"
    ></commentFooter>
  </div>
</template>
<script>
// 引入封装获取文章详情api
import { getPostById, followUser, unfollowUser } from "@/apis/user.js";
import { likeThisArticle } from "@/apis/post.js";
// 引入封装的过滤器（时间格式化）
import { singledateFormat } from "@/utils/myfilters.js";
import axios from "@/utils/myaxios.js";
import commentFooter from "@/components/commentFooter.vue";
import { getPostCommentList } from "@/apis/post.js";
import { offsetTimeFormat } from "@/utils/myfilters.js";
import commentltem from "@/components/commentltem.vue";
export default {
  components: {
    commentFooter,
    commentltem,
  },
  data() {
    return {
      post: {},
      // 把axios赋值到我定义的当前实例成员，变成当前实例的成员
      axios,
      list: [],
      temp: {},
    };
  },
  mounted() {
    this.init();
  },
  // 注册过滤器
  filters: {
    singledateFormat,
    offsetTimeFormat,
  },
  methods: {
    //封装
    async init() {
      // 获取文章id
      let id = this.$route.params.id;
      // 获取文章详情
      let res = await getPostById(id);
      this.post = res.data.data;
      // console.log(this.post);

      // 展示评论
      let list = (await getPostCommentList(id)).data.data;
      this.list = list.map((v) => {
        v.user.head_img = axios.defaults.baseURL + v.user.head_img;
        return v;
      });
      // console.log(this.list);
    },
    // 关注 -- 点击关注按钮触发
    async ClickFollowUser() {
      try {
        // 传用户ID， 不是传文章ID
        let id = this.post.user.id;
        let res;
        if (this.post.has_follow) {
          // true:说明已关注,则取消关注：
          res = await unfollowUser(id);
          console.log(res);
        } else {
          // false:说明未关注,则要关注：
          res = await followUser(id);
          console.log(res);
        }

        // 实现页面刷新
        this.post.has_follow = !this.post.has_follow;
        //  提示用户
        this.$toast.success(res.data.message);
      } catch (err) {}
    },
    // 点赞 -- 点击点赞按钮触发
    async likeArticle() {
      let res = await likeThisArticle(this.post.id);
      console.log(res);
      // 给出提示
      this.$toast.success(res.data.message);
      // 变化数量
      if (this.post.has_like) {
        //如果是ture 则已经点赞了，要取消点赞
        this.post.comment_length--;
      } else {
        //如果是false 则未点赞，需要点赞
        this.post.comment_length++;
      }
      //更新页面 --切换页面样式
      this.post.has_like = !this.post.has_like;
    },
    //  文章详情的下方的 评论块，刷新页面
    artrefresh() {
      // 刷新页面
      this.init();
      // 回到顶部
      window.scrollTo(0,0);
    },
    artReplya(value) {
      this.temp = value;
      // console.log(this.item);
    },
  },
};
</script>

<style lang='less' scoped>
.header {
  padding: 0px 10px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  > .left {
    height: 100%;
    vertical-align: middle;
    position: relative;
    .van-icon {
      position: absolute;
      top: 15px;
      left: 0;
    }
    > span {
      margin-left: 22px;
      font-size: 50px;
    }
  }
  > span {
    padding: 5px 15px;
    background-color: #f00;
    color: #fff;
    text-align: center;
    border-radius: 15px;
    font-size: 13px;
  }
  //关注后 改变样式
  .active {
    border: 1px solid #cccccc;
    background-color: transparent;
    color: #333;
  }
}
.detail {
  padding: 15px;
  .title {
    font-size: 18px;
    font-weight: bold;
    padding: 10px 0;
  }
  .desc {
    line-height: 30px;
    color: #999;
    font-size: 13px;
  }
  .content {
    text-indent: 2em;
    line-height: 24px;
    font-size: 15px;
    padding-bottom: 30px;
    width: 100%;
    // 深度样式，父组件
    /deep/ img {
      width: 100%;
      display: block;
    }
  }
}
.opt {
  display: flex;
  justify-content: space-around;
  .like,
  .chat {
    height: 25px;
    padding: 0 15px;
    font-size: 14px;
    line-height: 25px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 15px;
  }
  //点赞--动态加样式
  .likeClass {
    border: 1px solid red;
    color: red;
  }
  .w {
    color: rgb(84, 163, 5);
  }
}
.keeps {
  border-top: 5px solid #ddd;
  padding: 0 15px;
  > h2 {
    line-height: 50px;
    text-align: center;
  }
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
  .more {
    width: 100px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 15px;
    margin: 20px auto;
    font-size: 13px;
  }
}
</style>
