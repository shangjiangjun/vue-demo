<template>
  <div class="index">
    <h1>{{ msg }}</h1>
    <div class="menu">
      <h4>webSocket</h4>
      <button v-on:click="sendWs">发送信息</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Index",
    data () {
      return {
        msg: 'Welcome to Your Vue'
      }
    },
    methods: {
      sendWs () {
        if (this.$global.ws) {
          this.$global.ws.send('发送信息测试')
          this.$global.ws.onmessage = function (msgEvent) {
            console.log('接收信息', msgEvent)
          }
        }
      }
    }
  }
</script>

<style scoped>
</style>
