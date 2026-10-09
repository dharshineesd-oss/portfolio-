import { Router } from 'express';
import {
  submitContactMessage,
  getContactMessages,
  deleteContactMessage,
  toggleMessageRead
} from '../controllers/contact.controller';
import { validateObjectId } from '../middleware/validate.middleware';
import { authenticateAdmin } from '../middleware/auth.middleware';

const router = Router();

// Public endpoint for submitting contact form
router.post('/', submitContactMessage);

// Admin endpoints for viewing & managing messages
router.get('/', authenticateAdmin, getContactMessages);
router.patch('/:id/toggle-read', authenticateAdmin, validateObjectId('id'), toggleMessageRead);
router.delete('/:id', authenticateAdmin, validateObjectId('id'), deleteContactMessage);

export default router;
