<template>
  <div class="headTitle">
    <span class="iconfont icon-fanhui" @click="jump"></span>
    <span class="nameTxt">{{headTxt}}</span>
    <span></span>
  </div>
</template>

<script>
    export default {
        name: "headTitle",
        props:{
          headTxt:{
            type:String
          }
        },
      methods:{
          jump(){
            localStorage.setItem('tabNum','3')
            this.$router.go(-1);
          }
        }

    }
</script>

<style scoped lang="less" >
  .headTitle{
    padding: 33px;
    background: #fff;
    text-align: center;
    font-size: 32px;
    color: #010101;
    display:flex;
    align-items:center;
    justify-content: space-between;
  .nameTxt{
    max-width: 80%;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .iconfont{
    color: #000;
    font-size: 32px;
    font-weight: bold;
  }
  }
</style>
