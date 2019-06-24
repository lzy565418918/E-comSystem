import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login/login'
import home from '@/components/home/home'
import '@/assets/css/index.css'
import UserList from '@/components/home/content/userlist/userlist.vue'
import RoleList from '@/components/home/content/rolelist/rolelist.vue'
import LimitsList from '@/components/home/content/limitslist/limitslist.vue'
import GoodList from '@/components/home/content/goodlist/goodlist.vue'
import ClassParams from '@/components/home/content/classparams/classparams.vue'
import OrderList from '@/components/home/content/orderlist/orderlist.vue'
import DataReport from '@/components/home/content/datareport/datareport.vue'
import GoodClass from '@/components/home/content/goodclass/goodclass.vue'
Vue.use(Router)

const router = new Router({
  routes: [{
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
    children: [{
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

router.beforeEach((to, from, next) => {
  // to and from are Route Object,next() must be called to resolve the hook
  // console.log(to)
  // console.log(from)
  if (to.name === 'login') {
    next()
  } else {
    // 定义一个变量token来保存验证登陆信息
    let token = window.localStorage.getItem('token')
    // 判断，如果token不存在则跳转到登录页面
    if (!token) {
      router.push('/login')
    } else {
      // 存在就继续
      next()
    }
  }
})
export default router
