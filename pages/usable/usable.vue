<template>
	<view class="authentication">
		<view class="logo"><image class="image" src="../../static/images/login/xm-logo.png"></image></view>
		<view class="valid-from">
			<!-- 手机号等信息 -->
			<view class="input store">
				<text class="must">*</text>
				<input type="text" v-model="companyName" placeholder="请输入实体店名称" />
			</view>
			<view class="input name">
				<text class="must">*</text>
				<input type="text" v-model="nickname" placeholder="请输入联系人姓名" />
			</view>
			<view class="tips zm">
				<view>
					<text class="must">*</text>
					资质证明
				</view>
			</view>
			<view class="img upload">
				<view class="preview" @tap="togglePopup(1)">
					<image v-if="!bizLicensePic" class="img" src="../../static/images/authentication/img_businesslicense.png"></image>
					<image v-if="bizLicensePic" class="img" :src="bizLicensePic"></image>
					<view class="text">{{ showData ? '重新上传' : '上传营业执照' }}</view>
				</view>
				<view class="preview" @tap="togglePopup(2)">
					<image v-if="!shopFrontPic" class="img" src="../../static/images/authentication/img_shoppicture.png"></image>
					<image v-if="shopFrontPic" class="img" :src="shopFrontPic"></image>
					<view class="text">{{ showData ? '重新上传' : '上传店铺照片' }}</view>
				</view>
			</view>
			<view class="submit" @tap="submit"><view>提交审核</view></view>
			<view class="tips">请提供营业执照、店铺照片作为实体凭证，单张图片不超过2M，支持jpg、png格式</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			//服务器数据
			companyName: '',
			nickname: '',
			shopFrontPic: '',
			bizLicensePic: '',
			showData: false,
			access_token: ''
		};
	},
	computed: {
		disabled() {
			return this.bizLicensePic && this.nickname && this.companyName && this.shopFrontPic;
		}
	},
	onLoad(params) {
		let { u } = params;
		if (u) {
			this.showData = true;
		}
		let token = uni.getStorageSync('access_token') || '';
		this.access_token = token;
		if (this.showData && token) {
			this.getUserValidInfo();
		}
	},
	onShow() {},
	onUnload() {
		this.companyName = '';
		this.nickname = '';
		this.shopFrontPic = '';
		this.bizLicensePic = '';
	},
	methods: {
		async sendUserInfo() {
			let that = this;
			let res = await that.$api.request({
				method: 'post',
				url: that.$api.user_setApplyinfo,
				access_token: that.access_token,
				data: {
					companyName: that.companyName,
					nickname: that.nickname,
					shopFrontPic: that.shopFrontPic,
					bizLicensePic: that.bizLicensePic
				}
			});
			if (res && res.code == 0) {
				this.$api.goNavigateTo('../usableno/usableno');
			}
		},
		submit() {
			if (this.companyName && this.nickname && this.shopFrontPic && this.bizLicensePic) {
				// if (this.companyName && this.nickname) {
				this.sendUserInfo();
			} else {
				this.$api.showMessage('请填写完整信息');
			}
		},
		togglePopup(type) {
			let that = this;
			let url = type == 1 ? that.$api.uploadLicense : that.$api.uploadShopFront;
			let key = type == 1 ? 'bizLicensePic' : 'shopFrontPic';
			// let _APP = typeof window != 'undefined' ? that.$api.Post : url;
			let _APP = url;
			uni.chooseImage({
				count: 1, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album', 'camera'], //从相册选择
				success: function(res) {
					const tempFilePaths = res.tempFilePaths;
					console.log(_APP);
					uni.uploadFile({
						url: _APP,
						filePath: tempFilePaths[0],
						name: 'file',
						header: {
							Authorization: that.access_token
						},
						formData: {
							url: url
						},
						success: uploadFileRes => {
							let resData = uploadFileRes && uploadFileRes.data;
							if (resData && typeof resData == 'string') {
								resData = JSON.parse(resData);
							}
							if (resData && resData.data) {
								console.log(resData.data.url);
								that[key] = resData.data.url;
							}
						},
						fail: err => {
							uni.showModal({
								title: '上传失败',
								content: JSON.stringify(err)
							});
						}
					});
				},
				fail(err) {
					console.log(JSON.stringify(err));
				}
			});
		},
		async getUserValidInfo() {
			let res = await this.$api.request({
				url: this.$api.user_getApplyinfo
			});
			if (res && res.data) {
				let _res = res.data;
				this.companyName = _res.companyName;
				this.nickname = _res.nickname;
				this.shopFrontPic = _res.shopFrontPic;
				this.bizLicensePic = _res.bizLicensePic;
			}
		}
	}
};
</script>

<style lang="less">
@import url('./authentication.less');
</style>
