<template>
 <div class="index">
    <!-- ---------顶部栏 -->
    <div class="header">
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="search"
           @click="$router.push({name:'Search'})">
           <!-- 用到了icon组件 -->
        <van-icon name="search" />
        <span>搜索商品</span>
      </div>
      <div class="user"
           @click="$router.push({path:`/personal/${id}`})">
        <van-icon name="manager-o" />
      </div>
    </div>

    <!-- ---------标签页 -->
    <van-tabs swipeable>
      <van-tab v-for="index in 8"
               :title="'标签 ' + index">
        <div style="height:300px;background:#ccc">内容 {{ index }}</div>
      </van-tab>
    </van-tabs>
  </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.index {
  .header {
    height: 40px;
    display: flex;
    justify-content: space-between;
    background-color: #f00;
    align-items: center;
    color: #fff;
  }
  .search {
    flex: 1;
    height: 30px;
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 15px;
    text-align: center;
    line-height: 30px;
    .van-icon {
      font-size: 16px;
    }
  }
  .van-icon {
    font-size: 24px;
    padding: 0 10px;
  }
  .iconfont {
    font-size: 50px;
    padding: 0 10px;
  }
}
</style>	