<template>
  <div class="article">
    <h3>文章列表</h3>
    <div id="articles">
      <div class="article-lists" v-for="(item, index) in lists" :key="index">
        <div class="article-thumb" v-on:click="navToArticleInfo(item.id)">
          <img v-if="item.image" v-lazy="'http://cdn.qychujiu.cn/' + item.image">
          <img v-else v-lazy="'//assets/logo.png'">
        </div>
        <div class="article-title" v-on:click="navToArticleInfo(item.id)">
          {{ item.id }}：【{{ item.category }}】
          <span>
            {{ item.title }}
            <!-- <router-link :to="{path: '/articles/info', query: {id: item.id, pid: index}}">{{ item.title }}</router-link> -->
          </span>
          <span class="under-line"> {{ item.is_hot==1 ? '热门' : '' }} </span>
          <span class="under-line"> {{ item.is_recommend==1 ? '推荐' : '' }} </span>
        </div>
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
          limit: 10
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
      },
      navToArticleInfo (id) {
        this.$router.push({path: '/articles/info', query: {id: id}})
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
  }

  .article-thumb {
    width: 100%;
    height: 120px;
    border: 1px solid var(--TextColor3);
    border-radius: 5px;
  }

  .article-thumb img {
    width: 100%;
    height: 100%;
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
