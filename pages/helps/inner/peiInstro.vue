<template>
	<view class="jfrules-page">
		<!-- <uni-nav-bar left-icon="back" left-text="返回" right-text="菜单" title="导航栏组件"></uni-nav-bar> -->
		<view class="jfrules-content">
			<view class="item">
				<text class="title">1、配送方式：</text>
				<text class="desc">小美诚品与品牌方（或总代）直接合作，部分产品入仓由我们从深圳发货 <text style="color: red;">（标注“小美直发”）</text>，其他产品由品牌方(或总代)从各地仓库发货；
				</text>
				<view><text class="desc">目前暂时不提供自选物流的服务，我们会根据订单中的收货地址和商品种类选择最合适的物流公司进行配送。</text></view>
				<view><text class="desc"></text></view>
			</view>
			<view class="item">
				<text class="title">2、配送范围：</text>
				<text class="desc">小美诚品配送范围覆盖全国大部分地区（港澳台地区除外）。
				</text>
			</view>
			<view class="item">
				<text class="title">3、配送费用：</text>
				<text class="desc">
					为确保货品安全，通常为运费到付，具体会在该商品介绍页注明；
				</text>
				<view><text class="desc">我们会综合考虑配送速度和物流成本，在满足客户体验的同时，尽量降低配送运费。</text></view>
			</view>
			<view class="item">
				<text class="title">4、发货时间：</text>
				<text class="desc">
					 下单成功后，相关专业人员在12个小时内核对用户所订购的商品、邮寄地址、款项支付等信息进行审核，一般在2~3个工作日内将包裹发出；
				</text>
				<view><text class="desc">包裹发出后，系统将配送相关信息更新至用户的帐户信息中，可通过主页的我的订单查询相关信息。</text></view>
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
