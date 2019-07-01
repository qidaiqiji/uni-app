<template>
    <view class="modal">
        <view class="modal-mask transition" :class="{ show: show }"></view>
        <view class="modal-body transition" :class="{ show: show }">
            <view class="modal-body-head"><text class="text">{{title}}</text></view>
            <view class="modal-body-content"><slot name="body"></slot></view>
            <view class="modal-foot-botton" @tap="close"><text class="text">确定</text></view>
        </view>
    </view>
</template>

<script>
export default {
    props: {
        show: {
            type: Boolean,
            default: false
        },
        title:{
            default: '提示'
        }
    },
    data() {
        return {};
    },
    methods: {
        close() {
            this.$emit('close', 'close');
        }
    }
};
</script>

<style lang="less" scoped>
.modal {
    width: 100%;
}

.transition {
    //-webkit-transition: all 0.3s ease;
    //-o-transition: all 0.3s ease;
    //transition: all 0.3s ease;
}

.modal-mask {
    position: fixed;
    z-index: 998;
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

.modal-body {
    width: 600upx;
    min-height: 100upx;
    //max-height: 600upx;

    background: #ffffff;
    overflow: hidden;

    position: fixed;
    z-index: 1000;
    border-radius: 20upx 20upx 20upx 20upx;
    top: 50%;
    left: 50%;
    //-webkit-transform: translate(-50%, 150%);
    //-ms-transform: translate(-50%, 150%);
    //transform: translate(-50%, 150%);
    transform: translate(-50%, -50%);

    visibility: hidden;
    opacity: 0;

    &.show {
        visibility: visible;
        opacity: 1;
        //transform: translate(-50%, -50%);
    }
}

.modal-body-head {
    position: relative;
    width: 100%;
    height: 100upx;
    text-align: center;

    .text {
        font-size: 32upx;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: rgba(103, 113, 114, 1);

        width: 100%;
        text-align: center;

        position: absolute;
        top: 50%;
        left: 0;
        -webkit-transform: translate(0, -50%);
        -ms-transform: translate(0, -50%);
        transform: translate(0, -50%);
    }
}

.modal-body-content {
    min-height: 190upx;
    max-height: 560upx;
    padding: 0 40upx;
}

.modal-foot-botton {
    position: relative;
    width: 100%;
    height: 88upx;
    text-align: center;
    background: #ff3366;
    font-size: 32upx;

    .text {
        color: #ffffff;

        width: 100%;
        text-align: center;

        position: absolute;
        top: 50%;
        left: 0;
        -webkit-transform: translate(0, -50%);
        -ms-transform: translate(0, -50%);
        transform: translate(0, -50%);
    }
}
</style>
