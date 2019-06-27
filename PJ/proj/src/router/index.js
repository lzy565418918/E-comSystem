import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login/login'
import home from '@/components/home/home'
import '@/assets/css/index.css'
import Users from '@/components/home/content/userlist/userlist.vue'
import RoleList from '@/components/home/content/rolelist/rolelist.vue'
import LimitsList from '@/components/home/content/limitslist/limitslist.vue'
import GoodList from '@/components/home/content/goodlist/goodlist.vue'
import ClassParams from '@/components/home/content/classparams/classparams.vue'
import OrderList from '@/components/home/content/orderlist/orderlist.vue'
import DataReport from '@/components/home/content/datareport/datareport.vue'
import GoodClass from '@/components/home/content/goodclass/goodclass.vue'
// 添加商品分类
import AddGoods from '@/components/home/content/goodlist/addgoods/addgoods.vue'
import {
  Message
} from 'element-ui'
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
      path: '/users',
      name: 'users',
      component: Users
    },
    {
      path: '/rights',
      name: 'rights',
      component: LimitsList
    },
    {
      path: '/goods',
      name: 'goods',
      component: GoodList
    },
    {
      path: '/params',
      name: 'params',
      component: ClassParams
    },
    {
      path: '/categories',
      name: 'categories',
      component: GoodClass
    },
    {
      path: '/addgoods',
      name: 'addgoods',
      component: AddGoods
    },
    {
      path: '/orders',
      name: 'orders',
      component: OrderList
    },
    {
      path: '/reports',
      name: 'reports',
      component: DataReport
    },
    {
      path: '/roles',
      name: 'roles',
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
      Message.warning('请先登录')
    } else {
      // 存在就继续
      next()
    }
  }
})
export default router
