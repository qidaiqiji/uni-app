<template>
	<view class="authorization">
		<view class="logo"><image class="image" src="../../static/images/login/xm-logo.png" mode=""></image></view>
		<view class="info"><image class="image" src="../../static/images/login/img_photo@2x.png" mode=""></image></view>
		<view class="button" @tap="weixinLogin"><view class="btn">点击进行微信授权</view></view>
		<view class="button back-button" @tap="backHome()"><view class="btn">返回首页</view></view>
		<!-- <view class="textW">services: {{ services }}</view> -->
		<!-- <view class="">****************************</view> -->
		<!-- <view class="textW">weixinServiceText: {{ weixinServiceText }}</view> -->
		<!-- <view class="">****************************</view> -->
		<!-- <input v-model="weixinCode" style="width: 100%;height: 40px;text-align: left;" /> -->
		<!-- <view class="textW">weixinCode: {{ weixinCode }}</view> -->
		<!-- <view class="">****************************</view> -->
		<!-- <view class="textW">userinfo: {{ userinfo }}</view> -->
		<!-- <view class="">****************************</view> -->
		<!-- <view class="textW">authorizeFail: {{ authorizeFail }}</view> -->
		<!-- <view class="">****************************</view> -->
		<!-- <view class="textW">unService: {{ unService }}</view> -->
		<!-- <view class="">****************************</view> -->
		<!-- <view class="textW">sendMessage: {{ sendMessage }}</view> -->
		<!-- <view class="">****************************</view> -->
		<!-- <view class="textW">unServiceFail: {{ unServiceFail }}</view> -->
		<!-- <view class="">****************************</view> -->
	</view>
</template>

<script>
import Base64 from '@/common/base64.js';
export default {
	data() {
		return {
			weixinCode: '',
			// 测试debug
			services: '',
			weixinServiceText: '',
			authorizeFail: '',
			unService: '',
			unServiceFail: '',
			userinfo: '',
			sendMessage: ''
		};
	},
	methods: {
		backHome() {
			uni.switchTab({
				url: '../index/index'
			});
		},
		weixinLogin() {
			var _this = this;
			// #ifdef APP-PLUS
			var weixinService = null;
			// http://www.html5plus.org/doc/zh_cn/oauth.html#plus.oauth.getServices
			plus.oauth.getServices(
				function(services) {
					// _this.services = JSON.stringify(services);
					if (services && services.length) {
						for (var i = 0, len = services.length; i < len; i++) {
							if (services[i].id === 'weixin') {
								weixinService = services[i];
								break;
							}
						}
						if (!weixinService) {
							_this.$api.showMessage('没有微信登录授权服务');
							return;
						}
						// http://www.html5plus.org/doc/zh_cn/oauth.html#plus.oauth.AuthService.authorize
						weixinService.authorize(
							function(event) {
								_this.weixinCode = event.code; //用户换取 access_token 的 code
								_this.requestLogin();
							},
							function(error) {
								// _this.authorizeFail = JSON.stringify(error);
								_this.$api.showMessage(error.message);
							},
							{
								// http://www.html5plus.org/doc/zh_cn/oauth.html#plus.oauth.AuthOptions
								appid: 'wx0072a3996011abdf', //开放平台的应用标识。未设置则使用manifest.json的SDK配置项
								appsecret: '7ac7557b576dc4e174dd533903906073', //登录授权认证服务平台申请的appsecret。未设置则使用manifest.json的SDK配置项
								scope: 'snsapi_userinfo' //授权获取用户信息
							}
						);
					} else {
						_this.$api.showMessage('无可用的登录授权服务');
					}
				},
				function(error) {
					_this.$api.showMessage('授权失败');
					// _this.unServiceFail = JSON.stringify(error);
				}
			);
			// #endif
		},
		async requestLogin() {
			var _this = this;
			// 这里请求服务端授权登录
			// this.sendMessage = '这里请求服务端授权登录' + this.$api.user_apploginwithcode;
			let res = await this.$api.request({
				method: 'POST',
				url: this.$api.user_apploginwithcode,
				data: {
					code: _this.weixinCode
				}
			});
			// _this.unServiceFail = 'unUserinfo111---' + JSON.stringify(res);
			if (res.code == 0) {
				// _this.userinfo = JSON.stringify(res);
				let { userId, nickName, access_token, userRank, rankName, balance } = res.data;
				let token = `Basic ${Base64.encode(access_token + ':')}`;
				if (userId) {
					uni.setStorageSync('userId', userId);
				}
				uni.setStorageSync('access_token', token);

				uni.showToast({
					icon: 'none',
					title: res.msg,
					duration: 1000,
					success: () => {
						uni.switchTab({
							url: '../index/index'
						});
					}
				});
			} else if (res.code == 1) {
				// 未注册绑定用户
				let { openId, unionid } = res.data;
				uni.showModal({
					title: '提示',
					content: '您还未绑定注册',
					success: function(res) {
						if (res.confirm) {
							_this.$api.goNavigateTo(`../login/login?openId=${openId?openId:''}&unionid=${unionid?unionid:''}`);
						} else if (res.cancel) {
							_this.$api.showMessage('取消绑定注册');
						}
					}
				});
			} else if (res.code == 2 || res.code == 3) {
				// 系统错误提示
				this.$api.showMessage(res.msg);
			}
		}
	}
};
</script>

<style lang="less" scoped="scoped">
.authorization {
	width: 100%;
	min-height: 1334upx;
	text-align: center;
	background-color: #fff;
	overflow: hidden;

	.logo {
		padding: 0;
		margin-top: 70upx;

		.image {
			width: 276upx;
			height: 83upx;
		}
	}

	.info {
		margin: auto;
		margin-top: 100upx;
		width: 448upx;

		.image {
			width: 448upx;
			height: 553upx;
		}
	}

	.button {
		cursor: pointer;
		margin: auto;
		margin-top: 136upx;
		width: 416upx;
		height: 88upx;
		line-height: 88upx;
		background: rgba(255, 51, 102, 1);
		border-radius: 44upx;
		font-size: 32upx;
		color: #fff;
	}

	.back-button {
		// width: 220upx;
		// height: 60upx;
		// line-height: 60upx;
		margin-top: 20upx;
	}
}
</style>
