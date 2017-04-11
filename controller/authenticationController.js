var debug = require('debug')('Controller:authentication');
var util = require('util');
var _ = require("lodash");
var jsonWebToken = require('jsonwebtoken');
var randomize = require('randomatic');



var query = require("./../config/dbQuery");
var appConfig = require("./../config/appConfig");
var twilioCode = require("./twilio");

exports.handleSignUp = function (req, res, next) {

	var username = req.body['username'];
	var phone = req.body['phone'];
	var code = randomize('0', 6);
	query('INSERT INTO users(username, phone_number, phone_authentication_token ) VALUES($1, $2, $3)',
		[username, phone, code], function(err, result) {
			if(err) {
				return res.status(500).json({ error: true, message: err.message });
			}
			return res.status(200).json({ error: false, data: result[0] });

		});
};

exports.handleSignIn = function (req, res) {

	var username = req.body['username'];
	var phone = req.body['phone'];

	// returning id, username, phone_number, phone_authentication_token
	query('select id, username, phone_number, phone_authentication_token from users WHERE username = $1 AND phone_number = $2',
		[username, phone], function(err, result) {
			if(err) {
				return res.status(500).json({ error: true, message: err.message });
			}
			if (result.length == 0) {
				return res.json({
					error: true,
					message: 'User Authentication failed'
				});
			}

			twilioCode(phone, result[0].phone_authentication_token,  function (err, message) {
				if(err){
					return res.status(500).json({ error: true, message: "Error in sending code to mobile" });
				}
				return res.status(200).json({ error: false, data: result[0] });

			});
		});
};

exports.handleVerifyLogin = function (req, res, next) {

	var username = req.body['username'];
	var code = req.body['code'];

	// returning id, username, phone_number, phone_authentication_token
	query('select id, username, phone_number from users WHERE username = $1 AND phone_authentication_token = $2',
		[username, code], function(err, result) {
			if(err) {
				return res.status(500).json({ error: true, message: err.message });
			}
			if (result.length == 0) {
				return res.json({
					error: true,
					message: 'User Authentication failed'
				});
			}

			var code = randomize('0', 6);
			query('UPDATE users SET phone_authentication_token = $1 WHERE username = $2',
				[code, username], function(err, no) {
					var accessToken = jsonWebToken.sign(result[0], appConfig.jwtSecret, {
						algorithm: 'HS256',
						expiresIn: 3600 //we are setting the expiration time of 1 hr.
					});
					result[0].token = accessToken;

					return res.status(200).json({ error: false, data: result[0] });
				});
		});
};

exports.logOut = function (req, res, next) {

};


/*
exports.userSignedIn = function (req, res, next) {
	conn.auth().onAuthStateChanged(function (user) {
		if (user) {
			next();
		} else {
			next(new Error("user is not signed in"));
		}
	});
};
 */
function errorMessageParser(data) {

	var messages = [];
	_.forEach(data, function (d) {
		messages.push(d.msg);
	});
	return messages;
}







