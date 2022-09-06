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
      path: '/',
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
        meta: {
          auth: true,
          keepAlive: true,  
          // 下拉式 1. 添加页面属性 -- 2. App.vue中设置缓存组件缓存
        }
      }, {
        path: '/articles/info',
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
  ],
  scrollBehavior(to, from, savePosition) {
    if (savePosition) {
      //解决页面从列表页跳转到详情页返回,初始在原来位置
      return savePosition;
    } else {
      //解决页面跳转后页面高度和前一个页面高度一样
      return { x: 0, y: 0 };
    }
  }
})
