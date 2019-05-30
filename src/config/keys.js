if (process.env.NODE_ENV === 'production') {
	const prod = require('./private_prod');
	module.exports = {
		dbURI: prod.dbURI,
		PORT: prod.PORT,
		secretOrKey: prod.secretOrKey,
	};
} else {
	const dev = require('./private_dev');
	module.exports = {
		dbURI: dev.dbURI,
		PORT: dev.PORT,
		secretOrKey: dev.secretOrKey,
	};
}
