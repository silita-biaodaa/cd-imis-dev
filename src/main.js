
import Vue from 'vue'
import App from './App'
import router from './router/router'
import axios from './axios/index'
Vue.prototype.$axios = axios

import './assets/js/flexible_css.js'
import './assets/js/makegrid.js'

import Vant, { Stepper } from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)
Vue.use(Stepper)
import clocklist from '@/components/clockList'
import popup from '@/components/popup'
import head from '@/components/headgoto'
import toast from '@/components/toast'
import audioPlay from '@/components/audioPlay'
import { XButton , Group } from 'vux'
//InlineCalendar, XInput, Datetime, XTextarea, , AlertPlugin,
// Vue.component('inline-calendar', InlineCalendar)
// Vue.component('x-input', XInput)
// Vue.component('datetime', Datetime)
// Vue.component('x-textarea', XTextarea)
//全局组件
Vue.component('x-button', XButton)
Vue.component('group', Group)
Vue.component('v-clock', clocklist)
Vue.component('v-popup', popup)
Vue.component('v-head', head)
Vue.component('v-toast', toast)
Vue.component('v-audio', audioPlay)
// Vue.use(AlertPlugin)

//load层
var tpl=null;
Vue.prototype.loading =() => {
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


function setHtmlFontSize(){
    const htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
    const htmlDom = document.getElementsByTagName('html')[0];
    htmlDom.style.fontSize = htmlWidth / 10 + 'px';
    let u = navigator.userAgent;
    let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if(isiOS){
      let beforeMeta=document.querySelector('meta[name="viewport"]');
      // 
      if(beforeMeta.content.indexOf('0.5')!=-1){
        htmlDom.style.fontSize = htmlWidth / 20 + 'px';
      }else if(beforeMeta.content.indexOf('0.3')!=-1){
        htmlDom.style.fontSize = htmlWidth / 30 + 'px';
      }else{
        htmlDom.style.fontSize = htmlWidth / 10 + 'px';
      }
      var oMeta = document.createElement('meta');
        oMeta.content = 'initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no';
        oMeta.name = 'viewport';
        document.getElementsByTagName('head')[0].appendChild(oMeta);
    }
};
setHtmlFontSize();
//
const onBridgeReady=function(){  
    WeixinJSBridge.call('hideOptionMenu');  
}

const offBridgeReady=function(){  
  WeixinJSBridge.call('showOptionMenu');
}

import { queryList,User,group,getWxStr,groupsDetail } from "./api/index"
import util from "./util/util"
import Wx from 'weixin-js-sdk'
import { NumberKeyboard } from 'vant';

router.beforeEach((to, from, next) => {
  let code = util.getCode('code');
  let isApply=getParam('istrue');
  let isShare=getParam('isShare');
  alert('code',code);
  if (!code) {
    //用户授权
    // util.weixinauth()
    next()
  }else{
    debugger;
    var auth = localStorage.getItem('Authorization');
    let data={
      code:code,
      isApply:isApply,
      isShare:isShare
    }
    if(!auth||to.fullPath=='/home'){
      queryList(data).then(res => {
        if ( res.code == 1 ) {
          localStorage.setItem('Authorization', res.data.token);
          if(res.data.token&&res.data.token!='undefined'){
            group({}).then( resa => {
              let arr=[];
              arr=resa.data;
              localStorage.setItem('groupList',JSON.stringify(arr));
            })
            User({}).then( res => {
              localStorage.setItem('userid',res.data.userId);
              localStorage.setItem('userName',res.data.name);
            })
          }
          if(res.data.isFirst==1){
            //进入打卡
            next({
              name:'card',
              replace:true
            })
          }else if(res.data.isFirst==2){
            //进入打卡圈
            next({
              name:'friend',
              replace:true
            })
          }else if(res.data.isFirst==4){//如果为申请入群页面
            let paths=getParam('path');
            if(paths=='applyEntry'){
              groupsDetail(getParam('id')).then(resData =>{
                // localStorage.removeItem('isConcern');
                // alert(JSON.stringify(resData.data));
                localStorage.setItem('isConcern',JSON.stringify(resData.data))
                next({
                  name:'applyEntry',
                  replace:true,
                  query:{
                    id:getParam('id')
                  }
                })
              })
            }else{
              next({
                name:paths,
                replace:true
              })
            }
          }else if(res.data.isFirst==5){
            next({
              name:'close',
              replace:true
            })
          }else{//初始化
            next()
          }

        }
      })
    }else{
      next()
    }
  }
})
// 
const appid='wx393124fdad606b1d';//预发布
// const appid='wx26999a53385489f9';//生产
Vue.prototype.appid=appid;
router.afterEach(function(to,from,next){
    let data={
      'url':encodeURIComponent(location.href.split('#')[0])
    }
    getWxStr(data).then( res => {
        Wx.config({
          // debug:true,
          appId: appid, // 必填，公众号的唯一标识
          timestamp:res.data.timestamp, // 必填，生成签名的时间戳
          nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
          signature: res.data.signature,// 必填，签名，见附录1
          jsApiList: ['onMenuShareAppMessage','onMenuShareTimeline','onMenuShareQQ','onMenuShareQZone','startRecord','stopRecord','onVoiceRecordEnd','playVoice','pauseVoice','stopVoice','onVoicePlayEnd','uploadVoice'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        })
    })
    if (typeof WeixinJSBridge == "undefined"){
        if( document.addEventListener ){  
            document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);  
        }else if (document.attachEvent){  
            document.attachEvent('WeixinJSBridgeReady', onBridgeReady);   
            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);  
        }
    }else{  
        onBridgeReady();  
    }
    

});
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  mounted(){
    if(getParam('path')){
      if(getParam('path')=='cardDetail'){
        this.$router.replace({path:getParam('path'),query:{id:getParam('id'),userid:getParam('userid')}})
      }else if(getParam('path')=='groupQrcode'){
        this.$router.replace({path:getParam('path'),query:{id:getParam('id')}})
      }
      // else if(getParam('path')=='applyEntry'){
      //   this.$router.replace({path:getParam('path'),query:{id:getParam('id')}})
      // }
    }
  },
})
