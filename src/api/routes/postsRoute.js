import { Router } from 'express';
import controller from '../controllers/postsController';

const router = Router();

router.route('/')
	.get(controller.getPosts)
	.post(controller.passportAuth, controller.postPost);

router.route('/:postId')
	.get(controller.getPost)
	.delete(controller.passportAuth, controller.deletePost);

export default router;
