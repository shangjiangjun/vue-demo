<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2 v-on:click="getUserInfo">Essential Links</h2>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      userInfo: []
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
</style>
