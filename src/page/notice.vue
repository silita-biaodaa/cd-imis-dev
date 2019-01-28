<template>
  <div class="notice">
      <v-head :head-txt="headName"></v-head>
      <div class="hei" >
        <div v-for="(e,i) in list" :key="i" >
          <div class="ld-left notice-h">
            <div class="notice-img">
                <img :src="e.imgUrl" alt="">
            </div>
            <template v-if="e.type==0">
                <!-- 加入失效 -->
                <div class="notice-t">
                  <p>{{e.name}}</p>
                  <p class="notice-s">申请加入{{e.groName}}</p>
                </div>
                <div class="notice-btn invalid">失效</div>
            </template>
            <template v-else-if="e.type==1||e.type==3">
                <!--别人申请入群-->
                <div class="notice-t">
                  <p>{{e.name}}</p>
                  <p class="notice-s">申请加入{{e.groName}}</p>
                </div>
                <div class="notice-btn agree" @click="joinG(e)" v-if="e.type==1">同意</div>
                <div class="notice-btn" v-else>已同意</div>
            </template>
            <template v-else-if="e.type==2">
                <!--被移出群-->
                <div class="notice-t">
                  <p>{{e.groName}}</p>
                  <p class="notice-s">你已被移出群</p>
                </div>
                <div class="notice-btn apply" @click="applyFn(e.groupId)">申请入群</div>
            </template>
            <template v-else-if="e.type==4">
                <!--转让-->
                <div class="notice-t">
                  <p>{{e.groName}}</p>
                  <p class="notice-s">你已是该群的新群主</p>
                </div>
            </template>
            <template v-else-if="e.type==5">
                <!--重新申请-->
                <div class="notice-t">
                  <p>{{e.groName}}</p>
                  <p class="notice-s">群主已转让，请重新申请入群</p>
                </div>
                <div class="notice-btn apply" @click="applyFn(e.groupId)">申请入群</div>
            </template>
            <template v-else-if="e.type==6">
                <!--用户退出群-->
                <div class="notice-t">
                  <p>{{e.name}}</p>
                  <p class="notice-s">已退出{{e.groName}}群</p>
                </div>
            </template>
            <template v-else-if="7">
                <!--群主解散群-->
                <div class="notice-t">
                  <p>{{e.groName}}</p>
                  <p class="notice-s">该群已解散</p>
                </div>
            </template>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
import { Message,Agree,Addgroup } from '@/api/index'
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
    },
    applyFn(id){//申请入群
      Addgroup({groId:id}).then( res => {
        if(res.code == 1 ) {
          this.$router.go(0)
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
       border-bottom: 1PX solid #f5f5f5;
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
          width:350px;
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
          // height: 60px;
          position: absolute;
          right: 36px;
          top: 50%;
          transform: translateY(-50%);
          text-align: center;
          background:#f8f8f8;
          font-size:28px;
          padding: 16px 22px;
          width: 120px;
          color: #E62129;
          border-radius: 5px;
          box-sizing: content-box;
          border: 1PX solid #f8f8f8;
        }
        .apply{
          background: #fff;
          color: #E62129;
          border-color:#E62129;
        }
        .agree{
          background: #E62129;
          border-color:#E62129;
          color: #fff;
        }
        .invalid{
          background: #999;
          border-color:#999;
          color: #fff;
        }
   }
}

</style>
