<template>
  <div class="index">
    <h1>{{ msg }}</h1>
    <div>
      <h4>webSocket</h4>
      <button v-on:click="sendWs">发送信息</button>
    </div>
    <div>
      <h4>组件使用v-model</h4>
      <label>改变input的值触发事件</label>
      <input-case
        v-bind:value="inputValue"
        v-on:change="handleChangeValue"
        ></input-case>
    </div>
  </div>
</template>

<script>
  // 1. 引入自定义组件
  import InputCase from '@/components/common/form/InputCase.vue'

  export default {
    name: "Index",
    // 2. 引入数据
    components: {
      InputCase
    },
    data () {
      return {
        msg: 'Welcome to Your Vue',

        // 自定义组件
        inputValue: "hello"
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
      },
      // 绑定组件修改数据
      handleChangeValue(e){
        console.log(e)
      }
    }
  }
</script>

<style scoped>
</style>
