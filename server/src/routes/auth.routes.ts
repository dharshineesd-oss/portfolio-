import { Router } from 'express';
import { login, getMe, changePassword } from '../controllers/auth.controller';
import { authenticateAdmin } from '../middleware/auth.middleware';

const router = Router();

router.post('/login', login);
router.get('/me', authenticateAdmin, getMe);
router.post('/change-password', authenticateAdmin, changePassword);

export default router;
