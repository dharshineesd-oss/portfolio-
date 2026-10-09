import { Router } from 'express';
import authRoutes from './auth.routes';
import profileRoutes from './profile.routes';
import projectRoutes from './project.routes';
import skillRoutes from './skill.routes';
import educationRoutes from './education.routes';
import certificationRoutes from './certification.routes';
import experienceRoutes from './experience.routes';
import serviceRoutes from './service.routes';
import achievementRoutes from './achievement.routes';
import testimonialRoutes from './testimonial.routes';
import blogRoutes from './blog.routes';
import settingsRoutes from './settings.routes';
import contactRoutes from './contact.routes';
import uploadRoutes from './upload.routes';
import healthRoutes from './health.routes';

const router = Router();

router.use('/health', healthRoutes);
router.use('/auth', authRoutes);
router.use('/profile', profileRoutes);
router.use('/projects', projectRoutes);
router.use('/skills', skillRoutes);
router.use('/education', educationRoutes);
router.use('/certifications', certificationRoutes);
router.use('/experience', experienceRoutes);
router.use('/services', serviceRoutes);
router.use('/achievements', achievementRoutes);
router.use('/testimonials', testimonialRoutes);
router.use('/blog', blogRoutes);
router.use('/settings', settingsRoutes);
router.use('/contact', contactRoutes);
router.use('/upload', uploadRoutes);

export default router;
