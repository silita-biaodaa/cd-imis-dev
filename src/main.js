
import Vue from 'vue'
import App from './App'
import router from './router/router'
import axios from './axios/index'
Vue.prototype.$axios = axios

import './assets/js/flexible_css.js'
import './assets/js/makegrid.js'

import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)

// import Mint from 'mint-ui';
// import 'mint-ui/lib/style.css'
// Vue.use(Mint);

import clocklist from '@/components/clockList'
import popup from '@/components/popup'
import head from '@/components/headgoto'
import { XButton,Group } from 'vux'
//InlineCalendar, XInput, Datetime, XTextarea, , AlertPlugin,
// Vue.component('inline-calendar', InlineCalendar)
// Vue.component('x-input', XInput)
// Vue.component('datetime', Datetime)
// Vue.component('x-textarea', XTextarea)
Vue.component('x-button', XButton)
Vue.component('group', Group)
Vue.component('v-clock', clocklist)
Vue.component('v-popup', popup)
Vue.component('v-head', head)
// Vue.use(AlertPlugin)


//load层
var tpl=null;
Vue.prototype.loading =() =>{
  var loading = Vue.extend(require('@/components/loading.vue'));
  tpl = new loading().$mount().$el;  // 创建实例，挂载到文档以后的地方
  document.body.appendChild(tpl);
  return tpl
}
Vue.mixin({
  methods: {
    hideLoading: function () {
      if(tpl){
        document.body.removeChild(tpl);
      }
    }
  }
})
//获取url参数
const getParam=function(name){  //获取参数
    var url=window.location.search;  //获取问号之后的字0符
    var reg=new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    if(url!=null && url.toString().length>1){ 
      var r=url.substr(1).match(reg);
      if(r!=null)return unescape(r[2]); return null;
    }
}

import { queryList,User,group,getWxStr } from "./api/index"
import util from "./util/util"
import Wx from 'weixin-js-sdk'

router.beforeEach((to, from, next) => {
  let code = util.getCode('code')
  if (!code) {
    //用户授权
    // util.weixinauth()
    next()
  }else{
    var auth = localStorage.getItem('Authorization');

    console.log(to.fullPath);
    if(!auth||to.fullPath=='/home'){
      queryList({ code: code }).then(res => {
        if ( res.code == 1 ) {
          localStorage.setItem('Authorization', res.data.token);
          group({}).then( resa => {
            let arr=[];
            arr=resa.data;
            localStorage.setItem('groupList',JSON.stringify(arr));
          })
          if(res.data.isFirst==0){
            //进入打卡设置
            next()
          }else{
            User({}).then( resd => {
              localStorage.setItem('userName',resd.data.name);
            })
          }
          if(res.data.isFirst==1){
            //进入打卡
            next('nav/card')
          }
          if(res.data.isFirst==2){
            //进入打卡圈
            next('nav/friend')
          }
        }
      })
    }else{
      next()
    }
  }
})
const appid='wx393124fdad606b1d';//预发布
// const appid='wx26999a53385489f9';//生产
router.afterEach(function(to,from,next){
    let data={
      url:window.location.href
    }
    getWxStr(data).then( res => {
        Wx.config({
          debug:true,
          appId: appid, // 必填，公众号的唯一标识
          timestamp:res.data.timestamp, // 必填，生成签名的时间戳
          nonceStr: res.data.noncestr, // 必填，生成签名的随机串
          signature: res.data.signature,// 必填，签名，见附录1
          jsApiList: ['onMenuShareAppMessage','onMenuShareTimeline','onMenuShareQQ','onMenuShareQZone','scanQRCode'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        })
    })
    Wx.ready(function(){
      Wx.hideMenuItems({
        menuList: ["menuItem:share:appMessage","menuItem:share:timeline","menuItem:share:qq","menuItem:share:weiboApp","menuItem:share:QZone"] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
        // menuList:['onMenuShareAppMessage']
      });

    })
    // let config={
    //   title:'友旗有品',
    //   desc: '购物，就来友旗有品', // 分享描述
    //   imgUrl: 'https://www.youqiyp.com/mobile/static/img/logo.png', // 分享图标
    //   link:window.location.href.split('#')[0]
    // }
    // /*公共*/
    // Wx.ready(function(){
    //   Wx.onMenuShareAppMessage(config); // 分享给朋友  ,在config里面填写需要使用的JS接口列表，然后这个方法才可以用 
    //   Wx.onMenuShareTimeline(config);//朋友圈
    //   Wx.onMenuShareQQ(config);//qq
    //   Wx.onMenuShareQZone(config);//qq空间
    // })
});
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  beforeCreate(){
    if(getParam('path')){
      if(getParam('path')=='cardDetail'){
        this.$router.push({path:getParam('path'),query:{id:getParam('id'),userid:getParam('userid')}})
        document.title='商品详情';
      }
    }
  },
})
