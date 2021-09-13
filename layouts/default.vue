<template>
  <div>
    <el-container>
      <el-header v-if="layoutShow" class="header-box">
        <page-header></page-header>
      </el-header>
      <el-main>
        <el-container>
          <el-aside width="268px">
            <page-aside></page-aside>
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
import PageHeader from '@/components/PageHeader.vue'
import PageFooter from '@/components/PageFooter.vue'
import PageAside from '@/components/PageAside.vue'

export default {
  name: 'DefaultLayouts',
  components: {
    PageHeader,
    PageFooter,
    PageAside,
  },
  data() {
    return {
      layoutShow: true,
    }
  },
}
</script>

<style lang="scss" scoped>
.header-box {
  position: sticky;
  left: 0;
  top: 0;
  z-index: 100;
  background: #fff;
}
</style>
