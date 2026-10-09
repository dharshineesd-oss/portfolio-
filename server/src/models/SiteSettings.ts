import mongoose, { Document, Schema } from 'mongoose';

export interface ISiteSettings extends Document {
  theme: {
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
    borderRadius: string;
    darkMode: boolean;
  };
  seo: {
    siteTitle: string;
    metaDescription: string;
    keywords: string[];
    ogTitle: string;
    ogDescription: string;
    ogImage: string;
    canonicalUrl: string;
  };
  socialLinks: {
    github: string;
    linkedin: string;
    email: string;
    twitter: string;
    instagram: string;
  };
  contactInfo: {
    email: string;
    phone: string;
    location: string;
    officeAddress: string;
    googleMapsEmbed: string;
  };
  enabledSections: {
    about: boolean;
    skills: boolean;
    experience: boolean;
    education: boolean;
    projects: boolean;
    services: boolean;
    certifications: boolean;
    achievements: boolean;
    testimonials: boolean;
    blog: boolean;
    resume: boolean;
    contact: boolean;
  };
}

const SiteSettingsSchema: Schema = new Schema(
  {
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
  },
  { timestamps: true }
);

export default mongoose.model<ISiteSettings>('SiteSettings', SiteSettingsSchema);
