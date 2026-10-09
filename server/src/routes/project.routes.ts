import { Router } from 'express';
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  duplicateProject,
  reorderProjects
} from '../controllers/project.controller';
import { validateObjectId } from '../middleware/validate.middleware';
import { authenticateAdmin } from '../middleware/auth.middleware';

const router = Router();

router.get('/', getProjects);
router.post('/reorder', authenticateAdmin, reorderProjects);
router.post('/duplicate/:id', authenticateAdmin, validateObjectId('id'), duplicateProject);
router.get('/:id', validateObjectId('id'), getProjectById);
router.post('/', authenticateAdmin, createProject);
router.put('/:id', authenticateAdmin, validateObjectId('id'), updateProject);
router.delete('/:id', authenticateAdmin, validateObjectId('id'), deleteProject);

export default router;
