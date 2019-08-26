<template>
	<view class="pages address-page">
		<view class="addr-content" v-if="!isEmpty" :style="{'min-height': minHeight+'px'}">
			<view class="item" v-for="(item, index) in addressList" :key="index">
				<view class="left" @tap="useAddress(item.addressId)">
					<view class="user">
						<text class="name">{{ item.consignee }}</text>
						<text class="phone">{{ item.mobile }}</text>
						<text class="label" v-if="item.isDefault">默认</text>
					</view>
					<text class="addr-info">{{ item.provinceName }}{{ item.cityName }}{{ item.districtName }}{{ item.address }}</text>
				</view>
				<text class="edit-btn" @tap="editAddress(item)">编辑</text>
			</view>
		</view>

		<view class="empty-foot">empty</view>

		<view class="commom-footer address-foot">
			<text class="text-tips">温馨提示：修改省份地址，当前包邮政策将会重新计算</text>
			<view class="botton" @tap="toAdnAddress()"><text class="botton-text">新增收货地址</text></view>
		</view>

		<!-- 暂无数据 -->
		<block v-if="isEmpty">
			<view class="tiket-unset">
				<view class="unicon undata"></view>
				<view class="text">搜索不到相关信息</view>
			</view>
		</block>
	</view>
</template>

<script>
export default {
	components: {},
	data() {
		return {
			isEmpty: false,
			total: 0,
			addressList: [],
			// 是否订单模块进来
			ordercheck: false,
			minHeight: 1000
		};
	},
	onLoad(params) {
		let res = uni.getSystemInfoSync();
		this.minHeight = res.windowHeight;
		let { order } = params;
		if (order) {
			this.ordercheck = true;
		}
	},
	onShow() {
		console.log('onShow');
		this.getUserAddress();
	},
	methods: {
		// 新增收货地址
		toAdnAddress() {
			let url = '../addressAdd/addressAdd';
			this.$api.goNavigateTo(url);
		},
		// 确认订单中使用该地址
		useAddress(addressId) {
			if (this.ordercheck) {
				this.$store.commit('updateAddressId', addressId);
				uni.navigateBack({ delta: 1 });
			}
		},
		// 修改该地址
		editAddress(item) {
			let that = this;
			uni.setStorage({
				key: 'addressId',
				data: item || '',
				success: function() {
					let page = `../addressAdd/addressAdd?edit=true`;
					that.$api.goNavigateTo(page);
				}
			});
		},
		async getUserAddress() {
			let that = this;
			let res = await this.$api.request({
				url: this.$api.address_list
			});
			// console.log(res);
			// console.log(JSON.stringify(res));
			if (res && res.data) {
				let { total, addressList } = res.data;
				if (total < 1) {
					that.isEmpty = true;
				} else {
					that.isEmpty = false;
				}
				that.total = total;
				that.addressList = addressList;
			}
		}
	}
};
</script>

<style lang="less">
@import url('./addressList.less');
.empty-foot {
	visibility: hidden;
	height: 170upx;
}
</style>
