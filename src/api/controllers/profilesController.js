import passport from 'passport';
import Profile from '../models/ProfileModel';
import User from '../models/UserModel';
import validateProfileInput from '../../validation/profile';

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
			.populate('user', ['name', 'avatar'])
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
				next({ msg: err, status: 404, error: errors });
			});
	},

	// @route POST api/profile
	// @desc Posts profile for current user
	// @access Private
	postCurrentProfile(req, res, next) {
		const { errors, isValid } = validateProfileInput(req.body);
		const { id } = req.user;

		// Check Validation
		if (!isValid) {
			return next({ msg: errors, status: 400, error: errors });
		}

		// Get fields
		const profileFields = {};
		profileFields.user = req.user.id;
		if (req.body.handle) profileFields.handle = req.body.handle;
		if (req.body.company) profileFields.company = req.body.company;
		if (req.body.website) profileFields.website = req.body.website;
		if (req.body.location) profileFields.location = req.body.location;
		if (req.body.bio) profileFields.bio = req.body.bio;
		if (req.body.status) profileFields.status = req.body.status;
		if (req.body.githubusername) profileFields.githubusername = req.body.githubusername;

		// Skills - Spilt into array
		if (typeof req.body.skills !== 'undefined') {
			profileFields.skills = req.body.skills.split(',');
		}

		// Social
		profileFields.social = {};
		if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
		if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
		if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
		if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
		if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

		Profile.findOne({ user: id })
			.then((profile) => {
				if (profile) {
					// Update existing profile
					Profile.findOneAndUpdate({ user: id }, { $set: profileFields }, { new: true })
						.then(updatedProfile => res.json(updatedProfile))
						.catch((err) => {
							errors.updateProfile = 'Error updating Profile';
							next({ msg: err, status: 500, error: errors });
						});
				} else {
					// Create new profile
					const newProfile = new Profile(profileFields);

					newProfile.save()
						.then(savedProfile => res.json(savedProfile))
						.catch((err) => {
							if (err.code === 11000) {
								errors.handle = 'Handle already exists';
								next({ msg: err, status: 500, error: errors });
							} else {
								errors.save = 'Error saving new profile';
								next({ msg: err, status: 500, error: errors });
							}
						});
				}
			})
			.catch((err) => {
				errors.error = err;
				next({ msg: 'Error finding User', status: 404, error: errors.error });
			});
	},
};

export default controller;
