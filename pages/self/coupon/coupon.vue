<template>
	<view class="coupon-warp" :style="{ height: lbodyHeight + 'px' }">
		<scroll-view :scroll-y="true" :scroll-top="scrollBox" :style="{ height: lbodyHeight + 'px' }" @scroll="scrollView">
			<view class="coupon-warp__top"><image src="../../../static/images/self/img_youhui.jpg" class="coupon-warp__top_img"></image></view>
			<view class="coupon-warp__select" :class="[navFixed ? 'isFixed' : '']">
				<text v-for="(t, i) in typeList" :key="i" class="coupon-warp__select_item" :class="{ active: selectNav === t }" @click="changeCouponType(t)">{{ t }}</text>
			</view>
			<view class="tiket tiket-list"><couponList :list="couponList" :update="true" @change="changeCoupon"></couponList></view>
			<view class="emptyview">em</view>
		</scroll-view>

		<view class="tiket-footer">
			<text class="tiket-footer__txt">满减、秒杀、套餐、巨划算等活动商品不能与优惠券同享</text>
			<view class="tiket-footer__btn" @click="toMineCoupon()">查看我的优惠券</view>
		</view>
	</view>
</template>

<script>
import couponList from '@/components/coupon-list/coupon-list.vue';
export default {
	components: { couponList },
	data() {
		return {
			scrollBox: 0,
			lbodyHeight: 1000,
			lbodyHeight2: 600,
			lbodyHeight3: 600,
			navFixed: false,
			usescrollTop: 0,
			// 默认参数值
			selectNav: '全部',
			// 服务器需要参数
			type: '',
			brandId: '',
			// 服务器返回参数
			typeList: [],
			couponList: []
		};
	},
	onLoad() {
		let res = uni.getSystemInfoSync();
		this.lbodyHeight = res.windowHeight;
		this.lbodyHeight2 = uni.upx2px(98 + 20 + 50 + 20);
		this.getCouponList(this.type, this.brandId);
	},
	onShow() {
		// this.getCouponList(this.type, this.brandId);
	},
	computed: {},
	methods: {
		// 去我的优惠券页面
		toMineCoupon(type) {
			this.$api.goNavigateTo('../ownCoupon/ownCoupon');
		},
		// 改变列表类型
		changeCouponType(key) {
			this.selectNav = key;
			if (key == '全部') {
				key = '';
			}
			this.type = key;
			if (this.usescrollTop > uni.upx2px(240)) {
				this.scrollBox = uni.upx2px(240) - 20 + parseInt(Math.random() * 10);
			}
			this.getCouponList(key, this.brandId);
		},
		changeCoupon() {
			this.getCouponList(this.type, this.brandId);
		},
		// 获取列表
		async getCouponList(type, brandId) {
			let self = this;
			let res = await this.$api.request({
				url: this.$api.coupon_cantakelist,
				data: {
					type: type,
					brandId: brandId
				}
			});
			if (res && res.data) {
				let data = res.data;
				self.typeList = data.typeList;
				self.couponList = data.couponList;
			} else {
				this.$api.showMessage(res.msg);
			}
		},
		scrollView(event) {
			let { scrollTop } = event.detail;
			if (scrollTop < uni.upx2px(240) && this.navFixed) {
				this.navFixed = false;
			}
			if (scrollTop > uni.upx2px(240) && !this.navFixed) {
				this.navFixed = true;
			}
			this.usescrollTop = scrollTop;
		}
	},
	onReady() {
		// 得到布局位置信息[{"id":"","dataset":{},"left":0,"right":414,"top":0,"bottom":132,"width":414,"height":132}]
		// let view = uni.createSelectorQuery().selectAll('.coupon-warp__top_img');
		// view.boundingClientRect(data => {
		// }).exec();
	}
};
</script>

<style lang="less">
@import url('./coupon.less');
.isFixed {
	position: fixed;
	width: 100%;
	z-index: 5;
	padding-top: 10upx;
	margin: 0;
	top: 0px;
}

/*  #ifdef  H5  */
.isFixed {
	top: 44px;
}
/*  #endif  */

.emptyview {
	height: 170upx;
	visibility: hidden;
}
</style>
