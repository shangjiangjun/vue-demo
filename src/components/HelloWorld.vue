<template>
  <div class="hello">
    <div class="user-setting">
      <span v-on:click="getUserInfo">用户信息</span>
      <span v-on:click="logout">退出</span>
    </div>
    <h1>{{ msg }}</h1>
    <h2> <router-link to="/articles">文章中心</router-link></h2>
    <div class="menu">
      <h4>el-menu</h4>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      userInfo: [],
      items: [{
        name: '首页',
        id: 1
      }, {
        name: '文章列表',
        id:2
      }]
    }
  },
  methods: {
    getUserInfo () {
      let userInfo = localStorage.getItem('userInfo') || ''
      if (userInfo) {
        console.log(userInfo)
        this.userInfo = JSON.parse(userInfo)
        console.log(this.userInfo)
      } else {
        this.$toast('未获得用户')
      }
    },
    logout () {
      this.$store.commit('logout')
      this.$router.replace({path: '/login'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.user-setting {position: fixed;top: 10px;right: 10px;}
.user-setting span {cursor: pointer;}
</style>
