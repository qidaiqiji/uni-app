<template>
    <view class="confirm-view">
        <view class="transition confirm-view-mask" :class="{ show: show }"></view>
        <view class="transition confirm-view-body" :class="{ show: show }">
            <view class="head">{{ title }}</view>
            <!-- 支持插槽显示 -->
            <view class="body">
                {{message}}
                <slot></slot>
            </view>
            <view class="foot">
                <view class="foot-btn cancle" @tap="cancle">取消</view>
                <view class="foot-btn sure" @tap="sure">确定</view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: '提示'
        },
        message:{
            type: String,
            default: ''
        },
        oneBtn: {
            type: Boolean,
            default: false
        },
        show: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {};
    },
    methods: {
        // 统一触发一个方法,true执行处理逻辑,false关闭确认框
        cancle(){
            this.$emit('sure', false);
        },
        sure() {
            this.$emit('sure', true);
        }
    }
};
</script>

<style lang="less" scoped>
.transition {
    -webkit-transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
    transition: all 0.3s ease;
}
.confirm-view {
}
.confirm-view-mask {
    position: fixed;
    z-index: 68;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);

    visibility: hidden;
    opacity: 0;

    &.show {
        visibility: visible;
        opacity: 1;
    }
}
.confirm-view-body {
    width: 600upx;
    background: #ffffff;
    overflow: hidden;
    position: fixed;
    z-index: 69;
    border-radius: 20upx 20upx 20upx 20upx;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, 150%);
    -ms-transform: translate(-50%, 150%);
    transform: translate(-50%, 150%);
    transform: translate(-50%, -50%);

    visibility: hidden;
    opacity: 0;

    &.show {
        visibility: visible;
        opacity: 1;
        transform: translate(-50%, -50%);
    }
}
.confirm-view-body .head {
    // height: 100upx;
    // line-height: 100upx;
    text-align: center;
    font-size: 32upx;
    color: #677172;
    padding-top: 46upx;
}

.confirm-view-body .body {
    min-height: 190upx;
    font-size: 28upx;
    color: #2f3a40;
    padding: 0 20upx;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
}

.confirm-view-body .foot {
    display: flex;
    height: 88upx;
    border-top: 1px solid rgba(220, 228, 230, 1);
}

.foot-btn {
    width: 50%;
    height: 88upx;
    line-height: 88upx;
    text-align: center;
    font-size: 32upx;
}

.one-btn {
    width: 100%;
}

.cancle {
    color: #889696;
     border-right: 1px solid rgba(220, 228, 230, 1);
}

.sure {
    color: #ff3366;
}
</style>
