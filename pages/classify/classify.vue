<template>
	<view class="category_wrap isChecklogin" :class="[access_token ? 'show' : '']">
		<view class="searchPart">
			<view class="search">
				<text class="search-icon"></text>
				<input type="text" placeholder="采购商品、品牌" v-model="keywords" @focus="focusIn" />
			</view>
		</view>
		<!-- <view class="part-empty"></view> -->
		<view class="categoryCon">
			<view class="category_tab">
				<view class="ul">
					<view class="li" v-for="(itemcate, index) in leftCateLists" :key="index" :class="[isActive == index ? 'tabactive' : '']" @tap="tabProduct(index, itemcate.url)">
						{{ itemcate.title }}
					</view>
				</view>
			</view>

			<view class="category_content">
				<view v-if="showCate < 1">
					<scroll-view class="cate-scroll" :style="{ height: brandHeight + 'px' }" @scroll="onscroll" scroll-y="true" :scroll-top="scrollTop">
						<view class="pingku">
							<view class="pingkuCon">
								<!-- 字母列表 -->
								<view class="sortByName" v-show="sortByNameShow" :style="{ top: soreBottom + 'px' }">
									<view class="li itemSort" v-for="(name, index) in names" :key="index" @tap="isChoseName(name, index)" :class="{ isActive: isCurrent == index }">
										{{ name }}
									</view>
								</view>
								<view v-if="hideName" class="itemSortName">
									<text>{{ currentName }}</text>
								</view>

								<!-- 热门品牌 -->
								<view class="hotpaiHead"><text>热门品牌</text></view>
								<view class="pk-hotList">
									<view class="image-list">
										<view class="image-line" v-for="(itemHot, itemHotKey) in hotpingpais" :key="itemHotKey" @tap="goDetail(itemHot.brandId)">
											<image class="hotImag" :src="itemHot.img" mode=""></image>
										</view>
									</view>
								</view>

								<!-- 最新入驻 -->
								<view class="hotpaiHead"><text>最新入驻</text></view>
								<view class="pk-hotList">
									<view class="image-list">
										<view class="image-line" v-for="(itemnew, itemnewKey) in newpingpais" :key="itemnewKey" @tap="goDetail(itemnew.brandId)">
											<image class="hotImag" :src="itemnew.img" mode=""></image>
										</view>
									</view>
								</view>

								<!-- 全部品牌 -->
								<view class="hotpaiHead"><text>全部品牌</text></view>
								<view class="pk-allPing">
									<view class="oneCategory" v-for="(itempingpai, key) in allpinpais" :key="key">
										<view class="sort" :id="key">{{ key }}</view>
										<view class="pingList" v-for="onepinpai in itempingpai" :key="onepinpai.brandId" @tap="goDetail(onepinpai.brandId)">
											<view class="pingLeft"><image class="logo-type pingLeftImag" :src="onepinpai.img" mode=""></image></view>
											<view class="pingRight">
												<text>{{ onepinpai.title }}</text>
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>

				<!-- 其他分类 -->
				<view class="cateAll" v-for="(itemcate, index1) in RightCateLists" :key="index1">
					<view class="cat_cate_list">
						<view class="list_head">{{ itemcate.title }}</view>
						<view class="product">
							<view class="ul">
								<view class="li" v-for="(oneCate, index3) in itemcate.catList" @tap="goProList(oneCate.catId)" :key="index3">
									<image class="image" :src="oneCate.img" mode=""></image>
									<view class="text">{{ oneCate.title }}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
// import pingku from './pingku.vue';
import { userValidateLogin2 } from '@/common/auth.js';
let timer = null,
	scrollTop = 0;
export default {
	components: {
		// pingku
	},
	data() {
		return {
			scrollTop: 0,
			old: {
				scrollTop: 0
			},
			showCate: 0,
			isActive: 0,
			leftCateLists: [],
			RightCateLists: [],
			sTop: false,
			keywords: '',
			names: [],
			// 字母列表
			currentName: 'A',
			isCurrent: -1,
			oneItem: false,
			hideName: false,
			//
			allpinpais: [],
			newpingpais: [],
			hotpingpais: [],
			view: false,
			sortByNameShow: true,
			access_token: '',
			//
			brandHeight: 1000,
			soreBottom: 50
		};
	},
	onLoad() {
		let that = this;
		let _system = uni.getSystemInfoSync();
		this.soreBottom = _system.windowTop + uni.upx2px(60) + uni.upx2px(88);
		this.brandHeight = _system.windowHeight - uni.upx2px(88);
		uni.showNavigationBarLoading();
		userValidateLogin2(function() {
			that.access_token = uni.getStorageSync('access_token') || '';
			that.cateListpaiData();
			that.getpingpaiApi();
		});
	},
	onShow() {},
	methods: {
		tabProduct(index, url) {
			if (index > 0) {
				this.isCurrent = -1;
				this.RightCateLists = [];
			}
			this.showCate = index;
			this.isActive = index;
			this.cateViewpaiData(url);
		},
		//跳到商品列表
		goProList(catIdList) {
			let _url = `../goods/list/list?catIdList=${catIdList}`;
			this.$api.goNavigateTo(_url);
		},
		focusIn() {
			let _url = this.keywords ? `../search/search?keywords=${this.keywords}` : '../search/search';
			this.$api.goNavigateTo(_url);
		},
		// 左边列表
		async cateListpaiData() {
			let vm = this;
			let res = await this.$api.request({
				url: this.$api.cateListpai
			});
			if (res && res.data) {
				vm.leftCateLists = res.data.categoryList;
			}
		},
		// 右边列表
		async cateViewpaiData(url) {
			let vm = this;
			let res = await this.$api.request({ url: url, loading: true });
			if (res && res.data) {
				vm.RightCateLists = res.data.groupList;
			}
		},
		onscroll(e) {
			let vm = this;
			scrollTop = e.detail.scrollTop;
			let view = uni.createSelectorQuery().selectAll('.sort');
			view.boundingClientRect(data => {
				let topArr = data.map(item => item.top - uni.upx2px(88));
				if (topArr[0] > 0) {
					return (vm.isCurrent = -1);
				}
				let index = topArr.findIndex(i => i >= 0);
				topArr[index] == 0 ? (vm.isCurrent = index) : (vm.isCurrent = index - 1);
			}).exec();

			//节流的方法
			// if (timer) {
			// 	clearTimeout(timer);
			// }
			// let vm = this;
			// timer = setTimeout(() => {
			// 	let view = uni.createSelectorQuery().selectAll('.sort');
			// 	view.boundingClientRect(data => {
			// 		let topArr = data.map(item => item.top - uni.upx2px(88));
			// 		if (topArr[0] > 0) {
			// 			return (vm.isCurrent = -1);
			// 		}
			// 		let index = topArr.findIndex(i => i >= 0);
			// 		topArr[index] == 0 ? (vm.isCurrent = index) : (vm.isCurrent = index - 1);
			// 	}).exec();
			// }, 300);
		},
		isChoseName(name, index) {
			this.currentName = name;
			this.isCurrent = index;
			this.oneItem = true;
			this.hideName = true;
			this.hideItemName();
			let vm = this;
			// 不能缓存，滑动的时候top时刻在变
			let view = uni.createSelectorQuery().selectAll('.sort');
			view.boundingClientRect(data => {
				let target = data.find(item => item.id == name);
				vm.scrollTop = target.top - uni.upx2px(88) + scrollTop;
			}).exec();
		},
		// 去品牌页
		goDetail(id) {
			this.$api.goNavigateTo(`../goods/brandDetail/brandDetail?brandId=${id}`);
		},
		hideItemName() {
			setTimeout(() => {
				this.hideName = false;
				// this.isCurrent = -1;
			}, 1000);
		},
		//获取品牌库的数据
		async getpingpaiApi() {
			let vm = this;
			let res = await this.$api.request({
				url: this.$api.catoPingpai
			});
			if (res && res.data) {
				vm.allpinpais = res.data.brandGroup;
				vm.newpingpais = res.data.newBrandList;
				vm.hotpingpais = res.data.hotBrandList;
				vm.names = Object.keys(res.data.brandGroup);
			}
		}
	}
};
</script>

<style lang="less" scoped>
@import url('less/category.less');
@import url('less/pingku.less');
.cate-scroll {
	height: 1100upx;
}
</style>
