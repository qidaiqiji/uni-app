<template>
	<view class="wuliaoList">
		<view class="img-box" v-for="(item, indexG) in getGoodsList" :key="indexG">
			<image class="img" :src="item.thumb" mode=""></image>
			<view class="text">
				<view class="bg" :style="{ background: item.bgColor }"></view>
				<text class="txt">{{ item.tag }}x{{item.cartNum}}</text>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		props: ['listArray', 'type'],
		data() {
			return {};
		},
		computed: {
			getGoodsList() {
				let _array = null;
				if (this.type) {
					for (let i = 0; i < this.listArray.length; i++) {
						let val = this.listArray[i];
						if (val[this.type].length > 0) {
							_array = (val[this.type]);
							break;
						}
					}
				}
				return _array ? _array : []
			}
		},
		created() {

		}
	}
</script>

<style lang="less" scoped="scoped">
	@import './goods-image.less';
</style>
