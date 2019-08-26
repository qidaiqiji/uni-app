<template>
	<view class="findContainer">
		<view class="find_wrap" v-if="access_token">
			<view class="choseTab">
				<view class="ul findChooseTab">
					<view v-for="(item, index) in tabs" class="li" :key="index" :class="{ tabActive: index == isActive }" @tap="tabProduct(index)">{{ item.foundName }}</view>
				</view>
			</view>
		</view>

		<view class="blank"></view>
		<view class="refresh" v-if="noUpdate">暂无更新，看看别的内容吧</view>
		<contentList :list="list" :isActive="isActive" @update="updatePop"></contentList>
		<!-- <view v-if="showLoading" class="loading">加载中</view> -->
		<!-- 加载更多 -->
		<view class="loadingText" v-if="showLoading"><image class="image" src="../../static/images/loading/loading.gif" mode=""></image></view>
	</view>
</template>

<script>
import contentList from '@/components/find/active';
import { userValidateLogin2 } from '@/common/auth.js';

export default {
	components: {
		contentList
	},
	data() {
		return {
			showCate: '1',
			isActive: 0,
			tabs: [],
			list: [],
			pages: 0,
			totalCount: 0,
			showLoading: false,
			noUpdate: false,
			access_token: '',

			// 是否显示弹出层情况下运行上下拉进行加载列表
			deepAction: false
		};
	},
	async onLoad() {
		let that = this;
		uni.showNavigationBarLoading();
		userValidateLogin2(async () => {
			that.access_token = uni.getStorageSync('access_token') || '';
			that.getRecord();
			that.tabs = await that.getTabList();
			that.list = await that.getContentList(that.tabs[0]);
		});
	},
	onShow() {
		this.$api.getTabbarCart();
	},
	async onReachBottom() {
		if (!this.deepAction) {
			if ((!(this.list.length > this.totalCount) || this.isActive == 0) && this.list.length) {
				this.showLoading = true;
				this.list = await this.getContentList(this.tabs[this.isActive]);
			}
			this.showLoading = false;
		}
	},
	async onPullDownRefresh() {
		if (!this.deepAction) {
			let articleId = this.list[0].articleId;
			this.pages = 0;
			this.list = [];
			let list = await this.getContentList(this.tabs[this.isActive]);
			if (list[0] && list[0].articleId == articleId) {
				this.noUpdate = true;
			}
			this.list = list;
			uni.stopPullDownRefresh();
			setTimeout(() => {
				this.noUpdate = false;
			}, 2000);
		} else {
			uni.stopPullDownRefresh();
		}
	},
	methods: {
		async tabProduct(index) {
			let item = this.tabs[index];
			this.showCate = index;
			this.isActive = index;
			this.pages = 0;
			this.list = [];
			this.list = await this.getContentList(item);
		},
		async getTabList() {
			// let getUrl = encodeURIComponent(`${this.$api.foundGetCategory}`);
			try {
				let res = await this.$api.request({
					method: 'GET',
					access_token: this.access_token,
					url: this.$api.foundGetCategory
				});
				let barlist = [
					{
						foundId: 'ALL',
						foundName: '全部'
					},
					...res.data.foundCategories
				];
				return barlist;
			} catch (e) {}
		},
		async getContentList(item) {
			this.pages++;
			let pageSize = 5;
			let getUrl =
				item.foundId === 'ALL'
					? `${this.$api.foundGetAll}?page=${this.pages}&pageSize=${pageSize}`
					: `${this.$api.foundGetByIndex}?page=${this.pages}&pageSize=${pageSize}&foundId=${item.foundId}`;
			try {
				let res = await this.$api.request({ url: getUrl, loading: true });

				if (res && res.data) {
					this.totalCount = res.data.totalCount;
				}
				return [...this.list, ...res.data.foundList];
			} catch (e) {}
		},
		async getRecord() {
			let res = await this.$api.request({
				url: this.$api.foundGetRecord
			});
			uni.hideTabBarRedDot({index:2});
		},
		updatePop(val) {
			this.deepAction = val;
		}
	}
};
</script>

<style lang="less">
@import url('less/find.less');
</style>
