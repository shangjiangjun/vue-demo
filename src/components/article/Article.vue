<template>
  <div class="article">
    <h3>文章列表</h3>
    <div id="articles">
      <div class="article-lists" v-for="(item, index) in lists" :key="index">
        ## {{ index + 1}} ：
        【{{ item.category }}】
        <span style="text-decoration: underline;">{{ item.title }}</span>
        {{ item.is_hot==1 ? '热门' : '' }}
        <router-link class="red" :to="{path: '/article-info', query: {id: item.id, pid: index}}" >[编辑]</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import { getArticles } from '@/httpConfig/article.js'
  export default {
    name: 'ArticleIndex',
    data () {
      return {
        lists: {},
        pageIndex: 1,
        limit: 10,
        pages: 0,
        total: 0
      }
    },
    beforeCreate () {
      // this.setTime('beforeCreate')
    },
    created () {
      this.setTime('created')
      this.setArticles()
    },
    beforeMount () {
      this.setTime('beforeMount')
    },
    mounted () {
      this.setTime('mounted')
    },
    beforeUpdate () {
      this.setTime('beforeUpdate')
    },
    updated () {
      this.setTime('updated')
    },
    beforeDestroy () {
      this.setTime('beforeDestroy')
    },
    destroyed () {
      this.setTime('destroyed')
    },
    methods: {
      setTime (str) {
        var myDate = new Date()//时间实例
        var H = myDate.getHours() //获取小时
        var M = myDate.getMinutes() //获取分钟
        var S = myDate.getSeconds()//获取秒
        var MS = myDate.getMilliseconds()//获取毫秒
        var milliSeconds = H * 3600 * 1000 + M * 60 * 1000 + S * 1000 + MS
        // console.log(str + '当前时间的毫秒数为：' + milliSeconds)
      },
      setArticles () {
        getArticles().then(res => {
          if (res.status) {
            this.lists = res.data.lists
          }
        })
      }
    }
  }
</script>

<style scoped>
  .red {color: var(--AidColor2);}
  .article-lists {text-align: left;padding: 10px;}
  .article-title-box {width: 150px;border-right: 1px solid var(--TextColor3);}
  .article-title {display: block;margin-bottom: 10px;}
  .article-cont {width: 600px;background: var(--TextColor2);}
</style>
