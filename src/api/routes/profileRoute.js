import { Router } from 'express';

const router = Router();

router.get('/test', (req, res) => {
	res.json({ msg: 'Profile route works' });
});

export default router;
