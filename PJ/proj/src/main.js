// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入 myaxios
import myaxios from '../src/assets/js/myaxios'
import ElementUI from 'element-ui'
import '../node_modules/element-ui/lib/theme-chalk/index.css'
import ElTreeGrid from 'element-tree-grid'
Vue.use(ElementUI)
// 使用 myaxios 插件
Vue.use(myaxios)
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
