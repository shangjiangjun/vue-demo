<template>
  <div class="article">
    <h3>文章列表</h3>
    <div id="articles">
      <div class="article-lists" v-for="(item, index) in lists" :key="index">
        {{ item.id }}：【{{ item.category }}】
        <span>
          <router-link :to="{path: '/articles/info', query: {id: item.id, pid: index}}">{{ item.title }}</router-link>
        </span>
        <span class="under-line"> {{ item.is_hot==1 ? '热门' : '' }} </span>
        <span class="under-line"> {{ item.is_recommend==1 ? '推荐' : '' }} </span>
      </div>
    </div>
    <div class="load-more mr-bottom" v-if="pageData.page < totalPages" @click='loadMore'>点击加载更多</div>
    <div class="load-more mr-bottom" v-else>没有更多了</div>
  </div>
</template>

<script>
  import {
    getArticles
  } from '@/httpConfig/article.js'
  export default {
    name: 'ArticleIndex',
    data() {
      return {
        lists: [],
        pageData: {
          page: 1,
          limit: 5
        },
        listsNum: 0, // 总条数
        totalPages: 0
      }
    },
    created() {
      this.setArticles()
    },
    methods: {
      setArticles() {
        getArticles(this.pageData).then(res => {
          if (res.status) {
            this.lists = this.lists.concat(res.data.lists)
            this.totalPages = res.data.pages
            this.listsNum = res.data.total
          }
        }).catch(err => {});
      },
      loadMore() {
        this.pageData.page += 1
        this.setArticles()
      }
    }
  }
</script>

<style scoped>
  a, a:link {
    text-decoration: none !important;
    color: #333333;
  }

  .red {
    color: var(--AidColor2);
  }

  .article-lists {
    text-align: left;
    padding: 10px;
    margin: 100px 0;
  }

  .article-title-box {
    width: 150px;
    border-right: 1px solid var(--TextColor3);
  }

  .article-title {
    display: block;
    margin-bottom: 10px;
  }

  .article-cont {
    width: 600px;
    background: var(--TextColor2);
  }
</style>
