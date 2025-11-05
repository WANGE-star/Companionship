<template>
  <u-navbar 
    :title="title" 
    :left-arrow="showBack" 
    @left-click="handleBack"
    bg-color="#1e1e2e"
    title-color="#ffffff"
    border-bottom="false"
  >
    <template #right>
      <slot name="right"></slot> <!-- 右侧自定义内容 -->
    </template>
  </u-navbar>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

// 接收props
const props = defineProps({
  title: { type: String, default: '首页' },
  showBack: { type: Boolean, default: true }
})

// 返回逻辑
const handleBack = () => {
  router.back()
}
</script>

<style scoped lang="scss">
// 可自定义导航栏额外样式
::v-deep .u-navbar {
  height: 100rpx;
}
</style>