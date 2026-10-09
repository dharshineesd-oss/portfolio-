export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin';
}

export interface Profile {
  _id?: string;
  name: string;
  title: string;
  subtitle: string;
  shortBio: string;
  longBio: string;
  avatarUrl: string;
  location: string;
  email: string;
  phone: string;
  resumeUrl: string;
  heroBg: string;
  ctaPrimaryText: string;
  ctaSecondaryText: string;
  careerObjective: string;
  interests: string[];
  languages: string[];
  stats: {
    projectsCount: number;
    skillsCount: number;
    certsCount: number;
    expYears: string;
  };
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  fullDescription?: string;
  technologies: string[];
  category?: string;
  githubUrl: string;
  liveUrl: string;
  image: string;
  galleryImages?: string[];
  client?: string;
  projectDate?: string;
  features?: string[];
  challenges?: string;
  solutions?: string;
  featured?: boolean;
  sortOrder?: number;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Skill {
  _id: string;
  name: string;
  category: string;
  level: number;
  yearsOfExperience?: number;
  icon?: string;
  sortOrder?: number;
  active?: boolean;
}

export interface Education {
  _id: string;
  institution: string;
  degree: string;
  field: string;
  institutionLogo?: string;
  location?: string;
  startYear: string;
  endYear: string;
  gradeGpa?: string;
  description: string;
  website?: string;
  certificate?: string;
  sortOrder?: number;
}

export interface Certification {
  _id: string;
  title: string;
  issuer: string;
  issueDate: string;
  expirationDate?: string;
  certificateId?: string;
  credentialUrl: string;
  image: string;
  description?: string;
  sortOrder?: number;
}

export interface Experience {
  _id: string;
  company: string;
  position: string;
  companyLogo?: string;
  location?: string;
  startDate: string;
  endDate: string;
  currentlyWorking?: boolean;
  description: string;
  responsibilities?: string[];
  technologies: string[];
  website?: string;
  sortOrder?: number;
  active?: boolean;
}

export interface Service {
  _id: string;
  name: string;
  icon: string;
  description: string;
  price?: string;
  features: string[];
  sortOrder?: number;
  active?: boolean;
}

export interface Achievement {
  _id: string;
  title: string;
  description: string;
  date: string;
  organization: string;
  image: string;
  url?: string;
  sortOrder?: number;
}

export interface Testimonial {
  _id: string;
  name: string;
  photo: string;
  jobTitle: string;
  company?: string;
  content: string;
  rating: number;
  website?: string;
  sortOrder?: number;
  active?: boolean;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  author: string;
  status: 'draft' | 'published';
  publishedAt: string;
  seoTitle?: string;
  seoDescription?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SiteSettings {
  _id?: string;
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

export interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead?: boolean;
  createdAt?: string;
}

export interface ContactFormInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}
