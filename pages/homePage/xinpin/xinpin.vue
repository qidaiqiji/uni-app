<template>
	<view class="redbox">
		<view class="red-wrap">
			<view class="redbox-swiper-box">
				<view class="redbox-swiper-box-left">
					<view class="page-section-spacing">
						<view class="date-time">{{ year }}年{{ month }}月</view>
						<view class="mouth-new">本月新品</view>
					</view>
					<view class="goods-name">{{ goodsInfo.goodsName }}</view>
					<view class="goods-price">
						<view class="price">
							<view class="price_ident">¥</view>
							<view class="price_number">{{ goodsInfo.big }}</view>
							<view class="price_mantissa">.{{ goodsInfo.min }}</view>
						</view>
						<view class="redbox-tips">{{ goodsInfo.sellingPoint }}</view>
					</view>
				</view>
				<view class="redbox-swiper-box-right">
					<swiper class="redbox-swiper" :autoplay="true" :interval="5000" :duration="500" :circular="true" @change="swiperChange">
						<swiper-item v-for="(goods, goodsKey) in goodsList" :key="goodsKey" @click="goProductDetail(goods.goodsId)">
							<view class="swiper-item"><image class="image" :src="goods.thumb" mode=""></image></view>
						</swiper-item>
					</swiper>
					<view class="dot"><dot :index="imgCurrent" :page="'redBox'" :total="goodsList.length"></dot></view>
				</view>
			</view>

			<!-- 品牌Logo -->
			<view class="poswrap">
				<view class="leftwrap"><image class="new-tips" src="../../../static/images/redbox/img_new@2x.png" mode=""></image></view>
				<view class="brand-box">
					<view
						class="brand-coll"
						v-for="(brand, brandKey) in brandList"
						:class="{ brandmb: brandKey == 3 || brandKey == 4 || brandKey == 5, brandmr: brandKey == 5 || brandKey == 2 }"
						:key="brandKey"
						@click="goBrandDetail(brand.brandId)"
					>
						<view class="brand-image-bg" :style="{ 'background-image': 'url(' + brand.brandLogo + ')' }"></view>
						<!-- <image class="brand-image" :src="brand.brandLogo" mode=""></image> -->
					</view>
				</view>
			</view>
		</view>
		<view class="empty-box"></view>

		<view class="boxTab">
			<view class="redbox-nav-view" :class="[isFd ? 'isFd' : '']">
				<view class="redbox-nav-view-coll" :class="{ active: current == 2 }" @click="onClickItem(2)"><text class="text">品牌</text></view>
				<view class="redbox-nav-view-coll" :class="{ active: current == 1 }" @click="onClickItem(1)"><text class="text">商品</text></view>
				<!-- <view class="redbox-nav-view-coll" :class="{ active: current == 3 }" @click="onClickItem(3)"><text class="text">即将上新</text></view> -->
			</view>
			<view class="content">
				<view v-show="current === 1">
					<view class="redbox-goods-view">
						<redboxGoodsView :list="etGoodsList" :newPro="0"></redboxGoodsView>
						<view class="red-find">
							<view class="findTag">小美发现</view>
							<view class="findText" :class="[isactiveText ? 'activeText' : '']">{{ foundArticle.title }}</view>
							<view class="shouAll" v-if="foundArticle.title && foundArticle.title.length > 44" @tap="showAlltext()">{{ activeText }}</view>
							<view class="imgShow" v-if="foundArticle.imgs && foundArticle.imgs.length > 0">
								<swiper class="swiper" :indicator-dots="false" :autoplay="true" :circular="true">
									<block v-for="(bitem, bindex) in foundArticleImg" :key="bindex">
										<swiper-item class="swiper-item">
											<view class="image-bg" v-for="(img, imgKey) in bitem.arr" :key="imgKey"  :style="{ 'background-image': 'url(' + img + ')' }" @tap="preview(foundArticle.imgs, img)"></view>
											<!-- <image class="img" v-for="(img, imgKey) in bitem.arr" :key="imgKey" :src="img" mode="" @tap="preview(foundArticle.imgs, img)"></image> -->
										</swiper-item>
									</block>
								</swiper>
							</view>
							<view class="imgText">{{ foundArticle.authorName }}</view>
						</view>
					</view>
					<redboxGoodsView :list="nav_goodsList" :newPro="0"></redboxGoodsView>

					<!-- 加载更多 -->
					<view class="loadingText" v-if="isload"><image class="image" src="../../../static/images/loading/loading.gif" mode=""></image></view>
				</view>

				<view v-show="current === 2"><redboxBrandView :list="nav_brandList"></redboxBrandView></view>
				<!-- <view v-show="current === 3"><redboxGoodsView :list="nav_newgoodsList" :newPro="1"></redboxGoodsView></view> -->
			</view>
		</view>
		<text class="lock-end" v-if="isLoadAllData">已经到底了</text>
	</view>
</template>
<script>
import redboxGoodsView from './redbox-goods-view.vue';
import redboxBrandView from './redbox-brand-view.vue';
import dot from '@/components/dot.vue';
export default {
	components: {
		redboxGoodsView,
		redboxBrandView,
		dot
	},
	data() {
		return {
			current: 1,
			imgCurrent: 0,
			brandList: [],
			goodsList: [],
			month: '',
			year: '',
			swiper_cur: 0,
			goodsInfo: {},

			// 商品列表
			foundArticle: {},
			foundArticleImg: [],
			nav_goodsList: [],
			nav_brandList: [],
			nav_newgoodsList: [],
			goodsPages: 0,
			new_goodsPage: 0,
			isLoadAllData: false,

			// 商品嵌套发现模块
			etGoodsList: [],
			getGoodsList: [],
			// 发现模块
			isactiveText: false,
			activeText: '全文',

			// 是否正在加载中
			isload: false,

			isFd: false,
			maxTop: uni.upx2px(750)
		};
	},
	onLoad() {
		this.getNewAliveList_index();
		this.onClickItem();
	},
	onShow() {},
	onReachBottom() {
		let that = this;
		if (that.isload) {
			return true;
		}
		setTimeout(function() {
			if (that.current === 1 && !that.isLoad) {
				that.moreGoods();
			}
			if (that.current === 3) {
				that.moreAlive();
			}
		}, 300);
	},
	async onPageScroll(event) {
		let { scrollTop } = event;
		if (scrollTop > this.maxTop && !this.isFd) {
			this.isFd = true;
		} else if (scrollTop < this.maxTop && this.isFd) {
			this.isFd = false;
		}
	},
	methods: {
		onClickItem(index) {
			if (this.current !== index && index) {
				this.current = index;
			}
			if (this.current == 1) {
				this.nav_goodsList = [];
				this.goodsPages = 0;
				this.getNewAliveList_goods();
			}
			if (this.current == 2 && this.nav_brandList.length < 1) {
				this.getNewAliveList_brand();
			}
			if (this.current == 3) {
				this.nav_newgoodsList = [];
				this.new_goodsPage = 0;
				this.getNewAliveList_alive();
			}
		},
		showAlltext() {
			this.activeText = !this.isactiveText ? '收起' : '全文';
			this.isactiveText = !this.isactiveText;
		},
		loadGoodsList(goodsList) {
			let res = goodsList.map(e => {
				let _array = e.goodsPrice.split('.');
				e.big = _array[0];
				e.min = _array[1];
				return e;
			});
			return res;
		},
		async getNewAliveList_index() {
			let that = this;
			let res = await this.$api.request({
				method: 'GET',
				url: this.$api.getNewAliveList_index
			});
			if (res && res.data) {
				let { brandList, goodsList, month, year } = res.data;
				that.brandList = brandList;
				that.month = month;
				that.year = year;
				goodsList = that.loadGoodsList(goodsList);
				that.goodsList = goodsList;
				that.goodsInfo = goodsList[that.swiper_cur];
			} else {
				// this.$api.showMessage(res.msg);
			}
		},
		moreGoods() {
			this.getNewAliveList_goods();
		},
		async getNewAliveList_goods() {
			let that = this;
			that.isload = true;
			that.goodsPages++;
			let res = await this.$api.request({
				method: 'GET',
				url: `${this.$api.getNewAliveList_goods}?page=${that.goodsPages}&pagesize=10`
			});

			if (res && res.data) {
				let { foundArticle, goodsList, totalCount } = res.data;
				if (foundArticle && foundArticle.articleId) {
					that.$set(that, 'foundArticle', foundArticle);
					let imgs = JSON.parse(JSON.stringify(foundArticle.imgs));
					let imgsLen = imgs && imgs.length;
					if (imgsLen > 0) {
						let split = Math.ceil(imgsLen / 3);
						for (let i = 0; i < split; i++) {
							that.foundArticleImg.push({
								arr: imgs.splice(0, 3)
							});
						}
					}
				}
				goodsList = that.loadGoodsList(goodsList);
				if (that.etGoodsList.length < 1) {
					that.etGoodsList = goodsList.splice(0, 8);
					that.nav_goodsList = goodsList;
					goodsList = null;
				} else {
					that.nav_goodsList.push(...goodsList);
					if (totalCount == Number(that.nav_goodsList.length) + 8) {
						this.isLoadAllData = true;
					} else {
						// this.isLoadAllData = false;
					}
				}
			} else {
				// this.$api.showMessage(res.msg);
			}

			that.isload = false;
		},
		preview(urls, current) {
			uni.previewImage({
				current: encodeURI(current),
				indicator: 'number',
				urls: urls.map(item => encodeURI(item))
			});
		},
		async getNewAliveList_brand() {
			let that = this;
			let res = await this.$api.request({
				method: 'GET',
				url: this.$api.getNewAliveList_brand
			});

			if (res.code == 0) {
				that.nav_brandList.push(...res.data.brandList);
			} else {
				this.$api.showMessage(res.msg);
			}
		},
		moreAlive() {
			this.getNewAliveList_alive();
		},
		async getNewAliveList_alive() {
			let that = this;
			let res = await this.$api.request({
				method: 'GET',
				url: this.$api.getNewAliveList_alive
			});
			if (res.code == 0) {
				if (that.nav_newgoodsList.length < res.data.totalCount) {
					that.nav_newgoodsList.push(...res.data.goodsList);
					this.isLoadAllData = false;
				} else {
					that.nav_newgoodsList = res.data.goodsList;
					this.isLoadAllData = true;
				}
			} else {
				this.$api.showMessage(res.msg);
			}
			that.isLoad = false;
		},
		swiperChange(res) {
			let that = this;
			let { current } = res.detail;
			this.imgCurrent = current;
			that.goodsInfo = that.goodsList[current];
		},
		// 品牌主页
		goBrandDetail(brandId) {
			let url = `../goods/brandDetail/brandDetail?brandId=${brandId}`;
			this.$api.goNavigateTo(url);
		},
		// 商品详情
		goProductDetail(goodsId) {
			let url = `../goods/product/product?goodsId=${goodsId}`;
			this.$api.goNavigateTo(url);
		}
	}
};
</script>

<style lang="less" scoped="scoped">
@import url('./redbox.less');
@import url('./redbox-brand-view.less');
// @import url('./redbox-goods-view.less');

.isFd {
	background: #de0e0e;
	position: fixed;
	z-index: 8;
	top: 0px;

	.redbox-nav-view-coll {
		// color: rgba(136, 150, 150, 0.8);
		color: rgba(0, 0, 0, 0.6);

		&.active {
			&:after {
				visibility: visible;
				background: rgba(0, 0, 0, 0.3);
			}

			color: #fff;
		}
	}
}

/* #ifdef H5 */
.isFd {
	top: 44px;
}
/* #endif */

.redbox-swiper {
	.uni-swiper-dots-horizontal {
		position: absolute;
		transform: translate(0, 0);
		left: auto;
		right: 32upx;
		bottom: 10upx;
	}

	.uni-swiper-slides {
		width: 314upx;
		height: 314upx;
		background: rgba(255, 255, 255, 1);
		border-radius: 4upx;
		position: absolute;
		// top: 35upx;
		// left: 60upx;
		overflow: hidden;
		border: 1px solid #000;
	}

	.uni-swiper-dot {
		width: 12upx;
		height: 12upx;
	}
}
</style>
