<template>
	<view class="indexContain">
		<!-- <view class="orderList">
			<view class="lastCon" :class="{ anim: animate == true }">
				<view class="itemOrder" v-for="(orderItem, index) in lastOrderInfo" :key="index">
					<text class="icon"></text>
					<text class="textDesc">{{ orderItem }}</text>
				</view>
			</view>
		</view> -->
		<view class="searchPart">
			<view class="search" @tap="focusIn">
				<text class="search-icon"></text>
				<input type="text" placeholder="采购商品、品牌" v-model="keywords" disabled="disabled" />
			</view>
		</view>

		<keep-alive>
			<view class="indexContent">
				<view class="imgSlide">
					<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="5000" :duration="500" :circular="true" indicator-active-color="#fff">
						<block v-for="(bitem, bindex) in bannerList" :key="bindex">
							<swiper-item @tap="nextPage(bitem.url)">
								<view class="swiper-item"><image class="img" :src="bitem.img" mode=""></image></view>
							</swiper-item>
						</block>
					</swiper>
				</view>

				<view class="indexTab" v-show="category">
					<view class="view-cell">
						<view class="view-cell-child" v-for="(nav, categoryindex) in category" :key="categoryindex" @tap="nextPage(nav.url)">
							<text class="icon" :style="{ backgroundImage: 'url(' + nav.icon + ')' }"></text>
							<text class="name">{{ nav.title }}</text>
						</view>
					</view>
				</view>
				<view style="{width: 100%,height:200px,textAlign:center,lineHeight:200px}"  class="linshi" @tap="linshi" >
					临时入口
				</view>
				<view class="vipArea" v-if="isVip" @tap="nextPage('../homePage/vipIndex/vipIndex')">
					<image class="image" src="../../static/images/index/homepage_vip.png" mode="widthFix"></image>
				</view>

				<view class="goToShopper">
					<view class="firstImg sameImg" v-for="(midAdsitem, midindex) in midAds" :key="midindex" @tap="nextPage(midAdsitem.url)">
						<image class="img" :src="midAdsitem.img" alt=""></image>
					</view>
				</view>

				<!-- 限时秒杀 -->
				<view class="secLimit" v-if="getFlashSales">
					<view class="limitSecCon">
						<view class="limitSecHead">
							<view class="limitHeadLeft">
								<view class="limitLeftText">
									<text class="text">{{ day }}</text>
									天
									<text class="text">{{ hour }}</text>
									时
									<text class="text">{{ minute }}</text>
									分
									<text class="text">{{ seconds }}</text>
									秒
								</view>
							</view>
							<view class="limitHeadRight " @tap="nextPage('../homePage/miaosha/miaosha')"><view class="more">更多</view></view>
						</view>
						<view class="limitCont" @tap="nextPage('../homePage/miaosha/miaosha')">
							<view class="limitConLeft">
								<image class="goods-img" :src="flashSale.goods.thumb" alt=""></image>
								<view class="jinxuan"><view class="img_tag">精选</view></view>
							</view>
							<view class="limitConRight">
								<view class="secRigTitle">{{ flashSale.goods.goodsName }}</view>
								<view class="secRigDesc">{{ flashSale.goods.desc }}</view>
								<view class="secPrice">
									<view class="priceLeft" v-if="access_token">
										<view class="currentPrize">
											<text>￥</text>
											<text class="text">{{ flashSale.goods.goodsPrice }}</text>
										</view>
										<text class="prePrize">¥{{ flashSale.goods.marketPrice }}</text>
									</view>
									<view class="priceLeft" v-if="!access_token">
										<view class="price"><view class="rzck">认证查看</view></view>
									</view>
									<view class="PriceRight">
										<view class="icon_fire r_text">已抢{{ flashSale.goods.salesCount }}件</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>

				<!-- 红盒子新品 -->
				<view class="container">
					<view class="redProduct">
						<view class="redProHead">
							<view class="hotHeadLeft">红盒子新品</view>
							<view class="moreRight" @tap="nextPage('../homePage/xinpin/xinpin')"><view class="more">更多</view></view>
						</view>
						<view class="redProductCon">
							<view class="redProList" v-for="(newitem, newindex) in newBrandList" :key="newindex" @tap="nextPage('../homePage/xinpin/xinpin')">
								<view class="hotImgShow">
									<image class="image" :src="newitem.brandBanner" mode=""></image>
									<view class="info-box">
										<view class="info-mask"></view>
										<text class="info-name">{{ newitem.sellingPoint }}</text>
									</view>
								</view>
								<view class="hotPrize">
									<text class="hotDiscount">{{ newitem.discount }}折起</text>
									<text class="hotName">{{ newitem.brandName }}</text>
								</view>
							</view>
						</view>
					</view>
				</view>

				<!-- 特惠专场 -->
				<view class="specialOffer" v-if="actPage">
					<view class="specialHead">特卖专场</view>
					<view class="specialCon">
						<view class="redProList specialList" v-for="aitem in actPage" :key="aitem.pageId" @tap="goCheap(aitem.pageId)">
							<view class="hotImgShow">
								<image class="image productImg" :src="aitem.img" mode=""></image>
								<view class="info-box">
									<view class="info-mask"></view>
									<text class="info-name">{{ aitem.name }}</text>
								</view>
							</view>
							<view class="hotPrize">
								<text class="hotDiscount">{{ aitem.sellingPoint }}</text>
								<view class="hotName">
									<view class="time">
										<text>仅剩:</text>
										<text class="days">{{ aitem.times }}</text>
										<text>{{ aitem.types }}</text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>

				<!-- 特惠专场下面的bannerI -->
				<view class="middleBaner">
					<swiper class="swiper" :autoplay="true" interval="5000" duration="500" circular="1">
						<swiper-item v-for="(bot, botKey) in botAds" :key="botKey" @tap="nextPage(bot.url)">
							<view class="swiper-item"><image class="image" :src="bot.img" mode=""></image></view>
						</swiper-item>
					</swiper>
				</view>

				<!-- 为您推荐 -->
				<view class="container">
					<view class="proRecommend">
						<view class="proReHead">为您推荐</view>
						<view class="proReCon">
							<block v-for="(item, indexKey) in goodslist" :key="indexKey">
								<view class="recommList">
									<view class="proDetail" @tap="goDetail(item.goodsInfo.goodsId)">
										<view class="proImg">
											<image class="image" :src="item.goodsInfo.thumb" mode=""></image>
											<view class="fl-box" v-if="item.goodsInfo.stock < item.goodsInfo.startNum">售罄 {{ item.expectedArrivalTimeText }}</view>
											<view class="fl-box stock2" v-if="item.goodsInfo.stockStatus == 1">货源紧张</view>
											<view class="list-video" v-if="item.isVideoTag"></view>
										</view>
										<view class="proDesc">
											<view class="descBtn">
												<text class="tag" v-for="(tag, tagindex) in item.tagList" :key="tagindex" :class="tag.name">{{ tag.text }}</text>
											</view>
											<view class="proTitle">{{ item.goodsInfo.goodsName }}</view>
											<view class="proPirze">
												<view class="prizeLeft" v-if="access_token">
													<view class="price">
														<view class="symbol">￥</view>
														<view class="number">{{ item.big }}</view>
														<view class="dot">.{{ item.min }}</view>
													</view>
													<view class="proDiscot">
														<view class="tag discount" v-if="item.goodsInfo.discount">{{ item.goodsInfo.discount }}折</view>
														<view class="tag discount" v-if="item.goodsInfo.savePrice !== '0.00'">省¥{{ item.goodsInfo.savePrice }}</view>
													</view>
												</view>
												<view class="prizeLeft" v-if="!access_token">
													<view class="price"><view class="rzck">认证查看</view></view>
												</view>
											</view>
										</view>
									</view>
									<view class="proAddCart" @tap="getUserBuy(item)"></view>
								</view>
							</block>
						</view>
					</view>

					<view class="loadingText" v-if="loadingText"><image class="image" src="../../static/images/loading/loading.gif" mode=""></image></view>
				</view>
			</view>
		</keep-alive>

		<!-- 引用Object类型判断会出现问题，新增boolean类型参数进行判断 -->
		<template v-if="adsPop">
			<view class="indexAds">
				<view class="ads-mask"></view>
				<view class="ads-body">
					<view class="ads-img" @tap="nextPage(ads.url)"><image class="image" :src="ads&&ads.img" mode=""></image></view>
					<view class="close" @tap="closeAds"></view>
				</view>
			</view>
		</template>

		<!-- 购物车窗口 -->
		<block v-if="showCart"><buy-popup :show="showCart" :datas="goodInfo" @close="closeCart" @sure="addCart"></buy-popup></block>

		<!-- 右下角浮标 -->
		<view class="foot-r-box users-foot">
			<!-- <view class="item" @click="showMobile"><view class="s842_icons s842_public_kefu"></view></view> -->
			<view class="item" v-if="showTop" @click="backToTop"><view class="s842_icons s842_public_top"></view></view>
		</view>
	</view>
</template>

<script>
import Base64 from '../../common/base64.js';
import { getNowTime, getDateTime, getEndTime } from '@/common/util.js';
import buyPopup from '@/components/buy-popup/buy-popup.vue';
import { userValidateLogin } from '@/common/auth.js';
export default {
    components: {
        buyPopup
    },
    data() {
        return {
            showTop: false,
            keywords: '',
            scrollTop: 0,
            // 轮播参数 使用标签设置模式，测试是否因为后台轮播后，该实例未被销毁
            //
            isVip: false,
            // 限时秒杀
            flashSale: {},

            // 首页弹窗广告
            adsPop: false,
            ads: {},

            // 服务器接口参数
            actPage: null,
            bannerList: null,
            botAds: null,
            midAds: null,
            category: null,
            newBrandList: null,
            sTop: false,

            // 定时器参数
            day: 0,
            hour: 0,
            minute: 0,
            seconds: 0,
            countDownTime: null,

            // 商品列表参数
            pages: 0,
            pageSize: 10,
            totalCount: 0,
            goodslist: [],
            loadingText: '',

            //购物车窗口参数
            showCart: false,
            goodInfo: {},

            //定时器
            clock: null,
            clock2: null,
            userinfo: '',
            access_token: '',
            lastOrderInfo: [],
            animate: false,
            activeIndex: 0,

			//
			deepAction: true,
			scrollPageTop: 0
		};
	},
	computed: {
		getFlashSales() {
			return this.flashSale && this.flashSale.goods;
		}
	},
	methods: {
		linshi(){
			let url = `/pages/superBrand/superBrand`
				this.$api.goNavigateTo(url);
		},
		backToTop() {
			uni.pageScrollTo({ scrollTop: 0, duration: 10 });
		},
		scroll() {
			this.animate = true; // 因为在消息向上滚动的时候需要添加css3过渡动画，所以这里需要设置true
			setTimeout(() => {
				//  这里直接使用了es6的箭头函数，省去了处理this指向偏移问题，代码也比之前简化了很多
				this.lastOrderInfo.push(this.lastOrderInfo[0]); // 将数组的第一个元素添加到数组的
				this.lastOrderInfo.shift(); //删除数组的第一个元素
				this.animate = false; // margin-top 为0 的时候取消过渡动画，实现无缝滚动
			}, 500);
		},
		showAds() {
			let hideAds = uni.getStorageSync('hideAds');
			if (hideAds) {
				let time = getDateTime(getNowTime());
				if (time > hideAds) {
					this.getIndexAds();
				}
			} else {
				this.getIndexAds();
			}
		},
		closeAds() {
			let hideTime = getNowTime('ymd');
			let maxTime = getDateTime(`${hideTime} 23:59:59`);
			uni.setStorageSync('hideAds', maxTime);
			this.ads = null;
			this.adsPop = false;
		},
		closeCart() {
			this.showCart = false;
		},
		async addCart(data) {
			let that = this;
			let res = await this.$api.request({
				method: 'POST',
				header: true,
				url: this.$api.cartAdd,
				data: data
			});
			if (res.code == 0 && res.data) {
				this.$store.commit('updateCart', res.data.totalCount);
			}
			this.closeCart();
			this.$api.showMessage(res.msg);
			this.$api.getTabbarCart(res.data.totalCount);
		},
		getUserBuy(item) {
			this.userValidateLogin(() => {
				this.goodInfo = item;
				this.showCart = true;
			});
		},
		getIndexAds() {
			let that = this;
			that.$http({
				method: 'get',
				url: this.$api.indexAds,
				success: function(res) {
					if (res && res.data) {
						that.ads = res.data.ads[0];
						that.adsPop = true;
					}
				}
			});
		},
		// 获取banner信息
		async getIndexData() {
			let that = this;
			let res = await this.$api.request({
				url: this.$api.getIndex,
				isNot: true
			});
			if (res && res.data) {
				let datas = res.data;
				that.isVip = datas.isVip;
				that.flashSale = datas.flashSale;
				that.countDownTime = datas.flashSale && datas.flashSale.date;
				that.bannerList = datas.bannerList;
				that.newBrandList = datas.newBrandList;
				that.botAds = datas.botAds;
				that.midAds = datas.midAds;
				that.category = datas.category;
				that.keywords = datas.keywords;
				that.lastOrderInfo = datas.lastOrderInfo;
				that.startClock();
				that.actPage = datas.actPage.map(e => {
					let res = getEndTime(e.endTime);
					e.types = res.type;
					e.times = res.time;
					return e;
				});
				// console.log(JSON.stringify(datas));
			} else {
				console.log('getIndexData Error :' + JSON.stringify(res));
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
				},
				isNot: true
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
		nextPage(path) {
			this.userValidateLogin(() => {
				path = path.replace('/pages/', '../');
				this.$api.goNavigateTo(path);
			});
		},
		// 定时器
		startClock() {
			if (this.clock) {
				clearInterval(this.clock);
			}
			let time = this.countDownTime;
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
		// 去商品详情页
		goDetail(id) {
			let that = this;
			this.userValidateLogin(function() {
				that.$api.goNavigateTo(`../goods/product/product?goodsId=${id}`);
			});
		},
		goCheap(pageId) {
			let that = this;
			this.userValidateLogin(function() {
				that.$api.goNavigateTo(`../homePage/preferential/preferential?pageId=${pageId}`);
			});
		},
		focusIn() {
			let that = this;
			this.userValidateLogin(() => {
				let _url = that.keywords ? `../search/search?keywords=${that.keywords}` : '../search/search';
				that.$api.goNavigateTo(_url);
			});
		},
		// 页面权限验证
		userValidateLogin(callback) {
			userValidateLogin(() => {
				callback();
			});
		},
		clearPage() {
			this.deepAction = false;
			if (this.clock) {
				clearInterval(this.clock);
			}
			this.clock = null;
			if (this.clock2) {
				clearInterval(this.clock2);
			}
			this.clock2 = null;
		},
		async getFoundunread() {
			let res = await this.$api.request({
				url: this.$api.foundGetUnread,
				isNot: true
			});
			if (res && res.data) {
				let { unreadCount } = res.data;
				let _index = { index: 2 };
				if (unreadCount > 0) {
					uni.showTabBarRedDot(_index);
				} else {
					uni.hideTabBarRedDot(_index);
				}
			}
			// uni.showTabBarRedDot({index:2});
		}
	},
	onLoad() {
		// 默认测试用户,启动一次首页，运行后马上关闭即可
		// let token = `Basic ${Base64.encode('hWtBoZdRjIY5UFYnAmh4DMQhgqynDYMk:')}`;
		let token = `Basic ${Base64.encode('d-DNNh6s4WEmu-wbI7Ws2OTPzY8Ba49D:')}`;
		uni.setStorageSync('access_token', token);
		// uni.setStorageSync('access_token', 'Basic a2MxZkZDcWRWaVhCXzZval9QcHBmaUwzZUhkWGU3Z0Q6');
		// uni.setStorageSync('access_token', 'Basic aThrQlktTG9CTnJFRF96ZE16RmVVOUFsV0I4OGt1Sk86');
		// uni.setStorageSync('access_token', 'Basic bzlac2ZIa084d2JBcHF5eHBPZkJpSFVHdktTa1lac246');
		// 移除多有登陆信息
		// uni.removeStorageSync('access_token');
		// uni.removeStorageSync('userinfo');
		// uni.removeStorageSync('hideAds');
		this.showAds();
		this.getIndexData();
		this.getGoodsList();
	},
	onShow() {
		this.deepAction = true;
		let tokens = uni.getStorageSync('access_token');
		if (tokens) {
			this.access_token = tokens;
			this.$store.commit('updateToken', tokens);
			// 获取购物车数量，用于tabbar显示
			this.$store.dispatch('getCartInfo');
			// 必须更新一次用户信息，不然审核的用户在app上不会同步。
			this.$store.dispatch('getUserInfos');
			this.getFoundunread();
		}
		if (this.countDownTime) {
			this.startClock();
		}
		if (this.clock2) {
			clearInterval(this.clock2);
		}
		this.$api.getTabbarCart();
	},
	onReachBottom() {
		if (this.deepAction && this.goodslist.length > 0) {
			var that = this;
			if (that.loadingText) {
				return false;
			}
			that.loadingText = true;
			setTimeout(function() {
				that.getMoreGoods();
			}, 500);
		}
	},
	onPageScroll(event) {
		let { scrollTop } = event;
		if (scrollTop < 600 && this.showTop) {
			this.showTop = false;
		} else if (scrollTop > 600 && !this.showTop) {
			this.showTop = true;
		}
	},
	onUnload() {},
	onHide() {}
};
</script>

<style lang="less" scoped="scoped">
@import url('less/index.less');
.linshi{
	width: 100%;
	height: 100upx;
	line-height: 100upx;
	text-align: center;
	background: #f3f3f3;
	font-size: 32upx;
}
</style>

