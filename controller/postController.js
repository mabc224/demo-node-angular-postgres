var debug = require('debug')('Controller:authentication');
var util = require('util');
var _ = require("lodash");


var query = require("./../config/dbQuery");

exports.addPost = function (req, res, next) {

	var title = req.body['title'];
	var body = req.body['body'];
	var lat = req.body['lat'];
	var lng = req.body['lng'];
	var user_id = req.body['user_id'];


	query('INSERT INTO posts(title, body, lat,lng, user_id) VALUES($1, $2, $3, $4, $5)',
		[title, body, lat, lng, user_id], function(err, result) {
			if(err) {
				return res.status(500).json({ error: true, message: err.message });
			}
			return res.status(200).json({ error: false, data: result[0] });
		});
};

exports.allPost = function (req, res) {

	var userId = req.body['user_id'];

	query('SELECT p.id, p.title, p.body, p.lat, p.lng, u.username FROM users u, posts p where u.id=p.user_id',
		[], function(err, result) {
			if(err) {
				return res.status(500).json({ error: true, message: err.message });
			}
			return res.status(200).json({ error: false, data: result });
		});
};

exports.singlePost = function (req, res) {

	var postId = req.params['id'];

	query('select title, body, lat,lng from posts WHERE id = $1',
		[postId], function(err, result) {
			if(err) {
				return res.status(500).json({ error: true, message: err.message });
			}
			return res.status(200).json({ error: false, data: result[0] });
		});
};



exports.removeSinglePost = function (req, res, next) {

	var postId = req.params['id'];

	query('delete from posts WHERE id = $1',
		[postId], function(err, result) {
			if(err) {
				return res.status(500).json({ error: true, message: err.message });
			}
			return res.status(200).json({ error: false, data: [] });
		});
};

function errorMessageParser(data) {

	var messages = [];
	_.forEach(data, function (d) {
		messages.push(d.msg);
	});
	return messages;
}







