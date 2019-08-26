<template>
	<view class="">
		<view class="orderNum">
			<view class="left">单号：{{ item.invoiceNo }}</view>
			<view class="right" @tap="getWuliuDetail(item.deliveryId, keyNumber)">
				<text>物流跟踪</text>
				<text class="icon"></text>
			</view>
		</view>
		<view class="deliveryId" v-show="show && !child">
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
				<view class="wuliu_pro">
					<view class="imgCon">
						<scroll-view class="scroll-view_H" scroll-x="true">
							<view class="imgList" v-for="(item, thumbKey) in goodsList" :key="thumbKey">
								<image class="img" :src="item.thumb" mode=""></image>
								<text class="imgTips">{{ item.number }}件</text>
							</view>
						</scroll-view>
					</view>
				</view>
			</view>
			<view class="wuliuDetial">
				<view class="head">物流跟踪</view>
				<view class="wuliuText" v-for="(item, Yindex) in shippingInfoList" :key="Yindex" :class="{ activeCircle: Yindex == 0 }">
					<view class="left">
						<view class="circle"></view>
						<view class="line"></view>
					</view>
					<view class="right">
						<view class="text">{{ item.info }}</view>
						<view class="time">{{ item.time }}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		item: {
			type: Object,
			default() {
				return {};
			}
		},
		keyNumber: {
			type: Number,
			default: 0
		},
		child: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			wuliuInfo: {},
			goodsList: [],
			shippingInfoList: [],
			show: false
		};
	},
	updated() {
		if(this.child){
			this.show = false;
		}
	},
	methods: {
		// 物流列表
		async getWuliuDetail(deliveryId, index) {
			if (this.show) {
				this.show = false;
			} else {
				// if (!this.show) {
				// let res = {
				// 	code: 0,
				// 	msg: '成功',
				// 	data: {
				// 		shippingName: '韵达快递',
				// 		shippingSn: '3102594272777',
				// 		status: '已签收',
				// 		isSign: '已签收',
				// 		shippingInfoList: [
				// 			{
				// 				time: '2019-07-06 10:36:46',
				// 				info:
				// 					'【北京市】快件已被 北京昌平宏福苑南一区15号楼店 代签收。如有问题请电联业务员：许本宏【17600376123】。相逢是缘,如果您对我的服务感到满意,给个五星好不好？【请在评价小件员处给予五星好评】'
				// 			},
				// 			{ time: '2019-07-06 08:17:17', info: '【北京市】北京主城区公司昌平区宏福服务部 派件员 许本宏 17600376123 正在为您派件' },
				// 			{ time: '2019-07-06 06:59:34', info: '【北京市】已到达 北京主城区公司昌平区宏福服务部 ；马上为您派送' },
				// 			{ time: '2019-07-06 03:59:40', info: '【北京市】已离开 北京分拨中心；发往 北京主城区公司昌平区宏福服务部' },
				// 			{ time: '2019-07-06 03:59:19', info: '【北京市】已到达 北京分拨中心' },
				// 			{ time: '2019-07-06 03:56:34', info: '【北京市】已到达 北京分拨中心' },
				// 			{ time: '2019-07-05 19:39:51', info: '【天津市】已离开 天津分拨中心；发往 北京分拨中心' },
				// 			{ time: '2019-07-05 19:32:34', info: '【天津市】已到达 天津分拨中心' },
				// 			{ time: '2019-07-04 06:13:19', info: '【东莞市】已离开 广东东莞分拨中心；发往 天津分拨中心' },
				// 			{ time: '2019-07-04 06:10:51', info: '【东莞市】已到达 广东东莞分拨中心' },
				// 			{ time: '2019-07-04 01:16:05', info: '【东莞市】广东东莞凤岗凤凰城公司 已揽收' },
				// 			{ time: '2019-07-03 23:54:28', info: '【东莞市】已离开 广东东莞凤岗凤凰城公司；发往 广东东莞分拨中心' },
				// 			{ time: '2019-07-03 23:50:48', info: '【东莞市】已离开 广东东莞凤岗凤凰城公司；发往 北京网点包' },
				// 			{ time: '2019-07-03 22:34:13', info: '【东莞市】广东东莞凤岗凤凰城公司 已揽收' }
				// 		],
				// 		goodsList: [{ thumb: 'http://img.xiaomei360.com/goods-cover/118/6375/thumb-5cb8082b9e0ff.jpg', number: 12 }]
				// 	}
				// };
				let res = await this.$api.request({
					url: this.$api.orderGroup_queryShipping,
					data: {
						deliveryId: deliveryId
					}
				});
				if (res && res.code == 0 && res.data) {
					let _data = res.data;
					this.wuliuInfo = _data;
					this.shippingInfoList = _data.shippingInfoList;
					this.goodsList = _data.goodsList;
				}
				this.show = true;
				this.$emit('change', index);
			}
		}
	}
};
</script>

<style lang="less">
@import url('./wuliu.less');
</style>
