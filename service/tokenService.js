/**
 * Created by Arsalan on 6/4/2017.
 */

var passport = require('passport')
var BearerStrategy = require('passport-http-bearer').Strategy
var jsonWebToken = require('jsonwebtoken');

var appConfig = require("./../config/appConfig");


passport.use(new BearerStrategy(
	function(accessToken, callback) {

		jsonWebToken.verify(accessToken, appConfig.jwtSecret, function (error, decoded) {
			if (error) {
				var errr = new Error(error.message);
				errr.statusCode = 403;
				return callback();
			}
			if(!decoded){
				var errr = new Error("Can not verify token");
				errr.statusCode = 403;
				callback(errr)
			}
			callback(null, "OK", { scope: '*' });

		});
	}
));

exports.isBearerAuthenticated = passport.authenticate('bearer', { session: false });
