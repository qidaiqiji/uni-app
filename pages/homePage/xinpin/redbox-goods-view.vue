<template>
	<view class="redbox-goods-view">
		<view class="redbox-goods-view-coll" v-for="(goods, goodsKey) in getGoodsList" :key="goodsKey">
			<view class="img-box" @click="goProductDetail(goods.goodsId)">
				<image class="image" :src="goods.thumb" mode=""></image>
				<view class="list-video" v-if="goods.isVideoTag"></view>
		    </view>
			<view class="info-box">
				<view class="" @click="goProductDetail(goods.goodsId)">
					<view class="hidden-text goods-name">{{ goods.goodsName }}</view>
					<view class="hidden-text goods-desc">{{ goods.goodsBrief }}</view>
				</view>
				<view class="goods-bottom">
					<view class="price">
						<view class="price_ident">¥</view>
						<view class="price_number">{{ goods.big }}</view>
						<view class="price_mantissa">.{{ goods.min }}</view>
					</view>
					<text class="tag discount">{{ goods.discount }}折</text>
				</view>

				<view class="goods-review" v-if="!newPro" @tap="goProductDetail(goods.goodsId)">立即查看</view>
				<view class="goods-review goods-wantTo" v-if="newPro">我想要</view>
			</view>
		</view>
	</view>
</template>

<script>
import price from '@/components/goods-list/price.vue';
export default {
	components: {
		price
	},
	props: ['list', 'newPro'],
	data() {
		return {
			isactiveText: true
		};
	},
	computed: {
		getGoodsList() {
			return this.list ? this.list : [];
		}
	},
	methods: {
		// 商品详情
		goProductDetail(goodsId) {
			let url = `../goods/product/product?goodsId=${goodsId}`;
			this.$api.goNavigateTo(url);
		},
		showAlltext() {
			this.isactiveText = !this.isactiveText;
		}
	}
};
</script>

<style lang="less">
@import url('./redbox-goods-view.less');
</style>
