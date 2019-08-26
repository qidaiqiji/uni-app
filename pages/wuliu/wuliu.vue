<template>
	<view class="wuliu" :style="{ 'min-height': lbodyHeight + 'px' }">
		<view class="wuliuCon" v-for="(item, index) in deliveryList" :key="index">
			<wlChild :item="item" :keyNumber="index" @change="changeShow" :child="item.showChild"></wlChild>
		</view>

		<!-- <view v-if="!wuliuNoData && wuliuInfo && wuliuInfo.shippingSn">
			<view class="orderCon">
				<view class="orderNum" v-for="(item, index) in 2" :key="index">
					<view class="left">单号：2536632</view>
					<view class="right">
						<text>物流跟踪</text>
						<text class="icon"></text>
					</view>
				</view>
			</view>
		</view> -->

		<view class="noData" v-if="wuliuNoData">
			<image class="img" src="../../static/images/wuliu/no-data.png" alt=""></image>
			<view class="tip">暂无相关物流信息，稍后及时更新</view>
		</view>
	</view>
</template>

<script>
import wlChild from './wlChild.vue';
export default {
	components: {
		wlChild
	},
	data() {
		return {
			lbodyHeight: 1206,
			wuliuNoData: false,
			wuliuInfo: {},
			wuliuArr: [],
			deliveryId: '', //'ZD201905090509'
			goodsList: [],
			shippingInfoList: [],
			//
			deliveryList: [],
			groupSn: ''
		};
	},
	onLoad(params) {
		let res = uni.getSystemInfoSync();
		this.lbodyHeight = res.windowHeight;
		let { groupSn } = params;
		// groupSn = 'ZD2019070634628';
		this.groupSn = groupSn;
		this.getShipList(groupSn);
	},
	onShow() {},
	methods: {
		async getShipList(groupSn) {
			// let res = { code: 0, msg: '成功', data: { deliveryList: [{ deliveryId: 49545, invoiceNo: '772121475' }, { deliveryId: 49546, invoiceNo: '3102594272777' }] } };
			let res = await this.$api.request({
				url: this.$api.orderGroup_shippingList,
				data: {
					groupSn: groupSn || this.groupSn
				}
			});
			console.log(JSON.stringify(res));
			if (res && res.data) {
				let { deliveryList } = res.data;
				this.deliveryList = deliveryList;
				if (deliveryList.length > 0) {
					this.wuliuNoData = false;
				} else {
					this.wuliuNoData = true;
				}
			} else {
				this.wuliuNoData = true;
			}
		},
		changeShow(index) {
			let newArray = this.deliveryList.map((item, kindex) => {
				if (kindex == index) {
					item.showChild = false;
				} else {
					item.showChild = true;
				}
				return item;
			});
			this.$set(this, 'deliveryList', newArray);
		}
	}
};
</script>

<style lang="less">
@import url('./wuliu.less');
</style>
