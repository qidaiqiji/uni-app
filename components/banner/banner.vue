<template>
    <view class="swiper-box" :style="{ height: height }">
        <view class="page-section-spacing">
            <swiper
                class="swiper"
                :style="{ height: height }"
                :indicator-dots="true"
                :autoplay="true"
                :interval="5000"
                :duration="500"
                :indicator-active-color="aColor"
                :circular="true"
            >
                <swiper-item v-for="(banner, bannerKey) in getList" :key="bannerKey" @tap="tap(banner.url)">
                    <view class="swiper-item"><image class="image" :style="imageSt" :src="banner.img" mode=""></image></view>
                </swiper-item>
            </swiper>
        </view>
    </view>
</template>

<script>
export default {
    props: {
        // 数据列表
        list: {
        },
        // 模型高度
        height: {
            default: '360upx'
        },
        // 图片样式
        imageSt: {
            default: ''
        }
    },
    data() {
        return {
            indicatorDots: true,
            autoplay: true,
            interval: 3000,
            duration: 500,
            aColor: '#fff',
			defaultList: [],
        };
    },
    computed: {
		getList(){
			return this.list?this.list:this.defaultList;
		}
	},
    methods: {
        tap(url) {
            this.$emit('click', url);
        }
    }
};
</script>

<style lang="less">
.swiper-box {
    position: relative;
    width: 100%;
}
.page-section-spacing {
    position: relative;
    width: 100%;
    text-align: center;
}
.swiper {
    .swiper-item {
        height: 100%;
    }
    .image {
        margin: auto;
		width: 100%;
        max-height: 100%;
        position: relative;
        // width: 702upx;
        // height: 314upx;
        // border-radius: 20upx;
    }
}
</style>
