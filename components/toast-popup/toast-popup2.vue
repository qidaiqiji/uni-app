<template>
	<view class="toast toast-popup">
		<div class="toast-mask" :class="[show ? 'show' : '']" @tap="close()" @touchmove.stop.prevent="moveHandle"></div>
		<view class="toast-body" :class="[show ? 'show' : '']">
			<view class="head">
				<text class="text">{{ title }}</text>
				<text class="desc">
					{{ getDesc }}
					<slot name="desc"></slot>
				</text>
			</view>
			<view class="bodyer" :style="{ width: width ? '100%' : '' }">
				<scroll-view class="scroll-body" scroll-y="true">
					{{ contentText }}
					<slot></slot>
				</scroll-view>
			</view>
			<view v-if="!hideButton" class="toast_botton" @tap="close()">
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
		},
		hideButton: {
			type: Boolean,
			default: false
		},
		width: {
			type: Boolean,
			default: false
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
		},
		moveHandle() {}
	}
};
</script>

<style lang="less">
@import './toast-popup.less';
</style>
