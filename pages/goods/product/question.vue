<template>
    <view class="quesCon">
        <view class="quesHead">常见问题</view>
        <view class="quesList">
            <view class="quesText">
                <view class="quesdeac">1.下单多久能发货</view>
                <view class="answer">
                    下单成功后我们会在12个小时内对用户所订购的商品、邮寄地址、款项支付等信息进行核对，一般在2-3个工作日内讲包裹发出(周末和法定节假日日顺延)。
                </view>
            </view>
            <view class="quesText">
                <view class="quesdeac">2.平台商品的价格含税吗？</view>
                <view class="answer">不含税。如需要开具发票，需另外支付税费。</view>
            </view>
            <view class="quesText">
                <view class="quesdeac">3.平台使用什么物流配送方式，能否自选物流？</view>
                <view class="answer">
                    通常包裹20公斤以上发物流，其他发快递，详细情况请咨询客服目前暂时不提供自选物流的服务，我们会根据订单中的收货地址和商品种类提供最合适的物流公司进行配送。
                </view>
            </view>
            <view class="quesText">
                <view class="quesdeac">4.商品验收与签收需要注意什么？</view>
                <view class="answer">
                    小美诚品保证出货时货物外包装的完好无损，为了保证客户的利益，请在收货物时务必验货，请拆开包装箱，确认货品完好无损后再签收。如果发现货物在运输中有破损，顾客有权拒收，在快递单写明拒收原因，请配送人员退回。若发现商品错发漏发，请在签收24小时内联系客服处理。超过24小时，小美诚品概不负责。
                </view>
            </view>
            <view class="quesText">
                <view class="quesdeac">5.退换货产生的运费由谁负责？</view>
                <view class="answer">因商品质量问题，第三方物流及小美诚品本身的原因产生的退换，运费由小美诚品承担注：</view>
                <view class="answer">不支持到货付款业务，请顾客先垫付运费，到货验证商品后，小美诚品将以现金形式为用户报销运费；</view>
                <view class="answer">如果是未经确认而擅自退回的商品，该退货申请将不被受理。</view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    props: ['text'],
    data() {
        return {};
    },
    methods: {}
};
</script>

<style lang="less" scoped="scoped">
//常见问题
.question {
    background: #f3f3f3;
    padding-top: 24upx;

    .quesCon {
        background: #fff;
    }

    .quesHead {
        height: 88upx;
        padding-left: 24upx;
        line-height: 88upx;
        color: #2f3a40;
        font-size: 28upx;
        border-bottom: 1px solid #dce4e6;
    }

    .quesList {
        padding: 25upx 28upx;
        padding-bottom: 0;
    }

    .quesText {
        margin-bottom: 50upx;

        .quesdeac {
            color: #2f3a40;
            font-size: 26upx;
        }

        .answer {
            color: #889696;
            font-size: 26upx;
            line-height: 40upx;
            margin-top: 10upx;
			text-align: justify;
        }
    }
}
</style>
