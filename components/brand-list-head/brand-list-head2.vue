<template>
	<view class="brandListhead">
		<view class="flex titleCon">
			<view class="flex samecate" @tap="turnUp('all')" :class="{ active: all == 'all' }">综合</view>
			<view class="flex samecate" @tap="turnUp('salesCount')" :class="{ active: salesCount != '' }">
				<text>销量</text>
				<view class="iconList">
					<text class="arrow up" :class="{ active: salesCount == 'order' }"></text>
					<text class="arrow down" :class="{ active: salesCount == 'desc' }"></text>
				</view>
			</view>
			<view class="flex samecate" @tap="turnUp('goodsPrice')" :class="{ active: goodsPrice != '' }">
				<text>价格</text>
				<view class="iconList">
					<text class="arrow up" :class="{ active: goodsPrice == 'order' }"></text>
					<text class="arrow down" :class="{ active: goodsPrice == 'desc' }"></text>
				</view>
			</view>
			<view class="flex samecate" @tap="turnUp('discount')" :class="{ active: discount != '' }">
				<text>折扣</text>
				<view class="iconList">
					<text class="arrow up" :class="{ active: discount == 'order' }"></text>
					<text class="arrow down" :class="{ active: discount == 'desc' }"></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		sel: {
			default: ''
		},
		flexTop: {
			default: false
		}
	},
	data() {
		return {
			// 样式设置
			all: 'all',
			salesCount: '',
			goodsPrice: '',
			discount: '',
			// sel: '',

			// 接口参数
			sortColumn: '',
			order: ''
		};
	},
	updated() {
		if (this.sel) {
			this.resetStyle(this.sel);
		}
	},
	methods: {
		resetStyle(type) {
			['all', 'salesCount', 'goodsPrice', 'discount'].map(item => {
				if (item != type) {
					this[item] = '';
				}
			});
		},
		turnUp(type) {
			let that = this;
			that.resetStyle(type);
			if (type != 'all') {
				if (!that[type] || that[type] == 'desc') {
					that[type] = 'order';
				} else {
					that[type] = 'desc';
				}
				if (type == 'goodsPrice') {
					that.sortColumn = 'min_price';
				} else if (type == 'salesCount') {
					that.sortColumn = 'sale_count';
				} else if (type == 'discount') {
					that.sortColumn = 'discount';
				}
				that.order = that[type].toUpperCase();
			} else {
				that[type] = type;
			}
			that.$emit('change', { sortColumn: that.sortColumn, order: that.order });
		},
		showPop(pop) {
			this.$emit('dialogPop', pop);
		}
	}
};
</script>

<style lang="less" scoped="scoped">
@head: 78upx;
	
.brandListhead {
	width: 100%;
	height: @head;
	line-height: @head;
	border-bottom: 1px solid #e5e5e5;
	
	.titleCon {
		background: #fff;
		width: 100%;
	}

	.samecate {
		width: 25%;
		text-align: center;
		color: #2f3a40;
		font-size: 26upx;

		&.active {
			color: #ff3366;
		}
	}

	.iconList {
		margin-left: 5px;
	}

	.arrow {
		width: 20upx;
		height: 20upx;
		display: block;
		background-repeat: no-repeat;
		background-size: 100%;

		&.up {
			background-image: url('~@/static/images/brandList/arrow_up_grey.png');
			background-position: center center;

			&.active {
				background-image: url('~@/static/images/brandList/arrow_up_red.png');
			}
		}

		&.down {
			background-image: url('~@/static/images/brandList/arrow_down_grey.png');
			// background-position: center top;

			&.active {
				background-image: url('~@/static/images/brandList/arrow_down_red.png');
			}
		}
	}

	.chosePart {
		width: 30upx;
		height: 30upx;
		display: block;
		background: url('~@/static/images/brandList/icon_screen_none.png');
		background-size: 100%;
	}
}
</style>
