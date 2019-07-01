<template>
	<view class="inviteCon inviteLoginCon">
		<view class="inviteRule" @click="shoeRules()">
			规则
			<text>></text>
		</view>
		<view class="invitPart">
			<view class="inviteImg"><image class="img" src="../../../static/images/invite/img_zhuce_bg.png" mode=""></image></view>
			<view class="loginForm login-page">
				<view class="from">
					<!-- 手机号等信息 -->
					<view class="input phone"><input type="text" placeholder="请输入手机号" v-model="mobile" @blur="getMobileType" /></view>
					<view class="input draps" v-if="!showYzm"><drag @successFunction="successDrag" :userMobile="mobile"></drag></view>
					<view class="input code" v-if="showYzm">
						<input type="text" placeholder="请输入验证码" v-model="checkNo" />
						<view class="code-down" @click="tryAng" :class="{ disabled: disabled }">{{ message }}</view>
					</view>
					<view class="submit disabled">
						<button type="button">立即邀请</button>
						<!-- <view>登录/注册</view> -->
					</view>
				</view>
			</view>
		</view>

		<toastpopupCenter v-if="rulesPopup" :show="rulesPopup" title="活动规则" @close="hidePop" @sure="getChangeFreight">
			<view class="rulesDialog">
				<view class="rulesList">
					<view class="ruleTitle">一·活动内容</view>
					<view class="ruleText">
						<text>(1)小美诚品的会员，通过活动发出链接邀请好友注册小美诚品。</text>
						<text>(2)受邀请好友通过链接注册并认证成功，双方各获得1500元优惠券。</text>
					</view>
					<view class="ruleTitle">二·活动参与方式</view>
					<view class="ruleText"><text>(1)用户通过此次活动邀请好友注册，受邀者在邀请链接中输入注册手机号并提交，完成认证后即算邀请成功。</text></view>
					<view class="ruleTitle">三·注意事项</view>
					<view class="ruleText">
						<text>(1)受邀者需从未注册过小美诚品账号，每位新用户只能被邀请一次。</text>
						<text>(2)邀请关系以受邀者第一次提交手机号码信息为准完成注册后不可转移和解除。</text>
						<text>(3)拥有相同账户、手机号及设备的用户视为同一用户，该规则适用于邀请者与被邀请者。</text>
						<text>(4)活动派发的优惠券适用于小美直发商品，自获得之日起30天内有效。</text>
					</view>
				</view>
			</view>
		</toastpopupCenter>
	</view>
</template>

<script>
import toastpopupCenter from '@/components/toast-popup/toast-popupCenter.vue';
import drag from '@/components/drag.vue';

var vl = {
	tel: /^1[345789]\d{9}$/,
	number: /^\d+$/,
	iemi: /^\d{15}$/
};
export default {
	components: {
		toastpopupCenter,
		drag
	},
	data() {
		return {
			rulesPopup: false,
			disabled: false,
			message: '获取验证码',
			countdown: 60,
			showYzm: false,

			// 服务器需要参数
			mobile: '', //13162855493
			checkNo: '',
			recommand_id: 0,
			//
			loginType: 1,

			clock: null,
			openId: '',
			unionid: '',
			code: '',

			access_token: ''
		};
	},
	methods: {
		getMobileType() {
			if (!vl.tel.test(this.mobile)) {
				this.$api.showMessage('请正确填写手机号');
				return false;
			}
			if (!vl.number.test(this.mobile)) {
				this.$api.showMessage('请正确填写手机号');
				return false;
			}
			if (this.mobile.length > 11) {
				this.$api.showMessage('请正确填写手机号');
				return false;
			}
			return true;
		},
		getCno() {
			if (!vl.number.test(this.checkNo)) {
				this.$api.showMessage('请正确填写验证码');
				return false;
			}
			return true;
		},
		tryAng() {
			if (this.countdown == 60 && !this.disabled) {
				this.getMessage();
			}
		},
		async getMessage() {
			let res = await this.$api.request({
				method: 'POST',
				access_token: this.access_token,
				url: this.$api.getLoginSms,
				data: {
					type: this.loginType,
					mobile: this.mobile
				}
			});
		},
		successDrag(flag) {
			this.showYzm = true;
			this.settime();
			this.getMessage();
		},
		// 关闭类型弹层
		hidePop() {
			this.rulesPopup = false;
		},
		shoeRules() {
			this.rulesPopup = true;
		},
		settime() {
			let _this = this;
			if (_this.countdown == 0) {
				_this.disabled = false;
				_this.message = '获取验证码';
				_this.countdown = 60;
				clearTimeout(this.clock);
				return;
			} else {
				_this.disabled = true;
				_this.message = _this.countdown + 's后重新获取';
				_this.countdown--;
			}
			this.clock = setTimeout(function() {
				_this.settime();
			}, 1000);
		}
	}
};
</script>

<style lang="less">
@import url('../../login/less/login.less');
@import url('./less/invite.less');
</style>
