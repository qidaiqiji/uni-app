/**
 * 格式化时间[补位数]
 * @param {type} num 值
 * @returns {String}
 */
function forMatNum(num) {
	num = num < 0 ? 0 : num;
	return num < 10 ? '0' + num : num + '';
}

function initDays(year, month) {
	let totalDays = new Date(year, month, 0).getDate();
	let dates = [];
	for (let d = 1; d <= totalDays; d++) {
		dates.push(forMatNum(d));
	}
	return dates;
}

function initPicker(start, end, mode = "date", step = 1) {
	let initstartDate = new Date(start);
	let endDate = new Date(end);
	let startYear = initstartDate.getFullYear();
	let startMonth = initstartDate.getMonth();
	let endYear = endDate.getFullYear();
	let years = [],
		months = [],
		days = [],
		hours = [],
		minutes = [];
	let totalDays = new Date(startYear, startMonth, 0).getDate();
	for (let s = startYear; s <= endYear; s++) {
		years.push(s + '');
	};
	for (let m = 1; m <= 12; m++) {
		months.push(forMatNum(m));
	};
	for (let d = 1; d <= totalDays; d++) {
		days.push(forMatNum(d));
	}
	for (let h = 0; h < 24; h++) {
		hours.push(forMatNum(h));
	}
	for (let m = 0; m < 60; m += step) {
		minutes.push(forMatNum(m));
	}
	switch (mode) {
		case "date":
			return {
				years,
				months,
				days
			}
			break;
		case "yearMonth":
			return {
				years,
				months
			}
			break;
		case "dateTime":
			return {
				years,
				months,
				days,
				hours,
				minutes
			}
			break;
		case "time":
			return {
				hours,
				minutes
			}
			break;
	}
}

/**
 * 格式化时间
 * @param {type} val 时间值
 * @returns {Number} 返回时间值的时间戳值
 */
function getDateTime(val) {
	var date = new Date(val.replace(/-/g, '/'));
	return date.getTime();
}

function getDateString() {
	let data = new Date();
	let years = data.getFullYear();
	let months = data.getMonth() + 1;
	let days = data.getDate();
	let hours = data.getHours();
	let minutes = data.getMinutes();
	let seconds = data.getSeconds();
	return {
		year: years,
		month: forMatNum(months),
		day: forMatNum(days),
		hour: forMatNum(hours),
		minute: forMatNum(minutes),
		seconds: forMatNum(seconds)
	};
}

/**
 * 获取当前时间
 * @param {type} type    保留值
 * @returns {String}
 */
function getNowTime(type) {
	let d = getDateString();
	if (type == 'ymd') {
		return `${d.year}-${d.month}-${d.day}`;
	}
	if (type == 'month') {
		return d.month;
	}
	if (type == 'day') {
		return d.month;
	}
	// 格式化时间
	return `${d.year}-${d.month}-${d.day} ${d.hour}:${d.minute}:${d.seconds}`;
}

/**
 * 返回距离结束时间的剩余时间
 * @param {type} val    结束时间
 * @param {type} type   返回类型[true]按天,时,分,秒,依次返回单一值,[false]按天,时,分,秒组合返回
 * @param {type} bhour  返回最大化小时
 * @returns {Number}    结果
 */
function getEndTime(val, type, bhour) {
	let _nowDate = getNowTime();
	let nowTime = getDateTime(_nowDate);
	let endTime = getDateTime(val);

	let endDay = endTime - nowTime;
	let res = Math.floor(endDay / (24 * 60 * 60 * 1000));

	// 未来时间距离现在的秒数
	var second = Math.floor((endTime - nowTime) / 1000);
	// 整数部分代表的是天；一天有24*60*60=86400秒
	var day = Math.floor(second / 86400);
	// 余数代表 剩下的小时秒数
	var _hours = second % 86400;
	var hour = Math.floor(_hours / 3600);
	// 余数代表 剩下的分数；
	var _minutes = second %= 3600;
	var minute = Math.floor(_minutes / 60);
	// 余数代表 剩下的秒数；
	var _seconds = second %= 60;
	var seconds = _seconds;

	if (type !== 'all') {
		if (day > 0) {
			return {
				time: forMatNum(day),
				type: "天"
			};
		}
		if (hour > 0) {
			return {
				time: forMatNum(hour),
				type: "时"
			};
		}
		if (minute > 0) {
			return {
				time: forMatNum(minute),
				type: "分"
			};
		}
		if (seconds > 0) {
			return {
				time: forMatNum(seconds),
				type: "秒"
			};
		}
	}
	if (type === 'all') {
		let t = {
			day: forMatNum(day),
			hour: forMatNum(hour),
			minute: forMatNum(minute),
			seconds: forMatNum(seconds)
		}
		if (bhour) {
			t.hour = (day * 24 + hour);
		}
		return t;
	}
	return res;
}

function sortObject(property) {
	return function(a, b) {
		var value1 = a[property];
		var value2 = b[property];
		return value1 - value2;
	}
}

export {
	initDays,
	initPicker,
	getDateTime,
	getNowTime,
	getEndTime,
	sortObject
}
