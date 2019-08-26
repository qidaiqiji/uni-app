<template>
	<view class="addr-form-page" style="background:#fff;">
		<view class="forms">
			<view class="form-item form-column">
				<text class="label">收货人</text>
				<view class="with-fun"><input class="uni-input" :placeholder-style="placeholderStyle" placeholder="姓名" :value="consignee" @input="consigneeInput" /></view>
				<view class="xm-icon xm-icon-abso" v-if="consigneeIcon" @tap="clearIcon('consignee')"></view>
			</view>
			<view class="form-item form-column">
				<text class="label">联系方式</text>
				<view class="with-fun">
					<input class="uni-input" :placeholder-style="placeholderStyle" placeholder="手机号码" :value="mobile" @input="mobileInput" @blur="vaildMobile" />
				</view>
				<view class="xm-icon xm-icon-abso" v-if="mobileIcon" @tap="clearIcon('mobile')"></view>
			</view>
			<view class="form-item form-column cell" @tap="showMulLinkageThreePicker()">
				<text class="label">所在地区</text>
				<view class="with-fun">
					<text class="form-input c-active">{{ usecity ? usecity : '请选择' }}</text>
				</view>
			</view>
			<view class="form-item form-column">
				<text class="label">详细地址</text>
				<view class="with-fun">
					<input class="uni-input" :placeholder-style="placeholderStyle" placeholder="详细地址需填写楼栋楼层或房间号信息" v-model="address" @input="addressInput" />
				</view>
				<view class="xm-icon xm-icon-abso" v-if="addressIcon" @tap="clearIcon('address')"></view>
			</view>
			<view class="form-item form-column" style="overflow: hidden;display: block;">
				<text class="label" style="width: 200upx;">设为默认地址</text>
				<view class="fr"><switch class="use-switch" style="margin-left: 0;margin-right: 10upx;" color="#FF3366" :checked="isDefault" @change="getSetDefault" /></view>
			</view>
		</view>
		<view class="action-box add-footer">
			<text class="btn send-btn" :class="{ 'unsend-btn': unsave }" @tap="createAddress()">保存</text>
			<text class="btn del-btn" @tap="showConfirmBox()" v-if="addressId > 0">删除地址</text>
		</view>
		<mpvue-city-picker ref="mpvueCityPicker" :themeColor="themeColor" :pickerValueDefault="cityPickerValueDefault" @onConfirm="onConfirm"></mpvue-city-picker>

		<confirm @sure="doConfirm" :show="showConfirm"><view class="" style="padding: 20upx 0;">删除后不可恢复，是否确定？</view></confirm>
	</view>
</template>

<script>
import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue';
import confirm from '@/components/confirm/confirm.vue';
export default {
	components: {
		mpvueCityPicker,
		confirm
	},
	data() {
		return {
			placeholderStyle: 'font-size: 26upx;color: #D4D4D4;',

			// model
			addressId: 0,
			address: '', //【必填】详细地址
			consignee: '', //【必填】收件人
			mobile: '', //【必填】手机号码 1打头的11位数字 组成的字符串
			provinceId: 0, //【必填】省份ID
			provinceName: '', //省份名称
			cityId: 0, //【必填】城市ID
			cityName: '', //城市名称
			districtId: 0, //区ID
			districtName: '', //区名称
			isDefault: false, //是否是默认地址

			usecity: '',
			addressIcon: false,
			consigneeIcon: false,
			mobileIcon: false,

			//
			unsave: false,

			//
			showConfirm: false,
			//
			edit: false,
			// 区域
			showPicker: false,
			cityPickerValueDefault: [0, 0, 0],
			themeColor: '#FF3366',

			pick_cityName: null,
			pick_cityCode: null,
			//
			 action: false,
		};
	},
	computed: {
		getTextareaValue() {
			return true;
		}
	},
	onLoad(e) {
		let that = this;
		let edit = e.edit;
		if (edit) {
			this.edit = edit;
			let storge = uni.getStorageSync('addressId');
			if (storge) {
				that['consignee'] = storge.consignee;
				that[`consigneeIcon`] = true;
				that['mobile'] = storge.mobile;
				that[`mobileIcon`] = true;
				that['address'] = storge.address;
				that[`addressIcon`] = true;
				that[`isDefault`] = storge.isDefault;
				that[`addressId`] = storge.addressId;
				that.provinceId = storge.provinceId;
				that.provinceName = storge.provinceName;
				that.cityId = storge.cityId;
				that.cityName = storge.cityName;
				that.districtId = storge.districtId;
				that.districtName = storge.districtName;
				that.usecity = `${storge.provinceName}  ${storge.cityName}  ${storge.districtName}`;
				that.cityPickerValueDefault = [storge.provinceId, storge.cityId, storge.districtId];
			}
		}
	},
	methods: {
		consigneeInput(event) {
			this.consignee = event.target.value;
			if (event.target.value.length > 0) {
				this.consigneeIcon = true;
			}
		},
		mobileInput(event) {
			this.mobile = event.target.value;
			if (event.target.value.length > 0) {
				this.mobileIcon = true;
			}
		},
		addressInput(event) {
			this.address = event.target.value;
			if (event.target.value.length > 0) {
				this.addressIcon = true;
			}
		},
		getSetDefault(event) {
			if (event.detail.value) {
				this.isDefault = true;
			} else {
				this.isDefault = false;
			}
		},
		showMulLinkageThreePicker() {
			this.$refs.mpvueCityPicker.show();
		},
		clearIcon(type) {
			let that = this;
			that[type] = '';
			that[`${type}Icon`] = false;
		},
		onConfirm(e) {
			let that = this;
			this.usecity = e.label.replace(/\-/g, '  ');
			this.pick_cityName = e.label.split('-');
			this.pick_cityCode = e.cityCode.split('-');
			this.provinceId = that.pick_cityCode[0];
			this.provinceName = that.pick_cityName[0];
			this.cityId = that.pick_cityCode[1];
			this.cityName = that.pick_cityName[1];
			this.districtId = that.pick_cityCode[2] ? that.pick_cityCode[2] : 0;
			this.districtName = that.pick_cityName[2] ? that.pick_cityName[2] : '';
		},
		vaildMobile() {
			var vl = {
				tel: /^1[345789]\d{9}$/,
				number: /^\d+$/,
				iemi: /^\d{15}$/
			};
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
		showConfirmBox() {
			this.showConfirm = true;
		},
		doConfirm(val) {
			this.showConfirm = false;
			if (val) {
				this.deleteAddress();
			}
		},
		doActions(msg) {
			msg = msg || '';
			uni.showToast({
				title: msg,
				success: () => {
					setTimeout(() => {
						// uni.redirectTo({
						// 	url: '../addressList/addressList'
						// })
						uni.navigateBack({
							delta: 1
						});
					}, 1600);
				}
			});
		},
		//
		async createAddress() {
			let that = this;
			if(that.action){
				return;
			}
			that.action = true;
			if (!this.vaildMobile()) {
				return;
			}
			if (!that.consignee || !that.address || !that.mobile || !that.usecity) {
				return that.$api.showMessage('请填写完整信息');
			}
			let data = {
				address: that.address, //【必填】详细地址
				consignee: that.consignee, //【必填】收件人
				mobile: that.mobile, //【必填】手机号码 1打头的11位数字 组成的字符串
				provinceId: that.provinceId, //【必填】省份ID
				provinceName: that.provinceName, //省份名称
				cityId: that.cityId, //【必填】城市ID
				cityName: that.cityName, //城市名称
				districtId: that.districtId, //区ID
				districtName: that.districtName, //区名称
				isDefault: that.isDefault ? 1 : 0 //是否是默认地址
			};
			let url = this.$api.address_create;
			if (this.edit) {
				url = this.$api.address_update;
				data.addressId = this.addressId;
			}
			let res = await this.$api.request({
				method: 'POST',
				url: url,
				data: data
			});
			if (res.code == 0) {
				that.doActions(res.msg);
			} else {
				this.$api.showMessage(res.msg);
			}
		},
		async deleteAddress() {
			let that = this;
			if(that.action){
				return;
			}
			that.action = true;
			if (that.addressId > 0) {
				let res = await this.$api.request({
					method: 'POST',
					url: this.$api.address_delete,
					access_token: this.$store.state.access_token,
					data: {
						addressId: that.addressId
					}
				});
				if (res.code == 0) {
					that.doActions(res.msg);
				} else {
					this.$api.showMessage(res.msg);
				}
			}
		}
	}
};
</script>

<style lang="less">
@import url('./add.less');
</style>
