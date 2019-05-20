import { Router } from 'express';
import controller from '../controllers/profilesController';

const router = Router();

router.route('/')
	.get(controller.passportAuth, controller.getCurrentProfile)
	.post(controller.passportAuth, controller.postCurrentProfile)
	.delete(controller.passportAuth, controller.deleteUserAndProfile);

router.route('/all')
	.get(controller.getAllProfiles);

router.route('/handle/:handle')
	.get(controller.getHandleProfile);

router.route('/user/:userId')
	.get(controller.getUserIdProfile);

router.route('/experience')
	.post(controller.passportAuth, controller.postExperience);

router.route('/experience/:expId')
	.delete(controller.passportAuth, controller.deleteExperience);

router.route('/education')
	.post(controller.passportAuth, controller.postEducation);

router.route('/education/:eduId')
	.delete(controller.passportAuth, controller.deleteEducation);

export default router;
