<template>
	<view class="search-page" :style="{ 'min-height': lbodyHeight + 'px' }">
		<!-- 搜索采购商品、品牌 @focus="focusIn" -->
		<view class="searchPart" :class="{ show: sTop }">
			<view class="search">
				<text class="search-icon"></text>
				<input
					class="inputbox uni-input"
					type="text"
					placeholder="采购商品、品牌"
					v-model="keywords"
					confirm-type="search"
					@blur="focusOut"
					@confirm="searchGoods"
				/>
				<view class="xm-icon xm-icon-abso" v-if="keywords" style="font-size: 16px;right: 10px;" @tap="clearSearch"></view>
			</view>
			<view class="search-btn" @tap="searchGoods">搜索</view>
		</view>

		<!-- 历史搜索 -->
		<view class="box history-search" v-show="historyTag.length > 0">
			<view class="title">
				历史搜索
				<text class="iconDel" @tap="delHistory"></text>
			</view>
			<view class="search-tag">
				<text class="tag-item" v-for="(history, index) in historyTag" :key="index" @tap="goBack(history)">{{ history }}</text>
			</view>
		</view>

		<!-- 热门搜索 -->
		<view class="box hot-search" v-show="hotTag.length > 0">
			<view class="title">热门搜索</view>
			<view class="search-tag">
				<view class="tag-item" v-for="(hot, hindex) in hotTag" :key="hindex" @tap="goBack(hot)">
					<div class="icon" v-if="hindex <= 2"></div>
					<text class="name">{{ hot }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			sTop: false,
			hotTag: [],
			historyTag: [],
			keywords: '',
			placeholder: '',
			lbodyHeight: 1000
		};
	},
	onLoad(params) {
		if (params.keywords) {
			// this.placeholder = params.keywords;
			this.keywords = params.keywords;
		}
		this.getGoodsKeywordsHot();
		this.getGoodsKeywordsHistory();
	},
	onShow() {
		let res = uni.getSystemInfoSync();
		this.lbodyHeight = res.windowHeight;
	},
	methods: {
		focusIn() {},
		focusOut(event) {
			uni.hideKeyboard();
		},
		clearSearch() {
			this.placeholder = '';
			this.keywords = '';
		},
		searchGoods() {
			let keywords = this.keywords == '' ? this.placeholder : this.keywords;
			this.goBack(keywords);
		},
		goBack(keywords) {
			let _url = keywords ? `../goods/list/list?keywords=${keywords}` : `../goods/list/list`;
			this.$api.goNavigateTo(_url);
		},
		async getGoodsKeywordsHot() {
			let that = this;
			let res = await this.$api.request({
				url: this.$api.getGoodsKeywords_hot
			});
			if (res && res.code == 0) {
				let datas = res.data;
				that.hotTag = datas.keywords;
			}
		},
		async getGoodsKeywordsHistory() {
			let that = this;
			let res = await this.$api.request({
				url: this.$api.getGoodsKeywords_history
			});
			if (res && res.code == 0) {
				let datas = res.data;
				that.historyTag = datas.keywords;
			}
		},
		async delHistory() {
			let that = this;
			let res = await this.$api.request({
				url: this.$api.getGoodsKeywords_del
			});
			if (res && res.code == 0) {
				let datas = res.data;
				that.historyTag = [];
				this.$api.showMessage(res.msg);
			}
		}
	}
};
</script>

<style lang="less">
.search-page {
	background: #fff;
	overflow: hidden;
}
.searchPart {
	position: relative;
	display: flex;
	-webkit-box-align: center;
	width: 702upx;
	margin: auto;
	margin-bottom: 40upx;

	.search {
		width: 600upx;
	}

	.search-btn {
		text-align: center;
		width: 100upx;
		height: 60upx;
		line-height: 60upx;
		padding: 14upx 0;
		font-size: 28upx;
		font-weight: 500;
		color: rgba(255, 51, 102, 1);
	}
}

.box {
	width: 702upx;
	margin: auto;

	.title {
		position: relative;
		font-size: 28upx;
		font-weight: 500;
		color: rgba(47, 58, 64, 1);
		line-height: 48upx;
	}

	.iconDel {
		display: block;
		width: 40upx;
		height: 40upx;
		position: absolute;
		right: 0;
		top: 50%;
		margin-top: -20upx;
		background-image: url('~@/static/images/search/icon_delete@2x.png');
		background-repeat: no-repeat;
		background-position: center;
		background-size: 30upx 30upx;
	}

	.search-tag {
		margin-top: 30upx;
		min-height: 160upx;
		margin-bottom: 20upx;
	}

	.tag-item {
		display: inline-block;
		margin-right: 16upx;
		margin-bottom: 16upx;
		background: rgba(243, 243, 243, 1);
		border-radius: 4upx;
		padding: 13upx 16upx;
		font-size: 24upx;
		font-weight: 500;
		color: rgba(47, 58, 64, 1);
		line-height: 30upx;

		.name {
			font-size: 24upx;
		}

		.icon {
			width: 30upx;
			height: 30upx;
			display: inline-block;
			background-image: url('~@/static/images/search/fire.png');
			background-repeat: no-repeat;
			background-position: center;
			background-size: 30upx 30upx;
		}
	}
}
</style>
