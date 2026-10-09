import { Router } from 'express';
import {
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience
} from '../controllers/experience.controller';
import { validateObjectId } from '../middleware/validate.middleware';

const router = Router();

router.get('/', getExperiences);
router.post('/', createExperience);
router.put('/:id', validateObjectId('id'), updateExperience);
router.delete('/:id', validateObjectId('id'), deleteExperience);

export default router;
