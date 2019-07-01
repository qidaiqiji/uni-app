<template>
	<view class="jfrules-page">
		<!-- <uni-nav-bar left-icon="back" left-text="返回" right-text="菜单" title="导航栏组件"></uni-nav-bar> -->
		<view class="jfrules-content">
			<view class="item" style="margin-bottom: 0;">
				<text class="head">姓名：</text> Linda     
			</view>
			<view class="item"  style="margin-bottom: 0;">
				<text class="head">手机：</text> 13049889166    
			</view>
			<view class="item" style="margin-bottom: 0;">
				<text class="head">QQ：</text>2365935203    
			</view>
			<view class="item" style="margin-bottom: 0;">
				<text class="head">邮箱：</text>Linda@xiaomei360.com      
			</view>
			<view class="item" style="margin-bottom: 0;">
				<text class="head">地址：</text>广东省深圳市宝安区宝源路名优工业产品展示采购中心B座二层B232     
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
		font-size: 32upx;
		color: #677172;
		.head{
			color: #677172;
			font-size: 32upx;
			width: 100upx;
			display: inline-block;
		}
	}
</style>
