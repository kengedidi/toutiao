<template>
  <div class="mystars">
    <hmheader title="我的收藏">
      <span
        slot="left"
        class="iconfont iconjiantou2"
        @click="$router.back()"
      ></span>
    </hmheader>
    <div class="content">
      <articleBlock v-for="item in startsList" :key='item.id' :post='item'></articleBlock>
    </div>
  </div>
</template>

<script>
import hmheader from "@/components/myheader.vue";
import articleBlock from "@/components/articleBlock.vue";
import { getUserStars } from "@/apis/user.js";
export default {
  components: {
    hmheader,
    articleBlock,
  },
  data() {
    return {
      startsList:[]
    };
  },
  async mounted () {
      let res = await getUserStars()
      this.startsList = res.data.data;
      console.log(this.startsList);
  }
 

};
</script>

<style lang="less" scoped>
</style>