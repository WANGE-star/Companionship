<template>
  <view class="login-page">
    <!-- 自定义导航栏 -->
    <view class="header">
      <text class="close" @click="goBack">×</text>
      <text class="title">登录</text>
      <view class="empty"></view>  <!-- 占位，使标题居中 -->
    </view>

    <!-- 头像占位 -->
    <view class="avatar-placeholder"></view>

    <!-- 副标题 -->
    <text class="subtitle">陪伴</text>

    <!-- 登录按钮 -->
    <button class="login-btn" @click="goToHome">手机号快捷登录</button>

    <!-- 协议勾选 -->
    <view class="agreement">
      <checkbox :checked="true" disabled class="agreement-checkbox" />
      <text class="agreement-text">我已阅读并同意</text>
      <text class="agreement-link">《用户协议》</text>
      <text class="agreement-text">和</text>
      <text class="agreement-link">《隐私协议》</text>
    </view>

    <!-- 版权信息 -->
    <text class="copyright">公司名称版权所有 © 2025</text>
  </view>
</template>

<script>
export default {
  methods: {
    // 返回上一页（若没有上一页则退出）
    goBack() {
      uni.navigateBack({
        delta: 1,
        fail: () => {
          uni.exitMiniProgram(); // 小程序端退出，App 端可改为关闭页面
        }
      });
    },
    // 跳转至首页
    goToHome() {
      uni.navigateTo({
        url: "/pages/index/index"
      });
    }
  }
};
</script>

<style scoped>
/* 登录页整体样式 */
.login-page {
  background-color: #1e1e2e;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 30rpx;
  box-sizing: border-box;
}

/* 导航栏 */
.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 40rpx;
  margin-bottom: 80rpx;
}
.close {
  font-size: 60rpx;
  color: #ffffff;
  cursor: pointer;
}
.title {
  font-size: 48rpx;
  color: #ffffff;
  font-weight: 600;
}
.empty {
  width: 60rpx; /* 与关闭按钮等宽，保证标题居中 */
}

/* 头像占位 */
.avatar-placeholder {
  width: 200rpx;
  height: 200rpx;
  background-color: #333344;
  border-radius: 20rpx;
  margin-bottom: 30rpx;
}

/* 副标题 */
.subtitle {
  font-size: 36rpx;
  color: #ffffff;
  margin-bottom: 60rpx;
}

/* 登录按钮 */
.login-btn {
  width: 100%;
  height: 90rpx;
  background: linear-gradient(90deg, #9966ff, #cc99ff);
  color: #ffffff;
  font-size: 36rpx;
  border-radius: 45rpx;
  margin-bottom: 40rpx;
  border: none;
}
.login-btn::after {
  border: none; /* 清除默认边框 */
}

/* 协议区域 */
.agreement {
  display: flex;
  align-items: center;
  font-size: 24rpx;
  color: #aaaaaa;
  margin-bottom: 80rpx;
}
.agreement-checkbox {
  transform: scale(0.8);
  margin-right: 10rpx;
}
.agreement-link {
  color: #ff3366;
  text-decoration: underline;
  margin: 0 5rpx;
}

/* 版权信息 */
.copyright {
  font-size: 24rpx;
  color: #666666;
  position: absolute;
  bottom: 40rpx;
}
</style>