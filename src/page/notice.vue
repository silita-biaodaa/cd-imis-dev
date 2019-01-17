<template>
  <div class="notice">
      <v-head :head-txt="headName"></v-head>
      <div class="hei" >
        <div v-for="(e,i) in list" :key="i" >
          <div class="ld-left notice-h">
            <div class="notice-img">
                <img :src="e.imgUrl" alt="">
            </div>
            <div class="notice-t">
               <p>{{e.type == 2 ? e.groName  : e.name  }}</p>
               <p class="notice-s">{{e.type == 2 ? '已将你移除群' : '申请加入' + e.groName }}</p>
            </div>
            <div class="notice-btn" v-show="e.type == 1 ? true : false" @click="joinG(e)" >
                同意
            </div>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
import { Message,Agree } from '@/api/index'
export default {
  data () {
    return {
      list:[],
      headName:'群通知'
    }
  },
  methods: {
    gainMessage() {
       Message({}).then( res => {
          console.log(res)
          if(res.code == 1) {
             this.list = res.data
          }
       })
    },
    joinG(val) {
      this.loading()
      Agree({groId:val.groupId,apply:val.send}).then(res => {
        this.hideLoading()
         if(res.code == 1) {
            console.log(res)
            this.gainMessage()
         }
      })
    }
  },
  created () {
    this.gainMessage()
  },
  components: {
  }
}
</script>
<style lang="less" >
@import '../assets/iconfont.css';
.notice {
   background: #F5F5F5;
   height:auto;
   margin: 0 auto;
  .hei{
    margin-top: 16px;
  }
   .notice-h {
       height: 120px;
       padding: 0 36px;
       font-size: 36px;
       background: #fff;
       border-bottom: 1px solid #f5f5f5;
       position: relative;
       color:#000;
       .notice-img {
          height: 84px;
          width: 84px;
          border-radius: 50%;
          overflow: hidden;
          margin-top: 18px;
          margin-right: 24px;
          img {
            height: 100%;
          }
       }
       .notice-t {
         margin-top: 20px;
         p {
          width:450px;
          word-break:keep-all;
          white-space:nowrap;
          overflow:hidden;
          text-overflow:ellipsis;
        }
       }
       .notice-s {
         font-size: 28px;
         color:#999;
         margin-top: 5px;
       }
       .notice-btn {
          height: 60px;
          width: 98px;
          position: absolute;
          right: 36px;
          top: 50%;
          transform: translateY(-50%);
          text-align: center;
          background:rgba(248,248,248,1);
          font-size:28px;
          line-height: 60px;
       }
   }
}
</style>
