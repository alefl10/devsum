import { Router } from 'express';
import controller from '../controllers/profilesController';

const router = Router();

router.get('/test', (req, res) => {
	res.json({ msg: 'Profile route works' });
});

router.route('/')
	.get(controller.passportAuth, controller.getCurrentProfile)
	.post(controller.passportAuth, controller.postCurrentProfile);

router.route('/all')
	.get(controller.getAllProfiles);

router.route('/handle/:handle')
	.get(controller.getHandleProfile);

router.route('/user/:userId')
	.get(controller.getUserIdProfile);

router.route('/experience')
	.post(controller.passportAuth, controller.postExperience);

router.route('/education')
	.post(controller.passportAuth, controller.postEducation);

export default router;
