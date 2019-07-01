<template>
    <view class="login-page login">
        <view class="logo"><image class="image" src="../../static/images/login/xm-logo.png" mode=""></image></view>

        <view class="from">
            <view class="input address" @tap="showPicker">
				<view class="login-icon poi"></view>
                <view class="input-text">{{ proviceName ? proviceName : '请选择您的省份地址' }}</view>
            </view>
            <view class="submit" @tap="changePro" :disabled="isCode" :class="{ disabled: isCode }"><view>完成</view></view>
        </view>

        <!-- 地址的弹框 -->
        <mpvueProvincePicker ref="mpvueProPicker" :themeColor="themeColor" :pickerValueDefault="cityPickerValueDefault" @onConfirm="onConfirm"></mpvueProvincePicker>
    </view>
</template>

<script>
import mpvueProvincePicker from '@/components/mpvue-provincepicker/mpvueProvincePicker.vue';
export default {
    components: {
        mpvueProvincePicker
    },
    data() {
        return {
            // 城市选择参数
            themeColor: '#FF3366',
            cityPickerValueDefault: [0, 0, 0],
            //
            provinceId: '',
            proviceName: '',
            isCode: false,
            access_token: ''
        };
    },
    onLoad() {
        let token = uni.getStorageSync('access_token');
        this.access_token = token;
    },
    methods: {
        async changePro() {
            let that = this;
            if (this.provinceId && this.proviceName) {
                // this.$api.showMessage('access_token:: '+this.access_token);
                let res = await this.$api.request({
                    method: 'get',
                    url: `${this.$api.user_changeprovince}?provinceId=${this.provinceId}`,
                    access_token: that.access_token
                });
                if (res && res.code == 0) {
					this.$api.goNavigateTo('../usable/usable');
                }
            } else {
                this.$api.showMessage('请选择您的省份地址');
            }
        },
        onConfirm(e) {
            let { label, cityCode } = e;
            this.proviceName = label.replace(/\-/g, '  ');
            this.provinceId = cityCode;
        },
        showPicker() {
            this.$refs.mpvueProPicker.show();
        }
    }
};
</script>

<style lang="less" scoped="scoped">
@import url('../login/less/login.less');
.input-text {
    text-align: left;
    height: 88upx;
    line-height: 88upx;
    color: #889696;
    font-size: 28upx;
    padding-left: 60upx;
}
</style>
