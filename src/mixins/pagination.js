/* 列表页进入详情页，返回时绑定对应页面 */
export default {
  beforeRouteEnter(to, from, next) {
    //在路由加载进入之间，如果不是从当前详情页返回进入列表页的话，则将缓存中的page和pageSize清除
    const toFullPath = to.fullPath.split('/')
      // .filter((v, i) => i < 3)
      // .join('');
    const fromFullPath = from.fullPath.split('/')
      // .filter((v, i) => i < 3)
      // .join('');
    // 列表与详情要对应
    // ['', 'articles'], ['', 'articles', 'info?...']
    if (toFullPath[1] !== fromFullPath[1]) {
      sessionStorage.page = '';
      sessionStorage.pageSize = '';
    }
    next();
  },
  watch: {
    pageData: {
      handler(value) {
        sessionStorage.page = value.page;
        sessionStorage.pageSize = value.pageSize;
      },
      deep: true,
    },
  },
  created() {
    this.pageData.page = +sessionStorage.page || 1;
    this.pageData.pageSize = +sessionStorage.pageSize || 5;
  },
};
