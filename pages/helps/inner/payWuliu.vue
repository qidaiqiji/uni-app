<template>
	<view class="jfrules-page">
		<!-- <uni-nav-bar left-icon="back" left-text="返回" right-text="菜单" title="导航栏组件"></uni-nav-bar> -->
		<view class="jfrules-content">
			<view class="head">关于物流和邮费政策</view>
			<view class="item">
				<text class="title">1、平台使用什么物流配送方式，能否自选物流？</text>
				<text class="desc">通常20公斤内发快递，20公斤以上发物流（默认自提，如需送货上门请在下单时备注或联系客服处理）
				</text>
				<view><text class="desc">目前暂时不提供自选物流的服务</text></view>
				<view><text class="desc">我们会根据订单中的收货地址和商品种类选择最合适的物流公司进行配送。</text></view>
			</view>
			<view class="item">
				<text class="title">2、配送费用如何支付？</text>
				<text class="desc">小美诚品配送商品，用户可以选择现付运费和到付运费两种形式
				</text>
				<view><text class="desc">① 现付运费。在下单的时候支付物流费用，具体费用以下单页面为准</text></view>
				<view><text class="desc">② 到付运费。货物寄到之后，客户支付实际产生的物流费用</text></view>
			</view>
			<view class="item">
				<text class="title">3、什么是小美直发满额包邮？</text>
				<text class="desc">
					① 满2999元包邮，不足2999元收取物流费用20元
				</text>
			<view><text class="desc">收货地址为广东、湖南、湖北、福建、广西、贵州、江西、浙江</text></view>
			<view><text class="desc">② 满3999元包邮，不足3999元收取物流费用30元；</text></view>
			<view><text class="desc">收货地址为云南、重庆、四川、陕西、山西、河北、宁夏、北京、天津、上海、山东、江苏、安徽、河南</text></view>
			<view><text class="desc">③ 订单金额满4999元包邮，不足4999元收取物流费用50元</text></view>
			<view><text class="desc">收货地址为新疆、西藏、青海、甘肃、内蒙、辽宁、吉林、黑龙江、海南的订单</text></view>
			<view><text class="desc">特别说明：以上邮费政策不支持自选物流，需自选物流请联系小美诚品的客服人员处理。</text></view>
			</view>
			<view class="item">
				<text class="title">4、非小美直发商品，怎样包邮？</text>
				<text class="desc">
					采购非小美直发商品，小美平台提供优惠一定条件的包邮政策，具体视品牌而不同，请留意商品详情页指示信息
				</text>
				<view><text class="desc">① 全国包邮：全国大部分地区包邮，港澳台地区除外</text></view>
				<view><text class="desc">② 满额包邮：单品牌采购满足一定条件，如1000元、满2000元、满3000元等，即可全国包邮。</text></view>
				<view><text class="desc">③ 21省包邮：以下省份包邮——</text></view>
				<view><text class="desc">北京, 天津, 河北, 山西, 上海, 江苏, 浙江, 安徽, 福建, 江西,</text></view>
				<view><text class="desc">山东, 河南, 湖北, 湖南, 广东, 广西, 重庆, 四川, 贵州, 云南, 陕西；</text></view>
				<view><text class="desc">其他省份到付——</text></view>
				<view><text class="desc">内蒙古, 辽宁, 吉林, 黑龙江, 海南, 西藏, 甘肃, 青海, 宁夏, 新疆</text></view>
			</view>
			<view class="item">
				<text class="title">5、特别说明：</text>
				<text class="desc">
					什么是小美直发商品？什么是非直发商品？
				</text>
				<view><text class="desc">小美直发商品，是指小美诚品与品牌方深度合作，为提升商品的物流交付效率，进一步缩短采购周期，备货入小美仓库的商品</text></view>
				<view><text class="desc">非直发商品（品牌方发货商品），是由小美诚品提供商品和品牌、活动、政策等信息，由品牌方负责发货的商品</text></view>
			</view>
			<view class="item">
				<text class="title"> 举例：</text>
				<text class="desc">
					美迪惠尔直发商品：商品名称有“【直发】”前缀，商品主图左上角有红色“直发”标志
				</text>
				<view><text class="desc">美迪惠尔非直发商品：无前缀、无标志</text></view>
				<image src="/static/images/helps/4.png" style="width: 100%;"></image>
				<text class="desc">
					直发商品和非直发商品最大的区别——物流配送的方式和邮费政策的不同。
				</text>
			</view>
			<view class="item">
				<text class="title">具体请参考每个商品详情页的邮费提示。</text>
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
