<!-- 模型： DOM 结构 -->
<template>
  <div class="clock">
    <div class="f-content" v-for="( item, index ) in clocklist" :key="index">
      <!-- <v-clock :item="item" v-for="( item, index ) in list" :key="index"></v-clock> -->
      <div class="c-img">
        <img :src="item.user.imgUrl" alt="">
      </div>
      <p class="c-name"><span class="fc-n">{{item.user.name}}</span><span v-if="item.user.company && item.user.company!=''">-{{item.user.company}}</span></p>
      <div class="c-content" :class="{'active': item.fullTxt=='收起'}" style="-webkit-box-orient: vertical;">
        <p class="c-time"><span>{{item.pushd}}</span>打卡第{{item.pushCount.putCount}}次</p>
        <div class="c-text" >
          <!-- 知 学习 -->
          <p class="tit">【知～学习】</p>
          <div v-for="(el,bs) in item.books" :key="bs">
            <p class="c-color" v-if="el.readCount!=0">《{{el.title}}》{{el.readCount}}遍 共{{el.readTotal}}遍</p>
          </div>
          <template v-if="item.bookish.length>0">
            <div v-for="(o,i) in item.bookish" :key="'i'+i">
              <p class="c-color">《{{o.bookName}}》{{o.section}}</p>
              <p class="c-color" v-if="o.link">
                <a :href="o.link">{{o.link}}</a>
              </p>
            </div>
          </template>

          <!-- 经典名句 -->
          <template v-if="item.classic">
            <p class="tit">【经典名句分享】</p>
            <p class="c-color">{{item.classic}}</p>
          </template>
          <!-- 行 实践 -->
          <template v-if="item.practice!=undefined&&item.practice.character!=''&&item.practice.family!=''&&item.practice.work!=''">
            <p class="tit">【行～实践】</p>
            <template v-if="item.practice.character!=''">
              <h5>一、修身：（对自己个人）</h5>
              <p class="c-color">{{item.practice.character}}</p>
            </template>
            <template v-if="item.practice.family!=''">
              <h5>二、齐家：（对家庭和家人）</h5>
              <p class="c-color">{{item.practice.family}}</p>
            </template>
            <template v-if="item.practice.work!=''">
              <h5>三、建功：（对工作）</h5>
              <p class="c-color">{{item.practice.work}}</p>
            </template>
          </template>
          <!-- 积善 -->
          <p class="tit">【积善】</p>
          <p class="c-color">发愿从{{item.pushCount.bonaStart}}起{{item.pushCount.years}}年内{{item.pushCount.bonaCount*item.pushCount.days}}善事。今日{{item.pushCount.bonaDays}}善，累计{{item.pushCount.bonaTotal}}善</p>
          <!-- 省 觉悟 -->
          <template v-if="item.introspective">
            <p class="tit">【省～觉悟】</p>
            <p class="c-color">{{item.introspective}}</p>
          </template>
          <!-- 感谢 -->
          <template v-if="item.thanks">
            <p class="tit">【感谢】</p>
            <p class="c-color">{{item.thanks}}</p>
          </template>
          <!-- 祝愿 -->
          <template v-if="item.volunteer">
            <p class="tit">【志愿】</p>
            <p class="c-color">{{item.volunteer}}</p>
          </template>
        </div>
      </div>
      <h5 class="full" >
        <span @click="fullClick(index)">{{item.fullTxt}}</span>
      </h5>
      <div class="c-func">
        <template v-if="item.userId==userid">
            <template v-if="item.isParise">
              <div class="c-zan">
                <span class="icon pickZ"></span>
                <span  style="color:#E60012">赞</span>
              </div>
            </template>
            <template v-else>
              <div class="c-zan" @click="isPariseFn(index)">
                <span class="icon pickZan"></span>
                <span>赞</span>
              </div>
            </template>
            <div class="c-detail" @click="jumpDetail(item.pkid,item.userId)">
              <span class="icon icon-fx"></span>
              <span>分享</span>
            </div>
        </template>
        <template v-else>
            <div style="width:163px"></div>
            <template v-if="item.isParise">
              <div class="c-zan">
                <span class="icon pickZ"></span>
                <span  style="color:#E60012">赞</span>
              </div>
            </template>
            <template v-else>
              <div class="c-zan" @click="isPariseFn(index)">
                <span class="icon pickZan"></span>
                <span>赞</span>
              </div>
            </template>
        </template>
      </div>
      <div class="laudBox" v-if="item.praise.length!=0" >
        <span class="icon pickZan"></span>
        {{item.praise.join(',')}}
      </div>
    </div>
  </div>
</template>
<script>
  import { Parise } from '@/api/index'
  export default {
    name: 'clock', // 结构名称
    data() {
      return {
        // 数据模型
        userid:localStorage.getItem('userid'),

      }
    },
    props: {
      // 集成父级参数
      clocklist:{
        type:Array
      },
    },
    methods: {
      //跳转详情
      jumpDetail(id,userid){
        this.$router.push({
          path:'/cardDetail',
          query:{
            id:id,
            userid:userid
          }
        })
      },
      // 方法 集合
      fullClick(i){
        let obj=this.clocklist[i];
        if(obj.fullTxt=='收起'){
          obj.isFull=false;
          obj.fullTxt='全文';
        }else{
          obj.isFull=true;
          obj.fullTxt='收起';
        }
        this.$set(this.clocklist,i,obj);
      },
      isPariseFn(i){
        let obj=this.clocklist[i];
        obj.isParise=true;
        // if(this.name==''){
        //   return false
        // }
        let id=this.clocklist[i].pkid;
        let that=this;
        Parise({logId:id}).then(res =>{
          if(res.msg=='操作成功'){
            if(that.strInArr(obj.praise,res.data)){
              obj.praise.push(res.data);
            }
            that.$set(that.clocklist,i,obj);
          }else{
            that.$toast('因网络原因，点赞失败')
            obj.isParise=false;
          }
        })
      },
      strInArr(arr,str){
        if(arr.length==0){
          return true
        }
        for(let x of arr){
          if(x==str){
            return false
          }else{
            return true
          }
        }
      },
    }

  }

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style scoped lang='less'>
  .f-content{
    background: #fff;
    overflow: hidden;
    padding: 37px;
    padding-left: 159px;
    border-bottom: 16px solid #F5F5F5;
    background: #fff;
    position: relative;
  .full{
    margin-top: 34px;
    color: #E62129;
    font-size: 28px
  }
  .c-img {
    height: 83px;
    width: 83px;
    position: absolute;
    background: red;
    border-radius: 50%;
    top: 37px;
    left: 37px;
  img{
    width: 100%;
    border-radius: 50%
  }
  }
  .c-name {
    color :#010101;
    font-weight: 500;
    font-size: 36px;
  .fc-n {
    color: #633B1E;
  }
  }
  .c-content {
    margin-bottom: 30px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 5;
  }
  .c-content.active{
    -webkit-line-clamp: 10000;
  .tit{
    line-height: 2.8
  }
  .c-text{
    margin-top: 14px;
  }
  }
  .c-time {
    color: #ccc;
    font-size: 24px;
    margin-top: 5px;
  span{
    margin-right:55px;
  }
  }
  .c-text {
    color: #000;
    font-size: 28px;
    color: #000;
    font-weight: 400;
    margin-top: 34px;
  .c-color {
    color:#999;
  }
  }
  }
  .laudBox{
    background: #F5F5F5;
    padding: 20px;
    margin-top: 75px;
    border-radius: 10px;
    display: flex;
    align-items: center;
  }
  .c-func {
  // margin-top: 100px;
  // margin-bottom: 39px;
    float: right;
    width:225px;
    color: #999;
    font-size: 28px;
    display: flex;
    justify-content: space-between;
    overflow: hidden;
  .iconfont{
    margin-right: 7px
  }
  .c-zan{
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  }
  .icon{
    width: 34px;
    height: 29px;
    margin-right: 8px;
  }
  .pickZ{
    background: url("../assets/img/z.png") no-repeat;
    background-size: cover;
  }
  .pickZan{
    background: url("../assets/img/zan.png") no-repeat;
    background-size: cover;
  }
  .icon-fx{
    background: url("../assets/img/fx.png") no-repeat;
    background-size: cover;
    display:inline-block;
  }
  .c-list {
    float: right;
    height: 66px;
    width: 555px;
    line-height: 66px;
    background: #fff;
    margin-bottom: 37px;
    box-sizing: border-box;
    position: relative;
    padding-left: 24px;
  img {
    height: 25px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 28px;
    margin-right: 22px;
  }
  p {
    padding-left: 50px;
    color:#633B1E;
    font-size: 28px;
  }
  }


</style>
