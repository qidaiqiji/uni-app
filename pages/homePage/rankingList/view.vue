<template>
    <view class="pages rank-detail-page">
        <!-- <view class="" v-show="showView"> -->
            <!-- 商品介绍 -->
            <view class="content" :class="[showView?'show':'']">
                <view class="head"><image class="image" :src="img" mode="" ></image></view>
                <view class="body">
                    <text class="title">{{ desc }}</text>
                    <view class="child" v-for="(item, index) in topList" :key="index">
                        <view class="image-box">
                            <view class="goods-image" @tap="go_goodsDetail(item.goodsInfo.goodsId)">
                                <text class="fl_icon" :class="'fl_icon' + index"></text>
                                <image class="image" :src="item.img" mode=""></image>
                            </view>
                            <view class="icon_user_buy" @tap="getUserBuy(item.goodsInfo)">
                                <image class="img" src="../../../static/images/s44/category_shopping.png" mode="" ></image>
                            </view>
                        </view>
                        <text class="goods-title">{{ item.title }}</text>
                        <text class="goods-text">{{ item.desc }}</text>
                    </view>
                </view>
                <!-- 商品列表 -->
                <view class="list">
                    <goods-list :list="goodsData" type="public" @change="getUserBuy"></goods-list>
                </view>
            </view>
            <!-- 已经到底了 -->
            <text class="lock-end" v-if="goodsData.length>0">已经到底了</text>
            <!-- 浮动图标 -->
            <min-nav :isScroll="showTop" @change="backToTop"></min-nav>
            
            <!-- 购物车窗口 -->
            <block v-if="showCart"><buy-popup :show="showCart" :datas="goodInfo" @close="closeCart" @sure="addCart"></buy-popup></block>
        <!-- </view> -->
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
            showView: false,
            img: '',
            desc: '',
            topList: [],
            goodsData: [],
            showTop: false,
            showCart: false,
            goodInfo: {},
            id: ''
        };
    },
    onLoad(params) {
        if (params.id) {
            this.id = params.id;
        }
        this.getRankingView(this.id);
    },
    onShow() { },
    onPageScroll(event) {
        let { scrollTop } = event;
		// 返回顶部
		if(scrollTop>500&&!this.showTop){
			this.showTop = true;
		}else if(scrollTop<500&&this.showTop){
			this.showTop = false;
		}
    },
    methods: {
		backToTop() {
			uni.pageScrollTo({ scrollTop: 0, duration: 10 });
		},
        async addCart(data) {
            let that = this;
            let res = await this.$api.request({
                method: 'POST',
                header: true,
                url: this.$api.cartAdd,
                data: data
            });
            if (res && res.data) {
                that.$store.commit('updateCart', res.data.totalCount);
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
        async getRankingView(id) {
            let that = this;
            let res = await this.$api.request({
                url: `${this.$api.paihangView}?id=${id}`
            });
            if (res && res.code == 0) {
                let data = res.data;
                that.img = data.img;
                that.desc = data.desc;
                that.topList = data.topList;
                that.goodsData = data.goodsList.map(e => {
					let goodsPrice = e.goodsInfo.goodsPrice;
					let array = goodsPrice.split('.');
					e.big = array[0];
					e.min = array[1];
					return e;
				});;
            }
            that.showView = true;
        },
        go_goodsDetail(goodsId){
            this.$api.goNavigateTo(`../../goods/product/product?goodsId=${goodsId}`);
        }
    }
};
</script>

<style lang="less">
.body {
    width: 702upx;
    margin: auto;
    margin-top: 40upx;
    font-size: 28upx;
    font-weight: 500;
    color: #2f3a40;

    .title {
        display: block;
        font-size: 28upx;
        color: #2f3a40;
        margin-bottom: 14upx;
    }

    .image-box{
        width: 100%;
        text-align: center;
    }

    .goods-image {
        position: relative;
        width: 506upx;
        height: 506upx;
        max-width: 100%;
        margin: auto;
        display: inline-block;

        .image {
            width: 100%;
            height: 506upx;
        }
    }

    .goods-title {
        display: block;
        width: 100%;
        text-align: center;
        font-size: 28upx;
        color: #2f3a40;
        margin-top: 14upx;
    }

    .goods-text {
        display: block;
        font-size: 28upx;
        color: #889696;
        text-align: left;
        margin-top: 30upx;
        margin-bottom: 20upx;
    }

    .icon_user_buy{
        position: relative;
        display: inline-block;
		width: 60upx;
		height: 60upx;
    }
}

.content {
    background: #fff;
    visibility: hidden;

    &.show{
        visibility: visible;
    }
}

.rank-detail-page {
    overflow: hidden;
    background: #f3f3f3;

    .head {
        overflow: hidden;
        width: 100%;
        height: 240upx;

        .image {
            width: 100%;
            height: 240upx;
        }
    }

    .child {
        position: relative;
        width: 100%;
        text-align: center;
    }

    .list {
        margin-top: 20upx;
        overflow: hidden;
        background: #fff;
    }
}
</style>
