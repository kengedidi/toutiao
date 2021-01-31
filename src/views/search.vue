<template>
  <div class="search">
    <!-- 头部搜索栏 -->
    <div class="header">
      <span class="iconfont iconjiantou2" @click="$router.back()"></span>
      <van-search
        v-model="userKey"
        placeholder="请输入搜索关键词"
        shape="round"
      >
      </van-search>
      <div @click="onSearch">搜索</div>
    </div>
    <!-- 历史记录 -->
    <div class="historyList">
      <h2>历史记录</h2>
      <div
        v-for="(value, index) in history"
        :key="index"
        @click="search(value)"
        >{{ value }}</div
      >
    </div>
    <!-- 搜索结果 -->
    <div class="resultList">
      <h2>搜索结果</h2>
      <router-link
        :to="'/articleDetail/' + value.id"
        v-for="value in list"
        :key="value.id"
        >{{ value.title }}</router-link
      >
    </div>
  </div>
</template>

<script>
import { searchPost } from "@/apis/post.js";
export default {
  data() {
    return {
      userKey: "",
      list: [], 
      history: [],
    }
  },
  mounted() {
    this.history =
      JSON.parse(localStorage.getItem("heimatoutiao_search_59")) || [];
  },
  methods: {
    search(value) {
      this.userKey = value;
      this.onSearch();
    },
    async onSearch() {
      if (this.userKey.trim().length == 0) {
        this.$toast.fail("请先输入搜索的内容");
      } else {
        // 先判断是否存在了当前的关键字
        let index = this.history.indexOf(this.userKey); //存在就返回它的下标，不存在就返回-1
        if (index != -1) {
          //存在 ==》 删除
          this.history.splice(index, 1);
        }
        // 将当前的关键字添加到搜索历史的第一位置
        this.history.unshift(this.userKey);
        // 将数组存储到本地存储
        localStorage.setItem("heimatoutiao_search_59", JSON.stringify(this.history));
        let res = await searchPost(this.userKey);

        this.list = res.data.data;
        console.log(this.list);
      }
    },
  },
};
</script>

<style lang='less' scoped>
.header {
  display: flex;
  height: 50px;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  border-bottom: 1px solid #ccc;
  .van-search {
    flex: 1;
    padding: 5px 12px;
  }
}
.historyList,
.resultList {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  h2 {
    line-height: 40px;
    font-weight: bold;
  }
  > a {
    display: block;
    text-decoration: underline;
    line-height: 30px;
    color: rgb(113, 112, 112);
  }
}
</style>