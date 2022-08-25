import { get, post } from './http'

// 定义接口
const getCode = params => {
  return post('/login/get-code', params)
}

const loginForm = params => {
  return post('/login/sms-login', params)
}

// 退出登录
const logout = params => {
  return get('/logout', params)
}

export {
  getCode,
  loginForm,
  logout
}
