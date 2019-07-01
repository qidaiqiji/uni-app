<template>
	<view class="users-warp">
		<view class="isChecklogin" :class="[access_token ? 'show' : '']">
			<view class="icon_mine_bg users-top">
				<view class="header">
					<view class="jf-users">
						<image class="jf-users__img" v-if="!headImgUrl" src="../../static/images/public/img_user@2x.png" mode="" @click="goPage('../mineinfo/mineinfo')"></image>
						<image class="jf-users__img" v-if="headImgUrl" :src="headImgUrl" mode="" @click="goPage('../mineinfo/mineinfo')"></image>
						<view class="jf-users__info">
							<text class="title">{{ nickName }}</text>
							<view class="desc">
								<text class="jf-auth">已认证</text>
								<text class="jf-number">{{ balance }}积分</text>
							</view>
						</view>
					</view>
					<view class="jf-rules">
						<text class="jf-rules__img" v-if="userRank == 4"></text>
						<text class="jf-rules__text">{{ rankName }}</text>
					</view>
				</view>

				<view class="users-box person-icon">
					<view class="order-nav-box">
						<view class="order-nav" @click="goOrderPage('', '')">
							<view class="person-icon__img">
								<view class="icon_mine icon_mine_order" styles="mine"></view>
							</view>
							<text class="text">全部订单</text>
						</view>
						<view class="order-nav" @click="goOrderPage('needPay', '1')">
							<view class="person-icon__img">
								<uni-badge :text="needPay" type="error" :inverted="false" styles="mine"></uni-badge>
								<view class="icon_mine icon_mine_payment"></view>
							</view>
							<text class="text">待付款</text>
						</view>
						<view class="order-nav" @click="goOrderPage('needReceive', '2')">
							<view class="person-icon__img">
								<uni-badge :text="needReceive" type="error" :inverted="false" styles="mine"></uni-badge>
								<view class="icon_mine icon_mine_receive"></view>
							</view>
							<text class="text">待收货</text>
						</view>
						<view class="order-nav" @click="goOrderPage('refuse', '3')">
							<view class="person-icon__img">
								<uni-badge :text="refuse" type="error" :inverted="false"></uni-badge>
								<view class="icon_mine icon_mine_exchange"></view>
							</view>
							<text class="text">退换中</text>
						</view>
					</view>
				</view>
			</view>

			<!-- 邀请视图 -->
			<view class="users-invitation" @tap="goPage('../self/fenxiang/fenxiang')">
				<view class="users-invitation__img"><image class="image" src="../../static/images/users/img_invitation@2x.png" alt=""></image></view>
			</view>

			<!-- 签到列表 -->
			<view class="users-box users-signIn">
				<view class="users-signIn-header">
					<text class="users-signIn-header__txt">每日签到</text>
					<text class="users-signIn-header__txt2" @tap="goSignIn()" v-if="!isCheckIn">签到</text>
					<text class="users-signIn-header__txt2 active" v-if="isCheckIn">已签到</text>
				</view>
				<view class="ul-view">
					<view v-for="(item, index) in signInArray" :key="index" class="users-signIn-item">
						<text class="users-signIn-item__txt" :class="item.isCheckIn">{{ item.date }}</text>
						<text class="users-signIn-item__txt2">+10</text>
					</view>
				</view>
			</view>

			<!-- 功能列表 -->
			<view class="users-box users-function-list">
				<view class="function-list">
						<view class="ul-view">
								<view v-for="(item, index) in listModule" :key="index" @tap="goPage(item.url)" class="item">
										<view class="image">
												<text class="icon_module" :class="item.icon"></text>
										</view>
										<text class="title">{{ item.text }}</text>
								</view>
						</view>
				</view>
			</view>

			<!-- 签到成功弹出框 -->
			<view class="users-signIn-success" v-show="signSuccess">
				<view class="users-signIn-success__content">
					<view class=""><image src="../../static/images/users/img_checkin.png" class="users-signIn-success__img" alt=""></image></view>
					<view class="users-signIn-success__txt">
						<text>恭喜获得</text>
						<text class="number">10</text>
						<text>积分</text>
					</view>
					<view class="users-signIn-success__btn" @tap="sureSignBtn()">确定</view>
				</view>
			</view>

			<!-- 右下角浮标 -->
			<view class="foot-r-box users-foot">
				<!-- <view class="item" @click="showMobile"><view class="s842_icons s842_public_kefu"></view></view> -->
				<view class="item" v-if="scrollTop" @click="goTop()"><view class="s842_icons s842_public_top"></view></view>
			</view>
		</view>
	</view>
</template>

<script>
import { sortObject, getNowTime, getDateTime } from '@/common/util.js';
import { userValidateLogin2 } from '@/common/auth.js';
import uniBadge from '@/components/uni-badge/uni-badge.vue';
import listModule from './module.js';
export default {
	components: {
		uniBadge
	},
	data() {
		return {
			access_token: '',
			scrollTop: false,
			//客服电话号码
			servicePhone: '',
			// 签到信息
			signInArray: [],
			signSuccess: false,
			checkIn: [],
			isCheckIn: false,
			// 用户信息
			nickName: '',
			rankName: '',
			userRank: 1,
			balance: '',
			headImgUrl: '',
			// 订单状态数量
			refuse: 0,
			needPay: 0,
			needReceive: 0,
			// 子模块
			listModule: listModule

		};
	},
	// onPageScroll(e) {
	//     if (e.scrollTop <= 0) {
	//         this.scrollTop = false;
	//         this.lockTop = false;
	//     }
	//     if (e.scrollTop > 50 && !this.lockTop) {
	//         this.scrollTop = true;
	//         this.lockTop = true;
	//     }
	// },
	onLoad() {
		uni.showNavigationBarLoading();
	},
	onShow() {
		let that = this;
		userValidateLogin2(() => {
			that.access_token = uni.getStorageSync('access_token') || '';
			that.getUserInfo();
			that.getCheackSignDate(); //是否签到
			that.getOrderGroupStatusNum();
			let avg = uni.getStorageSync('headImgUrl');
			if (avg || (avg && avg != 'null')) {
				that.headImgUrl = avg;
			}
		});
		// let avg = uni.getStorageSync('headImgUrl');
		// if (avg && avg != 'null') {
		// 	this.headImgUrl = avg;
		// }
		that.balance = uni.getStorageSync('balance') || that.balance;
		that.$api.getTabbarCart();
	},
	methods: {
		goTop() {
			this.scrollTop = false;
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 50
			});
		},
		goOrderPage(status, tabIndex) {
			this.$api.goNavigateTo(`../order/order?status=${status}&tab=${tabIndex}`);
		},
		showMobile() {
			// this.$api.callMobile();
			this.$api.goNavigateTo('../services/services');
		},
		goPage(urlPath) {
			let vm = this;
			let _userinfo = uni.getStorageSync('userinfo');
			if (urlPath == 'callphone') {
				let { servicePhone } = _userinfo;
				vm.$api.callMobile(servicePhone || '');
			} else {
				this.$api.goNavigateTo(urlPath);
			}
		},
		// 签到
		goSignIn(signDay) {
			this.setCheckin();
		},
		sureSignBtn() {
			this.signSuccess = false;
		},
		getSignInArray() {
			let array = [1, 2, 3, 4, 5, 6, 7];
			for (let y = 0; y < 7; y++) {
				array.push({
					date: y + 1,
					isCheckIn: ''
				});
			}
			return array;
		},
		// 用户签到
		async setCheckin() {
			let vm = this;
			// vm.signSuccess = true;
			// vm.updateSignList({"signList":[1,2,3,4,7],"unsignList":[5,6],"isCheckIn":true});
			let res = await this.$api.request({
				method: 'GET',
				access_token: this.access_token,
				url: this.$api.userCheckin
			});
			if (res.code == 0) {
				let _res = res.data;
				vm.signSuccess = true;
				vm.updateSignList(_res);
				// 更新用户积分
				this.getUserInfo();
			}
		},
		// 每天只检查一次签到信息，
		getCheackSignDate() {
			let signArray = uni.getStorageSync('signArray');
			let time = getDateTime(getNowTime());
			if (signArray && signArray.endtime) {
				let end = signArray.endtime;
				if (time > end) {
					this.getIsCheckIn();
				} else {
					this.signInArray = signArray.signInArray;
					this.isCheckIn = signArray.isCheckIn;
				}
			} else {
				this.getIsCheckIn();
			}
		},
		async getIsCheckIn() {
			let vm = this;
			let res = await this.$api.request({
				method: 'GET',
				access_token: this.access_token,
				url: this.$api.userIsCheckin
			});
			if (res.code == 0) {
				let _res = res.data;
				vm.updateSignList(_res);
			}
		},
		updateSignList(data) {
			let vm = this;
			let array = [];
			vm.isCheckIn = data.isCheckIn;
			let checkIn = data.signList.map((item, i) => {
				return {
					date: item,
					isCheckIn: 'active'
				};
			});
			let checkOut = data.unsignList.map((item, i) => {
				return {
					date: item,
					isCheckIn: 'fail'
				};
			});
			checkIn.push(...checkOut);
			let ok = checkIn.sort(sortObject('date'));
			for (let y = 0; y < 7; y++) {
				if (ok[y]) {
					array.push(ok[y]);
				} else {
					array.push({
						date: y + 1,
						isCheckIn: ''
					});
				}
			}
			this.signInArray = array;

			let hideTime = getNowTime('ymd');
			let maxTime = getDateTime(`${hideTime} 23:59:59`);
			uni.setStorageSync('signArray', {
				signInArray: array,
				endtime: maxTime,
				isCheckIn: data.isCheckIn
			});
		},
		async getUserInfo() {
			let vm = this;
			let res = await this.$api.request({
				method: 'GET',
				access_token: this.access_token,
				url: this.$api.getUserInfo
			});
			if (res.code == 0 && res.data) {
				let data = res.data;
				vm.setUserInfo(vm, data);
			}
		},
		setUserInfo(vm, data) {
			let { nickName, access_token, userRank, rankName, balance } = data;
			vm.nickName = nickName;
			vm.balance = balance;
			vm.rankName = rankName;
			vm.userRank = userRank;
			vm.$store.commit('updateNickName', nickName);
			vm.$store.commit('updateUserRank', userRank);
			uni.setStorageSync('nickName', nickName);
			uni.setStorageSync('balance', balance);
			uni.setStorageSync('rankName', rankName);
			// uni.setStorageSync('userinfo', data);
		},
		async getOrderGroupStatusNum() {
			let vm = this;
			let res = await this.$api.request({
				method: 'GET',
				access_token: this.access_token,
				url: this.$api.orderGroup_statusNumList
			});
			if (res.code == 0) {
				let _res = res.data;
				vm.refuse = _res.refuse;
				vm.needPay = _res.needPay;
				vm.needReceive = _res.needReceive;
			}
		}
	}
};
</script>

<style lang="less">
@import url('less/my.less');
@import url('less/self-list.less');
</style>
