<template>
	<view class="ordercheck-page">
		<view class="container">
			<view class="check-map">
				<view class="content" v-if="address.addressId" @click="toAddress">
					<view class="item">
						<view class="fl">
							<text class="name">{{ address.consignee }}</text>
						</view>
						<view class="fr">
							<text class="phone">{{ address.mobile }}</text>
						</view>
					</view>
					<view class="address">
						<text class="texts text arrow_r">{{ address.provinceName }}{{ address.cityName }}{{ address.districtName }}{{ address.address }}</text>
					</view>
				</view>
				<view class="content" v-if="!address.addressId">
					<view class="un-address">
						<text>还没有收货地址，</text>
						<text class="btn btn-address" @click="toAddress">去添加</text>
					</view>
				</view>
				<view class="map-line"><image class="img" src="/static/images/order/map-line.png" alt=""></image></view>
			</view>

			<view class="order-check-box">
				<view class="check-goods-item" v-for="(itemList, groupKey) in getGroupListArr" :key="groupKey">
					<view class="head">
						<view class="fl">
							<text class="supplier">{{ itemList.title }}</text>
							<!-- <text class="desc">（品牌方代发）</text> -->
						</view>
						<view class="fr">
							<text class="ib text arrow_r" @click="showGoodsPop('goodsPop', itemList.goodsNum, itemList.goodsList)">共{{ itemList.goodsNum }}个商品</text>
						</view>
					</view>
					<view class="goods-image" @click="showGoodsPop('goodsPop', itemList.goodsNum, itemList.goodsList)">
						<scroll-view class="scroll-view_H" scroll-x="true">
							<view class="img-box" v-for="(goodsItem, goodsKey) in itemList.goodsList" :key="goodsKey">
								<image class="img" :src="goodsItem.thumb" mode=""></image>
								<text class="text">x{{ goodsItem.cartNum }}</text>
							</view>
							<!-- 满赠 -->
							<childArray :listArray="itemList.goodsList" type="giftList"></childArray>
							<!-- pkg -->
							<childArray :listArray="itemList.goodsList" type="pkgList"></childArray>
							<!-- 物料 -->
							<childArray :listArray="itemList.goodsList" type="wuliaoList"></childArray>
						</scroll-view>
					</view>
					<view class="goods-freight">
						<view class="fl" @click="showPop('zhifaPop')">
							<view class="icon_order_freight"></view>
							<text class="ib fre-text freight-text">运费方式</text>
						</view>
						<view class="fr" @click="showPopfreightPop(groupKey, itemList.shippingSelections)" v-if="itemList.shippingSelections.length > 0">
							<text class="ib count arrow_r">{{ showTypePay[groupKey] ? showTypePay[groupKey] : itemList.shippingName }}</text>
						</view>
						<view class="fr" v-if="itemList.shippingSelections.length < 1">
							<text class="ib count">{{ itemList.shippingName }}</text>
						</view>
					</view>
					<view class="goods-foot">
						<view class="fr">
							<text>小计</text>
							<text class="number">￥{{ itemList.amount }}</text>
						</view>
					</view>
				</view>
			</view>

			<view class="leaving-message"><input class="inputbox" type="text" placeholder="订单留言：" v-model="remark" /></view>

			<view class="coupon-use" @tap="goCoupon">
				<view class="fl">
					<text class="ib coupon-text ticket">优惠券</text>
					<text class="ib coupon-number">{{ couponList.canUseCount }}张可用</text>
				</view>
				<view class="fr">
					<view class="ib price arrow_r">
						<text v-if="total.couponDiscount > 0">-￥{{ total.couponDiscount }}</text>
					</view>
				</view>
			</view>

			<view class="coupon-tips" v-if="isShowFullCutCouponTips">{{ FullCutCouponTips }}</view>

			<view class="pay-money">
				<view class="item">
					<view class="fl">采购总额</view>
					<view class="fr">
						<text>￥{{ total.goodsAmount }}</text>
					</view>
				</view>
				<view class="item">
					<view class="fl">满减立减</view>
					<view class="fr">
						<text>￥{{ total.fullCutDiscount }}</text>
					</view>
				</view>
				<view class="item">
					<view class="fl">优惠券</view>
					<view class="fr">
						<text class="cut-price">-￥{{ total.couponDiscount }}</text>
					</view>
				</view>
				<view class="item">
					<view class="fl" @tap="showPop('zhifaPop')">
						<text class="freight-text">直发运费</text>
						<text>（优惠后，直发总额未满{{ zhifaInfo.shippingAmountAbove }}元）</text>
					</view>
					<view class="fr">
						<text>￥{{ total.zhifaShippingFee }}</text>
					</view>
				</view>
				<view class="item">
					<view class="fl">应付总额</view>
					<view class="fr">
						<text class="count-price">￥{{ total.totalAmount }}</text>
					</view>
				</view>
			</view>

			<view class="o-feeInfo">
				<view class="tips">此单您的邮费政策：</view>
				<view class="zhifa">
					<text>小美直发专区：包邮</text>
					<text class="i">{{ shippingInfo.zhifaBaoyou }}</text>
					<text>单，到付</text>
					<text class="i">{{ shippingInfo.zhifaDaofu }}</text>
					<text>单，现付</text>
					<text class="i">{{ shippingInfo.zhifaXianfu }}</text>
					<text>单</text>
				</view>
				<view class="daifa">
					<text>品牌代发专区：包邮</text>
					<text class="i">{{ shippingInfo.daifaBaoyou }}</text>
					<text>单，到付</text>
					<text class="i">{{ shippingInfo.daifaDaofu }}</text>
					<text>单</text>
				</view>
			</view>

			<!-- <view class="textW">payInfo:: {{ payInfo }}</view> -->
			<!-- <view class="">*****************</view> -->
			<!-- <view class="textW">zhifuinfo:: {{ zhifuinfo }}</view> -->
			<!-- <view class="">*****************</view> -->
			<!-- <view class="textW">errorInfo:: {{ errorInfo }}</view> -->
			<!-- <view class="">*****************</view> -->
			<!-- <view class="textW">successinfo:: {{ successinfo }}</view> -->
			<!-- <view class="">*****************</view> -->
			<!-- <view class="textW">failInfo:: {{ failInfo }}</view> -->

			<!-- 补底部按钮位置 -->
			<view class="empty-pay-foot">empty-pay-foot</view>
		</view>

		<view class="collect-order" v-if="zhifaInfo.shippingFreeNeedsMoreAmount > 0">
			<view class="fl">
				享受优惠后，小美直发区还差
				<text class="i">{{ zhifaInfo.shippingFreeNeedsMoreAmount }}</text>
				元可免运费
			</view>
			<view class="fr" @tap="geCollect('zhifa')">
				<text class="fr-text">去凑单</text>
				<text class="icon_order_arrow_r_red"></text>
			</view>
		</view>

		<view class="pay-foot">
			<view class="pay-left-info">
				<view class="">
					<text class="item">
						<text>应付：</text>
						<text class="i price">￥{{ total.totalAmount }}</text>
					</text>
				</view>
				<view class="">
					<text class="item">
						<text>共</text>
						<text class="i number">{{ total.goodsCount }}</text>
						<text>个商品</text>
					</text>
				</view>
			</view>
			<view class="pay-order-btn" @click="createOrder"><text class="text">支付订单</text></view>
		</view>

		<!-- 运费支付方式 -->
		<toast-popup :show="freightPop" title="运费支付方式" @close="hidePop">
			<view class="freight-box">
				<block v-for="(item, index) in showPayArray" :key="index">
					<view class="item" @click="changeFreight(item.prepay, item.shippingName, item.shippingFee)">
						<view class="">
							{{ item.shippingName }}{{ item.shippingFee }}
							<text class="iconfont icon-check-circle-fill" :class="{ check: item.prepay == prepay }"></text>
						</view>
					</view>
				</block>
			</view>
		</toast-popup>

		<!-- 运费支付方式 -->
		<toast-popup :show="zhifaPop" title="直发邮费政策" @close="hidePop" @sure="hidePop">
			<view class="fei-active">
				<view class="itemList">小美直发商品邮费分为3个阶段，根据收货地址匹配相应的优惠，详情如下：</view>
				<view class="itemDesc">1)订单金额满2999元包邮，不足2999元收取物流费用20元</view>
				<view class="itemList">收货地址为广东、湖南、湖北、福建、广西、贵州、江西、浙江</view>
				<view class="itemDesc">2)订单金额满3999元包邮，不足3999元收取物流费用30元</view>
				<view class="itemList">收货地址为云南、重庆、四川、陕西、山西、河北、宁夏、北京、天津、上海、山东、江苏、安徽、河南</view>
				<view class="itemDesc">3)订单金额满4999元包邮，不足4999元收取物流费用50元</view>
				<view class="itemList">收货地址为新疆、西藏、青海、甘肃、内蒙、辽宁、吉林、黑龙江、海南的订单</view>
			</view>
		</toast-popup>

		<!-- 货品清单 -->
		<toast-popup :show="goodsPop" title="货品清单" :desc="countGoods" @close="hidePop">
			<!-- <view class="" v-for="(itemList, groupKey) in groupList" :key="groupKey"> -->
			<view class="check-goods-detail" v-for="(item, goodsKey) in goodsListArray" :key="goodsKey">
				<view class="item">
					<view class="item-goods">
						<view class="fl img-box"><image class="img" :src="item.thumb" mode=""></image></view>
						<view class="fl info-box">
							<text class="goods-name">{{ item.goodsName }}</text>
							<view class="">
								<text class="tag" :style="'color:' + item.textColor + ';background:' + item.bgColor">{{ item.tag }}</text>
							</view>
						</view>
						<view class="fr price-box">
							<text class="price">￥{{ item.price }}</text>
							<text class="number">x {{ item.cartNum }}</text>
						</view>
					</view>
					<!-- <tagsLine type="gift" :list="item.giftList"></tagsLine> -->
					<view class="tags-line gift" v-if="item.giftList.length > 0">
						<view class="goods-tags">满赠</view>
						<view class="ul">
							<view class="li" v-for="(wuliao, wuliaoKey) in item.giftList" :key="wuliaoKey">
								<text class="fl text">{{ wuliao.goodsName }}</text>
								<text class="fr count">x{{ wuliao.cartNum }}</text>
							</view>
						</view>
					</view>
					<view class="tags-line pkg" v-for="(pkg, pkgKey) in item.pkgList" :key="pkgKey">
						<view class="goods-tags"><image :src="pkg.thumb" alt="" class="oneProImg"></image></view>
						<view class="ul">
							<view class="li">
								<text class="fl text">{{ pkg.goodsName }}</text>
								<text class="fr count">x{{ pkg.cartNum }}</text>
							</view>
						</view>
					</view>
					<!-- <tagsLine type="wuliao" :list="item.giftList"></tagsLine> -->
					<view class="tags-line wuliao" v-if="item.wuliaoList.length > 0">
						<view class="goods-tags">物料</view>
						<view class="ul">
							<view class="li" v-for="(wuliao, wuliaoKey) in item.wuliaoList" :key="wuliaoKey">
								<text class="fl text">{{ wuliao.goodsName }}</text>
								<text class="fr count">x{{ wuliao.cartNum }}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- </view> -->
		</toast-popup>
	</view>
</template>

<script>
import payHuifuApp2 from '@/common/pay.js';
import toastPopup from '@/components/toast-popup/toast-popup2.vue';
import childArray from './child.vue';
import tagsLine from './tags-line.vue';

export default {
	components: {
		toastPopup,
		childArray,
		tagsLine
	},
	data() {
		return {
			provinceId: '',
			addressId: '',
			prepay: 0,
			couponId: '',

			countGoods: '',
			// popup
			freightPopIndex: 0,
			freightPop: false,
			goodsPop: false,

			//
			remark: '',

			// 服务器参数
			isShowFullCutCouponTips: false,
			FullCutCouponTips: '',
			address: {},
			couponList: {},
			groupList: [],
			shippingInfo: {},
			total: {},
			zhifaInfo: {},
			//
			showPayArray: [],
			showTypePay: {},

			// 测试debug
			successinfo: '',
			failInfo: '',
			zhifuinfo: '',
			payInfo: '',
			errorInfo: '',
			//
			zhifaPop: false,

			access_token: '',
			// 商品输出
			goodsListArray: [],

			groupSn: ''
		};
	},
	onLoad(params) {
		// let { addressId, prepay, couponId, provinceId } = params;
		// this.addressId = addressId || '';
		// this.prepay = prepay || '';
		// this.couponId = couponId || '';
		// this.provinceId = provinceId || '';
		this.access_token = uni.getStorageSync('access_token') || '';
		this.$store.commit('updateCouponId', 0);
	},
	onShow() {
		this.couponId = this.$store.state.couponId || '';
		this.addressId = this.$store.state.addressId || '';
		this.orderCheckData();
	},
	computed: {
		getGroupListArr() {
			return this.groupList;
		}
	},
	methods: {
		toAddress() {
			this.prepay = 0;
			this.showTypePay = [];
			let url = '../addressList/addressList?order=1';
			this.$api.goNavigateTo(url);
		},
		// 更新邮费支付方式
		changeFreight(prepay, payType, payTypeMoney) {
			this.prepay = prepay;
			this.freightPop = false;
			// this.showTypePay = payType + (payTypeMoney ? payTypeMoney : '');
			this.showTypePay[this.freightPopIndex] = payType + (payTypeMoney ? payTypeMoney : '');
			this.orderCheckData();
		},
		// 优惠券页面
		goCoupon() {
			let cuponArr = this.couponList;
			uni.setStorageSync('updateCoupon', cuponArr);
			this.$store.commit('updateCoupon', cuponArr);
			this.$api.goNavigateTo('./couponList');
		},
		showPopfreightPop(index, array) {
			this.freightPopIndex = index;
			this.freightPop = true;
			this.showPayArray = array;
		},
		// 隐藏所有弹层
		hidePop() {
			this.freightPop = false;
			this.goodsPop = false;
			this.zhifaPop = false;
		},
		// 以类型显示弹层
		showPop(type, total) {
			this[type] = true;
		},
		showGoodsPop(type, total, array) {
			if (type === 'goodsPop') {
				this.countGoods = '共$个商品'.replace('$', total);
			}
			this.goodsListArray = array;
			this[type] = true;
		},
		// 获取确认订单数据
		async orderCheckData() {
			let that = this;
			let res = await this.$api.request({
				method: 'POST',
				url: this.$api.confirmOrderApi,
				data: {
					addressId: this.addressId,
					prepay: this.prepay,
					couponId: this.couponId
				}
			});
			if (res && res.data) {
				let { isShowFullCutCouponTips, FullCutCouponTips, address, couponList, groupList, shippingInfo, total, zhifaInfo } = res.data;
				that.isShowFullCutCouponTips = isShowFullCutCouponTips;
				that.FullCutCouponTips = FullCutCouponTips;
				that.address = address;
				that.couponList = couponList;
				// if(couponList.bestCouponId){
				// 	that.couponId = couponList.bestCouponId;
				// 	that.$store.commit('updateCouponId', couponList.bestCouponId);
				// }
				that.groupList = groupList;
				that.shippingInfo = shippingInfo;
				that.total = total;
				that.zhifaInfo = zhifaInfo;
			}
		},
		// 创建订单
		async createOrder() {
			let that = this;
			uni.showNavigationBarLoading();
			let res = await this.$api.request({
				method: 'post',
				access_token: this.access_token,
				url: this.$api.orderGroup_create,
				data: {
					addressId: this.addressId,
					prepay: this.prepay,
					remark: this.remark,
					couponId: this.couponId
				}
			});
			uni.hideNavigationBarLoading();

			if (res.code == 0 && res.data) {
				let { groupSn } = res.data;
				this.groupSn = groupSn;
				payHuifuApp2(groupSn, that);
			} else if (res.code == 1001) {
				this.$api.showMessage(res.msg);
			}
		},
		geCollect(type) {
			let total = this.total.goodsAmount;
			let discount = this.total.discount || 0;
			let amountabove = this.zhifaInfo.shippingAmountAbove;
			let needMore = this.zhifaInfo.shippingFreeNeedsMoreAmount;
			let url = '../straightCollect/straightCollect';
			switch (type) {
				case 'zhifa':
					url = `${url}?total=${total}&needMore=${needMore}&type=${type}&provinceId=${this.provinceId}`;
					break;
				case 'fullcut':
					url = `${this.$api.fullcut_coudan}`;
					break;
				case 'brand':
					url = `${this.$api.brand_coudan}?brandId=${this.brandId}`;
					break;
				default:
					break;
			}

			uni.setStorageSync('coudanInfo', {
				type,
				total,
				discount,
				amountabove,
				needMore,
				provinceId: this.provinceId
			});

			this.$api.goNavigateTo(`../straightCollect/straightCollect`);
		}
	}
};
</script>

<style lang="less" scoped="scoped">
.ordercheck-page {
	width: 100%;
}

@import './order-check.less';
@import './goods-image.less';
</style>
