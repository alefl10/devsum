import { Router } from 'express';
import controller from '../controllers/profilesController';

const router = Router();

router.get('/test', (req, res) => {
	res.json({ msg: 'Profile route works' });
});

router.route('/')
	.get(controller.passportAuth, controller.getCurrentProfile);


export default router;
