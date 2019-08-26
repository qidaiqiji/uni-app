<template>
	<view class="pages order-page">
		<!-- 导航按钮 -->
		<view class="top-header"><myTabbar :modelData="tabbarModel" :initIndex="tabbarIndex" @change="getTabbar"></myTabbar></view>
		<view class="empty-header"></view>

		<!-- 订单列表 -->
		<view class="body"><group-list :mode="orderMode" @change="orderView" @queryShip="orderQueryShipping" @updateList="updateList"></group-list></view>

		<!-- 已经到底了 -->
		<view class="lock-end" v-show="end">已经到底了</view>

		<!-- 无数据 -->
		<view class="order-empty" v-cloak v-show="total < 1 && !ready">
			<view class="unset_empty_order"></view>
			<view class="text">您还没有相关订单</view>
		</view>
	</view>
</template>

<script>
import myTabbar from '@/components/tabbar/tabbar.vue';
import groupList from '@/components/group-list/group-list.vue';
export default {
	components: {
		groupList,
		myTabbar
	},
	data() {
		return {
			tabbarModel: [
				{
					label: '全部',
					status: ''
				},
				{
					label: '待付款',
					status: 'needPay'
				},
				{
					label: '待收货',
					status: 'needReceive'
				},
				{
					label: '退换货',
					status: 'refuse'
				}
			],
			tabbarIndex: 0,
			status: '',
			currentPage: 0,

			end: false,

			ready: true,
			total: 0,
			orderMode: []
		};
	},
	onLoad(params) {
		if (params.status) {
			this.status = params.status;
			this.tabbarIndex = Number(params.tab);
		}
	},
	// onPageScroll(e) {
	//     let { scrollTop } = e;
	// },
	onReachBottom() {
		if (this.total > this.orderMode.length && !this.ready) {
			this.getOrderGroupList();
		} else {
			this.end = true;
		}
	},
	onReady() {},
	onShow() {
		this.getOrderGroupList();
	},
	methods: {
		resetParams() {
			let vm = this;
			vm.end = false;
			vm.ready = true;
			vm.currentPage = 0;
			vm.orderMode = [];
		},
		getTabbar(index) {
			let vm = this;
			let status = vm.tabbarModel[index].status;
			vm.status = status;
			vm.resetParams();
			vm.getOrderGroupList(vm.status, vm.currentPage);
		},
		orderView(groupSn) {
			let url = `../orderView/orderView?groupSn=${groupSn}`;
			this.$api.goNavigateTo(url);
		},
		// 快递信息查询
		orderQueryShipping(groupSn) {
			let url = `../wuliu/wuliu?groupSn=${groupSn}`;
			this.$api.goNavigateTo(url);
		},
		async getOrderGroupList() {
			let vm = this;
			let pageSize = 10;
			vm.currentPage++;
			let _url = `${vm.$api.orderGroup_list}?status=${vm.status}&currentPage=${vm.currentPage}&pageSize=${pageSize}`;
			let res = await this.$api.request({ url: _url, loading: true });
			if (res && res.data) {
				vm.ready = false;
				vm.total = res.data.total;
				vm.orderMode.push(...res.data.groupList);
				if (vm.total == vm.orderMode.length && vm.total > 0) {
					vm.end = true;
				}
			} else {
				vm.$api.showMessage(res.msg);
			}
		},
		updateList(value) {
			let that = this;
			if (value) {
				setTimeout(() => {
					that.currentPage = 0;
					that.orderMode = [];
					that.getOrderGroupList();
				}, 1000);
			}
		}
	}
};
</script>

<style lang="less">
@import url('./order.less');
</style>
