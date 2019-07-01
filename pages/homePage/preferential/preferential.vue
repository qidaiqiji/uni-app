<template>
	<view class="cheap-page">
		<!-- 页面级锁定 -->
		<!-- <scroll-view :style="{ height: scrollHeight + 'px' }" :scroll-y="scrollY" :scroll-top="scrollBox" @scroll="scrollView"> -->
		<!--特惠专场 banner -->
		<view class="cheapWrapper">
			<view class="cheapHead">
				<view class="s30_icons s30_cheap_remind end-time">
					<text>仅剩</text>
					<text class="mark">{{ day }}</text>
					<text class="day">天</text>
					<text class="restTime">{{ hour }}:{{ minute }}:{{ seconds }}</text>
				</view>
				<view class="s30_icons s30_cheap_return allcheap" @tap="changeHide()">
					<text class="text">全部特惠</text>
				</view>
			</view>
			<view class="cheapbanner">
				<!-- <view class="mark"><view>必备</view><view>补货</view></view> -->
				<view class="banner-image"><image class="image" :src="pageInfo.img" mode="" style="height: 300upx;"></image></view>
				<view class="cheapText">
					<text class="blackWord">{{ pageInfo.name }}</text>
					<text class="redWord">{{ pageInfo.sellingPoint }}</text>
				</view>
			</view>
		</view>
		<view class="cheapEmpty"></view>

		<view class="cheapContent">
			<!-- 立即抢购 立即领券-->
			<view class="ticket">
				<view class="img-box" v-for="(adsit, aindex) in ads" :key="aindex" @tap="goPage(adsit.url)" :class="{ last: aindex == ads.length - 1 }">
					<image class="image" :src="adsit.img" mode=""></image>
				</view>
			</view>

			<!-- 为你推荐 -->
			<view class="introduce">
				<view class="title-box">
					<text class="title">为你推荐</text>
					<text class="first text">低价</text>
					<text class="text">必备</text>
					<text class="text">首选</text>
				</view>
				<view class="intrList">
					<view class="intrList-item" v-for="(goods, goodsKey) in goodsList" :key="goodsKey">
						<view class="goods-detail" @tap="goGoodsDetail(goods.goodsInfo.goodsId)">
							<view class="img-box">
								<image class="image" :src="goods.goodsInfo.thumb" mode=""></image>
								<view class="list-video" v-if="goods.isVideoTag"></view>
							</view>
							<view class="info-box">
								<view class="hidden-text goods-name">{{ goods.goodsInfo.goodsName }}</view>
								<view class="act-data"><image class="image" v-if="goods.actData.url" :src="goods.actData.url" mode=""></image></view>
							</view>
						</view>
						<view class="buy-box">
							<view class="price">
								<view class="price_ident">¥</view>
								<view class="price_number">{{ goods.big }}</view>
								<view class="price_mantissa">{{ goods.min }}</view>
							</view>
							<text class="tag discount">{{ goods.goodsInfo.discount }}折</text>
							<view class="icon_cheap_shop_white buycar" @tap="getUserBuy(goods)"></view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 已经到底了v-if="lockend" -->
		<text class="lock-end">已经到底了</text>

		<!-- 全部特惠 -->
		<view class="allcheapR" v-if="scrollTop > 99" @tap="changeHide()">
			<view class="ls-text">全</view>
			<view class="ls-text">部</view>
			<view class="ls-text">特</view>
			<view class="ls-text">惠</view>
			<view class="s-icon-left"></view>
		</view>

		<!-- 特惠专场直达 :style="{ height: cheapNavHeight + 'px' }" -->
		<view class="mask" v-show="show" @tap="changeHide(1)" @touchmove.stop.prevent="moveHandle">
			<view class="cheapNav" @touchmove.stop.prevent="moveHandle">
				<view class="return" @tap="changeHide(1)"></view>
				<view class="big-title">特惠专场直达</view>
				<view class="menu-list">
					<!-- <scroll-view class="scroll-body" scroll-y="true" @touchmove.stop.prevent="moveHandle"> -->
						<block v-for="(menu, mindex) in menus" :key="mindex">
							<view class="menu-item" :class="{ active: pageId == menu.pageId }" @tap="loadNewCheap(menu.pageId)">
								<text class="title">{{ menu.name }}</text>
								<text class="detail">{{ menu.sellingPoint }}</text>
							</view>
						</block>
					<!-- </scroll-view> -->
				</view>
			</view>
		</view>
		<!-- </scroll-view> -->

		<!-- Mini Nav -->
		<min-nav :isScroll="showTop" @change="backToTop"></min-nav>

		<!-- 购物车窗口 -->
		<block v-if="showCart"><buy-popup :show="showCart" :datas="goodInfo" @close="closeCart" @sure="addCart"></buy-popup></block>
	</view>
</template>

<script>
import { getEndTime } from '@/common/util.js';
import minNav from '@/components/min-nav/min-nav.vue';
import buyPopup from '@/components/buy-popup/buy-popup.vue';
export default {
	components: {
		minNav,
		buyPopup
	},
	data() {
		return {
			lockend: false,
			// 锁定页面参数
			scrollY: true,
			scrollBox: 0,
			scrollHeight: 1000,
			//
			cheapNavHeight: 1000,
			showTop: false,
			scrollTop: 0,
			show: false,
			pageId: '',
			// 服务器数据
			ads: [],
			goodsList: [],
			menus: [],
			pageInfo: [],
			showCart: false,
			goodInfo: {},
			// 定时器
			clock: null,
			time: 0,
			// 倒计时使用参数
			day: '00',
			hour: '00',
			minute: '00',
			seconds: '00'
		};
	},
	onLoad(params) {
		let res = uni.getSystemInfoSync();
		this.scrollHeight = res.windowHeight;
		// console.log(JSON.stringify(res));
		this.cheapNavHeight = res.windowHeight;//-res.statusBarHeight;//Math.ceil(res.windowHeight*0.8);
		if (params.pageId) {
			this.pageId = params.pageId;
		}
		this.getActpageView(this.pageId);
	},
	onShow() {
		if (this.time) {
			this.startClock();
		}
	},
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
			this.scrollY = false;
		},
		closeCart() {
			this.showCart = false;
			this.scrollY = true;
		},
		changeHide(val) {
			if (val) {
				this.show = false;
				this.scrollY = true;
			} else {
				this.show = true;
				this.scrollY = false;
			}
		},
		// 去商品详情页
		goGoodsDetail(id) {
			this.$api.goNavigateTo(`../../goods/product/product?goodsId=${id}`);
		},
		loadNewCheap(pageId) {
			let that = this;
			that.changeHide(1);
			that.pageId = pageId;
			that.getActpageView(pageId);
		},
		async getActpageView(pageId) {
			let that = this;
			that.lockend = false;
			let res = await this.$api.request({
				method: 'GET',
				url: `${this.$api.getActpageView}?pageId=${pageId}`
			});
			if (res && res.data) {
				let { ads, goodsList, menus, pageInfo } = res.data;
				that.ads = ads;
				that.menus = menus;
				that.pageInfo = pageInfo;
				that.time = pageInfo.endTime;
				let _array = goodsList.map(e => {
					let goodsPrice = e.goodsInfo.goodsPrice;
					let array = goodsPrice.split('.');
					e.big = array[0];
					e.min = '.' + array[1];
					return e;
				});
				that.goodsList = [].concat(_array);

				if (that.time) {
					that.startClock();
				}
			} else {
				this.$api.showMessage(res.msg);
			}
			that.lockend = true;
		},
		startClock() {
			if (this.clock) {
				clearInterval(this.clock);
			}
			let time = this.time;
			this.getSetDownTime(time);
			this.clock = setInterval(() => {
				this.getSetDownTime(time);
			}, 1000);
		},
		getSetDownTime(val) {
			let end = getEndTime(val, 'all');
			this.day = end.day;
			this.hour = end.hour;
			this.minute = end.minute;
			this.seconds = end.seconds;
		},
		goPage(urlPath) {
			this.$api.goNavigateTo(urlPath);
		},
		scrollView(event) {
			// let { scrollTop } = event.detail;
			let { scrollTop } = event;
			if (scrollTop <= 50 && this.showTop) {
				this.showTop = false;
				this.scrollTop = 0;
			} else if (scrollTop >= 100 && !this.showTop) {
				this.showTop = true;
				this.scrollTop = 100;
			}
		},
		clearPage() {
			if (this.clock) {
				clearInterval(this.clock);
			}
			this.clock = null;
		},
		moveHandle(){}
	},
	onPageScroll(event) {
		this.scrollView(event);
	},
	onUnload() {
		this.clearPage();
	},
	onHide() {}
};
</script>

<style lang="less">
@import url('cheap.less');
</style>
