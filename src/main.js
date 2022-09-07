// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 引入全局样式
import './assets/css/style.css'

// 引入store
import store from './store/index.js'

// 引入globalws
import global from './httpConfig/globalws.js'

// 消息提示
import {Alert, Loading, Confirm, Toast} from 'wc-messagebox'
import 'wc-messagebox/style.css'

// 懒加载
import VueLazyload from "vue-lazyload";
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'https://pic4.zhimg.com/80/v2-c44b47def59851a440531b4f659487b7_720w.jpg',
  loading: 'http://i.chanpin100.com/149312736316425206',
  attempt: 1
});

Vue.prototype.$store = store
Vue.prototype.$global = global
Vue.use(Toast)
Vue.use(Loading)
Vue.use(Alert)
Vue.use(Confirm)

// 静态资源
Vue.prototype.$resourceUrl = 'http://cdn.qychujiu.cn/'

router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
      // 判断当前是否拥有权限
      if (localStorage.getItem('userInfo')) {
        next()
      } else {
        // 无权，跳转登录
        next({
            path: '/login',
            query: { redirect: to.fullPath }
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
