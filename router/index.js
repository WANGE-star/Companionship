import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('@/pages/login/login.vue')
  },
  {
    path: '/index',
    component: () => import('@/pages/index/index.vue')
  },
  {
    path: '/mine',
    component: () => import('@/pages/mine/mine.vue')
  },
  {
    path: '/food',
    component: () => import('@/pages/food/food.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router