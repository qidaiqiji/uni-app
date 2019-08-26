/**
 * 更新导航条样式选择&查询条件
 * @param {*} type 
 * @param {*} that 
 */
export function turnUp(type, that) {
  navStyle(type, that);
  if (type != 'all') {
    if (!that[type] || that[type] == 'desc') {
      that[type] = 'order';
    } else {
      that[type] = 'desc';
    }
    if (type == 'goodsPrice') {
      that.sortColumn = 'min_price';
    } else if (type == 'salesCount') {
      that.sortColumn = 'sale_count';
    } else if (type == 'discount') {
      that.sortColumn = 'discount';
    }
    that.order = that[type].toUpperCase();
  } else {
    that[type] = type;
  }
  that.$emit('change', { sortColumn: that.sortColumn, order: that.order, type: true });
};

/**
 * 重置导航条颜色
 * @param {*} type 
 * @param {*} that 
 */
export function navStyle(type, that) {
  ['all', 'salesCount', 'goodsPrice', 'discount'].map(item => {
    if (item != type) {
      that[item] = '';
    }
  });
}