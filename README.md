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
    |-- components        组件库
    |   |-- dot.vue                                            自定义轮播图-小标点
    |   |-- drag.vue                                           登录滑块组件
    |   |-- share.vue                                          分享弹出层组件
    |   |-- video-tag.vue                                      发现视频组件
    |   |-- brand-list-head                                    商品列表顶部筛选条
    |   |   |-- action.js
    |   |   |-- brand-list-head.vue
    |   |   |-- brand-list-head2.vue
    |   |   |-- style.less
    |   |-- buy-popup                                          全场商品购买弹窗
    |   |   |-- add-type.vue
    |   |   |-- buy-popup.vue
    |   |   |-- watch.js
    |   |-- buy-popup2                                         积分商城购买弹窗
    |   |   |-- add-type.vue
    |   |   |-- buy-popup.vue
    |   |   |-- watch.js
    |   |-- confirm                                            确认框组件
    |   |   |-- confirm.vue
    |   |-- coupon-list                                        优惠券组件
    |   |   |-- coupon-list.less
    |   |   |-- coupon-list.vue
    |   |-- date-picker                                        日期选择组件
    |   |   |-- date-picker.vue
    |   |-- find                                               发现模块组件
    |   |   |-- active.vue
    |   |   |-- ellipsis.vue
    |   |   |-- time.vue
    |   |-- goods-list                                         商品列表组件
    |   |   |-- goods-list.vue
    |   |   |-- index-goods-list.vue
    |   |   |-- vipGoods-list.vue
    |   |-- group-list                                         订单列表组件
    |   |   |-- group-list.less
    |   |   |-- group-list.vue
    |   |-- min-nav                                            悬浮底部导航
    |   |   |-- min-nav.vue
    |   |-- modal                                              
    |   |   |-- modal.vue
    |   |-- mpvue-citypicker                                   城市联级组件
    |   |   |-- mpvueCityPicker.vue
    |   |   |-- mpvueProvincePicker.vue
    |   |   |-- model
    |   |       |-- citys-value.js
    |   |       |-- citys.js
    |   |-- productDetial                                      商品详情内容小组件
    |   |   |-- brand.vue
    |   |   |-- market.vue
    |   |-- tabbar                                             顶部导航组件
    |   |   |-- tabbar.vue
    |   |-- toast-popup                                        弹出框组件
    |   |   |-- leftpop.less
    |   |   |-- leftpop.vue
    |   |   |-- toast-popup.less
    |   |   |-- toast-popup2.vue
    |   |   |-- toast-popupCenter.vue
    |   |   |-- toastCenter.less
    |   |-- uni-badge                                          角标组件
    |   |   |-- uni-badge.vue
    |   |-- uni-popup                                          底部弹出框组件
    |       |-- uni-popup.vue
    |-- pages                                                  视图文件
    |   |-- aboutCart                                          支付成功页面(未做迁移,)
    |   |   |-- paySuccess
    |   |       |-- paySuccess.less
    |   |       |-- paySuccess.vue
    |   |-- addressAdd                                         收货地址修改&新增
    |   |   |-- add.less
    |   |   |-- addressAdd.vue
    |   |-- addressList                                        收货地址列表
    |   |   |-- addressList.less
    |   |   |-- addressList.vue
    |   |-- cart                                               购物车(Tabbar页面)
    |   |   |-- cart.vue
    |   |   |-- invalid                                        购物车失效商品
    |   |   |   |-- cart-list.vue
    |   |   |   |-- good-item.vue
    |   |   |-- valid                                          购物车有效商品
    |   |       |-- cart-list.vue
    |   |       |-- good-item.vue
    |   |-- classify                                           分类(Tabbar页面)
    |   |   |-- classify.vue
    |   |   |-- pingku.vue
    |   |-- exchangeFair
    |   |   |-- exchangeFair.vue
    |   |-- feedback                                           意见反馈
    |   |   |-- feedback.less
    |   |   |-- feedback.vue
    |   |-- found                                              发现(Tabbar页面)
    |   |   |-- detail.vue
    |   |   |-- found.vue
    |   |-- goods
    |   |   |-- brandDetail                                    品牌详情
    |   |   |   |-- barnd-detail.less
    |   |   |   |-- brandDetail.vue
    |   |   |-- list                                           商品列表
    |   |   |   |-- list.less
    |   |   |   |-- list.vue
    |   |   |-- product                                        商品详情
    |   |       |-- product.vue
    |   |       |-- question.vue
    |   |-- helps                                              帮助中心模块
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
    |   |   |-- anniversary                                    超值满赠&
    |   |   |   |-- anniversary.less
    |   |   |   |-- anniversary.vue
    |   |   |-- category                                       品类馆
    |   |   |   |-- cat-goods-swiper.vue
    |   |   |   |-- category.less
    |   |   |   |-- category.vue
    |   |   |-- colldetail                                     专辑详情
    |   |   |   |-- colldetail.vue
    |   |   |-- collList                                       专辑列表
    |   |   |   |-- colllist.vue
    |   |   |-- juhuasuan                                      巨划算
    |   |   |   |-- juhuasuan.vue
    |   |   |-- miaosha                                        限时秒杀
    |   |   |   |-- miaosha.vue
    |   |   |-- preferential                                   特卖专场
    |   |   |   |-- cheap.less
    |   |   |   |-- preferential.vue
    |   |   |-- rankingList                                    热销榜单
    |   |   |   |-- ranking-list.less
    |   |   |   |-- rankingList.vue
    |   |   |   |-- view.vue                                   热销榜单详情
    |   |   |-- vipIndex                                       VIP商品
    |   |   |   |-- svip.less
    |   |   |   |-- vipIndex.vue
    |   |   |-- xinpin                                         红盒子新品
    |   |   |   |-- redbox-brand-view.less
    |   |   |   |-- redbox-brand-view.vue
    |   |   |   |-- redbox-goods-view.less
    |   |   |   |-- redbox-goods-view.vue
    |   |   |   |-- redbox.less
    |   |   |   |-- xinpin.vue
    |   |   |-- zhifaIndex                                     小美直发
    |   |       |-- zhifa-index.less
    |   |       |-- zhifaIndex.vue
    |   |-- hotGoods
    |   |   |-- hotGoods.vue
    |   |-- index                                              首页
    |   |   |-- index.vue
    |   |   |-- indexAction.js                                 首页抽离(script)外置运行脚本
    |   |-- login                                              登录页面
    |   |   |-- agreement.vue
    |   |   |-- login.vue
    |   |-- loginaddress                                       注册选地址
    |   |   |-- loginaddress.vue
    |   |-- mineinfo                                           个人信息
    |   |   |-- mineinfo.vue
    |   |-- my                                                 我的(Tabbar页面)
    |   |   |-- module.js
    |   |   |-- my.vue
    |   |-- order                                              订单列表
    |   |   |-- order.less
    |   |   |-- order.vue
    |   |-- ordercheck                                         确认订单
    |   |   |-- child.vue
    |   |   |-- couponList.vue
    |   |   |-- goods-image.less
    |   |   |-- order-check.less
    |   |   |-- ordercheck.vue
    |   |   |-- tags-line.vue
    |   |-- orderView                                         查看订单
    |   |   |-- order-view.less
    |   |   |-- orderView.vue
    |   |-- paySuccess                                        支付成功页面
    |   |   |-- paySuccess.less
    |   |   |-- paySuccess.vue
    |   |-- search                                            搜索页面
    |   |   |-- search.vue
    |   |-- self
    |   |   |-- coupon                                       领券中心
    |   |   |   |-- coupon.less
    |   |   |   |-- coupon.vue
    |   |   |-- fenxiang                                     分享页面
    |   |   |   |-- fenxiang.vue
    |   |   |   |-- sharefriend.vue
    |   |   |-- integral                                     积分商城模块
    |   |   |   |-- detail                                   积分明细
    |   |   |   |   |-- detail.vue
    |   |   |   |   |-- jfdetail.less
    |   |   |   |-- exchangeDraw                             积分抽奖
    |   |   |   |   |-- exchange-draw.less
    |   |   |   |   |-- exchangeDraw.vue
    |   |   |   |-- integral                                 积分商城页面
    |   |   |   |   |-- integral.less
    |   |   |   |   |-- integral.vue
    |   |   |   |-- order                                    积分订单
    |   |   |   |   |-- jforder.less
    |   |   |   |   |-- order.vue
    |   |   |   |-- product                                  积分商品详情
    |   |   |   |   |-- jfproDetial.less
    |   |   |   |   |-- product.vue
    |   |   |   |-- rules                                    积分规则
    |   |   |       |-- jfrules.less
    |   |   |       |-- rules.vue
    |   |   |-- oftenBuyList                                 常购清单
    |   |   |   |-- oftenBuyList.vue
    |   |   |-- ownCoupon                                    我的券包
    |   |   |   |-- ownCoupon.vue
    |   |   |-- remindlist                                   到货提醒
    |   |       |-- remindlist.vue
    |   |-- services
    |   |   |-- services.vue
    |   |   |-- common
    |   |   |   |-- icon.css
    |   |   |-- components
    |   |       |-- chatinput.vue
    |   |       |-- messageshow.vue
    |   |-- straightCollect                                   凑单页面
    |   |   |-- bottombar.vue
    |   |   |-- straightCollect.less
    |   |   |-- straightCollect.vue
    |   |-- usable                                            认证审核
    |   |   |-- authentication.less
    |   |   |-- usable.vue
    |   |-- usableno                                          审核反馈
    |   |   |-- audit.less
    |   |   |-- usableno.vue
    |   |-- video                                             视频组件
    |   |   |-- video.vue
    |   |-- wuliu                                             物流详情
    |   |   |-- wuliu.less
    |   |   |-- wuliu.vue
    |   |-- wxlogin                                           微信授权登录
    |       |-- wxlogin.vue
    |-- static   静态资源文件
    |   |-- assets                                            部分Icon雪碧图
    |   |-- basic                                             静态样式
    |   |-- images                                            图片
    |   |-- less                                              静态样式
    |   |-- sharemenu                                         分享图标(暂未使用)
    |   |-- style                                             静态样式
    |-- store                                                 vuex状态管理
        |-- index.js

```
