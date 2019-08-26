<template>
    <view class="pages album-page">
        <view class="swiper-box album-banner">
            <view class="page-section swiper">
                <swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration" indicator-active-color="#ffffff">
                    <swiper-item v-for="(topColl, topCollKey) in topCollList" :key="topCollKey" @tap="toCollDetail(topColl.collId)">
                        <view class="swiper-item album-head">
                            <view class="bottom-box">
                                <div class="bottom-box-mask"></div>
                                <view class="album-title-box">
                                    <text class="title">{{ topColl.title }}</text>
                                    <text class="desc">共{{ topColl.goodsCount }}款商品</text>
                                </view>
                                <text class="album-look-number">
									<!-- <text class="eyes"></text> -->
									{{ topColl.readCount }}
								</text>
                            </view>
                            <view class="img-box" v-if="topColl.banner"><image class="bg-image" :src="topColl.banner" mode=""></image></view>
                        </view>
                    </swiper-item>
                </swiper>
            </view>
        </view>

        <view class="album-brand">
			<view class="app-ads-list"><image class="ads-item" v-for="(item, adsKey) in ads" :key="adsKey" :src="item.img" @tap="getAds(item)" mode=""></image></view>
		</view>

        <text class="album-title">专辑推荐</text>

        <view class="album-content">
            <view class="album-list">
                <view class="album-item" v-for="(coll, collKey) in collList" :key="collKey">
                    <view class="header" :style="[{ background: coll.color }]" @tap="goAlbumDetail(coll.collId)">
                        <text class="header_text">{{ coll.title }}</text>
                        <text class="header_more">更多</text>
                        <text class="header_fb"></text>
                    </view>
                    <view class="list-box">
                        <view class="list-box_item" v-for="(goods, goodsKey) in coll.goodsList" :key="goodsKey" @tap="goGoodsDetail(goods.goodsId)">
                            <image class="img" :src="goods.thumb" mode=""></image>
                            <text class="price">￥{{ goods.price }}</text>
                        </view>
                    </view>
                    <view class="album-tag">
                        <text class="tag" v-for="(words, wordsKey) in coll.keywords" :key="wordsKey" @tap="goGoodsList(words)">{{ words }}</text>
                        <text class="tag frtag">共{{ coll.goodsCount }}款</text>
                    </view>
                </view>
            </view>
        </view>

        <text class="lock-end">已经到底了</text>

        <!-- 浮动图标 -->
        <min-nav :isScroll="showTop" @change="backToTop"></min-nav>
    </view>
</template>

<script>
import minNav from '@/components/min-nav/min-nav.vue';
export default {
    components: {
        minNav
    },
    data() {
        return {
            // 轮播配置
            indicatorDots: true,
            autoplay: true,
            interval: 5000,
            duration: 300,
            //
            showTop: false,

            // 服务器字段
            ads: [],
            collList: [],
            topCollList: []
        };
    },
    onLoad() {
        this.getCollList();
    },
    onShow() {},
    // onPageScroll(e) {
    //     let { scrollTop } = e;
    //     if (scrollTop <= 0) {
    //         this.showTop = false;
    //     }
    //     if (scrollTop > 50 && !this.showTop) {
    //         this.showTop = true;
    //     }
    // },
    methods: {
		backToTop() {
			uni.pageScrollTo({ scrollTop: 0, duration: 10 });
		},
        async getCollList() {
            let res = await this.$api.request({
                method: 'GET',
                url: this.$api.getCollList
            });
            if (res.code == 0) {
                this.ads = res.data.ads;
                this.collList = res.data.collList;
                this.topCollList = res.data.topCollList;
            }
        },
        toCollDetail(collId) {
            let url = `../colldetail/colldetail?collId=${collId}`;
            this.$api.goNavigateTo(url);
        },
        getAds(item) {
            this.$api.goNavigateTo(item.url);
        },
        goAlbumDetail(collId) {
            let url = `../colldetail/colldetail?collId=${collId}`;
            this.$api.goNavigateTo(url);
        },
        goGoodsDetail(goodsId) {
            let url = `../../goods/product/product?goodsId=${goodsId}`;
            this.$api.goNavigateTo(url);
        },
        goGoodsList(keywords) {
            let url = `../../goods/list/list?keywords=${keywords}`;
            this.$api.goNavigateTo(url);
        }
    },
    destroyed() {}
};
</script>

<style lang="less">
.album-page {
    background: #f3f3f3;
}

.album-title-box {
    position: absolute;
    z-index: 2;
    left: 26upx;
    bottom: 36upx;
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
    bottom: 36upx;
    font-size: 24upx;
    font-weight: 500;
    color: #ffffff;
	
	// .eyes{
	// 	width: 30upx;
	// 	height: 30upx;
	// 	background: url('~@/static/images/public/icon_eye_white.png') 0 -3upx no-repeat;
	// 	background-size:100%; 
	// 	display: inline-block;
	// 	vertical-align: middle;
	// 	margin-right: 14upx;
	// }
	
	padding-left: 35upx;
	background-image:  url('~@/static/images/public/icon_eye_white.png');
	background-position: left center;
	background-repeat: no-repeat;
	background-size:  30upx 30upx;
}

// 专辑样式
.album-head {
    position: relative;
    overflow: hidden;
    height: 100%;

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

.album-banner {
    position: relative;
    overflow: hidden;
    width: 718upx;
    height: 360upx;
    margin: auto;
    margin-top: 20upx;
    margin-bottom: 20upx;
    border-radius: 16upx;
    //background: #ffffff;

    .swiper {
        height: 360upx;
    }
}

.album-brand {
    // width: 702upx;
	width: 100%;
    margin: auto;
    margin-top: 20upx;
	margin-bottom: 20upx;
	// .ads-item{
	// 	width: 352upx;
	// 	height: 164upx;
	// }
}

.album-title {
    display: block;
    text-align: center;
    font-size: 28upx;
    font-weight: bold;
    // color: #889696;
    color: #2f3a40;
    line-height: 48upx;
}

.album-content {
    overflow: hidden;

    width: 702upx;
    margin: auto;
    margin-top: 20upx;
}
.album-list {
    overflow: hidden;
}

.album-item {
    position: relative;
    overflow: hidden;
    min-height: 432upx;
    background: #ffffff;
    border-radius: 20upx;
    margin-bottom: 20upx;
}

.header {
    position: relative;
    height: 78upx;
    background: #fb64b8;
    font-size: 28upx;
    font-weight: 400;

    &_fb {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 78upx;
        background: linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%);
        opacity: 0.3;
    }

    &_text {
        line-height: 78upx;
        color: #ffffff;
        font-size: 28upx;
        padding-left: 20upx;
    }

    &_more {
        color: #ffffff;
        font-size: 22upx;
        padding-right: 34upx;
        height: 40upx;
        line-height: 40upx;
        position: absolute;
        top: 50%;
        margin-top: -(78-40)/2upx;
        right: 8upx;
        background-image: url('~@/static/images/s30/icon_return2.png');
        background-position: right center;
        background-repeat: no-repeat;
        background-size: 30upx 30upx;
    }
}

.list-box {
    padding: 20upx 16upx;
    overflow: hidden;
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;

    &_item {
        width: 216upx;
        // margin-right: 10upx;
        float: left;
    }

    &_mr {
        margin-right: 0;
    }

    .img {
        width: 216upx;
        max-height: 216upx;
        padding: 8upx;
        box-sizing: border-box;
        border: 1px solid #dce4e6;
        border-radius: 4upx;
    }

    .price {
        display: block;
        width: 100%;
        text-align: center;
        font-size: 26upx;
        font-weight: 400;
        color: #ff3366;
    }
}

.album-tag {
    margin: 0 16upx;
    margin-bottom: 30upx;
    font-size: 24upx;

    .tag {
        display: inline-block;
        font-size: 24upx;
        font-weight: 400;
        color: #b2b2b2;
        padding: 6upx 8upx;
        border: 1px solid #dce4e6;
        border-radius: 4upx;
        margin-right: 20upx;
        margin-bottom: 10upx;
    }

    .frtag {
        float: right;
        border: 1px solid transparent;
        margin: 0;
    }
}

</style>
