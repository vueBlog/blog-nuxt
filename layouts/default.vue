<template>
  <div>
    <el-container>
      <el-header v-if="layoutShow" class="header-box">
        <page-header></page-header>
      </el-header>
      <el-main>
        <el-container>
          <el-aside width="268px">
            <!-- <aside-card></aside-card> -->
            <template v-if="!asideList.length && asideListLoading">
              <aside-card-skeleton
                v-for="i in 3"
                :key="i"
              ></aside-card-skeleton>
            </template>
            <template v-if="!asideList.length && !asideListLoading">
              <div class="no-data">暂无数据</div>
            </template>
            <template v-else>
              <aside-card
                v-for="item in asideList"
                :key="item.type"
                :card-type="item.type"
                :title="item.title"
                :info="item.info"
              ></aside-card>
            </template>
          </el-aside>
          <el-main style="padding: 0">
            <Nuxt />
          </el-main>
        </el-container>
      </el-main>
      <el-footer v-if="layoutShow" height="120px">
        <page-footer></page-footer>
      </el-footer>
    </el-container>
    <el-backtop></el-backtop>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import PageHeader from '@/components/PageHeader.vue'
import PageFooter from '@/components/PageFooter.vue'
import AsideCardSkeleton from '@/components/AsideCardSkeleton.vue'
import AsideCard from '@/components/AsideCard.vue'

export default {
  name: 'DefaultLayouts',
  components: {
    PageHeader,
    PageFooter,
    AsideCardSkeleton,
    AsideCard,
  },
  data() {
    return {
      layoutShow: true,
    }
  },
  computed: {
    ...mapState('aside', ['asideList', 'asideListLoading', 'asideAuthor']),
  },
  created() {
    this.$store.dispatch('aside/getAsideList')
    this.$store.dispatch('aside/getAuthorList')
  },
}
</script>

<style lang="scss" scoped>
.header-box {
  position: sticky;
  left: 0;
  top: 0;
  z-index: 100;
  padding: 0;
  background: #fff;
}
</style>
