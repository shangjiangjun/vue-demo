// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 引入全局样式
import './assets/css/style.css'

// 引入store
import store from './store'

// 消息提示
import {Alert, Loading, Confirm, Toast} from 'wc-messagebox'
import 'wc-messagebox/style.css'
Vue.use(Toast)
Vue.use(Loading)
Vue.use(Alert)
Vue.use(Confirm)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  render: (createElement) => createElement(App)
})
