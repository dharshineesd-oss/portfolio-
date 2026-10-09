import { Router } from 'express';
import {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial
} from '../controllers/testimonial.controller';
import { authenticateAdmin } from '../middleware/auth.middleware';
import { validateObjectId } from '../middleware/validate.middleware';

const router = Router();

router.get('/', getTestimonials);
router.post('/', authenticateAdmin, createTestimonial);
router.put('/:id', authenticateAdmin, validateObjectId('id'), updateTestimonial);
router.delete('/:id', authenticateAdmin, validateObjectId('id'), deleteTestimonial);

export default router;
