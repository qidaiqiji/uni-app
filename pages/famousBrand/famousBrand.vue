<template>
	<view class="famous">
		<view class="banner">
			<swiper class="card-swiper" :autoplay="true" :class="dotStyle ? 'square-dot' : 'round-dot'" :circular="true" interval="5000" duration="500" @change="cardSwiper">
				<swiper-item v-for="(item, index) in carouselList" :key="index" :class="cardCur == index ? 'cur' : ''">
					<view class="swiper-item" @tap="handleJumpTo(item.url, 'url')">
						<image :src="item.img" mode="aspectFill"></image>
						<view class="bottomBg_blur" :style="{ backgroundImage: 'url(' + item.img + ')' }"></view>
						<view class="banner_msg">
							<view class="title">{{ item.goodsName }}</view>
							<view class="price">
								<view class="price_int">{{ item.big }}</view>
								<view class="price_min">.{{ item.min }}</view>
							</view>
						</view>
						<!-- <video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type == 'video'"></video> -->
					</view>
				</swiper-item>
			</swiper>
			<view class="by_point_wrap">
				<block v-for="(item, pointIndex) in carouselList" :key="pointIndex"><view :class="[cardCur == pointIndex ? 'by_point_' : 'by_point']"></view></block>
			</view>
		</view>
		<!-- 名品汇聚 -->
		<view class="improt_brandList">
			<view class="top_bottom_wrap">
				<image class="top_bottom_lfet" src="/static/images/famousBrand/img_new.png"></image>
				<view class="top_bottom_right">
					<scroll-view scroll-x="true" style=" white-space: nowrap;display: flex;" class="top_bottom_right_scroll">
						<block v-for="(brandItem, listIndex) in brandList" :key="listIndex">
							<view class="brand_right">
								<block v-for="(item, itemIndex) in brandItem" :key="itemIndex">
									<view class="brandList_img_solid" @tap="handleJumpTo(item.brandId, 'id')">
										<image mode=" widthFix" class="brandList_img" :src="item.imgUrl" />
									</view>
								</block>
							</view>
						</block>
					</scroll-view>
				</view>
			</view>
		</view>
		<!-- 文案提示 -->
		<view class="copywriting_tip">
			<view class="conter_popup">
				<view class="conter_popup_left">
					<block v-for="(txtItem, txtIndex) in arrTxt" :key="txtIndex">
						<view class="conter_popup_txt">
							<image class="for_img" src="/static/images/famousBrand/icon_gou.png" />
							<view class="">{{ txtItem }}</view>
						</view>
					</block>
				</view>
				<view class="conter_popup_right" @tap="handleShowInform(true)">
					<image class="right_green" src="/static/images/famousBrand/icon_diamond.png" />
					<text>名品采购告知书</text>
					<image class="right_green" src="/static/images/common/right_green.png" />
				</view>
			</view>
		</view>
		<!-- 甄选名品 -->
		<view class="preference_brand">
			<view class="title">甄选名品</view>
			<view class="preference_brand_list">
				<block v-for="(Infoitem, index) in brandInfo" :key="index">
					<view class="brand_item">
						<view class="item_thumb">
							<image class="item_thumb_" :src="Infoitem.imgUrl" v-if="!Infoitem.videoUrl" @tap="handleJumpTo(Infoitem.jumpUrl, 'url')"></image>
							<view class="item_thumb_video" v-else  @tap="handleShowVideo(Infoitem.videoUrl,Infoitem.videoWidth,Infoitem.videoHeight)">
								<image class="video_img" :src="Infoitem.imgUrl" mode=""></image>
								<image class="video_icon" src="/static/images/public/play-icon.jpg" mode=""></image>
							</view>
						</view>
						<view class="item_list">
							<scroll-view scroll-x="true" style=" white-space: nowrap;display: flex;" class="selection_shop_scroll">
								<view class="item_list_">
									<block v-for="(item, index) in Infoitem.goodsList" :key="index" v-if="Infoitem.goodsList.length > 0">
										<view class="item_goods" @tap="handleJumpTo(item.goodsInfo.goodsId)">
											<view class="goods_img"><image :src="item.goodsInfo.thumb"></image></view>
											<view class="goods_title">{{ item.goodsInfo.goodsName }}</view>
											<view class="desc">
												<view class="price">
													<view class="new">
														<view class="new_int">{{ item.goodsInfo.big }}</view>
														<view class="new_min">.{{ item.goodsInfo.min }}</view>
													</view>
													<view class="old">{{ item.goodsInfo.marketPrice }}</view>
												</view>
												<view class="addCart" @tap.stop="handleAddCart(item)">
													<image src="/static/images/famousBrand/green_shop.png" mode=""></image>
												</view>
											</view>
										</view>
									</block>
									<view class="more"  @tap="handleJumpTo(Infoitem.brandId, 'id')">
										<view class="more_">
											<view class="more_img"><image src="/static/images/famousBrand/icon_more.png" mode=""></image></view>
											<view class="more_txt">查看更多</view>
										</view>
									</view>
								</view>
							</scroll-view>
						</view>
					</view>
				</block>
			</view>
		</view>
		<!-- 名品的分类筛选 -->
		<view class="brandClassify">
			<view :class="[isFixed ? 'title_fixed' : '', 'title']">
				<view class="title_left">
					<scroll-view scroll-x="true" style=" white-space: nowrap; display: flex" class="scroll_view">
						<view class="title_choose">
							<block v-for="(item, index) in categoryList" :key="index">
								<view :class="['title_choose_item',categoryIndex==index?'clickTitle':'']" @tap="handleTitle(item.catId,'',index)">
									<view >{{ item.catName }}</view>
									<view class="line" v-show="categoryIndex==index"></view>
								</view>
							</block>
						</view>
					</scroll-view>
				</view>
				<view class="title_right" @tap="handleTitle('-1','sample','-1')"><view class="">中小样</view></view>
			</view>
			<famousBrand-list :goodsList='goodsList' @handleAddCart="handleAddCart"></famousBrand-list>
			<!-- 	<block v-for="(item, index) in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]" :key="index">
				<view class="testItem">{{ item }}</view>
			</block> -->
		</view>
			<block v-if="showCart"><buy-popup :show="showCart" :datas="cart_goodInfo" @close="closeCart" @sure="addCart"></buy-popup></block>
			<!-- 视频播放层 -->
			<!-- <block v-if="showVideo"> -->
				<view v-show="showVideo" class="video-page-container" :style="{ height: videoHeight }">
					<view class="mask" @tap="closeVideo" @touchmove="move"></view>
					<video id="myVideo" :src="videoSource" controls :style="{width:changeWidth, height: changeHeight}"></video>
				</view>
			<!-- </block> -->
			<!-- 弹窗通知 -->
			
			<view class="Mask" v-if="isShowInform" @tap="handleShowInform(false)" @touchmove="move" >
				
			</view>
			<view class="inform" v-if="isShowInform">
				<view class="inf_icon">
					
				</view>
				<view class="inf_msg">
					<view class="title">
						名品采购告知书
					</view>
					<view class="content">
						<rich-text :nodes="purchaseTips.content"></rich-text>
					</view>
					<view class="btn" @tap="handleShowInform(false)">我已了解</view>
				</view>
			</view>
	</view>
</template>

<script>
import famousBrandList from '@/components/famousBrand-list/famousBrand-list.vue';
import buyPopup from '@/components/buy-popup/buy-popup.vue';

export default {
	components: {
		famousBrandList,
		buyPopup
	},
	data() {
		return {
			isRetrieveData: false,
			categoryList: [],
			tipsText:'',
			isFixed: false,
			brandClassifyHeight: 0,
			cardCur: 0,
			carouselList: [],
			brandInfo: [],
			brandList: [],
			onlyImg: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg',
			dotStyle: false,
			towerStart: 0,
			direction: '',
			arrTxt: ['正品保证', '一般贸易', '中文标签'],
			goodsList:[],
			showCart:false,
			showVideo:false,
			videoSource:'',
			page:1,
			pageSize:10,
			// 分类列表中的title下标
			categoryIndex:0,
			// 判断每次请求的title ID是否一样
			categoryId:'',
			middleSmallSample:0,
			 videoHeight: 1000,
			isShowInform:false,
		};
	},
	onLoad() {
		console.log('onload');
		uni.pageScrollTo({ scrollTop: 0, duration: 0 });
		let res = uni.getSystemInfoSync();
		// this.scrollHeight = res.windowHeight;
		this.videoHeight = res.windowHeight;
	},
	onShow() {
			uni.pageScrollTo({ scrollTop: 0, duration: 0 });
		console.log('onshow');
		if (!this.isRetrieveData) {
				this.getFamousIndex();
				this.getFamousBrandTitle()

		}
	},
	onHide() {
		console.log('onHide');
	},
	onUnload() {
		console.log('onUnload');
	},
	onReady() {
		console.log('onready');
// 		let Obs = uni.createIntersectionObserver()
// 		Obs.relativeTo('.banner',{bottom: 100}).observe('.brandClassify', (res) => {
//   console.log(res,'重新获取');
// })
	
	// const query = uni.createSelectorQuery();
	// query.select('.brandClassify').boundingClientRect();
	// query.exec(res => {
	// 	this.brandClassifyHeight = res[0]&&res[0].top;
	// });
	},
	onPageScroll(res) {
		if (res.scrollTop > this.brandClassifyHeight>0 && this.isFixed) {
			return false;
		} else if (res.scrollTop > this.brandClassifyHeight>0 && !this.isFixed) {
			this.isFixed = true;
		} else {
			this.isFixed = false;
		}
		// console.log(res)
	},
	onReachBottom(){
				if(!this.listRequestLock){
					let page = this.page
					let middleSmallSample =this.middleSmallSample
					let categoryId = this.categoryId
					this.getFamousBrandList({page:page+1,pageSize:this.pageSize,middleSmallSample,categoryId})
				}
		console.log('触底',this.page = this.page+1)
		
	},
	methods: {
		handleJumpTo(data, type) {
			console.log(data, type);
			switch (type) {
				case 'url':
					this.$api.goNavigateTo(data);
					break;
				case 'id':
					if (!data) return false;
					let url = `/pages/goods/brandDetail/brandDetail?brandId=${data}`;
					this.$api.goNavigateTo(url);
					break;
				default:
				this.$api.goNavigateTo(`/pages/goods/product/product?goodsId=${data}`);
					break;
			}
		},
		cardSwiper(e) {
			this.cardCur = e.detail.current;
		},

		async getFamousIndex() {
			try {
				let res = await this.$api.request({
					url: this.$api.famous_brand
				});
				console.log(res, this);

				if (res.code == 0) {
					let Data = res && res.data;
					//对banner上的价格做处理了
					let carouselList = Data.carouselList;
					carouselList = this.$api.split_price(carouselList, 'goodsPrice');
					Data.carouselList = carouselList;
					carouselList = null;

					//对品牌logo数据格式做处理
					let brandList = res.data.brandList;
					if (brandList.length % 2) {
						brandList.push({
							brandId: '',
							imgUrl: ''
						});
					}
					console.log(brandList, 'brandList');
					let temp_brandList = this.split_array(brandList, 2);
					console.log(temp_brandList, 'temp_brandList');
					Data.brandList = temp_brandList;
					temp_brandList = null;
					//对甄选名品里的数据数据价格格式做处理
					let brandInfo = res.data.brandInfo;
					let temp_brandInfo = brandInfo.map(item => {
						item.goodsList = this.$api.split_price(item.goodsList, 'goodsPrice', 'goodsInfo');
						return item;
					});
					Data.brandInfo = temp_brandInfo;
					temp_brandInfo = null;
					
					//判断用户是否是第一次进入 弹告知书
					   if (Data.purchaseTips&&Data.purchaseTips.isRead == 0) {
							this.handleShowInform(true)
						   }	   
					Object.keys(Data).map(key => {
						this[key] = Data[key];
					});
					setTimeout(()=> {
						const query = uni.createSelectorQuery();
						query.select('.brandClassify').boundingClientRect();
						query.exec(res => {
							this.brandClassifyHeight = res[0]&&res[0].top;
						});
					}, 700);
		
					this.isRetrieveData = true;
				} else {
					this.isRetrieveData = false;
				}
			} catch (e) {
				this.isRetrieveData = false;
			}
		},
		async getFamousBrandTitle() {
			let res = await this.$api.request({
				url: this.$api.famous_category_list
			});
			console.log(res)
			if(res&&res.data){
				this.categoryList = res.data.categoryList
				this.tipsText = res.data.tipsText
				this.getFamousBrandList()
			}
			
		},
		async getFamousBrandList(params={pageSize:10,page:1,catId:'all'}) {
			
			try{
				let res = await this.$api.request({
					url: this.$api.famous_goods_List,
					data:params
				});
				if(res&&res.data){
					
					let goodsList = res.data.goodsList
					// 请求锁开关
					this.listRequestLock= goodsList.length<this.pageSize? true:false
					
					let	temp_goodsList = this.$api.split_price(goodsList, 'goodsPrice', 'goodsInfo');
					console.log(temp_goodsList)
					
						if(this.categoryId == params.catId){
						this.goodsList = this.goodsList.concat(...temp_goodsList)
					}else{
						this.goodsList =temp_goodsList
					}
					this.page = params.page
					this.categoryId = params.catId
					console.log(this.goodsList,'this.goodsList')
					temp_goodsList =null
				}
			}catch(e){
				
			}

		},
		// 快速切分数组 arr切分的数组 len 每份有几个
		split_array(arr, len) {
			var result = [];
			for (var i = 0; i < arr.length; i += len) {
				result.push(arr.slice(i, i + len));
			}
			console.log(result, '处理过后的数组');
			return result;
		},

		// 点击拉取购物车弹窗
		handleAddCart(item) {
			console.log(item)
			this.cart_goodInfo = item;
			this.showCart = true;

		},
		//关闭购物车弹窗
		closeCart() {
			this.showCart = false;
		},
		async addCart(data) {
			let that = this;
			let res = await this.$api.request({
				method: 'POST',
				header: true,
				url: this.$api.cartAdd,
				data: data
			});
			if (res.code == 0 && res.data) {
				this.$store.commit('updateCart', res.data.totalCount);
			}
			this.closeCart();
			this.$api.showMessage(res.msg);
			this.$api.getTabbarCart(res.data.totalCount);
		},
		handleTitle(catId,type='',index='-1'){
			console.log(catId,'+++',type,'++++1',index)
			let params = {}
			type =='sample'?params.middleSmallSample=1:params.catId = catId
			this.categoryIndex = index
			this.middleSmallSample = type =='sample'?1:0;
			this.categoryId = catId
			params.page = 1
			params.pageSize=this.pageSize
			this.getFamousBrandList(params)
		},
		//视频事件
		handleShowVideo(url,videoWidth,videoHeight){
			// this.$nextTick(function(){
				this.videoSource = url
				console.log(videoWidth,videoHeight,'videoWidth,videoHeight')
    var changeWidth = '';
    var changeHeight = '';
    if (videoWidth > videoHeight) {
      if (videoWidth == 750) {
        changeWidth = videoWidth;
        changeHeight = videoHeight;
      } else {
        changeWidth = 750;
        changeHeight = 750 / (videoWidth / videoHeight)
      }

    } else {
      if (videoHeight == 750) {
        changeHeight = videoHeight;
        changeWidth = videoWidth;
      } else {
        changeHeight = 750;
        changeWidth = (videoWidth / videoHeight) * 750
      }

    }
	console.log(uni.upx2px(170),uni.upx2px(changeWidth),'uni.upx2px(changeWidth)')
	this.changeWidth=uni.upx2px(changeWidth)
	this.changeHeight=uni.upx2px(changeHeight)		
	// })
			console.log(this.videoSource,'视频数据')
			this.videoPlay()
			
		},
		   videoPlay() {
			   console.log(this.videoSource,'视频事件执行')

		    this.showVideo = true;
		    this.videoContext = uni.createVideoContext('myVideo');
		    setTimeout(() => {
		        if (this.videoContext) this.videoContext.play();
		    }, 500);
		},
		closeVideo() {
		    if (this.videoContext) {
		        this.videoContext.pause();
		    }
		    // this.videoContext = null;
		    this.showVideo = false;
		},
		move(){
			return false;
		},
		//告知书弹窗事件
		handleShowInform(is){
			this.isShowInform=is
		}, 
		//methods底部
	}
};
</script>

<style lang="less">
@import url('famousBrand.less');
.video-page-container {
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	background: rgba(0, 0, 0, 0.8);
	z-index: 22;

	.mask {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: 2;
	}

	#myVideo {
		width: 100%;
		height: 300px;
		position: absolute;
		z-index: 5;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
	}
}

/* #ifdef H5 */
.video-page-container {
	top: 44px;
}
/* #endif */
</style>
