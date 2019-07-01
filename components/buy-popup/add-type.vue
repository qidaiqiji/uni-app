<template>
	<view class="add-type">
		<view class="goodsdatas">
			<view class="goodsLeft">
				<view class="leftImg"><image class="img" :src="datas.thumb"></image></view>
				<view class="leftText">
					<view class="name">{{ datas.goodsName }}</view>
					<view class="code">条形码:{{ datas.goodsSn }}</view>
				</view>
			</view>
			<view class="goodsRight">
				<view class="numShow">
					<view class="text text1">￥{{ datas.goodsPrice }}</view>
					<view class="text text2">库存：{{ datas.maxNum }}</view>
				</view>
				<view v-if="datas.maxNum < 1 && reminder == 2" class="cart-btn daohuo" @tap="doSetReminder(datas.goodsId)">到货提醒</view>
				<view v-if="datas.maxNum < 1 && reminder == 1" class="cart-btn daohuo unReminder" @tap="doUnsetReminder(datas.goodsId)">取消提醒</view>
				<view v-if="datas.maxNum > 0" class="numAddRedus">
					<view class="reduce sameNum" @tap="numReduce(datas)" :class="{ disabled: getDisabled }">-</view>
					<view class="num sameNum"><input class="input" type="number" v-model="count" @blur="blur" /></view>
					<view class="add sameNum" @tap="numAdd(datas)" :class="{ disabled: maxDisabled }">+</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { setReminder, unSetReminder } from '@/common/cart.js';
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
			access_token: ''
		};
	},
	// mounted 第二次触发有点问题，放created 感觉没啥问题，先这样测试
	created() {
		let { goodsNum, reminder } = this.datas;
		this.count = goodsNum;
		this.reminder = reminder;
		this.access_token = uni.getStorageSync('access_token');
	},
	mounted() {
		// let { goodsNum, reminder } = this.datas;
		// this.count = goodsNum;
		// this.reminder = reminder;
	},
	computed: {
		getDisabled() {
			return this.count <= this.datas.startNum;
		},
		maxDisabled() {
			return this.count >= this.datas.maxNum;
		},
		getCount() {
			return /^\d+$/.test(this.count) ? this.count : 0;
		}
	},
	methods: {
		async doSetReminder(goodsId) {
			let res = await setReminder(goodsId, this.$store.state.access_token);
			this.$api.showMessage('提醒到货成功');
			this.reminder = 1;
		},
		async doUnsetReminder(goodsId) {
			let res = await unSetReminder(goodsId, this.$store.state.access_token);
			this.$api.showMessage('取消提醒到货成功');
			this.reminder = 2;
		},
		numReduce(datas) {
			let _count = Number(this.count);
			let _numberPerBox = datas.numberPerBox ? Number(datas.numberPerBox) : 1;
			let _boxNum = datas.boxNum ? Number(datas.boxNum) : 1;
			let _startNum = datas.startNum;
			//
			let _boxBumber = _numberPerBox || _boxNum;
			let _addNum = datas.buyByBox ? _boxBumber : 1;
			let _number = _count - Number(_addNum);
			_count = _number <= _startNum ? _startNum : _number;
			// 所有商品只要是小于0或者选中状态下小于起始购买数都提示，
			if (_count < 0 || (_count < _startNum && datas.selected) || _count < _startNum) {
				this.$api.showMessage('亲已不能再少了哦');
				return;
			}
			this.count = _count;
			this.$emit('update', { goodsId: datas.goodsId, goodsNum: this.count, goodsPrice: datas.goodsPrice });
		},
		numAdd(datas) {
			let _count = Number(this.count);
			let _numberPerBox = datas.numberPerBox ? Number(datas.numberPerBox) : 1;
			let _boxNum = datas.boxNum ? Number(datas.boxNum) : 1;
			let _startNum = datas.startNum;
			let _maxNum = datas.maxNum;
			if (_count >= _maxNum) {
				this.$api.showMessage('超过当前可购库存');
				return;
			} else {
				let _stock = _count < _maxNum;
				if (_count == 0 && _stock) {
					_count = _startNum;
				} else if (_stock) {
					let _boxBumber = _numberPerBox || _boxNum;
					let _addNum = datas.buyByBox ? _boxBumber : 1;
					let _number = _count + Number(_addNum);
					_count = _number >= _maxNum ? _maxNum : _number;
				}
			}
			this.count = _count;
			this.$emit('update', { goodsId: datas.goodsId, goodsNum: this.count, goodsPrice: datas.goodsPrice });
		},
		blur(event) {
			let selected = this.datas.selected;
			let num = event.detail.value;
			num = parseInt(num);
			if (num > this.datas.maxNum) {
				this.$api.showMessage('超过当前可购库存');
				this.count = this.datas.maxNum;
			} else if (Boolean(selected) && num < this.datas.startNum) {
				this.count = this.datas.startNum;
			} else if (!selected && num < 0) {
				this.count = 0;
			} else {
				this.count = num;
			}
			this.$emit('update', { goodsId: this.datas.goodsId, goodsNum: this.count, goodsPrice: this.datas.goodsPrice });
		}
	}
};
</script>

<style lang="less" scoped>
.add-type {
	margin-bottom: 15upx;
}
.goodsdatas {
	display: flex;
	justify-content: space-between;
}
.goodsLeft {
	align-items: center;
	display: flex;

	.leftText {
		padding-left: 12upx;
		width: 249upx;

		.name,
		.code {
			display: block;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
			// margin-left: 15upx;
		}

		.name {
			color: #2f3a40;
			font-size: 24upx;
		}

		.code {
			// margin-top: 10upx;
			color: #889696;
			font-size: 22upx;
		}
	}
}
.leftImg {
	border-radius: 4px;
	width: 100upx;
	height: 100upx;

	.img {
		width: 100upx;
		height: 100upx;
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
