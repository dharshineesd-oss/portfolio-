import { Router } from 'express';
import {
  getAchievements,
  createAchievement,
  updateAchievement,
  deleteAchievement
} from '../controllers/achievement.controller';
import { authenticateAdmin } from '../middleware/auth.middleware';
import { validateObjectId } from '../middleware/validate.middleware';

const router = Router();

router.get('/', getAchievements);
router.post('/', authenticateAdmin, createAchievement);
router.put('/:id', authenticateAdmin, validateObjectId('id'), updateAchievement);
router.delete('/:id', authenticateAdmin, validateObjectId('id'), deleteAchievement);

export default router;
