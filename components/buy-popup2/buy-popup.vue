<template>
	<view class="cartDiglog" v-if="show">
		<view class="mask" @tap="closeDiaCart()" @touchmove.stop.prevent="moveHandle"></view>
		<view class="cartdiaCon">
			<view class="cartDetial">
				<view class="cartDeLeft"><image class="img" :src="thumb"></image></view>
				<view class="buy-cartDeRight">
					<view class="buy-descFirst">
						<view class="descText">{{ goodsName }}</view>
						<view class="closeCart closeCart2" @tap="closeDiaCart()"></view>
					</view>
					<view class="buy-cartNum">
						<view class="text">规格：{{ unit }}</view>
						<view class="text">库存：{{ goodsNumber }}</view>
					</view>
				</view>
			</view>
			<view class="cartAllGoods">
				<view class="goodsHead">
					<text>所需积分</text>
					<text>兑换数量</text>
				</view>
				<scroll-view class="scroll" scroll-y><add-type @update="update" v-for="(item, index) in addList" :key="index" :datas="item"></add-type></scroll-view>
			</view>
			<view class="buy-submitCart"><view class="button" @tap="sure()">确定</view></view>
		</view>
	</view>
</template>

<script>
import addType from './add-type.vue';
export default {
	components: {
		addType
	},
	props: {
		datas: {
			isRequired: true,
			type: Object
		},
		goodId: {
			isRequired: true,
			type: Number
		},
		show: {
			type: Boolean,
			default: false
		},
		shopPrice: 0,
		marketPrice: '',
		balance: 0
	},
	data() {
		return {
			// 商品图片
			thumb: '',
			// 商品名称
			goodsName: '',
			// 规格
			unit: '',
			// 库存
			goodsNumber: 0,

			addList: [],
			added: [],
			count: 0,

			isZhifa: false,
			isBuyByBox: false,
			isMix: false
		};
	},

	watch: {
		datas(newValue, oldValue) {
			// 积分商品详情页
			let { goodsName, goodsNumber, goodsThumb, videoFace, isBuyByBox, isMix, isZhifa, maxNum, numberPerBox, startNum, unit, price, marketPrice, balance } = newValue;
			this.thumb = goodsThumb || videoFace;
			this.goodsName = goodsName;
			this.unit = unit;
			this.goodsNumber = goodsNumber || maxNum;
			this.count = startNum;
			this.addList = [
				{
					goodsName,
					goodsNumber,
					goodsThumb,
					isBuyByBox,
					isMix,
					isZhifa,
					maxNum,
					// numberPerBox,
					startNum,
					unit,
					selected: true,
					numberPerBox: numberPerBox,
					price: price,
					marketPrice: marketPrice,
					balance: balance
				}
			];
		}
	},
	mounted() {},
	methods: {
		closeDiaCart() {
			this.$emit('close');
		},
		update(value) {
			this.count = value;
		},
		sure(goodsId) {
			let balance = this.balance * 1;
			// 总数%2+1,求使用多少次数的积分
			// let val = ((this.count % 2) + 1) * parseInt(this.shopPrice);
			let val = this.count * parseInt(this.shopPrice);
			if (val > balance) {
				return this.$api.showMessage('您的积分不足');
			}
			this.$emit('sure', { goodsNum: this.count });
		},
		moveHandle() {}
	}
};
</script>

<style lang="less" scoped="scoped">
.cartDiglog {
	position: fixed;
	background: rgba(0, 0, 0, 0.5);
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	z-index: 99;
	.cartdiaCon {
		z-index: 22;
		background: #fff;
		position: fixed;
		height: 959upx;
		bottom: calc(var(--window-bottom) + 0px);
		//bottom: 0;
		left: 0;
		width: 100%;
	}
}
.mask {
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	z-index: 20;
}
.scroll {
	height: 400upx;
}

.cartDetial {
	margin: auto;
	width: 702upx;
	padding: 43upx 0;
	display: flex;
	// padding: 43upx 24upx;
	.cartDeLeft {
		padding: 10upx;
		border: 1px solid rgba(220, 228, 230, 1);
		width: 240upx;
		height: 240upx;
		box-sizing: border-box;
		.img {
			width: 218upx;
			height: 218upx;
		}
	}
}
.cartAllGoods {
	padding: 0 25upx;
	.goodsHead {
		height: 78upx;
		line-height: 78upx;
		color: #889696;
		font-size: 24upx;
		display: flex;
		justify-content: space-between;
	}
}
.buy-cartDeRight {
	position: relative;
	margin-left: 43upx;
	width: 100%;
}

.buy-descFirst {
	width: 100%;
	display: flex;
	justify-content: space-between;
	.descText {
		color: #2f3a40;
		font-size: 28upx;
		width: 308upx;
		overflow: hidden;
		// text-overflow: ellipsis;
		// display: -webkit-box;
		// -webkit-line-clamp: 2;
		// -webkit-box-orient: vertical;
	}
	.closeCart {
		color: #889696;
		font-size: 28upx;
	}
	.closeCart2 {
		font-size: 28upx;
		background-image: url('~@/static/images/s44/icon_close.png');
		background-repeat: no-repeat;
		background-position: center;
		background-size: 30upx 30upx;
		width: 50upx;
		height: 50upx;
	}
}

.buy-cartNum {
	width: 90%;
	flex-wrap: wrap;
	margin-top: 20upx;
	.text {
		color: #889696;
		font-size: 22upx;
	}
}

.buy-cartBtn {
	.tag {
		font-size: 20upx;
		padding: 0upx 3upx;
		border-radius: 4px;
		margin-right: 15upx;
		border-style: solid;
		border-width: 1px;
	}
}

.buy-cartBtn {
	position: absolute;
	bottom: 0;

	.is-tag {
		// font-size: 24upx;
		font-size: 19upx;
		padding: 0 9upx;
		border-radius: 4px;
		margin-right: 15upx;
		border: 1px solid transparent;
	}

	.isZhifa {
		border: 1px solid #ff3366;
		background: #ff3366;
		color: #fff;
	}

	.isBuyByBox {
		border: 1px solid #fe9806;
		color: #fe9806;
	}

	.isMix {
		border: 1px solid #0087ea;
		color: #0087ea;
	}
}
.buy-submitCart {
	// position: fixed;
	position: absolute;
	left: 0;
	bottom: 0;
	width: 100%;

	.finallResult {
		height: 54upx;
		text-align: right;
		line-height: 54upx;
		font-size: 24upx;
		padding: 0 28upx;
		color: #889696;
		border-top: 1px solid #dce4e6;
		text {
			margin-left: 15upx;
			margin-right: 15upx;
			color: #ff3366;
		}
		text:nth-child(2) {
			margin-right: 0upx;
		}
	}
	.button {
		width: 100%;
		height: 98upx;
		line-height: 98upx;
		text-align: center;
		background: #ff3366;
		font-size: 32upx;
		color: #fff;
		border-radius: 0;
	}
}
</style>
