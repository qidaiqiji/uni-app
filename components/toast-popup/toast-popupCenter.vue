<template>
    <view class="toast toast-popup">
        <div class="toast-mask" :class="[show?'show':'']" @tap="close()"></div>
        <view class="toast-body" :class="[show?'show':'']">
            <view class="head">
                <text class="text">{{ title }}</text>
                <text class="desc">
                    {{ getDesc }}
                    <slot name="desc"></slot>
                </text>
            </view>
            <view class="bodyer">
                <scroll-view class="scroll-body" scroll-y="true">
                    {{ contentText }}
                    <slot></slot>
                </scroll-view>
            </view>
            <view class="toast_botton" @tap="close()">
                <text class="text">{{ bottonText }}</text>
            </view>
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
        title: {
            default: '活动规则'
        },
        desc: {
            default: ''
        },
        bottonText: {
            type: String,
            default: '确定'
        },
        contentText: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            showPicker: false //是否显示控件
        };
    },
    computed: {
        getDesc() {
            return this.desc;
        }
    },
    methods: {
        close() {
            this.showPicker = false;
            this.$emit('close', true);
        },
        zoomIn() {
            setTimeout(() => {
                this.showPicker = true;
            }, 0);
        }
    }
};
</script>

<style lang="less" scoped>
@import './toastCenter.less';
.bodyer{
	padding: 0!important;
	height: 472upx !important;
	background: #fff;
	width: 600upx!important;
}
.toast-body{
	width: 600upx;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	height: 472upx !important;
	margin:auto;
	border-radius: 20upx;
	background: #fff;
}
.toast .head {
	height: 100upx;
	line-height: 100upx;
}
.toast .head .text{
	font-size: 30upx;
	color: #677172;
}
.toast_botton{
	border-radius:0px 0px 20px 20px;
	// margin-bottom: -160upx;
}
.toast-body.show{
	opacity: 1;
}
.toast-body{
	opacity: 0;
}
</style>
