import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login/login'
import home from '@/components/home/home'
import '@/assets/css/index.css'
import UserList from '@/components/home/content/userlist.vue'
import RoleList from '@/components/home/content/rolelist.vue'
import LimitsList from '@/components/home/content/limitslist.vue'
import GoodList from '@/components/home/content/goodlist.vue'
import ClassParams from '@/components/home/content/classparams.vue'
import OrderList from '@/components/home/content/orderlist.vue'
import DataReport from '@/components/home/content/datareport.vue'
import GoodClass from '@/components/home/content/goodclass.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      children: [
        {
          path: '/home/userlist',
          name: 'userlist',
          component: UserList
        },
        {
          path: '/home/limitslist',
          name: 'limitslist',
          component: LimitsList
        },
        {
          path: '/home/goodlist',
          name: 'goodlist',
          component: GoodList
        },
        {
          path: '/home/classparams',
          name: 'classparams',
          component: ClassParams
        },
        {
          path: '/home/goodclass',
          name: 'goodclass',
          component: GoodClass
        },
        {
          path: '/home/orderlist',
          name: 'orderlist',
          component: OrderList
        },
        {
          path: '/home/datareport',
          name: 'datareport',
          component: DataReport
        },
        {
          path: '/home/rolelist',
          name: 'rolelist',
          component: RoleList
        }
      ]
    }
  ]
})
