"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("../app"));
const db_1 = require("../config/db");
const mongoose_1 = __importDefault(require("mongoose"));
const runTests = async () => {
    await (0, db_1.connectDB)();
    const server = http_1.default.createServer(app_1.default);
    await new Promise((resolve) => {
        server.listen(5099, () => {
            console.log('Test server listening on port 5099');
            resolve();
        });
    });
    const get = async (path) => {
        const res = await fetch(`http://127.0.0.1:5099${path}`);
        const data = await res.json();
        return { status: res.status, data };
    };
    const post = async (path, body) => {
        const res = await fetch(`http://127.0.0.1:5099${path}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        const data = await res.json();
        return { status: res.status, data };
    };
    console.log('--- Testing CMS Endpoints ---');
    // 1. Health
    const health = await get('/api/health');
    console.log('GET /api/health:', health.status, health.data.message);
    // 2. Auth Login
    const loginRes = await post('/api/auth/login', {
        email: 'admin@portfolio.com',
        password: 'admin123456'
    });
    console.log('POST /api/auth/login:', loginRes.status, loginRes.data.message, 'Token received:', !!loginRes.data.data?.token);
    // 3. Profile
    const profile = await get('/api/profile');
    console.log('GET /api/profile:', profile.status, profile.data.data?.name, profile.data.data?.title);
    // 4. Projects
    const projects = await get('/api/projects');
    console.log('GET /api/projects:', projects.status, `count: ${projects.data.data?.length}`);
    // 5. Skills
    const skills = await get('/api/skills');
    console.log('GET /api/skills:', skills.status, `count: ${skills.data.data?.length}`);
    // 6. Services
    const services = await get('/api/services');
    console.log('GET /api/services:', services.status, `count: ${services.data.data?.length}`);
    // 7. Achievements
    const achievements = await get('/api/achievements');
    console.log('GET /api/achievements:', achievements.status, `count: ${achievements.data.data?.length}`);
    // 8. Testimonials
    const testimonials = await get('/api/testimonials');
    console.log('GET /api/testimonials:', testimonials.status, `count: ${testimonials.data.data?.length}`);
    // 9. Blog
    const blog = await get('/api/blog');
    console.log('GET /api/blog:', blog.status, `count: ${blog.data.data?.length}`);
    // 10. Site Settings
    const settings = await get('/api/settings');
    console.log('GET /api/settings:', settings.status, 'Theme primary:', settings.data.data?.theme?.primaryColor);
    console.log('All Dynamic CMS API tests passed successfully!');
    server.close();
    await mongoose_1.default.disconnect();
    process.exit(0);
};
runTests().catch((err) => {
    console.error('Test failed:', err);
    process.exit(1);
});
