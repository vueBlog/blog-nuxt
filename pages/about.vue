<template>
  <div class="content">
    <template v-if="currentAuthor && currentAuthor.authorIntroduce">
      <div class="row">作者简介： {{ currentAuthor.authorIntroduce }}</div>
      <div style="border-top: 1px solid #e6e6e6"></div>
    </template>
    <div class="content-header clearfix">
      <el-checkbox v-model="justOriginal" @change="toJustOriginal"
        >仅看原创</el-checkbox
      >
      <div class="content-header_select fr">
        <span>文章排序：</span>
        <el-select v-model="order" placeholder="请选择" @change="orderChange">
          <el-option
            v-for="item in headerSelect"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="content-list">
      <template v-if="!articleList.length && !listLoad">
        <list-article-skeleton v-for="i in 5" :key="i"></list-article-skeleton>
      </template>
      <template v-else-if="!articleList.length && listLoad">
        <div class="no-data">暂无数据</div>
      </template>
      <template v-else>
        <list-article
          v-for="item in articleList"
          :key="item.articleId"
          :info="item"
          @deleteArticle="deleteArticle"
        ></list-article>
      </template>
    </div>
    <div v-if="total" class="content-footer">
      <el-pagination
        background
        hide-on-single-page
        layout="prev, pager, next"
        :total="total"
        :page-size="limit"
        :current-page="page"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import listArticleMixin from '@/mixins/listArticleMixin.js'

export default {
  name: 'About',
  mixins: [listArticleMixin],
  data() {
    return {}
  },
  computed: {
    ...mapState('aside', ['asideAuthor']),
    activeName() {
      return this.$route.query.author * 1 || this.firstAuthor
    },
    currentAuthor() {
      return this.asideAuthor.find((item) => {
        return item.authorId === this.activeName
      })
    },
  },
  mounted() {},
}
</script>

<style lang="scss" scoped>
@import '@/style/views/home.scss';
.row {
  margin: 15px 20px;
}
</style>
