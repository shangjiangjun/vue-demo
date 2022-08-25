import Vue from 'vue'
import Router from 'vue-router'

// 导入组件
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/public/Login'
import ArticleIndex from '@/components/article/Article'
import ArticleInfo from '@/components/article/Info'

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
    },
    {
      path: '/articles',
      name: 'ArticleIndex',
      component: ArticleIndex,
      meta: {auth: true}
    },
    {
      path: '/article-info',
      name: 'ArticleInfo',
      component: ArticleInfo,
      meta: {auth: true}
    }
  ]
})
