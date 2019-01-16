
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

import { queryList,User,group } from "./api/index"
import util from "./util/util"
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
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
