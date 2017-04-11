/**
 * Created by Arsalan on 28/3/2017.
 */
var twilio = require('twilio');

var appConfig = require("./../config/appConfig");


var accountSid = appConfig.twilio.sid;
var authToken = appConfig.twilio.token;
var from_phone = appConfig.twilio.from;

var client = require('twilio')(accountSid, authToken);

module.exports = function (phoneto, code, cb) {
	client.messages.create({
		body: "Your stuffmapper security code " + code,
		to: phoneto,
		from: from_phone
	});
};



