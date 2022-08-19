/**
 * ajax 请求配置
 */
import axios from 'axios'
import router from '../router'
import store from '../store'

// elementUi消息提示组件
import { Message } from 'element-ui'
// ivewUi框架的loadingBar组件，浏览器顶部加载动画
import { LoadingBar } from 'iview'

// 声明一个数组用于存储每个请求的取消函数和axios标识
let pending = []
const CancelToken = axios.CancelToken
let removePending = (config) => {
  for (let p in pending) {
    if (pending[p].u === config.url + JSON.stringify(config.data) + '&' + config.method) {
      pending[p].f()
      pending.splice(p, 1)
    }
  }
}

// axios 默认配置
axios.defaults.timeout = 10000
axios.defaults.headers['Content-Type'] = 'application/json; charset=UTF-8'
// 环境的参数
console.log(process.env.NODE_ENV, process.env.ENV_CONFIG, '环境参数')
// 根据不同环境配置不同的请求地址
if (process.env.NODE_ENV === 'development') {
  console.log(router, store, 'http.js 中路由器信息')
  axios.defaults.baseURL = 'http://chat.impro.com/api'
} else if (process.env.NODE_ENV === 'production') {
  // 正式服路由
  axios.defaults.baseURL = 'http://chat.impro.com/api'
}

/* // 整理数据
axios.defaults.transformRequest = function (data) {
  data = JSON.stringify(data)
  return data
} */
// 请求拦截器
axios.interceptors.request.use(config => {
  // 取消请求
  removePending(config)
  config.cancelToken = new CancelToken((c) => {
    // 这里的axios标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
    pending.push({ u: config.url + JSON.stringify(config.data) + '&' + config.method, f: c })
  })
  // 配置request请求头header中的Authorization，如果登陆了就有Authorization就设置一下
  if (store.state.userInfo && store.state.userInfo.Authorization) {
    const token = 'Bearer ' + store.state.userInfo.Authorization
    token && (config.headers.Authorization = token)
  }
  return config
}, error => {
  Message.error({
    message: '请求接口出错',
    duration: 3000
  })
  return Promise.reject(error)
})

// 响应拦截器
axios.interceptors.response.use(response => {
  // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
  removePending(response.config)
  if (response.status === 200) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(response)
  }
}, error => {
  if (error.response.status) {
    switch (error.response.code) {
      case 10400:
        Message.error({
          message: '参数错误！' + error.response.data.message,
          duration: 2000
        })
        break
      case 10401:
        Message.error({
          message: '授权错误！' + error.response.data.message,
          duration: 2000
        })
        // 清除token
        localStorage.removeItem('token')
        // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
        localStorage.clear()
        store.dispatch('loginOut')
        break
      default: {
        Message.error({
          message: error.response.data.message,
          duration: 2000
        })
      }
    }
    return Promise.reject(error.response)
  }
})

export function get (url, params, config) {
  // 如果是form/data 提交信息
  if (config) {
    axios.config.headers['Content-Type'] = 'multipart/form-data'
  }
  LoadingBar.start()
  return new Promise(async (resolve, reject) => {
    axios.get(url, {params: params}).then(res => {
      resolve(res.data)
      LoadingBar.finish()
    }).catch(err => {
      reject(err.data)
      LoadingBar.error()
    })
  })
}

export function post (url, params, config) {
  // 如果请求头需要特殊设置
  if (config) {
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
  }
  LoadingBar.start()
  return new Promise((resolve, reject) => {
    axios.post(url, params).then(res => {
      resolve(res.data)
      LoadingBar.finish()
    }).catch(err => {
      console.log(err)
      reject(err.data)
      LoadingBar.error()
    })
  })
}

export function put (url, params) {
  LoadingBar.start()
  console.log(window.location.hash)
  return new Promise((resolve, reject) => {
    axios.put(
      url,
      params
    ).then(res => {
      resolve(res.data)
      LoadingBar.finish()
    }).catch(err => {
      reject(err.data)
      LoadingBar.error()
    })
  })
}
