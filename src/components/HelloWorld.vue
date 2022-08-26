<template>
  <div class="hello">
    <div class="user-setting">
      <span>{{ userInfo.name }}</span> |
      <span v-on:click="logout">退出</span>
    </div>
    <div id="menuBox">
      <div class="menu-box">
        <span>
          <router-link to="/index">首页</router-link>
        </span>
        <span>
          <router-link to="/articles">文章中心</router-link>
        </span>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      userInfo: {
        name: '未登录'
      }
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    getUserInfo () {
      let userInfo = localStorage.getItem('userInfo') || ''
      if (userInfo) {
        this.userInfo = JSON.parse(userInfo)
      } else {
        this.logout()
      }
    },
    logout () {
      this.$store.commit('logout')
      this.$router.replace({path: '/login'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only 添加“scoped”属性以将CSS仅限于此组件 -->
<style scoped>
.user-setting {position: fixed;top: 10px;right: 10px;}
.user-setting span {cursor: pointer;}
</style>
