import express, { Application } from 'express';
import cors from 'cors';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import apiRoutes from './routes';
import { swaggerDocument } from './config/swagger';
import { errorHandler, notFoundHandler } from './middleware/error.middleware';

const app: Application = express();

// CORS configuration
const allowedOrigins = [
  process.env.CLIENT_URL || 'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173'
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, true);
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Admin-Key']
  })
);

// Body parsers
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// Serve static uploads directory for images and resumes
const uploadsPath = path.join(process.cwd(), 'uploads');
app.use('/uploads', express.static(uploadsPath));

// Swagger OpenAPI documentation endpoint
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
  customSiteTitle: 'Dharshinee SD Portfolio CMS API Docs',
  customCss: '.swagger-ui .topbar { background-color: #0f172a; }'
}));

// API Root router
app.use('/api', apiRoutes);

// Root greeting / redirection
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to Dharshinee SD – Personal Portfolio Dynamic CMS REST API',
    endpoints: {
      documentation: '/api-docs',
      health: '/api/health',
      auth: '/api/auth/login',
      profile: '/api/profile',
      projects: '/api/projects',
      skills: '/api/skills',
      education: '/api/education',
      certifications: '/api/certifications',
      experience: '/api/experience',
      services: '/api/services',
      achievements: '/api/achievements',
      testimonials: '/api/testimonials',
      blog: '/api/blog',
      settings: '/api/settings',
      contact: '/api/contact',
      upload: '/api/upload'
    }
  });
});

// 404 handler
app.use(notFoundHandler);

// Centralized error handler
app.use(errorHandler);

export default app;
