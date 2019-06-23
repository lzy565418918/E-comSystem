// 创建一个 axios 的插件
// 引入 axios
import axios from 'axios'
// 创建插件对象
var myaxios = {}
// 添加插件方法
myaxios.install = function (Vue) {
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
  // 添加实例方法
  Vue.prototype.$http = axios
}
// 暴露
export default myaxios
