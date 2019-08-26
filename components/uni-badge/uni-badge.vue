<template>
	<text class="uni-badge" v-if="text && text > 0" :class="setClass">{{ getText }}</text>
</template>

<script>
export default {
	name: 'uni-badge',
	props: {
		type: {
			type: String,
			default: 'default'
		},
		inverted: {
			type: Boolean,
			default: false
		},
		text: {
			default: ''
		},
		size: {
			//small.normal
			type: String,
			default: 'normal'
		},
		styles: {
			type: String,
			default: ''
		},
		ntype: {
			type: String,
			default: ''
		}
	},
	computed: {
		setClass() {
			let classList = ['uni-badge-' + this.type, 'uni-badge--' + this.size];
			if (this.inverted === true) {
				classList.push('uni-badge-inverted');
			}
			if (this.styles) {
				classList.push(this.styles);
			}
			return classList.join(' ');
		},
		getText() {
			let _show = this.ntype ? '99+' : '...';
			return this.text > 100 ? _show : this.text;
		}
	},
	methods: {
		onClick() {
			this.$emit('click');
		}
	}
};
</script>

<style lang="less" scoped="scoped">
@import url('../../uni.less');
@bage-size: 12px;
@bage-small: scale(0.8);

.uni-badge {
	z-index: 5;
	position: absolute;
	right: -10upx;
	font-family: 'Microsoft YaHei', 'Helvetica Neue', Helvetica, sans-serif;
	box-sizing: border-box;
	font-size: @bage-size;
	line-height: 1;
	display: inline-block;
	padding: 3px 6px;
	color: @uni-text-color;
	border-radius: 100px;
	background-color: @uni-bg-color-hover;

	&.carts {
		top: 4upx;
	}

	&.mine {
		top: -7upx;
	}

	&.pros {
		right: -14upx;
		top: 1px;
	}

	&.uni-badge-inverted {
		padding: 0 5px 0 0;
		color: @uni-text-color-grey;
		background-color: transparent;
	}

	&-primary {
		color: @uni-text-color-inverse;
		background-color: @uni-color-primary;

		&.uni-badge-inverted {
			color: @uni-color-primary;
			background-color: transparent;
		}
	}

	&-success {
		color: @uni-text-color-inverse;
		background-color: @uni-color-success;

		&.uni-badge-inverted {
			color: @uni-color-success;
			background-color: transparent;
		}
	}

	&-warning {
		color: @uni-text-color-inverse;
		background-color: @uni-color-warning;

		&.uni-badge-inverted {
			color: @uni-color-warning;
			background-color: transparent;
		}
	}

	&-error {
		color: @uni-text-color-inverse;
		background-color: @uni-color-error;

		&.uni-badge-inverted {
			color: @uni-color-error;
			background-color: transparent;
		}
	}

	&--small {
		transform: @bage-small;
		transform-origin: center center;
	}
}
</style>
