<template>
  <div class="catemanager">
    <myheader title="频道管理">
      <span slot="left"
            class="iconfont iconjiantou2"
            @click="$router.back()"></span>
    </myheader>
     <!-- 删除频道-->
    <div class="mychannel">
      <h3>点击删除频道</h3>
      <div class="list">
        <span>娱乐</span>
      </div>
    </div>
    <!-- 添加频道 -->
    <div class="youchannel">
      <h3>点击添加频道</h3>
      <div class="list">
        <span>体育</span>
      </div>
    </div>
  </div>
</template>

<script>
import myheader from "@/components/myheader.vue";
import {getCateList} from '@/apis/category.js'
export default {
  data () {
    return {
      list:[]
    }
  },
  components: {
    myheader
  },
  async mounted () {
   let res = await getCateList()
   this.list = res.data.data
   console.log(this.list);
  }
}
</script>

<style lang="less" scoped>
.mychannel,
.youchannel {
  padding: 10px;
  h3 {
    line-height: 30px;
    font-weight: bold;
  }
  .list {
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    > span {
      width: 20%;
      margin-left: 10px;
      margin-top: 10px;
      border: 1px solid #ccc;
      text-align: center;
      line-height: 40px;
    }
  }
}
</style>