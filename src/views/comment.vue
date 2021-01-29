<template>
<!-- 评论页面 -->
  <div class="comments">
    <!-- 头部 -->
    <myheader title="精彩评论">
      <span slot="left"
            class="iconfont iconjiantou2"
            @click="$router.back()"></span>
    </myheader>

    <div class="lists">
      <div class="item">
        <div class="head">
          <img src="../assets/logo.png"
               alt />
          <div>
            <p>火星网友</p>
            <span>2小时前</span>
          </div>
          <span>回复</span>
        </div>
        <div class="text">文章说得很有道理</div>
      </div>
    </div>
  </div>
</template>

<script>
import myheader from "@/components/myheader.vue";
export default {
  components: {
    myheader
  }
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