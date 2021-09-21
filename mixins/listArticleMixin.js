import { mapState } from 'vuex'
import api from '@/api/index'

export default {
  data() {
    return {
      headerSelect: [
        {
          value: 0,
          label: '默认',
        },
        {
          value: 1,
          label: '按访问量',
        },
        {
          value: 2,
          label: '按点赞数',
        },
      ],
      justOriginal: false,
      order: 0,
      articleList: [],
      columnInfo: {},
      total: 0,
      limit: process.env.NUXT_ENV_listLimit
        ? process.env.NUXT_ENV_listLimit * 1
        : 10,
      page: 1,
      dateTime: '',
      columnId: '',
      author: '',
      listLoad: false,
    }
  },
  computed: {
    ...mapState({
      userInfo: 'userInfo',
    }),
  },
  async asyncData({ app, env, route }) {
    const appData = {}
    appData.page = route.query.page * 1 || 1
    appData.justOriginal = route.query.original
      ? route.query.original === 'true'
      : false
    appData.order = route.query.order * 1 || 0
    appData.dateTime = route.query.dateTime
    appData.author = route.query.author || 'admin'
    appData.columnId = route.query.columnId
    const query = {
      limit: env.NUXT_ENV_listLimit ? env.NUXT_ENV_listLimit * 1 : 10,
      page: appData.page,
      justOriginal: appData.justOriginal,
      order: appData.order,
      dateTime: appData.dateTime,
      columnId: appData.columnId,
    }
    if (route.name === 'about') {
      query.author = appData.author
    }
    const result = await app.$axios.get(api.apiArticleList, {
      params: query,
    })
    if (result.isok) {
      let columnInfo = {}
      if (appData.columnId) {
        const res = await app.$axios.get(api.apiColumnDetail, {
          params: {
            id: appData.columnId,
          },
        })
        if (res.isok) {
          columnInfo = res.data
        }
      }
      return {
        ...appData,
        total: result.data.total,
        articleList: result.data.list,
        columnInfo,
      }
    }
  },
  methods: {
    async apiArticleListMethod() {
      this.listLoad = false
      this.articleList = []
      const query = {
        limit: this.limit,
        page: this.page,
        justOriginal: this.justOriginal,
        order: this.order,
        dateTime: this.dateTime,
        columnId: this.$route.query.columnId,
      }
      if (this.$route.name === 'about') {
        query.author = this.author
      }
      const result = await this.$axios.get(api.apiArticleList, {
        params: query,
      })
      if (result.isok) {
        this.total = result.data.total
        this.articleList = result.data.list
        this.listLoad = true
        if (this.total > 0 && !this.articleList.length && this.page > 0) {
          this.page -= 1
          this.apiArticleListMethod()
        }
      }
    },
    async deleteArticle(obj) {
      const result = await this.$axios.post(this.$api.apiDeleteArticle, {
        articleId: obj.articleId,
        userId: this.userInfo.id,
      })
      if (result.isok) {
        await this.$axios.get(this.$api.apiArticleListClear)
        this.$message({
          message: '删除成功',
          type: 'success',
          offset: 80,
        })
        this.apiArticleListMethod()
        this.$store.dispatch('aside/getAsideList')
        this.$store.dispatch('aside/getAuthorList')
      }
    },
    handleCurrentChange(val) {
      this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          page: val,
        },
      })
    },
    toJustOriginal(val) {
      this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          original: val,
          page: 1,
        },
      })
    },
    orderChange(val) {
      this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          order: val,
          page: 1,
        },
      })
    },
    async apiColumnDetailMethod() {
      const result = await this.$axios.get(api.apiColumnDetail, {
        params: {
          id: this.$route.query.columnId,
        },
      })
      if (result.isok) {
        this.columnInfo = result.data
      }
    },
  },
  watch: {
    '$route.query.page'(value) {
      this.page = value * 1 || 1
      this.apiArticleListMethod()
    },
    '$route.query.original'(value) {
      this.justOriginal = value === 'true' || false
      this.apiArticleListMethod()
    },
    '$route.query.order'(value) {
      this.order = value * 1 || 0
      this.apiArticleListMethod()
    },
    '$route.query.dateTime'(value) {
      this.dateTime = value
      this.apiArticleListMethod()
      this.columnInfo = {}
    },
    '$route.query.author'(value) {
      this.author = value
      this.apiArticleListMethod()
    },
    '$route.query.columnId'(value) {
      this.columnId = value
      this.apiArticleListMethod()
      this.apiColumnDetailMethod()
    },
  },
}
