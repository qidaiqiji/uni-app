<template>
	<view class="video" @tap="posterClick">
		<image class="poster" :src="poster"></image>
		<view class="icon">play</view>
		</view>
</template>

<script>
export default {
	props: {
		source: {
			type: String,
			isRequired: true
		},
		poster: {
			type: String,
			isRequired: true
		}
	},
	methods: {
		posterClick() {
			let _url = `/pages/video/video?source=${encodeURI(this.source)}`;
			this.$api.goNavigateTo(_url);
		}
	}
}; 
</script>


<style lang="less" scoped>
.video {
	width: 100%;
	height: 100%;
	position: relative;
	.poster {
		width: 100%;
		height: 100%;
	}
	.icon {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 60upx;
		height: 60upx;
		transform: translate(-50%,-50%);
		background: url('~@/static/images/public/play-icon.jpg') 0 0 no-repeat;
		background-size: 100% 100%;
	}
}
</style>
