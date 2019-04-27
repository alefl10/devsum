import passport from 'passport';
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

		Profile.findOne({ user: id })
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

	// @route POST api/posts/like/:postId
	// @desc Post a like - like/unlike
	// @access Private
	likePost(req, res, next) {
		const { id } = req.user;
		const { postId } = req.params;
		const errors = {};

		Profile.findOne({ user: id })
			.then((profile) => {
				Post.findById(postId)
					.then((post) => {
						// Check if user has already liked this post
						if (post.likes.filter(like => like.user.toString() === id).length > 0) {
							// Get index of likes item that needs to be removed
							const removeIndex = post.likes
								.map(item => item.user.toString())
								.indexOf(id);

							// Remove like item from likes array - Unlike
							post.likes.splice(removeIndex, 1);
						} else {
							// Add user ID to likes array - Like
							post.likes.unshift({ user: id });
						}

						post.save()
							.then(savedPost => res.json(savedPost))
							.catch((err) => {
								errors.find = 'ERROR - Could not save your like';
								next({ msg: err, status: 500, error: errors });
							});
					})
					.catch((err) => {
						errors.find = 'ERROR - Could not like that post';
						next({ msg: err, status: 500, error: errors });
					});
			})
			.catch((err) => {
				errors.find = 'ERROR - Could not find user with that id';
				next({ msg: err, status: 500, error: errors });
			});
	},

	// @route POST api/posts/comment/:postId
	// @desc Post a comment a post
	// @access Private
	commentPost(req, res, next) {
		const { id } = req.user;
		const { postId } = req.params;
		const { text, name, avatar } = req.body;
		const { errors, isValid } = validatePostInput(req.body);

		// Check Validation
		if (!isValid) {
			return next({ msg: errors, status: 400, error: errors });
		}

		Post.findById(postId)
			.then((post) => {
				const newComment = {
					text,
					name,
					avatar,
					user: id,
				};

				// Add to comments array
				post.comments.unshift(newComment);

				post.save()
					.then(savedPost => res.json(savedPost))
					.catch((err) => {
						errors.find = 'ERROR - Could not save your like';
						next({ msg: err, status: 500, error: errors });
					});
			})
			.catch((err) => {
				errors.find = 'ERROR - Could not find post with that id';
				next({ msg: err, status: 500, error: errors });
			});
	},

	// @route DELETE api/posts/comment/:postId/:commentId
	// @desc Delete a comment a post
	// @access Private
	deleteComment(req, res, next) {
		const { postId, commentId } = req.params;
		const errors = {};

		Post.findById(postId)
			.then((post) => {
				// Check if post exists
				if (post.comments.filter(comment => comment._id.toString() === commentId).length === 0) {
					return res.status(404).json({ commentDoesNotexist: 'Comment does not exist' });
				}

				// Get index of comment item that needs to be removed
				const removeIndex = post.comments
					.map(item => item.user.toString())
					.indexOf(commentId);

				// Remove comment item from comments array - Unlike
				post.comments.splice(removeIndex, 1);

				post.save()
					.then(savedPost => res.json(savedPost))
					.catch((err) => {
						errors.find = 'ERROR - Could not save your like';
						next({ msg: err, status: 500, error: errors });
					});
			})
			.catch((err) => {
				errors.find = 'ERROR - Could not find post with that id';
				next({ msg: err, status: 500, error: errors });
			});
	},

};

export default controller;
