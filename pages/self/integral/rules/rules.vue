<template>
    <view class="jfrules-page">
        <!-- <uni-nav-bar left-icon="back" left-text="返回" right-text="菜单" title="导航栏组件"></uni-nav-bar> -->
        <view class="jfrules-content">
            <view class="item">
                <text class="title">一、小美积分简介</text>
                <text class="desc">小美积分为会员在小美诚品（www.xiaomei360.com）的采购返点奖励，是小美诚品唯一指定的虚拟货币，不能兑现，不能转让。</text>
            </view>
            <view class="item">
                <text class="title">二、如何获得小美积分</text>
                <text class="desc">用户采购商品可获得相应积分
                    (1) 用户实际支付的金额可以累积积分。<br>
                    (2) 积分累积计算规则：实际支付金额*商品的积分系数（默认为0.1）。<br>
                    例：您下单采购1000元，实际支付1000元，则您本次订单所积累的积分为1000*0.1=100分。<br>
                    (3) 小美积分的数值精确到个位，存在小数位时，直接舍去小数部分取整。例：您采购商品，实际支付了109元，该商品的积分累计系数为0.1，则您可获得10积分（109*0.1=10.9）<br>
                    (4) 用户在订单中可以看到本次订单应获取积分的点数。付款完成后，即可在“我的积分”中查询。
                </text>
            </view>
            <view class="item">
                <text class="title">三、积分使用途径</text>
                <text class="desc">
                    用户采购商品可获得相应积分<br>
                    (1) 用户实际支付的金额可以累积积分。<br>
                    (2) 积分累积计算规则：实际支付金额*商品的积分系数（默认为0.1）。<br>
                    例：您下单采购1000元，实际支付1000元，则您本次订单所积累的积分为1000*0.1=100分。<br>
                    (3) 小美积分的数值精确到个位，存在小数位时，直接舍去小数部分取整。例：您采购商品，实际支付了109元，该商品的积分累计系数为0.1，则您可获得10积分（109*0.1=10.9）<br>
                    (4) 用户在订单中可以看到本次订单应获取积分的点数。付款完成后，即可在“我的积分”中查询。
                </text>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {

            };
        },
        methods: {
        }
    }
</script>

<style lang="less">
    @import url('./jfrules.less');
</style>
