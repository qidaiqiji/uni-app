

## Mac command 命令一次增加无数文件
```sh
svn st | awk '{if ( $1 == "?") { print $2}}' | xargs svn add
svn st | awk '{if ( $1 == "!") { print $2}}' | xargs svn del
svn st | awk '{if ( $1 == "M") { print $2}}' | xargs svn revert
```


```
|-- app
    |-- app.less          全局样式
    |-- App.vue           启动页
    |-- common.less       全局样式
    |-- h5.template.html  Web启动页
    |-- main.js           启动入口
    |-- manifest.json     编译配置
    |-- pages.json        页面配置
    |-- readme.md         xxxx
    |-- reset.less        web脚本配置(使用环境编译较好)
    |-- uni.less          配置文件
    |-- uni.scss          默认配置文件
    |-- common            公共库
    |   |-- auth.js       页面权限校验
    |   |-- base64.js     token生成
    |   |-- cart.js       购物车
    |   |-- goods.js      商品列表
    |   |-- http.js       callback请求
    |   |-- index.js      导出utils
    |   |-- pay.js        支付配置
    |   |-- util.js       公用方法库
    |   |-- utils.js      接口&请求文件
    |-- components    组件库
    |   |-- dot.vue
    |   |-- drag.vue
    |   |-- redfind.vue
    |   |-- share.vue
    |   |-- video-tag.vue
    |   |-- banner
    |   |   |-- banner.vue
    |   |-- brand-list-head
    |   |   |-- brand-list-head.vue
    |   |   |-- brand-list-head2.vue
    |   |-- buy-popup
    |   |   |-- add-type.vue
    |   |   |-- buy-popup.vue
    |   |-- buy-popup2
    |   |   |-- add-type.vue
    |   |   |-- buy-popup.vue
    |   |-- confirm
    |   |   |-- confirm.vue
    |   |-- coupon-list
    |   |   |-- coupon-list.less
    |   |   |-- coupon-list.vue
    |   |-- find
    |   |   |-- active.vue
    |   |   |-- ellipsis.vue
    |   |   |-- time.vue
    |   |-- gaoyia-parse
    |   |   |-- parse.css
    |   |   |-- parse.vue
    |   |   |-- components
    |   |   |   |-- wxParseAudio.vue
    |   |   |   |-- wxParseImg.vue
    |   |   |   |-- wxParseTable.vue
    |   |   |   |-- wxParseTemplate0.vue
    |   |   |   |-- wxParseTemplate1.vue
    |   |   |   |-- wxParseTemplate10.vue
    |   |   |   |-- wxParseTemplate11.vue
    |   |   |   |-- wxParseTemplate2.vue
    |   |   |   |-- wxParseTemplate3.vue
    |   |   |   |-- wxParseTemplate4.vue
    |   |   |   |-- wxParseTemplate5.vue
    |   |   |   |-- wxParseTemplate6.vue
    |   |   |   |-- wxParseTemplate7.vue
    |   |   |   |-- wxParseTemplate8.vue
    |   |   |   |-- wxParseTemplate9.vue
    |   |   |   |-- wxParseVideo.vue
    |   |   |-- libs
    |   |       |-- html2json.js
    |   |       |-- htmlparser.js
    |   |       |-- wxDiscode.js
    |   |-- goods-list
    |   |   |-- goods-list.less
    |   |   |-- goods-list.vue
    |   |   |-- index-goods-list.vue
    |   |   |-- price.vue
    |   |   |-- vipGoods-list.vue
    |   |-- group-list
    |   |   |-- group-list.less
    |   |   |-- group-list.vue
    |   |-- image-url
    |   |   |-- image-url.vue
    |   |-- loading
    |   |   |-- loading.vue
    |   |-- min-nav
    |   |   |-- min-nav.vue
    |   |-- modal
    |   |   |-- modal.vue
    |   |-- mpvue-citypicker
    |   |   |-- mpvueCityPicker1.vue
    |   |   |-- model
    |   |       |-- citys-value.js
    |   |       |-- citys.js
    |   |-- mpvue-provincepicker
    |   |   |-- mpvueProvincePicker.vue
    |   |-- productDetial
    |   |   |-- brand.vue
    |   |   |-- market.vue
    |   |-- tabbar
    |   |   |-- tabbar.vue
    |   |-- toast-popup
    |   |   |-- leftpop.less
    |   |   |-- leftpop.vue
    |   |   |-- toast-popup.less
    |   |   |-- toast-popup2.vue
    |   |   |-- toast-popupCenter.vue
    |   |   |-- toastCenter.less
    |   |-- uni-badge
    |   |   |-- uni-badge.vue
    |   |-- uni-popup
    |   |   |-- uni-popup.vue
    |   |-- uni-swipe-action
    |   |   |-- uni-swipe-action.vue
    |   |-- w-picker
    |       |-- w-picker.vue
    |       |-- city-data
    |           |-- area.js
    |           |-- city.js
    |           |-- province.js
    |-- pages    视图文件
    |   |-- addressAdd
    |   |   |-- add.less
    |   |   |-- addressAdd.vue
    |   |-- addressList
    |   |   |-- addressList.less
    |   |   |-- addressList.vue
    |   |-- cart
    |   |   |-- cart.vue
    |   |   |-- invalid
    |   |   |   |-- cart-list.vue
    |   |   |   |-- good-item.vue
    |   |   |-- valid
    |   |       |-- cart-list.vue
    |   |       |-- good-item.vue
    |   |-- classify
    |   |   |-- classify.vue
    |   |   |-- pingku.vue
    |   |-- exchangeFair
    |   |   |-- exchangeFair.vue
    |   |-- feedback
    |   |   |-- feedback.less
    |   |   |-- feedback.vue
    |   |-- flashSale
    |   |-- found
    |   |   |-- detail.vue
    |   |   |-- found.vue
    |   |-- goods
    |   |   |-- brandDetail
    |   |   |   |-- barnd-detail.less
    |   |   |   |-- brandDetail.vue
    |   |   |-- list
    |   |   |   |-- list.less
    |   |   |   |-- list.vue
    |   |   |-- product
    |   |       |-- product.vue
    |   |       |-- question.vue
    |   |-- helps
    |   |   |-- detail.vue
    |   |   |-- index.vue
    |   |   |-- inner
    |   |       |-- aboutActive.vue
    |   |       |-- aboutBuy.vue
    |   |       |-- aboutCompony.vue
    |   |       |-- aboutPingpai.vue
    |   |       |-- aboutPro.vue
    |   |       |-- aboutXm.vue
    |   |       |-- contactUs.vue
    |   |       |-- newHelp.vue
    |   |       |-- payType.vue
    |   |       |-- payWuliu.vue
    |   |       |-- peiInstro.vue
    |   |       |-- pinpaiCoo.vue
    |   |       |-- proGuara.vue
    |   |       |-- ruzhuliucheng.vue
    |   |       |-- saleService.vue
    |   |       |-- suggessText.vue
    |   |       |-- userAgree.vue
    |   |       |-- xiaomeijf.vue
    |   |       |-- youfeiRules.vue
    |   |-- homePage
    |   |   |-- anniversary
    |   |   |   |-- anniversary.less
    |   |   |   |-- anniversary.vue
    |   |   |-- category
    |   |   |   |-- cat-goods-swiper.vue
    |   |   |   |-- category.less
    |   |   |   |-- category.vue
    |   |   |-- colldetail
    |   |   |   |-- colldetail.vue
    |   |   |-- collList
    |   |   |   |-- colllist.vue
    |   |   |-- juhuasuan
    |   |   |   |-- juhuasuan.vue
    |   |   |-- miaosha
    |   |   |   |-- miaosha.vue
    |   |   |-- preferential
    |   |   |   |-- cheap.less
    |   |   |   |-- preferential.vue
    |   |   |-- rankingList
    |   |   |   |-- ranking-list.less
    |   |   |   |-- rankingList.vue
    |   |   |   |-- view.vue
    |   |   |-- vipIndex
    |   |   |   |-- svip.less
    |   |   |   |-- vipIndex.vue
    |   |   |-- xinpin
    |   |   |   |-- redbox-brand-view.less
    |   |   |   |-- redbox-brand-view.vue
    |   |   |   |-- redbox-goods-view.less
    |   |   |   |-- redbox-goods-view.vue
    |   |   |   |-- redbox.less
    |   |   |   |-- xinpin.vue
    |   |   |-- zhifaIndex
    |   |       |-- zhifa-index.less
    |   |       |-- zhifaIndex.vue
    |   |-- hotGoods
    |   |   |-- hotGoods.vue
    |   |-- index
    |   |   |-- index.vue
    |   |-- login
    |   |   |-- agreement.vue
    |   |   |-- login.vue
    |   |-- loginaddress
    |   |   |-- loginaddress.vue
    |   |-- mineinfo
    |   |   |-- mineinfo.vue
    |   |-- my
    |   |   |-- module.js
    |   |   |-- my.vue
    |   |-- order
    |   |   |-- order.less
    |   |   |-- order.vue
    |   |-- ordercheck
    |   |   |-- child.vue
    |   |   |-- couponList.vue
    |   |   |-- goods-image.less
    |   |   |-- order-check.less
    |   |   |-- ordercheck.vue
    |   |   |-- tags-line.vue
    |   |-- orderView
    |   |   |-- order-view.less
    |   |   |-- orderView.vue
    |   |-- paySuccess
    |   |   |-- paySuccess.less
    |   |   |-- paySuccess.vue
    |   |-- search
    |   |   |-- search.vue
    |   |-- self
    |   |   |-- coupon
    |   |   |   |-- coupon.less
    |   |   |   |-- coupon.vue
    |   |   |-- fenxiang
    |   |   |   |-- fenxiang.vue
    |   |   |   |-- sharefriend.vue
    |   |   |-- integral
    |   |   |   |-- detail
    |   |   |   |   |-- detail.vue
    |   |   |   |   |-- jfdetail.less
    |   |   |   |-- exchangeDraw
    |   |   |   |   |-- exchange-draw.less
    |   |   |   |   |-- exchangeDraw.vue
    |   |   |   |-- integral
    |   |   |   |   |-- integral.less
    |   |   |   |   |-- integral.vue
    |   |   |   |-- order
    |   |   |   |   |-- jforder.less
    |   |   |   |   |-- order.vue
    |   |   |   |-- product
    |   |   |   |   |-- jfproDetial.less
    |   |   |   |   |-- product.vue
    |   |   |   |-- rules
    |   |   |       |-- jfrules.less
    |   |   |       |-- rules.vue
    |   |   |-- oftenBuyList
    |   |   |   |-- oftenBuyList.vue
    |   |   |-- ownCoupon
    |   |   |   |-- ownCoupon.vue
    |   |   |-- remindlist
    |   |       |-- remindlist.vue
    |   |-- services
    |   |   |-- services.vue
    |   |   |-- common
    |   |   |   |-- icon.css
    |   |   |-- components
    |   |       |-- chatinput.vue
    |   |       |-- messageshow.vue
    |   |-- straightCollect
    |   |   |-- bottombar.vue
    |   |   |-- straightCollect.less
    |   |   |-- straightCollect.vue
    |   |-- usable
    |   |   |-- authentication.less
    |   |   |-- usable.vue
    |   |-- usableno
    |   |   |-- audit.less
    |   |   |-- usableno.vue
    |   |-- video
    |   |   |-- video.vue
    |   |-- wuliu
    |   |   |-- wuliu.less
    |   |   |-- wuliu.vue
    |   |-- wxlogin
    |       |-- wxlogin.vue
    |-- static   静态资源文件
    |   |-- assets
    |   |-- basic
    |   |-- images
    |   |-- less
    |   |-- sharemenu
    |   |-- style
    |-- store
        |-- index.js

```
