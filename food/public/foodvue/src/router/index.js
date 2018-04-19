import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import home from '@/components/home'
import select from '@/components/select'
import homeupdate from '@/components/homeupdate'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      children:[
      {
        path:'select',
        component:select
      },
      {
        path:'homeupdate',
        component:homeupdate
      }
      ]
      
    }
  ]
})
