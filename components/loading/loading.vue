<template>
	<view class="loading">
		<view class="loadCon">
			<view class="imgText">
				<img src="@/static/images/public/Loading.png" alt="">
				<view class="text">
					加载中...
				</view>
			</view>
		</view>
	</view>
</template>
<script>
</script>

<style lang="less">
	.loading {
		position: absolute;
		width: 100%;
		height: 100%;
		// background:rgba(0,0,0,0.5);
		background: #fff;
		top: 0;
		bottom: 0;
		overflow: hidden;
		z-index: 100;
		.loadCon {
			.imgText{
				text-align: center;
				width: 180upx;
				height: 150upx;
				position: absolute;
				top: 0;
				bottom: 0;
				right: 0;
				left: 0;
				margin: auto;
			}
			img {
				width: 80upx;
				height: 80upx;
			
				/*animation (动画) :绑定选择器, 4s完成动画 linear(匀速) infinite(循环) */
				animation: que 2s linear infinite;
			}
			.text{
				color: #666;
				font-size: 30upx;
				margin-left: 50upx;
				margin-top: 10upx;
			}
		}
	}

	@keyframes que {

		/*以百分比来规定改变发生的时间 也可以通过"from"和"to",等价于0% 和 100%*/
		0% {
			/*rotate(2D旋转) scale(放大或者缩小) translate(移动) skew(翻转)*/
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(360deg);
		}
	}
</style>
