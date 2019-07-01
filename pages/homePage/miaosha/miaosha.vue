<template>
	<view class="flashSale-page">
		<!-- 页面级锁定 -->
		<!-- <scroll-view :style="{ height: scrollHeight + 'px' }" :scroll-y="scrollY" :scroll-top="scrollBox" @scroll="scrollView"> -->
		<view class="top-container">
			<view class="fs-header">
				<view class="fs-goods-ls">
					<view class="page-section swiper">
						<swiper class="swiper" indicator-dots="true" indicator-active-color="#cccccc" :autoplay="true" interval="5000" duration="500" circular="1">
							<swiper-item v-for="(item, hotKey) in hotGoods" :key="hotKey" @tap="goDetail(item.goodsId)">
								<view class="fs-top-goods">
									<view class="img-box">
										<view class="tips">
											<image class="image" src="../../static/images/index/img_tag.png" mode=""></image>
											<text class="text">必抢</text>
										</view>
										<image class="image" :src="item.thumb" mode=""></image>
									</view>
									<view class="info-box">
										<view class="title">{{ item.goodsName }}</view>
										<view class="titleDesc">{{ item.desc }}</view>
										<view class="foot">
											<view class="price-box">
												<text class="i i0">¥</text>
												<view class="i i1">{{ item.big }}</view>
												<view class="i i2">.{{ item.min }}</view>
											</view>
											<view class="line-through">
												<text>¥{{ item.marketPrice }}</text>
											</view>
											<view class="botton-box">
												<view class="text">
													<view class="icon_fire text2">已抢{{ item.salesCount }}件</view>
												</view>
											</view>
										</view>
									</view>
								</view>
							</swiper-item>
						</swiper>
					</view>
				</view>
			</view>
			<view class="fs-fixed-box" :class="{ 'locked-fixed-time': lockTop }">
				<view class="nav-box">
					<view class="nav-box-coll br" :class="{ active: nav == 1 }" @tap="getNavGoodsList(1)">正在进行中</view>
					<view class="nav-box-coll" :class="{ active: nav == 2 }" @tap="getNavGoodsList(2)">即将开始</view>
				</view>
				<view class="nav-time-box">
					<text class="nav-time-box-coll">{{ nav > 1 ? '距开始' : '距结束' }}：</text>
					<text class="nav-time-box-coll day">{{ day }}天</text>
					<text class="nav-time-box-coll hour-min-timer">{{ hour }}:{{ minute }}:{{ seconds }}</text>
				</view>
			</view>
		</view>

		<view class="fs-star-box" v-if="nav == 1">
			<image class="image" src="../../static/images/s44/fashsale_star.png" alt=""></image>
			<text class="text">正在秒杀</text>
		</view>
		<view class="fs-star-box" v-if="nav == 2">
			<image class="image" src="../../static/images/s44/fashsale_clock.png" alt=""></image>
			<text class="text">即将开抢</text>
		</view>

		<view class="fs-goods-ls start">
			<view class="cell" v-for="(item, goodsKey) in goodsList" :key="goodsKey">
				<view class="img-box" @tap="goDetail(item.goodsInfo.goodsId)"><image class="image" :src="item.goodsInfo.thumb" mode=""></image></view>
				<view class="info-box">
					<view class="title" @tap="goDetail(item.goodsInfo.goodsId)">{{ item.goodsInfo.goodsName }}</view>
					<view class="titleDesc" @tap="goDetail(item.goodsInfo.goodsId)">{{ item.desc }}</view>
					<view class="foot">
						<view class="price-box" @tap="goDetail(item.goodsInfo.goodsId)">
							<text class="i i0">¥</text>
							<view class="i" v-if="nav == 1">
								<view class="i i1">{{ item.big }}</view>
								<view class="i i2">.{{ item.min }}</view>
								<view class="fs-tag tag-box">
									<text class="tag-arrow">{{ item.price.discount }}折</text>
								</view>
							</view>
							<view class="i" v-if="nav == 2"><view class="i i1">???</view></view>
						</view>
						<view class="line-through">
							<text>¥{{ item.price.marketPrice }}</text>
						</view>
					</view>
					<view class="botton-box" v-if="nav == 1">
						<text class="botton" @tap="getUserBuy(item)">马上抢</text>
						<text class="text">已抢{{ item.goodsInfo.salesCount }}件</text>
					</view>
					<view class="botton-box" v-if="nav == 2">
						<text class="botton botton2" @tap="goDetail(item.goodsInfo.goodsId)">即将开始</text>
						<text class="text">已抢{{ item.goodsInfo.salesCount }}件</text>
					</view>
				</view>
			</view>
		</view>

		<text class="lock-end" v-if="goodsList.length > 0">已经到底了</text>
		<!-- </scroll-view> -->

		<min-nav :isScroll="showTop" @change="backToTop"></min-nav>
		<!-- 购物车窗口 -->
		<block v-if="showCart"><buy-popup :show="showCart" :datas="goodInfo" @close="closeCart" @sure="addCart"></buy-popup></block>
	</view>
</template>

<script>
import minNav from '@/components/min-nav/min-nav.vue';
import buyPopup from '@/components/buy-popup/buy-popup.vue';
import { getEndTime } from '@/common/util.js';
export default {
	components: {
		minNav,
		buyPopup
	},
	data() {
		return {
			nav: 1,
			// 锁定页面参数
			scrollY: true,
			scrollBox: 0,
			scrollHeight: 1000,
			//
			showTop: false,
			lockTop: false,
			goodsList: [],

			// 服务器接口参数
			endDate: '',
			hotGoods: {},
			notStartGoodsList: [],
			startDate: '',
			startGoodsList: [],
			showCart: false,
			goodInfo: {},

			// 倒计时使用参数
			day: '00',
			hour: '00',
			minute: '00',
			seconds: '00',

			clock: null,
			access_token: ''
		};
	},
	onLoad() {
		let res = uni.getSystemInfoSync();
		this.scrollHeight = res.windowHeight;
		this.access_token = uni.getStorageSync('access_token') || '';
		this.getFlashSaleList();
	},
	onShow() {
		let time = this.nav > 1 ? this.startDate : this.endDate;
		if (time) {
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
		// 去商品详情页
		goDetail(goodsId) {
			this.$api.goNavigateTo(`../../goods/product/product?goodsId=${goodsId}`);
		},
		// 拆分商品价格
		splitPrice(price, e) {
			if (!price) {
				return e;
			}
			let array = price.split('.');
			e.big = array[0];
			e.min = array[1];
			return e;
		},
		// 获取秒杀列表
		async getFlashSaleList() {
			let that = this;
			let res = await this.$api.request({
				url: this.$api.flash_sale_new
			});
			if (res.code == 0 && res.data) {
				let { endDate, hotGoods, notStartGoodsList, startDate, startGoodsList } = res.data.flashSaleList;

				hotGoods = hotGoods.map(e => {
					let price = e.goodsPrice;
					return that.splitPrice(price, e);
				});

				startGoodsList = startGoodsList.map(e => {
					let price = e.price.goodsPrice;
					return that.splitPrice(price, e);
				});

				notStartGoodsList = notStartGoodsList.map(e => {
					let price = e.price.goodsPrice;
					return that.splitPrice(price, e);
				});

				that.endDate = endDate;
				that.hotGoods = hotGoods;
				that.notStartGoodsList = notStartGoodsList;
				that.startDate = startDate;
				that.startGoodsList = startGoodsList;
				that.goodsList = startGoodsList;
				that.startClock();
			}
		},
		startClock() {
			if (this.clock) {
				clearInterval(this.clock);
			}
			let tiem = this.nav > 1 ? this.startDate : this.endDate;
			this.getSetDownTime(tiem);
			this.clock = setInterval(() => {
				this.getSetDownTime(tiem);
			}, 1000);
		},
		getSetDownTime(val) {
			let end = getEndTime(val, 'all');
			this.day = end.day;
			this.hour = end.hour;
			this.minute = end.minute;
			this.seconds = end.seconds;
		},
		getNavGoodsList(val) {
			this.nav = val;
			this.startClock();
			this.goodsList = val > 1 ? this.notStartGoodsList : this.startGoodsList;
			let top = uni.upx2px(304 + 24);
			if (this.lockTop) {
				// this.scrollBox = top + (Math.random() > 0.5 ? 1 : 2);
				uni.pageScrollTo({ scrollTop: top, duration: 10 });
			}
		},
		scrollView(event) {
			let { scrollTop } = (event && event.detail) || event;
			let _top = uni.upx2px(304 + 24);
			if (scrollTop < _top && this.lockTop) {
				this.lockTop = false;
				this.showTop = false;
			}
			if (scrollTop >= _top && !this.lockTop) {
				this.lockTop = true;
				this.showTop = true;
			}
		},
		scrollTop() {
			this.scrollBox = 0 + (Math.random() > 0.5 ? 1 : 2);
		},
		clearPage() {
			if (this.clock) {
				clearInterval(this.clock);
			}
			this.clock = null;
		}
	},
	onPageScroll(event) {
		this.scrollView(event);
	},
	onUnload() {
		this.clearPage();
	},
	onHide() {},
	destory() {}
};
</script>

<style lang="less">
@import url('less/flashSale.less');
@import url('less/fs-goods-ls.less');

/* #ifdef H5 */
.locked-fixed-time{
	top: 44px;
}
/* #endif */
</style>
