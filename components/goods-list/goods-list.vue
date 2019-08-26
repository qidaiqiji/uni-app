<template>
	<view class="goods-list-box">
		<view class="item" v-for="(item, listKey) in list" :key="listKey">
			<view class="goodsInfo">
				<!-- 图片信息 -->
				<view class="fl img-box" @tap="goDetail(item.goodsInfo.goodsId)">
					<!-- <image :src="item.goodsInfo.thumb" mode="" class="image"></image> -->
					<view class="thumb-images"  :style="{ 'background-image': 'url(' + item.goodsInfo.thumb + ')' }"></view>
					<view class="fl-box" v-if="item.goodsInfo.stock<item.goodsInfo.startNum">售罄 {{ item.expectedArrivalTimeText }}</view>
					<view class="fl-box stock" v-if="item.goodsInfo.stockStatus==1">货源紧张</view>
					<!-- <view class="fl-box" v-if="item.goodsInfo.stockStatus == 3">大货到仓</view> -->
					<view class="list-video" v-if="item.isVideoTag"></view>
				</view>
				<!-- 文字信息 -->
				<view class="fr r-info-box">
					<!-- 通用标签 -->
					<view class="tag-box">
						<view class="tag" v-for="(item, index) in item.tagList" :key="index" :class="item.name">{{ item.text }}</view>
					</view>

					<!-- 商品名称 -->
					<view class="r-title" @tap="goDetail(item.goodsInfo.goodsId)">{{ item.goodsInfo.goodsName }}</view>

					<view class="r-described" @tap="goDetail(item.goodsInfo.goodsId)">
						<text class="text rateRange">利润率 {{ item.goodsInfo.rateRange }}</text>
						<text class="text salesCount">销量 {{ item.goodsInfo.salesCount }}</text>
					</view>
					 <!-- style="margin-top:5upx;" -->
					<view class="r-foot">
						<view class="price">
							<text class="price_ident">¥</text>
							<text class="price_number">{{ item.big }}</text>
							<text class="price_mantissa">.{{ item.min }}</text>
						</view>
						<view class="tag discount" v-if="item.goodsInfo.discount">{{ item.goodsInfo.discount }}折</view>
						<view class="tag discount" v-if="item.goodsInfo.savePrice !== '0.00'">省¥{{ item.goodsInfo.savePrice }}</view>
					</view>
				</view>
			</view>
			<view class="shoppingBuy" @tap="goUserBuy(item)"></view>
		</view>
	</view>
</template>

<script>
export default {
	props: ['list', 'type'],
	data() {
		return {};
	},
	computed: {
		getPublic() {
			return this.type && this.type === 'public' ? true : false;
		}
	},
	created() {},
	filters: {},
	methods: {
		goPage(goodsId) {
			this.$emit('detail', goodsId);
		},
		goUserBuy(item) {
			this.$emit('change', item);
		},
		// 去商品详情页
		goDetail(goodsId) {
			let _url = `/pages/goods/product/product?goodsId=${goodsId}`;
			this.$api.goNavigateTo(_url);
		}
	}
};
</script>

<style lang="less">
.price {
	&_ident,
	&_number,
	&_mantissa {
		// vertical-align: initial;
	}
}
</style>
