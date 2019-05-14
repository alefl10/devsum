import gravatar from 'gravatar';
import bcrypt from 'bcryptjs';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import User from '../models/UserModel';
import { secretOrKey } from '../../config/keys';
import validateResgisterInput from '../../validation/register';
import validateLoginInput from '../../validation/login';

const helperFcn = {
	encryptPassword(password) {
		return new Promise((resolve, reject) => {
			bcrypt.genSalt(10)
				.then((salt) => {
					bcrypt.hash(password, salt)
						.then((hashedPassword) => {
							resolve(hashedPassword);
						})
						.catch((err) => {
							reject(err, { msg: 'Error Hashing Password', status: 400 });
						});
				})
				.catch((err) => {
					reject(err);
				});
		});
	},

	decryptPassword(password, hashedPassword) {
		return new Promise((resolve, reject) => {
			bcrypt.compare(password, hashedPassword)
				.then((isMatch) => {
					if (isMatch) {
						resolve({ msg: 'Success', status: 200 });
					} else {
						resolve({ password: 'Incorrect Password', status: 404 });
					}
				})
				.catch((err) => {
					reject(err, { msg: 'Error Comparing Passwords', status: 400 });
				});
		});
	},
};

const controller = {

	// @route POST api/users/register
	// @desc Register user
	// @access Public
	postRegister(req, res, next) {
		const { errors, isValid } = validateResgisterInput(req.body);

		if (!isValid) {
			return next({ msg: errors, status: 400, error: errors });
		}

		const { email } = req.body;
		User.findOne({ email })
			.then((user) => {
				if (user) {
					errors.email = 'Email already exists';
					next({ msg: errors.email, status: 400, error: errors });
				} else {
					const { name, password } = req.body;
					helperFcn.encryptPassword(password)
						.then((hashedPassword) => {
							const avatar = gravatar.url(email, {
								s: '200', // Size of the Avatar
								r: 'pg', // Rating
								d: 'mm', // Default would be a plain avatar
							});
							const newUser = new User({
								name,
								email,
								password: hashedPassword,
								avatar,
							});
							newUser.save()
								.then(savedUser => res.status(200).json(savedUser))
								.catch((err) => {
									errors.save = 'Error Saving New User';
									next({ msg: err, status: 400, error: errors });
								});
						})
						.catch((err) => {
							errors.salt = 'Error Generating Salt';
							next({ msg: err, status: 400, error: errors });
						});
				}
			})
			.catch((err) => {
				errors.salt = 'Error finding user Salt';
				next({ msg: err, status: 400, error: errors });
			});
	},

	// @route GET api/users/login
	// @desc Login User / Returning JWT Token
	// @access Public
	postLogin(req, res, next) {
		const { errors, isValid } = validateLoginInput(req.body);

		if (!isValid) {
			return next({ msg: errors, status: 400, error: errors });
		}

		const { email, password } = req.body;

		// Find user by email
		User.findOne({ email })
			.then((user) => {
				if (!user) {
					res.status(404).json({ email: 'User not found' });
				} else {
					// Check password
					helperFcn.decryptPassword(password, user.password)
						.then((compared) => {
							if (compared.status === 200) {
								// User matched
								const payload = {
									id: user.id,
									name: user.name,
									avatar: user.avatar,
								};
								// Sign Token
								jwt.sign(payload, secretOrKey, { expiresIn: 3600 }, (err, token) => {
									if (err) {
										errors.token = 'Error signing jwt token';
										next({ msg: err, status: 500, error: errors });
									} else {
										res.json({ success: true, token: `Bearer ${token}` });
									}
								});
							} else {
								errors.password = compared.password;
								res.status(compared.status).json(errors);
							}
						})
						.catch((err, reason) => {
							next({ msg: reason.msg, status: reason.status, error: err });
						});
				}
			}).catch((err) => {
				errors.user = 'Error finding User';
				next({ msg: err, status: 404, error: errors });
			});
	},

	// @route GET api/users/current
	// @desc Performs Passport Authentication
	// @access Private
	passportAuth(req, res, next) {
		passport.authenticate('jwt', { session: false })(req, res, next);
	},

	// @route GET api/users/current
	// @desc Returns current user
	// @access Private
	getCurrentUser(req, res) {
		const {
			id,
			name,
			email,
			avatar,
		} = req.user;
		res.json({
			id,
			name,
			email,
			avatar,
		});
	},
};

export default controller;
