import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import User from '../models/User';
import Profile from '../models/Profile';
import Project from '../models/Project';
import Skill from '../models/Skill';
import Education from '../models/Education';
import Certification from '../models/Certification';
import Experience from '../models/Experience';
import Service from '../models/Service';
import Achievement from '../models/Achievement';
import Testimonial from '../models/Testimonial';
import BlogPost from '../models/BlogPost';
import SiteSettings from '../models/SiteSettings';
import ContactMessage from '../models/ContactMessage';

import {
  sampleAdminUser,
  sampleProfile,
  sampleProjects,
  sampleSkills,
  sampleEducation,
  sampleCertifications,
  sampleExperience,
  sampleServices,
  sampleAchievements,
  sampleTestimonials,
  sampleBlogPosts,
  sampleSiteSettings
} from './seedData';

const seedDatabase = async (): Promise<void> => {
  const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/dharshinee_portfolio';

  try {
    console.log(`Connecting to MongoDB at: ${mongoURI}`);
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected. Seeding complete dynamic CMS data...');

    // Clear existing collections
    await Promise.all([
      User.deleteMany({}),
      Profile.deleteMany({}),
      Project.deleteMany({}),
      Skill.deleteMany({}),
      Education.deleteMany({}),
      Certification.deleteMany({}),
      Experience.deleteMany({}),
      Service.deleteMany({}),
      Achievement.deleteMany({}),
      Testimonial.deleteMany({}),
      BlogPost.deleteMany({}),
      SiteSettings.deleteMany({})
    ]);

    // 1. Admin User
    const adminUser = new User(sampleAdminUser);
    await adminUser.save();
    console.log(`✓ Created Admin User (${adminUser.email})`);

    // 2. Profile
    await Profile.create(sampleProfile);
    console.log('✓ Created Dynamic Profile & Hero dataset');

    // 3. Projects
    const insertedProjects = await Project.insertMany(sampleProjects);
    console.log(`✓ Inserted ${insertedProjects.length} Projects`);

    // 4. Skills
    const insertedSkills = await Skill.insertMany(sampleSkills);
    console.log(`✓ Inserted ${insertedSkills.length} Skills`);

    // 5. Education
    const insertedEducation = await Education.insertMany(sampleEducation);
    console.log(`✓ Inserted ${insertedEducation.length} Education records`);

    // 6. Certifications
    const insertedCertifications = await Certification.insertMany(sampleCertifications);
    console.log(`✓ Inserted ${insertedCertifications.length} Certifications`);

    // 7. Experience
    const insertedExperience = await Experience.insertMany(sampleExperience);
    console.log(`✓ Inserted ${insertedExperience.length} Experience entries`);

    // 8. Services
    const insertedServices = await Service.insertMany(sampleServices);
    console.log(`✓ Inserted ${insertedServices.length} Services`);

    // 9. Achievements
    const insertedAchievements = await Achievement.insertMany(sampleAchievements);
    console.log(`✓ Inserted ${insertedAchievements.length} Achievements`);

    // 10. Testimonials
    const insertedTestimonials = await Testimonial.insertMany(sampleTestimonials);
    console.log(`✓ Inserted ${insertedTestimonials.length} Testimonials`);

    // 11. Blog Posts
    const insertedBlogPosts = await BlogPost.insertMany(sampleBlogPosts);
    console.log(`✓ Inserted ${insertedBlogPosts.length} Blog Posts`);

    // 12. Site Settings (Theme, SEO, Social)
    await SiteSettings.create(sampleSiteSettings);
    console.log('✓ Created SiteSettings (Theme, SEO, Social, Sections)');

    console.log('========================================================');
    console.log(' Complete Dynamic Portfolio CMS Seeded Successfully!');
    console.log(' Admin Login: admin@portfolio.com | Password: admin123456');
    console.log('========================================================');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error: any) {
    console.error('Database seeding failed with error:', error.message);
    await mongoose.disconnect();
    process.exit(1);
  }
};

seedDatabase();
