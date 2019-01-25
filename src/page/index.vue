<template>
  <div class="home" :class="{mask:mask}">
    <!-- <div class="person">
      <div class="person-top">
        <div class="img-post img-book">
          <img src="../assets/img/book3.png" alt="">
        </div>
        <span class='home-size'>个人信息</span>
      </div>
      <div class="person-put">
        <div class="sign p-line">
          <img src="../assets/img/sign2.png" alt="" class="sign-img">
          <div class="l-put ">
            <div class="label">姓名</div> <input type="text" placeholder="请输入您的姓名" v-model='username' >
          </div>
        </div>
        <div class="sign p-line">
          <img src="../assets/img/sign2.png" alt="" class="sign-img">
          <div class="l-put">
            <div class="label">手机</div> <input type="tel" placeholder="请输入您的联系方式" v-model='mobile' @blur='textM' ref='Moblie'  >
          </div>
        </div>
        <div class="l-put p-line ">
          <div class="label">企业</div> <input type="text" placeholder="请输入您的企业名称" v-model='company' @blur="bblur" >
        </div>
        <div class="l-put"  >
          <div class="label">职位</div> <input type="text" placeholder="请输入您的职位名称" v-model='post' @blur='bblur' >
        </div>
      </div>
    </div> -->

    <div class="time">
      <div class="time-top">
        <div class="img-post img-time">
          <img src="../assets/img/time (2).png" alt="">
        </div>
        <span class='home-size' >打卡时间</span>
      </div>
      <div class="time-sel" @click='datePicker' >
         <span class="flo-l" >打卡始于时间</span>
         <div class="flo-r cent" v-show="this.tiems"  >
           <van-icon name="arrow" class="i-post"/>
         </div>
         <span class="flo-r" >{{tiems}}</span>         
        <van-popup v-model="dateObj.dateMask" position="bottom" :overlay="true">
              <van-datetime-picker
                type="date"
                :formatter="dateConfirm"
                :max-date=" new Date()"
                v-model="newTime"
                :item-height='40'
                @confirm='confirm'
              ></van-datetime-picker>
       </van-popup>
      
      </div>
      <div class="l-put"  >
        <div class="label">打卡次数</div> <input type="tel" placeholder="请输入打卡次数" v-model='count' @keyup='text' @blur='bblur' >
           <!-- <i class=" iconfont icon-icon i-iput"  ></i> -->
           <van-icon name="arrow" class="i-iput"/>
      </div>
    </div>

    <div class="add">
      <div class="add-top">
        <div class="img-post img-time">
          <img src="../assets/img/buuk (2).png" alt="">
        </div>
        <span  class='home-size' >知学习</span>
      </div>
      <div class="add-put" v-for="(item,index) in first" :key="index">
        <div class="add-book p-line ">
          <span>书本&nbsp({{index + 1}})</span>
          <span class="del" @click='delbook(index)' v-show='func(index)'>删除</span>
        </div>
        <div class="left">
          <div class="sign p-line  ">
            <div class="l-put"  >
              <div class="label">书本名称</div> <input type="text" placeholder="请输入书本名称" v-model='item.title'  @blur='bblur'  >
              <!-- <i class=" iconfont icon-icon i-iput"></i> -->
              <van-icon name="arrow" class="i-iput" v-show="item.title" />
            </div>
          </div>
          <div class="sign p-line">
            <div class="card-com">
              <div class="l-pu">
                <div class="label">每日朗读遍数</div>
                <van-stepper  v-model.number="item.readCount" class="l-mi" :min="0" />
              </div>
            </div>
          </div>
          <div class="sign" >
            <div class="l-put"  >
              <div class="label five ">总朗读遍数</div> <input type="tel" placeholder="请输入" v-model='item.readTotal' @blur='bblur' >
              <!-- <i class=" iconfont icon-icon i-iput"   ></i> -->
              <van-icon name="arrow" class="i-iput"/>
            </div>
          </div>
        </div>

      </div>
      <div class="add-b">
         <div  @click='addbook'>
           <x-button class="sign" >增加书本</x-button>
           <span class="add-img"><img src="../assets/img/add (2).png" alt=""></span>
        </div>

      </div>
    </div>

    <div class="well">
      <div class="well-top p-line">
        <div class="img-post img-time">
          <img src="../assets/img/gift (2).png" alt="">

        </div>
        <span  class='home-size' >积善行</span>
      </div>
      <div>
          <div class="time-sel" @click='datePickers' >
           <span class="flo-l" >积善开始时间</span>
           <div class="flo-r cent" >
           <van-icon name="arrow" class="i-post"/>
         </div>
           <span class="flo-r" >{{begin}}</span>
          <van-popup v-model="dateObj.dateMasks" position="bottom" :overlay="true">
                <van-datetime-picker
                  type="date"
                  :formatter="dateConfirm"
                  :max-date=" new Date()"
                  v-model="begins"
                  :item-height='52'
                  @confirm='confirms'
                ></van-datetime-picker>
         </van-popup>
      </div>
        <div class="l-put  p-line p-l">
          <div class="label five">积善持续年数</div> <input type="tel" placeholder="请输入年份"  v-model='end'   @blur="bblur">
          <van-icon name="arrow" class="i-iput"  v-show="this.end"/>
        </div>
        <div class="card-com borbtm">
          <div class="l-pu">
            <div class="label ">每日积善件数</div>
            <van-stepper  v-model.number="number" class="l-mi" :min="0" />
          </div>
        </div>
        <div class="l-put"  >
              <div class="label five">累计积善件数</div> <input type="tel" placeholder="请输入" v-model='alls' @blur='bblur'  >
              <van-icon name="arrow" class="i-iput"  v-show="sever(this.alls)" />
           </i>
        </div>
      </div>
    </div>

    <div class="volunteer">
      <div class="volunteer-top">
        <div class="img-post img-time" >
          <img src="../assets/img/star (3).png" alt="">
        </div>
        <span  class='home-size' >立志愿</span>
      </div>
      <div class="volunteer-put">
        <textarea  rows="4" placeholder='请输入您的志愿'  v-model="values" class="ccc" @blur='bblur' ></textarea>
      </div>
      <div class="btn" @click='record'>
        <x-button  >提交</x-button>
      </div>
    </div>
    <v-popup :popup-type="'tips'" :popup-show="mask" @sure="skipFn"></v-popup>
    <!-- <div class='toast' v-show='layout' >
      请输入正确的手机号码
    </div>
    <div class='toast' v-show='text1' >
      请输入您的姓名
    </div>
    <div class='toast' v-show='text2' >
      请输入手机号
    </div> -->
    <div class='toast' v-show='text3' >
      请填写书本信息
    </div>
  </div>
</template>
<script>
  import util from '../util/util'
  import { recordBook } from "@/api/index"
  import { dateFormat } from 'vux'
  import { Toast } from 'vant'
  export default {
    data () {
      return {
        // username: '',
        // company: '',
        // post: '',
        // mobile: '',
        tiems: '',
        count: 0,
        begin: '',
        end: 1,
        number: 1,
        alls: 0,
        values: '',
        first: [{title: '六项精进大纲', readCount: 3, readTotal: 0}, {title: '大学开篇', readCount: 3, readTotal: 0}],
        pass: true,
        pickerValue: '',
        old: 0,
        Number: true,
        mask: true,
        layout: false,
        text1: false,
        text2: false,
        text3: false,
        dateObj: {
          dateMask: false,
          dateMasks: false
        },
        newTime: '',
        begins: ''
      }
    },
    computed:{

    },
    methods: {
      skipFn(){
        this.record(1);
      },
      texte() {
        console.log(event.type)
        console.log(1111)
      },
      dateConfirm(type,value){
          if (type === 'year') {
            return `${value}年`;
          } else if (type === 'month') {
            return `${value}月`
          } else {
            return `${value}日`
          }
          return value;
        },
      datePicker () {
          this.dateObj.dateMask = !this.dateObj.dateMask
      },
      datePickers() {
        this.dateObj.dateMasks = !this.dateObj.dateMasks
      },
      confirms (val) {

        this.begin = dateFormat(val, 'YYYY-MM-DD')
      },
      confirm (val) {
        var s1 = new Date(val);
        var s2 = new Date();//当前日期
        var days = s2.getTime() - s1.getTime();
        this.count = parseInt(days / (1000 * 60 * 60 * 24))
        this.old = parseInt(days / (1000 * 60 * 60 * 24))
        this.tiems = dateFormat(val, 'YYYY-MM-DD')
      },
      addbook () {
        this.first.push({title: '', readCount: 1, readTotal:0})
      },
      delbook (i) {
        this.first.splice(i,1)
      },
      bblur () {
        window.scroll(0,0);
      },
      lose() {

      },
      bid () {
        document.body.scrollTop= 0;
      },
      getTime () {
        this.tiems = dateFormat(new Date(), 'YYYY-MM-DD')
        this.newTime = new Date();
        this.begins =  new Date()
        this.begin = dateFormat(new Date(), 'YYYY-MM-DD')
      },
      func (index) {
        if (index == 0) {
          return false
        } else {
          return true
        }
      },
      sever (val) {
        if( val ) {
          return true
        } else {
          return false
        }
      },
      text () {
        if(this.count >= this.old) {
          this.count = this.old
        }
      },
      textM () {
        var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
        if( myreg.test(this.mobile)) {
          this.$refs.Moblie.style.color = '#000'
          window.scroll(0,0)
          this.Number = true
        } else {
          this.$refs.Moblie.style.color = 'red'
          this.Number = false
          this.layout = true
          this.verify()
        window.scroll(0,0)
        }
      },
      verify() {
        setTimeout(() => {
          this.layout = false
        }, 1500);
      },
      record () {

        this.pass = true;
        if( !this.Number ) {
           return  this.layout = true
                   this.verify()
        }

        // if(!this.username) {
        //   this.pass = false
        //   this.text1 = true
        //   return setTimeout(() => {
        //      this.text1 = false
        //   }, 1500);
        // }
        // if (!this.mobile) {
        //   this.pass = false
        //    this.text2 = true
        //   return setTimeout(() => {
        //      this.text2 = false
        //   }, 1500);
        // }
        this.first.forEach( el => {
          var arr = Object.keys(el)
          if(  arr.length != 3 ) {
            this.pass = false;
             this.text3 = true
            return setTimeout(() => {
             this.text3 = false
            }, 1500);
          }
        });
          this.loading()
        let data={
          pushStart: this.tiems,
          total: this.count,
          bonaStart: this.begin,
          bonaEnd: this.end,
          bonaCount: this.number,
          bonaTotal: this.alls,
          volunteer: this.values,
          books: this.first
        }
        if(arguments.length>0){
          data.isJump=1
        }
        if ( this.pass  ) {
          recordBook(data).then( res => {
            if(res.code == 1) {
              this.hideLoading()
              // localStorage.setItem('userName',this.username);
              this.$router.replace({path:'/nav/card'})
            }
          })
        }

      },
      openPicker() {
        this.$refs.picker.open();
      },
    },
    watch:{
      pickerValue(val) {
        this.tiems = util.itcTiem(this.pickerValue)
      }
    },
    created () {
      this.getTime()
    },
    components: {
    },
    mounted() {
      // window.addEventListener('resize', () => {
      //   const activeElement = document.activeElement
      //   if (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA') {
      //     setTimeout(() => {
      //       activeElement.scrollIntoViewIfNeeded()

      //     }, 0)
      //   }
      // }),
    },
    beforeDestroy() {
      // window.removeEventListener('resize', () => {
      //   const activeElement = document.activeElement
      //   if (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA') {
      //     setTimeout(() => {
      //       activeElement.scrollIntoViewIfNeeded()

      //     }, 0)
      //   }
      // }),
    },

  }
</script>
<style lang="less" >
  body .scroller-item{
    font-size:26px;
  }
  body .mask{
    max-height: 100vh;
    overflow: hidden;
  }
  .van-picker__frame, .van-picker__loading .van-loading {
    display: none;
  }
  .home {
    box-sizing: border-box;

    background: #f5f5f5;
    .van-picker-column__item {
      font-size: 40px;
    }
  .toast {
    position: fixed;
    left: 50%;
    top: 40%;
    background: #000;
    padding: 20px;
    font-size: 26px;
    border-radius: 10px;
    transform: translateX(-50%);
    color:#fff;
  }
  .weui-icon-clear {
    font-size: 30px;
  }
  .p-l {
    padding-left: 5px;
  }
  // 自定义输入框样式
     .l-put {
       height: 96px;
       font-size: 32px;
       display: flex;
       justify-content: flex-start;
       align-items: center;
  .label {
    width: 290px;
    padding-left: 10px;
    color:#000;
  }
  .five {
    width: 520px;
  }
  input {
    width: 100%;
    text-align: right;
    position: flex;
    background:none;
    outline:none;
    border:0px;
    color: #999;
    padding: 20px 0px;
    padding-right: 12px;
  }
  }
  .ma-top {
    margin-top: 16px;
  }
  // 星星定位
     .sign {
       position: relative;
  .sign-img {
    position: absolute;
    transform:translateY(-50%);
    height: 16px;
    width: 16px;
    top: 50%;
    left: -15px;
  }

  }
  .home-size {
    font-size: 30px;
    color:#666;
    display: inline-block;
    padding-left: 53px;
  }
  .cc {
    height: 96px;
    font-size: 32px;
    box-sizing: border-box;
  }
  .ccc {
    font-size: 32px;
    width: 100%;
    outline:none;
    border: none;
  }
  // 公共样式介绍图片定位
     .img-post {
       position: absolute;
       transform:translateY(-50%);
       vertical-align: middle;
       top: 50%;
     }
  .img-time {
    height: 30px;
    width: 30px;
  }
  .l-pu {
    height: 96px;
    font-size: 32px;
    padding: 0 14px;
    box-sizing: border-box;
    line-height: 96px;
    display: flex;
    justify-content: space-between;
    text-align: center;
   .l-mi {
    margin:  auto  0;
    width:180px;
    .van-stepper__minus, .van-stepper__plus {
      width:33%;
      border-color: #ccc;
      height: 61px;
    }
    .van-stepper__minus {
      border-radius: 18px 0 0 18px;
    }
    .van-stepper__plus {
      border-radius: 0 18px 18px 0;
    }
    .van-stepper__input{
      line-height: 61px;
      width:33%;
      height: 61px;
      font-size: 24px;
      box-sizing: border-box;
      border-color: #ccc;
    }
    .van-stepper__minus::before, .van-stepper__plus::before {
      width: 20px !important;
      height: 2px !important;
      color: #999 !important;
    }
    .van-stepper__minus::after, .van-stepper__plus::after {
      height: 20px !important;
      width:2px !important;
      color: #999 !important;
    }

  }
  }
  .p-line {
    border-bottom: 1px solid #F2F2F2;
  }
  .img-post img {
    height: 100%;
    width: auto;
  }
  .person {
    box-sizing: border-box;
    padding-left: 36px;
    padding-right: 36px;
    background: #FFF;

  .person-top {
    padding-left: 10px;
    height: 96px;
    line-height: 96px;
    font-size: 28px;
    border-bottom: 1px solid #F2F2F2;
    position: relative;
  .img-book {
    width: 30px;
    height: 30px;
  }
  }
  }
  // 知学习样式
     .add {
       box-sizing: border-box;
       margin-top: 16px;
       background: #FFF;
  .add-top {
    padding-left: 38px;
    padding-right: 36px;
    height: 96px;
    line-height: 96px;
    font-size: 32px;
    border-bottom: 1px solid #F2F2F2;
    position: relative;
  }
  .add-put{
  .add-book {
    height: 96px;
    padding-left: 40px;
    padding-right: 42px;
    background: #F5F5F5;
    display: flex;
    justify-content:space-between;
    line-height: 96px;
    font-size: 28px;
  .del {
    color: red;
  }

  }
  .left {
    padding: 0 32px;
  }
  }
  .add-b {
    position: relative;
    height: 85px;
  .weui-btn_default {
    height: 85px;
    font-size: 32px;
    background: #FFF;
    color: red;
  }
  }
  }
  // 打卡时间样式
     .time{
       box-sizing: border-box;
      //  margin-top: 16px;
       padding-left: 34px;
       padding-right: 34px;
       background: #FFF;
  .time-top {
    padding-left: 11px;
    height: 96px;
    line-height: 96px;
    font-size: 28px;
    border-bottom: 1px solid #F2F2F2;
    position: relative;
  }
  }


  .well {
    box-sizing: border-box;
    margin-top: 16px;
    padding-left: 36px;
    padding-right: 36px;
    background: #FFF;
  .well-top {
    height: 96px;
    line-height: 96px;
    padding-left: 10px;
    font-size: 32px;
    border-bottom: 1px solid #F2F2F2;
    position: relative;
  }
  }

  .volunteer{
    box-sizing: border-box;
    margin-top: 16px;
    padding-left: 38px;
    padding-right: 36px;
    background: #FFF;
  .volunteer-top {
    height: 96px;
    line-height: 96px;
    font-size: 28px;
    border-bottom: 1px solid #F2F2F2;
    position: relative;
  }
  .volunteer-put {
    border-bottom: 1px solid #f5f5f5;
  }
  .btn {
    margin-top: 110px;
    padding-bottom: 32px;
  .weui-btn_default {
    height: 96px;
    font-size: 36px;
    color: #fff;
    background-color: #E62129;
    border-radius: 10px;
  }
  }
  }

  .add-img{
    position: absolute;
    transform:translateY(-50%);
    top: 50%;
    left: 37%;
    height: 26px;
    width: 26px;
    img{
      height: 100%;
      width: auto;
    }
  }
  .time-sel {
     padding-left:10px;
     line-height: 96px;
     font-size: 32px;
     color: #000;
     overflow: hidden;
    //  display: flex;
    //  align-items: center;
     margin: auto 0;
    //  text-align: center;
    //  position: relative;
    //  display: flex;
    //  justify-content: space-between;
     border-bottom: 1px solid #f5f5f5;
     .van-popup--bottom {
       height: 42vh;
     }
   }
   .cent {
     height: 96px;
     width: 42px;
     text-align: right;
     position: relative;
     padding-left: 9px;
   }
   .i-post {
     position: absolute;
     top: 50%;
     right: 0;
     transform: translateY(-50%);
     font-size: 42px;
     color: #999;
   }
   .i-iput {
     font-size: 42px;
     color:#999;
   }
   .flo-l {
     float: left;
   }
   .flo-r {
     float: right;
     color: #999
   }
  }
  .borbtm{
    border-bottom: 1px solid #f2f2f2;
  }
</style>
