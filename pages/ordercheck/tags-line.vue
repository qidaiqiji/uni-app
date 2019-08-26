<template>
	<view class="tags-line" :class="getClassType">
		<template v-if="type=='gift'&&list.length>0">
			<view class="goods-tags">满赠</view>
			<view class="ul">
				<view class="li" v-for="(wuliao, wuliaoKey) in list" :key="wuliaoKey">
					<text class="fl text">{{ wuliao.goodsName }}</text>
					<text class="fr count">x{{ wuliao.cartNum }}</text>
				</view>
			</view>
		</template>
		<template v-if="type=='wuliao'&&list.length>0">
			<view class="goods-tags">物料</view>
			<view class="ul">
				<view class="li" v-for="(wuliao, wuliaoKey) in list" :key="wuliaoKey">
					<text class="fl text">{{ wuliao.goodsName }}</text>
					<text class="fr count">x{{ wuliao.cartNum }}</text>
				</view>
			</view>
		</template>
	</view>
</template>

<script>
	export default {
		props: ['type', 'list'],
		data() {
			return {}
		},
		computed: {
			getClassType() {
				return this.type ? this.type : '';
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	.tags-line {
		padding: 5px 5px 0 0;
		display: -webkit-box;
		-webkit-box-align: start;
		font-size: 22upx;
		font-weight: 500;
		color: #000;
		align-content: center;
		background: #f0f1f2;

		.goods-tags {
			margin-right: 10upx;
		}

		.ul {
			font-size: 22upx;
			width: 620upx;
			display: flex;
			align-items: center;
		}

		.li {
			width: 100%;
			overflow: hidden;
			font-size: 22upx;
			margin-bottom: 10upx;
			height: 32upx;
			line-height: 32upx;
		}

		.text {
			display: block;
			width: 458upx;

			word-break: break-all;
			word-spacing: normal;
			white-space: nowrap;
			-o-text-overflow: ellipsis;
			text-overflow: ellipsis;
			overflow: hidden;
		}

		.count {
			color: rgba(136, 150, 150, 1);
		}
	}

	.wuliao {
		background: #fff;

		.goods-tags {
			width: 70upx;
			max-width: 70upx;
			background: #53A7FD;
			padding: 0;
			text-align: center;
		}

		.ul {
			width: 600upx;
			display: block;
		}

		.li {
			color: #889696;
		}

		.text {
			width: 500upx;
		}
	}

	.gift {

		.goods-tags {
			background: #ff3366;
		}
	}

	.pkg {}
</style>
