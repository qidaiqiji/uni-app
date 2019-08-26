<template>
	<view class="add-type">
		<view class="goodsdatas">
			<view class="goodsLeft">
				<view class="leftText">
					<text class="newText">{{ datas.price }}积分</text>
					<text class="oldText">￥{{ datas.marketPrice }}</text>
				</view>
			</view>
			<view class="goodsRight">
				<view class="numAddRedus">
					<view class="reduce sameNum" @tap="numReduce(datas)" :class="{ disabled: getDisabled }">-</view>
					<view class="num sameNum"><input class="input" type="number" v-model="count" @blur="blur" /></view>
					<view class="add sameNum" @tap="numAdd(datas)">+</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		datas: {
			isRequired: true,
			type: Object
		}
	},
	data() {
		return {
			count: 0,
			reminder: 2,
			balance: 0,
			price: 0
		};
	},
	created() {
		this.inits();
	},
	updated() {
		// this.inits();
	},
	mounted() {},
	computed: {
		getDisabled() {
			return this.count < this.datas.startNum || this.count == this.datas.startNum;
		}
	},
	methods: {
		inits() {
			let { startNum, price, shopPrice } = this.datas;
			this.price = shopPrice || price;
			this.count = startNum;
			this.balance = uni.getStorageSync('balance') * 1;
		},
		numReduce(datas) {
			if (datas.startNum == this.count && datas.selected) {
				return this.$api.showMessage('亲已不能再少了哦');
			}
			let val = Number(this.count) - 1;
			if (val < datas.startNum) {
				return this.$api.showMessage('亲已不能再少了哦');
			}
			this.count = val;
			// this.$emit('update', val);
			this.$emit('update', { goodsId: datas.goodsId, goodsNum: this.count, goodsPrice: datas.goodsPrice });
		},
		numAdd(datas) {
			let val = Number(this.count) + 1;
			let balance = Number(this.balance) * 1;
			let _thisVal = val * parseInt(this.price);
			if (_thisVal > balance) {
				return this.$api.showMessage('可用积分不足');
			}
			if (val > datas.goodsNumber) {
				return this.$api.showMessage('超过当前可兑换库存');
			}
			this.count = val;
			// this.$emit('update', val);
			this.$emit('update', { goodsId: datas.goodsId, goodsNum: this.count, goodsPrice: datas.goodsPrice });
		},
		blur(event) {
			let selected = this.datas.selected;
			let num = event.detail.value;
			let balance = this.balance;
			let _thisVal = num * parseInt(this.price);
			if (_thisVal > balance) {
				this.count = this.datas.startNum;
				return this.$api.showMessage('可用积分不足');
			}
			if (num > this.datas.goodsNumber) {
				this.count = this.datas.goodsNumber;
				return this.$api.showMessage('超过当前可兑换库存');
			}
			this.$emit('update', num);
		}
	}
};
</script>

<style lang="less" scoped="scoped">
.add-type {
	margin-bottom: 15upx;
}
.goodsdatas {
	display: flex;
	justify-content: space-between;
}
.goodsLeft {
	display: flex;
	.leftText {
		width: 249upx;
		text {
			display: block;
			margin-top: 10upx;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
			margin-left: 15upx;
		}
		.name {
			color: #2f3a40;
			font-size: 24upx;
		}
		.code {
			color: #889696;
			font-size: 22upx;
		}

		.newText {
			color: #ff3366;
			font-size: 28upx;
		}

		.oldText {
			color: #889696;
			font-size: 22upx;
			text-decoration: line-through;
		}
	}
}
.leftImg {
	.img {
		width: 83upx;
		height: 83upx;
		padding: 8upx;
		border: 1px solid #dce4e6;
		border-radius: 4px;
	}
}
.goodsRight {
	display: flex;
	align-items: center;
	justify-content: space-between;
	.numShow {
		padding-right: 12upx;
		.text {
			width: 100%;
			display: block;
			text-align: right;
			padding-right: 8upx;
		}
		.text1 {
			color: #ff3366;
			font-size: 24upx;
		}
		.text2 {
			color: #889696;
			font-size: 22upx;
			margin-top: 5upx;
		}
	}
	.numAddRedus {
		display: flex;
		.sameNum {
			width: 60upx;
			height: 60upx;
			line-height: 60upx;
			text-align: center;
			border: 1px solid #dce4e6;
			font-size: 24upx;
			color: #2f3a40;
		}
		.input {
			height: 60upx;
			width: 60upx;
		}
		.num.sameNum {
			border-right: none;
			border-left: none;
		}
		.sameNum.disabled {
			color: #dce4e6;
		}
	}
	.cart-btn {
		width: 186upx;
		height: 60upx;
		color: #fff;
		text-align: center;
		line-height: 60upx;
		font-size: 28upx;
	}

	.daohuo {
		background-color: #00bd99;
	}

	.miaosha {
		background-color: #ff3366;
	}

	.souxin {
		background: #d4d4d4;
	}

	.daohuo.unReminder {
		background-color: #dce4e6;
		color: #2f3a40;
	}
}
</style>
