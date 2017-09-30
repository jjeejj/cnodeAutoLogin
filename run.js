const Nightmare = require('nightmare');

const runHelp = require('./libs/runHelp.js');
const config = require('./config/config.js');

const nightmare = Nightmare({
	show: true
});

// const run = async() => {
// 	await nightmare.goto('http://www.baidu.com')
// 		.type('#kw', '曾经仗梦走天涯')
// 		.click('#su');
// };

//登录
const login = async () => {
	await nightmare.goto('https://cnodejs.org/signin')
		.wait('#signin_form')
		.click('.form-actions :nth-child(2)');
//该处代码的作用的，有可能登陆过一次，被记忆的课，就不用认证了，直接跳转到首页了
	const result = await Promise.race([
		nightmare.wait('#login_field').then(() => 'github'),
		nightmare.wait('#create_topic_btn').then(() => 'cnodejs')
	]);

	console.log('result >>>>>>>>>',result)

	if (result === 'cnodejs') {
		return;
	} else if (result === 'github') {
		await nightmare.type('#login_field', config.github.username)
			.type('#password', config.github.password)
			.click('input[name="commit"]');
	}
};

//重复运行函数，增强健壮性
runHelp.runTimes(login,3);

// login();