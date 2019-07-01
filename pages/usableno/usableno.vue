<template>
	<view class="audit">
		<!-- 审核通过 -->
		<view class="success" v-if="getCheckedStatus_await">
			<view class="audit-tip"><image class="img" src="../../static/images/authentication/success.png"></image></view>
			<view class="info">{{ refuseInfo ? refuseInfo : '您的认证资料已提交成功，请耐心等待管理员审核！如有疑问，请致电客服。' }}</view>
		</view>
		<!-- 审核失败 -->
		<view class="fail" v-if="getCheckedStatus_fail">
			<view class="audit-tip"><image class="img" src="../../static/images/authentication/fail.png"></image></view>
			<view class="info">{{ refuseInfo ? refuseInfo : '您提交的资料审核未通过，请重新修改提交资料！如有疑问，请致电客服客服热线。' }}</view>
		</view>
		<view class="audit-code">
			<view class="qrcode"><image class="img" src="../../static/images/authentication/img_qrcode.png"></image></view>
			<view class="time">
				<view class="text">您所在区域客服热线：</view>
				<view class="text blod">18928457720</view>
				<view class="text">工作时间</view>
				<view class="text blod">9:00~19:30</view>
			</view>
		</view>
		<view class="audit-submit">
			<view class="btn reset" @tap="goAuthValid">重新提交</view>
			<view class="btn back" @tap="goHomePage">回到首页</view>
		</view>
		<!-- <view class="out"><span>退出登录</span></view> -->
	</view>
</template>

<script>
export default {
	name: 'audit',
	data() {
		return {
			// 审核状态
			checkedStatus: -1,
			// 审核文案
			refuseInfo: ''
		};
	},
	onLoad() {},
	onShow() {
		this.get_user_applystatus();
	},
	computed: {
		// 审核中
		getCheckedStatus_await() {
			return this.checkedStatus == 0;
		},
		// 审核失败
		getCheckedStatus_fail() {
			return this.checkedStatus == 1 || this.checkedStatus == 3;
		}
	},
	methods: {
		async get_user_applystatus() {
			let res = await this.$api.request({
				url: this.$api.user_applystatus,
				isLoadingType: true
			});
			if (res && res.data) {
				let { refuseInfo, checkedStatus } = res.data;
				this.refuseInfo = refuseInfo;
				this.checkedStatus = checkedStatus;
				if (checkedStatus < 1) {
					this.refuseInfo = '';
				}
				if (checkedStatus == 2) {
					// setTimeout(() => {
					// 	this.goHomePage();
					// },0);
				}
			}
		},
		goHomePage() {
			uni.switchTab({
				url: '../index/index'
			});
		},
		goAuthValid() {
			this.$api.goNavigateTo('../usable/usable?u=1');
		}
	}
};
</script>

<style lang="less" scoped="scoped">
@import url('./audit.less');
</style>
