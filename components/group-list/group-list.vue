<template>
	<view class="group-ls">
		<view class="group-it" v-for="(mode, modeKey) in getModel" :key="modeKey">
			<view class="header">
				<text class="fl">订单编号：{{ mode.groupSn }}</text>
				<text class="fr">{{ mode.createTime }}</text>
			</view>

			<view class="order-ls" @tap="tap(mode.groupSn)">
				<view class="order-it" v-for="(order, orderKey) in mode.orderList" :key="orderKey">
					<view class="header">
						<text class="fl">分单号: {{ order.orderSn }}</text>
						<text class="fr order-status-success">{{ order.csStatus }}</text>
					</view>
					<view class="body">
						<block v-if="order.orderGoodsList.length <= 1">
							<view class="body-item" v-for="(goods, goodsKey) in order.orderGoodsList" :key="goodsKey">
								<view class="img-box"><image class="img" :src="goods.thumb" mode=""></image></view>
								<view class="info-box">{{ goods.goodsName }}</view>
								<view class="fr-box">
									<text class="fr-box_price">￥{{ goods.goodsPrice }}</text>
									<text class="fr-box_text">x{{ goods.num }}</text>
								</view>
							</view>
						</block>

						<scroll-view class="scroll-view_H" scroll-x="true" v-if="order.orderGoodsList.length > 1">
							<view class="img-box" v-for="(goods, goodsKey) in order.orderGoodsList" :key="goodsKey" :class="{ isWuliao: goods.isWuliao }">
								<image class="img" :src="goods.thumb" mode=""></image>
								<text class="text" v-if="goods.isWuliao">物料</text>
								<text class="text" v-if="goods.isGift">赠品</text>
							</view>
						</scroll-view>
					</view>
				</view>
			</view>

			<view class="foot">
				<view class="fl">
					<text>总额：</text>
					<text class="number">￥{{ mode.totalFee }}</text>
				</view>
				<view class="fr" v-if="mode.hasDelivery">
					<view class="botton btn-wuliu" @tap="checkUseShip(mode.groupSn)">物流详情</view>
					<view class="botton btn-sure" @tap="checkUsePackage(mode.groupSn)">确认收货</view>
				</view>
				<view class="fr" v-if="mode.needPay"><view class="botton btn-sure" @tap="toHuifuApp(mode.groupSn)">立即付款</view></view>
			</view>
		</view>
		<!-- <view class="textW">payInfo:: {{ payInfo }}</view> -->
		<!-- <view class="">*****************</view> -->
		<!-- <view class="textW">zhifuinfo:: {{ zhifuinfo }}</view> -->
		<!-- <view class="">*****************</view> -->
		<!-- <view class="textW">errorInfo:: {{ errorInfo }}</view> -->
		<!-- <view class="">*****************</view> -->
		<!-- <view class="textW">successinfo:: {{ successinfo }}</view> -->
		<!-- <view class="">*****************</view> -->
		<!-- <view class="textW">failInfo:: {{ failInfo }}</view> -->
	</view>
</template>

<script>
import payHuifuApp2 from '@/common/pay.js';
export default {
	props: {
		mode: {
			type: Array
		}
	},
	computed: {
		getModel() {
			return this.mode ? this.mode : [];
		}
	},
	data() {
		return {
			// 测试debug
			successinfo: '',
			failInfo: '',
			zhifuinfo: '',
			payInfo: '',
			errorInfo: ''
		};
	},
	created() {},
	methods: {
		tap(groupSn) {
			this.$emit('change', groupSn);
		},
		checkUseShip(groupSn) {
			console.log(JSON.stringify(groupSn))
			// this.$emit('queryShip', groupSn);
			// let url = `../wuliu/wuliu?groupSn=${groupSn}`;
			// this.$api.goNavigateTo(url);
		},
		// 确认收货
		async checkUsePackage(groupSn) {
			let that = this;
			let res = await this.$api.request({
				method: 'POST',
				url: this.$api.orderGroup_confimreceive,
				data: {
					groupSn: groupSn
				}
			});
			if (res && res.data) {
			}
			this.$api.showMessage(res.msg);
		},
		// 汇支付
		async toHuifuApp(groupSn) {
			let vm = this;
			payHuifuApp2(groupSn, vm);
		}
	}
};
</script>

<style lang="less">
@import './group-list.less';
</style>
