<template>
	<view>
		<view class="topHots">
			<block v-for="(item, index) in topList" :key="index">
				<view :class="[index == 0 ? 'topGoods0' : index == 1 ? 'topGoods1' : index == 2 ? 'topGoods2' : '']" @tap="handleJumpDetail(item.goodsInfo.goodsId)">
					<view class="goodsLogo">
						<image
							:src="index == 0? '/static/images/hotGoods/icon_no1.png': index == 1? '/static/images/hotGoods/icon_no2.png': index == 2? '/static/images/hotGoods/icon_no3.png': ''"
						></image>
					</view>
					<view class="goodsThumb"><image :src="item.goodsInfo.thumb"></image></view>
					<view class="goodsTitle">{{ item.goodsInfo.goodsName }}</view>
					<view class="goodsDesc">
						<view class="price">{{ item.goodsInfo.goodsPrice }}</view>
						<view class="addCart" @tap.stop="getUserBuy(item)"><image src="/static/images/common/icon_quicknav_shop.png"></image></view>
					</view>
				</view>
			</block>
		</view>
		<view class="goodsList">
			<view class="item" v-for="(item, index) in goodslist" :key="index"><hotGoods-item :itemData="item" @handleAddCart="getUserBuy" @jumpDetail="handleJumpDetail"></hotGoods-item></view>
			<text class="lock-end" v-if="loadingText && goodslist.length > 0">已经到底了</text>
		</view>
		<min-nav :isScroll="showTop" @change="backToTop"></min-nav>
		<block v-if="showCart"><buy-popup :show="showCart" :datas="goodInfo" @close="closeCart" @sure="addCart"></buy-popup></block>
	</view>
</template>

<script>
import hotGoodsItem from '@/components/hotGoods-item/hotGoods-item.vue';
import buyPopup from '@/components/buy-popup/buy-popup.vue';
import minNav from '@/components/min-nav/min-nav.vue';
export default {
	components: {
		hotGoodsItem,
		buyPopup,
		minNav
	},
	data() {
		return {
			topList: [],
			pageSize: 10,
			page: 1,
			goodslist: [],
			loadingText: false,
			//购物车窗口参数
			showCart: false,
			goodInfo: {},
			showTop: false
		};
	},
	computed: {},
	onLoad(params) {
		this.getGoodsList(this.page);
	},
	onPageScroll(event) {
		let { scrollTop } = event;
		if (scrollTop <= 0 && this.showTop) {
			this.showTop = false;
		} else if (scrollTop > 150 && !this.showTop) {
			this.showTop = true;
		}
	},
	onShow() {},
	onReachBottom() {
		console.log('触发了下拉');
		if (this.loadingText) {
			return false;
		}
		// this.loadingText = true;
		// setTimeout(()=> {
		this.getMoreGoods();
		// }, 500);
	},
	methods: {
		backToTop() {
			uni.pageScrollTo({ scrollTop: 0, duration: 10 });
		},
		getMoreGoods() {
			// if (this.totalCount !== this.goodslist.length) {
			let page = this.page++;
			this.getGoodsList(page);
			// }
		},
		async getGoodsList(page) {
			this.loadingText = true;
			let pageSize = this.pageSize;
			let res = await this.$api.request({
				url: this.$api.hot_goods,
				data: {
					page,
					pageSize
				}
			});
			console.log(res, 'res');
			if (res && res.data) {
				let list = res.data.goodsList;
				let resData = list.map((item, index) => {
					let goodsPrice = item.goodsInfo.goodsPrice;
					let array = goodsPrice.split('.');
					item.big = array[0];
					item.min = array[0];
					return item;
				});
				this.goodslist = this.goodslist.concat(resData);
				this.topList = res.data.topList;
				if (this.pageSize > list.length) {
					this.loadingText = true;
				} else {
					this.loadingText = false;
				}
			}
		},
		//关闭购物车弹窗
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
			// this.userValidateLogin(() => {
			this.goodInfo = item;
			this.showCart = true;
			// });
		},
		handleJumpDetail(goodsId){
			console.log(goodsId)
				let urlPath = `../product/product?goodsId=${goodsId}`;
			this.$api.goNavigateTo(urlPath);
		}
		//methods 结束
	}
};
</script>

<style lang="less">
@import url('hotGoods.less');
</style>
