<template>
  <div class="index">
    <h1>{{ msg }}</h1>
    <div class="menu">
      <h4>el-menu</h4>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Index",
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
    }
  }
</script>

<style scoped>
</style>
