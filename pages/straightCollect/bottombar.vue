<template>
	<view class="fillyPrize">
		<!-- 直发凑单 -->
		<view class="container" v-if="type == 'zhifa'">
			<view class="prizeLeft">
				<view class="allPrize">
					<text>已选货值</text>
					<text class="price">￥{{ totalAmount }}</text>
				</view>
				<view v-if="!useBaoyou" class="reducePrice">还差￥{{ needMore }}</view>
				<view v-if="useBaoyou" class="reducePrice">已享包邮</view>
			</view>
			<view class="PrizeRight" @click="goBackCart"><button class="button" type="button">继续采购</button></view>
		</view>
		<view class="container" v-if="type == 'fullcut'">
			<view class="prizeLeft">
				<view class="allPrize">
					<text>已选货值</text>
					<text class="price">￥{{ totalAmount }}</text>
				</view>
				<view v-if="!useBaoyou" class="reducePrice">还差￥{{ needMore }},可立减￥{{ higherCut }}</view>
			</view>
			<view class="PrizeRight" @click="goBackCart"><button class="button" type="button">继续采购</button></view>
		</view>
		<view class="container" v-if="type == 'brand'">
			<view class="prizeLeft">
				<view class="allPrize">
					<text>已选货值</text>
					<text class="price">￥{{ totalAmount }}</text>
				</view>
			</view>
			<view class="PrizeRight" @click="goBackCart"><button class="button" type="button">继续采购</button></view>
		</view>
	</view>
</template>

<script>
export default {
	props: ['type', 'entityMode'],
	data() {
		return {
			eventDesc: '',
			useBaoyou: false,
			// 公共参数
			needMore: 0,
			totalAmount: 0,
			// 直发凑单
			zhifaAmount: 0,
			// 满减凑单
			fullCut: 0,
			higherCut: 0
		};
	},
	// #ifdef H5
	mounted() {
		// this.getValue();
	},
	// #endif
	// #ifndef H5
	onReady() {
		// this.getValue();
	},
	// #endif
	watch: {
		entityMode(newVal, oldVal) {
			let { needMore, totalAmount, zhifaAmount, fullCut, higherCut } = this.entityMode;
			this.needMore = needMore;
			this.totalAmount = totalAmount;
			this.zhifaAmount = zhifaAmount;
			if (this.type == 'zhifa') {
				if (Number(this.totalAmount) > Number(this.zhifaAmount)) {
					this.useBaoyou = true;
				}
			}
			if (this.type == 'fullcut') {
				this.fullCut = fullCut;
				this.higherCut = higherCut;
			}
		}
	},
	methods: {
		getValue() {},
		goBackCart() {
			// uni.navigateBack({
			//     delta: 1
			// })
			uni.reLaunch({
				url: '../cart/cart'
			});
		}
	}
};
</script>

<style lang="less">
.fillyPrize {
	position: fixed;
	bottom: 0;
	width: 100%;
	background: #fff;
	height: 98upx;

	.container {
		width: 100%;
		height: 98upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: #fff;
	}

	.prizeLeft {
		color: #889696;
		font-size: 24upx;
		margin-left: 22upx;

		.allPrize {
			.price {
				color: #ff3366;
			}
		}

		.reducePrice {
		}
	}

	.PrizeRight {
		.button {
			width: 240upx;
			height: 98upx;
			background: #ff3366;
			color: #fff;
			font-size: 32upx;
			line-height: 98upx;
			text-align: center;
			border-radius: 0;
		}
	}
}
</style>
