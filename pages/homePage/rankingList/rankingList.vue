<template>
    <view class="pages paihang-page">
        <view class="content" v-show="showView">
            <view class="paihang-head"><image class="image" :src="banner.img" mode=""></image></view>

            <!-- 热销榜 -->
            <view class="rank rank-list">
                <view class="rank-item" v-for="(item, key) in paihangList" :key="key">
                    <view class="head" @tap="goRankDetail(item.id)" :style="'background:' + item.color">
                        <view class="title">
                            <text class="fl">{{ item.title }}热销榜</text>
                            <text class="desc">详情</text>
                        </view>
                    </view>
                    <view class="body">
                        <view class="child" v-for="(citem, childKey) in item.goodsList" :key="childKey" :class="{ 'last-child': childKey == item.goodsList.length - 1 }">
                            <view class="">
                                <view class="child_img">
                                    <text class="fl_icon" :class="'fl_icon' + childKey"></text>
                                    <image class="child_image" :src="citem.goodsInfo.thumb" @tap="goDetail(citem.goodsInfo.goodsId)" mode="" ></image>
                                </view>
                                <view class="text-box">
                                    <text class="texts text-title">{{ citem.goodsInfo.goodsName }}</text>
                                    <text class="text-price">￥{{ citem.goodsInfo.goodsPrice }}</text>
                                </view>
                            </view>
                            <view class="icon_user_buy" @tap="getUserBuy(citem)">
                                <image class="image" src="../../../static/images/s44/category_shopping.png" mode="" ></image>
                            </view>
                        </view>
                    </view>
                </view>
            </view>

            <!-- 已经到底了 -->
            <text class="lock-end" v-if="paihangList.length > 0">已经到底了</text>
            <!-- 浮动图标 -->
            <min-nav :isScroll="showTop" @change="backToTop"></min-nav>
            
            <!-- 购物车窗口 -->
            <block v-if="showCart"><buy-popup :show="showCart" :datas="goodInfo" @close="closeCart" @sure="addCart"></buy-popup></block>
        </view>
    </view>
</template>

<script>
import minNav from '@/components/min-nav/min-nav.vue';
import buyPopup from '@/components/buy-popup/buy-popup.vue';
export default {
    components: {
        minNav,
        buyPopup
    },
    data() {
        return {
            showView: false,
            rank: [{}, {}, {}],
            banner: [],
            paihangList: [],
            showTop: false,
            arrayList: [],
            goodsOneId: '',
            rulesPopup: false,
            showCart: false,
            goodInfo: {}
        };
    },
    onLoad() {
        this.getRankingList();
    },
    onShow() {},
    // onPageScroll(e) {
    //     if (e.scrollTop <= 0 && this.showTop) {
    //         this.showTop = false;
    //     }
    //     if (e.scrollTop > 150 && !this.showTop) {
    //         this.showTop = true;
    //     }
    // },
    methods: {
		backToTop() {
			uni.pageScrollTo({ scrollTop: 0, duration: 10 });
		},
        async addCart(data) {
            let vm = this;
            let res = await this.$api.request({
                method: 'POST',
                header: true,
                url: this.$api.cartAdd,
                data: data
            });
            if (res.code == 0) {
                vm.$store.commit('updateCart', res.data.totalCount);
            }
            this.$api.showMessage(res.msg);
            this.closeCart();
        },
        getUserBuy(item) {
            this.goodInfo = item;
            this.showCart = true;
        },
        closeCart() {
            this.showCart = false;
        },
        // 去商品详情页
        goDetail(goodsId) {
            this.$api.goNavigateTo(`../../goods/product/product?goodsId=${goodsId}`);
        },
        // 详情
        goRankDetail(item) {
            this.$api.goNavigateTo(`./view?id=${item}`);
        },
        // 榜单列表
        async getRankingList() {
            let vm = this;
            vm.showView = true;
            let res = await this.$api.request({ url: this.$api.paihangIndex, loading: true });
            if (res && res.data) {
                let data = res.data;
                vm.banner = data.banner;
                vm.paihangList = data.paihangList;
            }
            vm.showView = true;
        }
    }
};
</script>

<style lang="less">
@import url('./ranking-list.less');

.icon_user_buy {
    bottom: 8upx;
    right: 10upx;
}
</style>
