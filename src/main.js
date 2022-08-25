// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 引入全局样式
import './assets/css/style.css'

// 引入store
import store from './store/index.js'

// 消息提示
import {Alert, Loading, Confirm, Toast} from 'wc-messagebox'
import 'wc-messagebox/style.css'

Vue.prototype.$store = store
Vue.use(Toast)
Vue.use(Loading)
Vue.use(Alert)
Vue.use(Confirm)

router.beforeEach((to, from, next) => {
    if (to.meta.auth) {
        // 判断当前是否拥有权限
        if (localStorage.getItem('userInfo')) {
          next()
        } else {
          // 无权，跳转登录
          next({
              path: '/login'
              // 配置跳转参数，query: { redirect: from.fullPath }
          })
        }
    } else {
      // 不需要权限，直接访问
      next()
    }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  render: (createElement) => createElement(App)
})
