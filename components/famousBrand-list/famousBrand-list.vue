<template>
	<view class="allBrandList">
		<block v-for="(item, index) in goodsList" :key="index" class="">
			<view class="list_item" @tap="handleJump(item.goodsInfo.goodsId)">
				<view class="thumb"><image :src="item.goodsInfo.thumb" mode=""></image></view>
				<view class="item_msg">
					<view class="desc">
						<view class="title">{{item.goodsInfo.goodsName}}</view>
						<view class="title_desc">{{item.goodsInfo.desc}}</view>
						<view class="tags">
							<block v-for="(item, index) in item.tagList&&item.tagList" :key="index">
								<view>{{item.text}}</view>
							</block>
						</view>
					</view>
					<view class="price">
						<view class="prices">
							<view class="prices_new">
								<view class="new_int">{{item.goodsInfo.big}}</view>
								<view class="new_min">.{{item.goodsInfo.min}}</view>
							</view>
							<view class="prices_old">{{item.goodsInfo.marketPrice}}</view>
						</view>
					
					
						<view class="addCart" @tap.stop="handleAddCart(item)"
						v-if="item.goodsInfo.stock>0&&item.goodsInfo.stock-item.goodsInfo.startNum>=0"
						><image src="/static/images/famousBrand/green_shop.png" mode=""></image></view>
						<view class="reminderAddCart" @tap.stop="handleAddCart(item)" v-else>
							<view v-if="item.goodsInfo.reminder == 2">到货提醒</view>
							<view v-if="item.goodsInfo.reminder == 1">已提醒</view>
							<image class="green_shop" src="/static/images/famousBrand/icon_shop_green.png" />
						</view>
                            
					
					</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
	  props: ['goodsList'],
	  data() {
	    return {
	
		};
	  },
	  methods: {
		  handleJump(goodsId){
			  console.log(goodsId)
			  let url=`/pages/goods/product/product?goodsId=${goodsId}`
			this.$api.goNavigateTo(url);
		  },
		  handleAddCart(item){
			  console.log(item)
			  this.$emit('handleAddCart',item)
		  },
	  }
	};
</script>

<style lang="less">
.allBrandList {
	width: 100%;
	box-sizing: border-box;
	padding: 0 24upx;
	& > view {
		margin-top: 20upx;
	}
	.list_item {
		width: 100%;
		box-sizing: border-box;
		height: 242upx;
		padding: 32upx 20upx 30upx;
		display: flex;
		align-items: center;
		& > .thumb {
			width: 180upx;
			height: 180upx;
			background: rgba(255, 255, 255, 1);
			border: 1upx solid rgba(214, 174, 107, 1);
			border-radius: 10upx;
			box-sizing: border-box;
			position: relative;
			margin-right: 20upx;
			overflow: hidden;
			& > image {
				width: 180upx;
				height: 180upx;
			}
		}
		& > .item_msg {
			flex: 1;
			height: 180upx;
			& > .desc {
				padding-top: 6upx;
				.title {
					width: 450upx;
					height: 28upx;
					font-size: 28upx;
					font-family: PingFang-SC-Bold;
					font-weight: bold;
					color: rgba(47, 58, 64, 1);
					line-height: 1;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				.title_desc {
					width: 454upx;
					height: 24upx;
					font-size: 24upx;
					font-family: PingFang-SC-Regular;
					font-weight: 400;
					color: rgba(103, 113, 114, 1);
					line-height: 1;
					margin-top: 10upx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				.tags {
					margin-top: 14upx;
					display: flex;
					align-items: center;
					height: 28upx;
					& > view {
						margin-right: 8upx;
						box-sizing: border-box;
						padding: 4upx;
						height: 28upx;
						border: 1upx solid rgba(255, 51, 102, 0.6);
						border-radius: 4upx;
						font-size: 20upx;
						font-family: PingFangSC-Regular;
						font-weight: 400;
						color: rgba(255, 51, 102, 1);
						line-height: 0.8;
					}
				}
			}
			& > .price {
				margin-top: 18upx;
				height: 44upx;
				display: flex;
				justify-content: space-between;
				align-items: flex-end;
				& > .prices {
					display: flex;
					align-items: flex-end;
					& > .prices_new {
						height: 38upx;
						display: flex;
						align-items: flex-end;
						font-family: San-Francisco-Text-Medium;
						font-weight: 500;
						color: rgba(214, 174, 107, 1);
						margin-right: 10upx;
						.new_int::before {
							content: '￥';
							font-size: 24upx;
						}
						.new_int {
							height: 38upx;
							font-size: 48upx;
							line-height: 0.7;
						}
						.new_min {
							font-size: 24upx;
						}
					}
					& > .prices_old::before {
						content: '￥';
					}
					& > .prices_old {
						height: 26upx;
						font-size: 18upx;
						font-family: PingFang-SC-Regular;
						font-weight: 400;
						text-decoration: line-through;
						line-height: 1;
						color: rgba(168, 182, 184, 1);
					}
				}
				& > .addCart {
					width: 44upx;
					height: 44upx;
					z-index: 2;
					& > image {
						width: 44upx;
						height: 44upx;
					}
				}
				& > .reminderAddCart {
					width: 160upx;
					height: 44upx;
					border: 1upx solid rgba(2, 189, 152, 1);
					border-radius: 22upx;
					background: #fff;
					font-size: 24upx;
					box-sizing: border-box;
					padding-left: 16upx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					font-family: PingFang-SC-Regular;
					font-weight: 400;
					color: rgba(47, 58, 64, 1);
					&>.green_shop{
							width: 44upx;
						height: 44upx;
						z-index: 2;
						& > image {
							width: 44upx;
							height: 44upx;
						}
					}
				}
			}
		}
	}
}
</style>
