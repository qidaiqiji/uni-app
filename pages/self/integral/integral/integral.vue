<template>
	<view class="pages integral-page">
		<view class="integral-top">
			<view class="jf-users">
				<image class="jf-users__img" v-if="!headImgUrl" src="../../../../static/images/public/img_user@2x.png" alt=""></image>
				<image class="jf-users__img" v-if="headImgUrl" :src="headImgUrl" alt=""></image>
				<view class="jf-users__info">
					<text class="title">{{ nickName }}</text>
					<view class="desc">
						<text class="jf-grade" :class="[userRank ? 'jf-icon' : '']">{{ rankName }}</text>
						<text class="jf-number">{{ balance }}积分</text>
					</view>
				</view>
			</view>
			<view class="jf-rules" @click="toRules()"><text class="jf-rules__text">积分规则</text></view>
		</view>

		<view class="integral-nav">
			<view class="nav" @click="toDetail()">
				<view class="icons mingxi"></view>
				<text class="nav_text">积分明细</text>
			</view>
			<view class="nav" @click="toOrder()">
				<view class="icons dingdan"></view>
				<text class="nav_text">积分订单</text>
			</view>
		</view>

		<view class="integral-content">
			<!-- 活动 -->
			<view class="integral-ads" v-if="ads.length > 0" @click="goPage('../exchangeDraw/exchangeDraw')"><image class="games-image" :src="ads.img" mode=""></image></view>

			<!-- 优惠券 -->
			<!-- v-if="couponList" -->
			<view class="jf-quan" v-if="couponList.length > 0">
				<view class="integral__text">积分兑换超值券</view>
				<view class="jf-quan__list">
					<block v-for="(item, index) in couponList" :key="index">
						<view class="jf-quan__item" :style="{ 'border-left-color': item.color }">
							<view class="money">
								<text class="text i">￥</text>
								<text class="text">{{ item.cut }}</text>
							</view>
							<view class="info">
								<text class="type-name">{{ item.subType }}</text>
								<text class="type-rule">实付满{{ item.above }}可用</text>
								<text class="type-price">{{ item.integral }}积分兑换</text>
							</view>
							<view @click="takeCoupon(item.ruleId)" v-if="!item.canTake" class="btn">立即兑换</view>
						</view>
					</block>
				</view>
			</view>

			<!-- 积分商品 -->
			<view class="integral-goods-box" v-if="goodsList.length > 0">
				<view class="integral__text">积分换好物</view>
				<view class="goods-list integral-list">
					<view class="goods-item" v-for="(item, index) in goodsList" :key="index">
						<view class="" @click="gojfProDetial(item.goodsId)">
							<view class="goods-img"><image class="image" :src="item.thumb"></image></view>
							<view class="goods-info">
								<view class="texts title">{{ item.goodsName }}</view>
								<view class="jf_number">
									<text>{{ item.integral }}</text>
									<text>积分</text>
								</view>
								<view class="market_price">市场价：￥{{ item.marketPrice }}</view>
							</view>
						</view>
						<view class="botton" @click="getExchangeBuy(item)">
							<view class="button-container">
								<text class="button-text">立即</text>
								<text class="button-text">兑换</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<buyPopup2
			:show="showCart"
			:datas="addCartList"
			:balance="balance"
			:shopPrice="allproductArr.shopPrice"
			:marketPrice="allproductArr.marketPrice"
			@close="closeCart"
			@sure="addCart"
		></buyPopup2>
	</view>
</template>

<script>
import buyPopup2 from '@/components/buy-popup2/buy-popup.vue';
export default {
	components: {
		buyPopup2
	},
	data() {
		return {
			ads: [],
			couponList: [],
			goodsList: [],

			nickName: '',
			balance: '',
			rankName: '',
			userRank: 0,
			headImgUrl: '',

			goodsId: null,
			allproductArr: {},
			addCartList: {},
			showCart: false,

			access_token: ''
		};
	},
	onLoad() {
		this.access_token = uni.getStorageSync('access_token') || '';
		this.nickName = this.$store.state.nickName;
		this.userRank = this.$store.state.userRank;
		this.balance = this.$store.state.balance;
		let avg = uni.getStorageSync('headImgUrl');
		if (avg) {
			this.headImgUrl = avg;
		}
	},
	onShow() {
		let self = this;
		self.getExchangeIndex();
		this.getNameData();
	},
	computed: {
		jf_icon() {
			return this.$store.state.userRank == 4;
		}
	},
	methods: {
		goPage(urlPath) {
			this.$api.goNavigateTo(urlPath);
		},
		getNameData() {
			let that = this;
			that.nickName = uni.getStorageSync('nickName') || '';
			that.balance = uni.getStorageSync('balance') || '';
			that.rankName = uni.getStorageSync('rankName') || '';
		},
		toRules() {
			this.$api.goNavigateTo('../rules/rules');
		},
		toDetail() {
			this.$api.goNavigateTo('../detail/detail');
		},
		toOrder() {
			this.$api.goNavigateTo('../order/order');
		},
		async takeCoupon(ruleId, index) {
			let res = await this.$api.request({
				method: 'GET',
				url: `${this.$api.coupon_take}?ruleId=${ruleId}`
			});
			if (res.code == 0) {
				uni.showToast({ title: res.msg });
				this.couponList[index].canTake = false;
			} else {
				this.$api.showMessage(res.msg);
			}
		},
		async getExchangeIndex() {
			let self = this;
			let res = await this.$api.request({
				method: 'GET',
				access_token: this.access_token,
				url: this.$api.exchange_index
			});
			if (res.code == 0 && res.data) {
				let o = res.data;
				if (o.ads && o.ads.length > 0) {
					this.ads = o.ads[0];
				}
				if (o.couponList && o.couponList.length > 0) {
					self.$set(self, 'couponList', o.couponList);
				}
				let _array = res.data.goodsList.map(e => {
					e.integral = e.integral.replace('.00','');
					return e;
				});
				self.goodsList = _array;
			} else {
				self.$api.showMessage(res.msg);
			}
		},
		// 积分兑换
		getExchangeBuy(item) {
			this.goodsId = item.goodsId;
			this.getExchangeDetail(this.goodsId);
		},
		// 积分兑换商品去详情页
		gojfProDetial(id) {
			this.$api.goNavigateTo(`../product/product?goodsId=${id}`);
		},
		async getExchangeDetail(goodsId) {
			let vm = this;
			let res = await this.$api.request({
				method: 'GET',
				url: `${this.$api.getGoodsView}?goodsId=${goodsId}`
			});
			if (res.code == 0 && res.data) {
				// vm.allproductArr = res.data;
				// vm.addCartList = res.data.addCartList;
				vm.addCartList = res.data;
				vm.showCart = true;
			}
		},
		closeCart() {
			this.showCart = false;
		},
		async addCart(data) {
			let that = this;
			let overVal = data.goodsNum * parseInt(that.addCartList.price);
			if (this.balance < overVal) {
				this.$api.showMessage('可用积分不足');
			} else {
				let res = await this.$api.request({
					method: 'POST',
					url: this.$api.exchange_buy,
					data: {
						goodsId: that.goodsId,
						goodsNum: data.goodsNum
					}
				});
				if (res.code == 0) {
					let val = this.balance - data.goodsNum * parseInt(that.addCartList.price);
					uni.setStorageSync('balance', val);
				}
				this.$api.showMessage(res.msg);
				// this.closeCart();
			}
		}
	}
};
</script>

<style lang="less">
@import url('integral.less');
</style>
