<template>
  <view class="login-page">
    <!-- 顶部导航 -->
    <common-header title="登录" :show-back="true" />

    <!-- 头像占位 -->
    <view class="avatar-placeholder"></view>

    <!-- 副标题 -->
    <text class="subtitle">陪伴</text>

    <!-- 登录按钮（uView按钮） -->
    <u-button 
      class="login-btn" 
      @click="goToHome"
      shape="circle"
      size="large"
    >
      手机号快捷登录
    </u-button>

    <!-- 协议勾选（uView复选框） -->
    <view class="agreement">
      <u-checkbox 
        v-model="checked" 
        shape="circle"
        active-color="#9966ff"
      ></u-checkbox>
      <text class="agreement-text">我已阅读并同意</text>
      <text class="agreement-link">《用户协议》</text>
      <text class="agreement-text">和</text>
      <text class="agreement-link">《隐私协议》</text>
    </view>

    <!-- 版权信息 -->
    <text class="copyright">公司名称版权所有 © 2025</text>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import CommonHeader from '@/components/CommonHeader.vue'

const router = useRouter()
const checked = ref(true)

// 跳转首页
const goToHome = () => {
  router.push('/index')
}
</script>

<style lang="scss" scoped>
@import "@/common/style/global.scss";

.login-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 30rpx;

  .avatar-placeholder {
    width: 200rpx;
    height: 200rpx;
    background-color: #333344;
    border-radius: 20rpx;
    margin: 50rpx 0 30rpx;
  }

  .subtitle {
    font-size: 36rpx;
    margin-bottom: 60rpx;
  }

  .login-btn {
    width: 100%;
    height: 90rpx;
    background: linear-gradient(90deg, #9966ff, #cc99ff);
    color: #ffffff;
    font-size: 36rpx;
    margin-bottom: 40rpx;
  }

  .agreement {
    display: flex;
    align-items: center;
    font-size: 24rpx;
    color: #aaaaaa;
    margin-bottom: 80rpx;

    .agreement-link {
      color: #ff3366;
      text-decoration: underline;
      margin: 0 5rpx;
    }
  }

  .copyright {
    font-size: 24rpx;
    color: #666666;
    position: absolute;
    bottom: 40rpx;
  }
}
</style>