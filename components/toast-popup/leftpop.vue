<template>
	<view class="left left-popup">
		<div class="left-mask" :class="[show ? 'show' : '']" @tap="close()" @touchmove.stop.prevent="moveHandle"></div>
		<view class="left-body" :class="[show ? 'show' : '']" :style="{ height: lbodyHeight + 'px' }">
			<view class="head">
				<text class="text">{{ title }}</text>
				<text class="desc">
					{{ getDesc }}
					<slot name="desc"></slot>
				</text>
			</view>
			<view class="bodyer" :style="{ height: bodyHeight + 'px' }">
				<scroll-view class="scroll-body" scroll-y="true">
					{{ contentText }}
					<slot></slot>
				</scroll-view>
			</view>
			<view class="pop-left_botton">
				<text class="sameBtn reset" @tap="close(1)">重置</text>
				<text class="sameBtn" @tap="sure()">{{ bottonText }}</text>
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
			showPicker: false, //是否显示控件
			bodyHeight: 0,
			lbodyHeight: 600
		};
	},
	computed: {
		getDesc() {
			return this.desc;
		}
	},
	created() {
		let res = uni.getSystemInfoSync();
		let bodyerHeight = res.windowHeight - uni.upx2px(80) - uni.upx2px(98);
		this.lbodyHeight = res.windowHeight;
		this.bodyHeight = bodyerHeight;
	},
	methods: {
		close(value) {
			this.showPicker = false;
			this.$emit('close', value);
		},
		sure() {
			this.showPicker = false;
			this.$emit('sure', true);
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

<style lang="less" scoped="scoped">
@import './leftpop.less';
</style>
