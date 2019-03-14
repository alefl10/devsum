import { devURI as mongoURI, PORT, secretOrKey } from './private';

module.exports = {
	db: {
		mongoURI,
		PORT,
		secretOrKey,
	},
};
