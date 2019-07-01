<template>
	<view class="descDate">{{ date }}</view>
</template>

<script>
export default {
	props: {
		time: {
			isRequired: true
		}
	},
	computed: {
		date: function() {
			return this.time.slice(0, 10);
		}
	}
};
</script>

<style>
.descDate {
	color: #b2b2b2;
	font-size: 24upx;
	display: block;
	margin-top: 15upx;
}
</style>
