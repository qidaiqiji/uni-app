<template>
	<view class="dot-container">
		<view class="product" v-if="page === 'product'">
			<view class="dot-item" v-for="(item, _index) in total" :key="_index" :class="{ video: isVideo && _index == 0, current: index == _index, first: _index == 0 }"></view>
		</view>
		<view class="redBox" v-if="page === 'redBox'">
			<view class="dot-item" v-for="(item, _index) in total" :key="_index" :class="{ current: index == _index, first: _index == 0 }"></view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		index: {
			type: Number,
			isRequired: true
		},
		total: {
			type: Number,
			isRequired: true
		},
		page: {
			type: String,
			default: 'product'
		},
		isVideo: {
			type: Boolean,
			default: false
		}
	}
};
</script>

<style lang="less">
.dot-container {
	width: 100%;
	text-align: center;
	.product {
		.dot-item {
			display: inline-block;
			margin-left: 10upx;
			vertical-align: -webkit-baseline-middle;
		}
		.dot-item.first {
			margin-left: 0upx;
		}
		.dot-item.video {
			width: 20upx;
			height: 20upx;
			background: url('~@/static/images/public/icon_carousel_play_none.png') 0 0 no-repeat;
			background-size: 100% 100%;
		}
		.dot-item.video.current {
			width: 20upx;
			height: 20upx;
			background: url('~@/static/images/public/icon_carousel_play.png') 0 0 no-repeat;
			background-size: 100% 100%;
		}
		.dot-item {
			width: 12upx;
			height: 12upx;
			// border-radius: 50upx;
			border-radius: 50%;
			background-color: #bfbfbf;
		}
		.dot-item.current {
			background-color: #ff3366;
		}
	}
	.redBox {
		.dot-item {
			display: inline-block;
			margin-left: 10upx;
			vertical-align: -webkit-baseline-middle;
		}
		.dot-item.first {
			margin-left: 0upx;
		}
		.dot-item {
			width: 12upx;
			height: 12upx;
			border-radius: 50upx;
			background-color: rgba(255, 255, 255, 1);
			opacity: 0.6;
		}
		.dot-item.current {
			opacity: 1;
		}
	}
}
</style>
