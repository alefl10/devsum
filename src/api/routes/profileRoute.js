import { Router } from 'express';
import controller from '../controllers/profilesController';

const router = Router();

router.get('/test', (req, res) => {
	res.json({ msg: 'Profile route works' });
});

router.route('/')
	.get(controller.passportAuth, controller.getCurrentProfile)
	.post(controller.passportAuth, controller.postCurrentProfile);

export default router;
