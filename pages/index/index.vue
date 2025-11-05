<template>
  <view class="home-page">
    <!-- 顶部导航 -->
    <common-header title="首页" :show-back="false">
      <template #right>
        <image src="/static/index/客服.png" class="service-icon" />
      </template>
    </common-header>

    <!-- 搜索栏（uView组件） -->
    <u-search 
      v-model="searchKeyword"
      placeholder="请输入关键字"
      bg-color="#232130"
      input-align="left"
      placeholder-style="color: #aaaaaa"
      @input="handleSearchInput"
      @confirm="search"
    >
      <template #left>
        <view class="city-picker" @click="chooseCity">
          <text class="city-name">{{ cityName }}</text>
          <image src="/static/index/展开.png" mode="" class="zhankai"></image>
        </view>
      </template>
    </u-search>

    <!-- 搜索结果提示 -->
    <view v-if="showSearchResult" class="search-result-hint">
      找到 {{ filteredTalentList.length }} 位相关达人
    </view>

    <!-- 分类图标区（uView网格组件） -->
    <u-grid 
      v-if="!showSearchResult" 
      :column="6" 
      border="false"
      bg-color="transparent"
      padding="0"
    >
      <u-grid-item 
        v-for="(item, index) in categories" 
        :key="index"
        @click="handleCategoryClick(item)"
      >
        <image :src="item.icon" mode="aspectFit" class="category-icon" />
        <text class="category-name">{{ item.name }}</text>
      </u-grid-item>
    </u-grid>

    <!-- 筛选栏 -->
    <view class="filter-bar" v-if="!showSearchResult">
      <text class="filter-title">推荐达人</text>
      <text class="filter-all" @click="showFilter">
        全部筛选 
        <image src="/static/index/展开.png" class="zhankai" mode="aspectFit"></image>
      </text>
    </view>

    <!-- 筛选选项 -->
    <view class="filter-options" v-if="!showSearchResult">
      <view class="filter-option" v-for="(option, index) in filterOptions" :key="index"
        @click="showFilterOptions(index)">
        <text>
          {{ option.selectedValue || option.name }}
          <image src="/static/index/展开.png" class="zhankai"></image>
        </text>
        <text class="clear-filter" v-if="option.selectedValue" @click.stop="clearFilter(index)">
          ×
        </text>
      </view>
    </view>

    <!-- 达人列表 -->
    <u-list>
      <u-list-item 
        v-for="(item, index) in filteredTalentList" 
        :key="index"
        class="talent-item"
        border="false"
      >
        <!-- 距离标签 -->
        <view class="distance-tag">
          <image src="/static/index/定位.png" class="location-icon" />
          <text>{{ item.distance }}</text>
        </view>

        <!-- 头像 -->
        <image :src="item.avatar" mode="aspectFill" class="talent-avatar" />

        <!-- 状态标签 -->
        <view class="status-tag" :class="item.status">
          <view class="status-icon available" v-if="item.status === 'available'"></view>
          <view class="status-icon accepting" v-if="item.status === 'accepting'"></view>
          <text>{{ item.statusText }}</text>
        </view>

        <!-- 达人信息 -->
        <view class="talent-info">
          <view class="name-container">
            <text class="talent-name">{{ item.name }}</text>
            <view class="gender-age-group">
              <view class="gender-icon" :class="item.gender">
                {{ item.gender === 'female' ? '♀' : '♂' }}
              </view>
              <text class="age-text">{{ item.age }}</text>
            </view>
          </view>

          <text class="talent-basic">{{ item.height }} · {{ item.weight }} · {{ item.zodiac }}</text>
          <text class="talent-tags">{{ item.tags.join(' | ') }}</text>

          <!-- 客服图标 -->
          <image src="/static/index/客服.png" class="service-icon" />
        </view>
      </u-list-item>
    </u-list>

    <!-- 无结果提示 -->
    <view v-if="showSearchResult && filteredTalentList.length === 0" class="no-result">
      <text>没有找到匹配的达人</text>
    </view>

    <!-- 底部导航 -->
    <common-tab-bar />
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import CommonHeader from '@/components/CommonHeader.vue'
import CommonTabBar from '@/components/CommonTabBar.vue'

// 状态管理
const cityName = ref('杭州')
const searchKeyword = ref('')
const showSearchResult = ref(false)
const router = useRouter()

// 分类数据
const categories = ref([
  { icon: '/static/index/美食.png', name: '美食' },
  { icon: '/static/index/商务.png', name: '商务' },
  { icon: '/static/index/运动.png', name: '运动' },
  { icon: '/static/index/户外.png', name: '户外' },
  { icon: '/static/index/娱乐.png', name: '娱乐' },
  { icon: '/static/index/潮玩.png', name: '潮玩' }
])

// 筛选选项
const filterOptions = ref([
  { name: '年龄', list: ['18-25岁', '26-35岁', '36-45岁', '45岁以上'], selectedValue: '' },
  { name: '时间', list: ['全天可约', '工作日', '周末'], selectedValue: '' },
  { name: '职业状态', list: ['全职', '兼职', '自由职业'], selectedValue: '' },
  { name: '业务范围', list: ['线下陪伴', '线上聊天', '技能服务'], selectedValue: '' }
])

// 达人列表数据
const talentList = ref([
  {
    distance: '18.13km',
    avatar: 'https://ts1.tc.mm.bing.net/th/id/R-C.6d8a57256ba630185743ba8557f4ed14?rik=VldXaSQLI8%2bObA&riu=http%3a%2f%2fimage.yjcf360.com%2fu%2fcms%2fwww%2f201904%2f120850581kxr.jpg&ehk=WNEMqv9m%2f6G74rn9TCLdjOYquj4EU%2bdDYDxY6yE9Q8E%3d&risl=&pid=ImgRaw&r=0',
    status: 'available',
    statusText: '可接单',
    name: '小六',
    gender: 'female',
    age: '22岁',
    height: '168cm',
    weight: '48kg',
    zodiac: '处女座',
    tags: ['火锅', '电影', '旅游']
  },
  // ...其他达人数据
])

// 计算属性：筛选达人列表
const filteredTalentList = computed(() => {
  let result = [...talentList.value]

  // 搜索过滤
  if (searchKeyword.value.trim()) {
    const keyword = searchKeyword.value.trim().toLowerCase()
    result = result.filter(item => 
      item.name.toLowerCase().includes(keyword) || 
      item.tags.some(tag => tag.toLowerCase().includes(keyword))
    )
  }

  // 筛选条件过滤
  filterOptions.value.forEach(option => {
    if (option.selectedValue && option.name === '年龄') {
      result = result.filter(item => {
        const age = parseInt(item.age)
        switch (option.selectedValue) {
          case '18-25岁': return age >= 18 && age <= 25
          case '26-35岁': return age >= 26 && age <= 35
          case '36-45岁': return age >= 36 && age <= 45
          case '45岁以上': return age >= 46
          default: return true
        }
      })
    }
  })

  return result
})

// 方法
const chooseCity = () => {
  uni.showActionSheet({
    itemList: ['杭州', '上海', '北京', '广州', '深圳'],
    success: (res) => {
      cityName.value = ['杭州', '上海', '北京', '广州', '深圳'][res.tapIndex]
    }
  })
}

const search = () => {
  if (!searchKeyword.value.trim()) {
    uni.showToast({ title: '请输入搜索关键字', icon: 'none' })
    return
  }
  showSearchResult.value = true
}

const handleSearchInput = () => {
  showSearchResult.value = !!searchKeyword.value.trim()
}

const showFilter = () => {
  uni.showToast({ title: '全部筛选功能开发中', icon: 'none' })
}

const showFilterOptions = (index) => {
  const option = filterOptions.value[index]
  uni.showActionSheet({
    itemList: option.list,
    success: (res) => {
      filterOptions.value[index].selectedValue = option.list[res.tapIndex]
      showSearchResult.value = true
    }
  })
}

const clearFilter = (index) => {
  filterOptions.value[index].selectedValue = ''
  showSearchResult.value = !!searchKeyword.value.trim() ||
    filterOptions.value.some(opt => opt.selectedValue)
}

const handleCategoryClick = (item) => {
  // 分类点击逻辑（如跳转到对应分类页面）
  router.push(`/food?category=${item.name}`)
}
</script>

<style lang="scss" scoped>
@import "@/common/style/global.scss";

.home-page {
  min-height: 100vh;
  padding: 0 30rpx;
  padding-bottom: 120rpx;

  // 搜索栏左侧城市选择
  .city-picker {
    display: flex;
    align-items: center;
    font-size: 28rpx;
    padding-right: 20rpx;
    border-right: 1rpx solid #FEFEFE;
  }

  .zhankai {
    width: 15rpx;
    height: 15rpx;
    margin-left: 10rpx;
  }

  // 分类图标
  .category-icon {
    width: 70rpx;
    height: 70rpx;
    margin-bottom: 10rpx;
  }

  .category-name {
    font-size: 24rpx;
    color: #FFFFFF;
  }

  // 筛选栏样式
  .filter-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20rpx 0;

    .filter-title {
      font-size: 31rpx;
      font-weight: 500;
    }

    .filter-all {
      display: flex;
      align-items: center;
      font-size: 24rpx;
      color: #CCCCCC;
    }
  }

  // 筛选选项
  .filter-options {
    display: flex;
    gap: 15rpx;
    flex-wrap: wrap;
    margin-bottom: 30rpx;

    .filter-option {
      background-color: #171525;
      border-radius: 28rpx;
      padding: 8rpx 20rpx;
      font-size: 24rpx;
      color: #CCCCCC;
      display: inline-flex;
      align-items: center;
      gap: 8rpx;
    }

    .clear-filter {
      width: 24rpx;
      height: 24rpx;
      background-color: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 20rpx;
      line-height: 1;
    }
  }

  // 达人列表样式
  .talent-item {
    width: 48%;
    background-color: #232130;
    border-radius: 20rpx;
    overflow: hidden;
    position: relative;
    margin-bottom: 20rpx;

    .talent-avatar {
      width: 100%;
      height: 300rpx;
      object-fit: cover;
    }

    .distance-tag {
      position: absolute;
      top: 15rpx;
      left: 15rpx;
      background-color: rgba(0,0,0,0.4);
      color: #fff;
      font-size: 20rpx;
      padding: 5rpx 10rpx;
      border-radius: 20rpx;
      display: flex;
      align-items: center;
      gap: 5rpx;

      .location-icon {
        width: 20rpx;
        height: 20rpx;
      }
    }

    // 其他样式保持原有结构，适配scss语法
  }
}
</style>