import { Router } from 'express';
import controller from '../controllers/postsController';

const router = Router();

router.route('/')
	.get(controller.getPosts)
	.post(controller.passportAuth, controller.postPost);

router.route('/:postId')
	.get(controller.getPost)
	.delete(controller.passportAuth, controller.deletePost);

router.route('/like/:postId')
	.post(controller.passportAuth, controller.likePost);

router.route('/comment/:postId')
	.post(controller.passportAuth, controller.commentPost);

router.route('/comment/:postId/:commentId')
	.delete(controller.passportAuth, controller.deleteComment);

export default router;
