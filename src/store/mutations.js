export default {
  login (state, provider) {
    state.hasLogin = true
    state.accessToken = provider.access_token
    state.expiresIn = provider.expires_in
    // 缓存用户授权信息
    localStorage.setItem('_token', JSON.stringify(provider))
  },
  setUserInfo (state, provider) {
    state.userInfo = provider
    localStorage.setItem('userInfo', JSON.stringify(provider))
  }
}
