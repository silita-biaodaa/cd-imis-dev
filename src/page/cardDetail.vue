
<template>
  <div class="friends">

    <div class="f-person">
      <div class="p-img">
        <img :src="imgUrl" alt="">
      </div>
      <div class="p-name">
        <p class="name">{{name}}</p>
        <!--<p class="company" >{{compang}}</p>-->
        <p class="start s-top">打卡始于<span class="p-ye">{{pushStart}}</span>,持续打卡于<span class="p-ye">{{pushEnd}}</span>,</p>
        <p class="start">  日精进打卡第<span class="p-ye">{{time}}</span>天,共打卡<span class="p-ye">{{total}}</span>次,缺卡<span class="p-ye" >{{que}}</span>次</p>
      </div>
      <span v-if="$route.query.id" class="iconfont icon-fanhui" @click="$router.go(-1)"></span>
    </div>
    <v-clock :clocklist="list"></v-clock>
  </div>
</template>
<script>
  import { User,Friends,Parise,groups } from '@/api/index'
  export default {
    data () {
      return {
        name: '',
        imgUrl: '',
        compang: '',
        pushStart: '',
        pushEnd: '',
        total: '',
        time: '',
        que: '',
        pushd: '',
        pushDays: '',
      }
    },
    watch:{

    },
    methods: {

    },
    created () {

    },
    components: {

    },
    mounted(){

    },
    destroyed() {
      // console.group('销毁完成状态===============》destroyed');
    },
  }
</script>
<style lang='less' >
  .friends {
    background: #fff;
      .f-person {
        width:100%;
        height: 409px;
        background: url("../assets/img/bg.png") no-repeat;
        background-size: cover;
        padding-top: 94px;
        box-sizing: border-box;
        position: relative;
        .icon-fanhui{
          position: absolute;
          left: 39px;
          top: 32px;
          color: #fff;
          font-size: 30px;
          font-weight: bold;
        }
      .p-img {
        height: 129px;
        width: 129px;
        border-radius: 50%;
        overflow: hidden;
        margin:0 auto;

      img {
        width: 100%;
      }

      }
        .p-name {
          margin: 0 auto;
          text-align: center;
          width:420px;
        .name {
          color: #fff;
          font-size: 36px;
          margin: 12px 0 24px;
        }

        .company {
          color: #fff;
          font-size: 28px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap
        }

        .start {
          color: #DDD;
          font-size: 20px;
          margin-top: 4px;
          text-align: left;
        }

        .s-top {
          margin-top: 10px;
        }

          .p-ye {
            color: #FFEE31;
          }

        }
      }
  }
</style>
