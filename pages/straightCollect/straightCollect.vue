<template>
	<view class="brandListBox">
		<view class="brandListCon">
			<view class="brandListConHead">
				<view class="collectHead" v-if="eventDesc == '' && showTop">
					<view class="left">根据您所在地区，可享受小美直发满{{ amountabove }}包邮</view>
					<view class="right" @tap="showPop('activityPopup')">
						<text>详情</text>
						<text>></text>
					</view>
				</view>
				<view class="collectHead" v-else-if="eventDesc && showTop">
					<view class="left">{{ eventDesc }}</view>
				</view>

				<view class="head"></view>
				<brandListhead2 @change="turnUp" @dialogPop="showPop" :flexTop="true"></brandListhead2>
			</view>
		</view>

		<view class="headEmpty"></view>

		<view class="brandList"><goods-list :list="goodslist" @change="getUserBuy"></goods-list></view>

		<!-- 加载更多 -->
		<view class="loadingText" v-if="loadingText"><image class="image" src="../../static/images/loading/loading.gif" mode=""></image></view>
		<view class="loadingText2" v-if="loadingText&&page<=1"><image class="image" src="../../static/images/loading/loading.gif" mode=""></image></view>

		<view class="fillyPrize-empty">empty</view>

		<BottomBar :type="type" :entityMode="entityMode"></BottomBar>

		<toast-popup :show="activityPopup" title="直发邮费政策" @close="hidePop" @sure="getChangeFreight">
			<view class="fei-active">
				<view class="itemList">小美直发商品邮费分为3个阶段，根据收货地址匹配相应的优惠，详情如下：</view>
				<view class="itemDesc">1)订单金额满2999元包邮，不足2999元收取物流费用20元</view>
				<view class="itemList">收货地址为广东、湖南、湖北、福建、广西、贵州、江西、浙江</view>
				<view class="itemDesc">2)订单金额满3999元包邮，不足3999元收取物流费用30元</view>
				<view class="itemList">收货地址为云南、重庆、四川、陕西、山西、河北、宁夏、北京、天津、上海、山东、江苏、安徽、河南</view>
				<view class="itemDesc">3)订单金额满4999元包邮，不足4999元收取物流费用50元</view>
				<view class="itemList">收货地址为新疆、西藏、青海、甘肃、内蒙、辽宁、吉林、黑龙江、海南的订单</view>
			</view>
		</toast-popup>

		<!-- 已经到底了 -->
		<text class="lock-end" v-if="totalCount == goodslist.length">已经到底了</text>

		<!-- 购物车窗口 -->
		<block v-if="showCart"><buy-popup :show="showCart" :datas="goodInfo" @close="closeCart" @sure="addCart"></buy-popup></block>

		<!-- 右下角浮标 -->
		<view class="foot-r-box users-foot">
			<!-- <view class="item" @click="showMobile"><image src="../../static/images/public/icon_kefu@2x.png" alt="" class="image"></image></view> -->
		</view>
	</view>
</template>

<script>
// import leftpop from '@/components/toast-popup/leftpop.vue';
import goodsList from '@/components/goods-list/goods-list.vue';
import buyPopup from '@/components/buy-popup/buy-popup.vue';
import toastPopup from '@/components/toast-popup/toast-popup2.vue';
import BottomBar from './bottombar.vue';
import brandListhead2 from '@/components/brand-list-head/brand-list-head2.vue';
import { goodsQueryParams, goodsChoseThis, goodsResetNavStyle } from '@/common/goods.js';
export default {
	components: {
		// leftpop,
		goodsList,
		buyPopup,
		toastPopup,
		BottomBar,
		brandListhead2
	},
	data() {
		return {
			showTop: false,
			// 关键字
			keywords: '',

			// 排序
			sortColumn: '',
			order: '',

			// 销量排序
			salesCount: '',
			// 价格排序
			goodsPrice: '',
			// 折扣排序
			discount: '',

			// 筛选参数
			tagsId: '',
			catId: '',
			ctsId: -1,
			ctsName: '',

			// 筛选弹层数据结构
			paramsPopup: false,
			activityPopup: false,
			tagsList: [],
			categoryList: [],
			countriesList: [],

			// 商品列表参数
			page: 0,
			totalCount: 0,
			goodslist: [],
			loadingText: '',
			showCart: false,
			goodInfo: {},

			// 凑单信息
			type: '',
			total: '',
			needMore: '',
			useBaoyou: false,
			amountabove: 0,
			// 满减凑单
			eventDesc: '',
			fullCut: '',
			higherCut: '',
			totalAmount: '',

			entityMode: {},
			access_token: ''
		};
	},
	onLoad(params) {
		this.access_token = uni.getStorageSync('access_token') || this.$store.state.access_token;
		let storeCoudanInfo = uni.getStorageSync('coudanInfo');
		let { type, total, discount, needMore, provinceId, amountabove } = storeCoudanInfo;
		this.amountabove = amountabove;

		this.type = type;
		let title = '';
		if (type === 'zhifa') {
			title = '直发凑单';
		}
		if (type === 'fullcut') {
			title = '满减凑单';
		}
		if (type === 'brand') {
			title = '品牌凑单';
		}
		uni.setNavigationBarTitle({
			title: title
		});
		this.getCoudan();
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
	methods: {
		closeCart() {
			this.showCart = false;
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
			this.getCoudan();
		},
		async getCoudan() {
			let { type, total, discount, needMore, provinceId } = uni.getStorageSync('coudanInfo');
			let url = '';
			switch (type) {
				case 'zhifa':
					url = `${this.$api.zhifa_coudan}?discount=${discount}&provinceId=${provinceId}`;
					break;
				case 'fullcut':
					url = `${this.$api.fullcut_coudan}`;
					break;
				case 'brand':
					url = `${this.$api.brand_coudan}`;
					break;
			}
			let res = await this.$api.request({
				url: url
			});
			if (res && res.data) {
				this.entityMode = res.data;
				this.eventDesc = res.data.eventDesc ? res.data.eventDesc : '';
			}
			this.showTop = true;
		},
		getUserBuy(item) {
			this.goodInfo = item;
			this.showCart = true;
		},
		turnUp(params) {
			let that = this;
			let { sortColumn, order } = params;
			that.sortColumn = sortColumn;
			that.order = order;
			that.page = 0;
			that.goodslist = [];
			that.getGoodsList();
		},
		// 显示类型弹层
		showPop(type) {
			this[type] = true;
			this.$emit('showPop', type);
		},
		// 关闭类型弹层
		hidePop(value) {
			if (value) {
				this.tagsId = '';
				this.catId = '';
				this.ctsId = '';
				this.activityPopup = false;
			} else {
				this.paramsPopup = false;
				this.activityPopup = false;
			}
		},
		useSearch() {
			this.hidePop();
			this.turnUp();
		},
		choseThis(item, index) {
			goodsChoseThis(item, index, this);
		},
		getParams(page, json) {
			this.page++;
			return goodsQueryParams(this, 2);
		},
		// 获取商品列表
		getMoreGoods() {
			if (this.totalCount !== this.goodslist.length) {
				this.getGoodsList();
			}
		},
		async getGoodsList() {
			let that = this;
			let getUrl = this.getParams(0, true);
			that.pages++;
			that.loadingText = true;
			let res = await this.$api.request({
				url: this.$api.getGoodsList,
				data: getUrl
			});
			if (res && res.data) {
				let { goodsList, totalCount } = res.data;
				that.totalCount = totalCount;
				goodsList = goodsList.map(e => {
					let goodsPrice = e.goodsInfo.goodsPrice;
					let array = goodsPrice.split('.');
					e.big = array[0];
					e.min = array[1];
					return e;
				});
				that.goodslist = that.goodslist.concat(goodsList);
				if (totalCount < 1) {
					that.isEmpty = true;
				} else {
					that.isEmpty = false;
				}
			}
			that.loadingText = false;
		},
		focusIn() {
			this.$api.goNavigateTo('../search/search');
		},
		showMobile() {
			this.$api.callMobile();
		}
	},
	mounted() {
		this.hidePop();
	}
};
</script>

<style lang="less">
@import url('./straightCollect.less');

.users-foot {
	bottom: 98upx+20upx;
	position: fixed;
}
</style>
