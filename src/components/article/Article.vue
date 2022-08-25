<template>
  <div class="article">
    <h3>文章列表</h3>
    <div id="articles">
      <div class="article-lists" v-for="(item, index) in lists" :key="index">
        ## {{ index + 1}} ：
        【{{ item.category }}】
        <span style="text-decoration: underline;">{{ item.title }}</span>
        {{ item.is_hot==1 ? '热门' : '' }}
        <button class="red" v-on:click="navToArticleInfo(item.id)">[编辑]</button>
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
    created () {
      this.setArticles()
    },
    methods: {
      setArticles () {
        getArticles().then(res => {
          if (res.status) {
            this.lists = res.data.lists
          }
        })
      },
      navToArticleInfo (id) {
        this.$router.push({path: '/article-info', query: {id: id}})
      }
    }
  }
</script>

<style>
  .red {color: var(--AidColor2);}
  .article-lists {text-align: left;padding: 10px;}
</style>
