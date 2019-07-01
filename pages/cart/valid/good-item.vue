<template>
	<view class="uni-swipe-action">
		<view
			class="uni-swipe-action__container"
			:class="{ 'uni-swipe-action--show': isShowBtn }"
			@touchstart="touchStart"
			@touchmove="touchMove"
			@touchend="touchEnd"
			@touchcancel="touchEnd"
			@click="bindClickCont"
			:style="{ transform: transformX, '-webkit-transform': transformX }"
		>
			<view class="uni-swipe-action__content">
				<view class="cartList">
					<view class="cartListCon">
						<view class="goodsInfo">
							<view class="chosePro"><text class="chose-btn" @click="tabCheck(cartKey, goodsKey)" :class="{ active: datas.isSelect }"></text></view>
							<view class="proImg" @click="goGoosDetail(datas.goodsId)">
								<image class="image" :src="datas.thumb" mode=""></image>
								<text class="text" v-if="datas.stockStatus == 1">库存紧张</text>
							</view>
							<view class="prodesc">
								<view class="descText" @click="goGoosDetail(datas.goodsId)">{{ datas.goodsName }}</view>
								<view class="tag-box">
									<text class="tag" v-for="(tag, tagKey) in datas.tagList" :key="tagKey" :class="tag.name">{{ tag.text }}</text>
								</view>
								<view class="proPrize">
									<view class="prizeText">
										<text class="jiage">￥{{ datas.goodsPrice }}</text>
									</view>
									<view class="numAddRedus">
										<view class="reduce sameNum" @click="numReduce(goodsKey, cartKey)">-</view>
										<!-- <view class="num sameNum">{{  }}</view> -->
										<view class="num sameNum"><input class="input" type="number" v-model="datas.cartNum" @blur="blur" /></view>
										<view class="add sameNum" @click="numAdd(goodsKey, cartKey)">+</view>
									</view>
								</view>
							</view>
						</view>
						<!-- <view class="deleteGoods" @click="cartDelete(datas.recId)"><text class="text">删除</text></view> -->
					</view>

					<view class="sendProList" v-if="datas.eventList && datas.eventList.length > 0">
						<block v-if="datas.eventList">
							<view class="" v-for="(event, eventKey) in datas.eventList" :key="eventKey">
								<view class="sendDesc">
									<view class="left">
										<text class="mangzeng" :style="[{ backgroundColor: event.bgColor, color: event.color }]">{{ event.tag }}</text>
										<text class="mangzText">{{ event.desc }}</text>
									</view>
									<view class="right">
										<text></text>
										戳上加购
									</view>
								</view>
								<view class="sendProAll">
									<view class="sendPro" v-for="(evgoods, evKey) in event.goodsList" :key="evKey">
										<text class="proName">{{ evgoods.name }}</text>
										<text class="proNum">X{{ evgoods.number }}</text>
									</view>
								</view>
							</view>
						</block>
					</view>
				</view>
			</view>
			<view class="uni-swipe-action__btn-group" :id="elId">
				<div
					v-for="(item, index) in options"
					:key="index"
					class="uni-swipe-action--btn"
					:style="{
						backgroundColor: item.style && item.style.backgroundColor ? item.style.backgroundColor : '#C7C6CD',
						color: item.style && item.style.color ? item.style.color : '#FFFFFF',
						fontSize: item.style && item.style.fontSize ? item.style.fontSize : '28upx'
					}"
					@click="bindClickBtn(item, index)"
				>
					{{ item.text }}
				</div>
			</view>
		</view>
		<view class="uni-swipe-action__mask" v-if="isShowBtn" @click="close" @touchmove.stop.prevent="close"></view>
	</view>
</template>

<script>
export default {
	name: 'uni-swipe-action',
	props: {
		datas: {
			type: Object,
			isRequired: true
		},
		goodsKey: {
			type: Number,
			isRequired: true
		},
		cartKey: {
			type: Number,
			isRequired: true
		},
		isOpened: {
			type: Boolean,
			default: false
		},
		disabled: {
			type: Boolean,
			default: false
		},
		autoClose: {
			type: Boolean,
			default: true
		},
		options: Array
	},
	watch: {
		isOpened(newValue, oldValue) {
			this.isShowBtn = newValue ? true : false;
			this.endMove();
		}
	},
	data() {
		const elId = `Uni_${Math.ceil(Math.random() * 10e5).toString(36)}`;
		return {
			elId: elId,
			isShowBtn: false,
			transformX: 'translateX(0px)'
		};
	},
	created() {
		this.direction = '';
		this.startX = 0;
		this.startY = 0;
		this.btnGroupWidth = 0;
		this.isMoving = false;
	},
	// #ifdef H5
	mounted() {
		this.getSize();
	},
	// #endif
	// #ifndef H5
	onReady() {
		this.getSize();
	},
	// #endif
	methods: {
		// 是否选中
		tabCheck(Pid, Cid) {
			this.$emit('check', { Cid, Pid, type: 'one' });
		},
		// 减少商品数量
		numReduce(Cid, Pid) {
			this.$emit('reduce', { Cid, Pid });
		},
		// 增加商品数量
		numAdd(Cid, Pid) {
			this.$emit('add', { Cid, Pid });
		},
		blur(event) {
			let { stock, startNum } = this.datas;
			let num = event.detail.value;
			// 是否超过上限库存，用以弹出信息框提示
			let isStock = false;
			if(num > stock){
				num = stock;
				isStock = true;
			}
			let Cid = this.goodsKey;
			let Pid = this.cartKey;
			this.$emit('add', { Cid, Pid, inputNum: num, isStock: isStock });
		},
		// 删除商品
		cartDelete(recId) {
			this.isMoveX = [];
			this.$emit('del', recId);
		},
		goGoosDetail(goodsId) {
			let _index = this.gindex;
			let url = `/pages/goods/product/product?goodsId=${goodsId}`;
			this.$api.goNavigateTo(url);
		},
		getSize() {
			uni.createSelectorQuery()
				.in(this)
				.select(`#${this.elId}`)
				.boundingClientRect()
				.exec(ret => {
					this.btnGroupWidth = ret[0].width;
				});
			if (this.isOpened === true) {
				this.isShowBtn = true;
				this.endMove();
			}
		},
		bindClickBtn(item, index) {
			this.$emit('click', {
				text: item.text,
				style: item.style,
				index: index,
				Pid: item.Pid,
				Cid: item.Cid,
				recId: item.recId
			});
		},
		bindClickCont(e) {
			if (this.isShowBtn && this.autoClose === true) {
				this.isShowBtn = false;
				this.endMove();
			}
		},
		touchStart(event) {
			this.startX = event.touches[0].pageX;
			this.startY = event.touches[0].pageY;
			if (!this.btnGroupWidth) {
				uni.createSelectorQuery()
					.in(this)
					.select(`#${this.elId}`)
					.boundingClientRect()
					.exec(ret => {
						this.btnGroupWidth = ret[0].width;
					});
			}
		},
		touchMove(event) {
			if (this.direction === 'Y' || this.disabled === true) {
				return;
			}
			var moveY = event.touches[0].pageY - this.startY,
				moveX = event.touches[0].pageX - this.startX;
			if (!this.isMoving && Math.abs(moveY) > Math.abs(moveX)) {
				//纵向滑动
				this.direction = 'Y';
				return;
			}
			this.direction = moveX > 0 ? 'right' : 'left';
			this.isMoving = true;
		},
		touchEnd(event) {
			this.isMoving = false;
			if (this.direction !== 'right' && this.direction !== 'left') {
				this.direction = '';
				return;
			}
			if (this.direction == 'right') {
				this.isShowBtn = false;
			} else {
				this.isShowBtn = true;
			}

			this.endMove();
		},
		endMove() {
			if (this.direction === 'Y' || this.disabled === true) {
				this.direction = '';
				return;
			}
			if (this.isShowBtn) {
				this.transformX = `translateX(${-this.btnGroupWidth}px)`;
				this.$emit('opened');
			} else {
				this.transformX = 'translateX(0px)';
				this.$emit('closed');
			}
			this.direction = '';
		},
		close() {
			this.isShowBtn = false;
			this.endMove();
		}
	}
};
</script>

<style lang="less">
@charset "UTF-8";

@mask: 51;
@body: 55;
.uni-swipe-action {
	width: 100%;
	overflow: hidden;
}

.uni-swipe-action__container {
	position: relative;
	background-color: #fff;
	width: 200%;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	transition: transform 350ms cubic-bezier(0.165, 0.84, 0.44, 1);
}

.uni-swipe-action__content {
	width: 50%;
}

.uni-swipe-action__btn-group {
	display: flex;
	flex-direction: row;
}

.uni-swipe-action--show {
	position: relative;
	// z-index: 1000;
	z-index: @body;
}

.uni-swipe-action--btn {
	padding: 0 32upx;
	color: #fff;
	background-color: #c7c6cd;
	font-size: 28upx;
	display: inline-flex;
	text-align: center;
	flex-direction: row;
	align-items: center;
}

.uni-swipe-action__mask {
	display: block;
	opacity: 0;
	position: fixed;
	z-index: @mask;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}
@import url('../less/good-item.less');
</style>
