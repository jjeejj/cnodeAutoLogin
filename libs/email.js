const nodemailer = require('nodemailer');
const config = require('./config/config.js');

let transporter = nodemailer.createTransport({
	config.email.smtpConfig
});

/**
 * Async 同步发邮件的方法
 * @param  {String} subject 标题
 * @param  {String} text   内容
 * @return {}   
 */
const sendMail = async(subject, text) => {
	return await new Promise((resolve, reject) => {
		transporter.sendMail(data, (err, info) => {
			if (err) {
				reject(err.message);
			}
			resolve(info.response);
		})
	})
};

module.exports = {
	sendMail
};