<template>
	<view class="content_wrap">
		<view class="findProAll">
			<view class="find-proList" v-for="item in list" :key="item.articleId">
				<view class="firCon" @tap="goBrandDetail(item.brandId)">
					<view class="listhead">
						<view class="headImg"><image class="img" :src="item.authorImg"></image></view>
					</view>
					<view class="headDesc">
						<text class="descText">{{ item.authorName }}</text>
						<datetime :time="item.publishTime"></datetime>
					</view>
				</view>
				<ellipsis :listInfo="item"></ellipsis>
				<view class="find-thidCon">
					<block v-if="item.video">
						<view class="videoContainer"><videoTag :source="item.video" :poster="item.videoImg"></videoTag></view>
					</block>
					<block v-else-if="!item.video && item.imgs.length > 1">
						<view class="imgList" v-for="(img, index) in item.imgs" :key="index">
							<view class="list-img-bg" :style="{ 'background-image': 'url(' + img + ')' }" @tap="preview(item.imgs, img)"></view>
						</view>
					</block>
					<block v-else-if="!item.video && item.imgs.length == 1">
						<view class="big-imgList" v-for="(img, index) in item.imgs" :key="index">
							<image class="bigImages" :src="img" mode="widthFix" @tap="preview(item.imgs, img)"></image>
						</view>
					</block>
				</view>
				<view class="daogouTitile" v-if="item.guideData.guideText && item.guideData.guideLink" @tap="goPage(item.guideData.guideLink)">
					<view class="leftCon">
						<view class="left-icon"></view>
						<text class="guideText">{{ item.guideData.guideText }}</text>
					</view>
					<view class="leftRight"><view class="lr-icon"></view></view>
				</view>
				<view class="fourCon">
					<view class="readNum">{{ item.readCount }}阅读</view>
					<view class="goShopping" @tap="showGoodListPop(item.foundGoods)" v-if="item.foundGoods.length">
						<view class="s30_icons s30_shop_pink showcart">去采购</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 商品列表的弹框 -->
		<view class="toast toast-popup">
			<div class="toast-mask" :class="{ show: goodListPop }" @tap="hidePop" @touchmove.stop.prevent="moveHandle"></div>
			<view class="toast-body" :class="{ show: goodListPop }">
				<view class="head"><text class="text">参数详情</text></view>
				<view class="bodyer">
					<scroll-view class="scroll-body" scroll-y="true" :scroll-top="scrollTops">
						<block v-if="goodListPop">
							<view class="detialList" v-for="(item, index) in goodList" :key="index">
								<view class="ListLeft" @tap="goProductDetail(item.goodsInfo.goodsId)"><image :src="item.goodsInfo.thumb" class="goodImg"></image></view>
								<view class="listRight" @tap="goProductDetail(item.goodsInfo.goodsId)">
									<view class="listText">{{ item.goodsInfo.goodsName }}</view>
									<view class="listPrize">
										<view class="prizeText">￥{{ item.goodsInfo.goodsPrice }}</view>
									</view>
								</view>
								<view class="addCart" @tap="showBuyPopup(item)"></view>
							</view>
						</block>
					</scroll-view>
				</view>
			</view>
		</view>
		<!-- 购物车窗口 -->
		<block v-if="showCart"><buy-popup :show="showCart" :datas="goodInfo" @close="closeCart" @sure="addCart"></buy-popup></block>
	</view>
</template>

<script>
import ellipsis from './ellipsis.vue';
import datetime from './time.vue';
import '@/components/toast-popup/toast-popup.less';
import buyPopup from '@/components/buy-popup/buy-popup.vue';
import videoTag from '@/components/video-tag.vue';
export default {
	props: ['list', 'isActive'],
	components: {
		ellipsis,
		datetime,
		buyPopup,
		videoTag
	},
	data() {
		return {
			showCartDialog: false,
			goodsNum: 1,
			goodListPop: false,
			goodList: [],
			showCart: false,
			goodInfo: {},
			access_token: '',
			scrollTops: 0
		};
	},
	mounted() {},
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
				that.$api.getTabbarCart();
			}
			this.$api.showMessage(res.msg);
			this.closeCart();
		},
		preview(urls, current) {
			uni.previewImage({
				current: encodeURI(current),
				indicator: 'number',
				urls: urls.map(item => encodeURI(item))
			});
		},
		goProductDetail(goodsId) {
			let _url = '../goods/product/product?goodsId=' + goodsId;
			this.$api.goNavigateTo(_url);
		},
		goPage(path) {
			this.$api.goNavigateTo(path);
		},
		goBrandDetail(brandId) {
			if (brandId != 0) {
				let _url = '../goods/brandDetail/brandDetail?brandId=' + brandId;
				this.$api.goNavigateTo(_url);
			}
		},
		showGoodListPop(list) {
			this.goodListPop = true;
			this.goodList = list;
			this.$emit('update', true);
		},
		hidePop() {
			this.goodListPop = false;
			this.$emit('update', false);
		},
		closeCart() {
			this.showCart = false;
			this.$emit('update', false);
		},
		showBuyPopup(item) {
			this.goodInfo = item;
			this.showCart = true;
		},
		moveHandle() {}
	}
};
</script>

<style lang="less">
@import url('less/find.less');
.detialList {
	position: relative;
	background: #f3f3f3;
	padding: 20upx;
	box-sizing: border-box;
	width: 702upx;
	margin: 0 auto;
	display: flex;
	border-radius: 16upx;
	margin-bottom: 20upx;

	.ListLeft {
		font-size: 24upx;

		.goodImg {
			width: 173upx;
			height: 173upx;
		}
	}

	.listRight {
		height: 173upx;
		font-size: 24upx;
		margin-left: 30upx;

		.listText {
			color: #2f3a40;
			font-size: 28upx;
		}

		.listPrize {
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 28upx;
			color: #ff3366;
			margin-top: 40upx;
		}
	}

	.addCart {
		position: absolute;
		z-index: 2;
		height: 60upx;
		width: 60upx;
		background: url('~@/static/images/find/icon_shop.png') 0 0 no-repeat;
		background-size: 100% 100%;

		right: 20upx;
		bottom: 20upx;
	}
}

.daogouTitile {
	height: 78upx;
	padding: 0 24upx;
	background: #ffe3ed;
	line-height: 78upx;
	display: flex;
	justify-content: space-between;

	.leftCon {
		height: 78upx;

		.left-icon {
			display: inline-block;
			width: 33upx;
			height: 33upx;
			vertical-align: middle;
			background: url('~@/static/images/find/new_icon.png') 0 0px no-repeat;
			background-size: 100%;
			margin-top: 5upx;
		}

		.guideText {
			color: #2f3a40;
			font-size: 24upx;
			margin-left: 20upx;
		}
	}

	.leftRight {
		.lr-icon {
			display: inline-block;
			width: 18upx;
			height: 20upx;
			background: url('~@/static/images/find/back_right.png');
			background-size: 100% 100%;
		}
	}
}
</style>
