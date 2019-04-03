<!-- 弹出框 -->
<template>
    <div class="popup" v-if="popupShow">
        <span class="skip" v-if="popupType=='tips'" @click="sure">跳过</span>
        <div class="content" :class="{tips:popupType=='tips'}">
            <template v-if="popupType=='tip1'">
                <div class="topsBox">{{txt}}</div>
                <div class="bottom-box">
                    <p @click="cancelFn">{{cancelTxt}}</p>
                    <p @click="sure" style="color: #E62129">{{sureTxt}}</p>
                </div>
            </template>
            <template v-if="popupType=='tips'">
              <div class="tipBox">
                <div class="txt-box">亲爱的家人，欢迎来到日精进打卡系统，打卡前请您先设置初始数据。</div>
                <button @click="cancelFn">确定</button>
              </div>
            </template>
             <template v-if="popupType=='save'">
              <div class="tipBox">
                <div class="txt-box">个人信息更新成功。</div>
                <button @click="cancelFn">确定</button>
              </div>
            </template>
            <template v-if="popupType=='recordTip'">
              <div class="tipBox">
                <div class="txt-box">您还没有群组，请先加入或创建群组</div>
                <button @click="sure">确定</button>
              </div>
            </template>
            <template v-if="popupType=='closeTips'">
              <div class="tipBox">
                <div class="txt-box">检测到您还未关注公众号，请先退出，关注公众号“标大大云数据”</div>
                <!-- <button @click="cancelFn">确定</button> -->
              </div>
            </template>
        </div>
    </div>
</template>
<script>
export default {
    name: 'popup', // 结构名称
    data() {
        return {
            // 数据模型
          text:''
        }
    },
    watch: {
        // 监控集合
      'tipText':function(newValue,oldValue){
        this.text=newValue
      }
    },
    props: {
        // 集成父级参数
        popupType:{
          type:String
        },
        popupShow:{
            default:false
        },
        tipText:{
            default:'是否继续该操作？'
        },
        sureTxt:{
            default:'确定'
        },
        cancelTxt:{
            default:'取消'
        }
    },
    computed:{
      txt(){
        return this.tipText
      }
    },
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
    },
    created() {
        // console.group('创建完毕状态===============》created');
    },
    mounted() {
        // console.group('挂载结束状态===============》mounted');
        this.$nextTick(function() {
            // console.log('执行完后，执行===============》mounted');
        });
    },
    methods: {
        // 方法 集合
        cancelFn(){//取消
            this.$parent.mask=false;
            this.$emit('quxiao',{data:false})
        },
        sure(){
        	this.$parent.mask=false;
        	this.$emit('sure',{data:true})
        },
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style scoped lang="less">
.popup{
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background:rgba(0,0,0,.5);
    z-index: 999;
}
.content{
    border-radius:10px;
    background: #ffffff;
    transform: translate(-50%,-50%);
    top:50%;
    left: 50%;
    position: fixed;
    z-index: 1000;
    overflow: hidden;
    width:600px;
}
.tips{
  top: 320px;
  transform:  translate(-50%,0);
}
.topsBox{
  border-bottom: 1PX solid #F2F2F2;
  height: 211px;
  line-height: 211px;
  text-align: center;
  font-size: 32px;
}
.bottom-box{display: flex}
.bottom-box p{width: 50%;text-align: center;line-height:96px;color: #000;font-size:36px}
.bottom-box p:first-of-type{border-right: 1PX solid #e8e8e8}

  .tipBox{
    padding: 45px;
    padding-bottom: 40px;
    font-size: 28px;
    color: #999;
    .txt-box{
      margin-bottom: 82px;
      line-height: 2;
    }
    button{
      width: 100%;
      background: #E62129;
      color: #fff;
      border-radius:10px;
      height: 82px;
      line-height: 82px;
      font-size: 36px;
      outline: none;
      border: none;
    }
 }
 .skip{
    z-index: 9999;
    position: absolute;
    right: 36px;
    top: 36px;
    font-size: 32px;
    color: #fff
 }
</style>
