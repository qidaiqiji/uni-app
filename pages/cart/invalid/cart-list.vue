<template>
	<view class="cart-list-view">
		<view class="cart_listCon">
			<view class="cart_head">
				<view class="head_left">
					<text class="chose-btn"></text>
					<text class="text title-name">失效商品</text>
				</view>
				<view class="head_right" @click="clearInvalidCart">清空</view>
			</view>
			<view v-for="(goods, goodsKey) in getvalidGoodsList" :key="goodsKey" class="invalid-cart">
				<uni-swipe-action
					:goodsKey="goodsKey"
					:datas="goods"
					:options="[{ text: '删除', style: { backgroundColor: '#dd524d' }, Pid: 0, Cid: goodsKey, recId: goods.recId }]"
					@click="getDelete"
				></uni-swipe-action>
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
			let { recId } = item;
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
			this.$emit('coupon', goodsId);
		},
		// 去商品详情
		goGoosDetail(goodsId) {
			let _index = this.gindex;
			let url = `../goods/product/product?goodsId=${goodsId}`;
			this.$api.goNavigateTo(url);
		},
		clearInvalidCart() {
			let recId = [];
			for (let y = 0; y < this.list.length; y++) {
				let goods = this.list[y];
				if (goods) {
					recId.push(goods.recId);
				}
			}
			this.$emit('del', recId);
		}
	}
};
</script>

<style lang="less" scoped>
@import url('../less/cart-list.less');

.chose-btn {
	visibility: hidden;
}
.cart_head .head_right {
	color: #007aff;
}
</style>
