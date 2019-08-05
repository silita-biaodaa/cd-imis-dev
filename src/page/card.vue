<template>
  <div class="card">
    <div class="card-top card-com laca">
      <div class="siz">
        <img src="../assets/img/buuk (1).png" alt />
      </div>
      <div class="card-size">知学习</div>
    </div>
    <div v-for="(el,i) in bookss" :key="i">
      <div class="card-b">
        <div class="card-book">
          《{{el.title}}》共朗读
          <span>{{el.readTotal+el.readCount}}</span> 遍
        </div>
        <div class="right-box icon-mk" @click="jumpMini('book',i)"></div>
      </div>
      <div class="card-com">
        <div class="l-pu">
          <div class="label label-f font-bold">今日朗读遍数</div>
          <span></span>
          <van-stepper
            @change="bookChang(el)"
            v-model.number="el.readCount"
            class="l-mi"
            :min="0"
            :disabled="first"
          />
        </div>
      </div>
      <div class="card-play" v-show="el.audioPath">
        <v-audio
          :audioPath="el.audioPath"
          @deAudio="deBookPathFn(i)"
          @audioPlay="audioPlay"
          :isCard="1"
          :ref="'book'+i"
        ></v-audio>
      </div>
    </div>

    <div v-for="(item,index) in books" :key="'add'+index">
      <div class="card-b card-book add-book">
        <span>书本 ({{index + booklength + 1}})</span>
        <div class="addBook-box">
          <div class="icon-mk" @click="jumpMini('addbook',index)"></div>
          <div class="del-book" @click="cardDel(index)" v-if="!first"></div>
        </div>
      </div>
      <div class="pdd">
        <div class="l-put put-bot">
          <div class="label label-f font-bold">书本名称</div>
          <input type="text" placeholder="请输入书本名称" v-model="item.bookName" :disabled="first" />
        </div>
        <div class="l-put">
          <div class="label label-f font-bold">朗读章节</div>
          <input
            type="text"
            placeholder="请输入"
            v-model="item.section"
            :disabled="first"
          />
        </div>
        <div class="card-play" v-if="item.audioPath">
          <v-audio
            :audioPath="item.audioPath"
            @deAudio="deBooksPathFn(index)"
            :isCard="1"
            @audioPlay="audioPlay"
            :ref="'addbook'+index"
          ></v-audio>
        </div>
      </div>
    </div>
    <div class="card-com card-add" v-if="!first">
      <span class="laca" @click="cardBook">
        增加书本
        <div class="laca-add">
          <img src="../assets/img/add (1).png" alt />
        </div>
      </span>
    </div>
    <div class="card-com card-share font-bold">经典名句分享</div>
    <div class="card-put">
      <textarea
        rows="4"
        placeholder="请输入您要分享的经典名句"
        v-model="pushData.classic"
        class="ccc"
        @blur="bblur"
        :disabled="first"
      ></textarea>
    </div>

    <div class="card-top card-com laca card-ma">
      <div class="siz">
        <img src="../assets/img/chess (2).png" alt />
      </div>
      <div class="card-size">行实践</div>
    </div>
    <div class="card-com card-share tit-box font-bold">修身</div>
    <div class="card-put">
      <textarea
        rows="4"
        placeholder="请输入今日您对个人的贡献"
        v-model="pushData.practice.character"
        class="ccc"
        @blur="bblur"
        :disabled="first"
      ></textarea>
    </div>
    <div class="card-com card-share tit-box font-bold">齐家</div>
    <div class="card-put">
      <textarea
        rows="4"
        placeholder="请输入今日您对家庭和家人的贡献"
        v-model="pushData.practice.family"
        class="ccc"
        @blur="bblur"
        :disabled="first"
      ></textarea>
    </div>
    <div class="card-com card-share tit-box font-bold">建功</div>
    <div class="card-put">
      <textarea
        rows="4"
        placeholder="请输入今日您对工作的贡献"
        v-model="pushData.practice.work"
        class="ccc"
        @blur="bblur"
        :disabled="first"
      ></textarea>
    </div>
    <!-- <div class="card-com">
          <div class="l-put">
               <div class="label label-f">修身</div><input type="text" placeholder="请输入今日您对个人的贡献" v-model="pushData.practice.character" @blur='bblur' :disabled='first' >
          </div>
       </div>
       <div class="card-com">
          <div class="l-put">
               <div class="label label-f label-t">齐家</div> <input type="text" placeholder="请输入今日您对家庭和家人的贡献"  v-model="pushData.practice.family" @blur='bblur' :disabled='first' >
          </div>
       </div>
       <div class="card-com">
          <div class="l-put">
               <div class="label label-f label-t">建功</div> <input type="text" placeholder="请输入今日您对工作的贡献" v-model="pushData.practice.work" @blur='bblur' :disabled='first' >
          </div>
    </div>-->

    <div class="card-top card-com laca card-ma">
      <div class="siz">
        <img src="../assets/img/gift (2).png" alt />
      </div>
      <div class="card-size">积善行</div>
    </div>
    <div class="card-b">
      <div class="card-book">
        发愿从{{pushCount.bonaStart}}起，{{pushCount.years}}年内{{pushCount.days * pushCount.bonaCount }}善事，累计
        <span>{{pushCount.bonaTotal+pushCount.bonaDays}}</span>善。
      </div>
    </div>
    <div class="card-com">
      <div class="l-pu">
        <div class="label label-f font-bold">今日行善次数</div>
        <van-stepper v-model="pushCount.bonaDays" class="l-mi" :min="0" :disabled="first" />
      </div>
    </div>
    <div class="card-top card-com laca card-ma">
      <div class="tit-box">
        <div class="siz">
          <img src="../assets/img/star (2).png" alt />
        </div>
        <div class="card-size">立志愿</div>
      </div>
    </div>
    <div class="card-put">
      <textarea
        rows="4"
        placeholder="请输入您要分享的志愿"
        v-model="pushData.volunteer"
        class="ccc"
        @blur="bblur"
        :disabled="first"
      ></textarea>
    </div>
    <div class="card-top card-com laca card-ma">
      <div class="tit-box">
        <div class="siz">
          <img src="../assets/img/awake.png" alt />
        </div>
        <div class="card-size">省觉悟</div>
      </div>
    </div>
    <div class="card-put">
      <textarea
        :disabled="first"
        rows="4"
        placeholder="请输入您的反省及觉悟"
        v-model="pushData.introspective"
        class="ccc"
        @blur="bblur"
      ></textarea>
    </div>
    <div class="card-top card-com laca card-ma">
      <div class="tit-box">
        <div class="siz">
          <img src="../assets/img/hua.png" alt />
        </div>
        <div class="card-size">感谢</div>
      </div>
    </div>
    <div class="card-put">
      <textarea
        :disabled="first"
        rows="4"
        placeholder="请输入您的感谢"
        v-model="pushData.thanks"
        class="ccc tanks"
        @blur="bblur"
      ></textarea>
    </div>

    <div class="card-btn" @click="maskFn">
      <div class="card-div">{{btnTitle}}</div>
    </div>
    <v-popup :popupShow="mask" :popupType="'tip1'" :tip-text="tipTxt" @sure="punch"></v-popup>
  </div>
</template>
<script>
import { recordPer, pushCard, groups } from "@/api/index";
import wx from "weixin-js-sdk";
import { setTimeout } from "timers";
export default {
  name: "card",
  data() {
    return {
      num: "",
      books: [],
      bookss: [],
      pushCount: {}, //积善行
      pushData: {
        volunteer: "", // 立志愿
        classic: "", // 经典名句
        practice: { character: "", work: "", family: "" }, //行～实践
        introspective: "", //省省悟
        thanks: "" //感谢
      },
      btnTitle: "提交",
      first: false,
      mask: false,
      mask1: false,
      tipTxt: "",
      booklength: 0,
      repetition: false,
      isTap: false
    };
  },
  watch: {
    pushData: {
      deep: true,
      handler: function(newVal, oldVal) {
        localStorage.setItem("cardPushData", JSON.stringify(newVal));
      }
    },
    books: {
      deep: true,
      handler(newVal, oldVal) {
        localStorage.setItem("cardAddBook", JSON.stringify(newVal));
      }
    },
    bookss: {
      deep: true,
      handler(newVal, oldVal) {
        localStorage.setItem("cardBook", JSON.stringify(newVal));
      }
    }
  },
  methods: {
    jumpMini(type, id) {
      //跳转至小程序
      let that = this;
      if (this.isTap) {
        return false;
      }
      this.isTap = true;
      for (let x in that.$refs) {
        that.$refs[x][0].stop();
      }
      let token = localStorage.getItem("Authorization");
      let uri = encodeURIComponent(location.href.split("?type")[0]);
      wx.miniProgram.navigateTo({
        url:
          "/pages/record/record?token=" +
          token +
          "&type=" +
          type +
          "&id=" +
          id +
          "&uri=" +
          uri
      });
      setTimeout(function() {
        that.isTap = false;
      }, 1000);
    },
    audioPlay() {
      let that = this;
      for (let x in that.$refs) {
        that.$refs[x][0].pause();
      }
    },
    bookChang(el) {
      if (el.readCount == 0) {
        el.type = 1;
      }
    },
    maskFn() {
      if (this.btnTitle == "提交") {
        this.mask = true;
        this.tipTxt = "确认提交打卡信息？";
      } else {
        this.mask = true;
        this.tipTxt = "修改会覆盖今日打卡内容，是否继续？";
      }
    },
    gainPer() {
      let that = this;
      recordPer({}).then(res => {
        if (res.code == 1 || res.code == 402) {
          if (res.code == 402) {
            this.btnTitle = "修改";
          } else {
            this.btnTitle = "提交";
          }
          res.data.books.forEach((el, i) => {
            el.num = 0;
            if (res.code == 402) {
              el.num = el.readCount;
            }
            el.readTotal = el.readTotal - el.num;
            if (!el.readCount == 0 || el.type == 1) {
              this.bookss.push(el);
            }
          });
          that.pushData.thanks = res.data.thanks;
          that.pushData.practice = res.data.practice
            ? res.data.practice
            : { character: "", work: "", family: "" };
          that.pushData.classic = res.data.classic;
          that.pushData.introspective = res.data.introspective;
          that.pushCount = res.data.pushCount;
          that.pushCount.num = 0;
          if (res.code == 402) {
            that.pushCount.num = that.pushCount.bonaDays;
          }
          that.pushCount.bonaTotal =
            that.pushCount.bonaTotal - that.pushCount.num;
          that.pushData.volunteer = res.data.volunteer;
          that.books = res.data.bookish ? res.data.bookish : [];
          that.booklength = that.bookss.length;
          let local = localStorage.getItem("cardPushData");
          if (local) {
            // alert(localStorage.getItem('cardBook'));
            that.pushData = JSON.parse(local);
            // let obj=this.$route.query;
            // if(JSON.stringify(obj)!='{}'){
            //   // let arr=[];
            //   // alert(obj.id);
            //   // alert(obj.path);
            //   // alert(obj.type);
            //   // that.bookss[0].audioPath='fsfsfa'
            //   if(obj.type=='book'){
            //   let bookData=that.bookss;
            //     if(localStorage.getItem('cardBook')){
            //       let locBook=localStorage.getItem('cardBook');
            //       bookData=JSON.parse(locBook)
            //     }
            //     let data=bookData[obj.id];
            //     data.audioPath=obj.path;
            //     localStorage.setItem('cardBook',JSON.stringify(bookData));
            //     that.$set(that.bookss,bookData);
            //   }else if(obj.type=='addbook'){
            //     let bookData=that.books;
            //     if(localStorage.getItem('cardAddBook')){
            //       let locAddBook=localStorage.getItem('cardAddBook');
            //       bookData=JSON.parse(locAddBook)
            //     }
            //     let data=bookData[obj.id];
            //     data.audioPath=obj.path;
            //     localStorage.setItem('cardAddBook',JSON.stringify(bookData));
            //     that.$set(that.books,bookData);
            //     // that.books=bookData;
            //   }
            // }
            // let arr=[];
            // that.pushData.bookss.forEach((el,i) => {
            //     if( ! el.readCount == 0 ||el.type==1) {
            //       arr.push(el);
            //     }
            // })
            // that.pushData.bookss=arr;
            // if(res.code==402){
            //   that.pushData.pushCount.num=that.pushData.pushCount.bonaDays
            //   that.pushData.pushCount.bonaTotal=that.pushData.pushCount.bonaTotal-that.pushData.pushCount.num
            // }
            // return false
          }
          let obj = this.$route.query;
          if (JSON.stringify(obj) != "{}") {
            if (obj.type == "book") {
              let bookData = that.bookss;
              let addbook;
              if (localStorage.getItem("cardBook")) {
                let locBook = localStorage.getItem("cardBook");
                bookData = JSON.parse(locBook);
              }
              if (localStorage.getItem("cardAddBook")) {
                let locAddBook = localStorage.getItem("cardAddBook");
                addbook = JSON.parse(locAddBook);
              }
              let data = bookData[obj.id];
              data.audioPath = obj.path;
              localStorage.setItem("cardBook", JSON.stringify(bookData));
              that.bookss = [];
              that.books = [];
              for (let x of bookData) {
                //普通书本
                that.bookss.push(x);
              }
              for (let x of addbook) {
                //添加书本
                that.books.push(x);
              }
            } else if (obj.type == "addbook") {
              let bookData = that.books;
              let bookss;
              if (localStorage.getItem("cardAddBook")) {
                let locAddBook = localStorage.getItem("cardAddBook");
                bookData = JSON.parse(locAddBook);
              }
              if (localStorage.getItem("cardBook")) {
                let locBook = localStorage.getItem("cardBook");
                bookss = JSON.parse(locBook);
              }
              let data = bookData[obj.id];
              data.audioPath = obj.path;
              localStorage.setItem("cardAddBook", JSON.stringify(bookData));
              that.books = [];
              that.bookss = [];
              for (let x of bookData) {
                //加新增书本
                that.books.push(x);
              }
              for (let x of bookss) {
                //加普通书本
                that.bookss.push(x);
              }
            }
          }
          // else{
          // localStorage.setItem('cardPushData',JSON.stringify(that.pushData));
          // }
        }
      });
    },
    punch() {
      let obj = this.$route.query;
      console.info('obj',obj)
      let isUpdate = 0;
      if (this.btnTitle == "修改") {
        isUpdate = 1;
      }
      this.loading();
      pushCard({
        isUpdate: isUpdate,
        thanks: this.pushData.thanks,
        practice: this.pushData.practice,
        books: this.bookss,
        classic: this.pushData.classic,
        introspective: this.pushData.introspective,
        volunteer: this.pushData.volunteer,
        pushCount: this.pushCount,
        isPub: "1",
        bookish: this.books,
        recordTime: obj.recordTime,
      }).then(res => {
        if (res.code == 1) {
          this.hideLoading();
          localStorage.removeItem("cardPushData");
          localStorage.removeItem("cardBook");
          localStorage.removeItem("cardAddBook");
          this.$router.push({ path: "/nav/friend" });
        }
      });
    },
    cardBook() {
      let data = { title: "", readCount: 1, readTotal: 0 };
      this.books.push(data);
    },
    cardDel(i) {
      this.books.splice(i, 1);
    },
    bblur() {
      window.scroll(0, 0);
    },
    deBookPathFn(i) {
      this.bookss[i].audioPath = "";
    },
    deBooksPathFn(i) {
      this.books[i].audioPath = "";
    },
    getParam(name) {
      var url = window.location.search; //获取问号之后的字0符
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      if (url != null && url.toString().length > 1) {
        var r = url.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
      }
    }
  },
  created() {
    this.gainPer();
    alert('this.$route.query',this.$route.query);
    if(this.$route.query.recordTime) {
      this.recordTime = this.$route.query.recordTime;
    }
  },
  components: {},
  mounted() {
    window.addEventListener("resize", () => {
      const activeElement = document.activeElement;
      if (
        activeElement.tagName === "INPUT" ||
        activeElement.tagName === "TEXTAREA"
      ) {
        setTimeout(() => {
          // activeElement.scrollIntoView({block:'start'})
          // window.scroll(0,0);
          activeElement.scrollIntoViewIfNeeded();
        }, 0);
      }
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", () => {
      const activeElement = document.activeElement;
      if (
        activeElement.tagName === "INPUT" ||
        activeElement.tagName === "TEXTAREA"
      ) {
        setTimeout(() => {
          activeElement.scrollIntoViewIfNeeded();
        }, 0);
      }
    });
  }
};
</script>
<style lang="less" >
.card-play {
  margin-bottom: 20px;
}
.font-bold {
  font-weight: bold;
}
audio {
  width: 100%;
  // height: 100%;
}
.card {
  background: #f5f5f5;
  -webkit-overflow-scrolling: touch;
  position: relative;
  .l-pu {
    height: 96px;
    font-size: 32px;
    padding: 0 6px;
    box-sizing: border-box;
    line-height: 96px;
    display: flex;
    justify-content: space-between;
    text-align: center;
  .l-mi {
    margin:  auto  0;
    width:180px;
    display: flex;
    .van-stepper__minus, .van-stepper__plus {
      width:33%;
      border-color: #ccc;
      height: 61px;
      border-width: 1PX
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
      height: 1PX !important;
      color: #999 !important;
    }
    .van-stepper__minus::after, .van-stepper__plus::after {
      height: 20px !important;
      width:1PX !important;
      color: #999 !important;
    }
  }
  }
  .tit-box {
    width: 100%;
    border-bottom: 1px solid #f2f2f2;
  }
  .l-put {
    height: 96px;
    font-size: 32px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    box-sizing: border-box;
    border-top: 1px solid #f2f2f2;
    padding: 25px 0;
    .label {
      padding-left: 0px;
      color: #000;
    }
    input {
      height: 46px;
      line-height: 46px;
      width: 100%;
      text-align: right;
      background: none;
      outline: none;
      border: 0px;
      box-sizing: border-box;
      caret-color: blue;
    }
    .label-f {
      width: 280px;
    }
    .label-t {
      width: 220px;
    }
  }
  .card-top {
    img {
      height: 100%;
      width: auto;
    }
  }
  .card-size {
    padding-left: 53px;
    color: #666;
    font-size: 28px;
  }
  .card-com {
    background: #fff;
    padding: 0 36px;
    height: 96px;
    line-height: 96px;
  }
  .laca {
    position: relative;
  }
  .laca-add {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    height: 26px;
    left: -25%;
    img {
      height: 100%;
    }
  }
  .siz {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    height: 30px;
    width: 33px;
  }
  .card-b {
    height: 80px;
    line-height: 80px;
    background-color: #f5f5f5;
    padding: 0 36px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .card-book {
    color: #999;
    font-size: 26px;
  }
  .icon-mk {
    background: url("../assets/img/icon-mk.png");
    background-size: cover;
    width: 23px;
    height: 35px;
  }
  .addBook-box {
    display: flex;
    .icon-mk {
      margin-right: 50px;
    }
  }
  .add-book {
    display: flex;
    justify-content: space-between;
    padding-right: 36px;
  }
  .del-book {
    background: url("../assets/img/sc.png");
    background-size: cover;
    width: 40px;
    height: 40px;
  }
  .pdd {
    background: #fff;
    padding: 0 36px;
    .audioPlay {
      padding-left: 0;
      padding-right: 0;
    }
  }
  .put-bot {
    border-bottom: 1px solid #f2f2f2;
  }
  .card-add {
    text-align: center;
    background: #fff;
    font-size: 33px;
    color: #e62129;
    font-weight: 500;
  }
  .card-share {
    font-size: 32px;
    color: #000;
    background: #fff;
    margin-top: 10px;
    box-sizing: border-box;
  }
  .card-put {
    font-size: 32px;
    background: #fff;
    padding: 33px;
    // height: ;
  }
  .card-ma {
    margin-top: 10px;
    display: flex;
    align-items: center;
  }
  .weui-cell {
    padding: 10px 36px;
  }
  .card-btn {
    margin-top: 110px;
    padding: 0 32px;
    padding-bottom: 32px;
    .card-div {
      height: 96px;
      font-size: 36px;
      color: #fff;
      background-color: #e62129;
      line-height: 96px;
      text-align: center;
      border-radius: 12px;
    }
  }
  .ccc {
    font-size: 32px;
    width: 100%;
    outline: none;
    border: none;
    //  padding:20px;
  }
  .tanks {
    border-bottom: 1px solid #f2f2f2;
  }
}
textarea {
  border-radius: 5px;
  padding: 10px;
}
textarea[disabled] {
  background: #f5f5f5;
}
</style>
