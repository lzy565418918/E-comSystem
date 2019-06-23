// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import '../node_modules/element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
// 挂载到 vue 实例中
Vue.prototype.$http = axios
// 统一设置请求的地址(将来只要是 axios 发送的请求，都会在前面添加这个路径)
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
// 统一设置请求的头部
// axios.defaults.headers.common['Authorization'] = window.localStorage.getItem('token')
// 设置一个请求拦截器
axios.interceptors.request.use(function (config) {
  if (!config.url.includes('login')) {
    config.headers.Authorization = window.localStorage.getItem('token')
  }
  return config
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
