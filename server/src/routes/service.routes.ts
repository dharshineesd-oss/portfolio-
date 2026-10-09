import { Router } from 'express';
import {
  getServices,
  createService,
  updateService,
  deleteService,
  reorderServices
} from '../controllers/service.controller';
import { authenticateAdmin } from '../middleware/auth.middleware';
import { validateObjectId } from '../middleware/validate.middleware';

const router = Router();

router.get('/', getServices);
router.post('/reorder', authenticateAdmin, reorderServices);
router.post('/', authenticateAdmin, createService);
router.put('/:id', authenticateAdmin, validateObjectId('id'), updateService);
router.delete('/:id', authenticateAdmin, validateObjectId('id'), deleteService);

export default router;
