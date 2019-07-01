<template>
	<view class="users-coupon-list">
		<view class="users-coupon-header"><myTabbar :modelData="modelData" :initIndex="0" jfdetail="jfdetail" @change="getTabbar" /></view>

		<!-- 优惠券列表 -->
		<view class="coupon-view tiket-list" v-cloak v-show="couponList.length > 0">
			<view class="coupon-view-coll" v-for="(item, couponKey) in couponList" :key="couponKey" @tap="useCoupon(item.couponId)">
				<view class="coupon_fl" :style="{ border: '1px solid ' + item.bgcolor, color: item.color, background: item.bgcolor }">
					<view class="local">
						<text class="use-money">
							<text class="symbols">￥</text>
							<text>{{ item.cut }}</text>
						</text>
						<text class="use-demand">{{ item.rule }}</text>
						<text class="use-p"></text>
					</view>
				</view>
				<view class="coupon_fr">
					<view class="fr_top">
						<text class="label" :style="{ background: item.bgcolor }">{{ item.subType }}</text>
						<view class="info">
							<view class="title">{{ item.title }}</view>
						</view>
					</view>
					<view class="desc desc2">{{ item.eventDesc }}</view>
					<text class="fr_tips">{{ item.expireDate }}</text>
				</view>
				<view v-if="status < 1" class="isSelect" :class="{ select: item.couponId == couponId }"></view>
			</view>
		</view>

		<!-- 底部 -->
		<view class="tiket-footer">
			<text class="tiket-footer__txt">满减、秒杀、套餐、巨划算等活动商品不能与优惠券同享</text>
			<view class="tiket-footer__btn" @tap="goCouponCenter()">确定</view>
		</view>

		<!-- 无优惠券 -->
		<block v-if="isEmpty">
			<view class="tiket-unset">
				<view class="unicon uncoupon"></view>
				<view class="text">暂无优惠券</view>
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
			modelData: [],
			couponList: [],
			couponLists: {},
			status: 0,
			couponId: 0,
			isEmpty: false
		};
	},
	onLoad(params) {
		let _viewCoupon = uni.getStorageSync('updateCoupon');
		this.couponId = this.$store.state.couponId;
		this.couponLists = this.$store.state.orderViewCoupon || _viewCoupon || [];
	},
	onShow() {
		this.couponList = this.couponLists.canUse;
		// this.couponList = this.couponLists.canNotUse;
		if (this.couponList.length < 1) {
			this.isEmpty = true;
		} else {
			this.isEmpty = false;
		}
		let unUseNum = {
			label: `可用优惠券(${this.couponLists.canUseCount})`,
			status: 0
		};
		let usedNum = {
			label: `不可用优惠券(${this.couponLists.canNotUseCount})`,
			status: 1
		};
		this.modelData = [unUseNum, usedNum];
	},
	onUnload() {
		uni.removeStorageSync('updateCoupon');
	},
	methods: {
		goCouponCenter() {
			uni.navigateBack({
				delta: 1
			});
		},
		getTabbar(index) {
			let reqUrl = this.modelData[index];
			this.status = reqUrl.status;
			if (reqUrl.status > 0) {
				this.couponList = this.couponLists.canNotUse;
			} else {
				this.couponList = this.couponLists.canUse;
			}
			if (this.couponList.length < 1) {
				this.isEmpty = true;
			} else {
				this.isEmpty = false;
			}
		},
		useCoupon(couponId) {
			if (couponId == this.couponId) {
				couponId = 0;
			}
			if (this.status < 1) {
				this.couponId = couponId;
				this.$store.commit('updateCouponId', couponId);
			}
		}
	}
};
</script>

<style lang="less" scoped="scoped">
.users-coupon-header {
	background: #fff;
	width: 100%;
	position: fixed;
	top: 0px;
	left: 0;
	z-index: 99;
}

/*  #ifdef  H5  */
.users-coupon-header {
	top: 44px;
}
/*  #endif  */

.users-coupon-list {
	position: relative;
	overflow: hidden;
	background: #f3f3f3;
	width: 100%;
	padding: 0 0 140upx 0;
	min-height: 1106upx;
}

.tiket-list {
	margin-top: 100upx;
}

.isSelect {
	width: 30upx;
	height: 30upx;
	position: absolute;
	top: 50%;
	right: 40upx;
	transform: translate(0, -50%);
	overflow: hidden;
	border-radius: 30upx;
	border: 1px solid #c0c0c0;
}

.select {
	background: #ff3366;
}
</style>
