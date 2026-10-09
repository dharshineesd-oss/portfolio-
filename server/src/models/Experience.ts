import mongoose, { Document, Schema } from 'mongoose';

export interface IExperience extends Document {
  company: string;
  position: string;
  companyLogo: string;
  location: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  description: string;
  responsibilities: string[];
  technologies: string[];
  website: string;
  sortOrder: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ExperienceSchema: Schema = new Schema(
  {
    company: { type: String, required: true, trim: true },
    position: { type: String, required: true, trim: true },
    companyLogo: { type: String, default: '' },
    location: { type: String, default: 'India' },
    startDate: { type: String, required: true, trim: true },
    endDate: { type: String, default: 'Present', trim: true },
    currentlyWorking: { type: Boolean, default: false },
    description: { type: String, default: '' },
    responsibilities: { type: [String], default: [] },
    technologies: { type: [String], default: [] },
    website: { type: String, default: '' },
    sortOrder: { type: Number, default: 0 },
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model<IExperience>('Experience', ExperienceSchema);
