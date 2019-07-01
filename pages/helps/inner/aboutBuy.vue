<template>
	<view class="jfrules-page">
		<!-- <uni-nav-bar left-icon="back" left-text="返回" right-text="菜单" title="导航栏组件"></uni-nav-bar> -->
		<view class="jfrules-content">
			<view class="item">
				<text class="title">1、可以通过哪些方式在小美诚品进行采购？</text>
				<text class="desc">客户可以在小美诚品的PC网站 <text style="color: red;">（www.xiaomei360.com）、微信服务号小美诚品、小美诚品</text>（苹果手机App Store搜索小美诚品） 三个平台进行采购</text>
			</view>
			<view class="item">
				<text class="title">2、通过小美诚品订货的流程是怎样的？</text>
				<text class="desc">小美诚品的订货流程如下：
				<view>	<text>选择商品→确认订单→付款发货→收货验货→确认收货→交易成功</text></view>
				</text>
			</view>
			<view class="item">
				<text class="title">3、起批量有要求吗？</text>
				<text class="desc">
					平台最低支持<text style="color: red;">1支起采</text>，方便客户灵活补货
				</text>
			</view>
			<view class="item">
				<text class="title">4、支持一件代发吗？</text>
				<text class="desc">
					平台专注服务线下实体零售门店，不提供一件代发的服务
				</text>
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
</style>
