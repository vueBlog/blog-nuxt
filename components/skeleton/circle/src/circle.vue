<template>
  <div
    class="circle"
    :style="{ margin, flex, width: diameter, height: diameter, opacity }"
  ></div>
</template>

<script>
export default {
  name: 'SkeletonCircle',
  props: {
    margin: {
      type: String,
      default: '',
    },
    flex: {
      type: String,
      default: '',
    },
    diameter: {
      type: String,
      default: '',
    }, // 直径,
    opacity: {
      type: String,
      default: '1',
    },
  },
}
</script>

<style lang="scss" scoped>
.circle {
  flex: 0 0 auto;
  background-color: #efefef;
  border-radius: 50%;
}
</style>
