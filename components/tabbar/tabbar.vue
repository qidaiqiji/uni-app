<template>
	<view class="my-tabs" :class="{ 'border': getBorder, 'space-between': formatBe, jfdetail: getjfdetail }">
		<view v-for="(item, index) in getModelData" :key="index" :class="{ 'tab-item': true, active: activeIndex == index }" @tap="tap(index)">{{ item.label }}</view>
	</view>
</template>

<script>
export default {
	name: 'tabbar',
	props: {
		modelData: {
			type: Array,
			default() {
				return [];
			}
		},
		initIndex: {
			type: Number,
			default: 0
		},
		jfdetail: {
			type: Boolean,
			default: true
		},
		oborder: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			defaultInfo: {
				data: [
					{
						label: '测试'
					},
					{
						label: '测试'
					},
					{
						label: '测试'
					}
				]
			},
			activeIndex: 0 //默认索引
		};
	},
	computed: {
		getModelData() {
			return this.modelData || this.defaultInfo.data;
		},
		formatBe() {
			return this.modelData ? (this.modelData.length > 4 ? true : false) : false;
		},
		getjfdetail() {
			return this.jfdetail ? true : false;
		},
		getBorder() {
			return this.oborder;
		}
	},
	methods: {
		tap(index) {
			if (index !== this.activeIndex) this.$emit('change', index);
			this.activeIndex = index;
		},
		/**
		 * @name 初始化activeIndex
		 */
		initActive() {
			this.activeIndex = this.initIndex || this.activeIndex;
		}
	},
	created() {
		this.initActive();
	}
};
</script>
<style lang="less">
@bcolor1: #3682ff;
@bcolor2: #ff3366;
.my-tabs {
	height: 88upx;
	font-size: 28upx;
	display: flex;
	justify-content: space-around;
	box-sizing: border-box;
	min-width: 100%;
	overflow-x: auto;
	background: #ffffff;

	&.border {
		// border-top: 1px solid #dddddd;
		border-bottom: 1px solid #dddddd;
	}

	.tab-item {
		line-height: 48upx;
		padding: 20upx;
		min-width: 100upx;
		text-align: center;
	}

	.tab-item.active {
		position: relative;
		color: @bcolor2;
	}

	.tab-item.active::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 100%;
		border-bottom: 4upx solid @bcolor2;
		// animation: test ease 1 0.5s;
	}
}

.my-tabs.space-between {
	justify-content: space-between;
}

@keyframes test {
	0% {
		width: 100%;
	}

	50% {
		width: 75%;
	}

	100% {
		width: 100%;
	}
}

@keyframes test2 {
	0% {
		width: 15%;
	}

	50% {
		width: 75%;
	}

	100% {
		width: 25%;
	}
}

.jfdetail .tab-item.active {
	&:after {
		width: 25%;
		border-bottom: 2px solid #ff3366;
		// animation: test2 ease 1 0.5s;
	}

	color: #ff3366;
}
</style>
