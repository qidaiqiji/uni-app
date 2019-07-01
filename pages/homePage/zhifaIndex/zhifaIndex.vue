<template>
	<view class="shampoo-page">
		<view class="searchPart" :class="{ show: sTop }" style="background: #fff;">
			<view class="search" @tap="focusIn">
				<text class="search-icon"></text>
				<input type="text" placeholder="采购商品、品牌" v-model="keywords" disabled="disabled" />
			</view>
		</view>

		<view class="swiper-box shampoo-banner">
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
						<swiper-item v-for="(bitem, bindex) in bannerList" :key="bindex" @tap="goPage(bitem.url)">
							<view class="swiper-item"><image class="img" :src="bitem.img" mode=""></image></view>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>

		<view class="shampooServer">
			<view class="ul">
				<view class="li">
					<view class="s30_icons s30_shampoo_shop"><text class="text">服务10000+门店</text></view>
				</view>
				<view class="li">
					<view class="s30_icons s30_shampoo_youx"><text class="text">全场满额包邮</text></view>
				</view>
				<view class="li">
					<view class="s30_icons s30_shampoo_shuix"><text class="text">一般贸易完税</text></view>
				</view>
			</view>
		</view>
		<view class="shampoo-pinpai">
			<view class="app-ads-list"><image class="ads-item" v-for="(item, adsKey) in midAds" :key="adsKey" :src="item.img" @tap="getMidAds(item)" mode=""></image></view>
		</view>

		<!-- 热门 -->
		<view class="shampoo-hot">
			<image class="shampoo-hot__img" src="/static/images/shampoo/img_haohuo.png" mode=""></image>
			<view class="list-box shampoo-hot__list">
				<view class="item" v-for="(adv, advKey) in adviceList" :key="advKey" @tap="go_goodsDetail(adv.goodsInfo.goodsId)">
					<view class="img-box"><image :src="adv.goodsInfo.thumb" mode="widthFix" class="image"></image></view>
					<view class="item_text">{{ adv.goodsInfo.goodsName }}</view>
					<view class="item_count">销量: {{ adv.goodsInfo.salesCount }}</view>
					<view class="item_price">
						<text class="item_price_number">￥{{ adv.goodsInfo.goodsPrice }}</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 广告 -->
		<view class="waist-banner">
			<view class="page-section swiper">
				<swiper class="swiper" :autoplay="true" :interval="5000" :duration="500" circular="1">
					<swiper-item v-for="(bot, botKey) in botAds" :key="botKey" @tap="goPage(bot.url)">
						<view class="swiper-item"><image class="image waist-banner__img" :src="bot.img" alt=""></image></view>
					</swiper-item>
				</swiper>
			</view>
		</view>

		<!-- 品牌推荐 -->
		<view class="shampoo-brands">
			<view class="item" v-for="(brands, bsKey) in brandList" :key="bsKey" @tap="goBrandIndex(brands.brandId)">
				<view class="header">
					<view class="header_img"><image :src="brands.icon" mode="widthFix" class="image"></image></view>
					<view class="header_warp">
						<view class="header_title">
							<text class="header_name">{{ brands.brandName }}</text>
							<block v-for="(item, index) in brands.tagList" :key="index">
								<image v-if="item.name == 'manZeng'" class="header_tag" src="/static/images/public/img_zeng.png" mode=""></image>
								<image v-if="item.name == 'manJian'" class="header_tag" src="/static/images/public/img_jian.png" mode=""></image>
							</block>
						</view>
						<text class="header_described">{{ brands.shortDesc }}</text>
					</view>
					<text class="product_number">{{ brands.goodsCount }}商品</text>
				</view>
				<view class="content-view list-box">
					<view class="content-view-cell" v-for="(goods, goodsKey) in brands.goodsList" :key="goodsKey">
						<view class="image-box"><image :src="goods.thumb" mode="widthFix" class="image"></image></view>
						<text class="price">￥{{ goods.price }}</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 全部好货 -->
		<view class="flash-sale-box">
			<view class="line-header">全部好货</view>
			<view class="list-con"><index-goods-list :goodslist="goodslist" @productDetail="goDetail" @change="getUserBuy"></index-goods-list></view>
			<view class="loadingText"><image class="image" src="../../../static/images/loading/loading.gif" mode=""></image></view>
		</view>
		<!-- 底部 -->
		<view class="zhifafoot">
			<view class="footerCon">
				<view class="itemSame" @tap="goPageto('../../index/index')">
					<image class="img img1" src="../../../static/images/tabbar/tab_icon_home_none.png"></image>
					<view class="desc">首页</view>
				</view>
				<view class="itemSame" @tap="goPage('../../goods/list/list')">
					<image class="img img2" src="../../../static/images/tabbar/shopIcon.png"></image>
					<view class="desc">全部商品</view>
				</view>
				<view class="itemSame" @tap="goPageto('../../cart/cart')">
					<view class="img-cart">
						<uni-badge v-if="getCartNumber > 0" :text="getCartNumber" type="error" :inverted="false" style="top: 4px;" styles="carts"></uni-badge>
						<image class="img img3" src="../../../static/images/tabbar/tab_icon_shoppingcart_none.png"></image>
					</view>
					<view class="desc">采购车</view>
				</view>
				<view class="itemSame" @tap="goPageto('../../my/my')">
					<image class="img img4" src="../../../static/images/tabbar/tab_icon_mine_none.png"></image>
					<view class="desc">我的</view>
				</view>
			</view>
		</view>

		<!-- 购物车窗口 -->
		<block v-if="showCart"><buy-popup :show="showCart" :datas="goodInfo" @close="closeCart" @sure="addCart"></buy-popup></block>
	</view>
</template>

<script>
import uniBadge from '@/components/uni-badge/uni-badge.vue';
import indexGoodsList from '@/components/goods-list/index-goods-list.vue';
import buyPopup from '@/components/buy-popup/buy-popup.vue';
export default {
	components: {
		uniBadge,
		indexGoodsList,
		buyPopup
	},
	data() {
		return {
			sTop: false,
			keywords: '',

			// 页面输出
			midAds: [],
			adviceList: [],
			bannerList: [],
			botAds: [],
			brandList: [],
			flashSale: [{}, {}, {}],

			// 轮播参数
			indicatorDots: true,
			autoplay: true,
			interval: 5000,
			duration: 500,

			// 商品列表参数
			totalCount: 0,
			pages: 0,
			goodslist: [],
			loadingText: '',
			showCart: false,
			goodInfo: {},
			access_token: ''
		};
	},
	onLoad() {
		this.access_token = uni.getStorageSync('access_token') || '';
		this.getIndexZhifa();
		this.getGoodsList();
	},
	onShow() {},
	onReachBottom() {
		var that = this;
		if (that.loadingText) {
			return false;
		}
		that.loadingText = true;
		setTimeout(function() {
			that.getMoreGoods();
		}, 500);
	},
	computed: {
		getCartNumber() {
			return this.$store.state.cartNumber ? this.$store.state.cartNumber : uni.getStorageSync('cartNumber');
		}
	},
	methods: {
		goPageto(urlPath) {
			uni.switchTab({
				url: urlPath
			});
		},
		async addCart(data) {
			let vm = this;
			let res = await this.$api.request({
				method: 'POST',
				header: true,
				access_token: this.access_token,
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
		go_goodsDetail(goodsId) {
			this.goPage(`../../goods/product/product?goodsId=${goodsId}`);
		},
		goBrandIndex(brandId) {
			this.goPage(`../../goods/brandDetail/brandDetail?brandId=${brandId}`);
		},
		getMidAds(item) {
			if (item.url) {
				this.$api.goNavigateTo(item.url);
			}
		},
		async getIndexZhifa() {
			let vm = this;
			let res = await this.$api.request({
				method: 'GET',
				access_token: this.access_token,
				url: this.$api.indexZhifaApi
			});
			if (res && res.code == 0) {
				let data = res.data;
				vm.bannerList = data.bannerList;
				vm.midAds = data.midAds;
				vm.adviceList = data.adviceList;
				vm.botAds = data.botAds;
				vm.brandList = data.brandList;
			}
		},
		// 获取商品列表
		getMoreGoods() {
			if (this.totalCount !== this.goodslist.length) {
				this.getGoodsList();
			}
		},
		async getGoodsList() {
			let that = this;
			that.pages++;
			that.loadingText = true;
			let res = await this.$api.request({
				url: this.$api.getGoodsList,
				data: {
					page: that.pages,
					pageSize: 10
				}
			});
			if (res && res.data) {
				let list = res.data.goodsList;
				that.totalCount = res.data.totalCount;
				for (let t = 0; t < list.length; t++) {
					let goodsPrice = list[t].goodsInfo.goodsPrice;
					let array = goodsPrice.split('.');
					list[t].big = array[0];
					list[t].min = array[1];
				}
				that.goodslist = that.goodslist.concat(list);
			}
			that.loadingText = false;
		},
		// 返回商品ID
		goDetail(goodsId) {
			this.goPage(`../../goods/product/product?goodsId=${goodsId}`);
		},
		focusIn() {
			let _url = this.keywords ? `../../search/search?keywords=${this.keywords}` : '../../search/search';
			this.$api.goNavigateTo(_url);
		}
	}
};
</script>

<style lang="less">
@import url('./zhifa-index.less');
</style>
