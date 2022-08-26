<template>
  <div class="article-info">
    <h3>{{ info.title }}</h3>
    <div v-on:click="navToBack">返回列表</div>
    <!-- 富文本 -->
    <div v-html="info.content"></div>
  </div>
</template>

<script>
  import { getArticleInfo } from '@/httpConfig/article.js'
  export default {
    name: 'ArticleInfo',
    data () {
      return {
        pid: 0,
        id: 0,
        info: {
          title: '文章详情',
          content: ''
        }
      }
    },
    created () {
      let _this = this
      _this.id = _this.$route.query.id
      if (_this.id) {
        _this.setArticle()
      } else {
        _this.$toast('未知参数')
        setTimeout(function () {
          /*
          go(-1): 原页面表单中的内容会丢失：
           1. this.$router.go(-1)：后退+刷新；
           2. this.$router.go(0)：刷新；
           3. this.$router.go(1)：前进；
          back(): 原页表表单中的内容会保留；
           1. this.$router.back()：后退 ；
           2. this.$router.back(0)：刷新；
           3. this.$router.back(1)：前进；
          */
          _this.$router.back()
        }, 2000)
      }
    },
    methods: {
      setArticle () {
        getArticleInfo({id: this.id}).then(res => {
          if (res.status) {
            this.info = res.data
          } else {
            this.$toast(res.message)
          }
        })
      },
      navToBack() {
        this.$router.back()
      }
    }
  }
</script>

<style>
</style>
