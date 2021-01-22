<template>
  <div class="hmcell" @click="handlerClick">
    <div class="left">{{title}}</div>
    <div class="right">{{desc}} <span class="iconfont iconjiantou1"></span></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    };
  },
  props: ["title","desc"],
  methods: {
    handlerClick(e){
      this.$emit('click',e)
    }
  }
};
</script>

<style lang="less" scoped>
.hmcell {
  height: 60px;
  line-height: 60px;
  display: flex;
  padding: 10px 20px;
  justify-content: space-between;
  border-bottom:1px solid #Ccc;
  .left {
    font-size: 14px;
  }
  .right {
    color: #999;
    font-size: 12px;
    .iconfont{
      font-size: 12px;
      margin-left: 5px;
    }
  }
}
</style>