<template>
	<view class="order-detail">
		<view class="o-header">
			<view class="fl">
				<text>总单号：</text>
				<text class="sn">{{ groupSn }}</text>
			</view>
			<view class="fr order-status-error">{{ status }}</view>
		</view>
		<view class="o-border o-addressInfo">
			<view class="info">
				<view class="img"></view>
				<view class="">
					<text class="name">{{ addressInfo.consignee }}</text>
					<text class="phone">{{ addressInfo.mobile }}</text>
				</view>
				<view class="address">{{ addressInfo.provinceName }}{{ addressInfo.cityName }}{{ addressInfo.districtName }}{{ addressInfo.address }}</view>
			</view>
		</view>
		<view class="o-border o-shippingInfo">
			<view class="item">
				<text class="label">采购总额</text>
				<text class="value">￥{{ feeInfo.goodsAmount }}</text>
			</view>
			<view class="item">
				<text class="label">满减立减</text>
				<text class="value">-￥{{ feeInfo.fullCutDiscount }}</text>
			</view>
			<view class="item">
				<text class="label">优惠券</text>
				<text class="value">-￥{{ feeInfo.couponDiscount }}</text>
			</view>
			<view class="item">
				<text class="label">直发运费</text>
				<text class="value">{{ feeInfo.zhifaShippingInfo }}</text>
			</view>
			<view class="item">
				<text class="label">应付总额</text>
				<text class="pay-value">￥{{ feeInfo.payAmount }}</text>
			</view>
		</view>
		<view class="o-border o-feeInfo">
			<view class="tips">此单您的邮费政策：</view>
			<view class="zhifa">
				<text>小美直发专区：包邮</text>
				<text class="i">{{ shippingInfo.zhifaBaoyou }}</text>
				<text>单，到付</text>
				<text class="i">{{ shippingInfo.zhifaDaofu }}</text>
				<text>单，现付</text>
				<text class="i">{{ shippingInfo.zhifaXianfu }}</text>
				<text>单</text>
			</view>
			<view class="daifa">
				<text>品牌代发专区：包邮</text>
				<text class="i">{{ shippingInfo.daifaBaoyou }}</text>
				<text>单，到付</text>
				<text class="i">{{ shippingInfo.daifaDaofu }}</text>
				<text>单</text>
			</view>
		</view>
		<view class="o-subOrderList">
			<view class="" v-for="(sub, subKey) in subOrderList" :key="subKey">
				<view class="head">
					<view class="fl">
						<text class="text">分单号：{{ sub.orderSn }}</text>
					</view>
				</view>
				<view class="body">
					<view class="item" v-for="(order, orderKey) in sub.orderGoodsList" :key="orderKey" @click="toGoodsDetail(order.goodsId)">
						<view class="ibt img-box" :class="{ isWuliao: order.isWuliao, isGift: order.isGift }">
							<image class="img" :src="order.thumb" alt=""></image>
							<text class="text" v-if="order.isWuliao">物料</text>
							<text class="text" v-if="order.isGift">赠品</text>
						</view>
						<view class="ibt info-box">
							<view class="title">{{ order.goodsName }}</view>
							<view class="foot">
								<text class="f-price">￥{{ order.goodsPrice }}</text>
								<text class="f-text">x{{ order.num }}件</text>
							</view>
						</view>
						<view class="ibt o-tags await">{{ order.status }}</view>
					</view>
				</view>
				<view class="foot-count">
					<view class="fl">共{{ sub.totalCount }}件商品</view>
					<view class="fr">
						小计：
						<text class="f-price">￥{{ sub.subTotal }}</text>
					</view>
				</view>
			</view>

			<!-- <view class="textW">payInfo:: {{ payInfo }}</view> -->
			<!-- <view class="">*****************-</view> -->
			<!-- <view class="textW">zhifuinfo:: {{ zhifuinfo }}</view> -->
			<!-- <view class="">*****************-</view> -->
			<!-- <view class="textW">errorInfo:: {{ errorInfo }}</view> -->
			<!-- <view class="">*****************-</view> -->
			<!-- <view class="textW">successinfo:: {{ successinfo }}</view> -->
			<!-- <view class="">*****************-</view> -->
			<!-- <view class="textW">failInfo:: {{ failInfo }}</view> -->
		</view>

		<view class="o-page-foot-empty"></view>

		<view class="o-page-foot" v-if="needPay">
			<view class="fr">
				<view class="o-btn o-btn-cancel" v-if="needPay" @click="cancelOrder(groupSn)">取消订单</view>
				<view class="o-btn o-btn-pay" @click="toHuifuApp(groupSn)">立即付款</view>
			</view>
		</view>

		<view class="o-page-foot" v-if="hasDelivery">
            <view class="fr">
                <view class="o-btn o-btn-cancel" @click="orderQuery(groupSn)">物流详情</view>
                <view class="o-btn o-btn-pay" @click="orderConfim(groupSn)">确认收货</view>
            </view>
        </view>
	</view>
</template>

<script>
import payHuifuApp2 from '@/common/pay.js';
export default {
	data() {
		return {
			groupSn: '',
			addressInfo: {},
			feeInfo: {},
			hasDelivery: false,
			needPay: false,
			shippingInfo: {},
			status: '',
			subOrderList: [],
			// 测试debug
			successinfo: '',
			failInfo: '',
			zhifuinfo: '',
			payInfo: '',
			errorInfo: ''
		};
	},
	onLoad(params) {
		let { groupSn } = params;
		this.groupSn = groupSn;
		this.get_order_group_view();
	},
	onShow() {},
	methods: {
		async get_order_group_view() {
			let vm = this;
			let res = await this.$api.request({
				method: 'POST',
				url: this.$api.orderGroup_view,
				data: {
					groupSn: this.groupSn
				}
			});
			if (res.code == 0) {
				vm.addressInfo = res.data.addressInfo;
				vm.feeInfo = res.data.feeInfo;
				vm.hasDelivery = res.data.hasDelivery;
				vm.needPay = res.data.needPay;
				vm.shippingInfo = res.data.shippingInfo;
				vm.status = res.data.status;
				vm.subOrderList = res.data.subOrderList;
			} else {
				vm.$api.showMessage(res.msg);
			}
		},
		async cancelOrder(groupSn) {
			let vm = this;
			let res = await this.$api.request({
				method: 'post',
				url: this.$api.orderGroup_cancel,
				data: {
					groupSn: groupSn
				}
			});
			if (res.code == 0) {
				this.get_order_group_view();
			}
			this.$api.showMessage(res.msg);
		},
		// 汇支付
		toHuifuApp(groupSn) {
			let vm = this;
			payHuifuApp2(groupSn, vm);
		},
		toGoodsDetail(goodsId) {
			let url = `../goods/product/product?goodsId=${goodsId}`;
			this.$api.goNavigateTo(url);
		},
		// 订单确认收货
		async orderConfim(groupSn) {
			let res = await this.$api.request({
				method: 'post',
				url: this.$api.orderGroup_confimreceive,
				data: {
					groupSn: groupSn
				}
			});
			this.$api.showMessage(res.msg);
		},
		// 快递信息查询
		orderQuery(groupSn) {
			console.log(groupSn);
		    // let res = await this.$api.request({
		    //     method: 'post',
		    //     url: `${this.$api.orderGroup_queryShipping}?groupSn=${groupSn}`
		    // });
		    // this.$api.showMessage(res.msg);
		}
	}
};
</script>

<style lang="less">
@import './order-view.less';
</style>
