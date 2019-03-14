import bodyParser from 'body-parser';
import passport from 'passport';
import strategy from '../../config/passport';

export default function (app) {
	// Set up Passport Strategy
	strategy(passport);

	// Body Parser Middleware + Parse application/json
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());

	// Passport middleware
	app.use(passport.initialize());
}
