
import Vue from 'vue'
import Router from 'vue-router'


import Home from '@/page/index'
import Card from '@/page/Card'
import friend from '@/page/friend'
import Nav from '@/page/Nav'
import Group from '@/page/group'
import Notice from '@/page/notice'
import Apply from '@/page/apply'
import Record from '@/page/record'
import Create from '@/page/create'
import groupUser from '@/page/groupUser'
import Sets from '@/page/set'
import cardDetail from '@/page/cardDetail'
import groupQrcode from '@/page/groupQrcode'
import applyEntry from '@/page/applyEntry'
import test from '@/page/test'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },{//打卡初始化
      path: '/home',
      name: 'home',
      component: Home
    },{
      path: '/nav',
      name: 'nav',
      component: Nav,
      children: [
        {//打卡圈
          path: 'friend',
          component: friend,
          meta:{
            tabNo:0
          },
          name:'friend'
        },{//打卡
          path: 'card',
          component: Card,
          meta:{
            tabNo:2
          },
          name:'card'
        },{//群组
          path: 'group',
          component: Group,
          meta:{
            tabNo:3
          }
        },{//记录
          path: 'record',
          component: Record,
          meta:{
            tabNo:1
          }
        },{//设置
          path: 'set',
          component: Sets,
          meta:{
            tabNo:4
          }
        }
      ]
    },
    {//通知
      path: '/notice',
      component: Notice
    },{//加入群组
      path: '/apply',
      component: Apply
    },{//创建群组
      path: '/create',
      component: Create
    },{//群组成员
      path:'/groupUser',
      component: groupUser,
      name:'groupUser'
    },{//打卡详情
      path:'/cardDetail',
      component: cardDetail,
      name:'cardDetail'
    },{//群组二维码
      path:'/groupQrcode',
      component: groupQrcode,
      name:'groupQrcode'
    },{//申请入群
      path:'/applyEntry',
      component: applyEntry,
      name:'applyEntry'
    },{//申请入群
      path:'/test',
      component: test,
      name:'test'
    }

  ],
})
