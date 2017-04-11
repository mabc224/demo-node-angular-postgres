/**
 * Created by Arsalan on 5/4/2017.
 */

var pool = require('./dbConfig');

module.exports = function (text, values, cb) {
	pool.connect(function (err, client, done) {
		if (err) return cb(err);
		client.query(text, values, function (err, result) {
			done();
			if (err) return cb(err);
			return cb(null, result.rows, result);
		});
	});
};
