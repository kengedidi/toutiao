<template>
  <div class="focus">
      <myheader title='我的关注'>
          <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
      </myheader>
      <div class="list"> 
          <div class="box" v-for="(item,index) in followList" :key="item.id">
              <img :src="item.head_img" alt="">
              <div class="center">
                  <p>{{item.nickname}}</p>
                  <!-- 使用过滤器 -->
                  <span>{{item.create_date | singledateFormat}}</span>
              </div>
              <span @click="cancelFollowUser(index,item.id)">取消关注</span>
          </div>
      </div>
  </div>
</template>

<script>
import {getUserFollows,unfollowUser} from '@/apis/user.js'
import myheader from '@/components/myheader.vue'
import axios from '@/utils/myaxios.js'
// 引入过滤器
import {singledateFormat} from '@/utils/myfilters.js'
export default {
  data () {
    return {
    followList: [],
    axios
    }
  },
  components: {
    myheader
  },
  // 注册过滤器
  filters: {
    singledateFormat
  },
 async mounted () {
   let res = await getUserFollows();
  this.followList = res.data.data.map((v)=>{
      v.head_img = axios.defaults.baseURL +  v.head_img
      return v
   })
   console.log(this.followList);
  },
  methods: {
    // 我的关注：点击取消关注触发
   async cancelFollowUser(index,id){
      let res = await unfollowUser(id)
      console.log(res);
      // 提示用户
      this.$toast.success(res.data.message)
      //页面的刷新
      this.followList.splice(index,1)
    }
  }
}
</script>

<style lang='less' scoped>
.list{
    .box{
        display: flex;
        padding: 25px 10px;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #ccc;
        > img{
            display: block;
            width: 50/360*100vw;
            height: 50/360*100vw;
            border-radius: 50%;
            padding: 0 10px;
        }
        > .center{
            flex: 1;
            > p {
                line-height: 30px;
                font-size: 14px;
            }
            > span {
                font-size: 12px;
                color:#999;
            }
        }
        > span {
            height: 30px;
            background-color: #eee;
            font-size: 13px;
            border-radius: 30px;
            line-height: 30px;
            padding: 0px 15px;
        }
    }
}
</style>
