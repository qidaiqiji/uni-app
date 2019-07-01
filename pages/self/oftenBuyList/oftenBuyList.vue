<template>
	<view class="buy-list">
		<view class="goods-view">
			<goods-list :list="arrayList" @detail="getGoodsId" @change="getUserBuy"></goods-list>

			<!-- 已经到底了v-if="lockend" -->
			<text class="lock-end" v-if="lockend">已经到底了</text>
		</view>

		<!-- 暂无数据 -->
		<block v-if="isEmpty">
			<view class="tiket-unset">
				<view class="unicon undata"></view>
				<view class="text">暂无数据</view>
			</view>
		</block>

		<!-- 购物车窗口 -->
		<block v-if="showCart"><buy-popup :show="showCart" :datas="goodInfo" @close="closeCart" @sure="addCart"></buy-popup></block>
	</view>
</template>

<script>
import goodsList from '@/components/goods-list/goods-list.vue';
import buyPopup from '@/components/buy-popup/buy-popup.vue';
export default {
	components: {
		goodsList,
		buyPopup
	},
	data() {
		return {
			lockend: false,
			isEmpty: false,
			arrayList: [],
			showCart: false,
			goodInfo: {},
			access_token: ''
		};
	},
	onLoad() {
		this.access_token = uni.getStorageSync('access_token') || '';
		this.getbuyListApi();
	},
	onShow() {},
	methods: {
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
		//获取数据
		async getbuyListApi() {
			uni.showLoading({
				title: '加载中'
			});
			let that = this;
			let res = await this.$api.request({
				url: this.$api.buyListAip
			});
			if (res && res.data) {
				let { goodsList } = res.data;
				goodsList = goodsList.map(e => {
					let goodsPrice = e.goodsInfo.goodsPrice;
					let array = goodsPrice.split('.');
					e.big = array[0];
					e.min = array[1];
					return e;
				});
				that.arrayList = that.arrayList.concat(goodsList);
				if (that.arrayList.length < 1) {
					that.isEmpty = true;
				} else {
					that.isEmpty = false;
					// that.lockend = true;
				}
			} else {
				this.$api.showMessage(res.msg);
			}
			uni.hideLoading();
		},
		getGoodsId(goodsId) {
			let url = `../../goods/product/product?goodsId=${goodsId}`;
			this.$api.goNavigateTo(url);
		}
	},
	mounted() {}
};
</script>

<style lang="less">
.goods-view {
	border-top: 1px solid #e5e5e5;
	background: #fff;
}
</style>
