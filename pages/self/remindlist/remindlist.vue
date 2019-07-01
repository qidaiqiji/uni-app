<template>
	<view class="pages arrival">
		<view class="arrival-header"><myTabbar :modelData="navData" :initIndex="0" jfdetail="jfdetail" @change="getTabbar" /></view>

		<view class="arrival-goods-list"><goods-list :list="arrayList" @detail="getGoodsId" @change="getUserBuy"></goods-list></view>

		<!-- 无 -->
		<block v-if="isEmpty">
			<view class="tiket-unset arrival-unset">
				<view class="unicon undata"></view>
				<view class="text">暂无数据</view>
			</view>
		</block>

		<!-- 购物车窗口 -->
		<block v-if="showCart"><buy-popup :show="showCart" :datas="goodInfo" @close="closeCart" @sure="addCart"></buy-popup></block>
	</view>
</template>

<script>
import myTabbar from '@/components/tabbar/tabbar.vue';
import goodsList from '@/components/goods-list/goods-list.vue';
import buyPopup from '@/components/buy-popup/buy-popup.vue';
export default {
	components: {
		myTabbar,
		goodsList,
		buyPopup
	},
	data() {
		return {
			navData: [
				{
					label: '已到货',
					key: 'arrival'
				},
				{
					label: '缺货中',
					key: 'notArrival'
				}
			],
			isEmpty: false,
			arrayList: [],
			showkey: 'arrival',
			// 服务器数据
			arrival: [],
			notArrival: [],
			// 购物车数据
			rulesPopup: false,
			goodList: {},
			goodsOneId: 0,
			showCart: false,
			goodInfo: {}
		};
	},
	onLoad() {
		this.getArrival();
	},
	onShow() {},
	methods: {
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
		// 设置到货提醒
		async setTip(goodsId) {
			let vm = this;
			let res = await this.$api.request({
				url: `${this.$api.setReminder}?goodsId=${goodsId}`
			});
			this.$api.showMessage(res.msg);
		},
		// 取消到货提醒
		async calcleTip(goodsId) {
			let vm = this;
			let res = await this.$api.request({
				url: `${this.$api.unSetReminder}?goodsId=${goodsId}`
			});
			this.$api.showMessage(res.msg);
		},
		// 显示类型弹层
		showPop(id) {
			this.rulesPopup = true;
			this.goodsOneId = id;
		},
		// 关闭类型弹层
		hidePop() {
			this.rulesPopup = false;
		},
		getTabbar(key) {
			let that = this;
			let changeTabbar = that.navData[key];
			let showKey = changeTabbar.key;
			that.showKey = changeTabbar.key;
			that.arrayList = that[showKey];
			if (that.arrayList.length < 1) {
				that.isEmpty = true;
			} else {
				that.isEmpty = false;
			}
		},
		async getArrival() {
			let that = this;
			let res = await this.$api.request({
				method: 'GET',
				url: this.$api.goods_remindlist
			});
			if (res.code == 0 && res.data) {
				let { arrival, notArrival } = res.data;
				arrival = arrival.map(e => {
					let goodsPrice = e.goodsInfo.goodsPrice;
					let array = goodsPrice.split('.');
					e.big = array[0];
					e.min = array[1];
					return e;
				});
				notArrival = notArrival.map(e => {
					let goodsPrice = e.goodsInfo.goodsPrice;
					let array = goodsPrice.split('.');
					e.big = array[0];
					e.min = array[1];
					return e;
				});
				that.arrival = arrival;
				that.notArrival = notArrival;
				// 初始化列表
				if (that.arrival.length < 1) {
					that.isEmpty = true;
				} else {
					that.isEmpty = false;
				}
				that.arrayList = arrival;
			} else {
				this.$api.showMessage(res.msg);
			}
		},
		getGoodsId(goodsId) {
			let url = `../../goods/product/product?goodsId=${goodsId}`;
			this.$api.goNavigateTo(url);
		},
		goUserBuy(item) {}
	}
};
</script>

<style lang="less" scoped="scoped">
.arrival-unset {
	background: #fff;
	min-height: 800upx;
	padding-top: 240upx;
	margin: auto;
}
.arrival-goods-list {
	margin-top: 20upx;
	background: #fff;
	width: 100%;
}

.arrival-header {
	background: #fff;
}
</style>
