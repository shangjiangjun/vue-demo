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
      <!-- 父级通知子级
       v-on:子级使用参数="父级调用方法"
       子级：$emit('子级使用参数')
       -->
      <base-counter title="点我" :count="testCallChild" v-on:discount="methodsname"></base-counter>

      <case title="组件自定义"></case>
      <div :style="{ fontSize: postFontSize + 'em' }">
        <list-table v-bind:thead="thead" v-bind:items="lists" v-on:enlarge-text="enlangeText"></list-table>
      </div>

    </div>
  </div>
</template>

<script>
  // 1. 导入组件
  import BaseCounter from '@/components/common/form/BaseCounter.vue'
  import Case from '@/components/common/Case.vue'
  import ListTable from '@/components/common/table/ListTable.vue'

  import { getArticles } from '@/httpConfig/article.js'
  export default {
    name: 'ArticleIndex',
    components: {
      // 2. 注册局部组件
      BaseCounter,
      Case,
      ListTable
    },
    data () {
      return {
        style: 'margin-top: 20px;',
        lists: {},
        thead: ['id', '类型', '标题', '标签', '热门', '操作'],
        pageIndex: 1,
        limit: 10,
        pages: 0,
        total: 0,

        // 父级组件调用子级函数
        testCallChild: 1,
        postFontSize: 1 // 字体大小
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
      },
      methodsname (eventValue) {
        this.testCallChild += eventValue
      },
      enlangeText () {
        this.postFontSize += 0.1
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
