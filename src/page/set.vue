<template>
  <div class="set">
    <div class="person">
      <div class="person-top">
        <div class="img-post img-book">
          <img src="../assets/img/book3.png" alt />
        </div>
        <span class="home-size">个人信息</span>
      </div>
      <div class="person-put">
        <div class="sign p-line">
          <img src="../assets/img/sign2.png" alt class="sign-img" />
          <div class="l-put">
            <div class="label">姓名</div>
            <input type="text" placeholder="请输入您的姓名" v-model="user.name" />
          </div>
        </div>
        <div class="sign p-line">
          <!-- <img src="../assets/img/sign2.png" alt="" class="sign-img"> -->
          <div class="l-put">
            <div class="label">手机</div>
            <input type="tel" placeholder="请输入您的联系方式" v-model="user.phone" ref="Moblie" />
          </div>
        </div>
        <div class="l-put p-line">
          <div class="label">企业</div>
          <input type="text" placeholder="请输入您的企业名称" v-model="user.company" @blur="bblur" />
        </div>
        <div class="l-put">
          <div class="label">职位</div>
          <input type="text" placeholder="请输入您的职位名称" v-model="user.post" @blur="bblur" />
        </div>
      </div>
    </div>

    <div class="card-top card-com laca">
      <div class="siz">
        <img src="../assets/img/buuk (1).png" alt />
      </div>
      <div class="card-size">知学习</div>
    </div>

    <div v-for="el in bookss" :key="el.pkid">
      <div class="card-b">
        <div class="card-book">《{{el.title}}》共朗读{{el.readTotal}}遍</div>
      </div>
      <div class="card-com">
        <div class="l-pu">
          <div class="label label-f">每日朗读遍数</div>
          <van-stepper @change="bookChang(el)" v-model.number="el.readCount" class="l-mi" :min="0" />
        </div>
      </div>
    </div>

    <div v-for="(item,index) in books" :key="index">
      <div class="card-b card-book add-book">
        <span>书本&nbsp;({{ index + Blength}})</span>
        <span class="del-book" @click="cardDel(index)">删除</span>
      </div>
      <div class="pdd">
        <div class="l-put put-bot">
          <div class="label label-f no-f">书本名称</div>
          <input type="text" placeholder="请输入书本名称" v-model="item.title" @blur="bblur" />
        </div>
        <div class="l-put">
          <div class="label label-f no-f">每日朗读遍数</div>
          <input
            type="number"
            placeholder="请输入数字"
            v-model="item.readCount"
            onkeyup="value=value.replace(/[^\d]/g,'')"
            onblur="value=value.replace(/[^\d]/g,'')"
            @blur="bblur"
          />
        </div>
      </div>
    </div>
    <div class="card-com card-add">
      <span class="laca" @click="cardBook">
        增加书本
        <div class="laca-add">
          <img src="../assets/img/add (1).png" alt />
        </div>
      </span>
    </div>

    <div class="card-top card-com laca card-ma">
      <div class="siz">
        <img src="../assets/img/gift (2).png" alt />
      </div>
      <div class="card-size">积善行</div>
    </div>
    <div class="card-b">
      <div class="card-book l-fire">发愿从{{pushCount.bonaStart}}起，累计 {{pushCount.bonaTotal}} 善。</div>
    </div>
    <div class="card-com">
      <div class="l-pu">
        <div class="label label-f">积善持续年数</div>
        <van-stepper v-model="pushCount.years" class="l-mi" :min="1" @blur="bblur" />
      </div>
    </div>
    <div class="card-com">
      <div class="l-pu">
        <div class="label label-f">每日积善件数</div>
        <van-stepper v-model="pushCount.bonaCount" class="l-mi" :min="0" @blur="bblur" />
      </div>
    </div>

    <div class="volunteer">
      <div class="volunteer-top">
        <div class="img-post img-time">
          <img src="../assets/img/star (3).png" alt />
        </div>
        <span class="home-size">立志愿</span>
      </div>
      <div class="volunteer-put">
        <textarea rows="4" placeholder="请输入您的志愿" v-model="values" class="ccc" @blur="bblur"></textarea>
      </div>
      <div class="btn" @click="record">
        <x-button>保&nbsp;存</x-button>
      </div>
    </div>

    <div class="toast" v-show="mask">个人信息更新成功</div>
    <div class="toast" v-show="readNum">请输入朗读书本数量</div>
    <div class="toast" v-show="text2">请输入您的姓名</div>
    <div class="toast" v-show="text3">请填写书本信息</div>
  </div>
</template>
<script>
import { Personage, Saveuser } from "@/api/index";
import { dateFormat } from "vux";
import { setTimeout } from "timers";
export default {
  inject: ["reload"],
  data() {
    return {
      //  layout:false,
      user: [],
      bookss: [],
      books: [],
      values: "",
      Blength: 0,
      pushCount: [],
      Number: true,
      delay: true,
      mask: false,
      readNum: false,
      newbook: [],
      //  text1:false,
      text2: false,
      text3: false
    };
  },
  methods: {
    bookChang(el) {
      if (el.readCount == 0) {
        el.type = 0;
      }
    },
    bblur() {
      window.scroll(0, 0);
    },
    cardDel(i) {
      this.books.splice(i, 1);
    },
    cardBook() {
      this.books.push({});
    },
    record() {
      this.pass = true;
      if (!this.user.name) {
        this.pass = false;
        this.text2 = true;
        return setTimeout(() => {
          this.text2 = false;
        }, 1500);
      }
      // this.books.forEach(el => {
      //   el.readCount = el.readCount * 1;
      //   el.readTotal = 0;
      //   var arr = Object.keys(el);
      //   if (arr.length < 2) {
      //     this.pass = false;
      //     this.text3 = true;
      //     return setTimeout(() => {
      //       this.text3 = false;
      //     }, 1500);
      //   }
      // });
      this.delay = true;
      for (let i in this.books) {
        if (!this.books[i].title) {
          this.text3 = true;
          return setTimeout(() => {
            this.text3 = false;
          }, 1500);
        } else if (!this.books[i].readCount) {
          this.readNum = true;
          return setTimeout(() => {
            this.readNum = false;
          }, 1500);
        } else {
          if (this.pass && this.delay) {
            let that = this;
            this.delay = false;
            this.pushCount.volunteer = this.values;
            this.pushCount.bonaStart = this.pushCount.bonaStart.replace(
              "年",
              "-"
            );
            this.pushCount.bonaStart = this.pushCount.bonaStart.replace(
              "月",
              "-"
            );
            this.pushCount.bonaStart = this.pushCount.bonaStart.replace(
              "日",
              ""
            );
            this.newbook = this.bookss.concat(this.books);
            //保存用户信息
            localStorage.setItem("userName", this.user.name);
            let local = localStorage.getItem("cardPushData");
            if (local) {
              let data = JSON.parse(local);
              data.volunteer = this.values;
              localStorage.setItem("cardPushData", JSON.stringify(data));
            }
            delete this.pushCount.bonaTotal;
            Saveuser({
              books: this.newbook,
              user: this.user,
              pushCount: this.pushCount
            }).then(res => {
              if (res.code == 1) {
                this.reload();
                this.delay = true;
                this.mask = true;
                this.gainUser();
                return setTimeout(() => {
                  this.mask = false;
                }, 1500);
              }
            });
          }
        }
      }
    },
    gainUser() {
      Personage({}).then(res => {
        if (res.code == 1) {
          this.user = res.data.user;
          this.bookss = res.data.books;
          this.Blength = res.data.books.length + 1;
          this.pushCount = res.data.pushCount;
          this.values = res.data.volunteer;
        }
      });
    }
  },
  created() {
    this.gainUser();
  },
  components: {}
};
</script>
<style lang="less" >
.set {
  box-sizing: border-box;
  background: #f5f5f5;
  -webkit-overflow-scrolling: touch;
  position: relative;
  .person {
    box-sizing: border-box;
    padding-left: 36px;
    padding-right: 36px;
    background: #fff;

    .person-top {
      padding-left: 10px;
      height: 96px;
      line-height: 96px;
      font-size: 28px;
      border-bottom: 1px solid #f2f2f2;
      position: relative;
      .img-book {
        width: 30px;
        height: 30px;
      }
      img {
        height: 100%;
      }
      span {
        padding-left: 35px;
      }
    }
  }
  .p-line {
    border-bottom: 1px solid #f2f2f2;
  }
  .img-post {
    position: absolute;
    transform: translateY(-50%);
    vertical-align: middle;
    top: 50%;
  }
  .sign {
    position: relative;
    .sign-img {
      position: absolute;
      transform: translateY(-50%);
      height: 16px;
      width: 16px;
      top: 50%;
      left: -15px;
    }
  }
  .toast {
    position: fixed;
    left: 50%;
    top: 50%;
    background: #000;
    padding: 20px;
    font-size: 26px;
    border-radius: 10px;
    transform: translateX(-50%);
    color: #fff;
  }
  .l-put {
    height: 96px;
    font-size: 32px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .label {
      width: 290px;
      padding-left: 10px;
      color: #000;
    }
    input {
      width: 100%;
      text-align: right;
      background: none;
      outline: none;
      border: 0px;
      caret-color: blue;
      padding: 20px 0px;
    }
  }
  .card-top {
    img {
      width: 100%;
      padding-left: 11px;
    }
  }
  .card-com {
    background: #fff;
    padding: 0 36px;
    height: 96px;
    line-height: 96px;
  }
  .laca {
    position: relative;
    margin-top: 16px;
  }
  .siz {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    height: 30px;
    width: 33px;
  }
  .card-size {
    padding-left: 53px;
    color: #666;
    font-size: 28px;
  }
  .card-b {
    height: 80px;
    line-height: 80px;
    background-color: #f5f5f5;
    padding-left: 36px;
  }
  .card-book {
    color: #999;
    font-size: 26px;
  }
  .add-book {
    display: flex;
    justify-content: space-between;
    padding-right: 36px;
    padding-left: 46px;
  }
  .del-book {
    color: #e62129;
  }
  .put-bot {
    border-bottom: 1px solid #f2f2f2;
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
  .card-add {
    text-align: center;
    background: #fff;
    font-size: 33px;
    color: #e62129;
    font-weight: 500;
  }
  .label-f {
    width: 280px;
    padding-left: 8px;
    text-align: left;
  }
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
      margin: auto 0;
      width: 180px;
      display: flex;
      flex-direction: row;
      .van-stepper__minus,
      .van-stepper__plus {
        width: 33%;
        border-color: #ccc;
        height: 61px;
        border-width: 1px;
      }
      .van-stepper__minus {
        border-radius: 18px 0 0 18px;
      }
      .van-stepper__plus {
        border-radius: 0 18px 18px 0;
      }
      .van-stepper__input {
        line-height: 61px;
        width: 33%;
        height: 61px;
        font-size: 24px;
        box-sizing: border-box;
        border-color: #ccc;
      }
      .van-stepper__minus::before,
      .van-stepper__plus::before {
        width: 20px !important;
        height: 1px !important;
        color: #999 !important;
      }
      .van-stepper__minus::after,
      .van-stepper__plus::after {
        height: 20px !important;
        width: 1px !important;
        color: #999 !important;
      }
    }
  }
  .pdd {
    background: #fff;
    padding: 0 46px;
  }
  .no-f {
    padding-left: 0 !important;
  }
  .volunteer {
    box-sizing: border-box;
    margin-top: 16px;
    padding-left: 46px;
    padding-right: 36px;
    background: #fff;
    .volunteer-top {
      height: 96px;
      line-height: 96px;
      font-size: 28px;
      border-bottom: 1px solid #f2f2f2;
      position: relative;
      img {
        //  height: 100%;
        height: 34px;
        width: 34px;
      }
      span {
        padding-left: 38px;
      }
    }
    .volunteer-put {
      border-bottom: 1px solid #f2f2f2;
    }
    .btn {
      margin-top: 140px;
      padding-bottom: 90px;
      .weui-btn_default {
        height: 96px;
        font-size: 36px;
        color: #fff;
        background-color: #e62129;
        border-radius: 12px;
      }
    }
  }
  .ccc {
    font-size: 32px;
    width: 100%;
    outline: none;
    border: none;
  }
  .l-fire {
    padding-left: 10px;
  }
}
</style>
