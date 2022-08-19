<template>
  <div class="container">
    <div>
      <label>手机号码</label>
      <input type="text" v-model="login.mobile" maxlength="11" placeholder="请输入手机号码" />
    </div>
    <div>
      <label>短信验证</label>
      <input type="password" v-model="login.password" maxlength="6" placeholder="请输入短信验证" />
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
        password: '',
        verification_key: '',
        verification_code: ''
      },
      submitStatus: false
    }
  },
  methods: {
    sendCode () {
      if (this.login.mobile.length < 11) {
        this.$toast('手机号码不能为空')
        return
      }
      this.submitStatus = true
      getCode({mobile: this.login.mobile}).then(res => {
        this.submitStatus = false
        if (res.status) {
          this.login.verification_key = res.data.key
        } else {
          this.$toast(res.message)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    submitLogin () {
      if (this.login.mobile.length < 11) {
        this.$toast('手机号码不能为空')
        return
      }
      if (this.login.password.length < 6) {
        this.$toast('短信验证码不能为空')
        return
      }
      this.submitStatus = true
      loginForm(this.login).then(res => {
        this.submitStatus = false
        if (res.status) {
          console.log(res)
        } else {
          this.$toast(res.message)
        }
      })
      // this.$router.replace({path: '/index'})
    }
  }
}
</script>

<style>
  .container {
    padding: 20px;
    text-align: left;
    position: relative;
  }
  .container div {
    margin-bottom: 10px;
  }
</style>
