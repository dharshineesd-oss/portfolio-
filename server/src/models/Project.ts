import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  fullDescription: string;
  technologies: string[];
  category: string;
  githubUrl: string;
  liveUrl: string;
  image: string;
  galleryImages: string[];
  client: string;
  projectDate: string;
  features: string[];
  challenges: string;
  solutions: string;
  featured: boolean;
  sortOrder: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    fullDescription: { type: String, default: '' },
    technologies: { type: [String], required: true, default: [] },
    category: { type: String, default: 'Web Development' },
    githubUrl: { type: String, default: '' },
    liveUrl: { type: String, default: '' },
    image: { type: String, default: '' },
    galleryImages: { type: [String], default: [] },
    client: { type: String, default: '' },
    projectDate: { type: String, default: '' },
    features: { type: [String], default: [] },
    challenges: { type: String, default: '' },
    solutions: { type: String, default: '' },
    featured: { type: Boolean, default: false },
    sortOrder: { type: Number, default: 0 },
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model<IProject>('Project', ProjectSchema);
