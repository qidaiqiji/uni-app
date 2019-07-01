import api from './index';

// 购物车数量变更
export const cartUpdate = async (recId, goodsNum) => {
	let res = await api.request({
		method: 'POST',
		url: api.cartUpdate,
		data: {
			recId: recId,
			num: goodsNum
		}
	});
	return res.data;
};


// 改变省份 获取直发邮费信息
export const cartChangeProvince = async (provinceId) => {
	let res = await api.request({
		method: 'GET',
		url: `${api.cartChangeProvince}?provinceId=${provinceId}`
	});
	return res.data;
}

//删除按钮接口
export const cartDelete = async (recId) => {
	let res = await api.request({
		method: 'POST',
		url: api.deleteShopCart,
		data: {
			recIdList: recId
		}
	});
	//this.resetCart(res.data);
	return res;
};

// 往购物车增加商品
export const cartAdd = async (recId, goodsNum) => {
	let res = await api.request({
		method: 'POST',
		url: api.cartAdd,
		data: {
			recId: recId,
			num: goodsNum
		}
	});
};

// 购物车勾选
export const cartSelect = async (recId) => {
	let res = await api.request({
		method: 'POST',
		url: api.cartSelect,
		data: {
			recIdList: recId
		}
	});
	//this.resetCart(res.data);
	return res;
};

// 购物车取消勾选
export const cartUnselect = async (recId) => {
	let res = await api.request({
		method: 'POST',
		url: api.cartUnselect,
		data: {
			recIdList: recId
		}
	});
	//this.resetCart(res.data);
	return res;
};


//设置到货提醒
export const setReminder = async (goodsId, access_token) => {
	let res = await api.request({
		method: 'GET',
		url: `${api.setReminder}?goodsId=${goodsId}`
	});
	return res.data;
}

//取消到货提醒
export const unSetReminder = async (goodsId, access_token) => {
	let res = await api.request({
		method: 'GET',
		url: `${api.unSetReminder}?goodsId=${goodsId}`
	});
	return res.data;
}

//获取商品详情

export const getGoodDetail = async (goodsId) => {
	let res = await api.request({
		method: 'GET',
		url: `${api.getGoodsView}?goodsId=${goodsId}`
	});
	return res.data;
}


export function cartNumberComputed(_O, action) {
	let _buyByBox = _O['buyByBox'];
	let _cartNums = Number(_O['cartNum']);
	let addGoodsNum = 0;
	if (_buyByBox) {
		let _boxNum = Number(_O['boxNum']);
		addGoodsNum = action ? (_cartNums - _boxNum) : (_cartNums + _boxNum);
	} else {
		addGoodsNum = action ? (_cartNums - 1) : (_cartNums + 1);
	}
	return addGoodsNum;
}

// 直发凑单
// 满减凑单
// 品牌凑单
