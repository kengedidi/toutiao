<template>
  <input
    class="ipt"
    @input="halderInput"
    :class="{ success: flag, dangerput: !flag }"
    @blur="handlerchange"
  />
</template>

<script>
export default {
  data() {
    return {
      flag: true,
    };
  },
  props: {
    rules: {
      type: RegExp,
    },
    msg: {
      type: String, //类型：字符串
      default: "用户输入数据不合法", //默认
    },
  },
  methods: {
    // 验证是否符合正则
    halderInput(e) {
      //  console.log(v.target.value);
      let v = e.target.value;
      this.$emit("input", v);

      if (this.rules) {
        if (this.rules.test(v)) {
          // console.log('ok');
          this.flag = true;
        } else {
          // console.log('no');
          this.flag = false;
        }
      }
    },
    // 处理用户失焦事件，在失焦之后，验证用户数据，给出相应的提示
    handlerchange(e) {
      // 判断用户是否有输入值，如果没有，提醒用户先输入值
      if (e.target.value == "") {
        this.$toast({
          message: "请输入个人账号密码",
          position: "top",
          duration: 2000,
        });
      } else {
        // 进行验证
        // test是正则的验证方法，返回bool值
        if (this.rules) { //判断是否传了正则，
          if (!this.rules.test(e.target.value)) {//确认传了正则，再进行判断是否符合正则规则，不符合则提示用户
            this.$toast.fail({
              message: this.msg, // 消息文本内容
              position: "top", // 提示框显示的时长
              duration: 2000, // 提示框显示的位置
            }); 
          }
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.ipt {
  width: 314 * 100vw / 360;
  height: 40px;
  border: none;
  border-bottom: 3px solid #000;
  outline: none;
  font-size: 20px;
}

.success {
  color: blue;
}
.dangerput {
  color: green;
}
</style>