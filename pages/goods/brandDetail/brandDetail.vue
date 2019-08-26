<template>
	<view class="brand-page">
		<!-- 头部 -->
		<view class="brand-header">
			<view class="headBarList" :class="{ activeTite: whiceTab == 1 }" @tap="tabProShow('1')"><text class="text">品牌主页</text></view>
			<view class="headBarList" :class="{ activeTite: whiceTab == 2 }" @tap="tabProShow('2')"><text class="text">全部商品</text></view>
			<view class="headBarList" :class="{ activeTite: whiceTab == 3 }" @tap="tabProShow('3')"><text class="text">授权资质</text></view>
		</view>

		<!-- 品牌主页 -->
		<view class="mainPingpai" v-if="showType == 1">
			<view class="brand-banner"><image class="image" :src="brandInfo.brandBanner" mode=""></image></view>
			<view class="brand-name-box">
				<view class="logo"><image :src="brandInfo.brandLogo" mode="widthFix" class="image"></image></view>
				<view class="center">
					<text class="name">{{ brandInfo.brandName }}</text>
					<text class="described">{{ brandInfo.brandDesc }}</text>
				</view>
				<view class="look-brand-detail" @tap="showPop('showBrand')"><text class="look-brand-detail__text">查看品牌</text></view>
			</view>

			<view class="list-view  brand-tips">
				<view class="cell" @tap="showPop('showTips')">
					<view class="text tips">该品牌正在参与{{ shippingInfo.shippingName }}</view>
					<!-- <view class="text tips">该品牌正在参与套餐活动；小美直发（满额包邮）</view> -->
				</view>
			</view>

			<!-- 明星单品 -->
			<view class="container" v-if="starList.length > 0">
				<view class="product-title"><text class="title_text">明星单品</text></view>
				<view class="brand-list embed-bottom"><goods-list :list="starList" type="public" @change="getUserBuy" @detail="getGoodsDetail"></goods-list></view>
			</view>

			<!-- 全部商品 -->
			<view class="container" v-if="notStarList.length > 0">
				<view class="product-title"><text class="title_text">全部商品</text></view>
				<view class="brand-list"><goods-list :list="notStarList" type="public" @change="getUserBuy" @detail="getGoodsDetail"></goods-list></view>
			</view>

			<!-- 已经到底了 -->
			<text class="lock-end">已经到底了</text>
		</view>

		<!-- 全部商品 -->
		<view class="allProduct" v-if="showType == 2">
			<view class="head" :style="{ top: headTop + 'px' }"><brandListhead @change="turnUp" @dialogPop="showPop" :sel="sel" :flexTop="true"></brandListhead></view>
			<!-- 商品列表 -->
			<view class="brandList">
				<goods-list :list="goodslist" @change="getUserBuy"></goods-list>
				<!-- 加载更多 -->
				<view class="loadingText" v-if="loadingText"><image class="image" src="../../../static/images/loading/loading.gif" mode=""></image></view>
				<view class="loadingText2" v-if="loadingText"><image class="image" src="../../../static/images/loading/loading.gif" mode=""></image></view>
			</view>

			<!-- 已经到底了 -->
			<text class="lock-end" v-if="goodslist.length > 0 && totalCount == goodslist.length">已经到底了</text>

			<!-- 搜索不到相关商品 -->
			<block v-if="isEmpty">
				<view class="tiket-unset">
					<view class="unicon undata"></view>
					<view class="text">搜索不到相关商品</view>
				</view>
			</block>
		</view>

		<!-- 授权资质 -->
		<view class="zhsq" v-if="showType == 3">
			<block v-if="licensebox">
				<image class="image" src="../../../static/images/public/notMsg.png" mode=""></image>
				<text class="desc">相关内容研发中</text>
			</block>
			<block v-if="!licensebox">
				<view class="page-section swiper">
					<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="5000" :duration="500" indicator-active-color="#ffffff">
						<swiper-item v-for="(item, lcKey) in licenseSrc" :key="lcKey">
							<view class="swiper-item">
								<view class="img-box" @tap="preview(licenseSrc, item)"><image class="bg-image" :src="item" mode=""></image></view>
							</view>
						</swiper-item>
					</swiper>
				</view>
			</block>
		</view>

		<!-- 浮动导航 -->
		<min-nav :isScroll="showTop" @change="backToTop"></min-nav>

		<!-- 参数的弹框 -->
		<leftpop :show="paramsPopup" title="筛选" @close="hidePop" @sure="useSearch">
			<view class="params-box">
				<view class="choseCon">
					<view class="cateHead">推荐</view>
					<view class="tagList">
						<block v-for="(item, index) in tagsList" :key="index">
							<view class="tagOne" :class="{ tagActive: item.id == tagsId }" @tap="choseThis(item)">{{ item.name }}</view>
						</block>
					</view>
				</view>
				<view class="choseCon">
					<view class="cateHead">品类</view>
					<view class="tagList">
						<block v-for="(item, index) in categoryList" :key="index">
							<view class="tagOne" :class="{ tagActive: item.catId == catId }" @tap="choseThis(item)">{{ item.catName }}</view>
						</block>
					</view>
				</view>
				<view class="choseCon">
					<view class="cateHead">品牌产地</view>
					<view class="tagList" style="margin-bottom: 100upx;">
						<block v-for="(item, index) in countriesList" :key="index">
							<view class="tagOne" :class="{ tagActive: ctsId == index }" @tap="choseThis(item, index)">{{ item }}</view>
						</block>
					</view>
				</view>
			</view>
		</leftpop>

		<!-- 活动详情 -->
		<toast-popup :show="showTips" title="活动详情" @close="hidePop()">
			<view class="proDetial" v-if="pkgList.goodsList && pkgList.goodsList.length > 0">
				<view class="wuliao_Head">
					<text class="wuliaoTag" :style="{ backgroundColor: '1c9cff' }">套餐</text>
					<text class="wuliaoText">该商品参与以下套餐</text>
				</view>
				<view class="wuliao_Con">
					<view class="wuliao_List" v-for="(item, index) in pkgList.goodsList" :key="index">
						<view class="left" @tap="getGoodsDetail(item.goodsId)">
							<image class="left_img" :src="item.thumb" mode=""></image>
							<text class="left_title">{{ item.name }}</text>
						</view>
						<view class="right">￥{{ item.price }}</view>
					</view>
				</view>
			</view>
			<view class="coupon" v-if="couponList && couponList.length > 0">
				<view class="couCon">
					<view class="tag">领券</view>
					<view class="couponList">
						<view class="item" v-for="item in couponList" :key="item.ruleId">{{ item.ruleName }}</view>
					</view>
				</view>
				<view class="tip">
					<text class="text color">温馨提示:</text>
					<text class="text">满减、秒杀、套餐、聚划算等活动商品不能与优惠券同享</text>
				</view>
			</view>
			<view class="act-content">
				<view class="title">邮费政策</view>
				<view class="">{{ shippingInfo.shippingDesc }}</view>
			</view>
		</toast-popup>

		<!-- 品牌详情 -->
		<toast-popup :show="showBrand" title="品牌信息" @close="hidePop()">
			<view class="act-content">
				<view class="info-line">
					<text class="label">品牌归属地</text>
					<text class="message">{{ brandPop.country }}</text>
				</view>
				<view class="info-line">
					<text class="label">主营品类</text>
					<text class="message">{{ brandPop.mainCat }}</text>
				</view>
				<view class="info-line">
					<text class="label">供应产品</text>
					<text class="message">{{ brandPop.goodsCount }}款</text>
				</view>
				<view class="info-line">
					<text class="label">市场渠道</text>
					<text class="message">{{ brandPop.shortDesc }}</text>
				</view>
				<view class="longDesc">{{ brandPop.longDesc }}</view>
				<view class="lookDetial" @tap="lookImgDetial" v-if="brandInfo.brandDetail">查看详情</view>
			</view>
		</toast-popup>

		<view class="dialogImg" :style="{ height: lookDetialHeight + 'px' }" v-if="lookDetialImg && lookDetialImgArr.length > 0">
			<view class="dialogCon">
				<image class="image" v-for="(item, index) in lookDetialImgArr" :key="index" :src="item" @tap="preview(lookDetialImgArr, item, $event)" mode="widthFix"></image>
				<!-- <rich-text :nodes="brandInfo.brandDetail" @click="hideImgDetial"></rich-text> -->
				<!-- <u-parse :content="brandInfo.brandDetail" @preview="preview2" @navigate="navigate" /> -->
			</view>
		</view>
		<!-- 购物车窗口 -->
		<block v-if="showCart"><buy-popup :show="showCart" :datas="goodInfo" @close="closeCart" @sure="addCart"></buy-popup></block>
	</view>
</template>

<script>
import minNav from '@/components/min-nav/min-nav.vue';
import toastPopup from '@/components/toast-popup/toast-popup2.vue';
import goodsList from '@/components/goods-list/goods-list.vue';
import buyPopup from '@/components/buy-popup/buy-popup.vue';
import leftpop from '@/components/toast-popup/leftpop.vue';
import brandListhead from '@/components/brand-list-head/brand-list-head.vue';
import { goodsQueryParams, goodsChoseThis, goodsResetNavStyle, goodsPriceBigMin, barndsImagesDetail } from '@/common/goods.js';
export default {
	components: {
		minNav,
		toastPopup,
		goodsList,
		buyPopup,
		leftpop,
		brandListhead
	},
	data() {
		return {
			//
			headTop: 50,
			// 页面参数
			whiceTab: 1,
			showType: 1,
			brandId: '',
			// 返回顶部
			showTop: false,
			// 弹层参数
			paramsPopup: false,
			showTips: false,
			showBrand: false,
			// 服务器参数 品牌主页
			brandInfo: {},
			brandPop: {},
			couponList: [],
			notStarList: [],
			pkgList: {},
			shippingInfo: {},
			starList: [],
			// 服务器参数 授权资质
			licensebox: false,
			licenseSrc: [],
			// 购物车参数
			showCart: false,
			goodInfo: {},
			// 服务器筛选参数
			tagsList: [],
			categoryList: [],
			countriesList: [],
			// 筛选参数
			sel: '',
			tagsId: '',
			catId: '',
			ctsId: -1,
			ctsName: '',
			// 排序
			sortColumn: '',
			order: '',
			// 商品列表参数
			loadingText: '',
			totalCount: 0,
			goodslist: [],
			page: 0,
			pageSize: 10,
			isEmpty: false,
			// 查看详情信息
			onHidePage: false,
			lookDetialImg: false,
			lookDetialImgArr: [],
			lookDetialHeight: 1000
		};
	},
	methods: {
		backToTop() {
			uni.pageScrollTo({ scrollTop: 0, duration: 10 });
		},
		lookImgDetial() {
			this.lookDetialImg = true;
		},
		preview2(src, e) {
			this.lookDetialImg = false;
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
		closeCart() {
			this.showCart = false;
		},
		// 打开类型弹层
		showPop(type) {
			this[type] = true;
		},
		//选项卡显示隐藏
		tabProShow(number) {
			this.showType = number;
			this.whiceTab = number;
			if (number == 2) {
				this.getGoodsList();
				this.getGoodsfilter();
			} else if (number == 3) {
				this.getBrandLice();
			}
		},
		useSearch() {
			this.hidePop();
			this.sel = 'sel';
			this.turnUp('sel');
		},
		turnUp(params) {
			let that = this;
			let { sortColumn, order, type } = params;
			if (type) {
				this.hidePop(type);
				goodsResetNavStyle(that, 0);
			}
			that.sortColumn = sortColumn;
			that.order = order;
			that.page = 0;
			that.goodslist = [];
			that.getGoodsList();
		},
		// 获取商品列表
		async getGoodsList() {
			let that = this;
			let getUrl = this.getParams(0, true);
			that.pages++;
			that.loadingText = true;
			that.isEmpty = false;
			let res = await this.$api.request({
				url: this.$api.getGoodsList,
				data: getUrl
			});
			if (res && res.data) {
				let { goodsList, totalCount } = res.data;
				that.totalCount = totalCount;
				goodsList = goodsPriceBigMin(goodsList);
				that.goodslist = that.goodslist.concat(goodsList);
				if (totalCount < 1) {
					that.isEmpty = true;
				} else {
					that.isEmpty = false;
				}
			}
			that.loadingText = false;
		},
		// 关闭类型弹层
		hidePop(value) {
			if (value) {
				this.tagsId = '';
				this.catId = '';
				this.ctsId = -1;
			} else {
				this.paramsPopup = false;
			}
			this.showTips = false;
			this.showBrand = false;
			this.showCart = false;
		},
		choseThis(item, index) {
			goodsChoseThis(item, index, this);
		},
		getParams(page, json) {
			this.page++;
			return goodsQueryParams(this, 2);
		},

		// 获取品牌数据
		async getBrandDetail(brandId) {
			let that = this;
			let res = await this.$api.request({
				url: `${this.$api.brandView}?brandId=${brandId}`
			});
			if (res && res.data) {
				let datas = res.data;
				that.brandInfo = datas.brandInfo;
				let { brandDetail } = datas.brandInfo;
				if (brandDetail) {
					that.lookDetialImgArr = barndsImagesDetail(brandDetail);
				}
				that.brandPop = datas.brandPop;
				that.couponList = datas.couponList;
				that.notStarList = goodsPriceBigMin(datas.notStarList);
				that.pkgList = datas.pkgList;
				that.shippingInfo = datas.shippingInfo;
				that.starList = goodsPriceBigMin(datas.starList);
				uni.setNavigationBarTitle({
					title: that.brandInfo.brandName
				});
			} else {
				this.$api.showMessage(res.msg);
			}
		},
		// 获取品牌资质
		async getBrandLice() {
			let that = this;
			// 如果存在就不再进行请求
			if (that.licenseSrc.length > 1) {
				return;
			}
			let res = this.$api.request({
				url: that.$api.brandLicense,
				data: {
					brandId: that.brandId
				}
			});
			if (res && res.data) {
				let { licenseSrc } = res.data;
				that.licenseSrc = licenseSrc;
				if (licenseSrc.length < 1) {
					that.licensebox = true;
				}else{
					that.licensebox = false;
				}
			}
		},
		preview(urls, current, $event) {
			uni.previewImage({
				current: encodeURI(current),
				indicator: 'number',
				urls: urls.map(item => encodeURI(item))
			});
			// console.log($event);
		},
		async getGoodsfilter() {
			let that = this;
			let res = await this.$api.request({
				method: 'GET',
				url: this.$api.getGoodsfilter
			});
			if (res && res.code == 0) {
				let datas = res.data;
				that.tagsList = datas.tags;
				that.categoryList = datas.category;
				that.countriesList = datas.countries;
			}
		},
		// 获取用户购买商品
		getUserBuy(item) {
			this.goodInfo = item;
			this.showCart = true;
		},
		// 跳转商品详情
		getGoodsDetail(goodsId) {
			let urlPath = `../product/product?goodsId=${goodsId}`;
			this.$api.goNavigateTo(urlPath);
		}
	},
	onLoad(params) {
		if (params.brandId) {
			this.brandId = params.brandId;
		}
		let res = uni.getSystemInfoSync();
		this.headTop = res.windowTop + uni.upx2px(98);
		this.lookDetialHeight = res.windowHeight;
		this.getBrandDetail(this.brandId);
	},
	onShow() {
		if (this.onHidePage) {
			this.lookDetialImg = false;
		}
	},
	onReachBottom() {
		var that = this;
		if (that.showType == 2 && that.totalCount !== that.goodslist.length) {
			if (that.loadingText) {
				return false;
			}
			that.loadingText = true;
			setTimeout(function() {
				that.getGoodsList();
			}, 500);
		}
	},
	onUnload() {},
	onHide() {
		this.onHidePage = true;
	}
};
</script>

<style lang="less" scoped="scoped">
@import url('./barnd-detail.less');

.zhsq {
	margin-top: 98upx;
	overflow: hidden;
}

.wuliao_Con {
	position: relative;
	width: 100%;
	justify-content: space-between;
	box-sizing: border-box;
}

.wuliao_List {
	margin-top: 0;
	margin-bottom: 20upx;
	width: 100%;
	background: #f4f4f4;
	padding: 20upx 20upx;
	box-sizing: border-box;
}
.tiket-unset {
	.undata {
		margin-top: 30upx;
	}
}

.dialogImg {
	position: fixed;
	background: rgba(0, 0, 0, 0.9);
	width: 100%;
	height: 100%;
	left: 0;
	top: 0;
	z-index: 100;
	overflow-y: auto;

	.dialogCon {
		width: 100%;
	}

	.image {
		width: 100%;
		vertical-align: middle;
	}
}
/* #ifdef H5 */
.dialogImg {
	top: 44px;
}
/* #endif */
</style>
