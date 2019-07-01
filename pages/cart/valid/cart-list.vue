<template>
	<view class="cart-list-view">
		<view class="cart_listCon" v-for="(cart, cartKey) in getvalidGoodsList" :key="cartKey">
			<view class="cart_head">
				<view class="head_left">
					<text class="chose-btn" @click="tabCheck({Pid:cartKey,type:'class'})" :class="{ active: cart.isSelect }"></text>
					<text class="text gray-arrow title-name">{{ cart.title }}</text>
				</view>
				<view class="head_right" v-if="cart.canTakeCoupon" @click="showCoupon">领券</view>
			</view>
			<view v-for="(goods, goodsKey) in cart.goodsList" :key="goodsKey" class="valid-cart">
				<uni-swipe-action @check="tabCheck" @add="numAdd" @del="cartDelete" @reduce="numReduce" :goodsKey="goodsKey"
				 :cartKey="cartKey" :datas="goods" :options="[{ text: '删除', style: { backgroundColor: '#dd524d' }, Pid: cartKey, Cid: goodsKey, recId: goods.recId }]"
				 @click="getDelete"></uni-swipe-action>
			</view>
			<view class="totalPrize">
				<text class="text1">共{{ cart.goodsNum }}件</text>
				<text class="text2">
					小计:
					<text class="pr">￥{{ cart.amount }}</text>
				</text>
			</view>
		</view>
	</view>
</template>

<script>
	import uniSwipeAction from './good-item.vue';
	export default {
		components: {
			uniSwipeAction
		},
		props: ['list'],
		data() {
			return {
				options: [
					// {
					// 	text: '取消',
					// 	style: {
					// 		backgroundColor: '#007aff'
					// 	}
					// },
					{
						text: '删除',
						style: {
							backgroundColor: '#dd524d'
						}
					}
				],
				moveX: 0,
				startX: 0,
				// 是否拖动
				isMove: false,
				// 拖动的元素下标
				gindex: 0,
				transformX: [],
				// move:是否拖动,lock:是否锁定,moveNum:拖动距离
				isMoveX: [],

				// 最大移动数
				maxMove: 0
			};
		},
		computed: {
			getvalidGoodsList() {
				return this.list ? this.list : [];
			}
		},
		mounted() {
			this.maxMove = this.getUpx();
		},
		methods: {
			getUpx() {
				return uni.upx2px(140);
			},
			getDelete(item) {
				let {
					recId
				} = item;
				if (recId) {
					this.cartDelete(recId);
				}
			},
			// 是否选中
			tabCheck(data) {
				this.$emit('check', data);
			},
			// 减少商品数量
			numReduce(data) {
				this.$emit('reduce', data);
			},
			// 增加商品数量
			numAdd(data) {
				this.$emit('add', data);
			},
			// 删除商品
			cartDelete(recId) {
				this.isMoveX = [];
				this.$emit('del', recId);
			},
			// 显示优惠券
			showCoupon() {
				let goodsId = this.list.map(e => {
					return e.goodsList.map(e => {
						return e.goodsId;
					});
				});
				goodsId = goodsId && goodsId[0] ? goodsId[0] : [];
				this.$emit('coupon', goodsId);
			},
			// 去商品详情
			goGoosDetail(goodsId) {
				let _index = this.gindex;
				let url = `/pages/goods/product/product?goodsId=${goodsId}`;
				this.$api.goNavigateTo(url);
			}
		}
	};
</script>

<style lang="less" scoped="scoped">
	@import url('../less/cart-list.less');
</style>
