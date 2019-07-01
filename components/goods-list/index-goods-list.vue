<template>
	<view class="index-goods-list">
		<view class="recommList" v-for="item in goodslist" :key="item.goodsInfo.goodsSn">
			<view class="proDetail" @tap="goPage(item.goodsInfo.goodsId)">
				<view class="proImg">
					<image class="image" :src="item.goodsInfo.thumb" mode=""></image>
					<view class="fl-box" v-if="item.goodsInfo.stock<item.goodsInfo.startNum">售罄 {{ item.expectedArrivalTimeText }}</view>
					<view class="fl-box stock2" v-if="item.goodsInfo.stockStatus==1">货源紧张</view>
					<view class="list-video" v-if="item.isVideoTag"></view>
				</view>
				<view class="proDesc">
					<view class="descBtn">
						<view class="tag" v-for="(tag, tagindex) in item.tagList" :key="tagindex" :class="tag.name">{{ tag.text }}</view>
					</view>
					<view class="proTitle">{{ item.goodsInfo.goodsName }}</view>
					<view class="proPirze">
						<view class="prizeLeft" v-if="access_token">
							<view class="price">
								<view class="symbol">￥</view>
								<view class="number">{{ item.big }}</view>
								<view class="dot">.{{ item.min }}</view>
							</view>
							<view class="proDiscot">
								<view class="tag discount" v-if="item.goodsInfo.discount">{{ item.goodsInfo.discount }}折</view>
								<view class="tag discount" v-if="item.goodsInfo.savePrice !== '0.00'">省¥{{ item.goodsInfo.savePrice }}</view>
							</view>
						</view>
						<view class="prizeLeft" v-if="!access_token">
							<view class="price"><view class="rzck">认证查看</view></view>
						</view>
					</view>
				</view>
			</view>
			<view class="proAddCart" @tap="getUserBuy(item)"></view>
		</view>
	</view>
</template>

<script>
export default {
	props: ['goodslist', 'type'],
	data() {
		return {
			access_token: ''
		};
	},
	created() {
		this.access_token = uni.getStorageSync('access_token');
	},
	methods: {
		goPage(goodsId) {
			this.$emit('productDetail', goodsId);
		},
		getUserBuy(item) {
			this.$emit('change', item);
		}
	}
};
</script>

<style lang="less" scoped="scoped">
.rzck {
	background: #d2d2d2;
	color: #fff;
	padding: 6upx 15upx;
	font-size: 24upx;
}

.index-goods-list {
	width: 100%;
	display: -webkit-box;
	display: -webkit-flex;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-pack: justify;
	-webkit-justify-content: space-between;
	-ms-flex-pack: justify;
	justify-content: space-between;
	-webkit-flex-wrap: wrap;
	-ms-flex-wrap: wrap;
	flex-wrap: wrap;
}
</style>
≠
