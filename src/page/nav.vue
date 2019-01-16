<template>
  <div class="bar" >
    <router-view class="nav" ></router-view>
    <div class="bar-b">
      <ul>
        <li v-for="(o,i) of navList" @click="tabClick(i)" :key="i" :class="i==tabNo?'active':''">
          <router-link :to="o.to">
            <span class="icon" :class="o.className"></span>
            <div class="bar-s">{{o.name}}</div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        navList:[
          {
            name:'打卡圈',
            className:'icon-dkq',
            to:'friend',
          },{
            name:'记录',
            className:'icon-jl',
            to:'record',
          },{
            name:'打卡',
            className:'icon-dk',
            to:'card',
          },{
            name:'群组',
            className:'icon-qz',
            to:'group',
          },{
            name:'设置',
            className:'icon-sz',
            to:'set',
          }
        ]
      }
    },
    computed: {
      tabNo(){
        console.log(this.$route.path)
        let t=this.$route.meta.tabNo;
        return t
      }
    },
    methods:{
      tabClick(i){
        this.tabNum=i;
      },
    },
  }
</script>
<style lang="less" >
  @import "../assets/icon/style.css";
  .bar {
    a:hover{
      text-decoration: none;
    }
    .nav {
      height: calc(100vh - 100px);
      overflow: auto;
      // padding-bottom: 100px
    }
    .bar-b {
      background: #fff;
      height: 100px;
      width: 100%;
      position: fixed;
      z-index: 99;
      left: 0;
      right: 0;
      bottom: 0;
      ul{
        display: flex;
        li{
          width: 20%;
          line-height:50px;
          text-align: center;
          padding-top: 20px;
          padding-bottom: 10px;
          box-sizing: border-box;
          color:#999;
          span{
            background-size: cover;
            display: inline-block;
            height: 40px;

          }
        }
      }
    }
  .active{
    .icon-dkq{
      width: 49px;
      background: url("../assets/img/dkq1.png");
    }
    .icon-jl{
      width: 39px;
      background: url("../assets/img/jl1.png");
    }
    .icon-dk{
      width: 44px;
      background: url("../assets/img/dk1.png");
    }
    .icon-qz{
      width: 47px;
      background: url("../assets/img/qz1.png");
    }
    .icon-sz{
      width: 40px;
      background: url("../assets/img/sz1.png");
    }
    .bar-s{
      color: #E62129;
    }
    .icon{
      background-size: auto 100%;
      background-repeat: no-repeat;
      display: inline-block;
      height: 40px;
    }
  }
  .bar-s{
    color: #999;
    font-size: 20px;
  }
    .icon-dkq{
      width: 49px;
      background: url("../assets/img/dkq.png");
    }
    .icon-jl{
      width: 39px;
      background: url("../assets/img/jl.png");
    }
    .icon-dk{
      width: 44px;
      background: url("../assets/img/dk.png");
    }
    .icon-qz{
      width: 47px;
      background: url("../assets/img/qz.png");
    }
    .icon-sz{
      width: 40px;
      background: url("../assets/img/sz.png");
    }

  }

</style>
