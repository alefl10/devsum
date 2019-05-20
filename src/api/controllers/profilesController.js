import passport from 'passport';
import Profile from '../models/ProfileModel';
import User from '../models/UserModel';
import validateProfileInput from '../../validation/profile';
import validateExperienceInput from '../../validation/experience';
import validateEducationInput from '../../validation/education';

const controller = {
	// @route Authentication Middleware
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
				errors.findOne = 'ERROR - Could not find user';
				next({ msg: err, status: 404, error: errors });
			});
	},

	// @route GET api/profile/all
	// @desc Gets all user profiles
	// @access Public
	getAllProfiles(req, res, next) {
		const errors = {};

		Profile.find()
			.populate('user', ['name', 'avatar'])
			.then((profiles) => {
				if (!profiles) {
					errors.noProfiles = 'There are no profiles';
					res.status(404).json(errors);
				} else {
					res.json(profiles);
				}
			})
			.catch((err) => {
				errors.findAll = 'ERROR - Could not find all profiles';
				next({ msg: err, status: 404, error: errors });
			});
	},

	// @route GET api/profile/handle/:handle
	// @desc Gets profile by user handle
	// @access Public
	getHandleProfile(req, res, next) {
		const errors = {};
		const { handle } = req.params;

		Profile.findOne({ handle })
			.populate('user', ['name', 'avatar'])
			.then((profile) => {
				if (!profile) {
					errors.noProfile = 'There is no profile for this user handle';
					res.status(404).json(errors);
				} else {
					res.json(profile);
				}
			})
			.catch((err) => {
				errors.findOne = 'ERROR - Could not find user';
				next({ msg: err, status: 404, error: errors });
			});
	},

	// @route GET api/profile/user/:user_id
	// @desc Gets profile by user id
	// @access Public
	getUserIdProfile(req, res, next) {
		const errors = {};
		const { userId } = req.params;

		Profile.findOne({ user: userId })
			.populate('user', ['name', 'avatar'])
			.then((profile) => {
				if (!profile) {
					errors.noProfile = 'There is no profile for this user handle';
					res.status(404).json(errors);
				} else {
					res.json(profile);
				}
			})
			.catch((err) => {
				errors.findOne = 'ERROR - Could not find user';
				next({ msg: err, status: 500, error: errors });
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
		if (req.body.githubUsername) profileFields.githubUsername = req.body.githubUsername;

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
							errors.updateProfile = 'ERROR - Could not update Profile';
							next({ msg: err, status: 500, error: errors });
						});
				} else {
					// Create new profile
					const newProfile = new Profile(profileFields);

					newProfile.save()
						.then(savedProfile => res.json(savedProfile))
						.catch((err) => {
							if (err.code === 11000) {
								errors.handle = 'ERROR - Handle already exists';
								next({ msg: err, status: 500, error: errors });
							} else {
								errors.save = 'ERROR - Could not save new profile';
								next({ msg: err, status: 500, error: errors });
							}
						});
				}
			})
			.catch((err) => {
				errors.findOne = 'ERROR - Could not find user';
				next({ msg: err, status: 404, error: errors });
			});
	},

	// @route POST api/profile/experience
	// @desc Add experience to profile
	// @access Private
	postExperience(req, res, next) {
		const { id } = req.user;
		const { errors, isValid } = validateExperienceInput(req.body);

		// Check Validation
		if (!isValid) {
			return next({ msg: errors, status: 400, error: errors });
		}

		Profile.findOne({ user: id })
			.then((profile) => {
				const newExp = {
					title: req.body.title,
					company: req.body.company,
					location: req.body.location,
					from: req.body.from,
					to: req.body.to,
					current: req.body.current,
					description: req.body.description,
				};

				// Add to experience array
				profile.experience.unshift(newExp);

				profile.save()
					.then(savedProfile => res.json(savedProfile))
					.catch((err) => {
						errors.save = 'ERROR - Could not save Profile Experience';
						next({ msg: err, status: 500, error: errors });
					});
			})
			.catch((err) => {
				errors.findOne = 'ERROR - Could not find user';
				next({ msg: err, status: 404, error: errors });
			});
	},

	// @route DELETE api/profile/experience/:expId
	// @desc Deletes experience from profile
	// @access Private
	deleteExperience(req, res, next) {
		const { id } = req.user;
		const { expId } = req.params;
		const errors = {};

		Profile.findOne({ user: id })
			.then((profile) => {
				// Get index of experience item that needs to be removed
				const removeIndex = profile.experience
					.map(item => item.id)
					.indexOf(expId);

				// Remove experience item from experience array
				profile.experience.splice(removeIndex, 1);

				profile.save()
					.then(savedProfile => res.json(savedProfile))
					.catch((err) => {
						errors.save = 'ERROR - Could not delete Profile Experience';
						next({ msg: err, status: 500, error: errors });
					});
			})
			.catch((err) => {
				errors.findOne = 'ERROR - Could not find user';
				next({ msg: err, status: 404, error: errors });
			});
	},

	// @route POST api/profile/education
	// @desc Add education to profile
	// @access Private
	postEducation(req, res, next) {
		const { id } = req.user;
		const { errors, isValid } = validateEducationInput(req.body);

		// Check Validation
		if (!isValid) {
			return next({ msg: errors, status: 400, error: errors });
		}

		Profile.findOne({ user: id })
			.then((profile) => {
				const newEdu = {
					school: req.body.school,
					degree: req.body.degree,
					studyField: req.body.studyField,
					from: req.body.from,
					to: req.body.to,
					current: req.body.current,
					description: req.body.description,
				};

				// Add to experience array
				profile.education.unshift(newEdu);

				profile.save()
					.then(savedProfile => res.json(savedProfile))
					.catch((err) => {
						errors.save = 'Error saving Profile Education';
						next({ msg: err, status: 500, error: errors });
					});
			})
			.catch((err) => {
				errors.findOne = 'ERROR - Could not find user';
				next({ msg: err, status: 404, error: errors });
			});
	},

	// @route DELETE api/profile/education/:eduId
	// @desc Deletes education from profile
	// @access Private
	deleteEducation(req, res, next) {
		const { id } = req.user;
		const { eduId } = req.params;
		const errors = {};

		Profile.findOne({ user: id })
			.then((profile) => {
				// Get index of education item that needs to be removed
				const removeIndex = profile.education
					.map(item => item.id)
					.indexOf(eduId);

				// Remove education item from experience array
				profile.education.splice(removeIndex, 1);

				profile.save()
					.then(savedProfile => res.json(savedProfile))
					.catch((err) => {
						errors.save = 'ERROR - Could not delete Profile Education';
						next({ msg: err, status: 500, error: errors });
					});
			})
			.catch((err) => {
				errors.findOne = 'ERROR - Could not find user';
				next({ msg: err, status: 404, error: errors });
			});
	},

	// @route DELETE api/profile/
	// @desc Deletes user and its profile
	// @access Private
	deleteUserAndProfile(req, res, next) {
		const { id } = req.user;
		const errors = {};

		Profile.findOneAndDelete({ user: id })
			.then(() => {
				User.findOneAndDelete({ _id: id })
					.then(() => {
						res.json({ success: true });
					})
					.catch((err) => {
						errors.findDelete = 'ERROR - Could not find and remove user';
						next({ msg: err, status: 404, error: errors });
					});
			})
			.catch((err) => {
				errors.findDelete = 'ERROR - Could not find and remove profile';
				next({ msg: err, status: 404, error: errors });
			});
	},
};

export default controller;
