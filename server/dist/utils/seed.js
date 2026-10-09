"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = __importDefault(require("../models/User"));
const Profile_1 = __importDefault(require("../models/Profile"));
const Project_1 = __importDefault(require("../models/Project"));
const Skill_1 = __importDefault(require("../models/Skill"));
const Education_1 = __importDefault(require("../models/Education"));
const Certification_1 = __importDefault(require("../models/Certification"));
const Experience_1 = __importDefault(require("../models/Experience"));
const Service_1 = __importDefault(require("../models/Service"));
const Achievement_1 = __importDefault(require("../models/Achievement"));
const Testimonial_1 = __importDefault(require("../models/Testimonial"));
const BlogPost_1 = __importDefault(require("../models/BlogPost"));
const SiteSettings_1 = __importDefault(require("../models/SiteSettings"));
const seedData_1 = require("./seedData");
const seedDatabase = async () => {
    const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/dharshinee_portfolio';
    try {
        console.log(`Connecting to MongoDB at: ${mongoURI}`);
        await mongoose_1.default.connect(mongoURI);
        console.log('MongoDB connected. Seeding complete dynamic CMS data...');
        // Clear existing collections
        await Promise.all([
            User_1.default.deleteMany({}),
            Profile_1.default.deleteMany({}),
            Project_1.default.deleteMany({}),
            Skill_1.default.deleteMany({}),
            Education_1.default.deleteMany({}),
            Certification_1.default.deleteMany({}),
            Experience_1.default.deleteMany({}),
            Service_1.default.deleteMany({}),
            Achievement_1.default.deleteMany({}),
            Testimonial_1.default.deleteMany({}),
            BlogPost_1.default.deleteMany({}),
            SiteSettings_1.default.deleteMany({})
        ]);
        // 1. Admin User
        const adminUser = new User_1.default(seedData_1.sampleAdminUser);
        await adminUser.save();
        console.log(`✓ Created Admin User (${adminUser.email})`);
        // 2. Profile
        await Profile_1.default.create(seedData_1.sampleProfile);
        console.log('✓ Created Dynamic Profile & Hero dataset');
        // 3. Projects
        const insertedProjects = await Project_1.default.insertMany(seedData_1.sampleProjects);
        console.log(`✓ Inserted ${insertedProjects.length} Projects`);
        // 4. Skills
        const insertedSkills = await Skill_1.default.insertMany(seedData_1.sampleSkills);
        console.log(`✓ Inserted ${insertedSkills.length} Skills`);
        // 5. Education
        const insertedEducation = await Education_1.default.insertMany(seedData_1.sampleEducation);
        console.log(`✓ Inserted ${insertedEducation.length} Education records`);
        // 6. Certifications
        const insertedCertifications = await Certification_1.default.insertMany(seedData_1.sampleCertifications);
        console.log(`✓ Inserted ${insertedCertifications.length} Certifications`);
        // 7. Experience
        const insertedExperience = await Experience_1.default.insertMany(seedData_1.sampleExperience);
        console.log(`✓ Inserted ${insertedExperience.length} Experience entries`);
        // 8. Services
        const insertedServices = await Service_1.default.insertMany(seedData_1.sampleServices);
        console.log(`✓ Inserted ${insertedServices.length} Services`);
        // 9. Achievements
        const insertedAchievements = await Achievement_1.default.insertMany(seedData_1.sampleAchievements);
        console.log(`✓ Inserted ${insertedAchievements.length} Achievements`);
        // 10. Testimonials
        const insertedTestimonials = await Testimonial_1.default.insertMany(seedData_1.sampleTestimonials);
        console.log(`✓ Inserted ${insertedTestimonials.length} Testimonials`);
        // 11. Blog Posts
        const insertedBlogPosts = await BlogPost_1.default.insertMany(seedData_1.sampleBlogPosts);
        console.log(`✓ Inserted ${insertedBlogPosts.length} Blog Posts`);
        // 12. Site Settings (Theme, SEO, Social)
        await SiteSettings_1.default.create(seedData_1.sampleSiteSettings);
        console.log('✓ Created SiteSettings (Theme, SEO, Social, Sections)');
        console.log('========================================================');
        console.log(' Complete Dynamic Portfolio CMS Seeded Successfully!');
        console.log(' Admin Login: admin@portfolio.com | Password: admin123456');
        console.log('========================================================');
        await mongoose_1.default.disconnect();
        process.exit(0);
    }
    catch (error) {
        console.error('Database seeding failed with error:', error.message);
        await mongoose_1.default.disconnect();
        process.exit(1);
    }
};
seedDatabase();
