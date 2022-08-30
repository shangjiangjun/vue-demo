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
    <div class="example">
      <button v-on:click="greet">Greet</button>
    </div>
    <div id="example-2">
      <p>显示隐藏动画效果</p>
      <button v-on:click="show = !show">Toggle show</button>
      <transition name="bounce">
        <p v-if="show">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Mauris facilisis enim libero, at lacinia diam fermentum id. Pellentesque habitant morbi tristique senectus et netus.</p>
      </transition>
    </div>
    <div class="mixins">
      <!-- <button v-on:click="mixMethods">使用混入的方法</button> -->
      <button v-on:click="useMixMethods">使用混入的方法</button>
    </div>
  </div>
</template>

<script>
  // 1. 引入自定义组件
  import InputCase from '@/components/common/form/InputCase.vue'

  // 混入1. 引入混入文件
  import {mixins} from '@/mixins/index.js'

  export default {
    name: "Index",
    // 2. 引入数据
    components: {
      InputCase
    },
    // 混入2. 引入数据
    mixins: [mixins],
    data () {
      return {
        msg: 'Welcome to Your Vue',

        // 自定义组件
        inputValue: "hello",

        // 动画过渡
        show: true
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
      handleChangeValue (e){
        console.log(e)
      },
      greet (event) {
        console.log(event.target.tagName)
      },
      useMixMethods () {
        // 使用方式2
        this.mixMethods()
      }
    }
  }
</script>

<style scoped>
   /* bounce 为transition 标签的name */
  .bounce-enter-active {
    animation: bounce-in .5s;
  }
  .bounce-leave-active {
    animation: bounce-in .5s reverse;
  }
  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
