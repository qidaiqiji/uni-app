<template>
	<view class="wuliu">
		<view class="wuliuCon" v-if="!wuliuNoData&&wuliuInfo&&wuliuInfo.shippingSn">
			<view class="orderNum">
				<view class="left">单号：</view>
				<view class="right">
					<text>物流跟踪</text>
					<text class="icon"></text>
				</view>
			</view>
			<view class="wuliuShow">
				<view class="state">
					<text class="leftText">物流状态</text>
					<text class="detial type">{{ wuliuInfo.status }}</text>
				</view>
				<view class="state">
					<text class="leftText">物流公司</text>
					<text class="detial">{{ wuliuInfo.shippingName }}</text>
				</view>
				<view class="state">
					<text class="leftText">物流单号</text>
					<text class="detial">{{ wuliuInfo.shippingSn }}</text>
				</view>
				<view class="pro">
					<view class="imgCon">
						<scroll-view class="scroll-view_H" scroll-x="true">
							<view class="imgList" v-for="(item, index) in 5" :key="index">
								<image class="img" :src="item.thumb" mode=""></image>
								<text class="imgTips">{{ item.number }}件</text>
							</view>
						</scroll-view>
					</view>
				</view>
			</view>
			<view class="wuliuDetial">
				<view class="head">物流跟踪</view>
				<view class="wuliuText" v-for="(item, index) in wuliuArr" :key="index">
					<view class="left">
						<view class="circle" :class="{ activeCircle: index == 0 }"></view>
						<view class="line"></view>
					</view>
					<view class="right">
						<view class="text" :class="{ activeColor: index == 0 }">{{ item.info }}</view>
						<view class="time">{{ item.time }}</view>
					</view>
				</view>
			</view>
			<view class="orderCon">
				<view class="orderNum" v-for="(item, index) in 2" :key="index">
					<view class="left">单号：2536632</view>
					<view class="right">
						<text>物流跟踪</text>
						<text class="icon"></text>
					</view>
				</view>
			</view>
		</view>

		<view class="noData" v-if="wuliuNoData">
			<image class="img" src="../../static/images/wuliu/no-data.png" alt=""></image>
			<view class="tip">暂无相关物流信息，稍后及时更新</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			wuliuNoData: false,
			wuliuInfo: {},
			wuliuArr: [],
			proListArr: [],
			deliveryId: '' //'ZD201905090509'
		};
	},
	onLoad(params) {
		let { deliveryId } = params;
		this.deliveryId = deliveryId;
		this.getWuliu();
	},
	onShow() {},
	methods: {
		// 物流列表
		getWuliu() {
			let vm = this;
			this.$http({
				method: 'GET',
				url: `${this.$api.orderGroup_wuliu}?deliveryId=${this.deliveryId}`,
				success: res => {
					if (res.code == 0) {
						let _data = res.data;
						this.wuliuInfo = _data;
						this.wuliuArr = _data.shippingInfoList;
						this.proListArr = _data.goodsList;
					} else {
					}
				}
			});
			// let getUrl = encodeURIComponent(`${this.$api.orderGroup_wuliu}?deliveryId='ZD201905090509'`);
			// uni.request({
			//     method: 'GET',
			//     url: `${this.$api.Get}?url=${getUrl}`,
			//     data: {},
			//     header: {},
			//     success: res => {
			//         if (res.statusCode === 200) {
			//             // if(res.data.data.length>0){
			//             // this.wuliuNoData=false;
			//             this.wuliuInfo = res.data.data;
			//             let _data = res.data.data;
			//             this.wuliuArr = _data.shippingInfoList;
			//             this.proListArr = _data.goodsList;
			//             // }else{
			//             // this.wuliuNoData=true;
			//             // }
			//         } else {
			//         }
			//     }
			// });
		}
	}
};
</script>

<style lang="less">
@import url('./wuliu.less');
</style>
