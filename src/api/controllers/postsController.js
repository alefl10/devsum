import passport from 'passport';
import jwt from 'jsonwebtoken';
import { secretOrKey } from '../../config/keys';
import Post from '../models/PostsModel';
import validatePostInput from '../../validation/post';
import Profile from '../models/ProfileModel';

const controller = {
	// @route Authentication Middleware
	// @desc Performs Passport Authentication
	// @access Private
	passportAuth(req, res, next) {
		passport.authenticate('jwt', { session: false })(req, res, next);
	},

	// @route GET api/posts/
	// @desc Get all posts
	// @access Public
	getPosts(req, res, next) {
		const errors = {};

		Post.find()
			.sort({ date: -1 })
			.then(posts => res.json(posts))
			.catch((err) => {
				errors.find = 'ERROR - Could not retrieve all posts';
				next({ msg: err, status: 404, error: errors });
			});
	},

	// @route GET api/posts/:id
	// @desc Get post by post id
	// @access Public
	getPost(req, res, next) {
		const { id } = req.params;
		const errors = {};

		Post.findById(id)
			.then(post => res.json(post))
			.catch((err) => {
				errors.find = 'ERROR - Could not find post with that id';
				next({ msg: err, status: 404, error: errors });
			});
	},

	// @route POST api/posts/
	// @desc Publish a post
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

	// @route DELETE api/posts/:id
	// @desc Delete a post
	// @access Private
	deletePost(req, res, next) {
		const { id } = req.user;
		const { postId } = req.params;
		const errors = {};

		Profile.find({ user: id })
			.then((profile) => {
				Post.findById(postId)
					.then((post) => {
						// Check for post owner
						if (post.user.toString() !== id) {
							res.status(401).json({ notAuthorized: 'User not authorized' });
						} else {
							// Delete post
							post.remove()
								.then(() => res.json({ success: true }))
								.catch((err) => {
									errors.remove = 'ERROR - Could not delete post';
									next({ msg: err, status: 500, error: errors });
								});
						}
					})
					.catch((err) => {
						errors.find = 'ERROR - Could not post with that id';
						next({ msg: err, status: 500, error: errors });
					});
			})
			.catch((err) => {
				errors.find = 'ERROR - Could not find user with that id';
				next({ msg: err, status: 500, error: errors });
			});
	},

};

export default controller;
