<template>
  <div class="article">
    <h3>文章列表</h3>
    <div id="articles">
      <div class="article-lists" v-for="(item, index) in lists" :key="index">
        ## {{ index + 1}}：
        【{{ item.category }}】
        <span style="text-decoration: underline;">{{ item.title }}</span>
        {{ item.is_hot==1 ? '热门' : '' }}
        <router-link class="red" :to="{path: '/article-info', query: {id: item.id, pid: index}}" >[编辑]</router-link>
      </div>
      <!-- 3. 使用自定义组件 -->
      <case title="组件自定义"></case>

      <list-table v-bind:items="items"></list-table>
    </div>
  </div>
</template>

<script>
  // 1. 导入组件
  import Case from '@/components/common/Case.vue'
  import ListTable from '@/components/common/table/ListTable.vue'

  import { getArticles } from '@/httpConfig/article.js'
  export default {
    name: 'ArticleIndex',
    components: {
      // 2. 注册局部组件
      Case,
      ListTable
    },
    data () {
      return {
        style: 'margin-top: 20px;',
        lists: {},
        items: [{
          id: 1, title: '标题1'
        }, {
          id: 2, title: '标题2'
        }],
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
