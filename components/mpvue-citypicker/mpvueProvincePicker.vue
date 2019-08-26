<template>
    <div class="mpvue-picker">
        <div :class="{'pickerMask':showPicker}" @tap="maskClick" catchtouchmove="true"></div>
        <div class="mpvue-picker-content " :class="{'mpvue-picker-view-show':showPicker}">
            <div class="mpvue-picker__hd" catchtouchmove="true">
                <div class="mpvue-picker__action" @tap="pickerCancel">取消</div>
                <div class="mpvue-picker__action" :style="{color:themeColor}" @tap="pickerConfirm">确定</div>
            </div>
            <picker-view indicator-style="height: 40px;" class="mpvue-picker-view" :value="pickerValue" @change="pickerChange">
                <block>
                    <picker-view-column>
                        <div class="picker-item" v-for="(item,index) in provinceDataList" :key="index">{{item.label}}</div>
                    </picker-view-column>
                </block>
            </picker-view>
        </div>
    </div>
</template>

<script>
    import { initModel } from './model/citys.js';
    import indexKey from './model/citys-value.js';
    export default {
        data() {
            return {
                listModel: [],
                pickerValue: [0, 0, 0],
                provinceDataList: [],
                cityDataList: [],
                areaDataList: [],
                /* 是否显示控件 */
                showPicker: false,
            };
        },
        created() {
            this.listModel = initModel();
            this.init()
        },
        props: {
            /* 默认值 */
            pickerValueDefault: {
                type: Array,
                default () {
                    return [0, 0, 0]
                }
            },
            /* 主题色 */
            themeColor: String
        },
        watch: {
            pickerValueDefault() {
                this.init();
            }
        },
        methods: {
            // 从模型级获取
            getModelCity(index) {
                return this.listModel[index]['child'];
            },
            // 从城市级获取
            getModelArea(index) {
                return this.cityDataList[index];
            },
            init() {
                this.handPickValueDefault(); // 对 pickerValueDefault 做兼容处理
                this.provinceDataList = this.listModel;
                this.pickerValue = this.pickerValueDefault;
            },
            show() {
                setTimeout(() => {
                    this.showPicker = true;
                }, 0);
            },
            maskClick() {
                this.pickerCancel();
            },
            pickerCancel() {
                this.showPicker = false;
                this._$emit('onCancel');
            },
            pickerConfirm(e) {
                this.showPicker = false;
                this._$emit('onConfirm');
            },
            showPickerView() {
                this.showPicker = true;
            },
            handPickValueDefault() {
                let _pid = indexKey[this.pickerValueDefault[0]];
                if (_pid) {
                    this.pickerValueDefault[0] = _pid.k;
                }
            },
            pickerChange(e) {
                let changePickerValue = e.mp.detail.value;
                this.pickerValue = changePickerValue;
                this._$emit('onChange');
            },
            _$emit(emitName) {
                let pickObj = {
                    label: this._getLabel(),
                    value: this.pickerValue,
                    cityCode: this._getCityCode()
                };
                this.$emit(emitName, pickObj);
            },
            _getLabel() {
                let Prov = this.provinceDataList[this.pickerValue[0]].label;
                //let City = this.cityDataList[this.pickerValue[1]].label;
                //let _area = this.areaDataList && this.areaDataList[this.pickerValue[2]];
                //let Area = _area ? `-${_area.label}` : '';
                //let pcikerLabel = `${Prov}-${City}${Area}`;
                let pcikerLabel = Prov;
                return pcikerLabel;
            },
            _getCityCode() {
                let Prov = this.provinceDataList[this.pickerValue[0]].value;
                //let City = this.cityDataList[this.pickerValue[1]].value;
                //let _area = this.areaDataList && this.areaDataList[this.pickerValue[2]];
                //let Area = _area ? `-${_area.value}` : '';
                //let pcikerValue = `${Prov}-${City}${Area}`;
                let pcikerValue = Prov;
                return pcikerValue;
            },
            _resetArea(_area) {
                if (_area) {
                    this.areaDataList = _area['child'];
                } else {
                    this.areaDataList = [];
                }
            }
        }
    };
</script>

<style>
    .pickerMask {
        position: fixed;
        z-index: 1000;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.6);
    }

    .mpvue-picker-content {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        transition: all 0.3s ease;
        transform: translateY(100%);
        z-index: 3000;
    }

    .mpvue-picker-view-show {
        transform: translateY(0);
    }

    .mpvue-picker__hd {
        display: flex;
        padding: 9px 15px;
        background-color: #fff;
        position: relative;
        text-align: center;
        font-size: 17px;
    }

    .mpvue-picker__hd:after {
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

    .mpvue-picker__action {
        display: block;
        flex: 1;
        color: #1aad19;
    }

    .mpvue-picker__action:first-child {
        text-align: left;
        color: #888;
    }

    .mpvue-picker__action:last-child {
        text-align: right;
    }

    .picker-item {
        text-align: center;
        line-height: 40px;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 16px;
    }

    .mpvue-picker-view {
        position: relative;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 238px;
        background-color: rgba(255, 255, 255, 1);
    }
</style>
