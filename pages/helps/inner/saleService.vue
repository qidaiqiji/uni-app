<template>
	<view class="jfrules-page">
		<!-- <uni-nav-bar left-icon="back" left-text="返回" right-text="菜单" title="导航栏组件"></uni-nav-bar> -->
		<view class="jfrules-content">
			<!-- <view class="head">关于物流和邮费政策</view> -->
			<view class="item">
				<text class="title">1、平台有什么样的退换货政策支持？</text>
				<text class="desc">小美诚品力求为客户提供优质的货品和售后服务，若发现以下问题，自收到产品7天内平台给以退换
				</text>
				<view><text class="desc">①产品错发、货不对版</text></view>
				<view><text class="desc">②保质期为3年的，剩余效期低于18个月</text></view>
				<view><text class="desc">③保质期为2年的，剩余效期低于12个月</text></view>
				<view></view>
				<view></view>
				<view><text class="desc"><text style="color: red;">请注意：退换的产品须保证外包装完好，不影响二次销售</text></text></view>
			</view>
			<view class="item">
				<text class="title">2、退换流程是什么样的？</text>
				<text class="desc">退货流程如下：</text>
				<view><text class="desc">申请退货→②客服受理→③寄回退货→④确认收货→⑤完成退款</text></view>
				<view><text class="desc">换货流程如下：</text></view>
				<view><text class="desc">申请换货→②客服受理→③寄回原货→④确认收货→⑤重发新货→⑥确认收货→⑦完成换货</text></view>
			</view>
			<view class="item">
				<text class="title">3、退货地址是什么？</text>
				<text class="desc">
					请联系客服热线0755-29490945，并将图片等凭证提交审核。客服会在凭证审核通过后，告知退货地址。
				</text>
			</view>
			<view class="item">
				<text class="title">4、退换货产生的运费由谁负责？</text>
				<text class="desc">
					因商品质量问题、第三方物流及小美诚品本身的原因产生的退换，运费由小美诚品承担
				</text>
				<view><text class="desc">注：不支持货到付款业务，请顾客先垫付运费，到货验证商品后，小美诚品将以现金形式为用户报销运费。如果是未经确认而擅自退回的商品，该退货申请将不被受理。</text></view>
			</view>
			<view class="item">
				<text class="title">5、多长时间能收到退款？</text>
				<text class="desc">
					收到退货包裹并确认无误后，小美诚品将在48小时内进行退款。退款将原路返还，不同的银行处理时间不同，预计1-5个工作日到账
				</text>
			</view>
			<view class="item">
				<text class="title"> 6、小美诚品支持开发票吗？</text>
				<text class="desc">
				可以开票，具体请联系客服处理。
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
