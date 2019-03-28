import passport from 'passport';
import jwt from 'jsonwebtoken';
import { secretOrKey } from '../../config/keys';
import Post from '../models/PostsModel';
import validatePostInput from '../../validation/post';

const controller = {
	// @route Authentication Middleware
	// @desc Performs Passport Authentication
	// @access Private
	passportAuth(req, res, next) {
		passport.authenticate('jwt', { session: false })(req, res, next);
	},

	// @route POST api/posts/
	// @desc Publish a Post
	// @access Private
	postPost(req, res, next) {
		const { errors, isValid } = validatePostInput(req.body);

		// Check Validation
		if (!isValid) {
			return next({ msg: errors, status: 400, error: errors });
		}

		const { text, name, avatar } = req.body;
		const newPost = new Post({
			text,
			name,
			avatar,
			user: req.user.id,
		});

		newPost.save()
			.then(post => res.json(post))
			.catch((err) => {
				errors.save = 'ERROR - Could not save new post';
				next({ msg: err, status: 500, error: errors });
			});
	},

};

export default controller;
