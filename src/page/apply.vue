<template>
    <div class="apply">
      <v-head :head-txt="headName"></v-head>
      <van-search placeholder="请输入搜索关键词" v-model="keyWords" @blur="onSearch" />
      <div class="apply-list" v-for="(el,i) in list" :key="i" v-show="dont" >
          <div class="ld-left apply-g" >
              <div class="apply-img">
                  <img :src="el.imgUrl" alt="">
              </div>
              <div class="apply-name">
                 <p>{{el.groName}}</p>
                 <div class="ld-left ">
                    <div class="apply-ye top">
                        <img src="../assets/img/double (1).png" alt="">
                        {{el.userCount}}
                    </div>
                    <div class="apply-ye top ddd">
                        <img src="../assets/img/person (1).png" alt="">
                        {{el.name}}
                    </div>
                 </div>
              </div>
              <template v-if="el.isExist==1">
                <div class="apply-join" style="opacity: .8;border-color: #999;color: #fff;background: #999;">已入群</div>
              </template>
              <template v-else>
                <div class="apply-join" v-if="el.isApply == 1" style="opacity: .5;">已申请</div>
                <div class="apply-join" @click="addGroups(el)" v-else>申请入群</div>
              </template>
          </div>
      </div>
      <div v-show="!dont" class="hint" >
          暂无群数据, 请先创建群
      </div>

    </div>
</template>
<script>
import { Glisy,Addgroup } from '@/api/index'
export default {
  data () {
    return {
      keyWords: '',
      list: [],
      dont: true,
      headName:'查找群组',
      isScroll:true,
      noGet:false,
      total:0,
      pageNo:1,
      isClick:true,
    }
  },
  watch: {
    keyWords() {
      this.pageNo = 1
      this.noGet = false
    }
  },
  methods: {
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
          this.pageNo+=1;
          this.onSearch()
        }
      },
    onSearch() {
      Glisy({pageNo: this.pageNo, pageSize: '10', keywords: this.keyWords}).then( res => {
            this.isScroll=true;
          if(res.code == 1 ) {
              if(this.pageNo > 1 ){
                this.list = this.list.concat(res.data.list);
                this.total = res.data.total;
              }else{
                this.list = res.data.list;
                this.total = res.data.total;
              }
              if(this.list.length == res.data.total || this.pageNo == res.data.pages ) {
                 this.noGet=true;//如果返回总条数等于当前list长度
              }

              if( this.list.length ) {
                 this.dont = true
              } else {
                 this.dont = false
              }
          }
      })
    },
    addGroups(val) {
      if(!this.isClick){
        return false
      }
      this.isClick=false;
      Addgroup({groId:val.groId}).then( res => {
          if(res.code == 1 ) {
              this.isClick=true;
              // this.onSearch()
              val.isApply = 1;
          }
       })
    }
  },
  created () {
    this.onSearch()
  },
   mounted(){
      window.addEventListener('scroll',this.scrollgun,true);
    },
    destroyed() {
      window.removeEventListener('scroll',this.scrollgun,true);
      // console.group('销毁完成状态===============》destroyed');
    },
  components: {
  }
}
</script>
<style lang="less">
.apply {
   .hint {
      margin-top: 200px;
      color: #666666;
      text-align: center;
      font-size: 40px;
   }
  .van-icon-clear{
    font-size: 36px
  }
  .van-search {
    padding: 20px 36px;
  }
  .van-cell {
    line-height: 72px;
  }
  .van-field__control {
    font-size: 32px;
    text-align: center;
  }
  .van-search .van-cell {
    border-radius: 10px;
  }
  .van-field__left-icon .van-icon, .van-field__right-icon .van-icon{
    font-size: 40px
  }
  // .van-cell__left-icon, .van-cell__right-icon {
  //   line-height: 72px !important;
  //   font-size: 72px !important;
  // }
  .apply-list {
    padding: 0 36px;
    position: relative;
    background: #fff;
  }
  .apply-join {
    position: absolute;
    right: 38px;
    top: 38px;
    width: 122px;
    height: 48px;
    border: 1PX solid #E62129;
    border-radius: 5px;
    font-size: 28px;
    color: #E62129;
    text-align: center;
    line-height: 48px;
  }

  .apply-g {
     height: 175px;
     border-bottom: 1PX solid #F2F2F2;
     color: #000;
     font-size: 36px;
  }
  .apply-img {
    height: 120px;
    width: 120px;
    border-radius: 50%;
    overflow: hidden;
    margin-top: 25px;
    margin-right: 28px;
    img {
       height: 100%;
    }
  }
  .apply-name {
    margin-top: 35px;
    p {
      width:400px;
      word-break:keep-all;
      white-space:nowrap;
      overflow:hidden;
      text-overflow:ellipsis;
    }
  }
  .apply-ye {
    height: 26px;
    background: #F0DFB8;
    border-radius: 3px;
    font-size: 18px;
    color:#fff;
    margin-right: 15px;
    text-align: center;
    padding: 5px;
    padding-right: 8px;
    img {
      width: 19px;
      height: 16px;
      margin-right: 5px;
    }
  }
  .ddd {
    background: #CEDDF1;
  }
}
</style>
