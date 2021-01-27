<template>
  <!-- 封装顶部 -->
  <div class="header">
    <!-- 具名插槽，可以为插槽设置名称，后期可以将内容放置到指定名称的插槽中 -->
    <div>
      <slot name="left"></slot>
    </div>
    <div>{{ title }}</div>
    <div>
      <slot name="right"></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: ["title"],
};
</script>
<style lang="less" scoped>
.header {
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  //或者使用 line-height: 50px;
  border-bottom: 1px solid #ccc;
  padding: 0 10px;
}
</style>
