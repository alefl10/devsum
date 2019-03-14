import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from '../api/models/UserModel';
import { secretOrKey } from '../config/keys';

// The spelling of this options matters - check documentation
const opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey,
};

export default function (passport) {
	passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
		User.findById(jwt_payload.id)
			.then((user) => {
				if (user) {
					return done(null, user);
				}
				done(null, false);
			})
			.catch(err => console.log(err));
	}));
}
