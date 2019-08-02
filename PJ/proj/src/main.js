// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入 myaxios
import myaxios from '../src/assets/js/myaxios'
// 引入element-ui
import ElementUI from 'element-ui'
// 引入时间格式
import Moment from 'moment'
// 引入echart
import '../node_modules/element-ui/lib/theme-chalk/index.css'
import ElTreeGrid from 'element-tree-grid'
// 引入富文本
import VueQuillEditor from 'vue-quill-editor'
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 使用饿了么
Vue.use(ElementUI)
// 使用时间插件
Vue.use(Moment)
// 使用富文本编辑器
Vue.use(VueQuillEditor)
// 将时间格式插件放在全局过滤器中
Vue.filter('dateformat', function (value, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return Moment(value).format(pattern)
})
// 使用 myaxios 插件
Vue.use(myaxios)
// 使用组件
Vue.component(ElTreeGrid.name, ElTreeGrid)
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
