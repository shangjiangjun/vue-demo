import { post } from './http'

// 定义接口
const getCode = params => {
  return post('/login/get-code', params)
}

const loginForm = params => {
  return post('/login/sms-login', params)
}

export {
  getCode,
  loginForm
}
