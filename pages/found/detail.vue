<template>
	<view class="find-container">
		<view v-if="info" class="find-detail-container">
			<text class="content">{{ info.title }}</text>
		</view>
		<view class="find-buttom-container">
			<text class="time">{{ info.publishTime }}</text>
			<text class="count">{{ info.readCount + 1 }}阅读</text>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			info: null
		};
	},
	onLoad() {
		let vm = this;
		uni.getStorage({
			key: 'findDetailInfo',
			success: function(res) {
				vm.info = res.data;
			}
		});
	},
	destroyed() {
		uni.setStorage({
			key: 'findDetailInfo',
			data: null,
			success: function() {}
		});
	}
};
</script>

<style lang="less">
.find-container {
	padding: 50upx 20upx 10upx 20upx;
	.find-detail-container {
		text-align: justify;
		.content {
			font-size: 35upx;
		}
	}
	.find-buttom-container {
		color: #b2b2b2;
		font-size: 24upx;
		margin-top: 50upx;
		.count{
			margin-left: 60upx;
		}
	}
}
</style>
