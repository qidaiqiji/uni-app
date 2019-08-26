<template>
	<view class="" :style="{ background: contentColor }">
		<view class="banner" :style="{ background: bgColor }">
			<view class="logo"><image src="/static/images/superBrand/logo.png"></image></view>
			<swiper class="swiper" :autoplay="true" :circular="true" interval="5000" duration="500" @change="changeSwiperCur">
				<swiper-item v-for="(item, index) in bannerInfo" :key="index">
					<view class="swiper-item" @tap="handleJumpTo(item.url, 'url')">
						<image :src="item.img" mode="aspectFill"></image>
						<view class="item_time" v-if="item.videoLength && item.video">
							<image src="/static/images/superBrand/icon_play_super.png" mode=""></image>
							<view class="line"></view>
							<view class="time_">{{ item.videoLength }}</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
			<view class="swiper_dots">
				<block v-for="(item, pointIndex) in bannerInfo" :key="pointIndex"><view :class="['item_dot', swiperCur == pointIndex ? 'Click_dot' : '']"></view></block>
			</view>
		</view>
		<view class="coupon_list">
			<view class="coupon_list_">
				<view class="slogan">
					<view class="left">
						<view class="left_icon"><image src="/static/images/public/icon_broadcast.png" mode=""></image></view>
						<view class="left_txt">{{ articleTitle }}</view>
					</view>
					<view class="right"><image src="/static/images/public/arrow_r.png" mode=""></image></view>
				</view>
				<view class="coupons">
					<scroll-view :scroll-x="true" class="coupons_scroll">
						<view class="coupons_">
							<block v-for="(item, index) in couponList" :key="index">
								<view class="coupon_item">
									<view class="item_left">
										<view class="price">{{ item.cut }}</view>
										<view class="condition">{{ item.ruleName }}</view>
									</view>
									<view :class="['item_right', item.canTake && item.canTakeNums > 0 ? 'notYetGet' : 'yetGet']">
										{{ item.canTake && item.canTakeNums > 0 ? '领取' : '已领取' }}
									</view>
								</view>
							</block>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
		<view class="BrandShow">
			<block v-for="(item, index) in goodsCardList" :key="index">
				<view class="brandItem">
					<view class="item_thumb"><image :src="item.img"></image></view>
					<view class="item_msg">
						<view class="msg_desc">
							<view class="title">{{ item.goodsName }}</view>
							<view class="desc">{{ item.desc }}</view>
						</view>
						<view class="msg_cart">
							<view class="goods_thumb"><image src="" mode=""></image></view>
							<view class="goods_price">
								<view class="prices">
									<view class="new_price">
										<view class="new_int">462</view>
										<view class="new_min">.00</view>
									</view>
									<view class="old_price">660.00</view>
								</view>
								<view class="addCart"><image src="/static/images/common/icon_shop.png"></image></view>
							</view>
						</view>
					</view>
				</view>
			</block>
			<!-- //发现频道的广告 -->
			<block v-for="(item, index) in foundArticle" :key="index">
				<view class="found_ad">
					<view class="promulgator">
						<view class="img"><image :src="item.authorImg" mode=""></image></view>
						<view class="name">{{ item.authorName }}</view>
					</view>
					<view class="ad_text">{{ item.title }}</view>
					<view class="ad_imgs">
						<block v-for="(img, index) in item.imgs" :key="index"><image class="itemImg" :src="img" mode=""></image></block>
					</view>
				</view>
			</block>
		</view>
		<view class="goods_msg">
			<view class="title">精选热卖</view>
			<view class="intrList">
				<view class="intrList-item" v-for="(item, index) in goodsList" :key="index">
					<view class="goods-detail">
						<view class="img-box">
							<image class="image" :src="item.goodsInfo.thumb" mode=""></image>
							<view class="list-video" v-if="item.isVideoTag"></view>
						</view>
						<view class="info-box">
							<view class="hidden-text goods-name">{{ item.goodsInfo.goodsName }}</view>
							<view class="act-data"><image class="image" v-if="item.actData.url" :src="item.actData.url" mode=""></image></view>
						</view>
					</view>
					<view class="buy-box">
						<view class="price">
							<view class="price_ident">¥</view>
							<view class="price_number">{{ item.goodsInfo.big }}</view>
							<view class="price_mantissa">.{{ item.goodsInfo.min }}</view>
						</view>
						<text class="tag discount">{{ item.goodsInfo.discount }}折</text>
						<view class="icon_cheap_shop_white buycar"></view>
					</view>
				</view>
			</view>
		</view>

		<!-- //最底部 -->
	</view>
</template>

<script>
export default {
	data() {
		return {
			swiperCur: '',
			superBrandId: '1',
			page: 1,
			pageSize: 10,
			bannerInfo: [],
			bgColor: '',
			videoTime: '00”00',
			goodsList: []
		};
	},
	onLoad(params) {
		// this.superBrandId = params.superBrandId
	},
	onShow() {
		this.getSuperBrandIndex();
		this.getGoodsList();
	},
	onReachBottom() {
		console.log('触发了下拉');
				if(!this.listRequestLock){
					let page = this.page
					let pageSize = this.pageSize
					let superBrandId =this.superBrandId
					this.getGoodsList({page:page+1,pageSize,superBrandId})
				}
	},
	methods: {
		changeSwiperCur(e) {
			this.swiperCur = e.detail.current;
		},
		async getSuperBrandIndex() {
			try {
				const res = await this.$api.request({
					url: this.$api.superBrand_index,
					data: { superBrandId: this.superBrandId }
				});
				console.log(res);
				const Data = res.data;
				//轮播图时间
				let temp_bannerInfo = Data.bannerInfo.map(item => {
					if (item.videoLength < 60) {
						item.videoLength = '00”' + item.videoLength;
					} else {
						var h = Math.floor(item.videoLength / 60);
						var s = item.videoLength % 60;
						if (h > 9) {
							item.videoLength = h + '”' + s;
						} else {
							item.videoLength = '0' + h + '”' + s;
						}
					}
					return item;
				});
				Data.bannerInfo = temp_bannerInfo;
				temp_bannerInfo = null;

				Object.keys(Data).map(key => {
					this[key] = Data[key];
				});
			} catch (e) {
				//TODO handle the exception
			}
		},
		async getGoodsList(params = { superBrandId: this.superBrandId, page: this.page, pageSize: this.pageSize }) {
			try {
				const res = await this.$api.request({
					url: this.$api.superBrand_hotList,
					data: params
				});
				if (res && res.data) {
					let goodsList = res.data.goodsList;
					// 请求锁开关
					this.listRequestLock = goodsList.length < this.pageSize ? true : false;

					let temp_goodsList = this.$api.split_price(goodsList, 'goodsPrice', 'goodsInfo');
					this.goodsList = this.goodsList.concat(...temp_goodsList);
					this.page = params.page;
					temp_goodsList = null;
				}
			} catch (e) {
				this.listRequestLock = true;
			}
		}
	}
};
</script>

<style lang="less">
@import url('superBrand.less');
</style>
