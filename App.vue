<script>
export default {
	onLaunch: function() {},
	onShow: function() {},
	onHide: function() {}
};
</script>

<style lang="less">
* {
	font-family: 'Microsoft YaHei', PingFangSC-Regular, 'Helvetica Neue', Helvetica, sans-serif; //NotoSansHans-Medium,PingFangSC-Regular, PingFang-SC-Bold, MicrosoftYaHei-Bold, PingFang-SC-Medium,  PingFangSC-Light
}
// @import url('./static/style/iconfont/iconfont.less');
@import url('app.less');
page{
	// box-sizing: border-box !important;
}
.foot-r-box {
	position: fixed;
	bottom: 0;
}
/* #ifdef H5 */
.users-foot {
	bottom: 55px;
}
::-webkit-scrollbar-track-piece {
  /* //滚动条凹槽的颜色，还可以设置边框属性 */
  background-color: #f8f8f8;
}

::-webkit-scrollbar {
  /* //滚动条的宽度 */
  width: 4rpx;
  /* height:20rpx; */
}

::-webkit-scrollbar-thumb {
  /* //滚动条的设置 */
  background-color: #ddd;
  background-clip: padding-box;
  min-height: 28rpx;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #bbb;
}

::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}

button::after {
  border: none;
}
/* #endif */
</style>
