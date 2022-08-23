/**
 * async是作为一个关键词放在函数的最前面，而await是放在async函数里面的，async表示这个函数是异步的，await是等待的意思，它的后面我们一般都放返回值是一个Promise对象的函数。
 * async是一个异步函数，但是await配合async一起使用后，就相当于把异步函数变成了同步，因为await会等待他后面的表达式返回结果之后才执行下一步。
 */

import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'

Vue.use(Vuex)

// 不是在生产环境debug 为 true
// const debug = process.env.NODE_ENV !== 'production'

// 创建vuex实例对象
const store = new Vuex.Store({
  // strict: debug, // 严格模式
  state: {
    hasLogin: false,
    accessToken: '',
    expiresIn: '',
    refreshToken: '',
    userInfo: {}
  },
  // 获取器
  getters,
  // 改变器
  mutations,
  // 发送器
  actions
})

export default store
