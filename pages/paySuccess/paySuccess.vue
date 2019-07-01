<template>
	<view class="paySuccess">
		<view class="pay-contariner">
			<view class="paySuccessCon">
				<view class="pay-success-payImg">
					<image class="img" src="../../static/images/paySuccess/img_payok.png" alt=""></image>
					<view class="tips">支付成功</view>
				</view>
				<view class="pay-success-orderInfo">
					<view class="sameText order">
						<!--<text class="icon"></text>-->
						<text class="dind">订单信息</text>
					</view>
					<view class="sameText">
						<text class="orderPrice">订单金额：</text>
						<text class="priceDetial">{{ moneyPaid }}</text>
					</view>
					<view class="sameText orderId">
						<text class="orderPrice">订单编号：</text>
						<text class="orderNum">{{ groupId }}</text>
					</view>
				</view>

				<!-- 优惠券 -->
				<view class="pay-success-quna" v-if="couponList.length > 0">
					<view class="quanTips">
						<text>恭喜你获得以下优惠券： 可在</text>
						<text class="self-coupon" @touchstart="goSelfCoupon">我的券包</text>
						<text>中查看</text>
					</view>
					<scroll-view class="scroll-view_W" scroll-x="true">
						<view class="quanImg" v-for="(quan, quanKey) in couponList" :key="quanKey">
							<view class="jiage">
								<text>{{ quan.cut }}</text>
								<text class="sb">元</text>
							</view>
							<view class="quanType">{{ quan.subType }}</view>
						</view>
					</scroll-view>
				</view>

				<!-- 赠品信息 -->
				<view class="pay-success-ceping" v-if="zhifaGift.goodsList">
					<view class="cepingTitle"><text class="cepingInfo">赠品信息</text></view>
					<view class="ceList" v-for="(zf, zfKey) in zhifaGift.goodsList" :key="zfKey">
						<view class="ceLeft"><image class="image" :src="zf.goodsThumb" alt=""></image></view>
						<view class="ceRight">
							<view class="title">{{ zf.goodsName }}</view>
							<view class="detial">
								<text class="num">数量：{{ zf.num }}</text>
								<text class="prize">零售价：¥{{ zf.marketPrice }}</text>
							</view>
						</view>
					</view>
				</view>

				<!-- 抽奖订单商品 -->
				<view class="pay-success-ceping" v-if="integralGoodsList.length > 0">
					<view class="cepingTitle"><text class="cepingInfo">抽奖订单商品</text></view>
					<view class="ceList" v-for="(injs, injKey) in integralGoodsList" :key="injKey">
						<view class="ceLeft"><image class="image" :src="injs.goodsThumb" alt=""></image></view>
						<view class="ceRight">
							<view class="title">{{ injs.goodsName }}</view>
							<view class="detial">
								<text class="num">数量：{{ injs.num }}</text>
								<text class="prize">零售价：¥{{ injs.marketPrice }}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="pay-success-emptyBtn">pay-success</view>

		<view class="pay-success-btnCon">
			<button type="button" class="viewOrder" @click="toOrderView(groupId)">查看订单</button>
			<button type="button" class="goIndex" @click="toSwitchIndex()">回到首页</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			resInfo: null,
			// 服务器需要参数
			couponList: [
				// { subType: '品牌券', cut: 100 },
				// { subType: '品牌券', cut: 100 }
			],
			groupId: '',
			integralGoodsList: [],
			moneyPaid: '',
			zhifaGift: {}
			//goodsList: [{}, {}]
		};
	},
	onLoad(params) {
		let { groupId } = params;
		this.groupId = groupId;
	},
	onShow() {
		this.getPaydone();
	},
	methods: {
		async getPaydone() {
			let res = await this.$api.request({
				method: 'GET',
				url: `${this.$api.orderGroup_paydone}?groupId=${this.groupId}`
			});
			// this.resInfo = JSON.stringify(res);
			if (res.code == 0) {
				let { couponList, integralGoodsList, moneyPaid, zhifaGift } = res.data;
				this.couponList = couponList;
				this.integralGoodsList = integralGoodsList;
				this.moneyPaid = moneyPaid;
				this.zhifaGift = zhifaGift;
			} else {
				this.$api.showMessage(res.msg);
			}
		},
		goSelfCoupon() {
			let _url = `../self/ownCoupon/ownCoupon`;
			this.$api.goNavigateTo(_url);
		},
		toOrderView(groupId) {
			let _url = `../orderView/orderView?groupSn=${groupId}`;
			this.$api.goNavigateTo(_url);
		},
		toSwitchIndex() {
			uni.switchTab({ url: '../index/index' });
		}
	}
};
</script>

<style lang="less" scoped="scoped">
@import url('./paySuccess.less');
</style>
