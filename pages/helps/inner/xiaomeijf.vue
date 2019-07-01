<template>
	<view class="jfrules-page">
		<!-- <uni-nav-bar left-icon="back" left-text="返回" right-text="菜单" title="导航栏组件"></uni-nav-bar> -->
		<view class="jfrules-content">
			<!-- <view class="head">关于物流和邮费政策</view> -->
			<view class="item">
				<text class="title">一、小美积分简介</text>
				<text class="desc">小美积分为会员在小美诚品（www.xiaomei360.com）的采购返点奖励，是小美诚品唯一指定的虚拟货币，不能兑现，不可转让。</text>
			</view>
			<view class="item">
				<text class="title">二、如何获得小美积分</text>
				<text class="desc">用户采购商品可获得相应积分
				</text>
				<view><text class="desc">1．用户实际支付的金额可以累计积分（巨划算活动、秒杀活动、直降活动与套餐活动不参与积分赠送）。</text></view>
				<view><text class="desc">2．积分累积计算规则：实际支付金额*商品的积分系数（默认为0.1）</text></view>
				<view><text class="desc">例：您下单采购1000元，实际支付1000元，则您本次订单所累积的积分为1000*0.1=100分。</text></view>
				<view><text class="desc">3．小美积分的数值精确到个位，存在小数位时，直接舍去小数部分取整。</text></view>
				<view><text class="desc">例：您采购商品，实际支付了109元，该商品的积分累积系数为0.1，则您可获得10积分（109*0.1=10.9）</text></view>
				<view><text class="desc">4．用户在订单中可以看到本次订单应获取积分的点数。付款完成后，即可在“我的积分”中查询。</text></view>
			</view>
			<view class="item">
				<text class="title">三、积分使用途径</text>
				<text class="desc">
					1．客户可以用积分至小美诚品"积分商城"频道免费兑换专享商品，请注意，积分一经兑换，不予退还。
				</text>
				<view><text class="desc">2．积分还可兑换抵用券，但请注意抵用券有有效期限，请在有效期内使用，积分所兑换的抵用券逾期不使用，积分将不予退还。</text></view>
				<view><text class="desc">3．积分不可用于兑换现金，仅限参加小美诚品指定兑换物品、参与积分抽奖活动。</text></view>
				<view><text class="desc">4．如客户在小美诚品上作出违反小美诚品服务协议的行为，小美诚品将有权利注销用户的账户并清除积分。</text></view>
			</view>
			<view class="item">
				<text class="title">四、积分的交易状态说明</text>
				<text class="desc">
					1．冻结：
				</text>
				<view><text class="desc">订单生成到订单完成过程中，购物积分将为冻结状态，暂时不可使用；</text></view>
				<view><text class="desc">2．取消：</text></view>
				<view><text class="desc">当您取消订单，则相应的购物积分取消，这部分积分将从您的积分冻结帐户中扣除。</text></view>
				<view><text class="desc">3．完成：</text></view>
				<view><text class="desc">当购物流程完成，冻结积分会转化为可用积分，此时积分可在小美诚品使用</text></view>
				<view><text class="desc">4．积分何时解冻：</text></view>
				<view><text class="desc">当订单状态为：客户已收到或换货完成，退货完成和订单完成，积分会自动解冻成为可用积分</text></view>
			</view>
			<view class="item">
				<text class="title">五、积分的有效期说明</text>
				<text class="desc">
					默认积分有效期：自获得之日起至每年度12月31日。小美诚品将在每年12月31号将本年度所有积分清零。
				</text>
				<view><text class="desc">温馨提醒：请在每年度12月31日23：59：59之前将账户中的会员积分使用完毕。</text></view>
				<view><text class="desc">敬请注意</text></view>
				<view><text class="desc">线下订单因让利幅度较大，因此不返积分。</text></view>
				<view><text class="desc">小美积分计划作为小美诚品客户回馈的一部分，将随着市场的发展和客户需求的变化做不定期的调整和优化，敬请关注；</text></view>
				<view><text class="desc">小美诚品拥有小美积分的最终解释权。</text></view>
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
