const apiBaseUrl = '/api/vue-blog'

export default {
  // header
  search: `${apiBaseUrl}/search`,

  // aside
  getAside: `${apiBaseUrl}/aside`,
  getAsideAuthor: `${apiBaseUrl}/aside/author`,

  // article
  apiArticleList: `${apiBaseUrl}/articleList`,
  apiDeleteArticle: `${apiBaseUrl}/article/delete`,
  apiArticleListClear: `${apiBaseUrl}/articleList/clear`,

  // column
  apiColumnDetail: `${apiBaseUrl}/column/detail`,

  // detail
  apiArticleDetail: `${apiBaseUrl}/article/detail`,
  apiAddStart: `${apiBaseUrl}/addStar`,

  apiAddView: `${apiBaseUrl}/views/add`,
}
