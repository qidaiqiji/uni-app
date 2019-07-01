<template>
	<view class="redbox-brand-view">
		<view class="redbox-brand-view-coll" v-for="(brand, brandKey) in getBrandList" :key="brandKey" @click="goBrandDetail(brand.brandId)">
			<view class="bg-con" :style="[{ backgroundImage: 'url(' + brand.brandBanner + ')' }]">
                <view class="bg-mask"></view>
				<view class="content">
				    <view class="brandLogo"><image class="image" :src="brand.brandLogo" mode=""></image></view>
				    <view class="brandName">{{ brand.brandName }}</view>
				    <view class="sellingPoint">{{ brand.sellingPoint }}</view>
				    <view class="goods-view">
				    	<view class="goods-view-coll" v-for="(goods, goodsKey) in brand.goodsList" :key="goodsKey"><image class="image" :src="goods.thumb" mode=""></image></view>
				    </view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: ['list'],
	data() {
		return {};
	},
	computed: {
		getBrandList() {
			return this.list ? this.list : [];
		}
	},
	methods: {
		// 品牌主页
		goBrandDetail(brandId) {
			let url = `../goods/brandDetail/brandDetail?brandId=${brandId}`;
			this.$api.goNavigateTo(url);
		}
	}
};
</script>

<style lang="less">
@import url('./redbox-brand-view.less');
</style>
