import { Router } from 'express';
import {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
  reorderSkills
} from '../controllers/skill.controller';
import { validateObjectId } from '../middleware/validate.middleware';
import { authenticateAdmin } from '../middleware/auth.middleware';

const router = Router();

router.get('/', getSkills);
router.post('/reorder', authenticateAdmin, reorderSkills);
router.post('/', authenticateAdmin, createSkill);
router.put('/:id', authenticateAdmin, validateObjectId('id'), updateSkill);
router.delete('/:id', authenticateAdmin, validateObjectId('id'), deleteSkill);

export default router;
