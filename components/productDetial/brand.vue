<template>
    <view class="shopName">
        <view class="shopNameCon">
            <view class="shopLeft">
                <view class="shopImg">
                    <image class="logo-type image" :src="brand.logo" mode="widthFix"></image>
                </view>
                <view class="shopDesc">
                    <view class="name">{{ brand.brandName }}</view>
                    <view class="shopNum">
                        <text class="numText">{{ brand.goodsCount }}件商品</text>
                        <text class="descText">{{ brand.desc }}</text>
                    </view>
                </view>
            </view>
            <view class="shopRight"><text class="brand-btn" @tap="goBrandPage(brand.brandId)">查看品牌</text></view>
        </view>
    </view>
</template>

<script>
export default {
    props: ['brand'],
    data() {
        return {};
    },
    methods: {
        // 品牌主页
        goBrandPage(brandId) {
            this.$api.goNavigateTo(`/pages/goods/brandDetail/brandDetail?brandId=${brandId}`);
        }
    }
};
</script>

<style lang="less" scoped>
.shopName {
    padding: 20upx 0 0 0;
    background: #f3f3f3;

    .shopNameCon {
        height: 148upx;
        padding: 0 25upx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #fff;
    }

    .shopLeft {
        display: flex;
        align-items: center;

        .shopImg {
            width: 100upx;
            height: 100upx;
            border: 1px solid rgba(220, 228, 230, 1);
            border-radius: 4upx;
            position: relative;

            .image {
                width: 94upx;
            }
        }
    }

    .shopDesc {
        margin-left: 24upx;

        .name {
            color: #2f3a40;
            font-size: 28upx;
        }

        .shopNum {
            margin-top: 10upx;
            color: #889696;
            font-size: 22upx;

            .numText {
                color: #ff3366;
            }

            .descText {
                margin-left: 20upx;
            }
        }
    }

    .shopRight {
        font-size: 28upx;
        position: relative;

        .brand-btn {
            display: inline-block;
            padding: 0upx 20upx;
            text-align: center;
            background: #ff3366;
            color: #fff;
            font-size: 28upx;
            border-radius: 20px;
            height: 48upx;
            line-height: 48upx;
        }
    }
}
</style>
