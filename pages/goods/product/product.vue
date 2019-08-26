<template>
	<view class="productDetial">
		<!-- <scroll-view :style="{ height: scrollHeight + 'px' }" :scroll-y="scrollY" :scroll-top="scrollBox" @scroll="scrollView"> -->
		<view class="productDetialCon">
			<!--
				<view class="orderList">
					<view class="lastCon" :class="{ anim: animate == true }">
						<view class="itemOrder" v-for="(orderItem, index) in lastOrderInfo" :key="index">
							<text class="icon"></text>
							<text class="textDesc">{{ orderItem }}</text>
						</view>
					</view>
				</view> 
				-->

			<!-- 轮播 -->
			<view class="slideImg" id="headTop">
				<view class="uni-padding-wrap">
					<view class="page-section swiper">
						<view class="page-section-spacing">
							<swiper class="swiper" @change="slideImgChange" :autoplay="true" :interval="5000" :duration="500" :circular="true" indicator-active-color="#ff3366">
								<swiper-item v-if="allproductArr.video">
									<view class="swiper-item">
										<view class="playVideo" @tap="posterClick"></view>
										<image class="image" :src="allproductArr.videoFace"></image>
									</view>
								</swiper-item>
								<swiper-item v-for="(item, index) in swiperImgArr.src" :key="index">
									<view class="swiper-item" v-if="swiperImgArr.type == 'img'">
										<image class="image" :src="item" mode="" @tap="preview(swiperImgArr.src, item)"></image>
									</view>
								</swiper-item>
							</swiper>
						</view>
					</view>
				</view>
				<view v-if="swiperImgArr.type == 'img'" class="dot">
					<dot :isVideo="Boolean(allproductArr.video)" :index="current" :total="allproductArr.video ? swiperImgArr.src.length + 1 : swiperImgArr.src.length"></dot>
				</view>
			</view>

			<!-- 聚划算显示 -->
			<view class="active-box juhusua" v-if="status.isJuHuaSuan">
				<view class="view-box">
					<view class="left">
						<view class="prize">
							<text class="sbtext">￥</text>
							<view class="number">{{ big }}</view>
							<view class="mantissa">{{ min }}</view>
						</view>
						<view class="saveMoney">
							<view class="num">{{ allproductArr.startNum }}{{ allproductArr.unit }}起批</view>
							<view class="money">
								<text>省</text>
								<text>￥{{ allproductArr.savePrice }}</text>
							</view>
						</view>
					</view>
					<view class="right">
						<view class="dateTitle">截止日期</view>
						<view class="dateText">{{ allproductArr.activityEndTime }}</view>
					</view>
				</view>
			</view>

			<!-- 秒杀显示	 -->
			<view class="active-box miaosha" v-cloak v-if="getProductSale">
				<view class="view-box">
					<view class="left" v-if="status.isFlashSale">
						<!-- 开始秒杀 -->
						<view class="prize">
							<text class="sbtext">￥</text>
							<view class="number">{{ big }}</view>
							<view class="mantissa">{{ min }}</view>
						</view>
						<view class="saveMoney">
							<view class="num">{{ allproductArr.startNum }}{{ allproductArr.unit }}起批</view>
							<view class="money">
								<text>省</text>
								<text>￥{{ allproductArr.savePrice }}</text>
							</view>
						</view>
					</view>
					<view class="left un-sale" v-else-if="status.isNotStartFlashSale">
						<!-- 未开始秒杀 -->
						<view class="un-flashtitle">限时秒杀</view>
						<view class="un-flashsale">
							<text class="sbtext">￥</text>
							<text class="un-number">???</text>
						</view>
					</view>
					<view class="right">
						<view class="dateTitle">{{ status.isNotStartFlashSale ? '距开始还有' : '秒杀倒计时' }}</view>
						<view class="dateText">
							<text class="hour">{{ hour }}</text>
							:
							<text class="mini">{{ minute }}</text>
							:
							<text class="sec">{{ seconds }}</text>
						</view>
					</view>
				</view>
			</view>

			<!-- vip显示 -->
			<view class="isVip" v-if="status.isVip">
				<view class="vip-body">
					<view class="price-box">
						<text class="ident">￥</text>
						<view class="number">{{ big }}</view>
						<view class="mantissa">{{ min }}</view>
					</view>
					<view class="sp-price">
						<view class="save-price">省￥{{ allproductArr.savePrice }}</view>
						<view class="pt-price">平台价￥{{ allproductArr.shopPrice }}</view>
					</view>
				</view>
			</view>
			<block v-if="status.isSuperPkg">
				<!-- 套餐	 -->
				<view class="active-box taocanPrice">
					<view class="view-box">
						<view class="left">
							<view class="prize">
								<text class="sbtext">￥</text>
								<view class="number">{{ big }}</view>
								<view class="mantissa">{{ min }}</view>
							</view>
							<view class="saveMoney">
								<view class="num">{{ allproductArr.discount }}折</view>
								<view class="money">
									<text>省</text>
									<text>￥{{ allproductArr.savePrice }}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</block>

			<!-- searchBar定位 -->
			<view class="tabChose" id="searchBar" :class="searchBarFixed == true ? 'isFixed' : ''">
				<view class="stright" @tap="tabtype('1', 'headTop')"><text :class="{ tabActive: isdetial == 1 }">直发</text></view>
				<view class="detial" @tap="tabtype('2', 'detialCon')"><text :class="{ tabActive: isdetial == 2 }">详情</text></view>
			</view>

			<!-- 直发 -->
			<block v-if="showSimplezhifa">
				<view class="banner-prizeShow">
					<view class="left_prize">
						<view class="prize">
							<text class="sbtext">￥</text>
							<view class="number">{{ big }}</view>
							<view class="mantissa">{{ min }}</view>
						</view>
						<text class="discount">{{ allproductArr.discount }}折</text>
					</view>
					<view class="startPrize">建议零售价:￥{{ allproductArr.marketPrice }}</view>
				</view>
			</block>

			<!-- 商品名称 -->
			<view class="proTitle">
				<view class="titleText">
					<text class="zhifa" v-if="addCartList.isZhifa">直发</text>
					<text class="textDesc">{{ allproductArr.goodsName }}</text>
				</view>
				<view class="productNum">
					<view class="leftNum">库存 {{ allproductArr.goodsNumber }}</view>
					<view class="middleNum">销量 {{ allproductArr.saleCount }}</view>
					<view class="rightNum" v-if="allproductArr.expireDate">效期 {{ allproductArr.expireDate }}</view>
				</view>
			</view>

			<!-- 活动标签 -->
			<!-- <template v-if="status.isZhiFa && !status.isSuperPkg && !status.isJuHuaSuan && !status.isVip && !status.isNotStartFlashSale && !status.isFlashSale"> -->
			<view class="pro-activeevent" v-if="activityInfo.length > 0 || eventList.length > 0">
				<view class="zhifawuliao" v-if="activityInfo.length > 0">
					<view class="wuliao" style="background: #fdf2f8;" v-for="(item, eventKey) in activityInfo" :key="eventKey" @tap="showPop('activityInfoPopup', item.tag)">
						<view class="wuliao_Con icon_pro_arrow">
							<view class="wuliao_Left">
								<text class="activeIcon" :class="item.type" v-if="item.type != 'cutPrice'">{{ item.tag }}</text>
								<text
									class="activeIcon"
									:class="item.type"
									v-if="item.type == 'cutPrice'"
									style="background: #ff3366;padding:4upx 8upx;border-radius:6upx;color: #fff;"
								>
									直降
								</text>
								<text class="wuliaoText">{{ item.title }}</text>
							</view>
						</view>
					</view>
				</view>
				<view class="zhifawuliao" v-if="eventList.length > 0">
					<view class="wuliao" style="background: #fff7e8;" v-for="(item, eventKey) in eventList" :key="eventKey">
						<view class="wuliao_Con icon_pro_arrow" v-if="item.type == '优惠券'" @tap="showPop('couponPopup')">
							<view class="wuliao_Left">
								<text class="wuliaoTag" :style="{ backgroundColor: item.tagColor }">领券</text>
								<text class="wuliaoText">{{ item.desc }}</text>
							</view>
						</view>
						<view class="wuliao_Con icon_pro_arrow" v-else-if="item.type != '优惠券'" @tap="showPop('wuliaoPopup', item.tag)">
							<view class="wuliao_Left">
								<text class="wuliaoTag" :style="{ backgroundColor: item.tagColor }">{{ item.tag }}</text>
								<text class="wuliaoText">{{ item.desc }}{{ item.desc }}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- </template> -->

			<!-- 地址 -->
			<view class="sameAddress icon_pro_arrow addressPro" @tap="showMulLinkageThreePicker()">
				<view class="Addressleft">
					<view class="proAddress">
						<text class="sendWhere">送至</text>
						<text class="speciaAddress pro_address">{{ proviceName }}</text>
					</view>
					<view class="proAddress">
						<text class="sendWhere">包邮</text>
						<text class="speciaAddress">{{ shippingDesc ? shippingDesc : allproductArr.shippingInfo }}</text>
					</view>
				</view>
			</view>

			<!-- 规格 -->
			<view class="sameAddress icon_pro_arrow scalePro" @tap="showPop('rulesPopup')">
				<view class="Addressleft">
					<view class="proAddress">
						<text class="sendWhere">规格</text>
						<view class="speciaAddress proArrList">
							<text class="" v-for="(item, index) in allproductArr.skuSizeList" :key="index">{{ item }}；</text>
						</view>
					</view>
				</view>
			</view>

			<!-- 非套餐显示 -->
			<block v-if="!status.isSuperPkg">
				<!-- 参数 -->
				<view class="sameAddress icon_pro_arrow proDate" @tap="showPop('paramsPopup')">
					<view class="Addressleft">
						<view class="proAddress">
							<view class="sendWhere"><view class="sp icon_arguments"></view></view>
							<text class="speciaAddress">{{ attributes.brandName }}</text>
						</view>
						<view class="proAddress">
							<text class="sendWhere">参数</text>
							<text class="speciaAddress">效期：{{ attributes.expireDate }} 条形码:{{ attributes.goodsSn }}</text>
						</view>
					</view>
				</view>
			</block>

			<!-- 正品行货 -->
			<view class="sameAddress icon_pro_arrow proQuaity" @tap="showPop('servicePopup')">
				<view class="Addressleft">
					<view class="sp icon_ok line">正品行货</view>
					<view class="sp icon_ok line">物流补贴</view>
					<view class="sp icon_ok line">七天退换</view>
				</view>
			</view>

			<!-- 当商品是套餐的时候出现 -->
			<block v-if="status.isSuperPkg && pkgList.length > 0">
				<view class="pro-taocan">
					<view class="taocanHead">套餐详情</view>
					<view class="tancanCon">
						<view class=" brandList" v-for="(item, index) in pkgList" :key="index">
							<view class="brand-item" @tap="gocurrentPage(item.goodsId)">
								<view class="brand-item__img"><image class="image" :src="item.goodsThumb" mode=""></image></view>
								<view class="brand-item__right">
									<text class="brand-item__right_title">{{ item.goodsName }}</text>
									<view class="brand-item__right_foot">
										<view class="brand-item__right_foot_price">
											<text class="brand-item__right_foot_price_ident">¥</text>
											<text class="brand-item__right_foot_price_number">{{ item.price }}</text>
										</view>
										<text class="discount">建议零售价 {{ item.marketPrice }}</text>
										<view class="cartCon">X{{ item.num }}</view>
									</view>
								</view>
							</view>
						</view>
						<view class="pro-taocan-price">
							<text class="num">共 {{ allNum }} 件商品</text>
							<text class="prize">
								共计
								<text class="iconMoney">￥</text>
								{{ allproductArr.price }}
							</text>
							<text class="saveMoney">省￥{{ allproductArr.savePrice }}</text>
						</view>
					</view>
				</view>
			</block>

			<block v-if="!status.isSuperPkg">
				<!-- 市场 -->
				<market :marketSuggest="marketSuggest" :marketComment="marketComment" :allproductArr="allproductArr"></market>

				<!-- 店名 -->
				<view class="pro-shopName">
					<view class="shopNameCon">
						<view class="shopLeft">
							<view class="shopImg"><image class="logo-type image" :src="brand.logo" mode="widthFix"></image></view>
							<view class="shopDesc">
								<view class="name">{{ brand.brandName }}</view>
								<view class="shopNum">
									<text class="numText">{{ brand.goodsCount }}件商品</text>
									<text class="descText">{{ brand.desc }}</text>
								</view>
							</view>
						</view>
						<view class="shopRight"><text class="brand-btn" @tap="goBrandPage(brand.brandId)">查看品牌</text></view>
					</view>
				</view>

				<!-- 相关搭配 -->
				<view class="aboutOther" v-if="linkGoods.length > 0">
					<view class="ablutOtherCon">
						<view class="aboutHead">相关搭配</view>
						<view class="otherList">
							<scroll-view class="scroll-view_H" scroll-x="true">
								<view class="scroll-view-item_H" v-for="(huadong, index) in linkGoods" :key="index" @tap="toGoodsDetail(huadong.goodsId)">
									<view class="imgView"><image :src="huadong.thumb" mode=""></image></view>
									<view class="otherPrize">￥{{ huadong.price }}</view>
								</view>
							</scroll-view>
						</view>
					</view>
				</view>
			</block>

			<!-- 图片展示区 -->
			<view class="imgAllShow" id="detialCon">
				<view class="imgAllCon">
					<view class="imgCon">
						<image
							v-for="(oneImg, index) in allproductArr.goodsDesc"
							:key="index"
							:src="oneImg"
							@tap="preview(allproductArr.goodsDesc, oneImg)"
							mode="widthFix"
							class="image"
						></image>
					</view>
				</view>
			</view>

			<!-- 常见问题 -->
			<view class="question"><question></question></view>

			<!-- 已经到底了 -->
			<text class="lock-end">已经到底了</text>

			<!-- 加入购物车模块 -->
			<block v-if="getSurpAzf">
				<view class="addTocart">
					<!-- <view class="addTocartCon"> -->
					<view class="cartLeft">
						<view class="nav-view">
							<view class="nav-view-cell toIndex" @tap="goPage(1)">
								<view class="pro_icon icon_home"></view>
								<text class="text">首页</text>
							</view>
							<view class="nav-view-cell toCart" @tap="goPage(2)">
								<view class="pro_icon icon_cart"><uni-badge :text="cartNumber" type="error" :inverted="false" styles="pros" ntype="true"></uni-badge></view>
								<text class="text">采购车</text>
							</view>
							<view class="nav-view-cell toBrand" @tap="goBrandPage(brand.brandId)">
								<view class="pro_icon icon_brand"></view>
								<text class="text">品牌主页</text>
							</view>
						</view>
					</view>
					<view class="cartRight" @tap="showPop('rulesPopup')"><view class="button" style="background: #FF3366;">加入采购车</view></view>
					<!-- </view> -->
				</view>
			</block>
			<block v-if="status.isJuHuaSuan || status.isVip">
				<view class="addTocart btn_two">
					<!-- <view class="addTocartCon btn_two"> -->
					<view class="cartLeft">
						<view class="nav-view">
							<view class="nav-view-cell toIndex" @tap="goPage(1)">
								<view class="pro_icon icon_home"></view>
								<text class="text">首页</text>
							</view>
							<view class="nav-view-cell toCart" @tap="goPage(2)">
								<view class="pro_icon icon_cart"><uni-badge :text="cartNumber" type="error" :inverted="false" styles="pros" ntype="true"></uni-badge></view>
								<text class="text">采购车</text>
							</view>
						</view>
					</view>
					<view v-if="status.isJuHuaSuan" class="cartRight" @tap="showPop('rulesPopup')">
						<view v-if="status.isJuHuaSuan" class="button" style="background: #FFE339;color: #FF3366;">加入采购车</view>
						<view v-else-if="status.isVip" class="button" style="background: #271D1E;color: #FAEAC4;">加入采购车</view>
					</view>
					<!-- </view> -->
				</view>
			</block>
			<block v-if="getFaleModel">
				<view class="addTocart btn_two">
					<view class="cartLeft">
						<view class="nav-view">
							<view class="nav-view-cell toIndex" @tap="goPage(1)">
								<view class="pro_icon icon_home"></view>
								<text class="text">首页</text>
							</view>
							<view class="nav-view-cell toCart" @tap="goPage(2)">
								<view class="pro_icon icon_cart"><uni-badge :text="cartNumber" type="error" :inverted="false" styles="pros" ntype="true"></uni-badge></view>
								<text class="text">采购车</text>
							</view>
						</view>
					</view>
					<view class="cartRight" @tap="showPop('rulesPopup')">
						<view v-if="status.isFlashSale" class="button" style="background: #FFE339;color: #FF3366;">立即采购</view>
						<view v-else-if="status.isSuperPkg" class="button" style="background: #FF3366;">加入采购车</view>
					</view>
				</view>
			</block>
		</view>
		<!-- </scroll-view> -->

		<!-- 购物车窗口 -->
		<block v-if="rulesPopup"><buy-popup :show="rulesPopup" @close="closeCart" :datas="addCartList" @sure="addCart"></buy-popup></block>

		<!-- 地址的弹框 -->
		<mpvueProvincePicker ref="mpvueProPicker" :themeColor="themeColor" :pickerValueDefault="cityPickerVal" @onConfirm="onConfirm"></mpvueProvincePicker>

		<!--活动套餐的弹框 -->
		<toast-popup :show="activityInfoPopup" :title="actTitle" @close="hidePop">
			<view class="wuliao-popup" v-for="(item, eventKey) in activityInfo" :key="eventKey">
				<view class="wuliao_Head">
					<text class="wuliaoTag" :style="{ backgroundColor: item.tagColor }" v-if="item.tag != ''">{{ item.tag }}</text>
					<!-- <text class="wuliaoText">{{ item.desc }}</text> -->
					<!-- <rich-text class="wuliaoText" :nodes="item.desc"></rich-text> -->
				</view>
				<view class="wuliao_Con" v-if="item.goodsList.length > 0">
					<view class="wuliao_List" v-for="(list, index) in item.goodsList" :key="index" @tap="toGoodsDetail(list.goodsId)">
						<view class="left">
							<image class="left_img" :src="list.thumb" mode=""></image>
							<text class="left_title">{{ list.goodsName }}</text>
						</view>
						<view class="right">￥{{ list.price }}</view>
					</view>
				</view>
			</view>
			<view class="active">
				<block v-for="(item, index) in activityInfo" :key="index"><view class="itemList" v-html="item.desc" v-if="item.goodsList.length == 0"></view></block>
			</view>
		</toast-popup>

		<!-- 物料的弹框 还没写完勿动-->
		<toast-popup :show="wuliaoPopup" title="活动专享" @close="hidePop">
			<view class="" v-for="(item, eventKey) in eventList" :key="eventKey">
				<block v-if="tagType == item.tag">
					<view class="wuliao_Head">
						<text class="wuliaoTag" :style="{ backgroundColor: item.tagColor }">{{ item.tag }}</text>
						<text class="wuliaoText">{{ item.desc }}</text>
					</view>
					<view class="wuliao_Con">
						<view class="wuliao_List" v-for="(list, index) in item.goodsList" :key="index" @tap="toGoodsDetail(list.goodsId)">
							<view class="left">
								<image class="left_img" :src="list.thumb" mode=""></image>
								<text class="left_title">{{ list.goodsName }}</text>
							</view>
							<view class="right">￥{{ list.price }}</view>
						</view>
					</view>
				</block>
			</view>
		</toast-popup>

		<!-- 优惠券弹框 -->
		<toast-popup :show="couponPopup" title="活动专享" :width="true" @close="hidePop">
			<view class="coupon-body">
				<scroll-view class="scroll-body" scroll-y="true"><coupon-list :list="coupon_list"></coupon-list></scroll-view>
			</view>
		</toast-popup>

		<!-- 参数的弹框 -->
		<toast-popup :show="paramsPopup" title="参数详情" @close="hidePop">
			<view class="params-box">
				<view class="params-line" v-for="item in attributes.detail" :key="item.title">
					<view class="label-title">{{ item.title }}</view>
					<view class="label-value">{{ item.value }}</view>
				</view>
			</view>
		</toast-popup>

		<!-- 七天退换弹框 -->
		<toast-popup :show="servicePopup" title="服务政策" @close="hidePop">
			<view class="service-box">
				<view class="serverList">
					<view class="sp icon_ok title">正品行货</view>
					<view class="detial"><text>原装进口，证件齐全，贴有中文背贴</text></view>
				</view>
				<view class="serverList">
					<view class="sp icon_ok title">物流补贴</view>
					<view class="detial"><text>小美诚品自有仓库的商品，商品标题中，带有【直发】前缀，称为“直发商品”，享有小美直发满额包邮的优惠。</text></view>
					<view class="detial"><text>（1）收货地址为广东、湖南、湖北、福建、广西、贵州、江西、浙江的订单，订单金额满2999元包邮，不足2999元收取物流费用20元；</text></view>
					<view class="detial">
						<text>
							（2）收货地址为云南、重庆、四川、陕西、山西、河北、宁夏、北京、天津、上海
							山东、江苏、安徽、河南的订单，订单金额满3999元包邮，不足3999元收取物流费用30元；
						</text>
					</view>
					<view class="detial">
						<text>（3）收货地址为新疆、西藏、青海、甘肃、内蒙、辽宁、吉林、黑龙江、海南的订单，订单金额满4999元包邮，不足4999元收取物流费用50元；</text>
					</view>
					<view class="detial"><text>特别说明：</text></view>
					<view class="detial"><text>以上邮费政策不支持自选物流，如需自选物流，请联系小美诚客服。</text></view>
					<view class="detial"><text>若不满足包邮条件，客户可以选择现付运费和到付运费。</text></view>
				</view>
				<view class="serverList">
					<view class="sp icon_ok title">七天退换</view>
					<view class="detial"><text>若出现错发、货不对版等任何货品问题，自收到产品7天内平台给予退换。</text></view>
				</view>
			</view>
		</toast-popup>

		<!-- 右下角浮标 -->
		<view class="foot-r-box users-foot">
			<!-- <view class="item" @click="showMobile"><view class="s842_icons s842_public_kefu"></view></view> -->
			<view class="item" v-if="showTop" @click="backToTop"><view class="s842_icons s842_public_top"></view></view>
		</view>

		<!-- 视频播放层 -->
		<!-- <block v-if="showVideo"> -->
			<view v-show="showVideo" class="video-page-container" :style="{ height: videoHeight }">
				<view class="mask" @tap="closeVideo"></view>
				<video id="myVideo" :src="source" controls></video>
			</view>
		<!-- </block> -->
	</view>
</template>

<script>
import { getEndTime } from '@/common/util.js';
import toastPopup from '@/components/toast-popup/toast-popup2.vue';
import buyPopup from '@/components/buy-popup/buy-popup.vue';
import question from './question.vue';
import market from '@/components/productDetial/market.vue';
import brand from '@/components/productDetial/brand.vue';
import mpvueProvincePicker from '@/components/mpvue-citypicker/mpvueProvincePicker.vue';
import dot from '@/components/dot.vue';
import couponList from '@/components/coupon-list/coupon-list.vue';
import uniBadge from '@/components/uni-badge/uni-badge.vue';
export default {
    components: { dot, toastPopup, buyPopup, question, market, brand, mpvueProvincePicker, couponList, uniBadge },
    data() {
        return {
            // 视频参数
            source: '',
            videoHeight: 1000,
            showVideo: false,
            videoContext: null,
            //
            showTop: false,
            // 页面参数
            scrollY: true,
            scrollBox: 0,
            scrollHeight: 1000,
            // 城市选择参数
            themeColor: '#FF3366',
            cityPickerVal: [0, 0, 0],
            current: 0,
            // 套餐设置
            allNum: 0,

            // 活动设置
            eventList: [],
            activityInfo: [],
            actTitle: '活动规则',
            activityInfoPopup: false,
            wuliaoPopup: false,
            couponPopup: false,

            // 地址更新
            proviceName: '',
            shippingDesc: '',

            // 大小价格
            big: 0,
            min: 0,
            //
            isdetial: 1,
            scrollTop: 0,
            searchBarFixed: false,
            rulesPopup: false,
            paramsPopup: false,
            servicePopup: false,
            goodsNum: 1,
            productId: '',
            allproductArr: {},
            swiperImgArr: [],
            addCartList: {},
            attributes: '',
            marketSuggest: '',
            spuList: '',
            goodsState: true,
            marketComment: [],
            pkgList: [],
            brand: {},
            linkGoods: [],
            status: {},

            searchBarTop: 0,
            goodsId: 0,
            userRank: '',
            popShow: false,

            day: 0,
            hour: 0,
            minute: 0,
            seconds: 0,
            countDownTime: null,
            // 定时器
            clock: null,
            clock2: null,
            clock3: null,
            animate: false,
            requestUrl: '',
            lastOrderInfo: [],

            imgAllTop: 0,
            // 优惠券
            coupon_list: [],
            // 模块判断
            showSimplezhifa: false,
            tagType: '',
            //
            hidden: false
        };
    },
    onLoad(params) {
        // params = { goodsId: 6429 };
        // 第一次加载锁定页面在最顶部
        uni.pageScrollTo({ scrollTop: 0, duration: 0 });
        let res = uni.getSystemInfoSync();
        this.scrollHeight = res.windowHeight;
        this.videoHeight = res.windowHeight;
        this.productId = params.goodsId;
        let url = '';
        if (params.goodsId) {
            url = `?goodsId=${params.goodsId}`;
        }
        if (params.userRank) {
            this.userRank = params.userRank;
            url = url + `&userRank=${params.userRank}`;
        }
        if (params.hidden) {
            this.hidden = true;
        }
        this.requestUrl = url;
        this.getDetialData(this.requestUrl);
        // this.showCoupon(this.productId)
    },
    onShow() {
        if (this.countDownTime) {
            this.startClock();
        }
        if (this.clock3) {
            clearInterval(this.clock3);
        }
        this.cartNumber = uni.getStorageSync('cartNumber');
        // this.clock3 = setInterval(this.scroll, 5000);
    },
    computed: {
        //
        getSurpAzf() {
            return (this.status.isSuperPkg && !this.hidden) || (this.showSimplezhifa && !this.hidden) || (this.status.isNotStartFlashSale &&
                !this.hidden);
        },
        getFaleModel() {
            return this.status.isFlashSale || this.hidden || (this.status.isSuperPkg || this.hidden);
        },
        // 是否秒杀商品
        getProductSale() {
            return this.status.isFlashSale || this.status.isNotStartFlashSale;
        }
    },
    methods: {
        backToTop() {
            uni.pageScrollTo({
                scrollTop: 0,
                duration: 10
            });
        },
        // 优惠券
        showCoupon(list) {
            this.getMacthCoupon(list);
        },
        async getMacthCoupon(list) {
            let vm = this;
            let res = await this.$api.request({
                method: 'POST',
                header: true,
                url: this.$api.coupon_matchcouponlist,
                data: {
                    goodsIdList: list
                },
                access_token: this.access_token
            });
            if (res.code == 0) {
                vm.coupon_list = res.data.couponList;
            }
        },

        slideImgChange(event) {
            this.current = event.detail.current;
        },
        scroll() {
            this.animate = true; // 因为在消息向上滚动的时候需要添加css3过渡动画，所以这里需要设置true
            setTimeout(() => {
                //  这里直接使用了es6的箭头函数，省去了处理this指向偏移问题，代码也比之前简化了很多
                this.lastOrderInfo.push(this.lastOrderInfo[0]); // 将数组的第一个元素添加到数组的
                this.lastOrderInfo.shift(); //删除数组的第一个元素
                this.animate = false; // margin-top 为0 的时候取消过渡动画，实现无缝滚动
            }, 500);
        },
        // 城市选择方法
        showMulLinkageThreePicker() {
            // 显示地址的选择
            this.$refs.mpvueProPicker.show();
        },
        async onConfirm(val) {
            let { label, cityCode } = val;
            this.proviceName = label.replace(/\-/g, '  ');
            let res = await this.$api.request({
                method: 'post',
                url: this.$api.goods_shipping_info,
                data: {
                    provinceId: cityCode,
                    goodsId: this.productId
                }
            });
            if (res.code == 0 && res.data) {
                this.shippingDesc = res.data.shippingDesc;
            }
        },
        //
        toGoodsDetail(goodsId) {
            let url = `./product?goodsId=${goodsId}`;
            this.$api.goNavigateTo(url);
        },
        // end
        showTips(message) {
            this.$api.showMessage(message);
        },
        tabtype(index, name) {
            this.isdetial = index;
            this.scrollBox = name == 'headTop' ? 0 : this.imgAllTop - uni.upx2px(88);
        },
        preview(urls, current) {
            uni.previewImage({
                current: encodeURI(current),
                indicator: 'number',
                urls: urls.map(item => encodeURI(item))
            });
        },
        closeCart() {
            this.scrollY = true;
            this.rulesPopup = false;
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
                let { totalCount } = res.data;
                that.$store.commit('updateCart', totalCount);
                this.cartNumber = totalCount > 99 ? '99+' : totalCount;
            }
            this.$api.showMessage(res.msg);
            this.closeCart();
        },
        // 显示类型弹层
        showPop(type, tag) {
            if (type == 'activityInfoPopup') {
                this.actTitle = tag ? '活动专享' : '活动规则';
            }
            if (type == 'couponPopup') {
                this.eventList.map(e => {
                    if (e.type == '优惠券') {
                        this.coupon_list = e.couponList;
                    }
                });
                // this.showCoupon(this.productId);
            }
            if (type == 'wuliaoPopup') {
                this.tagType = tag;
            }
            this.scrollY = false;
            this[type] = true;
        },
        // 关闭类型弹层
        hidePop() {
            this.scrollY = true;
            ['rulesPopup', 'paramsPopup', 'servicePopup', 'wuliaoPopup', 'couponPopup', 'activityInfoPopup'].map(e => {
                this[e] = false;
            });
        },
        // 跳首页
        goPage(urlPath) {
            let url = '../../index/index';
            if (urlPath == 2) {
                url = '../../cart/cart';
            }
            if (urlPath == 3) {}
            uni.switchTab({ url: url });
        },
        //跳到当前页面
        gocurrentPage(id) {
            this.$api.goNavigateTo(`./product?goodsId=${id}`);
        },
        goBrandPage(urlPath) {
            let _url = '../brandDetail/brandDetail?brandId=' + urlPath;
            this.$api.goNavigateTo(_url);
        },
        //获取商品详情参数
        async getDetialData(params) {
            let that = this;
            let res = await this.$api.request({
                method: 'GET',
                url: `${this.$api.getGoodsView}${params}`
            });
            if (res && res.data) {
                let {
                    status
                } = res.data;
                // 移除&& !status.isNotStartFlashSale  未开始以原价购买
                that.showSimplezhifa = status.isZhiFa && !status.isSuperPkg && !status.isJuHuaSuan && !status.isVip && !status.isFlashSale;

                let res1 = res.data;
                that.allproductArr = res1;
                // 视频播放控制源
                if (res.data.video) {
                    this.source = res.data.video;
                }

                // 解析商品价格为一大一小
                let _array = that.allproductArr.price.split('.');
                that.big = _array[0];
                that.min = '.' + _array[1];

                that.swiperImgArr = res1.gallery;
                that.countDownTime = res1.activityEndTime;
                if (this.countDownTime) {
                    this.startClock();
                }
                that.addCartList = res1.addCartList;
                that.proviceName = res1.defaultShippingProvince.provinceName;
                that.attributes = res1.attributes;
                that.marketSuggest = res1.marketSuggest;
                that.spuList = res1.addCartList.spuList;
                that.marketComment = res1.marketComment;
                that.brand = res1.brand;
                that.pkgList = res1.pkgList;
                that.linkGoods = res1.linkGoods;
                that.status = res1.status;
                that.lastOrderInfo = res1.lastOrderInfo;
                // 活动
                that.eventList = res1.eventList;
                that.activityInfo = res1.activityInfo;

                if (that.spuList && that.spuList.length > 0) {
                    for (var i = 0; i < that.spuList.length; i++) {
                        that.goodsNum = that.spuList[i].startNum;
                    }
                }
                for (var i = 0; i < that.pkgList.length; i++) {
                    that.allNum += parseInt(that.pkgList[i].num);
                }
                if (res1.activityEndTime && that.status.isFlashSale) {
                    that.startClock();
                }
            } else {
                uni.navigateBack({
                    delta: 1
                });
            }
        },
        startClock() {
            if (this.clock) {
                clearInterval(this.clock);
            }
            let time = this.countDownTime;
            this.getSetDownTime(time);
            this.clock = setInterval(() => {
                this.getSetDownTime(time);
            }, 1000);
        },
        getSetDownTime(val) {
            let end = getEndTime(val, 'all', true);
            let { day, hour, minute, seconds } = end;
            this.day = day;
            this.hour = hour;
            this.minute = minute;
            this.seconds = seconds;
        },
        posterClick() {
            let videoUrl = `../../video/video?source=${encodeURI(this.allproductArr.video)}`;
            // this.$api.goNavigateTo(videoUrl);
            this.videoPlay();
        },
        scrollView(event) {
            let _event = (event && event.detail) || event;
            let { scrollTop } = _event;
            this.pageTabbar(scrollTop);
        },
        pageTabbar(scrollTop) {
            if (scrollTop < this.searchBarTop && this.searchBarFixed) {
                // 锁定存在searchBar已经定位的情况下重置不再定位
                this.searchBarFixed = false;
                this.isdetial = 1;
            } else if (scrollTop > this.searchBarTop && this.searchBarTop > 1 && !this.searchBarFixed) {
                // 锁定存在searchBar非定位的情况下重置定位
                this.searchBarFixed = true;
                this.isdetial = 2;
            }
            // 返回顶部显示
            if (scrollTop > 600 && !this.showTop) {
                this.showTop = true;
            } else if (scrollTop < 600 && this.showTop) {
                this.showTop = false;
            }
        },
        clearPage() {
            if (this.clock) {
                clearInterval(this.clock);
            }
            if (this.clock2) {
                clearTimeout(this.clock2);
            }
            if (this.clock3) {
                clearInterval(this.clock3);
            }
            this.clock = null;
            this.clock2 = null;
            this.clock3 = null;
        },
        videoPlay() {
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
        }
    },
    onPageScroll(event) {
        this.scrollView(event);
    },
    onReady() {
        this.hidePop();
        let that = this;
        setTimeout(function() {
            if (that.imgAllTop < 1) {
                let view = uni.createSelectorQuery().selectAll('.imgAllShow');
                let tabbarView = uni.createSelectorQuery().selectAll('.tabChose');
                view.boundingClientRect(data => {
                    let _top = data && data[0] && data[0].top;
                    that.imgAllTop = _top;
                }).exec();
                tabbarView
                    .boundingClientRect(data => {
                        let _top = data && data[0] && data[0].top;
                        that.searchBarTop = _top;
                    })
                    .exec();
            }
        }, 700);
    },
    onUnload() {
        this.clearPage();
    },
    onHide() {},
    destory() {}
};
</script>


<style lang="less" scoped>
@import url('less/productDetial.less');

.video-page-container {
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	background: rgba(0, 0, 0, 1);
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
		left: 0;
		margin-top: -150px;
	}
}

/* #ifdef H5 */
.video-page-container {
	top: 44px;
}
/* #endif */

.orderList {
	overflow: hidden;
	height: 45upx;
	width: 100%;
	top: 20upx;
	position: absolute;
	z-index: 2;
	left: 40upx;
}

.lastCon {
	height: 2000upx;
	font-size: 30upx;

	.itemOrder {
		color: #fff;
		background: rgba(0, 0, 0, 0.5);
		width: 460upx;
		text-align: left;
		height: 45upx;
		line-height: 45upx;
		border-radius: 50upx;
		display: flex;
		align-items: center;

		.icon {
			margin-left: 10upx;
			width: 36upx;
			height: 38upx;
			display: block;
			background: url('~@/static/images/public/img_portrait.png') 0 2upx no-repeat;
			background-size: 100%;
			vertical-align: middle;
			margin-right: 10upx;
		}

		.textDesc {
			display: block;
			white-space: nowrap;
			width: 450upx;
			overflow: hidden;
			text-overflow: ellipsis;
			-o-text-overflow: ellipsis;
			font-size: 22upx;
		}
	}
}

.anim {
	transition: all 0.2s;
	margin-top: -45upx;
}

.users-foot {
	bottom: 100upx;
}

/* #ifdef H5 */
.users-foot {
	bottom: 100upx;
}
/* #endif */
</style>
