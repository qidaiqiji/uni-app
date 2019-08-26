<template>
    <view class="pages addr-form-page">
        <view class="forms">
            <!-- 用户ID -->
            <view class="form-item form-column">
                <text class="label">用户ID</text>
                <view class="with-fun"><input class="uni-input" :placeholder-style="placeholderStyle" disabled="true" :value="userId" /></view>
            </view>
            <!-- 联系人 -->
            <view class="form-item form-column">
                <text class="label">联系人</text>
                <view class="with-fun"><input class="uni-input" :placeholder-style="placeholderStyle" disabled="true" :value="nickname" @input="nicknameInput" /></view>
            </view>
            <!-- 手机号 -->
            <view class="form-item form-column">
                <text class="label">手机号</text>
                <view class="with-fun"><input class="uni-input" :placeholder-style="placeholderStyle" disabled="true" :value="mobilePhone" @input="mobilePhoneInput" /></view>
            </view>
            <!-- 店铺名称 -->
            <view class="form-item form-column">
                <text class="label">店铺名称</text>
                <view class="with-fun"><input class="uni-input" :placeholder-style="placeholderStyle" disabled="true" :value="companyName" @input="companyNameInput" /></view>
            </view>
            <!-- 生日 -->
            <view class="form-item form-column">
                <text class="label">生日</text>
                <view class="with-fun">
                    <text class="form-input" :class="{ 'u-active': birthday !== '' }" @click="toggleTab(0)">{{ birthday ? birthday : '请输入出生日期' }}</text>
                    <view class="xm-icon xm-icon-abso" v-if="birthdayIcon" @tap="clearIcon('birthday')"></view>
                </view>
            </view>
            <!-- 性别 -->
            <view class="form-item form-column">
                <text class="label">性别</text>
                <view class="with-fun">
                    <text class="form-input" :class="{ 'u-active': sex !== '' }" @click="togglePopup('bottom')">{{ sex }}</text>
                    <view class="xm-icon xm-icon-abso" v-if="sexIcon" @tap="clearIcon('sex')"></view>
                </view>
            </view>
            <!-- 联系方式 -->
            <view class="form-item form-column">
                <text class="label">联系方式</text>
                <view class="with-fun">
                    <input class="uni-input" :placeholder-style="placeholderStyle" placeholder="请输入您的其他联系方式。例：邮箱或者QQ" v-model="contact" @input="contactInput" />
                    <view class="xm-icon xm-icon-abso" v-if="contactIcon" @tap="clearIcon('contact')"></view>
                </view>
            </view>
            <!-- 资质照片 -->
            <view class="form-item form-column">
                <text class="label">资质照片</text>
                <view class="with-fun photo-box">
					<image :src="image" alt="" v-for="(image, index) in license" :key="index" class="image" :class="{ mr: !index }" ></image>
				</view>
            </view>
        </view>

        <!-- 确定修改 -->
        <view class="action-box add-footer"><text class="btn send-btn" :class="{ 'unsend-btn': getTextareaValue }" @tap="changeUserInfo()">确定修改</text></view>

        <!-- 性别选择 -->
        <uni-popup :show="type === 'bottom'" position="bottom" @hidePopup="togglePopup('')">
            <view class="bottom-content2">
                <view class="bottom-line-select" v-for="(item, index) in sexData" :key="index" @tap="getSexValue(item)">{{ item.text }}</view>
            </view>
            <view class="bottom-btn" @click="togglePopup('')">取消</view>
        </uni-popup>

        <!-- 时间选择器 -->
        <w-picker v-if="birthday !== ''" :mode="typeMode" :defaultVal="defaultVal" @confirm="onConfirm" ref="picker" themeColor="#f00"></w-picker>
    </view>
</template>

<script>
import uniPopup from '@/components/uni-popup/uni-popup.vue';
import wPicker from '@/components/date-picker/date-picker.vue';
export default {
  components: {
    uniPopup,
    wPicker
  },
  data() {
    return {
      sexData: [
        {
          value: 0,
          text: '男'
        },
        {
          value: 1,
          text: '女'
        }
      ],
      placeholderStyle: 'font-size: 26upx;color: #D4D4D4;',
      type: '',

      // model
      userId: '',
      nickname: '',
      mobilePhone: '',
      companyName: '',
      birthday: '',
      sex: '',
      sexHidden: 0, //隐藏值
      contact: '',
      license: [],

      nicknameIcon: false,
      mobilePhoneIcon: false,
      companyNameIcon: false,
      birthdayIcon: false,
      sexIcon: false,
      contactIcon: false,
      // 区域
      cityPickerValueDefault: [0, 0, 0],
      themeColor: '#FF3366',
      // 时间选择器 设置
      typeMode: 'date',
      defaultVal: [0, 0, 0],

      access_token: ''
    };
  },
  computed: {
    getTextareaValue() {
      // return this.birthday && this.sex && this.contact ? false : true;
      return false
    }
  },
  onLoad() {
    let token = uni.getStorageSync('access_token');
    this.access_token = token;
  },
  onShow() {
    this.getUserInfo();
  },
  methods: {
    toggleTab(index) {
      if (this.birthday) {
      }
      this.$refs.picker.show();
    },
    onConfirm(val) {
      this.birthday = val.checkArr.join('-');
      this[`birthdayIcon`] = true;
    },
    togglePopup(type) {
      this.type = type;
    },
    getSexValue(item) {
      this.sex = item.text;
      this.sexHidden = item.value;
      this[`sexIcon`] = true;
      this.togglePopup('');
    },
    nicknameInput(event) {
      let value = event.target.value;
      this.nickname = value;
      this[`nicknameIcon`] = value.length > 0 ? true : false;
    },
    mobilePhoneInput(event) {
      let value = event.target.value;
      this.mobilePhone = value;
      this[`mobilePhoneIcon`] = value.length > 0 ? true : false;
    },
    companyNameInput(event) {
      let value = event.target.value;
      this.companyName = value;
      this[`companyNameIcon`] = value.length > 0 ? true : false;
    },
    contactInput(event) {
      let value = event.target.value;
      this.contact = value;
      this[`contactIcon`] = value.length > 0 ? true : false;
    },
    clearIcon(type) {
      this[type] = '';
      this[`${type}Icon`] = false;
    },
    setWPicker(birthday) {
      birthday = birthday || this.birthday;
      let _defaultVal = this.birthday.split('-');
      if (_defaultVal && _defaultVal[0] >= 1969) {
        let _Yindex = _defaultVal[0] - 1970;
        let _Mindex = _defaultVal[1] - 1;
        let _Dindex = _defaultVal[2] - 1;
        this.$set(this, 'defaultVal', [_Yindex, _Mindex, _Dindex]);
      }
    },
    async getUserInfo() {
      let vm = this;
      let res = await vm.$api.request({
        url: vm.$api.user_userInfo
      });
      if (res && res.code == 0) {
        let data = res.data;
        for (let key in data) {
          let value = data[key];
          if (key === 'sex') {
            value = data[key] > 0 ? '女' : '男';
            vm[key] = value;
            vm.sexHidden = data[key];
          } else {
            vm[key] = value;
          }
          if (key === 'birthday') {
            vm.setWPicker(data[key]);
          }
        }
        vm.birthdayIcon = true;
        vm.sexIcon = true;
        vm.contactIcon = true;
      }
    },
    async changeUserInfo() {
      let vm = this;
      let res = await vm.$api.request({
        method: 'POST',
        url: vm.$api.user_changeuserInfo,
        data: {
          birthday: vm.birthday,
          sex: vm.sexHidden,
          contact: vm.contact
        }
      });
      if (res && res.code == 0) {
        uni.showToast({
          title: res.msg
        });
      }
    }
  }
};
</script>


<style lang="less" scoped>

.addr-form-page {
    overflow: hidden;

    .forms {
        background: #fff;
    }

    .use-switch {
        margin-left: 450upx;
        color: #ff3366;
    }

    .add-footer {
        margin-top: 60upx;
    }

    .send-btn {
        margin-bottom: 30upx;
    }
}

.form-item {
    background: #ffffff;
    width: 726upx;
    padding: 20upx 0;
    margin-left: 24upx;
    border-bottom: 1px solid #dce4e6;

    .form-input,
    .uni-input {
        display: block;
        font-size: 26upx;
        font-weight: 400;
    }

    .form-input {
        color: #d4d4d4;
    }

    .uni-input {
        color: #2f3a40;
    }

    .u-active {
        color: #2f3a40;
    }

    .label {
        display: inline-block;
        vertical-align: middle;
        font-size: 24upx;
        font-weight: 400;
        color: #889696;
        width: 160upx;
    }

    .with-fun {
        background: #ffffff;
        display: inline-block;
        vertical-align: middle;
        width: 550upx;
        box-sizing: border-box;
        position: relative;
        padding-right: 48upx;
    }

    .photo-box {
        display: flex;
        overflow: hidden;
        width: 100%;
        padding-right: 0;
        text-align: center;
        margin-top: 14upx;
        max-height: 240upx;
    }

    .image {
        width: 310upx;
		height: auto;
        min-height: 205upx;
        display: inline-block;
    }
    .mr {
        margin-right: 40upx;
    }
}
</style>
