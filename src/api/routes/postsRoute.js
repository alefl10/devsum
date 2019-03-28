import { Router } from 'express';
import controller from '../controllers/postsController';

const router = Router();

router.route('/')
	.post(controller.passportAuth, controller.postPost);

export default router;
