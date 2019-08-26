<template>
  <view class="goodsItem" @click="handleJumpDetail(itemData.goodsInfo.goodsId)">
    <view class="item_left">
	  <image class="left_img" :src="itemData.goodsInfo.thumb"></image>
    </view>
    <view class="item_right">
      <view class="right_top">{{itemData.goodsInfo.goodsName}}</view>
      <view class="right_bottom">
        <view class="desc">
          <view class="price">
            <view class="price_left">{{itemData.big}}</view>
            <view class="price_right">.{{itemData.min}}</view>
          </view>
          <view class="tags">
            <block v-for="(item,index) in itemData.tagList" :key="index">
              <view></view>
            </block>
          </view>
        </view>
        <view class="addCart" @tap.stop="handleAddCart(itemData)">
          <image src="/static/images/common/pro_cartIcon.png"></image>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
		itemData: {
			type: Object,
			default: {}
		}
  },
  data() {
    return {

	};
  },
  computed: {},
  methods: {
    handleJumpDetail(goodsId) {
	  this.$emit('jumpDetail',goodsId)
	},
	handleAddCart(item){
		console.log(item)
		this.$emit('handleAddCart',item)
	}
  }
};
</script>

<style lang="less">
.goodsItem {
  // width: 100%;
  background: #fff;
  height: 148upx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0upx 7upx 24upx 0upx rgba(188, 185, 185, 0.14);
  border-radius: 10upx;
  padding: 0 20upx;
  & > .item_left {
    margin: 4upx 0;
    & > .left_img {
      width: 100upx;
      height: 100upx;
    }
  }
  & > .item_right {
    width: 540upx;
    height: 108upx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    & > .right_top {
      width: 530upx;
      height: 28upx;
      font-size: 28upx;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(47, 58, 64, 1);
      line-height: 28upx;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    & > .right_bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 44upx;

      & > .desc {
        display: flex;
        align-items: center;
        height: 44upx;
        padding-top: 11upx;
        & > .price {
          display: flex;
          align-items: flex-end;
          height: 25upx;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(255, 51, 102, 1);
          & > .price_left::before {
            content: "￥";
            width: 14upx;
            height: 18upx;
            font-size: 24upx;
          }
          & > .price_left {
            font-size: 32upx;
          }
          & > .price_right {
            font-size: 24upx;
          }
        }
      }
      & > .addCart {
        width: 44upx;
		height: 44upx;
		z-index: 2;
        & > image {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
