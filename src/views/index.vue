<template>
  <div class="index">
    <!-- ---------顶部栏 -->
    <div class="header">
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <!-- 点击搜索跳转到单独的搜索页面 -->
      <div class="search" @click="$router.push({ name: 'Search' })">
        <!-- 用到了icon组件 -->
        <van-icon name="search" />
        <span>搜索商品</span>
      </div>
      <!-- 点图标跳转到个人中心 -->
      <div class="user" @click="$router.push({ path: `/personal/${id}` })">
        <!-- 用到了icon组件 -->
        <van-icon name="manager-o" />
      </div>
    </div>

    <!-- ---------标签页，可以手动左右滑动页面切换标签 -->
    <!-- 引用了 vant 的 tabs 和 tab 标签页组件 -->
    <!-- active就代表当前默认选中的标签项：那么我们就应该加载这个选项的新闻数据 -->
    <!-- sticky vant的粘性布局  sticky-->
    <van-tabs swipeable sticky v-model="active">
      <!-- 生成栏目列表 --- 遍历栏目所有数据 -遍历数组  -->
      <!-- :key="value.id+:key="item.id" 唯一标示 加了vscode编辑器就不会有波浪线报错，对业务没有作用 -->
      <van-tab v-for="value in catelist" :title="value.name" :key="value.id">
        <!-- 上拉页面 -- 加载第二页-->
        <!-- immediate-chec: 是否在初始化时立即执行滚动位置检查 ,当一打开页面，list组件会默认帮我们加载第一页，所以我们不需要自动帮我们加载，我们自己加载第一页，所以fasle关闭自动帮我们加载-->
        <!-- offset : 滚动条与底部距离小于 offset 时触发load事件 不设置默认是：300像素 -->
        <van-list
          v-model="value.loading"
          :finished="value.finished"
          finished-text="没有更多了"
          @load="onLoad"
          offset="20"
          :immediate-check="false"
        >
          <!-- 下拉页面 -- 刷新页面 -->
          <van-pull-refresh v-model="value.isLoading" @refresh="onRefresh">
            <!-- 生成这个栏目的新闻列表 -->
            <articleBlock
              v-for="item in value.postlist"
              :post="item"
              :key="item.id"
            ></articleBlock>
          </van-pull-refresh>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getCateList } from "@/apis/category.js";
import { getPostList } from "@/apis/post.js";
// 引入封装好的文章块
import articleBlock from "@/components/articleBlock.vue";
export default {
  components: {
    articleBlock,
  },
  data() {
    return {
      //栏目数据
      catelist: [],
      // 设置标签项的默认选中项，根据用户的登陆状态进行判断
      active: localStorage.getItem("toutiao_59_token") ? 1 : 0,
      //栏目对应文章数据
      // postlist: [],
    };
  },
  async mounted() {
    // 当页面加载完之后加载 栏目的数据
    let res = await getCateList();
    // console.log(res); //获取到栏目的所有数据
    this.catelist = res.data.data;
    // console.log(this.catelist);

    //--------------------------
    // 数据改造:每个栏目有属于自己的新闻数据,且能找到的操作互不干扰,当前栏目数据结构不能满足这个需求
    // map:可以对数组进行遍历，执行回函数，将回调函数的返回值存储到内部创建的数组，最终将数组返回
    this.catelist = this.catelist.map((value) => {
      return {
        ...value,
        postlist: [], // 添加了存储这个栏目新闻数据的数组
        pageIndex: 1, // 当前栏目的页码
        pageSize: 4, // 当前栏目每页显示的数量
        loading: false, // 当前栏目的上拉加载的状态，为true说明下在加载中
        finished: false, //当前栏目数据是否全部加载完毕，为true说明没有更多数据了
        isLoading: false, // 当前栏目的下拉刷新的状态，true表示正在下拉刷新，刷新完成后要将这个重置为false
      };
    });

    //页面一打开就加载当前栏目对应文章数据（栏目已经设置如果登陆过就下标1，没登陆下标就0 ，页面一开始显示头条栏目的文章）
    this.init();
  },
  watch: {
    // 监听栏目
    active() {
      console.log("触发了");
      //  console.log(this.active); //栏目的索引
      //  console.log(this.catelist[this.active]); // 索引对应的栏目数据
      //  console.log(this.catelist[this.active].id); //栏目的id
      let id = this.catelist[this.active].id; //栏目的id
      // 监听用户切换栏目的时候，触发。然后判断postlist数组的长度是否为0，如果为0，也就是之前没有加载过，则发送后台请求 加载当前栏目的数据。 如果postlist数组的长度不是为0，也就是之前加载过了，就未必要再重新加载了，这样可以避免切换栏目每次都是第一页。
      if (this.catelist[this.active].postlist.length == 0) {
        this.init();
      }
    },
  },
  methods: {
    // 封装函数方法（就避免代码重复写）
    async init() {
      //--------------------------
      // ----------根据栏目ID获取对应栏目的文章数据
      let list = await getPostList({
        category: this.catelist[this.active].id, // 获取当前栏目ID
        pageIndex: this.catelist[this.active].pageIndex, // 获取当前栏目中的页码
        pageSize: this.catelist[this.active].pageSize, // 获取当前栏目中的每页显示的数量
      });
      console.log(list.data.data);
      // ----------实现栏目数据的动态渲染
      // this.postlist = list.data.data;  //原来未对数据进行改造的
      // 将获取数据存储到当前栏目的postlist数组中
      // 将获取数据存储（追加!!!）到当前栏目的postlist数组中
      this.catelist[this.active].postlist.push(...list.data.data);
      console.log(this.catelist);
      // ----------------------上拉加载第二页：
      // 本次加载结束，将loading重置为False,以便下次上拉
      this.catelist[this.active].loading = false;
      // 如果没有数据了，就将finished重置为true
      if (list.data.data.length < this.catelist[this.active].pageSize) {
        this.catelist[this.active].finished = true;
      }
      // ----------------------下拉刷新页面：
      // 重置下拉刷新的状态
      this.catelist[this.active].isLoading = false;
    },
    // 用户上拉页面--加载第二页触发。
    onLoad() {
      console.log("触发了加载下一页");
      // 修改当前栏目的页码值
      this.catelist[this.active].pageIndex++;
      // 为了看到效果而添加的延迟
      setTimeout(() => {
        // 加载下一页
        this.init();
      }, 1500);
    },
    // 用户下拉页面--刷新页面触发。
    onRefresh() {
      console.log("触发了刷新页面");
      this.catelist[this.active].postlist.length = 0; // 清空数据
      this.catelist[this.active].pageIndex = 1; // 重置页码到1
      // 不管之前是否还有数据，将可能被重置的finished重置为false
      this.catelist[this.active].finished = false;
      setTimeout(() => {
        this.init();
      }, 1000);
    },
  },
};
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