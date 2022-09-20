export default {
  // 获取用户信息
  getUser: state => {
    return localStorage.getItem('userInfo') || ''
  },
  // 获取用户经验信息
  getExpire: state => {
    return localStorage.getItem('experience') || JSON.stringify(state.experience)
  }
}