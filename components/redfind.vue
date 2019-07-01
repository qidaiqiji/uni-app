<template>
	<view>
		<view class="find">
			<view class="findTag">小美发现</view>
			<view class="findText" :class="{ activeText: isactiveText }">
				字体是苹方 常规体，上下文字组间距42px字体是苹方 常规体，上下文字组间距42px字体是苹方 常规体，上下文字组间距42px上下文字组间距42px字体是苹方
				常规体，上下文字组间距42px
			</view>
			<view class="shouAll" @tap="showAlltext()">全文</view>
			<view class="imgShow">
				<swiper class="swiper" :indicator-dots="false" :autoplay="true" :interval="5000" :duration="500" :circular="true" indicator-active-color="#fff">
					<block v-for="(bitem, bindex) in 5" :key="bindex">
						<swiper-item @tap="nextPage(bitem.url)">
							<view class="swiper-item">
								<image class="img" src="../../static/images/anniversary/ban.jpg" mode=""></image>
								<image class="img" src="../../static/images/anniversary/ban.jpg" mode=""></image>
								<image class="img" src="../../static/images/anniversary/ban.jpg" mode=""></image>
							</view>
						</swiper-item>
					</block>
				</swiper>
			</view>
			<view class="imgText">请叫我小姐姐</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	}
};
</script>

<style lang="less"></style>
