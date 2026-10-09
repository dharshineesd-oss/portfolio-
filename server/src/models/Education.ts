import mongoose, { Document, Schema } from 'mongoose';

export interface IEducation extends Document {
  institution: string;
  degree: string;
  field: string;
  institutionLogo: string;
  location: string;
  startYear: string;
  endYear: string;
  gradeGpa: string;
  description: string;
  website: string;
  certificate: string;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const EducationSchema: Schema = new Schema(
  {
    institution: { type: String, required: true, trim: true },
    degree: { type: String, required: true, trim: true },
    field: { type: String, required: true, trim: true },
    institutionLogo: { type: String, default: '' },
    location: { type: String, default: 'Chennai, India' },
    startYear: { type: String, required: true, trim: true },
    endYear: { type: String, required: true, trim: true },
    gradeGpa: { type: String, default: '' },
    description: { type: String, default: '' },
    website: { type: String, default: '' },
    certificate: { type: String, default: '' },
    sortOrder: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model<IEducation>('Education', EducationSchema);
