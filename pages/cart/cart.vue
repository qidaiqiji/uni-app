<template>
	<view class="shopCart">
		<view class="cart_wrapper" v-cloak v-if="hasCartGoods">
			<!-- 消息提醒 -->
			<view class="price_tip" v-if="fullCutInfo.fullCutNeedsMoreAmount">
				<view class="body">
					<view class="left_tips">
						<text class="reduce">满减</text>
						<text class="reduceNum">采购满{{ fullCutInfo.higherAmount }}元，可减{{ fullCutInfo.higherCut }}，还差{{ fullCutInfo.fullCutNeedsMoreAmount }}</text>
					</view>
					<view class="right-msg-btn" @click="geCollect('fullcut')"><text class="text red-arrow">去凑单</text></view>
				</view>
			</view>

			<!-- 商品列表 -->
			<view class="cart-list" v-if="validGoodsList.length > 0">
				<view class="" style="">
					<cartListView :list="validGoodsList" @reduce="numReduce" @add="numAdd" @check="tabCheck" @del="cartDelete" @coupon="showCoupon"></cartListView>
				</view>
			</view>

			<view class="cart-list" v-if="invalidGoodsList.length > 0">
				<view class=""><cartListView2 :list="invalidGoodsList" @del="cartDelete"></cartListView2></view>
			</view>

			<!-- 地区选择 -->
			<mpvue-Province-picker ref="mpvueCityPicker" :themeColor="themeColor" :pickerValueDefault="cityPickerValueDefault" @onConfirm="onConfirm"></mpvue-Province-picker>

			<!-- 优惠券 -->
			<view class="disCardDialog">
				<view class="mask" :class="{ show: showCouponDialog }" @click="closeDiaCart()"></view>
				<view class="disCardCon" :class="{ show: showCouponDialog }">
					<view class="coupen-title">优惠券</view>
					<view class="coupon-body">
						<scroll-view class="scroll-body" scroll-y="true"><coupon-list :list="coupon_list"></coupon-list></scroll-view>
					</view>
					<view class="confir-btn">
						<view class="confirTip">秒杀、巨划算、满减、套餐、直降等活动商品不能与优惠券同享</view>
						<view class="btn" @click="closeDiaCart()"><button class="button" type="button">确定</button></view>
					</view>
				</view>
			</view>

			<view class="mbottom">empty</view>

			<view class="getPayment">
				<view class="getAddress">
					<view class="body">
						<view class="addDetial">
							<text class="text">送至</text>
							<!-- 只保留前三位字符 -->
							<text class="text prov red-arrow" @click="showMulLinkageThreePicker()">{{ usercitys }}</text>
						</view>
						<view class="finnaPrize" v-if="zhifaInfo.shippingFreeNeedsMoreAmount != '0.00'">
							小美直发满
							<text>{{ zhifaInfo.shippingAmountAbove }}</text>
							元包邮，还差
							<text>{{ zhifaInfo.shippingFreeNeedsMoreAmount }}</text>
							元
						</view>
						<view class="finnaPrize" v-if="zhifaInfo.shippingFreeNeedsMoreAmount == '0.00'">
							小美直发满
							<text>{{ zhifaInfo.shippingAmountAbove }}</text>
							元包邮，已享受包邮
						</view>
						<view class="right-msg-btn" @click="geCollect('zhifa')"><text class="text red-arrow">去凑单</text></view>
					</view>
				</view>

				<view class="payCon">
					<view class="payLeft">
						<view class="allChose">
							<text class="chose-btn" @click="allchose()" :class="{ active: total.isSelect }"></text>
							<text class="text">全选</text>
						</view>
						<view class="payPrize">
							<text class="z">
								总计：
								<text class="p">￥{{ total.goodsAmount }}</text>
							</text>
							<text v-if="total.discount > 0" class="z">可立减：￥{{ total.discount }}(不含运费)</text>
						</view>
					</view>
					<view class="payRight" @click="payCheckOrder"><button type="button">去结算</button></view>
				</view>
			</view>
		</view>

		<!-- 购物车为空时 -->
		<view class="shopCartEmpty" v-if="showEmptyCart">
			<view class="cart-emptyCon">
				<view class="emptyImg"><image class="image" src="../../static/images/shopCart/empty_car.png" mode=""></image></view>
				<view class="emptyTip">您的购物车空空如也，快去采购吧</view>
				<view class="emptyBtn"><text class="text-btn" @click="toBuyList">去采购</text></view>
			</view>
			<!-- 为您推荐 -->
			<view class="container">
				<view class="proRecommend">
					<view class="proReHead">为您推荐</view>
					<view class="proReCon"><index-goods-list :goodslist="goodslist" @productDetail="goDetail" @change="getUserBuy"></index-goods-list></view>
				</view>
				<view class="loadingText"><image class="image" src="../../static/images/loading/loading.gif" mode=""></image></view>
			</view>
		</view>

		<!-- 购物车窗口 -->
		<block v-if="showCart"><buy-popup :show="showCart" :datas="goodInfo" @close="closeCart" @sure="addCart"></buy-popup></block>
		<confirm @sure="doConfirm" :show="showConfirm"><view class="" style="">确定要删除该商品吗？</view></confirm>
	</view>
</template>

<script>
import mpvueProvincePicker from '@/components/mpvue-provincepicker/mpvueProvincePicker.vue';
import indexGoodsList from '@/components/goods-list/index-goods-list.vue';
import couponList from '@/components/coupon-list/coupon-list.vue';
import buyPopup from '@/components/buy-popup/buy-popup.vue';
import cartListView from './valid/cart-list.vue';
import cartListView2 from './invalid/cart-list.vue';
import confirm from '@/components/confirm/confirm.vue';
import { cartNumberComputed } from '@/common/cart.js';
import { userValidateLogin2 } from '@/common/auth.js';
export default {
	components: {
		mpvueProvincePicker,
		indexGoodsList,
		cartListView,
		cartListView2,
		couponList,
		buyPopup,
		confirm
	},
	data() {
		return {
			showConfirm: false,
			recId: '',
			goodsNum: 1,
			cityPickerValueDefault: [0],
			themeColor: '#FF3366',
			usercitys: '',
			ischoseIcon: false,
			onechoseIcon: false,
			showCouponDialog: false,
			showEmptyCart: false,

			// 接口信息解析
			changeWarning: '',
			fullCutInfo: {},
			hasCartGoods: false,
			invalidGoodsList: [],
			// 省份信息
			provinceId: 0,
			provinceName: '',
			total: {},
			validGoodsList: [],
			zhifaInfo: {},

			// 优惠券
			coupon_list: [],

			// 推荐商品
			pages: 0,
			totalCount: 0,
			loadingText: '',
			goodslist: [],

			// 购物车属性
			showCart: false,
			goodInfo: {},
			access_token: ''
		};
	},
	onLoad() {},
	onShow() {
		let that = this;
		that.$api.getTabbarCart();
		uni.showNavigationBarLoading();
		userValidateLogin2(function() {
			that.access_token = uni.getStorageSync('access_token') || '';
			that.getCartList();
		});
	},
	onReachBottom() {
		if (this.showEmptyCart) {
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
	methods: {
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
			if (res && res.data) {
				this.closeCart();
				this.$api.showMessage(res.msg);
				this.$store.commit('updateCart', res.data.totalCount);
				this.getCartList();
			}
		},
		getUserBuy(item) {
			this.goodInfo = item;
			this.showCart = true;
		},
		showTips(message) {
			uni.showToast({
				icon: 'none',
				title: message
			});
		},
		closeDiaCart(event) {
			this.showCouponDialog = false;
		},
		showDiaCart(event) {
			this.showCouponDialog = true;
		},
		showCoupon(list) {
			this.getMacthCoupon(list);
		},
		async getMacthCoupon(list) {
			let that = this;
			uni.showLoading({
				title: '加载中',
				mask: true
			});
			let res = await this.$api.request({
				method: 'POST',
				header: true,
				url: this.$api.coupon_matchcouponlist,
				data: {
					goodsIdList: list
				},
				access_token: this.access_token
			});
			if (res.code == 0) {
				that.coupon_list = res.data.couponList;
			}
			uni.hideLoading();
			this.showDiaCart();
		},
		// 全选Pid=all,Cid子列表取消或者选择
		async tabCheck(o) {
			let { Pid, Cid, type, recIdsList } = o;
			let that = this;
			if (type === 'one') {
				// 获取当前Pointer位置对象
				let _P = that.validGoodsList[Pid]['goodsList'];
				// 获取实际操作对象
				let _O = _P[Cid];
				if (_O.isSelect) {
					that.cartUnselectAction(_O.recId);
				} else {
					that.cartSelectAction(_O.recId);
				}
			} else if (type === 'class') {
				//全选类
				let _P = that.validGoodsList[Pid];
				let recIds = _P['goodsList'].map(item => item.recId);
				if (_P.isSelect) {
					that.cartUnselectAction(recIds);
				} else {
					that.cartSelectAction(recIds);
				}
			} else {
				//全选所有
				let isSelect = that.total.isSelect;
				if (isSelect) {
					that.cartUnselectAction(recIdsList);
				} else {
					that.cartSelectAction(recIdsList);
				}
			}
		},
		allchose() {
			let list = this.validGoodsList;
			let goods = list.map(item => item.goodsList);
			let goodsList = [];
			goods.forEach(item => {
				goodsList.push(...item);
			});
			let recIdsList = goodsList.map(item => item.recId);
			this.tabCheck({
				type: 'All',
				recIdsList
			});
		},
		showMulLinkageThreePicker() {
			this.$refs.mpvueCityPicker.show();
		},
		// 减少购物车商品
		async numReduce(o) {
			let { Cid, Pid } = o;
			let _P = this.validGoodsList[Pid]['goodsList'];
			let _O = _P[Cid];
			let addGoodsNum = cartNumberComputed(_O, true);
			if (addGoodsNum < _O['startNum']) {
				return this.showTips('购买数量不能低于起订量');
			}
			// _O.cartNum = addGoodsNum;
			this.cartUpdate(_O.recId, addGoodsNum, _O);
		},
		// 增加购物车商品
		async numAdd(o) {
			let { Cid, Pid, inputNum, isStock } = o;
			let _P = this.validGoodsList[Pid]['goodsList'];
			let _O = _P[Cid];
			let addGoodsNum = cartNumberComputed(_O, false);
			if (inputNum) {
				addGoodsNum = inputNum;
			}
			if (addGoodsNum < _O['startNum']) {
				addGoodsNum = _O['startNum'];
			}
			// 库存拦截
			if (addGoodsNum > _O['stock']) {
				return this.showTips('采购数超过库存啦');
			}
			// 手动输入爆库存提示
			if (isStock) {
				uni.showToast({
					icon: 'none',
					title: '采购数超过库存啦',
					success: () => {
						setTimeout(() => {
							this.cartUpdate(_O.recId, addGoodsNum, _O);
						}, 1000);
					}
				});
			} else {
				// _O.cartNum = addGoodsNum;
				this.cartUpdate(_O.recId, addGoodsNum, _O);
			}
		},
		async onConfirm(e) {
			this.usercitys = e.label.replace('-', ' ');
			if (e.cityCode != this.provinceId) {
				this.provinceId = e.cityCode;
				this.cartChangeProvince(e.cityCode);
			}
		},
		// 拉取购物车列表
		async getCartList() {
			let res = await this.$api.request({
				url: this.$api.getCartlist
			});
			if (res && res.data) {
				this.resetCart(res.data);
			}
		},
		// 购物车数量变更
		async cartUpdate(recId, goodsNum, cart) {
			let that = this;
			uni.showLoading({
				mask: true,
				title: '加载中'
			});
			let res = await this.$api.request({
				method: 'POST',
				url: this.$api.cartUpdate,
				data: {
					recId: recId,
					num: goodsNum
				}
			});
			uni.hideLoading();
			that.resetCart(res.data);
		},
		// 	是否确定删除
		async doConfirm(val) {
			if (val) {
				this.cartDeleteAction(this.recId);
			}
			this.showConfirm = false;
		},
		// 显示确定框
		cartDelete(recId) {
			this.showConfirm = true;
			this.recId = recId;
		},
		//删除按钮接口
		async cartDeleteAction(recId) {
			let recIds = typeof recId == 'number' ? [recId] : recId;
			let res = await this.$api.request({
				method: 'POST',
				header: true,
				url: this.$api.deleteShopCart,
				data: {
					recIdList: recIds
				},
				loading: true
			});
			if (res && res.data) {
				this.resetCart(res.data);
			}
		},
		// 购物车勾选
		async cartSelectAction(recId) {
			let res = await this.$api.request({
				method: 'POST',
				header: true,
				url: this.$api.cartSelect,
				data: {
					recIdList: recId
				}
			});
			if (res && res.data) {
				this.resetCart(res.data);
			}
		},
		// 购物车取消勾选
		async cartUnselectAction(recId) {
			let res = await this.$api.request({
				method: 'POST',
				header: true,
				url: this.$api.cartUnselect,
				data: {
					recIdList: recId
				}
			});
			if (res && res.data) {
				this.resetCart(res.data);
			}
		},
		// 直发凑单
		geCollect(type) {
			let total = this.total.goodsAmount;
			let discount = this.total.discount;
			let amountabove = this.zhifaInfo.shippingAmountAbove;
			let needMore = this.zhifaInfo.shippingFreeNeedsMoreAmount;
			let url = '../straightCollect/straightCollect';
			switch (type) {
				case 'zhifa':
					url = `${url}?total=${total}&needMore=${needMore}&type=${type}&provinceId=${this.provinceId}`;
					break;
				case 'fullcut':
					url = `${this.$api.fullcut_coudan}`;
					break;
				case 'brand':
					url = `${this.$api.brand_coudan}?brandId=${this.brandId}`;
					break;
				default:
					break;
			}

			uni.setStorageSync('coudanInfo', {
				type,
				total,
				discount,
				amountabove,
				needMore,
				provinceId: this.provinceId
			});

			this.$api.goNavigateTo('../straightCollect/straightCollect');
		},
		// 满减凑单
		// 品牌凑单
		// 改变省份 获取直发邮费信息
		async cartChangeProvince(provinceId) {
			let res = await this.$api.request({
				url: `${this.$api.cartChangeProvince}?provinceId=${provinceId}`,
				loadingType: 2
			});
			this.zhifaInfo = res.data;
		},
		toBuyList() {
			this.$api.goNavigateTo(`../goods/list/list`);
		},
		//商品详情页
		goDetail(goodsId) {
			this.$api.goNavigateTo(`../goods/product/product?goodsId=${goodsId}`);
		},
		// 获取商品列表
		getMoreGoods() {
			let that = this;
			if (that.showEmptyCart && that.totalCount > that.goodslist.length) {
				this.getGoodsList();
			}
		},
		getGoodsList() {
			let that = this;
			that.pages++;
			that.loadingText = true;
			this.$http({
				method: 'GET',
				url: this.$api.getGoodsList,
				data: {
					page: that.pages,
					pageSize: 10
				},
				success: function(res) {
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
				fail: function(res) {
					that.loadingText = false;
				}
			});
		},
		// 重置购物车数据
		resetCart(datas) {
			let that = this;
			// 接口信息解析
			that.changeWarning = datas.changeWarning;
			that.fullCutInfo = datas.fullCutInfo;
			that.hasCartGoods = datas.hasCartGoods;
			//
			that.invalidGoodsList = datas.invalidGoodsList;

			that.total = datas.total;
			that.validGoodsList = datas.validGoodsList;
			that.zhifaInfo = datas.zhifaInfo;

			that.$store.commit('updateCart', that.total.totalCount);
			that.$api.getTabbarCart(that.total.totalCount);

			// 省份信息
			that.provinceId = datas.provinceId;
			that.provinceName = datas.provinceName;
			that.usercitys = datas.provinceName;
			that.cityPickerValueDefault = [that.provinceId];
			// if (that.validGoodsList.length < 1 && that.invalidGoodsList.length < 1) {
			//     that.showEmptyCart = true;
			// }
			if (!that.hasCartGoods) {
				that.showEmptyCart = true;
				that.getGoodsList();
			} else {
				that.showEmptyCart = false;
			}
		},
		// 确认订单
		payCheckOrder() {
			//必须勾选一个商品才能跳到结算页
			if (this.total.goodsAmount == 0) {
				this.$api.showMessage('请勾选商品');
			} else {
				let url = `../ordercheck/ordercheck?addressId=&prepay=&couponId=&provinceId=${this.provinceId}`;
				this.$api.goNavigateTo(url);
			}
		}
	},
	mounted() {
		setTimeout(this.deleteGoodsFun, 1000);
	}
};
</script>

<style lang="less" scoped>
@import url('less/shopCart.less');
@import url('less/shopCartEmpty.less');

.chose-btn {
	width: 32upx;
	height: 32upx;
	display: inline-block;
	background-image: url('~@/static/images/shopCart/unsecletd.png');
	background-position: center;
	background-repeat: no-repeat;
	background-size: 32upx 32upx;
	vertical-align: middle;

	&.active {
		background-image: url('~@/static/images/shopCart/secleted.png');
	}
}
</style>
