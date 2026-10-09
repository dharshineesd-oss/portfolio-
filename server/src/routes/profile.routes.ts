import { Router } from 'express';
import { getProfile, updateProfile } from '../controllers/profile.controller';
import { authenticateAdmin } from '../middleware/auth.middleware';

const router = Router();

router.get('/', getProfile);
router.put('/', authenticateAdmin, updateProfile);

export default router;
