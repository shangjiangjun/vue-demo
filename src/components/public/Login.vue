<template>
  <div class="container">
    <div>
      <label>手机号码</label>
      <input type="text" v-model="login.mobile" maxlength="11" placeholder="请输入手机号码" />
    </div>
    <div>
      <label>短信验证</label>
      <input type="text" v-model="login.verification_code" maxlength="6" placeholder="请输入验证码" style="width: 80px;"/>
      <button class="" v-on:click="sendCode">获取验证码</button>
    </div>
    <div>
      <button v-on:click="submitLogin">登录</button>
    </div>
  </div>
</template>

<script>
import { getCode, loginForm } from '@/httpConfig/login.js'
export default {
  name: 'Login',
  data () {
    return {
      login: {
        mobile: '',
        password: '123123',
        verification_key: '',
        verification_code: ''
      },
      submitStatus: false,
      redirect: null
    }
  },
  created () {
    this.redirect = this.getUrlKey()
  },
  methods: {
    getUrlKey () {
      // 获取url参数
      return this.$route.query.redirect
    },
    sendCode () {
      if (this.submitStatus) return
      if (this.login.mobile.length < 11) {
        this.$toast('手机号码不能为空')
        return
      }
      this.submitStatus = true
      this.$loading.show('数据请求中...') // loading
      getCode({mobile: this.login.mobile}).then(res => {
        this.submitStatus = false
        this.$loading.hide()
        if (res.status) {
          this.$toast('验证码已发送')
          this.login.verification_key = res.data.key
        } else {
          this.$toast(res.message)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    submitLogin () {
      if (this.submitStatus) return
      if (this.login.mobile.length < 11) {
        this.$toast('手机号码不能为空')
        return
      }
      if (this.login.verification_code.length < 4) {
        this.$toast('短信验证码不能为空')
        return
      }
      this.submitStatus = true
      this.$loading.show('加载中...') // loading
      loginForm(this.login).then(res => {
        this.submitStatus = false
        this.$loading.hide()
        if (res.status) {
          let _token = {
            access_token: res.data.access_token,
            expires_in: res.data.expires_in
          }
          this.$store.commit('login', _token)
          this.$store.commit('setUserInfo', res.data.user_info)
          if (this.redirect && this.redirect != '/') {
            this.$router.replace({path: this.redirect})
          } else {
            this.$router.replace({path: '/index'})
          }
        } else {
          this.$toast(res.message)
        }
      })
      // this.$router.replace({path: '/index'})
    }
  }
}
</script>

<style scoped>
  .container {
    padding: 20px;
    text-align: left;
    position: relative;
  }
  .container div {
    margin-bottom: 10px;
  }
</style>
