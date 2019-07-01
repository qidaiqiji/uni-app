/**
 *  页面权限验证 - 首页
 * @param {Object} callback 回调
 */
export function userValidateLogin(callback) {
	let is_checked = uni.getStorageSync('is_checked');
	let access_token = uni.getStorageSync('access_token');
	if (!access_token) {
		uni.reLaunch({
			url: '../wxlogin/wxlogin'
		});
	} else {
		let _isCheck = is_checked != 4 && is_checked != 2;
		// 进入审核反馈
		if (_isCheck) {
			uni.reLaunch({
				url: '../usableno/usableno?u=1'
			});
		} else if (is_checked == 4) {
			// 进入认证审核
			uni.navigateTo({
				url: '../usable/usable?u=1'
			});
		} else {
			if (typeof callback == 'function') {
				callback();
			}
		}
	}
}

/**
 * 页面权限验证 - (分类，发现，购物车，我的)
 * @param {Object} callback
 */
export function userValidateLogin2(callback) {
	let is_checked = uni.getStorageSync('is_checked');
	let access_token = uni.getStorageSync('access_token');
	// 是否存在未登陆情况
	if (!access_token) {
		setTimeout(function() {
			uni.hideNavigationBarLoading();
			uni.reLaunch({
				url: '../wxlogin/wxlogin'
			});
		}, 1000);
	} else {
		let _isCheck = is_checked != 4 && is_checked != 2;
		// 是否存在未审核通过用户
		if (_isCheck) {
			// 进入审核反馈
			setTimeout(function() {
				uni.hideNavigationBarLoading();
				uni.reLaunch({
					url: '../usableno/usableno?u=1'
				});
			}, 1000);
		} else if (is_checked == 4) {
			// 进入认证审核
			setTimeout(function() {
				uni.hideNavigationBarLoading();
				uni.navigateTo({
					url: '../usable/usable?u=1'
				});
			}, 1000);
		} else {
			uni.hideNavigationBarLoading();
			if (typeof callback == 'function') {
				callback();
			}
		}
	}
}
