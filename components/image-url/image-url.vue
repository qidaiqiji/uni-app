<template>
    <view class="image-url">
        <image class="image-url-item" v-for="(it,key) in getArrayData" :key="key" :src="it.img" @tap="tap(it)" mode=""></image>
    </view>
</template>

<script>
    export default {
        props: {
            arrayData: {
                default: []
            },
            height:{
                default: '164upx'
            }
        },
        data() {
            return {
                defaultInfo: {
                    data: []
                }
            };
        },
        computed: {
            getArrayData() {
                return this.arrayData || this.defaultInfo.data
            },
            getMr(o) {
                return function(o) {
                    return (o + 1) % 2 === 0
                }
            }
        },
        methods: {
            tap(key) {
                this.$emit("change", key);
            }
        }
    }
</script>

<style lang="less" scoped="scoped">
    .image-url {
        overflow: hidden;
        margin: auto;
        width: 702upx;
        display: flex;
        flex-wrap: wrap
    }

    .image-url-item {
        width: 342upx;
        height: 188upx;
        // width: 352upx;
        // height: 164upx;
        float: left;
        margin-right: 17upx;
        margin-bottom: 20upx;
        position: relative;
        overflow: hidden;
        border-radius: 10upx;

        &:nth-child(2n+2) {
            margin-right: 0;
            float: right;
        }
    }

    .image-url-mr {
        margin-right: 0;
    }
</style>
