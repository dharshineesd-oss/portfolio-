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
const ProfileSchema = new mongoose_1.Schema({
    name: { type: String, required: true, default: 'Dharshinee SD' },
    title: { type: String, required: true, default: 'B.Tech Information Technology Student' },
    subtitle: { type: String, default: 'Aspiring Full Stack Developer' },
    shortBio: { type: String, default: 'Passionate about architecting scalable full-stack web applications and modern digital solutions.' },
    longBio: { type: String, default: 'Engineering undergrad at Anna University exploring modern web architectures, cloud systems, and generative AI.' },
    avatarUrl: { type: String, default: '' },
    location: { type: String, default: 'Tamil Nadu, India' },
    email: { type: String, default: 'dharshineesd@gmail.com' },
    phone: { type: String, default: '+91 98765 43210' },
    resumeUrl: { type: String, default: '/resume.pdf' },
    heroBg: { type: String, default: '' },
    ctaPrimaryText: { type: String, default: 'View My Projects' },
    ctaSecondaryText: { type: String, default: 'Contact Me' },
    careerObjective: {
        type: String,
        default: 'To secure a challenging role as a Full Stack Software Developer where I can build impactful software products and solve challenging engineering problems.'
    },
    interests: {
        type: [String],
        default: ['Full Stack Web Development', 'Cloud Architectures', 'Generative AI', 'UI/UX Design Systems', 'Database Optimization']
    },
    languages: {
        type: [String],
        default: ['English', 'Tamil']
    },
    stats: {
        projectsCount: { type: Number, default: 5 },
        skillsCount: { type: Number, default: 12 },
        certsCount: { type: Number, default: 3 },
        expYears: { type: String, default: '1+' }
    }
}, { timestamps: true });
exports.default = mongoose_1.default.model('Profile', ProfileSchema);
