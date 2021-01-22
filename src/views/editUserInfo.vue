<template>
  <div class="editUserInfo">
    <!-- 顶部 -->
    <myheader title="编辑资料">
       <!-- slot:指定内容放置到那个插槽中 -->
      <span class="iconfont iconjiantou2" slot="left"></span>
      <span class="van-icon van-icon-wap-home-o" slot="right"></span>
    </myheader>
    
  </div>
</template>

<script>
// 引入封装好的头部组件
import myheader from '@/components/myheader.vue'
export default {
    components: {
      myheader
    }
}
</script>

<style lang="less" scoped>

</style>