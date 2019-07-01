<template>
	<view @tap="goDetail">
		<view class="secCon">{{ content }}</view>
		<view class="more" v-if="showMore">全文</view>
	</view>
</template>

<script>
export default {
	props: {
		listInfo: {
			isRequired: true
		}
	},
	methods: {
		goDetail() {
			let that = this;
			uni.setStorage({
				key: 'findDetailInfo',
				data: this.listInfo,
				success: function() {
					that.$api.goNavigateTo('/pages/found/detail');
				}
			});
		}
	},
	computed: {
		content: function() {
			let maxLength = 118;
			return this.listInfo.title
				.split('')
				.map(char => {
					if (maxLength <= 0) return '';
					const code = char.charCodeAt(0);
					maxLength = maxLength - 2 + Number(code >= 0 && code <= 128);
					if (maxLength <= 0) {
						char += '...';
					}
					return char;
				})
				.join('');
		},
		showMore: function() {
			let maxLength = 118;
			let showMore = false;
			this.listInfo.title
				.split('')
				.map(char => {
					if (maxLength <= 0) return '';
					const code = char.charCodeAt(0);
					maxLength = maxLength - 2 + Number(code >= 0 && code <= 128);
					if (maxLength <= 0) {
						char += '...';
						showMore = true;
					}
				})
				.join('');
			return showMore;
		}
	}
};
</script>

<style>
.secCon {
	color: #2f3a40;
	font-size: 32upx;
	margin: 28upx 0 0 0;
}
.more {
	font-size: 32upx;
	color: #ff5882;
}
</style>
