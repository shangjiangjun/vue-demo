import Vue from 'vue'
import Router from 'vue-router'

// 导入组件
import HelloWorld from '@/components/HelloWorld'
import Index from '@/components/index/Index'
import Login from '@/components/public/Login'
import ArticleIndex from '@/components/article/Article'
import ArticleInfo from '@/components/article/Info'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld,
      meta: {auth: true}, // 设置当前路由需要校验
      children: [{
        path: '/index',
        name: 'Index',
        component: Index,
        meta: {auth: true}
      }, {
        path: '/articles',
        name: 'ArticleIndex',
        component: ArticleIndex,
        meta: {auth: true}
      }, {
        path: '/article-info',
        name: 'ArticleInfo',
        component: ArticleInfo,
        meta: {auth: true}
      }]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
