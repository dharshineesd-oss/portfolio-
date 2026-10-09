import http from 'http';
import app from '../app';
import { connectDB } from '../config/db';
import mongoose from 'mongoose';

const runTests = async () => {
  await connectDB();
  const server = http.createServer(app);

  await new Promise<void>((resolve) => {
    server.listen(5099, () => {
      console.log('Test server listening on port 5099');
      resolve();
    });
  });

  const get = async (path: string) => {
    const res = await fetch(`http://127.0.0.1:5099${path}`);
    const data: any = await res.json();
    return { status: res.status, data };
  };

  const post = async (path: string, body: any) => {
    const res = await fetch(`http://127.0.0.1:5099${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const data: any = await res.json();
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
  await mongoose.disconnect();
  process.exit(0);
};

runTests().catch((err) => {
  console.error('Test failed:', err);
  process.exit(1);
});
