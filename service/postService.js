/**
 * Created by Arsalan on 5/4/2017.
 */
var debug = require('debug')('Controller:authentication');
var util = require('util');
var _ = require("lodash");

var query = require("./../config/dbQuery");

exports.addPostValidator = function (req, res, next) {

	req.checkBody({
		'title': {
			notEmpty: true,
			errorMessage: 'title should not be empty'
		},
		'body': {
			notEmpty: true,
			errorMessage: 'body should not be empty'
		},
		'lat': {
			notEmpty: true,
			isFloat: {
				errorMessage: 'Lat must be float digits'
			},
			errorMessage: 'Invalid lat from map'
		},
		'lng': {
			notEmpty: true,
			isFloat: {
				errorMessage: 'Lng must be float digits'
			},
			errorMessage: 'Invalid lng from map'
		}
	});

	var errors = req.validationErrors();
	if (errors) {
		return res.status(400).json({ error: true, message: util.inspect(errors) });
	} else {
		next();
	}
};

exports.singlePostValidator = function (req, res, next) {

	req.checkParams({
		'id': {
			notEmpty: true,
			isNumeric: {
				errorMessage: 'Post id must be numeric digit'
			},
			errorMessage: 'Invalid post id'
		}
	});

	var errors = req.validationErrors();
	if (errors) {
		return res.status(400).json({ error: true, message: util.inspect(errors) });
	} else {
		next();
	}
};
