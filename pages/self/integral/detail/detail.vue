<template>
	<view class="jfdetail-page">
		<view class="container" :style="{ minHeight: minHeight }">
			<view class="jfdetail-header"><myTabbar :modelData="modelData" :initIndex="0" :jfdetail="jfdetail" @change="getTabbar" /></view>

			<view class="jfdetail-content">
				<view class="item" v-for="(item, index) in integralList" :key="index">
					<text class="title">积分来源：{{ item.msg }}</text>
					<text class="info" v-if="item.orderAmount && item.orderAmount !== '--'">
						<text class="li">订单总额：￥{{ item.orderAmount }}</text>
						<!-- <text class="li">订单编号：587492616100</text> -->
					</text>
					<text class="timer">{{ item.time }}</text>
					<text class="score">{{ item.integral > 0 ? '+' + item.integral : item.integral }}</text>
				</view>
			</view>

			<!-- 加载更多 -->
			<view class="loadingText" v-if="loadingText"><image class="image" src="../../../../static/images/loading/loading.gif" mode=""></image></view>
			<!-- 已经到底了 -->
			<text class="lock-end" v-if="lockend">已经到底了</text>
		</view>

		<!-- 暂无数据 -->
		<block v-if="isEmpty">
			<view class="tiket-unset">
				<view class="unicon undata"></view>
				<view class="text">暂无数据</view>
			</view>
		</block>
	</view>
</template>

<script>
import myTabbar from '@/components/tabbar/tabbar.vue';
export default {
	components: {
		myTabbar
	},
	data() {
		return {
			jfdetail: 'jfdetail',
			modelData: [
				{
					label: '全部',
					type: 0
				},
				{
					label: '收入积分',
					type: 1
				},
				{
					label: '支出积分',
					type: 2
				}
			],
			type: 0,
			page: 0,
			pageSize: 10,
			integralList: [],
			access_token: '',
			isEmpty: false,

			loadingText: false,
			lockend: false,

			//
			minHeight: 1206
		};
	},
	onLoad() {
		let _screen = uni.getSystemInfoSync();
		this.minHeight = _screen.windowHeight;
		this.access_token = uni.getStorageSync('access_token') || '';
		this.getExchangeDetail(this.type, this.page);
	},
	onShow() {},
	onReachBottom() {
		let vm = this;
		this.getExchangeDetail(vm.type, vm.page);
	},
	methods: {
		getTabbar(key) {
			let vm = this;
			let type = vm.modelData[key]['type'];
			this.page = 0;
			this.lockend = false;
			vm.getExchangeDetail(type, this.page);
		},
		async getExchangeDetail(type, page) {
			let vm = this;
			if (vm.page < 1) {
				vm.type = type;
				vm.integralList = [];
			}
			vm.loadingText = true;
			vm.page++;
			let getUrl = `${this.$api.exchange_detail}?type=${type}&page=${vm.page}&pageSize=10`;
			let res = await this.$api.request({
				method: 'GET',
				url: getUrl
			});
			if (res && res.code == 0) {
				let { integralList } = res.data;
				vm.integralList.push(...integralList);
				if (vm.integralList.length < 1) {
					this.page--;
					this.isEmpty = true;
				} else {
					this.isEmpty = false;
				}
				if (integralList.length < 1 || vm.integralList.length < 10) {
					this.lockend = true;
				}
			}
			vm.loadingText = false;
		}
	}
};
</script>

<style lang="less">
@import url('./jfdetail.less');
</style>
