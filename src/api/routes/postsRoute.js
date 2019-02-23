import { Router } from 'express';

const router = Router();

router.get('/test', (req, res) => {
	res.json({ msg: 'Posts route works' });
});

export default router;
