<template>
	<view class="juhuasuan-page">
		<!-- 轮播 -->
		<view class="swiper-box juhuasuan-banner">
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration" indicator-active-color="#bfbfbf">
						<swiper-item v-for="(b, i) in topAdList" :key="i" @tap="goPage(b.url)">
							<view class="swiper-item"><image class="img" :src="b.img" mode=""></image></view>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
		<!-- 品牌 -->
		<view class="juhuasuan-title"><image class="image" src="/static/images/juhuasuan/img_pinpaituan@2x.png" mode=""></image></view>
		<view class="juhuasuan-brand">
			<view class="app-ads-list"><image class="ads-item" v-for="(item, adsKey) in ads" :key="adsKey" :src="item.img" @tap="getAds(item)" mode=""></image></view>
		</view>
		<!-- 非常惠 -->
		<view class="juhuasuan-title"><image class="image" src="/static/images/juhuasuan/img_feichanghui@2x.png" mode=""></image></view>
		<view class="juhuasuan-goods-list"><goods-list :list="goodsData" type="public" @change="getUserBuy" @detail="getGoodsDetail"></goods-list></view>

		<view class="jhs-foot" style="display: none;"><text class="text">下拉加载更多</text></view>

		<!-- 浮动图标 -->
		<min-nav :isScroll="showTop" @change="backToTop"></min-nav>
		<!-- 购物车窗口 -->
		<block v-if="showCart"><buy-popup :show="showCart" :datas="goodInfo" @close="closeCart" @sure="addCart"></buy-popup></block>
	</view>
</template>

<script>
import goodsList from '@/components/goods-list/goods-list.vue';
import minNav from '@/components/min-nav/min-nav.vue';
import buyPopup from '@/components/buy-popup/buy-popup.vue';
export default {
	components: {
		goodsList,
		minNav,
		buyPopup
	},
	data() {
		return {
			indicatorDots: true,
			autoplay: true,
			interval: 5000,
			duration: 300,
			topAdList: [],
			ads: [],
			goodsData: [],
			showTop: false,
			showCart: false,
			goodInfo: {}
		};
	},
	onLoad() {
		this.getJuhuasuanList();
	},
	onShow() {},
	methods: {
		backToTop() {
			uni.pageScrollTo({ scrollTop: 0, duration: 10 });
		},
		async addCart(data) {
			let vm = this;
			let res = await this.$api.request({
				method: 'POST',
				header: true,
				url: this.$api.cartAdd,
				data: data
			});
			if (res.code == 0) {
				vm.$store.commit('updateCart', res.data.totalCount);
			}
			this.$api.showMessage(res.msg);
			this.closeCart();
		},
		getUserBuy(item) {
			this.goodInfo = item;
			this.showCart = true;
		},
		closeCart() {
			this.showCart = false;
		},
		goPage(urlPath) {
			this.$api.goNavigateTo(urlPath);
		},
		getAds(item) {
			this.goPage(item.url);
		},
		getGoodsDetail(goodsId) {
			let urlPath = `../../goods/product/product?goodsId=${goodsId}`;
			this.goPage(urlPath);
		},
		async getJuhuasuanList() {
			let self = this;
			let res = await this.$api.request({
				method: 'GET',
				url: this.$api.juhuasuanApi
			});
			if (res && res.code == 0) {
				let data = res.data;
				self.topAdList = data.topAdList;
				self.ads = data.ads;
				self.goodsData = data.goodsList.map(e => {
					let goodsPrice = e.goodsInfo.goodsPrice;
					let array = goodsPrice.split('.');
					e.big = array[0];
					e.min = array[1];
					return e;
				});
			}
		}
	},
	onPageScroll(event) {
		let { scrollTop } = event;
		if (scrollTop < 500 && this.showTop) {
			this.showTop = false;
		} else if (scrollTop > 500 && !this.showTop) {
			this.showTop = true;
		}
	}
};
</script>

<style lang="less">
.juhuasuan-page {
	background: #f3f3f3;
	overflow: hidden;
}

//轮播
.juhuasuan-banner {
	.img {
		width: 100%;
		height: 360upx;
	}
}

.juhuasuan-title {
	position: relative;
	overflow: hidden;
	margin-top: 16upx;
	width: 100%;
	height: 76upx;

	.image {
		width: 100%;
		height: 98upx;
	}
}

.juhuasuan-brand {
	overflow: hidden;
}

.juhuasuan-goods-list {
	background: #ffffff;
	margin-bottom: 180upx;
}

.jhs-foot {
	height: 98upx;
	line-height: 98upx;
	text-align: center;
	color: #d4d4d4;
	font-size: 24upx;
	font-family: PingFang-SC-Medium;
	font-weight: 500;

	.text {
		font-size: 24upx;
	}
}
</style>
