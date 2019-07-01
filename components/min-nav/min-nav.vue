<template>
	<view>
		<!-- 左下角浮标 -->
		<view class="isfixed foot-l-box" v-if="showMenu">
			<view class="item s84_icons s84_quicknav_home" @tap="goPage('/pages/index/index')"></view>
			<view class="item s84_icons s84_quicknav_shop bl" @tap="goPage('/pages/cart/cart')">
				<uni-badge v-if="getCartNumber > 0" :text="getCartNumber" type="error" :inverted="false" style="top: 4px;" styles="carts"></uni-badge>
			</view>
			<view class="item s84_icons s84_quicknav_my bl" @tap="goPage('/pages/my/my')"></view>
		</view>

		<!-- 右下角浮标 -->
		<view class="isfixed foot-r-box" v-if="showMenur">
			<!-- <view class="item" @tap="showMobile"><text class="s842_icons s842_public_kefu"></text></view> -->
			<view class="item" v-if="isScroll" @tap="goTop()"><text class="s842_icons s842_public_top"></text></view>
		</view>
	</view>
</template>

<script>
import uniBadge from '@/components/uni-badge/uni-badge.vue';
export default {
	components: {
		uniBadge
	},
	props: {
		showMenu: {
			default: true
		},
		showMenur: {
			default: true
		},
		cart: {
			default: 0
		},
		isScroll: {
			default: false
		},
		bottom: {
			default: 0
		}
	},
	data() {
		return {
			cartNumber: 0
		};
	},
	created() {
		this.cartNumber = this.cart || this.$store.state.cartNumber || uni.getStorageSync('cartNumber');
	},
	computed: {
		getCartNumber() {
			return this.$store.state.cartNumber ? this.$store.state.cartNumber : this.cartNumber;
		}
	},
	methods: {
		goPage(urlPath) {
			uni.switchTab({
				url: urlPath
			});
		},
		goTop() {
			// uni.pageScrollTo({
			// 	scrollTop: 0,
			// 	duration: 100
			// });
			// this.$emit('scrollTop', 0);
			this.$emit('change');
		},
		showMobile() {
			let _url = '../../services/services';
			this.$api.goNavigateTo(_url);
			// this.$api.callMobile();
		}
	}
};
</script>

<style lang="less" scoped="scoped">
.isfixed {
	position: fixed;
	overflow: hidden;
	bottom: 24upx;
}

.quicknav {
	width: 84upx;
	height: 84upx;
	background-position: center;
	background-repeat: no-repeat;
	background-size: 84upx 84upx;

	// &.home {
	//     background-image: url('~@/static/images/iconslibs/icon_quicknav_home.png');
	// }
	// &.shop {
	//     background-image: url('~@/static/images/iconslibs/icon_quicknav_shop.png');
	// }
	// &.mine {
	//     background-image: url('~@/static/images/iconslibs/icon_quicknav_my.png');
	// }
}

// 左下角浮标
.foot-l-box {
	z-index: 22;
	width: 84upx * 3;
	height: 84upx;
	line-height: 84upx;
	background: rgba(0, 0, 0, 0.5);
	border-radius: 8upx;
	left: 24upx;

	.image {
		width: 40upx;
		height: 40upx;
		position: absolute;
		top: 50%;
		left: 50%;
		-webkit-transform: translate(-50%, -50%);
		-ms-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
	}

	.item {
		cursor: pointer;
		width: 84upx;
		height: 84upx;
		position: relative;
		float: left;
		display: block;
		box-sizing: border-box;
	}

	.bl {
		border-left: 1px solid #ffffff;
	}
}
</style>
