/**
 * 运行某一方法多次
 * @param  {Function} func   需要运行的方法
 * @param  {Number} times   运行的次数
 * @param  {Number} timeout 超时时间
 * @return {}
 */
const runTimes = async (func, times = 3, timeout = 20000) => {
	for (let i = 0; i < times; i++) {
		try {
			return await runTimeout(func,timeout);
		} catch (err) {
			console.log(err.message);
		}
	}
};

/**
 * 函数运行超时设置判断
 * @param  Function} func   需要运行的方法,返回的是 Promise 函数
 * @param  {Number} timeout 超时时间
 * @return
 */
const runTimeout = async (func, timeout = 20000) => {
	return await Promise.race([
		func(),
		new Promise((resolve, reject) => {
			setTimeout(() => {
				reject(new Error('操作超时'))
			}, timeout)
		})
	]);
};

module.exports = {
	runTimes
}