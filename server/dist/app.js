"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const routes_1 = __importDefault(require("./routes"));
const swagger_1 = require("./config/swagger");
const error_middleware_1 = require("./middleware/error.middleware");
const app = (0, express_1.default)();
// CORS configuration
const allowedOrigins = [
    process.env.CLIENT_URL || 'http://localhost:5173',
    'http://localhost:3000',
    'http://127.0.0.1:5173'
];
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(null, true);
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Admin-Key']
}));
// Body parsers
app.use(express_1.default.json({ limit: '15mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '15mb' }));
// Serve static uploads directory for images and resumes
const uploadsPath = path_1.default.join(process.cwd(), 'uploads');
app.use('/uploads', express_1.default.static(uploadsPath));
// Swagger OpenAPI documentation endpoint
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerDocument, {
    customSiteTitle: 'Dharshinee SD Portfolio CMS API Docs',
    customCss: '.swagger-ui .topbar { background-color: #0f172a; }'
}));
// API Root router
app.use('/api', routes_1.default);
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
app.use(error_middleware_1.notFoundHandler);
// Centralized error handler
app.use(error_middleware_1.errorHandler);
exports.default = app;
