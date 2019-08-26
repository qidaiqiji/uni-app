<template>
	<view class="exchange-draw-page">
		<view class="exCon" :style="{ 'min-height': minHeight }">
			<view class="body">
				<view class="lottery">
					<!-- index===pindex?'active'  'lottery-unit-' + pindex -->
					<!-- ['lottery-unit-' + pindex, { active: index+'' === pindex+'' }] -->
					<view class="lottery-body">
						<view class="lottery-unit" v-for="(prize, pindex) in prizeList" :key="pindex" :class="['lottery-unit-' + pindex, pindex == index ? 'active' : '']">
							<view class="con">
								<view class="img-box2" :style="{ 'background-image': 'url(' + prize.pic + ')' }"></view>
								<!-- <view class="img-box"><image class="logo" :src="prize.pic" mode="" ></image></view>  -->
								<!-- <view class="img-box"><image class="logo" src="../../../../static/images/icons/icon_feedback@2x.png" mode="" ></image></view> -->
								<!-- <text class="name">雪花秀雪花秀雪花秀3件套</text> -->
							</view>
							<div class="mask"></div>
						</view>
						<view class="lottery-unit lottery-unit-8" @tap="getRecord()"></view>
					</view>
				</view>

				<view class="lottery-info">
					<text class="text mr" @tap="showPop('rulesPop')">活动规则</text>
					<text class="text" @tap="showPopRecord">中奖记录</text>
				</view>
			</view>
		</view>

		<!-- 活动规则{{ ruleText }} -->
		<modal :show="rulesPop" title="活动规则" @close="hidePop">
			<view class="showMsg">
				<scroll-view class="scroll-body" scroll-y="true"><view v-html="ruleText" style="color: #677172;"></view></scroll-view>
			</view>
		</modal>

		<!-- 中奖记录{{ ruleText }} -->
		<modal :show="recordPop" title="中奖记录" @close="hidePop">
			<view class="showMsg">
				<scroll-view class="scroll-body" scroll-y="true">
					<view class="record-list">
						<text class="text" v-for="(record, index) in recordList" :key="index">{{ record }}</text>
					</view>
				</scroll-view>
			</view>
		</modal>

		<view class="record-view" v-show="showTips">
			<view class="r-trans record-body">
				<view class="head">
					<text class="r-trans text">恭喜您中奖啦！</text>
					<div class="bg"></div>
				</view>
				<view class="body-msg">
					<view class="text" v-if="recordPos.type < 1">没关系啦，人呢最重要的是开心再接再励哦~</view>
					<!-- 获得积分 -->
					<view class="text" v-else-if="recordPos.type == 1">
						<view class="">恭喜你</view>
						<view class="">
							<text>获得</text>
							<text class="win-text">10{{ recordPos.name }}</text>
						</view>
					</view>
					<!-- 获得优惠券 -->
					<view class="text" v-else-if="recordPos.type == 2">
						<view class="">恭喜你</view>
						<view class="">
							<text>获得</text>
							<text class="win-text">{{ recordPos.name }}</text>
						</view>
						<view class="win-look" @tap="goOwnCoupon">查看我的优惠券>></view>
					</view>
					<!-- 获得商品 -->
					<view class="text" v-else-if="recordPos.type == 3">
						<view class="">恭喜你</view>
						<view class="">
							<text>获得</text>
							<text class="win-text">{{ recordPos.name }}</text>
						</view>
						<view class="win-tips">注：奖品将随下次采购直发订单一起寄出</view>
						<view class="win-look" @tap="showPopRecord">查看我的奖品>></view>
					</view>
				</view>
				<view class="foot-btn">
					<view class="btn cancle" @tap="canclePop"><text class="r-trans text">取消</text></view>
					<view class="btn againplay" @tap="anginPop"><text class="r-trans text">再玩一次</text></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import modal from '@/components/modal/modal.vue';

export default {
	components: {
		modal
	},
	data() {
		return {
			minHeight: 1000,
			showTips: false,
			banner: [],
			//prizeList: [{}, {}, {}, {}, {}, {}, {}, {}],
			prizeList: [],
			ruleText: '',
			//
			rulesPop: false,
			recordPop: false,
			recordList: [],
			// 抽奖信息
			recordPos: {},
			// 抽奖配置参数
			index: 0, // 当前转动到哪个位置，起点位置
			count: 8, // 总共有多少个位置
			timer: 0, // 每次转动定时器
			speed: 0, // 初始转动速度
			times: 0, // 转动次数
			cycle: 0, // 转动基本次数：即至少需要转动多少次再进入抽奖环节
			prize: 0, // 中奖位置
			click: true //是否允许点击抽奖
		};
	},
	onLoad() {
		let res = uni.getSystemInfoSync();
		this.minHeight = `${res.windowHeight}px`;
		this.getExchangePrizelist();
	},
	computed: {
		getActive(o) {
			return function(o) {
				return o.toString() === this.index.toString();
			};
		}
	},
	methods: {
		// 重置抽奖位置
		resetRoll() {
			this.index = -1; // 当前转动到哪个位置，起点位置
			this.count = 8; // 总共有多少个位置
			this.timer = 0; // 每次转动定时器
			this.speed = 200; // 初始转动速度
			this.times = 0; // 转动次数
			this.cycle = 50; // 转动基本次数：即至少需要转动多少次再进入抽奖环节
			//this.prize = -1; // 中奖位置
		},
		// 开始抽奖
		startLottery() {
			if (!this.click) {
				return;
			}
			this.resetRoll();
			this.speed = 200;
			this.click = false;
			this.startRoll();
		},
		// 开始转动
		startRoll() {
			this.times += 1; // 转动次数
			this.oneRoll(); // 转动过程调用的每一次转动方法，这里是第一次调用初始化
			// 如果当前转动次数达到要求 && 目前转到的位置是中奖位置
			// console.log(this.index, this.prize);
			if (this.times > this.cycle + 10 && this.prize == this.index) {
				clearTimeout(this.timer); // 清除转动定时器，停止转动
				this.click = true;
				this.stopRoll();
				// this.$nextTick(() => {
				// 	this.stopRoll();
				// });
			} else {
				if (this.times < this.cycle) {
					this.speed -= 10; // 加快转动速度
				} else if (this.times > this.cycle + 10 && ((this.prize === 0 && this.index === 7) || this.prize === this.index + 1)) {
					this.speed += 110;
				} else if (this.speed < 40) {
					this.speed = 40;
				} else {
					this.speed += 20;
				}
				this.timer = setTimeout(this.startRoll, this.speed);
			}
		},
		stopRoll() {
			setTimeout(() => {
				this.showTips = true;
			}, 200);
		},
		// 每一次转动
		oneRoll() {
			let index = this.index; // 当前转动到哪个位置
			const count = this.count; // 总共有多少个位置
			index += 1;
			if (index > count - 1) {
				index = 0;
			}
			this.index = index;
		},
		showPop(type) {
			this[type] = true;
		},
		hidePop() {
			this.rulesPop = false;
			this.recordPop = false;
		},
		canclePop() {
			this.showTips = false;
		},
		anginPop() {
			this.canclePop();
			this.getRecord();
		},
		showPopRecord() {
			this.getExchangeDrawrecord();
		},
		// 获取服务器奖项进行抽奖
		async getRecord() {
			let that = this;
			if (that.prizeList.length < 1) {
				return that.$api.showMessage('抽奖活动未开始');
			}
			let res = await this.$api.request({
				url: this.$api.getExchangeDraw
			});
			console.log(JSON.stringify(res));
			if (res && res.code != 0) {
				that.$api.showMessage(res.msg);
			} else if (res && res.data) {
				that.recordPos = res.data;
				let { position } = res.data;
				that.prize = Number(position) - 1;
				that.$nextTick(() => {
					that.startLottery();
				});
			}
		},
		async getExchangePrizelist() {
			let that = this;
			let res = await this.$api.request({
				url: this.$api.getExchangePrizelist
			});
			if (res && res.data) {
				let o = res.data;
				that.banner = o.banner;
				that.prizeList = o.prizeList;
				that.ruleText = o.ruleText;
			}
			// that.prizeList = [
			// 	{ pic: 'https://img.xiaomei360.com/integral_config/58/5cf766c57cdfa.png', position: 1 },
			// 	{ pic: 'https://img.xiaomei360.com/integral_config/59/5cf766cb6e273.png', position: 2 },
			// 	{ pic: 'https://img.xiaomei360.com/integral_config/60/5cf766d18bb01.png', position: 3 },
			// 	{ pic: 'https://img.xiaomei360.com/integral_config/61/5cf766d714949.png', position: 4 },
			// 	{ pic: 'https://img.xiaomei360.com/integral_config/62/5cf766dc6d16a.png', position: 5 },
			// 	{ pic: 'https://img.xiaomei360.com/integral_config/68/5d02049b63b9c.png', position: 6 },
			// 	{ pic: 'https://img.xiaomei360.com/integral_config/64/5cf766e9afb24.png', position: 7 },
			// 	{ pic: 'https://img.xiaomei360.com/integral_config/65/5cf766ee81067.png', position: 8 }
			// ];
		},
		async getExchangeDrawrecord() {
			let that = this;
			let res = await this.$api.request({
				url: this.$api.getExchangeDrawrecord
			});
			if (res && res.data) {
				let { recordList } = res.data;
				that.recordList = recordList;
			}
			that.$nextTick(() => {
				that.recordPop = true;
			});
		},
		goOwnCoupon() {
			this.$api.goNavigateTo('../../ownCoupon/ownCoupon');
		}
	}
};
</script>

<style lang="less">
@import './exchange-draw.less';
</style>
