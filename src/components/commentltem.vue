<template>
  <div class="commentItem">
    <!-- 添加上一级评论结构 -->
    <!-- v-if:到底要不要再继续递归，只有有parent才需要继续
    :parent:将当前评论的parent属性做为参数传递 -->
    <ci v-if='parent.parent' :parent='parent.parent'></ci>
  
    <div class="top">
      <div class="left">
        <span>{{ parent.user.nickname }}</span> &nbsp;&nbsp;&nbsp;
        <span>{{ parent.user.create_date | offsetTimeFormat}}</span>
      </div>
      <span>回复</span>
    </div>
    <div class="bottom">{{ parent.content }}</div>
  </div>
</template>

<script>
// 复用过滤器
import { offsetTimeFormat } from '@/utils/myfilters.js';
export default {
  // 如果有使用组件递归必须为组件添加name属性，这个属性值就可以当成组件来使用
  name: 'ci',
  // 调用这个组件时，评论数据的parent
  props: ["parent"],
  filters: {
    // 注册过滤器
    offsetTimeFormat
  }
};
</script>

<style lang='less' scoped>
.commentItem {
  border: 1px solid #ccc;
  padding: 5px;
  margin-top: 10px;
  .top {
    font-size: 12px;
    color: #aaa;
    display: flex;
    justify-content: space-between;
  }
  .bottom {
    font-size: 13px;
    line-height: 40px;
  }
}
</style>