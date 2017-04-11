var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

var routeV1 = require('./routes/index');


var app = express();

// *** cross domain requests *** //

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Authorization');
	next();
});

app.disable('x-powered-by');


//if (process.env.NODE_ENV !== 'production') {
	app.use(logger('dev'));
//}


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());  //required for Express-Validator
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'frontend')));

app.use('/api/v1', routeV1);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	return res.status(404).json({error: true, message: err.message });

});

// error handler
app.use(function (err, req, res, next) {
	if(!err) return next();
	return res.status(err.statusCode || 500).json({error: true, message: [err.message] || [] });
});

app.get('*', function (req, res) {
	res.sendFile(path.join(__dirname, '/frontend/index.html'));
});

process.on('uncaughtException', function (err) {
	console.error('uncaughtException: ', err)
	console.error(err.stack)
	process.exit(1)}
);



module.exports = app;
