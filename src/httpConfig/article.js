import { get } from './http'

// 文章列表
const getArticles = params => {
  return get('/articles', params)
}

const getArticleInfo = params => {
  return get('/article-info', params)
}

export {
  getArticles,
  getArticleInfo
}
