var development = {
	database: {
		user: process.env.PGUSER || 'postgres',
		dbname: process.env.PGDATABASE || 'stuffmapper',
		password: process.env.PGPASSWORD || 'postgres',
		host: process.env.PGHOST || 'localhost',
		port: process.env.PGPORT || 5432,
		maxConnection: process.env.MAXCONNECTION || 1,
		idleTimeoutMillis: process.env.IDLETIMEOUT || 30000
	},
	jwtSecret: process.env.JWT_SECRET || 'f!DT3[i+Zl(W}17:%@]Tly*#/F&&L',
	appPort: process.env.PORT || 3000,
	twilio: {
		sid: process.env.TWILIO_SID,
		token: process.env.TWILIO_TOKEN ,
		from: process.env.TWILIO_FROM
	}
};

var production = {
	database: {
		user: process.env.PGUSER,
		database: process.env.PGDATABASE,
		password: process.env.PGPASSWORD,
		host: process.env.PGHOST,
		port: process.env.PGPORT,
		max: process.env.MAXCONNECTION,
		idleTimeoutMillis: process.env.IDLETIMEOUT
	},
	jwtSecret: process.env.JWT_SECRET || 'f!DT3[i+Zl(W}17:%@]Tly*#/F&&L',
	appPort: process.env.PORT || 3000,
	twilio: {
		sid: process.env.TWILIO_SID,
		token: process.env.TWILIO_TOKEN,
		from: process.env.TWILIO_FROM
	}
};


module.exports = global.process.env.NODE_ENV === 'production' ? production : development;
