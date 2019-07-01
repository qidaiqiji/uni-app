<template>
	<view class="share-pop">
		<div class="share-mask" :class="[show ? 'show' : '']" @tap="close()"></div>
		<view class="share-body" :class="[show ? 'show' : '']">
			<view class="bottom-title">分享到</view>
			<view class="bottom-content">
				<view v-for="(item, index) in bottomData" :key="index" class="bottom-content-box">
					<view :class="item.name" class="bottom-content-image" @tap="shareType(item.type)">
						<text class="icon">{{ item.icon }}</text>
					</view>
					<view class="bottom-content-text">{{ item.text }}</view>
				</view>
			</view>
			<view class="bottom-btn" @tap="togglePopup('')">取消分享</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		show: {
			type: Boolean,
			default: false
		},
		shareUrl: {
			default: ''
		}
	},
	data() {
		return {
			bottomData: [
				{
					text: '微信',
					icon: '\ue6a4',
					name: 'wx',
					type: 'wx'
				},
				// {
				// 	text: '朋友圈',
				// 	icon: '\ue646',
				// 	name: 'wx',
				// 	type: 'wf'
				// }
				// {
				// 	text: 'QQ',
				// 	icon: '\ue66b',
				// 	name: 'qq'
				// },
				// {
				// 	text: '新浪',
				// 	icon: '\ue600',
				// 	name: 'sina'
				// },
				// {
				// 	text: '复制',
				// 	icon: '\ue632',
				// 	name: 'copy'
				// },
				// {
				// 	text: '更多',
				// 	icon: '\ue618',
				// 	name: 'more'
				// }
			]
		};
	},
	methods: {
		togglePopup() {
			this.$emit('closeShare', true);
		},
		shareType(type) {
			if (type == 'wx') {
				this.shareWXSceneSession();
			} else if (type == 'wf') {
				this.shareWXSenceTimeline();
			}
		},
		// 微信
		shareWXSceneSession() {
			let userId = uni.getStorageSync('userId');
			let _href = '?userId=' + userId;
			uni.share({
				provider: 'weixin',
				scene: 'WXSceneSession',
				type: 0,
				href: 'http://www.apiyux.com' + _href,
				title: '小美诚品',
				summary: '采最正的品,卖最火的货',
				imageUrl: 'http://www.apiyux.com:40001/xiaomei-app/static/images/logo.png',
				success: function(res) {},
				fail: function(err) {}
			});
		},
		// 朋友圈
		shareWXSenceTimeline() {
			let userId = uni.getStorageSync('userId');
			let _href = '?userId=' + userId;
			uni.share({
				provider: 'weixin',
				scene: 'WXSenceTimeline',
				type: 0,
				href: 'http://www.apiyux.com' + _href,
				title: '小美诚品',
				summary: '采最正的品,卖最火的货',
				imageUrl: 'http://www.apiyux.com:40001/xiaomei-app/static/images/logo.png',
				success: function(res) {},
				fail: function(err) {}
			});
		},
		shareMinProgram() {
			uni.share({
				provider: 'weixin',
				type: 5,
				imageUrl: 'http://www.apiyux.com:40001/xiaomei-app/static/images/logo.png',
				title: '小美诚品',
				miniProgram: {
					id: 'gh_abcdefg',
					path: 'pages/index/index',
					type: 0,
					webUrl: 'http://uniapp.dcloud.io'
				},
				success: ret => {
				}
			});
		}
	}
};
</script>

<style lang="less" scoped="scoped">
@import '../reset.less';
.share-pop {
	width: 100%;
}
.share-mask {
	position: fixed;
	z-index: 97;
	top: 0;
	right: 0;
	left: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.6);
	display: none;
	&.show {
		display: block;
	}
}
.share-body {
	background: #ffffff;
	bottom: @simpleBottom2;
	position: fixed;
	z-index: 98;
	width: 100%;
	display: none;
	&.show {
		display: block;
	}
}

.bottom-title {
	line-height: 60upx;
	font-size: 24upx;
	padding: 15upx 0;
	background: #ffffff;
	text-align: center;
}

.bottom-content-box {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 15upx;
	width: 25%;
	box-sizing: border-box;
}

.bottom-content-image {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 90upx;
	height: 90upx;
	overflow: hidden;
	background: #007aff;
	border-radius: 10upx;
}

.bottom-content-text {
	font-size: 26upx;
	color: #333;
	margin-top: 10upx;
}

.bottom-content-image.wx {
	background: #00ce47;
}

.bottom-content-image.qq {
	background: #00b6f6;
}

.bottom-content-image.sina {
	background: #ff766a;
}

.bottom-content-image.copy {
	background: #07ccd0;
}
</style>
