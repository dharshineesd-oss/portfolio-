import mongoose, { Document, Schema } from 'mongoose';

export interface IProfile extends Document {
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

const ProfileSchema: Schema = new Schema(
  {
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
  },
  { timestamps: true }
);

export default mongoose.model<IProfile>('Profile', ProfileSchema);
