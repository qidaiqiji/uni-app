<template>
	<view class="anniversary">
		<view class="anniCon">
			<view class="anniHead"><image class="img" src="../../../static/images/anniversary/ban.jpg" alt=""></image></view>
			<view class="anniList" :class="{ type1: type == 1, type2: type == 2 }">
				<view class="anniListCon">
					<view class="anniItem" v-for="(item, index) in anniTtemArr" :key="index">
						<view class="proImg" @tap="goDetail(item.goodsInfo.goodsId)"><image class="img" :src="item.goodsInfo.thumb" alt=""></image></view>
						<view class="proDeac">
							<view class="text-hidden title">{{ item.goodsInfo.goodsName }}</view>
							<view class="text-hidden discont">{{ item.tags }}</view>
						</view>
						<view class="proPrice">
							<text class="text">￥</text>
							{{ item.goodsInfo.goodsPrice }}
						</view>
						<view class="an-buyCon" @tap="getUserBuy(item)">
							<view class="buyBtn">立即购买</view>
							<view class="addCart"><!-- <image class="image" src="../../../static/images/anniversary/pro_cartIcon.png" mode="" ></image> --></view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<min-nav :showMenur="false" @change="backToTop"></min-nav>
		<!-- 购物车窗口 -->
		<block v-if="showCart"><buy-popup :show="showCart" :datas="goodInfo" @close="closeCart" @sure="addCart"></buy-popup></block>
	</view>
</template>

<script>
import buyPopup from '@/components/buy-popup/buy-popup.vue';
import minNav from '@/components/min-nav/min-nav.vue';
export default {
	components: {
		buyPopup,
		minNav
	},
	data() {
		return {
			type: 1,
			anniTtemArr: [],
			showCart: false,
			goodInfo: {}
		};
	},
	onLoad(params) {
		let { title } = params;
		let _title = '惊喜满赠';
		if (title == 2) {
			_title = '超值套餐';
		}
		this.type = title;
		uni.setNavigationBarTitle({
			title: _title
		});
		this.getAnniverData();
	},
	onShow() {},
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
		// 去商品详情页
		goDetail(id) {
			let _url = `../../goods/product/product?goodsId=${id}`;
			if (this.type == 2) {
				_url = `${_url}&hidden=2`;
			}
			this.$api.goNavigateTo(_url);
		},
		getAnniverData(id) {
			let that = this;
			let queryUrl = this.type == 1 ? this.$api.anniversaryApi1 : this.$api.anniversaryApi;
			that.$http({
				method: 'GET',
				url: queryUrl,
				success: function(res) {
					if (res.code == 0 && res.data) {
						let data = res.data;
						if (data.flashSaleList) {
							that.anniTtemArr = data.flashSaleList;
						} else {
							that.anniTtemArr = data.goodsList;
						}
					}
				}
			});
		}
	}
};
</script>

<style lang="less">
@import url('./anniversary.less');

.type1 {
	background: #af1e21;
}

.type2 {
	background: #f8bca0;
}
</style>
