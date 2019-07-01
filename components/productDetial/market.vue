<template>
	<view class="market">
		<view class="marketRule">
			<view class="marketCon">
				<view class="marketHead"><text class="text">市场参谋</text></view>
				<view class="shopperCon">
					<view class="sameShop leftShop">
						<view class="ul">
							<view class="li">门店指导价</view>
							<view class="li betwenNun">{{ marketSuggest.guidancePrice }}</view>
							<view class="li shopNum">
								<view class="text">推荐指数</view>
								<view class="firstStar">
									<!-- <view class="sp p_star_no" v-for="(it, itKey) in numbers" :key="itKey" :class="[getLevel >= itKey ? 'p_star' : '']"></view> -->
									<view class="star_no" v-for="(it, itKey) in numbers" :key="itKey" :class="[getLevel >= itKey ? 'star' : '']"></view>
								</view>
							</view>
						</view>
					</view>
					<view class="sameShop RightShop">
						<view class="ul">
							<view class="li">门店零售利润率</view>
							<view class="li betwenNun">{{ marketSuggest.guidanceRate }}</view>
							<view class="li shopNum">已成交门店数量 {{ marketSuggest.buyerNum }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="marketComm" v-if="marketComment.length > 0">
			<view class="view-coll">
				<view class="marketHead">市场评价</view>
				<view class="commendList">
					<view class="ul-view">
						<text class="li-view" v-for="(item, index) in marketComment" :key="index">{{ item }}</text>
					</view>
				</view>
			</view>
			<view class="customSuggess" v-if="allproductArr.feedback !== ''">
				<view class="cusSuggCon">
					<view class="marketHead">客户反馈</view>
					<view class="suggesstext">{{ allproductArr.feedback }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: ['marketSuggest', 'marketComment', 'allproductArr'],
	data() {
		return {
			numbers: 5,
			recommendLevel: 0
		};
	},
	computed: {
		getLevel() {
			let { recommendLevel } = this.marketSuggest;
			return Number(recommendLevel) - 1;
		}
	},
	created() {},
	mounted() {},
	methods: {}
};
</script>

<style lang="less" scoped>
.market {
	.marketHead {
		color: #2f3a40;
		font-size: 28upx;
		padding-left: 25upx;
		height: 88upx;
		line-height: 88upx;
		border-bottom: 1px solid #dce4e6;
	}

	.text {
		font-weight: bold;
	}
}

.marketRule {
	background: #f3f3f3;
	padding: 20upx 0 0 0;
}

.marketCon {
	background: #fff;

	.shopperCon {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 24upx 0;
	}

	.ul {
		padding-left: 54upx;
	}

	.li {
		text-align: left;
		color: #889696;
		font-size: 24upx;
		margin-top: 20upx;
		display: -webkit-flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
	}

	.sameShop {
		text-align: center;
		width: 50%;
	}

	.RightShop {
		.ul {
			border-left: 1px solid #dce4e6;
		}
	}

	.betwenNun {
		color: #ff3366;
		font-size: 32upx;
	}

	.star_no {
		display: inline-block;
		vertical-align: middle;
		width: 30upx;
		height: 30upx;
		background-image: url('~@/static/images/s30/icon_star_no.png');
		background-position: center center;
		background-repeat: no-repeat;
		background-size: 30upx 30upx;
	}

	.star {
		background-image: url('~@/static/images/s30/icon_star.png');
	}

	.leftShop {
		.shopNum {
			display: flex;
			align-items: center;
		}

		.text,
		.firstStar {
			display: inline-block;
			vertical-align: text-top;
		}

		.firstStar {
			margin-left: 8upx;
			margin-top: -8upx;
		}
	}
}

.marketComm {
	background: #f3f3f3;
	padding-top: 20upx;

	.view-coll {
		background: #fff;
	}

	.commendList {
		padding: 0 24upx;
	}

	.ul-view {
		display: flex;
		flex-wrap: wrap;
		margin-top: 16upx;
	}

	.li-view {
		padding: 4upx 10upx;
		background: #ffe3ed;
		color: #677172;
		font-size: 24upx;
		border-radius: 20upx;
		margin-right: 32upx;
		margin-bottom: 16upx;

		&:last-child {
			margin-right: 0;
		}
	}
}

.customSuggess {
	background: #f3f3f3;
	padding: 20upx 0 0 0;

	.cusSuggCon {
		background: #fff;
	}

	.suggesstext {
		padding: 25upx;
		color: #889696;
		font-size: 28upx;
		line-height: 45upx;
	}
}
</style>
