<template>
  <div>
    <template v-if="!isAbout">
      <template v-if="!asideList.length && asideListLoading">
        <aside-card-skeleton v-for="i in 3" :key="i"></aside-card-skeleton>
      </template>
      <template v-if="!asideList.length && !asideListLoading">
        <div class="no-data">暂无数据</div>
      </template>
      <template v-else>
        <aside-card
          v-for="item in asideListShow"
          :key="item.type"
          :card-type="item.type"
          :title="item.title"
          :info="item.info"
        ></aside-card>
      </template>
    </template>
    <template v-else>
      <template v-if="!asideAuthor.length && asideAuthorLoading">
        <aside-author-skeleton v-for="i in 1" :key="i"></aside-author-skeleton>
      </template>
      <template v-if="!asideAuthor.length && !asideAuthorLoading">
        <div class="no-data">暂无数据</div>
      </template>
      <el-collapse
        v-else
        :value="activeName"
        accordion
        @change="collapseChange"
      >
        <el-collapse-item
          v-for="(author, index) in asideAuthor"
          :key="index"
          :name="author.authorId"
        >
          <template slot="title">
            <el-avatar
              class="author-img"
              size="small"
              :src="getAuthorImg(author)"
            ></el-avatar>
            <span class="author-name ellipsis">{{ author.authorName }}</span>
          </template>
          <aside-author :info="author"></aside-author>
          <aside-card
            v-if="author.asideArticle"
            :card-type="author.asideArticle.type"
            :title="author.asideArticle.title"
            :info="author.asideArticle.info"
          ></aside-card>
        </el-collapse-item>
      </el-collapse>
    </template>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import AsideCardSkeleton from '@/components/AsideCardSkeleton.vue'
import AsideCard from '@/components/AsideCard.vue'
import AsideAuthorSkeleton from '@/components/AsideAuthorSkeleton.vue'
import AsideAuthor from '@/components/AsideAuthor.vue'

export default {
  name: 'PageAside',
  components: {
    AsideCardSkeleton,
    AsideCard,
    AsideAuthorSkeleton,
    AsideAuthor,
  },
  computed: {
    ...mapState('aside', [
      'asideList',
      'asideListLoading',
      'asideAuthor',
      'asideAuthorLoading',
    ]),
    ...mapGetters({
      firstAuthor: 'aside/getFirstAuthor',
    }),
    isList() {
      return this.$route.name.toLowerCase() === 'list'
    },
    asideListShow() {
      return this.isList
        ? this.asideList.filter((item) => [2, 4].includes(item.type))
        : this.asideList
    },
    isAbout() {
      return this.$route.name.toLowerCase() === 'about'
    },
    activeName() {
      return this.$route.query.author * 1 || this.firstAuthor
    },
    currentAuthor() {
      return this.asideAuthor.find((item) => {
        return item.authorId === this.activeName
      })
    },
  },
  watch: {
    $route: {
      handler(val) {
        if (val.name.toLowerCase() === 'about') {
          !this.asideAuthor.length &&
            this.$store.dispatch('aside/getAuthorList')
        } else {
          !this.asideList.length && this.$store.dispatch('aside/getAsideList')
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    collapseChange(value) {
      this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          author: value,
        },
      })
    },
    getAuthorImg(author) {
      return author.authorHeadimg
        ? author.authorHeadimg
        : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    },
  },
}
</script>

<style lang="scss">
.author-name {
  margin-left: 15px;
}
</style>
