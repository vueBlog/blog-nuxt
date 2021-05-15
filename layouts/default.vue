<template>
  <div>
    <el-container>
      <el-header v-if="layoutShow" class="header-box">
        <!-- <page-header></page-header> -->
      </el-header>
      <el-main>
        <Nuxt />
      </el-main>
      <el-footer v-if="layoutShow" height="120px">
        <!-- <page-footer></page-footer> -->
      </el-footer>
    </el-container>
    <el-backtop></el-backtop>
  </div>
</template>

<script>
export default {
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
  padding: 0;
  background: #fff;
}
</style>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
</style>
