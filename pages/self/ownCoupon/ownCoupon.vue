<template>
	<view class="users-coupon-list">
		<view class="users-coupon-header"><myTabbar :modelData="modelData" :initIndex="0" :jfdetail="jfdetail" @change="getTabbar" /></view>

		<!-- 优惠券列表 -->
		<view class="coupon-view tiket-list" v-show="couponList.length > 0">
			<view class="coupon-view-coll" v-for="(item, ci) in couponList" :key="ci">
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
					<text class="fr_tips">{{ item.expireDate }}</text>
					<text class="use-btn" v-if="item.status == 0" :style="{ border: '1px solid ' + item.color, color: item.color }" @click="useCoupon(item.eventId)">立即使用</text>
					<text class="use-btn" v-if="item.status == 1" :style="{ border: '1px solid ' + item.color, color: item.color }">已使用</text>
					<text class="use-btn" v-if="item.status == 2" :style="{ border: '1px solid ' + item.color, color: item.color }">已过期</text>
				</view>

				<image v-if="item.willExpire" class="expired icon_expired" src="../../../static/images/self/icon_expired.png"></image>
			</view>
		</view>

		<!-- 底部 -->
		<view class="tiket-footer">
			<text class="tiket-footer__txt">满减、秒杀、套餐、巨划算等活动商品不能与优惠券同享</text>
			<view class="tiket-footer__btn" @click="goCouponCenter">去领券中心</view>
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
			jfdetail: 'jfdetail',
			modelData: [],
			couponList: [],
			status: 0,
			isEmpty: false
		};
	},
	onLoad() {
		// this.getReceivedList(this.status);
	},
	onShow() {
		this.getReceivedList(this.status);
	},
	methods: {
		goCouponCenter() {
			this.$api.goNavigateTo(`../coupon/coupon`);
		},
		getTabbar(index) {
			let reqUrl = this.modelData[index];
			this.getReceivedList(reqUrl.status);
		},
		useCoupon(eventId) {
			this.$api.goNavigateTo(`../../goods/list/list?eventId=${eventId}`);
		},
		// 获取优惠券数据
		async getReceivedList(status) {
			let vm = this;
			let res = await this.$api.request({
				method: 'GET',
				url: `${this.$api.coupon_receivedlist}?status=${status}`
			});
			if (res && res.code == 0) {
				let { couponList, couponCountMap } = res.data;
				let data = res.data;
				let unUseNum = {
					label: `未使用(${couponCountMap.unusedNum})`,
					status: 0
				};
				let usedNum = {
					label: `已使用(${couponCountMap.usedNum})`,
					status: 1
				};
				let expiredNum = {
					label: `已过期(${couponCountMap.expiredNum})`,
					status: 2
				};
				vm.modelData = [unUseNum, usedNum, expiredNum];
				vm.couponList = couponList;
				if (vm.couponList.length < 1) {
					vm.isEmpty = true;
				} else {
					vm.isEmpty = false;
				}
			}
		}
	}
};
</script>

<style>
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

.expired {
	width: 88upx;
	height: 32upx;
	position: absolute;
	z-index: 5;
	right: -1px;
	top: 20upx;
}
</style>
