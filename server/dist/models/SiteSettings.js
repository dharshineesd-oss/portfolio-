"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const SiteSettingsSchema = new mongoose_1.Schema({
    theme: {
        primaryColor: { type: String, default: '#4f46e5' },
        secondaryColor: { type: String, default: '#06b6d4' },
        fontFamily: { type: String, default: 'Plus Jakarta Sans' },
        borderRadius: { type: String, default: '0.75rem' },
        darkMode: { type: Boolean, default: false }
    },
    seo: {
        siteTitle: { type: String, default: 'Dharshinee SD – Personal Portfolio & Aspiring Full Stack Developer' },
        metaDescription: {
            type: String,
            default: 'Personal Portfolio CMS of Dharshinee SD showcasing full-stack projects, skills, education, certifications, and developer articles.'
        },
        keywords: {
            type: [String],
            default: ['Full Stack Developer', 'React', 'TypeScript', 'Node.js', 'MongoDB', 'Dharshinee SD', 'Anna University']
        },
        ogTitle: { type: String, default: 'Dharshinee SD – Personal Portfolio' },
        ogDescription: { type: String, default: 'Explore full-stack applications, skills, and projects by Dharshinee SD.' },
        ogImage: { type: String, default: '' },
        canonicalUrl: { type: String, default: 'http://localhost:5173' }
    },
    socialLinks: {
        github: { type: String, default: 'https://github.com/dharshineesd' },
        linkedin: { type: String, default: 'https://linkedin.com/in/dharshineesd' },
        email: { type: String, default: 'dharshineesd@gmail.com' },
        twitter: { type: String, default: '' },
        instagram: { type: String, default: '' }
    },
    contactInfo: {
        email: { type: String, default: 'dharshineesd@gmail.com' },
        phone: { type: String, default: '+91 98765 43210' },
        location: { type: String, default: 'Tamil Nadu, India' },
        officeAddress: { type: String, default: 'Anna University Campus, Chennai, Tamil Nadu' },
        googleMapsEmbed: { type: String, default: '' }
    },
    enabledSections: {
        about: { type: Boolean, default: true },
        skills: { type: Boolean, default: true },
        experience: { type: Boolean, default: true },
        education: { type: Boolean, default: true },
        projects: { type: Boolean, default: true },
        services: { type: Boolean, default: true },
        certifications: { type: Boolean, default: true },
        achievements: { type: Boolean, default: true },
        testimonials: { type: Boolean, default: true },
        blog: { type: Boolean, default: true },
        resume: { type: Boolean, default: true },
        contact: { type: Boolean, default: true }
    }
}, { timestamps: true });
exports.default = mongoose_1.default.model('SiteSettings', SiteSettingsSchema);
