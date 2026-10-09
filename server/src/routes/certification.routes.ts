import { Router } from 'express';
import {
  getCertifications,
  createCertification,
  updateCertification,
  deleteCertification
} from '../controllers/certification.controller';
import { validateObjectId } from '../middleware/validate.middleware';

const router = Router();

router.get('/', getCertifications);
router.post('/', createCertification);
router.put('/:id', validateObjectId('id'), updateCertification);
router.delete('/:id', validateObjectId('id'), deleteCertification);

export default router;
