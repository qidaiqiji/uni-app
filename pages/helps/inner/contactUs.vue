<template>
	<view class="jfrules-page">
		<!-- <uni-nav-bar left-icon="back" left-text="返回" right-text="菜单" title="导航栏组件"></uni-nav-bar> -->
		<view class="jfrules-content">
			<view class="item">
				公司总部：深圳小美网络科技有限公司 
			</view>
			<view class="item">
				电 话：0755-29490945
			</view>
			<view class="item">
				地址：广东省深圳市宝安区宝源路名优工业产品展示采购中心B座二层B232
			</view>
			<view class="item">
				邮 箱：dengjun@xiaomei360.com  
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
		
	}
</style>
