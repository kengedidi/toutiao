<template>
  <div class="comment">
    <div class="addcomment" v-show="!isFocus">
      <input type="text" placeholder="写跟帖" @focus="handlerFocus" />
      <!-- 文章评论图标 -->
      <span
        class="comment"
        @click="$router.push({ path: '/comment/' + article.id })"
      >
        <i class="iconfont iconpinglun-"></i>
        <em>{{ article.comment_length }}</em>
      </span>
      <!-- 文章收藏 -->
      <i
        class="iconfont iconshoucang"
        :class="{ artivleClass: article.has_star }"
        @click="starArticle"
      ></i>
      <!-- 文章分享 -->
      <i class="iconfont iconfenxiang"></i>
    </div>
    <!-- 一级 评论 -->
    <div class="inputcomment" v-show="isFocus">
      <textarea ref="commtext" rows="5" v-model="content"></textarea>
      <div>
        <span @click="sendComment">发 送</span>
        <span @click="cancelComment">取 消</span>
      </div>
    </div>
  </div>
</template>

<script>
import { starThisArticle } from "@/apis/post.js";
// 引入发表评论api
import { publishComment } from "@/apis/post.js";
export default {
  props: {
    article: {
      type: Object, //类型对象
      required: true, //必须传值
    },
     // 这就是用户单击回复时的对应的评论对象
    comment:{
      type: Object,
      default: null
    }
  },
  data() {
    return {
      // 文本输入框是否聚焦
      isFocus: false,
      content: "",
    };
  },
  methods: {
    // 点击取消评论 和 点击评论聚焦触发----显示与隐藏评论块
    // 获取焦点时触发
    handlerFocus() {
      this.isFocus = !this.isFocus;
      setTimeout(() => {
        this.$refs.commtext.focus();
      },0)
    },
    // 收藏
    async starArticle() {
      console.log(this.article);
      let res = await starThisArticle(this.article.id);
      // console.log(res);
      // 提示用户
      this.$toast.success(res.data.message);
      //刷新页面
      this.article.has_star = !this.article.has_star;
    },
    // 发表一级评论
    async sendComment() {
      // 去除文字头尾空白
      if (this.content.trim().length == 0) {
        this.$toast("请先输入发表的内容");
        return;
      }
      let data = { content: this.content };
      // 二层评论:
      // 如果是单击回复，就会有comment对象，说明有上一级评论
      // 只有传递了评论对象，才弹出输入框1
      if(this.comment){ 
        // console.log('=====',this.comment);
        data.parent_id = this.comment.id
      }
      let res = await publishComment(this.article.id, data);
      if (res.status == 200) {
        this.$toast.success(res.data.message); //用户提示
        this.isFocus = !this.isFocus //隐藏输入框
        this.content = '';  //输入框清空
        this.$emit('refreshData') //刷新评论页面
        this.$emit('reset') //重置
        this.$emit('artrefresh')
      }
    },
    // 取消评论
    cancelComment(){
        // 不能仅仅重置 isFocus,否则会造成第二次单击同一个回复按钮的时候不再触发侦听器，也就会造成输入框不再弹出
      this.isFocus = false //关闭文本框
      this.content = '' //清空文本框
       // 不能在子组件中直接修改props成员的值，这个值只能由父组件进行修改
      this.$emit('reset') //重置comment对象的值为null
    }
  },
  watch: {
    comment(){
      if(this.comment){
        console.log(this.comment);
        this.isFocus = true
          setTimeout(()=>{
            this.$refs.commtext.focus()
          },0)
      }
    }
  }
};
</script>

<style lang='less' scoped>
.comment {
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
}
.inputcomment {
  padding: 10px;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  background-color: #fff;
  align-items: flex-end;
  textarea {
    flex: 3;
    background-color: #eee;
    border: none;
    border-radius: 10px;
    padding: 10px;
  }
  div {
    padding: 20px;
  }
  span {
    display: block;
    flex: 1;
    height: 24px;
    line-height: 24px;
    padding: 0 10px;
    background-color: #f00;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    font-size: 13px;
  }
}
.addcomment {
  width: 100%;
  box-sizing: border-box;
  background-color: #fff;
  padding: 10px;
  margin-top: 20px;
  display: flex;
  text-align: center;
  position: absolute;
  bottom: 0;
  left: 0;
  > input {
    flex: 4;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    border: none;
    background-color: #eee;
    padding-left: 20px;
    font-size: 14px;
  }
  i {
    font-size: 20px;
  }
  .active {
    color: #f00;
  }
  > span {
    flex: 1;
    position: relative;
    > em {
      position: absolute;
      right: 0;
      top: -5px;
      font-size: 10px;
      background-color: #f00;
      color: #fff;
      border-radius: 5px;
      padding: 3px 5px;
    }
  }
  > i {
    flex: 1;
  }
  .artivleClass {
    color: red;
  }
}
</style>