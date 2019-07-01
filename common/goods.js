/**
 * 商品列表查询条件
 * @param {Object} that
 * @param {Object} type
 */
function goodsQueryParams(that, type) {
    let res = {};
    let fields = {
        page: 'page',
        pageSize: 'pageSize',
        keywords: 'keywords',
        brandIdsList: 'brandId',
        sortColumn: 'sortColumn',
        order: 'order',
        catId: 'catId',
        catIdList: 'catIdList',
        tags: 'tagsId',
        countryList: 'ctsName',
        // attrRegionList: 'ctsName',
        eventId: 'eventId'
    };
    for (var key in fields) {
        let pm = fields[key];
        let vals = that[pm];
        if (vals) {
            if (key == 'countryList') {
                res['countryList[0]'] = vals;
            } else if (key == 'catIdList') {
                res['catIdList[0]'] = vals;
            } else {
                res[key] = vals;
            }
        }
    }
    fields = null;
    return type == '2' ? res : string;
}

/**
 * 筛选条件赋值
 * @param {Object} item
 * @param {Object} index
 * @param {Object} that
 */
function goodsChoseThis(item, index, that) {
    goodsResetNavStyle(that, 0)
    if (index || '' + index == '0') {
        if (that.ctsName == item) {
            that.ctsId = -1;
            that.ctsName = '';
        } else {
            that.ctsId = index;
            that.ctsName = item;
        }
    }
    if (item['catId']) {
        if (that.catId == item['catId']) {
            that.catId = '';
        } else {
            that.catId = item['catId'];
        }
    }
    if (item['id']) {
        if (that.tagsId == item['id']) {
            that.tagsId = '';
        } else {
            that.tagsId = item['id'];
        }
    }
}

/**
 * 重置导航条颜色
 * @param {Object} that
 * @param {Object} key
 */
function goodsResetNavStyle(that, key) {
    ['all', 'salesCount', 'goodsPrice', 'discount', 'sel'].map(e => {
        if (e !== key) {
            that[e] = '';
        }
    });
}

/**
 * 商品数据列表价格区分
 * @param {*} goods 
 */
function goodsPriceBigMin(goods) {
    return goods.map(e => {
        let goodsPrice = e.goodsPrice || e.goodsInfo && e.goodsInfo.goodsPrice;
        if (goodsPrice) {
            let array = goodsPrice.split('.');
            e.big = array[0];
            e.min = array[1];
        }
        return e;
    });
}

/**
 * 品牌详情查看图片详情
 * @param {*} brandDetail 
 */
function barndsImagesDetail(brandDetail) {
    var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/gi;
    var arr = brandDetail.match(srcReg);
    return arr.map(e => {
        let _val = e.replace('src=', '').replace(/[\"]/gi, '');
        return _val;
    });
}


/**
 * 订单确认收货
 * @param {Object} groupSn
 */
function goodsCheckPackage(groupSn) {

}

export {
    goodsQueryParams,
    goodsChoseThis,
    goodsResetNavStyle,
    goodsPriceBigMin,
    barndsImagesDetail
}