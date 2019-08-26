/**
 * 格式化数字
 * @param  {[string | number]} number  [要格式化的数字]
 * @param  {[number]} decimals         [保留几位小数]
 * @param  {[string]} dec_point        [小数点符号]
 * @param  {[string]} thousands_sep    [千分位符号]
 * @param  {[string]} roundtag         [舍入参数，默认 "ceil" 向上取,"floor"向下取,"round" 四舍五入]
 * @return {[string]} 格式化后的结果
 */
export function number_format(opt) {
    let { number, decimals, dec_point, thousands_sep, roundtag } = opt;
    number = (number + '').replace(/[^0-9+-Ee.]/g, '');
    roundtag = roundtag || 'ceil'; //"ceil","floor","round"
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = typeof thousands_sep === 'undefined' ? ',' : thousands_sep,
        dec = typeof dec_point === 'undefined' ? '.' : dec_point,
        s = '',
        toFixedFix = function(n, prec) {
            var k = Math.pow(10, prec);
            return '' + parseFloat(Math[roundtag](parseFloat((n * k).toFixed(prec * 2))).toFixed(prec * 2)) / k;
        };
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    var re = /(-?\d+)(\d{3})/;
    while (re.test(s[0])) {
        s[0] = s[0].replace(re, '$1' + sep + '$2');
    }

    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}

/**
 * 
 * @param {*} newValue 
 * @param {*} that 
 */
export function watchData(newValue, that) {
    let _entitys = (newValue && newValue.goodsInfo) || newValue;
    // console.log(newValue);
    let { goodsName, goodsThumb, thumb, goodsNum, isBuyByBox, isMix, isZhifa, maxNum, numberPerBox, spuList, start, startNum, unit } = _entitys;
    // 商品名称&图标
    that.thumb = goodsThumb || thumb;
    that.goodsName = goodsName;
    // 
    that.startNum = start || startNum;
    that.stock = maxNum;
    // 标签
    that.isZhifa = isZhifa;
    that.isBuyByBox = isBuyByBox;
    that.isMix = isMix;
    //
    if (spuList) {
        let { maxNum, startNum, goodsId, price } = spuList[0];
        if (maxNum > startNum || maxNum == startNum) {
            that.added = [{ goodsId, goodsNum: startNum, goodsPrice: price }];
            that.totalCount = parseInt(startNum);
            let _price = startNum * (price - 0);
            that.totalPrice = number_format({ number: _price, decimals: 2, roundtag: 'ceil' });
        }
        that.addList = spuList.map((item, index) => {
            let { selected, goodsNum } = index === 0 ? { selected: true, goodsNum: item.startNum } : { selected: false, goodsNum: 0 };
            let _price = item.price;
            return {
                selected: selected,
                buyByBox: item.buyByBox,
                goodsId: item.goodsId,
                goodsNum: goodsNum,
                goodsName: item.skuSize,
                goodsSn: item.goodsSn,
                thumb: item.goodsThumb,
                //
                maxNum: item.maxNum,
                numberPerBox: item.numberPerBox,
                //
                price: _price,
                goodsPrice: _price,
                reminder: item.reminder,
                startNum: item.startNum,
            };
        });
    } else {
        let { boxNum, buyByBox, reminder, startNum, stock, goodsId, goodsSn, goodsPrice } = _entitys;
        that.addList = [{
            reminder,
            stock,
            startNum,
            goodsPrice,
            maxNum,
            numberPerBox,
            selected: true,
            goodsNum: startNum,
            //
            boxNum,
            buyByBox,
            // 
            goodsId,
            goodsSn,
            goodsName,
            thumb,

        }];
        if (maxNum > startNum || maxNum == startNum) {
            that.added = [{ goodsId, goodsNum: startNum, goodsPrice }];
            that.totalCount = parseInt(startNum);
            let _price = startNum * (goodsPrice - 0);
            that.totalPrice = number_format({ number: _price, decimals: 2, roundtag: 'ceil' });
        }
    }

}