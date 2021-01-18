<template>
   <input class="ipt" @input="halderInput" :class='{"success" : flag , "dangerput" : !flag}'>
</template>

<script>
export default {
   data () {
     return {
       flag : true
     }
   },
     props: {
      rules:{
         type:RegExp
      }
    },
    methods: {
      halderInput(e){
        //  console.log(v.target.value);
        let v = e.target.value;
         this.$emit('input',v);

         if(this.rules){
            if(this.rules.test(v)){
              // console.log('ok');
              this.flag = true;
            }else{
              // console.log('no');
              this.flag = false;
            }
         }
      }
    }
}
</script>

<style lang="less" scoped>
.ipt{
  width: 314 * 100vw / 360;
  height: 40px;
  border: none;
  border-bottom: 3px solid #000;
  outline: none;
  font-size: 20px;
}

.success{
  color: blue;
}
.dangerput{
  color: green;
}
</style>