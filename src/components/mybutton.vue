<template>
  <div
    class="btn"
    @click="mybutton"
    :class='{ "paimary": type == "paimary", "danger": type == "danger" }'
  >
    <!-- 添加插槽 -->
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    type: String,
  },
  methods: {
    mybutton(e) {
      this.$emit("click", e);
    },
  },
};
</script>

<style lang="less" scoped>
// 默认样式
.btn {
  width: 314 * 100vw / 360;
  height: 60px;
  line-height: 60px;
  background-color: #ccc;
  color: #fff;
  text-align: center;
  font-size: 22px;
  border-radius: 30px;
}

.paimary {
  background-color: green;
}
.danger {
  background-color: red;
}
</style>