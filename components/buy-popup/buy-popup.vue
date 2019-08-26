<template>
	<view class="cartDiglog">
		<view class="mask" @tap="closeDiaCart()" @touchmove.stop.prevent="moveHandle"></view>
		<view class="cartdiaCon">
			<view class="cartDetial" @touchmove.stop.prevent="moveHandle">
				<view class="cartDeLeft"><image class="img" :src="thumb"></image></view>
				<view class="buy-cartDeRight">
					<view class="buy-descFirst">
						<view class="descText">{{ goodsName }}</view>
						<view class="closeCart closeCart2" @tap="closeDiaCart()"></view>
					</view>
					<view class="buy-cartNum">
						<view class="text">起批量≥{{ startNum }}</view>
						<view class="text">库存：{{ stock }}</view>
					</view>
					<view class="buy-cartBtn">
						<text class="is-tag isZhifa" v-if="isZhifa">直发</text>
						<text class="is-tag isBuyByBox" v-if="isBuyByBox">按箱批发</text>
						<text class="is-tag isMix" v-if="isMix">支持混批</text>
					</view>
				</view>
			</view>
			<div style="background:#dce4e6;height:1upx;width:100%;"></div>
			<view class="cartAllGoods">
				<view class="goodsHead">
					<text>选择类型</text>
					<text>采购数量</text>
				</view>
				<scroll-view class="scroll" scroll-y><add-type @update="update" v-for="(item, index) in addList" :key="index" :datas="item"></add-type></scroll-view>
			</view>
			<view class="buy-submitCart">
				<view class="finallResult">
					共
					<text>{{ totalCount }}</text>
					件
					<text>￥{{ totalPrice }}</text>
				</view>
				<view class="button" @tap="sure()">加入采购车</view>
			</view>
		</view>
	</view>
</template>

<script>
import addType from '@/components/buy-popup/add-type.vue';
import {number_format,watchData} from './watch';
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
		}
	},
	data() {
		return {
			maxNum: 0,
			totalCount: 0,
			totalPrice: 0,
			reminder: 1,
			tagList: [],
			startNum: 0,
			goodsName: '',
			stock: 0,
			thumb: '',
			addList: [],
			added: [],

			useData: {},

			isZhifa: false,
			isBuyByBox: false,
			isMix: false
		};
	},
	created() {},
	destory() {},
	watch: {
		datas: {
			handler(newValue, oldValue) {
				watchData(newValue, this);
			},
			immediate: true
		}
	},
	methods: {
		closeDiaCart() {
			this.$emit('close');
		},
		update(value) {
			let { goodsId, goodsNum, goodsPrice } = value;
			let length = this.added.length;
			let totalPrice = 0,
				added = JSON.parse(JSON.stringify(this.added)),
				totalCount = 0;
			if (!length) {
				this.added = [
					{
						goodsId,
						goodsNum,
						goodsPrice
					}
				];
			} else {
				let index = added.findIndex(item => item.goodsId == value.goodsId);
				if (index < 0) {
					added.push({
						goodsId: value.goodsId,
						goodsPrice: value.goodsPrice,
						goodsNum: value.goodsNum
					});
				} else {
					added[index] = {
						goodsId: value.goodsId,
						goodsPrice: value.goodsPrice,
						goodsNum: value.goodsNum
					};
				}
			}
			this.added = added;
			this.added.forEach(item => {
				let _numbder = Number(item.goodsNum);
				totalCount = Number(totalCount) + _numbder;
				totalPrice = Number(totalPrice) + _numbder * Number(item.goodsPrice - 0);
			});
			this.totalCount = parseInt(totalCount);
			this.totalPrice = number_format({
				number: totalPrice,
				decimals: 2,
				roundtag: 'ceil'
			});
		},
		sure(goodsId) {
			if (this.totalCount == 0) {
				this.$api.showMessage('选购商品缺失数量');
				this.$emit('close');
				return;
			}
			let goodsList = this.added.map(item => {
				return {
					goodsId: item.goodsId,
					goodsNum: item.goodsNum
				};
			});
			this.$emit('sure', {
				goodsList: goodsList,
				isVip: this.$store.state.userrank == 4 ? 1 : 0
			});
		},
		moveHandle() {}
	}
};
</script>

<style lang="less" scoped>
@import '../../reset.less';
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
		bottom: @simpleBottom2;
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
		// padding: 10upx;
		// border: 1px solid rgba(220, 228, 230, 1);
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
	// margin-left: 43upx;
	margin-left: 30upx;
	width: 100%;
}

.buy-descFirst {
	width: 100%;
	display: flex;
	justify-content: space-between;

	.descText {
		color: #2f3a40;
		font-size: 28upx;
		// width: 308upx;
		width: 360upx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		margin-bottom: 10upx;
	}

	.closeCart {
		color: #889696;
		font-size: 60upx;
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
	// display: flex;
	// width: 90%;
	// flex-wrap: wrap;
	// justify-content: space-between;
	// margin-top: 57upx;
	// margin-top: 20upx;

	.text {
		color: #889696;
		font-size: 22upx;
	}
}

.buy-cartBtn {
	line-height: 1;
	margin-top: 20upx;

	.is-tag {
		font-size: 24upx;
		padding: 0 10upx;
		border-radius: 4upx;
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
