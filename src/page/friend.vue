
<template>
  <div class="friends">

    <div class="f-person">
      <div class="p-img" @click="jumpF">
        <img :src="imgUrl" alt="">
      </div>
      <div class="p-name">
        <p class="name">{{name}}</p>
        <!--<p class="company" >{{compang}}</p>-->
        <p class="start s-top">打卡始于<span class="p-ye">{{pushStart}}</span>,持续打卡于<span class="p-ye">{{pushEnd}}</span>,</p>
        <p class="start">  日精进打卡第<span class="p-ye">{{time}}</span>天,共打卡<span class="p-ye">{{total}}</span>次,缺卡<span class="p-ye" >{{que}}</span>次</p>
      </div>
      <van-icon name="arrow-left"  v-if="$route.query.id" @click="$router.go(-1)"/>
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
        list: [] ,
        isScroll:true,
        noGet:false,
        pageList: {total: '',pageNo:1,pageSize:2},
      }
    },
    watch: {
    	//监控集合
	  	'$route': function (route) {
//	  		this.loading();
          this.pageList={total: '',pageNo:1,pageSize:2};
          this.isScroll=true;
          this.noGet=false;
          window.scrollTo(0,0);
          var query = route.query;
          let id = query.id;
          this.gainUser(id);
          this.gainList(id);
          // this.$router.go(0)

      },
    },
    // components:{
    //   'clock':clocklist
    // },
    methods: {
      jumpF(){
        let id=localStorage.getItem('userid');
        if(this.$route.query.id){
          id=this.$route.query.id
        }
        this.$router.push({
          path:'/nav/friend',
          query:{
            id:id
          }
        })
      },
      gainUser(userid) {
        let data={}
        if(userid){
          data.userId=userid
        }
        User(data).then( res => {
          // this.hideLoading();
          this.name = res.data.name;
          this.imgUrl = res.data.imgUrl
          this.compang = res.data.company
          this.pushStart = res.data.pushStart
          this.pushEnd = res.data.pushEnd
          this.total = res.data.total
          this.time = res.data.pushDays
          this.que = res.data.lostCount
        })
      },
      gainList(userid) {
        let that=this;
        let data={pageNo:that.pageList.pageNo,pageSize:that.pageList.pageSize}
        if(userid){
          data.userId=userid
        }
        Friends(data).then( res => {
          //  that.list = res.data.list;
          that.isScroll=true;
        if(res){
          if(that.pageList.pageNo>1){
            that.list = that.list.concat(res.data.list);
            that.pageList.total = res.data.total;
          }else{
            that.list = res.data.list;
            that.pageList.total = res.data.total;
          }
          if(res.data.total==that.list.length||that.list.length<that.pageList.pageSize){
            that.noGet=true;//如果返回总条数等于当前list长度
          }
        }
        res.data.list.forEach(el => {
          el.isFull=false;
        el.fullTxt='全文'
      });
      })
      },
      sh(){
        let bodyScrollHeight = 0
        let documentScrollHeight = 0
        if (document.body) {
          bodyScrollHeight = document.body.scrollHeight
        }
        if (document.documentElement) {
          documentScrollHeight = document.documentElement.scrollHeight
        }
        return (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight
      },
      //监听滚轮
      scrollgun(){
        let getSt=document.documentElement.scrollTop || document.body.scrollTop,
          getWh=document.documentElement.clientHeight || document.body.clientHeight;
        let scrollBottom=this.sh()-(getSt+getWh),//滚动条距离底部距离
          rem=parseInt(window.getComputedStyle(document.documentElement)["fontSize"]),
          h=20;
        if(this.noGet){
          return false
        }
        if(!this.isScroll){
          return false
        }
        if(scrollBottom<h){
          this.isScroll=false;
          this.pageList.pageNo+=1;
          if(this.$route.query.id){
            this.gainList(this.$route.query.id);
          }else{
            this.gainList();
          }
        }
      },
    },
    created () {
      this.loading();
      if(this.$route.query.id){
        let id=this.$route.query.id;
        this.gainUser(id);
        this.gainList(id);
      }else{
        this.gainUser();
        this.gainList();
      }
    },
    components: {

    },
    mounted(){
      window.addEventListener('scroll',this.scrollgun,true);
    },
    destroyed() {
      window.removeEventListener('scroll',this.scrollgun,true);
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
        background: url(../assets/img/bg.png) no-repeat;
        background-size: cover;
        padding-top: 94px;
        box-sizing: border-box;
        position: relative;
        .van-icon{
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
