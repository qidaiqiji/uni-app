<template>
	<view class="coupon-view">
		<view class="coupon-view-coll" v-for="(item, iKey) in getCouponList" :key="iKey">
			<view class="coupon_fl" :style="{ border: '1px solid ' + item.color, color: item.color, background: item.color }">
				<view class="local">
					<text class="use-money">
						<text class="symbols">￥</text>
						<text>{{ item.cut }}</text>
					</text>
					<text class="use-demand">{{ item.ruleName }}</text>
					<text class="use-p"></text>
				</view>
			</view>
			<view class="coupon_fr">
				<view class="fr_top">
					<text class="label" :style="{ background: item.color }">{{ item.subType }}</text>
					<view class="info">
						<view class="title">{{ item.eventName }}</view>
					</view>
				</view>
				<view class="desc desc2">{{ item.eventDesc }}</view>
				<view class="fr_tips">
					<view class="youxiaoqi">有效期</view>
					<view class="">{{ item.expireDate }}</view>
				</view>
				<text class="use-btn" v-if="item.canTake" :style="{ border: '1px solid ' + item.color, color: item.color }" @tap="takeCoupon(item.ruleId, iKey)">立即领取</text>
				<text class="use-btn un-take" v-if="!item.canTake">已领取</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: ['list'],
	data() {
		return {};
	},
	computed: {
		getCouponList() {
			return this.list ? this.list : [];
		}
	},
	methods: {
		async takeCoupon(ruleId, index) {
			let res = await this.$api.request({
				method: 'GET',
				url: `${this.$api.coupon_take}?ruleId=${ruleId}`
			});
			if (res.code == 0) {
				let { canTakeCount } = res.data;
				if (canTakeCount <= 0) {
					this.list[index].canTake = false;
				}
				uni.showToast({ title: '领取成功' });
			} else {
				uni.showToast({ title: res.msg });
			}
		}
	}
};
</script>

<style lang="less" scoped>
//@import './coupon-list.less';
.youxiaoqi {
	color: #889696;
	font-size: 24upx;
	font-weight: normal;
	// padding: 0upx 20upx;
}
</style>
