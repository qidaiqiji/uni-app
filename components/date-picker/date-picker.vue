<template>
    <view class="w-picker">
        <div class="mask" :class="{ show: showPicker }" @tap="maskTap" catchtouchmove="true"></div>
        <view class="w-picker-cnt" :class="{ show: showPicker }">
            <view class="w-picker-hd" catchtouchmove="true">
                <view class="w-picker-btn" @tap="pickerCancel">取消</view>
                <view class="w-picker-btn" :style="{ color: themeColor }" @tap="pickerConfirm">确定</view>
            </view>
            <view class="w-picker-view" v-if="mode == 'date' || mode == 'dateTime' || mode == 'yearMonth'">
                <picker-view indicator-style="height: 40px;" :value="pickVal" @change="bindChange">
                    <picker-view-column>
                        <view class="item" v-for="(item, index) in data.years" :key="index">{{ item }}年</view>
                    </picker-view-column>
                    <picker-view-column>
                        <view class="item" v-for="(item, index) in data.months" :key="index">{{ item }}月</view>
                    </picker-view-column>
                    <picker-view-column v-if="mode != 'yearMonth'">
                        <view class="item" v-for="(item, index) in data.days" :key="index">{{ item }}日</view>
                    </picker-view-column>
                    <picker-view-column v-if="mode == 'dateTime'">
                        <view class="item" v-for="(item, index) in data.hours" :key="index">{{ item }}</view>
                    </picker-view-column>
                    <picker-view-column v-if="mode == 'dateTime'">
                        <view class="item" v-for="(item, index) in data.minutes" :key="index">{{ item }}</view>
                    </picker-view-column>
                </picker-view>
            </view>
            <view class="w-picker-view" v-if="mode == 'time'">
                <picker-view indicator-style="height: 40px;" :value="pickVal" @change="bindChange">
                    <picker-view-column>
                        <view class="item" v-for="(item, index) in data.hours" :key="index">{{ item }}</view>
                    </picker-view-column>
                    <picker-view-column>
                        <view class="item" v-for="(item, index) in data.minutes" :key="index">{{ item }}</view>
                    </picker-view-column>
                </picker-view>
            </view>
            <view class="w-picker-view" v-if="mode == 'region'">
                <picker-view indicator-style="height: 40px;" :value="pickVal" @change="bindChange">
                    <picker-view-column>
                        <view class="item" v-for="(item, index) in data.provinces" :key="index">{{ item.label }}</view>
                    </picker-view-column>
                    <picker-view-column>
                        <view class="item" v-for="(item, index) in data.citys" :key="index">{{ item.label }}</view>
                    </picker-view-column>
                    <picker-view-column>
                        <view class="item" v-for="(item, index) in data.areas" :key="index">{{ item.label }}</view>
                    </picker-view-column>
                </picker-view>
            </view>
        </view>
    </view>
</template>

<script>
// 使用方式
// let type = [
//     {
//         mode: 'date',
//         name: '日期选择',
//         value: [0, 0, 0]
//     },
//     {
//         mode: 'yearMonth',
//         name: '年月',
//         value: [0, 1]
//     },
//     {
//         mode: 'dateTime',
//         name: '日期时间选择',
//         value: [0, 1, 0, 1, 0]
//     },
//     {
//         mode: 'time',
//         name: '时间选择',
//         value: [1, 1]
//     },
//     {
//         mode: 'region',
//         name: '省市区',
//         value: [10, 0, 5]
//     }
// ];
import { initPicker, initDays } from '@/common/util.js';
export default {
    data() {
        return {
            result: [],
            data: {},
            checkArr: [],
            checkValue: [],
            pickVal: [],
            showPicker: false
        };
    },
    computed: {},
    props: {
        mode: {
            type: String,
            default() {
                return 'date';
            }
        },
        themeColor: {
            type: String,
            default() {
                return '#f00';
            }
        },
        startYear: {
            type: String,
            default() {
                return '1970';
            }
        },
        endYear: {
            type: String,
            default() {
                return new Date().getFullYear() + '';
            }
        },
        defaultVal: {
            type: Array,
            default() {
                return [0, 0, 0, 0, 0];
            }
        }
    },
    watch: {
        mode() {
            this.initData();
        }
    },
    methods: {
        maskTap() {
            this.showPicker = false;
        },
        show() {
            this.showPicker = true;
        },
        hide() {
            this.showPicker = false;
        },
        pickerCancel() {
            this.$emit('cancel', {
                checkArr: this.checkArr,
                defaultVal: this.pickVal
            });
            this.showPicker = false;
        },
        pickerConfirm(e) {
            this.$emit('confirm', {
                checkArr: this.checkArr,
                defaultVal: this.pickVal
            });
            this.showPicker = false;
        },
        bindChange(val) {
            let arr = val.detail.value;
            let year = '',
                month = '',
                day = '',
                hour = '',
                minute = '',
                province,
                city,
                area;
            let checkArr = this.checkArr;
            let days = [];
            let mode = this.mode;
            switch (mode) {
                case 'date':
                    year = this.data.years[arr[0]];
                    month = this.data.months[arr[1]];
                    day = this.data.days[arr[2]];
                    if (year != checkArr[0]) {
                        days = initDays(year, month);
                        this.data.days = days;
                    }
                    if (month != checkArr[1]) {
                        days = initDays(year, month);
                        this.data.days = days;
                    }
                    this.checkArr = [year, month, day];
                    break;
                case 'yearMonth':
                    year = this.data.years[arr[0]];
                    month = this.data.months[arr[1]];
                    this.checkArr = [year, month];
                    break;
                case 'dateTime':
                    year = this.data.years[arr[0]];
                    month = this.data.months[arr[1]];
                    day = this.data.days[arr[2]];
                    hour = this.data.hours[arr[3]];
                    minute = this.data.minutes[arr[4]];
                    if (year != checkArr[0]) {
                        days = initDays(year, month);
                        this.data.days = days;
                    }
                    if (month != checkArr[1]) {
                        days = initDays(year, month);
                        this.data.days = days;
                    }
                    this.checkArr = [year, month, day, hour, minute];
                    break;
                case 'time':
                    hour = this.data.hours[arr[0]];
                    minute = this.data.minutes[arr[1]];
                    this.checkArr = [hour, minute];
                    break;
            }
            this.pickVal = arr;
        },
        initData() {
            let data = {};
            let mode = this.mode;
            let year, month, day, hour, minute, province, city, area;
            data = initPicker(this.startYear, this.endYear, this.mode);
            this.data = data;
            this.pickVal = this.defaultVal;
            switch (mode) {
                case 'date':
                    year = data.years[this.defaultVal[0]];
                    month = data.months[this.defaultVal[1]];
                    day = data.days[this.defaultVal[2]];
                    this.checkArr = [year, month, day];
                    break;
                case 'yearMonth':
                    year = data.years[this.defaultVal[0]];
                    month = data.months[this.defaultVal[1]];
                    this.checkArr = [year, month];
                    break;
                case 'dateTime':
                    year = data.years[this.defaultVal[0]];
                    month = data.months[this.defaultVal[1]];
                    day = data.days[this.defaultVal[2]];
                    hour = data.hours[this.defaultVal[3]];
                    minute = data.minutes[this.defaultVal[4]];
                    this.checkArr = [year, month, day, hour, minute];
                    break;
                case 'time':
                    hour = data.hours[this.defaultVal[0]];
                    minute = data.minutes[this.defaultVal[1]];
                    this.checkArr = [hour, minute];
                    break;
            }
        }
    },
    mounted() {
        this.initData();
    }
};
</script>

<style lang="less">
.w-picker {
    .mask {
        position: fixed;
        z-index: 1000;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.6);
        visibility: hidden;
        opacity: 0;
        transition: all 0.3s ease;
    }
    .mask.show {
        visibility: visible;
        opacity: 1;
    }
    .w-picker-cnt {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        transition: all 0.3s ease;
        transform: translateY(100%);
        z-index: 3000;
    }
    .w-picker-cnt.show {
        transform: translateY(0);
    }
    .w-picker-hd {
        display: flex;
        align-items: center;
        padding: 0 30upx;
        height: 88upx;
        background-color: #fff;
        position: relative;
        text-align: center;
        font-size: 17px;
        justify-content: space-between;
        .w-picker-btn {
            font-size: 30upx;
        }
    }

    .w-picker-hd:after {
        content: ' ';
        position: absolute;
        left: 0;
        bottom: 0;
        right: 0;
        height: 1px;
        border-bottom: 1px solid #e5e5e5;
        color: #e5e5e5;
        transform-origin: 0 100%;
        transform: scaleY(0.5);
    }
    .item {
        text-align: center;
        line-height: 40px;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 16px;
    }
    .w-picker-view {
        width: 100%;
        height: 238px;
        overflow: hidden;
        background-color: rgba(255, 255, 255, 1);
        z-index: 666;
    }
    picker-view {
        height: 100%;
    }
}
</style>
