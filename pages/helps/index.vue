<template>
    <view class="helps-page">
        <view class="helps-box">
            <view class="header"><text class="text">常见问题</text></view>
            <view class="helps-question-box">
                <view class="item" @tap="goPage('./inner/aboutXm')">
                    <image class="item__img" src="/static/images/helps/icon_xiaomei@2x.png" mode="" ></image>
                    <text class="item__text">关于平台</text>
                </view>
                <view class="item" @tap="goPage('./inner/aboutPro')">
                    <image class="item__img" src="/static/images/helps/icon_commodity@2x.png" mode="" ></image>
                    <text class="item__text">关于商品</text>
                </view>
                <view class="item" @tap="goPage('./inner/aboutBuy')">
                    <image class="item__img" src="/static/images/helps/icon_purchase@2x.png" mode="" ></image>
                    <text class="item__text">关于采购</text>
                </view>
                <view class="item" @tap="goPage('./inner/payWuliu')">
                    <image class="item__img" src="/static/images/helps/icon_pay@2x.png" mode="" ></image>
                    <text class="item__text">支付配送</text>
                </view>
            </view>
        </view>

        <view class="helps-more-box">
            <view class="header"><text class="text">更多问题</text></view>

            <view class="item" v-for="(item, hindex) in helpsList" :key="hindex">
                <view class="left">
                    <view class="left__box">
                        <image class="left__img" :src="item.img" mode="" ></image>
                        <text class="left__text">{{ item.name }}</text>
                    </view>
                </view>
                <view class="right">
                    <text v-for="(itemc, cindex) in item.child" :key="cindex" class="c a0" @tap="goDetail(itemc.url)">{{ itemc.name }}</text>
                </view>
                <text style="clear: both;"></text>
            </view>
        </view>

        <view class="commom-footer helps-footer">
            <view class="botton" @tap="tofeedback">
                <text class="botton-text">问题反馈</text>
            </view>
        </view>

        <modal v-show="modalBox">
            <view class="showMsg" style="height: 100%;" slot="body">
                <scroll-view class="scroll-body" scroll-y="true">

                </scroll-view>
            </view>
        </modal>
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
                modalBox: false,
                helpsList: [{
                        name: '采购指南',
                        img: '/static/images/helps/icon_companion@2x.png',
                        child: [{
                                name: '新手帮助',
								url:'inner/newHelp'
                            },
                            {
                                name: '关于活动',
								url:'inner/aboutActive'
                            },
                            {
                                name: '小美积分',
								url:'inner/xiaomeijf'
                            }
                        ]
                    },
                    {
                        name: '服务保障',
                        img: '/static/images/helps/icon_safeguard@2x.png',
                        child: [{
                                name: '正品保障',
								url:'inner/proGuara'
                            },
                            {
                                name: '售后服务',
								url:'inner/saleService'
                            },
                            {
                                name: '用户协议',
								url:'inner/userAgree'
                            }
                        ]
                    },
                    {
                        name: '支付配送',
                        img: '/static/images/helps/icon_delivery@2x.png',
                        child: [{
                                name: '支付方式',
								url:'inner/payType'
                            },
                            {
                                name: '邮费政策',
								url:'inner/youfeiRules'
                            },
                            {
                                name: '配送说明',
								url:'inner/peiInstro'
                            }
                        ]
                    },
                    {
                        name: '品牌入驻',
                        img: '/static/images/helps/icon_brand@2x.png',
                        child: [{
                                name: '招商合作',
								url:'inner/pinpaiCoo'
                            },
                            {
                                name: '入驻流程',
								url:'inner/ruzhuliucheng'
                            },
                            {
                                name: '合作品牌',
								url:'inner/aboutPingpai'
                            }
                        ]
                    },
                    {
                        name: '关于我们',
                        img: '/static/images/helps/icon_aboutus@2x.png',
                        child: [{
                                name: '公司简介',
								url:'inner/aboutCompony'
                            },
                            {
                                name: '联系我们',
								url:'inner/contactUs'
                            },
                            {
                                name: '服务邮箱',
								url:'inner/suggessText'
                            }
                        ]
                    }
                ]
            };
        },
        onLoad() {},
        methods: {
            tofeedback(){
                this.$api.goNavigateTo('../feedback/feedback');
            },
            goPage(urlPath) {
				this.$api.goNavigateTo(urlPath);
            },
            goDetail(isXcx) {
                let id = isXcx;
                switch (isXcx) {
                    case '新手帮助':
                        id = '185';
                        break;
                    case '关于活动':
                        id = '1303';
                        break;
                    case '小美积分':
                        id = '187';
                        break;
                    case '正品保障':
                        id = '176';
                        break;
                    case '售后服务':
                        id = '183';
                        break;
                    case '用户协议':
                        id = '186';
                        break;
                    case '支付方式':
                        id = '190';
                        break;
                    case '邮费政策':
                        id = '189';
                        break;
                    case '配送说明':
                        id = '188';
                        break;
                    case '招商合作':
                        id = '191';
                        break;
                    case '入驻流程':
                        id = '192';
                        break;
                    case '合作品牌':
                        id = '1304';
                        break;
                    case '公司简介':
                        id = '195';
                        break;
                    case '联系我们':
                        id = '194';
                        break;
                    case '服务邮箱':
                        id = '196';
                        break;
                    case '关于平台':
                        id = '179';
                        break;
                    case '关于商品':
                        id = '180';
                        break;
                    case '关于采购':
                        id = '181';
                        break;
                    case '关于配送':
                        id = '182';
                        break;
                    default:
                        break;
                }
				
				this.$api.goNavigateTo(`./${id}`);
            }
        }
    };
</script>

<style lang="less">
    .scroll-body {
        max-height: 560upx;
        font-size: 28upx;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(47, 58, 64, 1);
    }

    @import url('less/index.less');
</style>
