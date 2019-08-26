<template>
	<view class="productDetial">
		<view class="slideImg" id="headTop">
			<view class="page-section swiper">
				<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="5000" :duration="500" indicator-active-color="#ff3366">
					<swiper-item v-for="(item, index) in swiperImgArr.src" :key="index">
						<view class="swiper-item"><image class="img" :src="item" mode="" v-if="swiperImgArr.type == 'img'"></image></view>
					</swiper-item>
				</swiper>
			</view>
		</view>

		<view class="tabChose" id="searchBar" :class="[searchBarFixed? 'isFixed' : '']">
			<view class="stright" @click="tabtype('1', 'headTop')"><text :class="{ tabActive: isdetial == 1 }">直发</text></view>
			<view class="detial" @click="tabtype('2', 'detialCon')"><text :class="{ tabActive: isdetial == 2 }">详情</text></view>
		</view>

		<view class="proTitle">
			<view class="titleText">
				<text class="zhifa">积分兑换</text>
				<text class="textDesc">{{ allproductArr.goodsName }}</text>
			</view>
			<view class="prizeShow">
				<view class="left_prize">
					<text class="prize">{{ allproductArr.price }}积分</text>
				</view>
				<view class="startPrize">市场价:￥{{ allproductArr.marketPrice }}</view>
			</view>
		</view>

		<!-- <view class="productAdd"> -->
		<view class="sameAddress addressPro" @click="showPop('paramsPopup')">
			<view class="Addressleft">
				<view class="proAddress">
					<view class="sendWhere"><view class="sp icon_arguments"></view></view>
					<text class="speciaAddress">{{ attributes.brandName }}</text>
				</view>
				<view class="proAddress">
					<text class="sendWhere">参数</text>
					<text class="speciaAddress">效期：{{ attributes.expireDate }} 条形码:{{ attributes.goodsSn }}</text>
				</view>
			</view>
			<view class="addressRight"><text class="sp icon_return"></text></view>
		</view>

		<view class="sameAddress proQuaity" @click="showPop('servicePopup')">
			<view class="Addressleft">
				<view class="sp icon_ok line">正品行货</view>
				<view class="sp icon_ok line">物流补贴</view>
				<view class="sp icon_ok line">七天退换</view>
			</view>
			<view class="addressRight"><text class="sp icon_return"></text></view>
		</view>
		<!-- </view> -->

		<!-- 图片展示区 -->
		<view class="photo-view"><text class="text">图文详情</text></view>
		<view class="imgAllShow" id="detialCon">
			<view class="imgAllCon">
				<view class="imgCon"><image class="image" v-for="(oneImg, index) in allproductArr.goodsDesc" :key="index" :src="oneImg" mode="widthFix"></image></view>
			</view>
		</view>

		<!-- 已经到底了 -->
		<text class="lock-end">已经到底了</text>

		<!-- 加入购物车模块 -->
		<view class="addTocart">
			<view class="addTocartCon">
				<view class="cartRight" @click="showPop('showCart')"><button type="primary">立即兑换</button></view>
			</view>
		</view>

		<!-- 参数的弹框 -->
		<toast-popup :show="paramsPopup" title="参数详情" @close="hidePop" @sure="getChangeFreight">
			<view class="params-box">
				<view class="title">
					<view v-for="item in attributes.detail" :key="item.title">{{ item.title }}</view>
				</view>
				<view class="detial">
					<view v-for="item in attributes.detail" :key="item.title">{{ item.value }}</view>
				</view>
			</view>
		</toast-popup>

		<!-- 七天退换弹框 -->
		<toast-popup :show="servicePopup" title="服务政策" @close="hidePop" @sure="getChangeFreight">
			<view class="service-box">
				<view class="serverList">
					<view class="title">
						<i></i>
						<text>正品行货</text>
					</view>
					<view class="detial"><text>原装进口，证件齐全，贴有中文背贴</text></view>
				</view>
				<view class="serverList">
					<view class="title">
						<i></i>
						<text>物流补贴</text>
					</view>
					<view class="detial"><text>小美诚品自有仓库的商品，商品标题中，带有【直发】前缀，称为“直发商品”，享有小美直发满额包邮的优惠。</text></view>
					<view class="detial"><text>（1）收货地址为广东、湖南、湖北、福建、广西、贵州、江西、浙江的订单，订单金额满2999元包邮，不足2999元收取物流费用20元；</text></view>
					<view class="detial">
						<text>
							（2）收货地址为云南、重庆、四川、陕西、山西、河北、宁夏、北京、天津、上海
							山东、江苏、安徽、河南的订单，订单金额满3999元包邮，不足3999元收取物流费用30元；
						</text>
					</view>
					<view class="detial">
						<text>（3）收货地址为新疆、西藏、青海、甘肃、内蒙、辽宁、吉林、黑龙江、海南的订单，订单金额满4999元包邮，不足4999元收取物流费用50元；</text>
					</view>
					<view class="detial"><text>特别说明：</text></view>
					<view class="detial"><text>以上邮费政策不支持自选物流，如需自选物流，请联系小美诚客服。</text></view>
					<view class="detial"><text>若不满足包邮条件，客户可以选择现付运费和到付运费。</text></view>
				</view>
				<view class="serverList">
					<view class="title">
						<i></i>
						<text>七天退换</text>
					</view>
					<view class="detial"><text>若出现错发、货不对版等任何货品问题，自收到产品7天内平台给予退换。</text></view>
				</view>
			</view>
		</toast-popup>

		<buyPopup2 :show="showCart" :datas="addCartList" @close="closeCart" @sure="addCart"></buyPopup2>
	</view>
</template>

<script>
import buyPopup2 from '@/components/buy-popup2/buy-popup.vue';
import toastPopup from '@/components/toast-popup/toast-popup2.vue';
export default {
	components: {
		toastPopup,
		buyPopup2
	},
	data() {
		return {
			//
			indicatorDots: true,
			autoplay: true,
			interval: 5000,
			duration: 500,
			//
			isdetial: 1,
			scrollTop: 0,
			searchBarTop: 0,
			searchBarFixed: false,
			rulesPopup: false,
			paramsPopup: false,
			servicePopup: false,
			goodsNum: 1,
			goodsId: '',
			allproductArr: {},
			swiperImgArr: [],
			addCartList: {},
			proviceName: '',
			attributes: '',
			marketSuggest: '',
			spuList: '',
			goodsState: true,
			marketComment: [],
			goodsChangeNum: 1,
			pkgList: [],
			brand: {},
			linkGoods: [],
			status: {},
			activityInfo: [],
			clock2: null,
			//
			showDescTop: 0,
			imgAllTop: 0,
			//
			showCart: false
		};
	},
	methods: {
		closeCart() {
			this.showCart = false;
		},
		async addCart(data) {
			let vm = this;
			let res = await this.$api.request({
				method: 'POST',
				url: this.$api.exchange_buy,
				data: {
					goodsId: data.goodsId,
					goodsNum: data.goodsNum
				}
			});
			if (res.code == 0 && res.msg == '兑换成功') {
				let balance = uni.getStorageSync('balance');
				let val = balance - data.goodsNum * Number(this.allproductArr.price);
				uni.setStorageSync('balance', val);
			}
			this.$api.showMessage(res.msg);
			// this.closeCart();
		},
		showTips(message) {
			uni.showToast({
				icon: 'none',
				title: message
			});
		},
		tabtype(index, name) {
			let vm = this;
			this.isdetial = index;
			let toTop = 0;
			if (name == 'detialCon') {
				toTop = vm.showDescTop - 60;
			}
			uni.pageScrollTo({
				scrollTop: toTop,
				duration: 100
			});
		},
		numReduce(start, middelnum) {
			//起订数，每次增加多少，
			let _P = this.goodsChangeNum;
			let addGoodsNum = parseInt(_P) - parseInt(middelnum);
			if (addGoodsNum < 1) {
				return this.showTips('亲，已经不能再少了哦');
			}
			this.goodsChangeNum = addGoodsNum;
		},
		numAdd(middelnum) {
			//库存，每次增加多少，index
			let _P = this.goodsChangeNum;
			let addGoodsNum = _P + parseInt(middelnum);
			let jfNum = addGoodsNum * this.allproductArr.shopPrice;
			if (jfNum > this.allproductArr.balance) {
				return this.showTips('可用积分不足');
			}
			this.goodsChangeNum = addGoodsNum;
		},
		// 显示类型弹层
		showPop(type) {
			this[type] = true;
		},
		// 关闭类型弹层
		hidePop() {
			this.rulesPopup = false;
			this.paramsPopup = false;
			this.servicePopup = false;
		},
		// 跳首页
		goPage(urlPath) {
			if (!urlPath) {
				return;
			}
			uni.switchTab({
				url: urlPath
			});
		},
		//获取商品详情参数
		async getDetialData() {
			let vm = this;
			let res = await this.$api.request({
				url: this.$api.getGoodsView,
				data: {
					goodsId: this.goodsId,
					userRank: vm.$store.state.userRank
				}
			});
			if (res && res.data) {
				let _res = res.data;
				vm.allproductArr = _res;
				vm.allproductArr.price = vm.allproductArr.price.replace('.00', '');
				vm.swiperImgArr = _res.gallery;
				// 购物车逻辑
				vm.addCartList = _res.addCartList;
				vm.addCartList.marketPrice = _res.marketPrice;
				//
				vm.proviceName = _res.defaultShippingProvince.provinceName;
				vm.attributes = _res.attributes;
				vm.marketSuggest = _res.marketSuggest;
				vm.spuList = _res.addCartList.spuList;
				vm.marketComment = _res.marketComment;
				vm.brand = _res.brand;
				vm.pkgList = _res.pkgList;
				vm.linkGoods = _res.linkGoods;
				vm.status = _res.status;
				vm.activityInfo = _res.activityInfo;
				vm.goodsChangeNum = _res.startNum;
			}
		},
		pageTabbar(scrollTop) {
			if (scrollTop < this.searchBarTop && this.searchBarFixed) {
				// 锁定存在searchBar已经定位的情况下重置不再定位
				this.searchBarFixed = false;
				this.isdetial = 1;
			} else if (scrollTop > this.searchBarTop && this.searchBarTop > 1 && !this.searchBarFixed) {
				// 锁定存在searchBar非定位的情况下重置定位
				this.searchBarFixed = true;
				this.isdetial = 2;
			}
			// 返回顶部显示
			// if (scrollTop > 600 && !this.showTop) {
			// 	this.showTop = true;
			// } else if (scrollTop < 600 && this.showTop) {
			// 	this.showTop = false;
			// }
		}
	},
	onLoad(params) {
		// 第一次加载锁定页面在最顶部
		uni.pageScrollTo({ scrollTop: 0, duration: 0 });
		//获取地址栏参数
		this.goodsId = params.goodsId;
	},
	onPageScroll(event) {
		let { scrollTop } = event;
		this.pageTabbar(scrollTop);
	},
	onShow() {
		this.hidePop();
		this.getDetialData();
	},
	onReady() {
		this.hidePop();
		let that = this;
		setTimeout(function() {
			if (that.imgAllTop < 1) {
				let view = uni.createSelectorQuery().selectAll('.imgAllShow');
				let tabbarView = uni.createSelectorQuery().selectAll('.tabChose');
				view.boundingClientRect(data => {
					let _top = data && data[0] && data[0].top;
					that.imgAllTop = _top;
				}).exec();
				tabbarView
					.boundingClientRect(data => {
						let _top = data && data[0] && data[0].top;
						that.searchBarTop = _top;
					})
					.exec();
			}
		}, 700);
	},
	destroyed() {
		this.clock2 = null;
	}
};
</script>

<style lang="less">
@import url('./jfproDetial.less');
</style>
