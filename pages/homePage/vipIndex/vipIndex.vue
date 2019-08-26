<template>
	<view class="pages svip-page" :class="{ 'locked-pages': rulePops }">
		<view class="search-box" style="display:none;"></view>

		<view class="svip-header">
			<view class="nav">
				<view class="nav-item">
					<view class="bl image" @click="goPointerVip()"><image class="image" src="../../../static/images/svip/icon_vipshop@2x.png" mode="widthFix"></image></view>
					<text class="bl text">贵宾商品</text>
				</view>
				<view class="nav-item">
					<view class="bl image"><image class="image" src="../../../static/images/svip/icon_vipservice@2x.png" mode="widthFix"></image></view>
					<text class="bl text">专属客服</text>
				</view>
				<view class="nav-item">
					<view class="bl image" @click="showPop('rulePops')"><image class="image" src="../../../static/images/svip/icon_rule@2x.png" mode="widthFix"></image></view>
					<text class="bl text">贵宾规则</text>
				</view>
			</view>

			<view class="vip-banner">
				<view class="swiper-box">
					<view class="uni-padding-wrap">
						<view class="page-section swiper">
							<view class="page-section-spacing">
								<swiper class="swiper" :indicator-dots="true" :autoplay="false" :interval="5000" :duration="500" indicator-active-color="#ffffff" :circular="true">
									<swiper-item v-for="(banner, bannerKey) in bannerList" :key="bannerKey" @tap="goPage(banner.url)">
										<view class="swiper-item"><image class="image" :src="banner.img" mode=""></image></view>
									</swiper-item>
								</swiper>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="category-title"><image class="img" src="../../../static/images/svip/img_item@2x.png" mode=""></image></view>

		<view class="svip-nav">
			<view class="nav" v-for="(ads, adsIndex) in adList" :key="adsIndex" :class="['nav' + adsIndex]" @click="goPage(ads.url)">
				<image class="image" :src="ads.img" mode=""></image>
			</view>
		</view>

		<view class="svip-simple-box">
			<view class="item">
				<image class="bg-image" src="../../../static/images/svip/img_vipbg1@2x.png" mode=""></image>
				<view class="content">
					<view class="head">
						<text class="bl title">明星单品</text>
						<text class="bl desc">VIP都在看的爆款</text>
					</view>
					<view class="goods-list">
						<view class="goods-item" v-for="(star, starKey) in starList" :key="starKey">
							<view class="" @click="goDetail(star.goodsInfo.goodsId)">
								<view class="goods-img"><image class="image" :src="star.goodsInfo.thumb" mode="" alt=""></image></view>
								<view class="goods-info">
									<view class="texts title">{{ star.goodsInfo.goodsName }}</view>
									<text class="save_price">立省{{ star.goodsInfo.savePrice }}元</text>
									<view class="vip_price">
										<text class="sb">￥</text>
										<text class="sb_price">{{ star.goodsInfo.goodsPrice }}</text>
									</view>
									<view class="vip_icon"></view>
								</view>
							</view>
							<view class="icon_user_buy" @tap="getUserBuy(star)"></view>
						</view>
					</view>
				</view>
			</view>

			<view class="item">
				<image class="bg-image" src="../../../static/images/svip/img_mendian@2x.png" mode=""></image>
				<view class="content">
					<view class="head">
						<text class="bl title">门店必备</text>
						<text class="bl desc">当季大赏 特惠狂欢</text>
					</view>
					<view class="goods-list">
						<view class="goods-item" v-for="(bibei, bibeiKey) in bibeiList" :key="bibeiKey">
							<view class="" @click="goDetail(bibei.goodsInfo.goodsId)">
								<view class="goods-img"><image class="image" :src="bibei.goodsInfo.thumb" mode="" alt=""></image></view>
								<view class="goods-info">
									<view class="texts title">{{ bibei.goodsInfo.goodsName }}</view>
									<text class="save_price">立省{{ bibei.goodsInfo.savePrice }}元</text>
									<view class="vip_price">
										<text class="sb">￥</text>
										<text class="sb_price">{{ bibei.goodsInfo.goodsPrice }}</text>
									</view>
									<view class="vip_icon"></view>
								</view>
							</view>
							<view class="icon_user_buy" @tap="getUserBuy(bibei)"></view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- <text ref="pointerVip"></text> -->
		<text id="pointerVip"></text>
		<view class="category-title"><image class="img" src="../../../static/images/svip/img_zhuanshuyouhui@2x.png" mode=""></image></view>

		<view class="svip-goods">
			<goods-list :list="goodslist" type="svip" @detail="gotoDetial" @change="getUserBuy"></goods-list>
			<view class="loadingText"><image class="image" src="../../../static/images/loading/loading.gif" mode=""></image></view>
		</view>

		<toast-popup :show="rulePops" @close="hidePop">
			<view class="vipRules">1.贵宾专区产品不再参加任何活动</view>
			<view class="vipRules">2.贵宾专区均为直发商品，享满额包邮</view>
			<view class="vipRules">3.VIP价仅在贵宾专区内结算享受</view>
		</toast-popup>

		<!-- loading -->
		<min-nav :isScroll="showTop" @change="backToTop"></min-nav>

		<!-- 购物车窗口 -->
		<block v-if="showCart"><buy-popup :show="showCart" :datas="goodInfo" @close="closeCart" @sure="addCart"></buy-popup></block>
	</view>
</template>

<script>
import goodsList from '@/components/goods-list/vipGoods-list.vue';
import toastPopup from '@/components/toast-popup/toast-popup2.vue';
import minNav from '@/components/min-nav/min-nav.vue';
import buyPopup from '@/components/buy-popup/buy-popup.vue';
export default {
	components: {
		goodsList,
		toastPopup,
		minNav,
		buyPopup
	},
	data() {
		return {
			// 轮播图片的样式
			imageSt: {
				width: '702upx',
				height: '314upx',
				borderRadius: '20upx'
			},
			// offsetTop
			offsetTop: 0,
			showTop: false,
			popupText: '',
			rulePops: false,
			//
			adList: [],
			bannerList: [],
			bibeiList: [],
			starList: [],
			goodslist: [],
			pages: 0,
			showCart: false,
			goodInfo: {},
			access_token: ''
		};
	},
	onLoad() {
		uni.pageScrollTo({ scrollTop: 0, duration: 1 });
		this.access_token = uni.getStorageSync('access_token') || '';
		this.getVipData();
		this.getGoodsList();
	},
	onShow() {},
	onReady() {
		let that = this;
		setTimeout(function() {
			let view = uni.createSelectorQuery().selectAll('#pointerVip');
			view.boundingClientRect(data => {
				let _top = data && data[0] && data[0].top;
				that.offsetTop = _top;
			}).exec();
		}, 1000);
	},
	onUnload() {},
	onPageScroll(event) {
		let { scrollTop } = event;
		if (scrollTop < 600 && this.showTop) {
			this.showTop = false;
		} else if (scrollTop > 600 && !this.showTop) {
			this.showTop = true;
		}
	},
	onReachBottom() {
		this.getMoreGoods();
	},
	methods: {
		backToTop() {
			uni.pageScrollTo({ scrollTop: 0, duration: 10 });
		},
		async addCart(data) {
			let that = this;
			let res = await this.$api.request({
				method: 'POST',
				header: true,
				url: this.$api.cartAdd,
				data: data
			});
			if (res.code == 0) {
				that.$store.commit('updateCart', res.data.totalCount);
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
		async getVipData() {
			let that = this;
			let res = await that.$api.request({
				url: `${this.$api.getVipIndex}?userRank=4`
			});
			if (res && res.data) {
				let _res = res.data;
				that.adList = _res.adList;
				that.bannerList = _res.bannerList;
				that.bibeiList = _res.bibeiList;
				that.starList = _res.starList;
			} else {
				that.$api.showMessage(res.msg);
			}
		},
		//去商品详情页
		gotoDetial(id) {
			this.$api.goNavigateTo(`../../goods/product/product?goodsId=${id}&&userRank=4`);
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
			that.loadingText = '加载中...';
			let res = await this.$api.request({
				url: this.$api.getGoodsList,
				data: {
					page: that.pages,
					pageSize: 10,
					userRank: 4
				}
			});
			if (res && res.data) {
				that.totalCount = res.data.totalCount;
				let list = res.data.goodsList;
				for (let t = 0; t < list.length; t++) {
					let goodsPrice = list[t].goodsInfo.goodsPrice;
					let array = goodsPrice.split('.');
					list[t].big = array[0];
					list[t].min = array[1];
				}
				that.goodslist = that.goodslist.concat(list);
			}
			that.loadingText = '';
		},
		showPop(type) {
			this[type] = true;
		},
		hidePop() {
			this.rulePops = false;
		},
		goPage(urlPath) {
			this.$api.goNavigateTo(urlPath);
		},
		goDetail(goodsId) {
			let url = `../../goods/product/product?goodsId=${goodsId}&userRank=4`;
			this.$api.goNavigateTo(url);
		},
		goPointerVip() {
			let _top = this.offsetTop;
			uni.pageScrollTo({ scrollTop: _top, duration: 10 });
		}
	}
};
</script>

<style lang="less">
@import url('./svip.less');

.vipRules {
	font-size: 24upx;
	font-weight: 500;
	color: rgba(136, 150, 150, 1);
	line-height: 50upx;
}
</style>
