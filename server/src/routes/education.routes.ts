import { Router } from 'express';
import {
  getEducation,
  createEducation,
  updateEducation,
  deleteEducation
} from '../controllers/education.controller';
import { validateObjectId } from '../middleware/validate.middleware';

const router = Router();

router.get('/', getEducation);
router.post('/', createEducation);
router.put('/:id', validateObjectId('id'), updateEducation);
router.delete('/:id', validateObjectId('id'), deleteEducation);

export default router;
