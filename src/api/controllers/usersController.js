import gravatar from 'gravatar';
import bcrypt from 'bcryptjs';
import User from '../models/UserModel';

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
		const { email } = req.body;

		User.findOne({ email })
			.then((user) => {
				if (user) {
					next({ msg: 'Email already exists', status: 400, error: 'Failed to register new User: Email already exists' });
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
								.then((savedUser) => {
									res.status(200).json(savedUser);
								})
								.catch((err) => {
									next({ msg: 'Error Saving New User', status: 400, error: err });
								});
						})
						.catch((err) => {
							next({ msg: 'Error Generating Salt', status: 400, error: err });
						});
				}
			})
			.catch((err) => {
				next({ msg: 'Error finding user Salt', status: 400, error: err });
			});
	},

	// @route GET api/users/login
	// @desc Login User / Returning JWT Token
	// @access Public
	postLogin(req, res, next) {
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
								res.json({ msg: compared.msg });
							} else {
								res.status(compared.status).json({ password: compared.password });
							}
						})
						.catch((err, reason) => {
							next({ msg: reason.msg, status: reason.status, error: err });
						});
				}
			}).catch((err) => {
				next({ msg: 'Error finding User', status: 400, error: err });
			});
	},
};

export default controller;
