import bodyParser from 'body-parser';
import passport from 'passport';

export default function (app) {
	// Body Parser Middleware + Parse application/json
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());

	// Passport middleware
	app.use(passport.initialize());
	app.use(passport.session());
}
