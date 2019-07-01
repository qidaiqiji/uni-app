<template>
    <!-- :class="{'jhs': getType, 'svip': getVip}" -->
    <view class="goods-list-box">
        <view class="item" v-for="(item, index) in list" :key="index">
            <view class="goodsInfo">
                <view class="fl img-box" @tap="goDetail(item.goodsInfo.goodsId)">
                    <image :src="item.goodsInfo.thumb" mode="widthFix" class="image"></image>
                    <text class="fl-box" v-if="!item.goodsInfo.stockStatus && !item.goodsInfo.isBuyByBox">售罄</text>
                    <text class="fl-box" v-if="item.goodsInfo.stockStatus == 1">货源紧张</text>
                    <text class="fl-box" v-if="item.goodsInfo.stockStatus == 3">大货到仓</text>
                </view>
                <view class="fr r-info-box">
                    <!-- 通用标签 -->
                    <view class="tag-box" @tap="goDetail(item.goodsInfo.goodsId)">
                        <text class="tag" v-for="(tagitem, tagi) in item.tagList" :key="tagi" :class="tagitem.name">{{ tagitem.text }}</text>
                    </view>

                    <view class="r-title" @tap="goDetail(item.goodsInfo.goodsId)">{{ item.goodsInfo.goodsName }}</view>

                    <view class="r-described" @tap="goDetail(item.goodsInfo.goodsId)">
                        <text class="text rateRange">利润率 {{ item.goodsInfo.rateRange }}</text>
                        <text class="text salesCount">销量 {{ item.goodsInfo.salesCount }}</text>
                    </view>

                    <view class="r-foot">
                        <view class="price">
                            <view class="price_ident">¥</view>
                            <view class="price_number"><price :price="item.goodsInfo.goodsPrice"></price></view>
                            <view class="price_mantissa"><price :price="item.goodsInfo.goodsPrice" size="1"></price></view>
                        </view>
                        <text class="tag discount" v-if="item.goodsInfo.discount">{{ item.goodsInfo.discount }}折</text>
                        <text class="tag discount" v-if="item.goodsInfo.savePrice !== '0.00'">省¥{{ item.goodsInfo.savePrice }}</text>
                    </view>
                </view>
            </view>

            <div class="shoppingBuy" @tap="goUserBuy(item)"></div>
        </view>
    </view>
</template>

<script>
import price from './price.vue';
export default {
    components: {
        price
    },
    props: ['list', 'type'],
    data() {
        return {};
    },
    computed: {
        getPublic() {
            return this.type && this.type === 'public' ? true : false;
        }
    },
    created() {},
    filters: {
        price(val) {
            return val.split('.')[0];
        },
        priceDot(val) {
            return val.split('.')[1];
        }
    },
    methods: {
        goPage(goodsId) {
            this.$emit('detail', goodsId);
        },
        goUserBuy(item) {
            this.$emit('change', item);
        },
        getPtrice(val) {
            return 111;
            // return val.split('.')[1];
        },
		// 去商品详情页
		goDetail(id) {
            this.$api.goNavigateTo(`/pages/goods/product/product?goodsId=${id}&&userRank=4`);
		},
    }
};
</script>

<style lang="less">
@import './goods-list.less';
</style>
