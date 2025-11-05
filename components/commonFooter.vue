<template>
  <u-tabbar 
    :value="active" 
    @change="handleChange"
    bg-color="#2a2a3c"
    active-color="#9966ff"
    inactive-color="#aaaaaa"
    height="100rpx"
  >
    <u-tabbar-item 
      v-for="(item, index) in tabList" 
      :key="index"
      :text="item.text"
      :icon="item.iconPath"
      :selected-icon="item.selectedIconPath"
    ></u-tabbar-item>
  </u-tabbar>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

// 底部导航数据
const tabList = [
  {
    text: '首页',
    iconPath: '/static/tabbar/陪玩-未选中.png',
    selectedIconPath: '/static/tabbar/陪玩-选中.png',
    path: '/index'
  },
  {
    text: '我的',
    iconPath: '/static/tabbar/我的-未选中.png',
    selectedIconPath: '/static/tabbar/我的-选中.png',
    path: '/mine'
  }
]

// 当前激活项
const active = ref(0)

// 初始化激活项
onMounted(() => {
  const currentPath = route.path
  const index = tabList.findIndex(item => item.path === currentPath)
  if (index !== -1) active.value = index
})

// 切换导航
const handleChange = (index) => {
  router.push(tabList[index].path)
}
</script>