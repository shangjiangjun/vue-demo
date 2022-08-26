<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      ws: null
    }
  },
  created () {
    this.initWs()
  },
  methods: {
    initWs () {
      this.ws = null
      // 初始化链接
      this.ws = new WebSocket('ws://8.136.204.214:9502')
      this.$global.setWs(this.ws)
      // 建立链接
      this.ws.onopen = function () {
        console.log('链接成功')
      }
      // 接受信息
      this.ws.onmessage = function (mesEvent) {
        console.log('接收的信息', mesEvent)
      }
      // 通信报错
      this.ws.onerror = function (error) {
        console.log('通信错误', error)
      }
      // 关闭链接
      this.ws.onclose = function () {
        console.log('链接关闭')
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding: 10px;
}
</style>
