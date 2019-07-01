<template>
	<view class="jfrules-page">
		<!-- <uni-nav-bar left-icon="back" left-text="返回" right-text="菜单" title="导航栏组件"></uni-nav-bar> -->
		<view class="jfrules-content">
			<view class="item">
			  1、与品牌（总代）签订合同确定合作品牌和产品范围    
			</view>
			<view class="item">
				2、提交相关资质证明和产品相关资料   
			</view>
			<view class="item">
			   3、小美诚品审核材料
			</view>
			<view class="item">
				4、品牌&商品成功入驻     
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
