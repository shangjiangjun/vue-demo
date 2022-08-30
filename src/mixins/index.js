/*
https://www.yisu.com/zixun/609763.html
使用场景：
那如果我们希望在不同vue文件的相同的生命周期中做相同的事情，
1. 如果直接在每个文件中都写相同的代码，肯定是可以实现的，
2. 但这个肯定不是最佳实践，在vue中是通过mixins实现的;使用mixins可以减少重复代码的出现,便于抽取公共函数
比如：socket
 */
export const mixins = {
  components: {

  },
  data () {

  },
  created: function () {
    console.log('mixins.created:混入对象的钩子被调用')
    //进入该生命周期执行初始化socket
    this.initWebSocket()
  },
  // computed: function () {

  // },
  destroyed() {
    //离开路由之后断开websocket连接
  },
  methods: {
    mixMethods () {
      console.log('mixins.methods.mixMethods:混入对象的方法')
    },
    initWebSocket () {
      // 初始化 websocket
    }
  }
}
