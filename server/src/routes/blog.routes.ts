import { Router } from 'express';
import {
  getBlogPosts,
  getBlogPostBySlug,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost
} from '../controllers/blog.controller';
import { authenticateAdmin } from '../middleware/auth.middleware';
import { validateObjectId } from '../middleware/validate.middleware';

const router = Router();

router.get('/', getBlogPosts);
router.get('/:slug', getBlogPostBySlug);
router.post('/', authenticateAdmin, createBlogPost);
router.put('/:id', authenticateAdmin, validateObjectId('id'), updateBlogPost);
router.delete('/:id', authenticateAdmin, validateObjectId('id'), deleteBlogPost);

export default router;
