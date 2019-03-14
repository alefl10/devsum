import { Router } from 'express';
import controller from '../controllers/usersController';

const router = Router();

router.get('/test', (req, res) => {
	res.json({ msg: 'Users route works' });
});

router.route('/register')
	.post(controller.postRegister);

router.route('/login')
	.post(controller.postLogin);

export default router;
