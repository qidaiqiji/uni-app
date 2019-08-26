<template>
	<view class="video-page-container" :style="{ height: windowHeight }">
		<video id="myVideo" :src="source" controls ></video>
	</view>
</template>

<script>
export default {
	onLoad(option) {
		this.source = option.source;
		try {
			const res = uni.getSystemInfoSync();
			// this.windowHeight = `${res.screenHeight - res.statusBarHeight - 44}px`;
			this.windowHeight = `${res.windowHeight}px`;
		} catch (e) {
			// error
		}
	},
	onReady() {
		this.videoContext = uni.createVideoContext('myVideo');

		setTimeout(() => {
			if (this.videoContext) this.videoContext.play();
		}, 1000);
	},
	data() {
		return {
			source: '',
			windowHeight: '0px'
		};
	},
	onUnload() {
		this.videoContext = null;
	},
	destroyed() {
		this.videoContext = null;
	}
};
</script>

<style lang="less" scoped>
.video-page-container {
	width: 100%;
	position: relative;
	background-color: #000000;
	
	.mask {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: 2;
	}

	#myVideo {
		width: 100%;
		height: 300px;
		position: absolute;
		top: 50%;
		left: 0;
		margin-top: -175px;
	}
}
</style>
