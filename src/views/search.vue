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
      <router-link to="">美女</router-link>
      <router-link to="">美女</router-link>
    </div>
    <!-- 搜索结果 -->
    <div class="resultList">
      <h2>搜索结果</h2>
      <router-link to="/articleDetail/"></router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userKey: "",
    };
  },
  methods: {
     onSearch(){

    }
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