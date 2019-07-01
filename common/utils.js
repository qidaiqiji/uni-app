/**
 * 是否开启小美程序本地服务=> true 开启；false 不开启
 */
let USE_DEBUG = typeof window == 'undefined' ? true : false;
// 请求设置
let _Post = 'http://xm.rdmate.com/company/xiaopost';
let _Get = 'http://xm.rdmate.com/company/xiaoget';
let _xiaomei360 = 'http://api.xiaomei360.com';
if (USE_DEBUG) {
	_Post = 'https://api.xiaomei360.com';
	_Get = 'https://api.xiaomei360.com';
	_xiaomei360 = 'https://api.xiaomei360.com';
}
export const Post = _Post;
export const Get = _Get;
export const xiaomei360 = _xiaomei360;

// 首页
export let getIndex = `${xiaomei360}/v2/index/index`;
// 首页弹窗广告
export let indexAds = `${xiaomei360}/v2/index/ads`;

// 榜单
//---- 榜单列表
export let paihangIndex = `${xiaomei360}/v2/paihang/index`;
//---- 榜单详情
export let paihangView = `${xiaomei360}/v2/paihang/view`;

// 超值套餐
export let anniversaryApi = `${xiaomei360}/v2/activity/gift-pkg`;
export let anniversaryApi1 = `${xiaomei360}/v2/activity/full-gift`;

// 巨划算
export let juhuasuanApi = `${xiaomei360}/v2/activity/juhuasuan`;
// 小美直发
export let indexZhifaApi = `${xiaomei360}/v2/index/zhifa`;
// 秒杀
export let flash_sale_new = `${xiaomei360}/v2/activity/flash-sale-new`;

// 商品
// ---- 商品列表
export let getGoodsList = `${xiaomei360}/v2/goods/list`;
// ---- 商品详情
export let getGoodsView = `${xiaomei360}/v2/goods/view`;
// ---- 商品详情中根据商品ID和省份拉取配送政策
export let goods_shipping_info = `${xiaomei360}/v2/goods/shipping-info`;
// ---- 商品热门搜索关键词
export let getGoodsKeywords_hot = `${xiaomei360}/v2/goods/hot-keywords`;
// ---- 历史搜索关键词
export let getGoodsKeywords_history = `${xiaomei360}/v2/goods/history-keywords`;
// ---- 删除历史搜索关键字
export let getGoodsKeywords_del = `${xiaomei360}/v2/goods/history-keywords-delete`;
// ---- 商品列表筛选项
export let getGoodsfilter = `${xiaomei360}/v2/goods/goods-filter`;
// ---- 商品设置到货提醒
export let setReminder = `${xiaomei360}/v2/goods/set-arrival-reminder`;
// ---- 商品取消到货提醒
export let unSetReminder = `${xiaomei360}/v2/goods/unset-arrival-reminder`;
// ---- 到货提醒商品列表
export let goods_remindlist = `${xiaomei360}/v2/goods/remind-list`;
// ---- 常购清单
export let buyListAip = `${xiaomei360}/v2/goods/bought-list`;

// 收货地址
// ---- 收货地址列表
export let address_list = `${xiaomei360}/v2/address/list`;
// ---- 删除收货地址
export let address_delete = `${xiaomei360}/v2/address/delete`;
// ---- 新增收货地址
export let address_create = `${xiaomei360}/v2/address/create`;
// ---- 修改收货地址
export let address_update = `${xiaomei360}/v2/address/update`;
// ---- 拉取默认地址
export let getAddressdefault = `${xiaomei360}/v2/address/default`;

// 品类馆
export let categoryGallery = `${xiaomei360}/v2/category/gallery`;

// APP
// ---- APP自动登录
export let user_apploginwithcode = `${xiaomei360}/v2/user/app-login-with-code`;
// ---- APP注册登录
export let user_appregister = `${xiaomei360}/v2/user/app-register`;

// 用户
// ---- 获取用户信息
export let getUserInfo = `${xiaomei360}/v2/user/info`;
// ---- 修改用户省份
export let user_changeprovince = `${xiaomei360}/v2/user/change-province`;
// ---- 个人信息页
export let user_userInfo = `${xiaomei360}/v2/user/user-info`;
// ---- 修改个人信息
export let user_changeuserInfo = `${xiaomei360}/v2/user/change-user-info`;
// ---- 自动登录
// export let user_loginwithcode = `${xiaomei360}/v2/user/login-with-code`;
// ---- 
export let getLoginSms = `${xiaomei360}/v2/user/get-sms-check-no`;
// 
export let user_getApplyinfo = `${xiaomei360}/v2/user/get-apply-info`;

// ---- 提交认证信息
export let user_setApplyinfo = `${xiaomei360}/v2/user/set-apply-info`;
// ---- 审核反馈
export let user_applystatus = `${xiaomei360}/v2/user/apply-status`;
// ---- 签到
export let userCheckin = `${xiaomei360}/v2/user/check-in`;
// ---- 是否签到
export let userIsCheckin = `${xiaomei360}/v2/user/is-check-in`;
// ---- 问题反馈
export let user_serviceMessage = `${xiaomei360}/v2/user/service`;
// ---- 通用的注册&绑定
export let user_registercom = `${xiaomei360}/v2/user/register-com`;
// ---- 通用的自动登录
export let user_login = `${xiaomei360}/v2/user/login`;
// ---- 上传营业执照
export let uploadLicense = `${xiaomei360}/v2/user/upload-license`;
// ---- 上传门头照片
export let uploadShopFront = `${xiaomei360}/v2/user/upload-shop-front`;

// 品牌主页
// ---- 拉取品牌详情
export let brandView = `${xiaomei360}/v2/brand/view`;
// ---- 授权资质
export let brandLicense = `${xiaomei360}/v2/brand/license`;

// 贵宾区
export let getVipIndex = `${xiaomei360}/v2/vip/index`;
// 选品专辑
// ---- 专辑聚合列表
export let getCollList = `${xiaomei360}/v2/coll/list`;
// ---- 专辑详情
export let getCollDetail = `${xiaomei360}/v2/coll/detail`;

// ----分类-品牌库列ß表
export let catoPingpai = `${xiaomei360}/v2/brand/list`;
// ----分类左边主列表
export let cateListpai = `${xiaomei360}/v2/category/list`;
// ----分类右边详情
export let cateViewpai = `${xiaomei360}/v2/category/view`;

// 积分商城
// ---- 积分商城 - use
export let exchange_index = `${xiaomei360}/v2/exchange/index`;
// ---- 积分明细 - use
export let exchange_detail = `${xiaomei360}/v2/exchange/detail`;
// ---- 积分订单 - use
export let exchange_order = `${xiaomei360}/v2/exchange/order-list`;
// ---- 积分抽奖 - 
export let exchange_draw = `${xiaomei360}/v2/exchange/draw`;
// ---- 积分中奖记录 - 
export let exchange_draw_recor = `${xiaomei360}/v2/exchange/draw-record`;
// ---- 兑换商品 - 
export let exchange_buy = `${xiaomei360}/v2/exchange/buy`;

// 发现
export let foundGetCategory = `${xiaomei360}/v2/found/category`
export let foundGetAll = `${xiaomei360}/v2/found/all`
export let foundGetByIndex = `${xiaomei360}/v2/found/index`;
export let foundGetUnread = `${xiaomei360}/v2/found/unread`;

// 购物车
// ---- 拉取购物车列表
export let getCartlist = `${xiaomei360}/v2/cart/list`;
// ---- 删除购物车
export let deleteShopCart = `${xiaomei360}/v2/cart/delete`;
// ---- 购物车数量变更
export let cartUpdate = `${xiaomei360}/v2/cart/update`;
// ---- 往购物车增加商品
export let cartAdd = `${xiaomei360}/v2/cart/add`;
// ---- 购物车勾选
export let cartSelect = `${xiaomei360}/v2/cart/select`;
// ---- 购物车取消勾选
export let cartUnselect = `${xiaomei360}/v2/cart/unselect`;
// ---- 改变省份 获取直发邮费信息
export let cartChangeProvince = `${xiaomei360}/v2/cart/change-province`;
// ---- 直发凑单
export let zhifa_coudan = `${xiaomei360}/v2/cart/zhifa-coudan`;
// ---- 满减凑单
export let fullcut_coudan = `${xiaomei360}/v2/cart/fullcut-coudan`;
// ---- 品牌凑单
export let brand_coudan = `${xiaomei360}/v2/cart/brand-coudan`;
// ---- 汇付支付
export let huifuApp = `${xiaomei360}/v2/payment/huifu-app`;
export let huifuApp2 = `${xiaomei360}/v1/order/wxpay`;

// 订单
// ---- 拉取订单列表
export let orderGroup_list = `${xiaomei360}/v2/order-group/list`;
// ---- 确认订单
export let confirmOrderApi = `${xiaomei360}/v2/order-group/checkout`;
// ---- 创建订单
export let orderGroup_create = `${xiaomei360}/v2/order-group/create`;
// ---- 拉取订单详情
export let orderGroup_view = `${xiaomei360}/v2/order-group/view`;
// ---- 取消订单
export let orderGroup_cancel = `${xiaomei360}/v2/order-group/cancel`;
// ---- 订单确认收货
export let orderGroup_confimreceive = `${xiaomei360}/v2/order-group/confirm-receive`;
// ---- 快递信息查询
export let orderGroup_queryShipping = `${xiaomei360}/v2/order-group/query-shipping`;
// ---- 发货单列表
export let orderGroup_shippingList = `${xiaomei360}/v2/order-group/shipping-list`;
// ---- 支付成功
export let orderGroup_paydone = `${xiaomei360}/v2/order-group/pay-done`;
// ---- 订单不同状态数量列表
export let orderGroup_statusNumList = `${xiaomei360}/v2/order-group/status-num-list`;
// ---- 物流状态
export let orderGroup_wuliu = `${xiaomei360}/v2/order-group/query-shipping`;


// 积分商城
// ---- 奖品列表
export let getExchangePrizelist = `${xiaomei360}/v2/exchange/prize-list`;
// ---- 积分抽奖
export let getExchangeDraw = `${xiaomei360}/v2/exchange/draw`;
// ---- 积分中奖记录
export let getExchangeDrawrecord = `${xiaomei360}/v2/exchange/draw-record`;

// 特惠专场
// ---- 专场详情
export let getActpageView = `${xiaomei360}/v2/act-page/view`;

// 新品
// ---- 新品即将上新
export let getNewAliveList_alive = `${xiaomei360}/v2/new-brand/alive-list`;
// ---- 新品品牌
export let getNewAliveList_brand = `${xiaomei360}/v2/new-brand/brand-list`;
// ---- 新品商品列表
export let getNewAliveList_goods = `${xiaomei360}/v2/new-brand/goods-list`;
// ---- 新品详情上半部分
export let getNewAliveList_index = `${xiaomei360}/v2/new-brand/index`;

// 优惠券
// ---- 领券中心
export let coupon_cantakelist = `${xiaomei360}/v2/coupon/can-take-list`;
// ---- 已领取优惠券列表
export let coupon_receivedlist = `${xiaomei360}/v2/coupon/received-list`;
// ---- 领券
export let coupon_take = `${xiaomei360}/v2/coupon/take`;
// ---- 匹配指定优惠券
export let coupon_matchcouponlist = `${xiaomei360}/v2/coupon/match-coupon-list`;

// 邀请好友
// ---- 已邀请好友数
export let user_invite = `${xiaomei360}/v2/user/invite`;


// 信息提示框
export function showMessage(message) {
	uni.showToast({
		icon: "none",
		title: message,
		duration: 1500
	})
}

/**
 * 错误信息提示
 * @param {*} message 可选提示内容
 */
function _errorModal(message) {
	message = message || '数据请求失败，请检查当前网络是否稳定';
	uni.showModal({
		title: "提示",
		content: message
	})
}

/**
 * 登录失效, 提示重新登录
 */
function _showErrorLogin(type) {
	uni.showModal({
		title: '提示',
		content: "登录已失效，请重新授权登录",
		success: (res) => {
			uni.removeStorageSync('access_token');
			uni.removeStorageSync('userinfo');
			if (res.confirm) {
				uni.removeStorageSync('untoken');
				uni.redirectTo({
					url: '/pages/wxlogin/wxlogin'
				})
			} else if (res.cancel) {
				uni.removeStorageSync('untoken');
				uni.switchTab({
					url: '/pages/index/index'
				});
			}
		}
	});
}

/**
 * 公共请求, 默认GET请求
 * @param {*} params 
 * 
 */
export const request = async (params) => {
	let {
		method,
		url,
		data,
		header,
		isDebug,
		isNot,
		loading,
		loadingType
	} = params;
	let _url = Get;
	let _data = {};

	if (method) {
		method = method.toUpperCase();
	} else {
		method = "GET";
	}

	if (!USE_DEBUG) {
		// console.log(`USE_DEBUG : ${USE_DEBUG}`);
		// 请求类型
		if (method === 'POST') {
			_url = Post;
			if (data) {
				for (let key in data) {
					_data[key] = data[key];
				}
			}
		} else if (method === 'GET') {
			let query = '';
			if (data) {
				query = '?';
				for (let key in data) {
					query += (query == '?') ? `${key}=${data[key]}` : `&${key}=${data[key]}`;
				}
			}
			url = (url + query);
		}

		// 是否更换参数类型
		if (header) {
			_data.url_json = url;
		} else {
			_data.url = url;
		}
	} else {
		_url = url;
		if (data) {
			for (let key in data) {
				_data[key] = data[key];
			}
		}
		console.log(_url + " => " + method);
	}

	let _access_token = uni.getStorageSync('access_token');
	let _header = {
		'Authorization': _access_token ? _access_token : ''
	};

	// 登录失效返回 
	let unRes = {
		data: null,
		msg: "登录失效",
		code: 401
	};

	try {
		(loading && !loadingType) && uni.showNavigationBarLoading();
		(!loading && loadingType) && uni.showLoading({
			title: '加载中'
		});

		var [error, res] = await uni.request({
			method: method,
			url: _url,
			data: _data,
			header: _header,
		});

		(loading && !loadingType) && uni.hideNavigationBarLoading();
		(!loading && loadingType) && uni.hideLoading();

		if (error) {
			console.log(`error:` + JSON.stringify(error));
			_errorModal();
		}

		if (res && res.statusCode === 200) {
			let datas = res.data;
			if (datas.status == 401 && !isNot) {
				_showErrorLogin();
				unRes.log = "datas.status";
				return unRes;
			}
			return datas;
		} else if (res && res.statusCode == 401 && !isNot) {
			_showErrorLogin();
			unRes.log = "res.statusCode";
			return unRes;
		}
	} catch (e) {
		console.log(JSON.stringify(`catch` + e));
		_errorModal();
	}
	unRes.log = "try.catch";
	return unRes;
};

/**
 * 获取商品列表
 */
export const getGoodsArray = function(opt, callback) {
	let {
		params,
		access_token
	} = opt;

	let query = '?';
	for (let key in params) {
		if (query == '?') {
			query += `${key}=${params[key]}`;
		} else {
			query += `&${key}=${params[key]}`;
		}
	}
	let _URL = Get + '?url=' + encodeURIComponent(getGoodsList + query);
	uni.request({
		method: 'GET',
		url: _URL,
		data: {},
		header: {
			"Authorization": access_token ? access_token : ''
		},
		success: function(res) {
			if (res.statusCode === 200) {
				callback && callback(res.data);
			}
		},
		fail: function(res) {
			_errorModal();
		},
		complete: function(e) {}
	});
};

/**
 * 跳转页面
 * @param {Object} urlPath 页面路径
 */
export function goNavigateTo(urlPath) {
	if (urlPath) {
		uni.navigateTo({
			url: urlPath,
			animationType: "slide-in-right",
			animationDuration: 200,
			fail() {
				showMessage('页面不存在');
			}
		});
	} else {
		showMessage('页面路径不存在');
	}
}

/**
 * 获取登陆access_token
 * @param {Object} vm 实例模型
 */
export function getAccessToken(vm) {
	let accessToken = uni.getStorageSync('access_token');
	if (accessToken) {
		vm.$store.commit('updateToken', accessToken);
	} else {
		uni.redirectTo({
			url: '/pages/wxlogin/wxlogin'
		})
	}
}

/**
 * 拨打电话
 * @param {*} mobile 默认拨打 18926772751
 */
export function callMobile(mobile) {
	uni.makePhoneCall({
		phoneNumber: mobile || '18926772751',
		fail: function() {
			vm.$api.showMessage('拉起拨打电话失败');
		}
	});
}

/**
 * 设置tabbar角标
 */
export function getTabbarCart(totalCount) {
	try {
		let cartNumber = totalCount || uni.getStorageSync('cartNumber') || 0;
		if (cartNumber && Number(cartNumber) > 0) {
			uni.setTabBarBadge({
				index: 3,
				text: Number(cartNumber) > 100 ? '...' : (cartNumber).toString()
			});
		} else {
			uni.removeTabBarBadge({
				index: 3
			})
		}
	} catch (e) {
		console.log(e)
		//TODO handle the exception
	}
}
