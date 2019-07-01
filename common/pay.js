let payHuifuApp2 = async function (groupSn, vm) {
	let access_token = uni.getStorageSync('access_token');
	uni.showNavigationBarLoading();
	let res = await vm.$api.request({
		method: 'post',
		header: true,
		access_token: access_token,
		url: vm.$api.huifuApp2,
		data: {
			data: {
				groupId: groupSn
			}
		}
	});
	uni.hideNavigationBarLoading();
	let { appid, noncestr, partnerid, prepayid, sign, time } = res;
	let _package = res.package;
	uni.requestPayment({
		provider: 'wxpay',
		timeStamp: time,
		nonceStr: noncestr,
		package: `prepay_id=${prepayid}`,
		signType: 'MD5',
		paySign: sign,
		orderInfo: {
			// appid
			appid: appid,
			//
			noncestr: noncestr,
			// 固定 Sign=WXPay
			package: _package,
			// 商户号
			partnerid: partnerid,
			// 预付单号
			prepayid: prepayid,
			timestamp: time,
			// MD5 值
			sign: sign
		},
		success: function (res) {
			// vm.successinfo = JSON.stringify(res);
			let pageUrl = '../paySuccess/paySuccess?groupId=' + groupSn;
			uni.redirectTo({ url: pageUrl });
		},
		fail: function (err) {
			// vm.failInfo = JSON.stringify(err);
			// 支付失败or取消支付,都去到订单待支付画面
			let pageUrl = '../order/order?status=needPay&tab=1';
			uni.showModal({
				title: "支付提示",
				content: "支付失败，请稍后重试！",
				success: function (res) {
					if (res.confirm) {
						uni.redirectTo({ url: pageUrl });
					} else if (res.cancel) {
						uni.redirectTo({ url: pageUrl });
					}
				}
			});
		}
	});
};


export default payHuifuApp2;
