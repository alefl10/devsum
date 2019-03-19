import passport from 'passport';
import Profile from '../models/ProfileModel';
import User from '../models/UserModel';

const controller = {
	// @route GET api/profile
	// @desc Performs Passport Authentication
	// @access Private
	passportAuth(req, res, next) {
		passport.authenticate('jwt', { session: false })(req, res, next);
	},

	// @route GET api/profile
	// @desc Returns current user's profile
	// @access Private
	getCurrentProfile(req, res, next) {
		const errors = {};
		const { id } = req.user;

		Profile.findOne({ user: id })
			.then((profile) => {
				if (!profile) {
					errors.noProfile = 'There is no profile for this user';
					res.status(404).json(errors);
				} else {
					res.json(profile);
				}
			})
			.catch((err) => {
				errors.error = err;
				next({ msg: 'Error finding User', status: 404, error: errors.error });
			});
	},
};

export default controller;
