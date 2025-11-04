<template>
	<view class="home-page">
		<!-- 自定义导航栏 -->
		<view class="header">
			<text class="close" @click="goBack">×</text>
			<text class="title">首页</text>
			<view class="empty"></view>
		</view>

		<!-- 搜索栏 -->
		<view class="search-bar">
			<view class="city-picker" @click="chooseCity">
				<text class="city-name">{{ cityName }}</text>
				<image src="/static/index/展开.png" mode="" class="zhankai"></image>
			</view>
			<input type="text" placeholder="请输入关键字" class="search-input" placeholder-style="color: #aaaaaa;"
				v-model="searchKeyword" @input="handleSearchInput" />
			<button class="search-btn" @click="search">搜索</button>
		</view>

		<!-- 搜索结果提示 -->
		<view v-if="showSearchResult" class="search-result-hint">
			<text>找到 {{ filteredTalentList.length }} 位相关达人</text>
		</view>

		<!-- 分类图标区 -->
		<view class="category-list" v-if="!showSearchResult">
			<view class="category-item" v-for="(item, index) in categories" :key="index">
				<image :src="item.icon" mode="aspectFit" class="category-icon" />
				<text class="category-name">{{ item.name }}</text>
			</view>
		</view>

		<!-- 筛选栏 -->
		<view class="filter-bar" v-if="!showSearchResult">
			<text class="filter-title">推荐达人</text>
			<text class="filter-all" @click="showFilter">全部筛选 <image src="/static/index/展开.png" class="zhankai"
					mode="aspectFit"></image></text>

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
		<view class="talent-list">
			<view v-if="showSearchResult && filteredTalentList.length === 0" class="no-result">
				<text>没有找到匹配的达人</text>
			</view>

			<!-- 达人卡片 -->
			<view class="talent-item" v-for="(item, index) in filteredTalentList" :key="index">
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

				<!-- 达人信息（性别与年龄一起显示） -->
				<view class="talent-info">
					<view class="name-container">
						<text class="talent-name">{{ item.name }}</text>
						<!-- 性别+年龄组合 -->
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
			</view>
		</view>

		<!-- 底部导航栏 -->
		<view class="tab-bar">
			<view class="tab-item active">
				<image src="/static/tabbar/陪玩-未选中.png" mode="aspectFit" class="tab-icon" />
				<text class="tab-text">陪伴</text>
			</view>
			<view class="tab-item">
				<image src="/static/tabbar/我的-未选中.png" mode="aspectFit" class="tab-icon" />
				<text class="tab-text">我的</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cityName: '杭州',
				searchKeyword: '',
				showSearchResult: false,
				categories: [{
						icon: '/static/index/美食.png',
						name: '美食'
					},
					{
						icon: '/static/index/商务.png',
						name: '商务'
					},
					{
						icon: '/static/index/运动.png',
						name: '运动'
					},
					{
						icon: '/static/index/户外.png',
						name: '户外'
					},
					{
						icon: '/static/index/娱乐.png',
						name: '娱乐'
					},
					{
						icon: '/static/index/潮玩.png',
						name: '潮玩'
					}
				],
				filterOptions: [{
						name: '年龄',
						list: ['18-25岁', '26-35岁', '36-45岁', '45岁以上'],
						selectedValue: ''
					},

					{
						name: '时间',
						list: ['全天可约', '工作日', '周末'],
						selectedValue: ''
					},
					{
						name: '职业状态',
						list: ['全职', '兼职', '自由职业'],
						selectedValue: ''
					},
					{
						name: '业务范围',
						list: ['线下陪伴', '线上聊天', '技能服务'],
						selectedValue: ''
					}
				],
				talentList: [{
						distance: '18.13km',
						avatar: 'https://ts1.tc.mm.bing.net/th/id/R-C.6d8a57256ba630185743ba8557f4ed14?rik=VldXaSQLI8%2bObA&riu=http%3a%2f%2fimage.yjcf360.com%2fu%2fcms%2fwww%2f201904%2f120850581kxr.jpg&ehk=WNEMqv9m%2f6G74rn9TCLdjOYquj4EU%2bdDYDxY6yE9Q8E%3d&risl=&pid=ImgRaw&r=0',
						status: 'available',
						statusText: '可接单',
						name: '小六',
						gender: 'female', // 女性
						age: '22岁',
						height: '168cm',
						weight: '48kg',
						zodiac: '处女座',
						tags: ['火锅', '电影', '旅游']
					},
					{
						distance: '9.1km',
						avatar: 'https://n.sinaimg.cn/sinacn10113/332/w1024h1708/20190806/73d1-iatixpm8624905.jpg',
						status: 'accepting',
						statusText: '接单中',
						name: '小呆呆',
						gender: 'female', // 女性
						age: '20岁',
						height: '175cm',
						weight: '57kg',
						zodiac: '双子座',
						tags: ['西餐', '网球', '高尔夫']
					},
					{
						distance: '广州',
						avatar: 'https://ts1.tc.mm.bing.net/th/id/R-C.edabf53e74b6934b0f0045f3fa36b0ff?rik=vMJpHl7aSzexZw&riu=http%3a%2f%2fn.sinaimg.cn%2fsinakd20210807ac%2f120%2fw1080h1440%2f20210807%2f7999-39282fb9c3136f5790ec599c7743a496.jpg&ehk=5%2b0RTyikmW9U7OyLgxyNGT%2f%2fwIkySmrC9TTXbZViYM0%3d&risl=&pid=ImgRaw&r=0',
						status: 'available',
						statusText: '可接单',
						name: '林晓月',
						gender: 'female', // 女性
						age: '26岁',
						height: '177cm',
						weight: '58kg',
						zodiac: '白羊座',
						tags: ['密室', '清吧', '猫咖']
					},
					{
						distance: '14.55km',
						avatar: 'https://ts3.tc.mm.bing.net/th/id/OIP-C.cp7dLAeUfdt4PU2kwaTxmQHaQC?rs=1&pid=ImgDetMain&o=7&rm=3',
						status: 'accepting',
						statusText: '接单中',
						name: '李四',
						gender: 'male', // 男性
						age: '24岁',
						height: '180cm',
						weight: '70kg',
						zodiac: '天秤座',
						tags: ['滑雪', '二次元', '台球']
					}
				]
			};
		},
		computed: {
			filteredTalentList() {
				let result = [...this.talentList];

				// 搜索过滤
				if (this.searchKeyword.trim()) {
					const keyword = this.searchKeyword.trim().toLowerCase();
					result = result.filter(item => {
						const nameMatch = item.name.toLowerCase().includes(keyword);
						const tagMatch = item.tags.some(tag => tag.toLowerCase().includes(keyword));
						return nameMatch || tagMatch;
					});
				}

				// 筛选条件过滤
				this.filterOptions.forEach(option => {
					if (option.selectedValue) {
						// 年龄筛选
						if (option.name === '年龄') {
							result = result.filter(item => {
								const age = parseInt(item.age);
								switch (option.selectedValue) {
									case '18-25岁':
										return age >= 18 && age <= 25;
									case '26-35岁':
										return age >= 26 && age <= 35;
									case '36-45岁':
										return age >= 36 && age <= 45;
									case '45岁以上':
										return age >= 46;
									default:
										return true;
								}
							});
						}

						// 性别筛选
						if (option.name === '性别') {
							result = result.filter(item => {
								return option.selectedValue === '男' ? item.gender === 'male' : item
									.gender === 'female';
							});
						}
					}
				});

				return result;
			}
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 1
				});
			},
			chooseCity() {
				uni.showActionSheet({
					itemList: ['杭州', '上海', '北京', '广州', '深圳'],
					success: (res) => {
						this.cityName = ['杭州', '上海', '北京', '广州', '深圳'][res.tapIndex];
					}
				});
			},
			search() {
				if (!this.searchKeyword.trim()) {
					uni.showToast({
						title: '请输入搜索关键字',
						icon: 'none'
					});
					return;
				}
				this.showSearchResult = true;
			},
			handleSearchInput() {
				this.showSearchResult = !!this.searchKeyword.trim();
			},
			showFilter() {
				uni.showToast({
					title: '全部筛选功能开发中',
					icon: 'none'
				});
			},
			showFilterOptions(index) {
				const option = this.filterOptions[index];
				uni.showActionSheet({
					itemList: option.list,
					success: (res) => {
						this.filterOptions[index].selectedValue = option.list[res.tapIndex];
						this.showSearchResult = true;
					}
				});
			},
			clearFilter(index) {
				this.filterOptions[index].selectedValue = '';
				this.showSearchResult = !!this.searchKeyword.trim() ||
					this.filterOptions.some(opt => opt.selectedValue);
			}
		}
	};
</script>

<!-- 预处理器 -->
<style lang="scss" scoped>
	/* 基础样式 */
	.home-page {
		background-color: #1e1e2e;
		min-height: 100vh;
		padding: 0 30rpx;
		box-sizing: border-box;
		color: #ffffff;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
		padding-bottom: 120rpx;

		/* 导航栏 */
		.header {
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-top: 60rpx;
			margin-bottom: 30rpx;
		}
	}


	.close {
		font-size: 50rpx;
		color: #ffffff;
		cursor: pointer;
	}

	.title {
		font-size: 36rpx;
		font-weight: 600;
	}

	.empty {
		width: 50rpx;
	}

	/* 搜索栏 */
	.search-bar {
		display: flex;
		align-items: center;
		background-color: #232130;
		border-radius: 36rpx;
		padding: 15rpx 20rpx;
		margin-bottom: 30rpx;
	}

	.city-picker {
		display: flex;
		align-items: left;
		font-size: 28rpx;
		padding-right: 20rpx;
		border-right: 1rpx solid #FEFEFE;
		cursor: pointer;
	}

	.zhankai {
		width: 15rpx;
		height: 15rpx;
		margin-top: 15rpx;
		margin-left: 10rpx;

		image {
			background-color: #999999;
		}
	}

	.arrow {
		margin-left: 8rpx;
		font-size: 22rpx;
		color: #aaaaaa;
	}

	.search-input {
		flex: 1;
		height: 50rpx;
		font-size: 28rpx;
		color: #999999;
		margin: 0 20rpx;
		background: transparent;
	}

	.search-btn {
		width: 110rpx;
		height: 50rpx;
		background-color: #764EE3;
		color: #ffffff;
		font-size: 26rpx;
		border-radius: 25rpx;
		border: none;
		line-height: 50rpx;
	}

	.search-btn::after {
		border: none;
	}

	/* 分类图标区 */
	.category-list {
		display: flex;
		justify-content: space-between;
		margin-bottom: 40rpx;
		background-color: #232130;
	}

	.category-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 16.666%;
	}

	.category-icon {
		width: 70rpx;
		height: 70rpx;
		margin-bottom: 10rpx;
	}

	.category-name {
		font-family: PingFang SC;
		font-weight: 500;
		font-size: 24rpx;
		color: #FFFFFF;
	}

	/* 筛选栏 */
	.filter-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20rpx;
	}

	.filter-title {

		font-family: PingFang SC;
		font-weight: 500;
		font-size: 31rpx;
		color: #FFFFFF;
	}

	.filter-all {
		cursor: pointer;
		font-family: PingFang SC;
		font-weight: 500;
		font-size: 24rpx;
		color: #FFFFFF;
	}

	/* 筛选选项 */
	.filter-options {
		display: flex;
		gap: 15rpx;
		flex-direction: row;
		justify-content: space-between;
		margin-bottom: 30rpx;
		flex-wrap: wrap;
	}

	.filter-option {
		background-color: #171525;

		border-radius: 28rpx;
		padding: 8rpx 20rpx;
		font-size: 24rpx;
		color: #CCCCCC;
		cursor: pointer;
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

	/* 达人列表 */
	.talent-list {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 20rpx;
	}

	.talent-item {
		width: 48%;
		background-color: #232130;
		border-radius: 20rpx;
		overflow: hidden;
		position: relative;
	}

	.talent-avatar {
		width: 100%;
		height: 300rpx;
		object-fit: cover;
	}

	/* 距离标签 */
	.distance-tag {
		position: absolute;
		top: 15rpx;
		left: 15rpx;
		background-color: #000000;
		color: #ffffff;
		font-family: PingFang SC;
		font-weight: 500;
		font-size: 20rpx;
		padding: 5rpx 10rpx;
		opacity: 0.4;
		border-radius: 20rpx;
		z-index: 10;
		display: flex;
		align-items: center;
		gap: 5rpx;
	}

	.location-icon {
		width: 20rpx;
		height: 20rpx;
	}

	/* 状态标签 */
	.status-tag {
		position: absolute;
		bottom: 180rpx;
		right: 10rpx;
		padding: 5rpx 15rpx;
		border-radius: 20rpx;
		z-index: 10;
		display: flex;
		align-items: center;
		gap: 5rpx;
		background-color: #000000;

		text {
			font-family: PingFang SC;
			font-weight: 500;
			font-size: 20rpx;
			color: #FFFFFF;
		}
	}

	/* 可接单（绿色） */
	.status-icon.available {
		background-color: #28C06F;
	}

	/* 接单中（红色） */
	.status-icon.accepting {
		background-color: #FF3333;
	}

	.status-icon {
		width: 10rpx;
		height: 10rpx;
		border-radius: 50%;
		background-color: #28C06F;
	}

	/* 达人信息区 */
	.talent-info {
		padding: 15rpx 20rpx;
		position: relative;
	}

	/* 姓名与性别年龄组合容器 */
	.name-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10rpx;
	}

	.talent-name {
		font-size: 32rpx;
		font-weight: 600;
	}

	/* 性别+年龄组合样式 */
	.gender-age-group {
		display: flex;
		align-items: center;
		gap: 8rpx;
	}

	.gender-icon {
		width: 30rpx;
		height: 30rpx;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 20rpx;
		color: white;
	}

	.gender-icon.female {
		background-color: #ff66cc;
		/* 女性粉色 */
	}

	.gender-icon.male {
		background-color: #6699ff;
		/* 男性蓝色 */
	}

	.age-text {
		font-size: 26rpx;
		color: #ffffff;
		background-color: rgba(153, 102, 255, 0.2);
		padding: 2rpx 10rpx;
		border-radius: 12rpx;
	}

	.talent-basic {
		font-size: 24rpx;
		color: #aaaaaa;
		display: block;
		margin-bottom: 10rpx;
	}

	.talent-tags {
		font-size: 24rpx;
		color: #ffffff;
		display: block;
		line-height: 1.4;
	}

	/* 客服图标 */
	.service-icon {
		position: absolute;
		right: 20rpx;
		top: 20rpx;
		width: 36rpx;
		height: 36rpx;
	}

	/* 底部导航 */
	.tab-bar {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 100rpx;
		background-color: #2a2a3c;
		display: flex;
		justify-content: space-around;
		align-items: center;
		z-index: 999;
	}

	.tab-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		cursor: pointer;
	}

	.tab-item.active .tab-text {
		color: #9966ff;
	}

	.tab-icon {
		width: 48rpx;
		height: 48rpx;
		margin-bottom: 5rpx;
	}

	.tab-text {
		font-size: 24rpx;
		color: #aaaaaa;
	}

	/* 无结果提示 */
	.no-result {
		width: 100%;
		text-align: center;
		padding: 100rpx 0;
		color: #aaaaaa;
		font-size: 32rpx;
	}

	/* 搜索结果提示 */
	.search-result-hint {
		color: #aaaaaa;
		font-size: 28rpx;
		margin-bottom: 20rpx;
		padding-left: 10rpx;
	}
</style>