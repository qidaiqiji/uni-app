<template>
	<view class="jfrules-page">
		<!-- <uni-nav-bar left-icon="back" left-text="返回" right-text="菜单" title="导航栏组件"></uni-nav-bar> -->
		<view class="jfrules-content">
			<view class="item">
				我们诚恳的倾听您的要求和建议，不论是对于具体产品需求或是小美诚品平台的建议，我们会即刻处理回复，还有惊喜好礼相送哦！
			</view>
			<view class="item">
				电话：0755-29490945
			</view>
			<view class="item">
				电子邮箱：service@xiaomei360.com
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		onLoad(option) {},
		methods: {}
	}
</script>

<style lang="less">
	@import url('../less/detail.less');
	.item{
		font-size: 30upx;
		color: #889696;
		margin-bottom:10upx !important;
		// .head{
		// 	color: #889696;
		// 	font-size: 30upx;
		// 	display: inline-block;
		// 	margin-bottom: 0;
		// 	line-height: 50upx;
		// }
	}
</style>
