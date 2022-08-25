import Vue from 'vue'
import Router from 'vue-router'

// 导入组件
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/public/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      meta: {auth: true} // 设置当前路由需要校验
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
