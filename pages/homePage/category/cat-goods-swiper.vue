<template>
	<div class="swiper-item-coll">
		<view class="goods-info">
			<view class="view-body">
				<view class="img-box" @tap="goDetail(goods.goodsId)"><image class="image" :src="goods.thumb" alt=""></image></view>
				<view class="info-box">
					<view class="goodName">{{ goods.goodsName }}</view>
					<view class="saleNum">
						<text>销量：</text>
						<text>{{ goods.salesCount }}</text>
					</view>
					<view class="price">
						<view class="goodPrice">¥{{ goods.goodsPrice }}</view>
						<view class="icon_category_shopping goodcar" @tap="sureBuy(goods)"></view>
					</view>
				</view>
			</view>
		</view>
	</div>
</template>

<script>
export default {
	props: {
		goods: {
			default: {}
		}
	},
	data() {
		return {};
	},
	methods: {
		goGoodsDetail(goodsId) {
			let url = `../../goods/product/product?goodsId=${goodsId}`;
			this.$api.goNavigateTo(url);
		},
		// 去商品详情页
		goDetail(id) {
			this.$api.goNavigateTo(`../../goods/product/product?goodsId=${id}`);
		},
		sureBuy(goods) {
			this.$emit('change', goods);
		}
	}
};
</script>

<style lang="less" scoped>
.swiper-item-coll {
	width: 216upx;
	background: #fff;
	border-radius: 4upx;
	position: relative;
}
.goods-info {
	.goodcar {
		// width: 44upx;
		// height: 44upx;
		// background: url('~@/static/images/pinleiguan/icon_shopping@2x.png');
		// background-position: center;
		// background-repeat: no-repeat;
		// background-size: 100%;

		// position: absolute;
		// right: 20upx;
		// bottom: 55upx;
		// bottom: 48upx;
		font-size: 20upx;
		float: right;
		margin-right: 10upx;
	}
}

.img-box {
	position: relative;
	width: 216upx;
	height: 216upx;
	display: block;
	text-align: center;
	border-radius: 4upx;
	margin-bottom: 12upx;

	.image {
		max-width: 100%;
		max-height: 100%;
	}
}

.info-box {
	padding-left: 6upx;

	.goodName {
		width: 100%;
		font-size: 26upx;
		color: #2f3a40;
		margin-bottom: 12upx;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;

		&.small {
			font-size: 24upx;
			word-break: break-word;
			display: -webkit-box;
			overflow: hidden;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
		}
	}

	.saleNum {
		font-size: 22upx;
		color: #889696;
	}

	.price {
		padding: 6upx;
		padding-left: 0;
		overflow: hidden;
	}

	.goodPrice {
		font-size: 28upx;
		color: #ff3366;
		line-height: 48upx;
		float: left;
	}
}
</style>
