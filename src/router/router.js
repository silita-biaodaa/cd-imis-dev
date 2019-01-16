
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
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/nav',
      name: 'nav',
      component: Nav,
      children: [
        {
          path: 'friend',
          component: friend,
          meta:{
            tabNo:0
          }
        },
        {
          path: 'card',
          component: Card,
          meta:{
            tabNo:2
          }
        },
        {
          path: 'group',
          component: Group,
          meta:{
            tabNo:3
          }
        },
        {
          path: 'record',
          component: Record,
          meta:{
            tabNo:1
          }
        },
        {
          path: 'set',
          component: Sets,
          meta:{
            tabNo:4
          }
        }
      ]
    },
    {
      path: '/notice',
      component: Notice
    },
    {
      path: '/apply',
      component: Apply
    },
    {
      path: '/create',
      component: Create
    },
    {
      path:'/groupUser',
      component: groupUser,
      name:'groupUser'
    }

  ]
})
