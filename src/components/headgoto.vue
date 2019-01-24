<template>
  <div class="headTitle">
    <van-icon name="arrow-left"  @click="jump"/>
    <!-- <span class="iconfont icon-fanhui" @click="jump"></span> -->
    <span class="nameTxt">{{headTxt}}</span>
    <template v-if="headType=='goTo'">
      <span></span>
    </template>
    <template v-else-if="headType=='qrCode'">
      <span class="qrCode" @click="jumpQrCode"></span>
    </template>
  </div>
</template>

<script>
    export default {
        name: "headTitle",
        props:{
          headTxt:{
            type:String
          },
          headType:{
            default:'goTo'
          }
        },
      methods:{
          jump(){
            localStorage.setItem('tabNum','3')
            this.$router.go(-1);
          },
          jumpQrCode(){
            this.$emit('jump',{})
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
    .qrCode{
      width: 35px;
      height: 35px;
      background: url('../assets/img/ewm.png');
      background-size: cover;
    }
}
</style>
