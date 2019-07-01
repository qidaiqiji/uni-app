<template>
	<view class="pingku">
		<view class="pingkuCon">
			<!-- 热门品牌 -->
			<view class="hotpaiHead"><text>热门品牌</text></view>
			<view class="sortByName" v-show="sortByNameShow">
				<view class="li itemSort" v-for="(name, index) in names" :key="index" @tap="isChoseName(name, index)" :class="{ isActive: isCurrent == index }">{{ name }}</view>
			</view>
			<view v-if="hideName" class="itemSortName">
				<text>{{ currentName }}</text>
			</view>
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
</template>

<script>
export default {
	data() {
		return {
			names: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'G', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
			isActive: '1',
			currentName: 'A',
			isCurrent: -1,
			oneItem: false,
			hideName: false,
			allpinpais: [],
			newpingpais: [],
			hotpingpais: [],

			view: false,

			sortByNameShow: true,
			access_token: '',
			// 锁定第一次点击点
			scrollPx: 0,
			// 锁定第二次点击点
			scrollPx2: 0,
			// 缓存坐标值
			isPx: false,
			pointerPx: {}
		};
	},
	mounted() {
		// v-show="view"
		this.access_token = uni.getStorageSync('access_token') || '';
		let userinfo = uni.getStorageSync('userinfo');
		// && userinfo && userinfo.is_checked == 2
		if (this.access_token) {
			this.view = true;
			this.getpingpaiApi();
		}
	},
	// onPageScroll(e) {
	//     let { scrollTop } = e;
	//     if (scrollTop <= 0) {
	//         this.sortByNameShow = false;
	//     }
	//     if (scrollTop > 50 && !this.sortByNameShow) {
	//         this.sortByNameShow = true;
	//     }
	// },
	methods: {
		tabProduct(index) {
			this.showCate = index;
			this.isActive = index;
		},
		isChoseName(name, index) {
			this.currentName = name;
			this.isCurrent = index;
			this.oneItem = true;
			this.hideName = true;
			this.hideItemName();
			let vm = this;
			// 是否已经存在缓存
			if (!this.isPx) {
				// 获取全部节点信息, 缓存起来
				let view = uni.createSelectorQuery().selectAll('.sort');
				view.boundingClientRect(data => {
					// 解析一元对象数组转单类型对象
					for (let i = 0; i < data.length; i++) {
						let val = data[i];
						vm.pointerPx[val['id']] = val['top'];
					}
					let top = vm.pointerPx[name] - uni.upx2px(88);
					uni.pageScrollTo({
						scrollTop: top,
						duration: 100
					});
					vm.isPx = true;
				}).exec();
			} else {
				let top = vm.pointerPx[name] - uni.upx2px(88);
				uni.pageScrollTo({
					scrollTop: top,
					duration: 100
				});
			}
		},
		// 去品牌页
		goDetail(id) {
			this.$api.goNavigateTo(`/pages/goods/brandDetail/brandDetail?brandId=${id}`);
		},
		hideItemName() {
			setTimeout(() => {
				this.hideName = false;
				this.isCurrent = -1;
			}, 2000);
		},
		//获取品牌库的数据
		async getpingpaiApi() {
			let vm = this;
			let res = await this.$api.request({
				method: 'GET',
				access_token: this.access_token,
				url: this.$api.catoPingpai
			});
			if (res && res.code == 0) {
				vm.allpinpais = res.data.brandGroup;
				vm.newpingpais = res.data.newBrandList;
				vm.hotpingpais = res.data.hotBrandList;
			}
		}
	}
};
</script>

<style lang="less">
@import url('less/pingku.less');
</style>
