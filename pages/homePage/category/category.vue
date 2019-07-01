<template>
	<view class="category-page">
		<image src="../../../static/images/icons/category/img_bg_0.png" v-if="navVal == 1" class="top-bg"></image>
		<image src="../../../static/images/icons/category/img_bg_1.png" v-if="navVal == 2" class="top-bg"></image>
		<image src="../../../static/images/icons/category/img_bg_2.png" v-if="navVal == 3" class="top-bg"></image>
		<image src="../../../static/images/icons/category/img_bg_3.png" v-if="navVal == 4" class="top-bg"></image>
		<view class="category-page-content">
			<view class="indexContain ">
				<image src="../../../static/images/icons/category/img_bg_0.png" v-if="navVal == 1" class="top-bg"></image>
				<image src="../../../static/images/icons/category/img_bg_1.png" v-if="navVal == 2" class="top-bg"></image>
				<image src="../../../static/images/icons/category/img_bg_2.png" v-if="navVal == 3" class="top-bg"></image>
				<image src="../../../static/images/icons/category/img_bg_3.png" v-if="navVal == 4" class="top-bg"></image>
				<view class="navbg">
					<view class="searchPart" @tap="focusIn">
						<view class="search-icon"></view>
						<input type="text" placeholder="搜索商品、品牌" disabled="disabled" />
					</view>
				</view>
				<view class="indexTab">
					<view class="category-nav-view">
						<view class="category-nav-coll" @tap="changeCategory(1)" :class="{ active: navVal == 1 }">
							<view class="icon_category mask_selected icon"></view>
							<view class="text">面膜馆</view>
						</view>
						<view class="category-nav-coll" @tap="changeCategory(2)" :class="{ active: navVal == 2 }">
							<view class="icon_category gehu_selected icon"></view>
							<view class="text">护肤馆</view>
						</view>
						<view class="category-nav-coll" @tap="changeCategory(3)" :class="{ active: navVal == 3 }">
							<view class="icon_category yingji_selected icon"></view>
							<view class="text">应季馆</view>
						</view>
						<view class="category-nav-coll" @tap="changeCategory(4)" :class="{ active: navVal == 4 }">
							<view class="icon_category xixie_selected icon"></view>
							<view class="text">洗卸馆</view>
						</view>
					</view>
				</view>
			</view>

			<view class="content ">
				<view class="radiusWrap">
					<swiper class="swiper" indicator-dots="true" autoplay="true" circular="1" indicator-active-color="#ffffff" :current="current" @change="currentChange">
						<swiper-item v-for="(banner, key) in bannerList" :key="key" @tap="goPage(banner.url)">
							<view class="swiper-item"><image class="image" :src="banner.img" mode=""></image></view>
						</swiper-item>
					</swiper>
				</view>

				<view class="hotGood">
					<!-- :style="styleHot" -->
					<view class="page-section-spacing">
						<view class="hotTitle">热销尖货</view>
						<swiper
							class="swiper"
							:indicator-dots="true"
							autoplay="true"
							:circular="true"
							:interval="5000"
							:duration="500"
							indicator-color="#BFBFBF"
							indicator-active-color="#FF3366"
						>
							<swiper-item class="hot-view">
								<block v-for="(hot, hotKey) in hotGoodsList" :key="hotKey">
									<carGoodsSwiper v-if="hotKey <= 2" :goods="hot.goodsInfo" @change="getUserBuy"></carGoodsSwiper>
								</block>
							</swiper-item>
							<swiper-item class="hot-view">
								<block v-for="(hot, hotKey) in hotGoodsList" :key="hotKey">
									<carGoodsSwiper v-if="hotKey > 2 && hotKey <= 5" :goods="hot.goodsInfo" @change="getUserBuy"></carGoodsSwiper>
								</block>
							</swiper-item>
							<swiper-item class="hot-view">
								<block v-for="(hot, hotKey) in hotGoodsList" :key="hotKey">
									<carGoodsSwiper v-if="hotKey > 5" :goods="hot.goodsInfo" @change="getUserBuy"></carGoodsSwiper>
								</block>
							</swiper-item>
						</swiper>
					</view>
					<view class="page-section-spacing maskWrapper">
						<view class="hotTitle" :class="{ isActive: navVal == 1 }">面膜馆榜单</view>
						<view class="hotTitle" :class="{ isActive: navVal == 2 }">护肤馆榜单</view>
						<view class="hotTitle" :class="{ isActive: navVal == 3 }">应季馆榜单</view>
						<view class="hotTitle" :class="{ isActive: navVal == 4 }">洗卸馆榜单</view>
						<view class="body">
							<view class="swiper-item-col3" v-for="(topItem, ti) in topGoodsList" :key="ti" :class="{ last: ti === topGoodsList.length - 1 }">
								<view class="img-box" @tap="goDetail(topItem.goodsInfo.goodsId)">
									<text class="fl_icon" :class="'fl_icon' + ti"></text>
									<image class="image" :src="topItem.goodsInfo.thumb" alt=""></image>
								</view>
								<view class="info-box">
									<view class="goodName small">{{ topItem.goodsInfo.goodsName }}</view>
									<view class="price">
										<view class="goodPrice">¥{{ topItem.goodsInfo.goodsPrice }}</view>
										<view class="icon_category_shopping goodcar" @tap="getUserBuy(topItem)"></view>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="page-section-spacing better">
						<view class="hotTitle">优选品牌</view>
						<view class="brand">
							<view class="brand-item" v-for="(bitem, bi) in brandList" :key="bi" :class="{ mr: (bi + 1) % 4 == 0, mb: bi > 3 }" @tap="goBrandIndex(bitem.brandId)">
								<image class="image" :src="bitem.img" alt=""></image>
							</view>
						</view>
					</view>
					<view class="page-section-spacing solt">
						<view class="soltTitle">精选分类</view>
						<view class="soltMark">
							<text class="keyword" v-for="(kitem, ki) in keywordsList" :key="ki" @tap="goGoodsListSearch(kitem)">{{ kitem }}</text>
						</view>
					</view>
				</view>

				<!-- 为您推荐 -->
				<view class="share-goods">
					<view class="proRecommend">
						<view class="proReHead">为您推荐</view>
						<view class="proReCon"><index-goods-list :goodslist="goodslist" @productDetail="goDetail" @change="getUserBuy"></index-goods-list></view>
						<view class="loadingText"><image class="image" src="../../../static/images/loading/loading.gif" mode=""></image></view>
					</view>
				</view>

				<!-- 已经到底了 -->
				<text class="lock-end" v-if="totalCount == goodslist.length">已经到底了</text>

				<min-nav :isScroll="showTop" @change="backToTop"></min-nav>

				<!-- 购物车窗口 -->
				<block v-if="showCart"><buy-popup :show="showCart" :datas="goodInfo" @close="closeCart" @sure="addCart"></buy-popup></block>
			</view>
		</view>
	</view>
</template>

<script>
import minNav from '@/components/min-nav/min-nav.vue';
import indexGoodsList from '@/components/goods-list/index-goods-list.vue';
import carGoodsSwiper from './cat-goods-swiper.vue';
import buyPopup from '@/components/buy-popup/buy-popup.vue';
export default {
	components: {
		minNav,
		indexGoodsList,
		carGoodsSwiper,
		buyPopup
	},
	data() {
		return {
			current: 0,
			old: {
				current: 0
			},
			showTop: false,
			navVal: 1,
			keywords: '',
			//
			bannerList: [],
			brandList: [],
			hotGoodsList: [],
			keywordsList: [],
			topGoodsList: [],
			//
			catId: '',
			// cid
			cid: '',
			// 商品列表参数
			pages: 0,
			totalCount: 0,
			goodslist: [],
			loadingText: '',
			showCart: false,
			goodInfo: {}
		};
	},
	onLoad(params) {
		let { cid } = params;
		this.cid = cid || 1;
		this.changeCategory(1);
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
	methods: {
		backToTop() {
			uni.pageScrollTo({ scrollTop: 0, duration: 10 });
		},
		currentChange(e) {
			this.old.current = e.detail.current;
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
		goBrandIndex(brandId) {
			this.goPage(`/pages/goods/brandDetail/brandDetail?brandId=${brandId}`);
		},
		goGoodsListSearch(keyword) {
			this.goPage(`/pages/goods/list/list?keywords=${keyword}`);
		},
		goPage(urlPath) {
			this.$api.goNavigateTo(urlPath);
		},
		// 去商品详情页
		goDetail(id) {
			this.$api.goNavigateTo(`/pages/goods/product/product?goodsId=${id}`);
		},
		async changeCategory(typeId) {
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 100
			});
			this.current = this.old.current;
			this.$nextTick(function() {
				this.current = 0;
			});
			let that = this;
			that.cid = typeId;
			that.navVal = typeId;
			await that.getCategory_gallery(typeId);
			that.pages = 0;
			that.goodslist = [];
			await that.getGoodsList(that.catId);
		},
		async getCategory_gallery(id) {
			let vm = this;
			let res = await this.$api.request({
				method: 'GET',
				url: `${this.$api.categoryGallery}?id=${id}`
			});
			if (res && res.code == 0) {
				let data = res.data;
				vm.bannerList = data.bannerList;
				vm.brandList = data.brandList;
				vm.hotGoodsList = data.hotGoodsList;
				vm.keywordsList = data.keywordsList;
				vm.topGoodsList = data.topGoodsList;
				vm.catId = data.catId;
			}
		},
		// 获取商品列表
		getMoreGoods() {
			if (this.totalCount !== this.goodslist.length) {
				this.getGoodsList();
			}
		},
		async getGoodsList(catId) {
			let that = this;
			that.pages++;
			that.loadingText = true;
			that.catId = catId ? catId : that.catId;
			let res = await this.$api.request({
				url: this.$api.getGoodsList,
				data: {
					page: that.pages,
					pageSize: 10,
					catId: that.catId
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
			// this.$http({
			// 	method: 'GET',
			// 	url: this.$api.getGoodsList,
			// 	data: {
			// 		page: that.pages,
			// 		pageSize: 10,
			// 		catId: that.catId
			// 	},
			// 	success: function(res) {
			// 		if (res && res.data) {
			// 			let list = res.data.goodsList;
			// 			that.totalCount = res.data.totalCount;
			// 			for (let t = 0; t < list.length; t++) {
			// 				let goodsPrice = list[t].goodsInfo.goodsPrice;
			// 				let array = goodsPrice.split('.');
			// 				list[t].big = array[0];
			// 				list[t].min = array[1];
			// 			}
			// 			that.goodslist = that.goodslist.concat(list);
			// 		}
			// 		that.loadingText = false;
			// 	},
			// 	fail: function(res) {
			// 		that.loadingText = false;
			// 	}
			// });
		},
		focusIn() {
			let that = this;
			let _url = that.keywords ? `../../search/search?keywords=${that.keywords}` : '../../search/search';
			that.$api.goNavigateTo(_url);
		}
	}
};
</script>

<style lang="less">
//@import url('../../index/less/index.less');
@import url('./category.less');
</style>
