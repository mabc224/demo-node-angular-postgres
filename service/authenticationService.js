/**
 * Created by Arsalan on 5/4/2017.
 */
var debug = require('debug')('Controller:authentication');
var util = require('util');
var _ = require("lodash");

var query = require("./../config/dbQuery");

exports.handleSignUpValidator = function (req, res, next) {

	req.checkBody({
		'username': {
			notEmpty: true,
			errorMessage: 'Username should not be empty'
		},
		'phone': {
			notEmpty: true,
			isNumeric: {
				errorMessage: 'Phone # must be numeric digits'
			},
			isLength: {
				options: [{ min: 7, max: 14 }],
				errorMessage: 'Phone # must be between 7 and 14 chars long'
			},
			errorMessage: 'Invalid phone number'
		}
	});

	var errors = req.validationErrors();
	if (errors) {
		return res.status(400).json({ error: true, message: util.inspect(errors) });
	} else {
		next();
	}
};

exports.handleSignInValidator = function (req, res, next) {

	req.checkBody({
		'username': {
			notEmpty: true,
			errorMessage: 'Username should not be empty'
		},
		'phone': {
			notEmpty: true,
			isNumeric: {
				errorMessage: 'Phone # must be numeric digits'
			},
			isLength: {
				options: [{ min: 7, max: 14 }],
				errorMessage: 'Phone # must be between 7 and 14 chars long'
			},
			errorMessage: 'Invalid phone number'
		}
	});

	var errors = req.validationErrors();
	if (errors) {
		return res.status(400).json({ error: true, message: util.inspect(errors) });
	} else {
		next();
	}
};

exports.handleVerifyLoginValidator = function (req, res, next) {
	req.checkBody({
		'username': {
			notEmpty: true,
			errorMessage: 'Username should not be empty'
		},
		'code': {
			notEmpty: true,
			isNumeric: {
				errorMessage: 'Code # must be numeric digits only'
			},
			isLength: {
				options: [{ min: 6, max: 6 }],
				errorMessage: 'Code must be between 6 chars long'
			},
			errorMessage: 'Invalid code'
		}
	});

	var errors = req.validationErrors();
	if (errors) {
		return res.status(400).json({ error: true, message: util.inspect(errors) });
	} else {
		next();
	}
};

exports.logOutValidator = function (req, res, next) {
	next()
};



function errorMessageParser(data) {

	var messages = [];
	_.forEach(data, function (d) {
		messages.push(d.msg);
	});
	return messages;
}







