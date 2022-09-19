export default {
  login (state, provider) {
    state.hasLogin = true
    state.accessToken = provider.access_token
    state.expiresIn = provider.expires_in
    // 缓存用户授权信息
    localStorage.removeItem('_token')
    localStorage.setItem('_token', JSON.stringify(provider))
  },
  setUserInfo (state, provider) {
    state.userInfo = provider
    localStorage.setItem('userInfo', JSON.stringify(provider))
  },
  logout (state) {
    state.hasLogin = false
    state.accessToken = ''
    state.expiresIn = ''
    state.userInfo = {}

    state.experience = 0

    localStorage.removeItem('_token')
    localStorage.removeItem('userInfo')
    console.log('已退出')
  },
  // 记录Expire
  updateExpire(state, data) {
    state.experience = data
    localStorage.setItem('experience', data)
  }
}
