/**
 * Created by Arsalan on 5/4/2017.
 */
var pg = require("pg");

var appConfig = require("./appConfig");

var pgConfig = {
	user: appConfig.database.user,
	database: appConfig.database.dbname,
	password: appConfig.database.password,
	port: appConfig.database.port,
	max: appConfig.database.maxConnection,
	idleTimeoutMillis: appConfig.database.idleTimeoutMillis
};
var pool = new pg.Pool(pgConfig);

module.exports = pool;
