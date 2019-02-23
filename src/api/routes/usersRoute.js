import { Router } from 'express';

const router = Router();

router.get('/test', (req, res) => {
	res.json({ msg: 'Users route works' });
});

export default router;
