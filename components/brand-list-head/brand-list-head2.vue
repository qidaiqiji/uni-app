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
			<!--
			<view v-if="!flexTop" class="flex samecate" @tap="showPop('paramsPopup')" :class="{ active: sel == 'sel' }">
				<text>筛选</text>
				<text class="chosePart"></text>
			</view>
			-->
		</view>
	</view>
</template>

<script>
import { turnUp, navStyle } from './action';
export default {
	props: {
		// all: {
		// 	default: 'all'
		// },
		// salesCount: {
		// 	default: ''
		// },
		// goodsPrice: {
		// 	default: ''
		// },
		// discount: {
		// 	default: ''
		// },
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
			navStyle(type, this);
		},
		turnUp(type) {
			turnUp(type, this);
		},
		showPop(pop) {
			this.$emit('dialogPop', pop);
		}
	}
};
</script>

<style lang="less">
// @import url('style.less');
</style>
