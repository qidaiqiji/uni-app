<template>
    <view class="inviteCon">
        <view class="inviteRule" @click="shoeRules()">
            <text>规则</text>
            <text>></text>
        </view>
        <view class="invitPart">
            <view class="inviteImg"><image class="img" src="../../../static/images/invite/img_yaoqing_bg.png" alt=""></image></view>
            <view class="inviteInfo">
                <view class="invietUser">您已成功邀请: {{ inviteNum }} 位好友</view>
                <view class="invitePkg" @click="invitePkg">查看红包>></view>
            </view>
            <view class="inviteBtn" @click="inviteBtn"><view class="button2">立即邀请</view></view>
        </view>
        <view class="lookxiaomei">了解小美</view>

        <toastpopupCenter :show="rulesPopup" title="活动规则" @close="hidePop" @sure="getChangeFreight">
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

        <sharePop :show="showSharePop" @closeShare="closePop"></sharePop>
    </view>
</template>

<script>
import toastpopupCenter from '@/components/toast-popup/toast-popupCenter.vue';
import sharePop from '@/components/share.vue';
export default {
    components: {
        toastpopupCenter,
        sharePop
    },
    data() {
        return {
            rulesPopup: false,
            inviteNum: 0,
            access_token: '',
            showSharePop: false
        };
    },
    onLoad() {
        this.access_token = uni.getStorageSync('access_token') || '';
        this.getInviteNumber();
    },
    onShow() {},
    methods: {
        // 关闭类型弹层
        hidePop() {
            this.rulesPopup = false;
        },
        shoeRules() {
            this.rulesPopup = true;
        },
        invitePkg() {
            this.$api.goNavigateTo('../ownCoupon/ownCoupon');
        },
        async getInviteNumber() {
            let vm = this;
            let res = await this.$api.request({
                method: 'GET',
                access_token: this.access_token,
                url: this.$api.user_invite
            });
            if (res && res.code == 0) {
                vm.inviteNum = res.data.inviteNum;
            }
        },
        inviteBtn() {
            this.showSharePop = true;
        },
        closePop() {
            this.showSharePop = false;
        }
    }
};
</script>

<style lang="less">
@import url('./less/invite2.less');

.inviteInfo {
    position: absolute;
    top: 600upx;
    width: 600upx;
    left: 50%;
    margin-left: -280upx;
    text-align: center;

    .invietUser {
        color: #fff;
        font-size: 28upx;
    }

    .invitePkg {
        font-size: 24upx;
        margin-top: 20upx;
        color: #ffcd5f;
    }
}

.lookxiaomei {
    visibility: hidden;
    font-size: 24upx;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(198, 114, 42, 1);
    position: absolute;
    bottom: 30upx;
    left: 50%;
    transform: translate(-50%, 0);
}
</style>
