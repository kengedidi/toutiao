<template>
  <div class="catemanager">
    <myheader title="频道管理">
      <span
        slot="left"
        class="iconfont iconjiantou2"
        @click="$router.back()"
      ></span>
    </myheader>
    <!-- 删除频道-->
    <div class="mychannel">
      <h3>点击删除频道</h3>
      <div class="list">
        <span
          v-for="(value, index) in cateList"
          :key="value.id"
          @click="remove(value, index)"
          >{{ value.name }}</span
        >
      </div>
    </div>
    <!-- 添加频道 -->
    <div class="youchannel">
      <h3>点击添加频道</h3>
      <div class="list">
        <span
          v-for="(value, index) in tempList"
          :key="value.id"
          @click="add(value, index)"
          >{{ value.name }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import myheader from "@/components/myheader.vue";
import { getCateList } from "@/apis/category.js";
export default {
  data() {
    return {
      cateList: [], // 所有栏目数据
      tempList: [], // 未添加的栏目数据
    };
  },
  components: {
    myheader,
  },
  methods: {
    // 删除栏目
    remove(value, index) {
      //先添加 再移除
      //添加
      // 将已移除的栏目存储到本地存储,约定 heimatoutiao_remove_cate_59
      this.tempList.push(value);
      localStorage.setItem(
        "heimatoutiao_remove_cate_59",
        JSON.stringify(this.tempList)
      );

      //移除
      // 将已移除的栏目存储到本地存储,约定 heimatoutiao_add_cate_59
      this.cateList.splice(index, 1);
      localStorage.setItem(
        "heimatoutiao_add_cate_59",
        JSON.stringify(this.cateList)
      );
    },
    // 添加栏目
    add(valie, index) {
      //先添加 再移除
      //添加
      this.cateList.unshift(valie);
      localStorage.setItem(
        "heimatoutiao_add_cate_59",
        JSON.stringify(this.cateList)
      );

      //移除
      this.tempList.splice(index, 1);
      localStorage.setItem(
        "heimatoutiao_remove_cate_59",
        JSON.stringify(this.tempList)
      );
    },
  },
  // 组件加载之后，应该先从本地存储中获取数据，如果有数据，则加载本地存储，如果没有数据再发起数据请求
  async mounted() {
    // 如果指定名称的键不存在，下面的代码获取到了null,并不会报错
    this.cateList = JSON.parse(
      localStorage.getItem("heimatoutiao_add_cate_59")
    );
    if (!this.cateList) {
      let res = await getCateList();
      this.cateList = res.data.data;
      console.log(this.cateList);
      let token = localStorage.getItem("toutiao_59_token");
      // 判断用户是否登陆
      if (token) {
        this.cateList.splice(0, 2); //删除关注和头条
      } else {
        this.cateList.splice(0, 1); //删除头条
      }
    }
    // 加载 未添加的栏目
    this.tempList =
      JSON.parse(localStorage.getItem("heimatoutiao_remove_cate_59")) || [];
  },
};
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