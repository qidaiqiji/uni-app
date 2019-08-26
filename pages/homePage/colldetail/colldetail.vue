<template>
    <view class="pages album-detail-page">
        <view class="album-detail-head">
            <view class="bottom-box">
                <div class="bottom-box-mask"></div>
                <view class="album-title-box">
                    <text class="title">{{ detail.title }}</text>
                    <text class="desc">共{{ detail.goodsCount }}款商品</text>
                </view>
                <text class="album-look-number">{{ detail.readCount }}</text>
            </view>
            <view class="img-box"><image class="bg-image" :src="detail.banner" mode=""></image></view>
        </view>
        <view class="album-detail-goods-list"><goods-list :list="goodsData" type="public" @change="getUserBuy"></goods-list></view>

        <text class="lock-end">已经到底了</text>

        <!-- 浮动图标 -->
        <min-nav :isScroll="showTop" @change="backToTop"></min-nav>

		<!-- 购物车窗口 -->
		<block v-if="showCart"><buy-popup :show="showCart" :datas="goodInfo" @close="closeCart" @sure="addCart"></buy-popup></block>
    </view>
</template>

<script>
import goodsList from '@/components/goods-list/goods-list.vue';
import minNav from '@/components/min-nav/min-nav.vue';
import buyPopup from '@/components/buy-popup/buy-popup.vue';
export default {
    components: {
        goodsList,
        minNav,
        buyPopup
    },
    data() {
        return {
            goodsData: [],
            showCart: false,
            goodInfo: {},
            detail: {
                banner: '',
                desc: '',
                goodsCount: 0,
                readCount: 0,
                title: ''
            },
            showTop: false,

            collId: null
        };
    },
    onLoad(params) {
        this.collId = params.collId;
        this.getCollDetail(this.collId);
    },
    onShow() { },
    // onPageScroll(e) {
    //     if (e.scrollTop <= 0) {
    //         this.showTop = false;
    //     }
    //     if (e.scrollTop > 50 && !this.showTop) {
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
        async getCollDetail(collId) {
            let vm = this;
            let res = await this.$api.request({
                method: 'POST',
                url: this.$api.getCollDetail,
                data: {
                    collId: collId
                }
            });

            if (res.code == 0) {
                let _res = res.data;
                vm.detail = _res.detail;
                vm.goodsData = _res.goodsList.map(e=>{
					let goodsPrice = e.goodsInfo.goodsPrice;
					let array = goodsPrice.split('.');
					e.big = array[0];
					e.min = array[1];
					return e;
                });
            } else {
                this.$api.goNavigateTo(res.msg);
            }
        }
    }
};
</script>

<style lang="less">
.lock-end {
    margin-bottom: 160upx;
}

.album-detail-page {
    background: #f3f3f3;
}

.album-title-box {
    position: absolute;
    z-index: 2;
    left: 26upx;
    bottom: 26upx;
    font-size: 24upx;
    font-weight: 500;
    color: #ffffff;

    .title {
        font-weight: 700;
        display: block;
        font-size: 38upx;
    }

    .desc {
        display: block;
        font-size: 24upx;
        margin-top: 16upx;
    }
}

.album-look-number {
    position: absolute;
    z-index: 2;
    right: 26upx;
    bottom: 26upx;
    font-size: 24upx;
    font-weight: 500;
    color: #ffffff;
	padding-left: 35upx;
	background-image:  url('~@/static/images/public/icon_eye_white.png');
	background-position: left center;
	background-repeat: no-repeat;
	background-size:  30upx 30upx;
	
}

.album-detail-head {
    position: relative;
    overflow: hidden;
    height: 330upx;

    .img-box {
        width: 100%;
        height: 100%;
    }

    .bg-image {
        width: 100%;
        height: 100%;
    }

    .bottom-box {
        bottom: 0;
        position: absolute;
        width: 100%;
        height: 160upx;
    }

    .bottom-box-mask {
        position: absolute;
        z-index: 1;
        width: 100%;
        height: 100%;
        background: linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
        opacity: 0.5;
    }
}

.album-detail-goods-list {
    margin-top: 20upx;
    overflow: hidden;
    background: #ffffff;
}
</style>
