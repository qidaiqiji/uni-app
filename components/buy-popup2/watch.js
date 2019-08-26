/**
 * 
 * @param {*} newValue 
 * @param {*} that 
 */
export function watchData(newValue, that) {
    let { goodsName, goodsNum, goodsThumb, isBuyByBox, isMix, isZhifa, maxNum, numberPerBox, start, unit, spuList, marketPrice } = newValue;
    that.goodsName = goodsName;
    that.thumb = goodsThumb;
    that.start = start;
    that.unit = unit;
    that.goodsNumber = maxNum;
    // 购物车列表
    if (spuList) {
        let { maxNum, startNum, goodsId, price } = spuList[0];
        if (maxNum > startNum || maxNum == startNum) {
            that.added = [{ goodsId, goodsNum: startNum, goodsPrice: price }];
        }
        that.addList = spuList.map(item => {
            let _price = item.price.replace('.00', '');
            return {
                goodsId: item.goodsId,
                goodsNum: goodsNum,
                thumb: item.goodsThumb,
                selected: true,
                price: _price,
                goodsPrice: _price,
                goodsSn: item.goodsSn,
                maxNum: item.maxNum,
                reminder: item.reminder,
                startNum: item.startNum,
                stock: item.goodsNum,
                numberPerBox: item.numberPerBox,
                boxNum: item.numberPerBox,
                marketPrice: marketPrice
            };
        });
    }
}