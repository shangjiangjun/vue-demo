<template>
  <div class="article">
    <h3>文章列表</h3>
    <div id="articles">
      <div class="article-lists" v-for="(item, index) in lists" :key="index">
        {{ item.id }}：【{{ item.category }}】
        <span>
          <router-link :to="{path: '/articles/info', query: {id: item.id, pid: index}}" >{{ item.title }}</router-link>
        </span>
        <span class="under-line"> {{ item.is_hot==1 ? '热门' : '' }} </span>
        <span class="under-line"> {{ item.is_recommend==1 ? '推荐' : '' }} </span>
      </div>
      <div class="page">
        <pagination
          :page="pageData.page"
          :page-size="pageData.pageSize"
          :total="total"
          :on-page-change="onPage"
          :showSizes="true"
          :pageSizeList="pageData.pageSizeList"
          :on-page-size-change="onSize"
          class="pagi page-content"
        />
      </div>
      <!-- 3. 使用自定义组件 -->
      <!-- 父级通知子级
       v-on:子级使用参数="父级调用方法"
       子级：$emit('子级使用参数')
       -->
      <!-- <base-counter title="点我" :count="testCallChild" v-on:discount="methodsname"></base-counter>

      <case title="组件自定义"></case>
      <div :style="{ fontSize: postFontSize + 'em' }">
        <list-table v-bind:thead="thead" v-bind:items="lists" v-on:enlarge-text="enlangeText"></list-table>
      </div> -->

    </div>
  </div>
</template>

<script>
  // 1. 导入组件
  import BaseCounter from '@/components/common/form/BaseCounter.vue'
  import Case from '@/components/common/Case.vue'
  import ListTable from '@/components/common/table/ListTable.vue'
  import Pagination from '@/components/common/page/Pagination.vue'

  // mix:1. 引入mixins
  import paginationMix from '@/mixins/pagination'

  import { getArticles } from '@/httpConfig/article.js'
  export default {
    name: 'ArticleIndex',
    components: {
      // 2. 注册局部组件
      BaseCounter,
      Case,
      ListTable,
      Pagination
    },
    mixins: [paginationMix],
    data () {
      return {
        style: 'margin-top: 20px;',
        lists: {},
        thead: ['id', '类型', '标题', '标签', '热门', '操作'],
        pageData: {
          pageTotal: 0, // 总条数
          page: 1,
          pageSize: 5,
          pageSizeList: [5, 15, 30],
        },
        // pageIndex: 1,
        // limit: 1,
        // pages: 0,
        // articleNum: 0,
        // pageSizeList: [1, 10, 20, 30],

        // 父级组件调用子级函数
        testCallChild: 1,
        postFontSize: 1 // 字体大小
      }
    },
    created () {
      this.setArticles()
    },
    computed: {
      total () {
        return this.pageData.pageTotal || 0
      }
    },
    methods: {
      setArticles () {
        getArticles({page: this.pageData.page, limit: this.pageData.pageSize}).then(res => {
          if (res.status) {
            this.lists = res.data.lists
            this.pageData.pageTotal = res.data.total
          }
        }).catch(err=>{
          // console.log('123141', err)
        });
      },
      methodsname (eventValue) {
        this.testCallChild += eventValue
      },
      enlangeText () {
        this.postFontSize += 0.1
      },

      /* 调用分页组件 */
      onPage (pageNow) {
        if (this.pageData.page == pageNow) return
        this.pageData.page = pageNow
        this.setArticles()
      },
      onSize (e) {
        this.pageData.pageSize = e
        this.setArticles()
      }
      /* 调用分页组件 END */
    }
  }
</script>

<style scoped>
  a, a:link {text-decoration: none !important;color: #333333;}
  .red {color: var(--AidColor2);}
  .article-lists {text-align: left;padding: 10px;}
  .article-title-box {width: 150px;border-right: 1px solid var(--TextColor3);}
  .article-title {display: block;margin-bottom: 10px;}
  .article-cont {width: 600px;background: var(--TextColor2);}
</style>
