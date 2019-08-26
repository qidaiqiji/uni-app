<template>
	<view class="brandListBox">
		<view class="brandListCon">
			<view class="brandListConHead">
				<view class="searchBox">
					<view class="searchPart" style="position: relative;" @tap="focusIn">
						<view class="search">
							<text class="search-icon"></text>
							<input type="text" placeholder="采购商品、品牌" v-model="keywords" disabled="disabled" />
						</view>
					</view>
				</view>
				<view class="head"><brandListhead @change="turnUp" @dialogPop="showPop" :sel="sel" :flexTop="true"></brandListhead></view>
			</view>
		</view>

		<view class="headEmpty">headEmpty</view>

		<!-- 商品列表 -->
		<view class="brandList"><goods-list :list="goods_list" @change="getUserBuy"></goods-list></view>

		<!-- 加载更多 -->
		<view class="loadingText" v-if="loadingText"><image class="image" src="../../../static/images/loading/loading.gif" mode=""></image></view>
		<view class="loadingText2" v-if="loadingText"><image class="image" src="../../../static/images/loading/loading.gif" mode=""></image></view>

		<!-- 已经到底了 -->
		<text class="lock-end" v-if="totalCount == goods_list.length && goods_list.length > 0">已经到底了</text>

		<!-- 搜索不到相关商品 -->
		<block v-if="isEmpty">
			<view class="tiket-unset">
				<view class="unicon undata"></view>
				<view class="text">搜索不到相关商品</view>
			</view>
		</block>

		<!-- 参数的弹框 -->
		<leftpop :show="paramsPopup" title="筛选" @close="hidePop" @sure="useSearch">
			<view class="params-box">
				<view class="choseCon">
					<view class="cateHead">推荐</view>
					<view class="tagList">
						<view class="tagOne" v-for="(item, index) in tagsList" :key="index" :class="{ tagActive: item.id == tagsId }" @tap="choseThis(item)">{{ item.name }}</view>
					</view>
				</view>
				<view class="choseCon">
					<view class="cateHead">品类</view>
					<view class="tagList">
						<view class="tagOne" v-for="(item, index) in categoryList" :key="index" :class="{ tagActive: item.catId == catId }" @tap="choseThis(item)">
							{{ item.catName }}
						</view>
					</view>
				</view>
				<view class="choseCon">
					<view class="cateHead">品牌产地</view>
					<view class="tagList" style="margin-bottom: 100upx;">
						<view class="tagOne" v-for="(item, index) in countriesList" :key="index" :class="{ tagActive: ctsId == index }" @tap="choseThis(item, index)">
							{{ item }}
						</view>
					</view>
				</view>
			</view>
		</leftpop>
		<min-nav :isScroll="showTop" @change="backToTop"></min-nav>
		<!-- 购物车窗口 -->
		<block v-if="showCart"><buy-popup :show="showCart" :datas="goodInfo" @close="closeCart" @sure="addCart"></buy-popup></block>
	</view>
</template>

<script>
import minNav from '@/components/min-nav/min-nav.vue';
import leftpop from '@/components/toast-popup/leftpop.vue';
import goodsList from '@/components/goods-list/goods-list.vue';
import buyPopup from '@/components/buy-popup/buy-popup.vue';
import brandListhead from '@/components/brand-list-head/brand-list-head.vue';
import { goodsQueryParams, goodsChoseThis, goodsResetNavStyle } from '@/common/goods.js';
export default {
	components: {
		minNav,
		leftpop,
		goodsList,
		buyPopup,
		brandListhead
	},
	data() {
		return {
			showTop: false,
			// 关键字
			keywords: '',
			// 综合
			all: 'all',
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
			sel: '',
			tagsId: '',
			catId: '',
			ctsId: -1,
			ctsName: '',

			// 使用优惠券
			eventId: '',

			// 筛选弹层数据结构
			paramsPopup: false,
			tagsList: [],
			categoryList: [],
			countriesList: [],

			// 分类子分类
			catIdList: '',
			// 商品列表参数
			isEmpty: false,
			page: 0,
			pageSize: 10,
			totalCount: 0,
			goods_list: [],
			loadingText: '',
			showCart: false,
			goodInfo: {},
			access_token: ''
		};
	},
	onLoad(params) {
		let { keywords, catId, catIdList, eventId } = params;
		this.access_token = uni.getStorageSync('access_token') || '';
		this.keywords = keywords;
		this.catId = catId;
		this.catIdList = catIdList;
		// 使用优惠券查询商品
		this.eventId = eventId;
		this.getGoodsfilter();
		this.getGoodsList();
	},
	onShow() {},
	onPageScroll(event) {
		let { scrollTop } = event;
		if (scrollTop <= 0 && this.showTop) {
			this.showTop = false;
		} else if (scrollTop > 150 && !this.showTop) {
			this.showTop = true;
		}
	},
	onReachBottom() {
		var that = this;
		if (that.totalCount != that.goods_list.length) {
			if (that.loadingText) {
				return false;
			}
			that.loadingText = true;
			setTimeout(function() {
				that.getGoodsList();
			}, 500);
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
		},
		closeCart() {
			this.showCart = false;
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
			that.goods_list = [];
			that.getGoodsList();
		},
		// 显示类型弹层
		showPop(type) {
			this[type] = true;
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
		},
		useSearch() {
			this.sel = 'sel';
			this.hidePop();
			this.turnUp('sel');
		},
		choseThis(item, index) {
			goodsChoseThis(item, index, this);
		},
		getParams(page, json) {
			this.page++;
			return goodsQueryParams(this, 2);
		},
		// 获取商品列表
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
				let list = goodsList;
				that.totalCount = totalCount;
				if (totalCount < 1) {
					that.isEmpty = true;
				} else {
					that.isEmpty = false;
				}
				for (let t = 0; t < list.length; t++) {
					let goodsPrice = list[t].goodsInfo.goodsPrice;
					let array = goodsPrice.split('.');
					list[t].big = array[0];
					list[t].min = array[1];
				}
				that.$nextTick(() => {
					that.goods_list = that.goods_list.concat(list);
				});
			} else {
				that.isEmpty = true;
			}
			that.loadingText = false;
		},
		async getGoodsfilter() {
			let vm = this;
			let res = await this.$api.request({
				url: this.$api.getGoodsfilter
			});
			if (res && res.data) {
				let datas = res.data;
				vm.tagsList = datas.tags;
				vm.categoryList = datas.category;
				vm.countriesList = datas.countries;
			}
		},
		focusIn() {
			uni.redirectTo({ url: '../../search/search' });
		}
	}
};
</script>

<style lang="less" scoped="scoped">
@import url('./list.less');
</style>
