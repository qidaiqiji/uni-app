<template>
	<view class="cartDiglog">
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
/**
 * 格式化数字
 * @param  {[string | number]} number  [要格式化的数字]
 * @param  {[number]} decimals         [保留几位小数]
 * @param  {[string]} dec_point        [小数点符号]
 * @param  {[string]} thousands_sep    [千分位符号]
 * @param  {[string]} roundtag         [舍入参数，默认 "ceil" 向上取,"floor"向下取,"round" 四舍五入]
 * @return {[string]} 格式化后的结果
 */
function number_format(opt) {
	let { number, decimals, dec_point, thousands_sep, roundtag } = opt;
	number = (number + '').replace(/[^0-9+-Ee.]/g, '');
	roundtag = roundtag || 'ceil'; //"ceil","floor","round"
	var n = !isFinite(+number) ? 0 : +number,
		prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
		sep = typeof thousands_sep === 'undefined' ? ',' : thousands_sep,
		dec = typeof dec_point === 'undefined' ? '.' : dec_point,
		s = '',
		toFixedFix = function(n, prec) {
			var k = Math.pow(10, prec);
			return '' + parseFloat(Math[roundtag](parseFloat((n * k).toFixed(prec * 2))).toFixed(prec * 2)) / k;
		};
	s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
	var re = /(-?\d+)(\d{3})/;
	while (re.test(s[0])) {
		s[0] = s[0].replace(re, '$1' + sep + '$2');
	}

	if ((s[1] || '').length < prec) {
		s[1] = s[1] || '';
		s[1] += new Array(prec - s[1].length + 1).join('0');
	}
	return s.join(dec);
}
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
				if (!newValue.spuList) {
					//非商品详情页
					let entitys = newValue.goodsInfo || newValue;
					let { reminder, thumb, goodsName, stock, startNum, goodsSn, goodsPrice, maxNum, goodsId, numberPerBox, boxNum, buyByBox, isZhifa, isBuyByBox, isMix } = entitys;
					let tagList = newValue.tagList;
					this.thumb = thumb;
					this.goodsName = goodsName;
					this.stock = stock;
					this.startNum = startNum;
					this.tagList = tagList;
					this.isZhifa = isZhifa;
					this.isBuyByBox = isBuyByBox;
					this.isMix = isMix;
					this.addList = [
						{
							reminder,
							thumb,
							goodsName,
							stock,
							startNum,
							goodsSn,
							goodsPrice,
							maxNum,
							boxNum,
							buyByBox,
							goodsId,
							numberPerBox,
							selected: true,
							goodsNum: startNum
						}
					];
					if (maxNum > startNum || maxNum == startNum) {
						this.added = [
							{
								goodsId,
								goodsNum: startNum,
								goodsPrice
							}
						];
						this.totalCount = parseInt(startNum);
						let _price = startNum * (goodsPrice - 0);
						this.totalPrice = number_format({
							number: _price,
							decimals: 2,
							roundtag: 'ceil'
						});
					}
				} else {
					let { goodsThumb, goodsName, goodsNum, start, tagList, isZhifa, isBuyByBox, isMix } = newValue;
					if (!tagList) {
						this.tagList = null;
					}
					this.thumb = goodsThumb;
					this.goodsName = goodsName;
					this.stock = goodsNum;
					this.startNum = start;
					this.isZhifa = isZhifa;
					this.isBuyByBox = isBuyByBox;
					this.isMix = isMix;
					let { maxNum, startNum, goodsId, price } = newValue.spuList[0];
					if (maxNum > startNum || maxNum == startNum) {
						this.added = [
							{
								goodsId,
								goodsNum: startNum,
								goodsPrice: price
							}
						];
						this.totalCount = parseInt(startNum);
						let _price = startNum * (price - 0);
						this.totalPrice = number_format({
							number: _price,
							decimals: 2,
							roundtag: 'ceil'
						});
					}
					this.addList = newValue.spuList.map((item, index) => {
						let { selected, goodsNum } =
							index === 0
								? {
										selected: true,
										goodsNum: item.startNum
								  }
								: {
										selected: false,
										goodsNum: 0
								  };
						return {
							goodsId: item.goodsId,
							boxNum: item.numberPerBox,
							goodsName: item.skuSize,
							goodsNum: goodsNum,
							selected: selected,
							goodsPrice: item.price,
							goodsSn: item.goodsSn,
							maxNum: item.maxNum,
							reminder: item.reminder,
							startNum: item.startNum,
							stock: item.goodsNum,
							thumb: item.goodsThumb,
							numberPerBox: item.numberPerBox
						};
					});
				}
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
		moveHandle(){}
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
		// text-overflow: ellipsis;
		// display: -webkit-box;
		// -webkit-line-clamp: 2;
		// -webkit-box-orient: vertical;
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
		// margin-right: 73upx;
	}
}

.buy-cartBtn {
	font-size: 22upx;
	margin-top: 20upx;

	// position: absolute;
	// bottom: 0;

	.tag {
		font-size: 20upx;
		padding: 0upx 3upx;
		border-radius: 4px;
		margin-right: 15upx;
		border-style: solid;
		border-width: 1px;
	}

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
