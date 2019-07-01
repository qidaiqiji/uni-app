<template>
	<view class="jforder-page">
		<view class="list" v-cloak v-if="integralGoodsList.length > 0">
			<view class="jforder-header"></view>
			<view class="jforder-content">
				<view class="item" v-for="(item, key) in integralGoodsList" :key="key">
					<view class="item-head">
						中奖时间
						<text class="i">{{ item.createTime }}</text>
					</view>
					<view class="item-body">
						<view class="fl"><image class="img" :src="item.thumb" mode=""></image></view>
						<view class="fr">
							<text class="texts title">{{ item.goodsName }}</text>
							<text class="price">零售价：￥{{ item.marketPrice }}</text>
							<text class="price">
								总价值：￥{{ item.amount }}
								<text class="num">数量：{{ item.num }}</text>
							</text>
						</view>
					</view>
					<view class="item-foot">
						<text class="text wait">待发货{{ item.groupSn }}</text>
					</view>
				</view>
			</view>
			<text class="tips-text">温馨提示：您抽中的商品，将随下次直发订单一起发货。</text>
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
export default {
	data() {
		return {
			scrollTop: 0,
			integralGoodsList: [],
			access_token: '',
			isEmpty: false
		};
	},
	onLoad() {
		this.access_token = uni.getStorageSync('access_token') || '';
	},
	onShow() {
		this.getOrderList();
	},
	methods: {
		async getOrderList() {
			let self = this;
			let res = await this.$api.request({
				method: 'GET',
				access_token: this.access_token,
				url: this.$api.exchange_order
			});
			if (res && res.code == 0 && res.data) {
				let { integralGoodsList } = res.data;
				self.integralGoodsList = integralGoodsList;
				if (self.integralGoodsList.length < 1) {
					self.isEmpty = true;
				} else {
					self.isEmpty = false;
				}
			}
		}
	}
};
</script>

<style lang="less">
@import url('./jforder.less');
</style>
