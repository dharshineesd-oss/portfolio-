import mongoose, { Document, Schema } from 'mongoose';

export interface ITestimonial extends Document {
  name: string;
  photo: string;
  jobTitle: string;
  company: string;
  content: string;
  rating: number;
  website: string;
  sortOrder: number;
  active: boolean;
}

const TestimonialSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    photo: { type: String, default: '' },
    jobTitle: { type: String, required: true },
    company: { type: String, default: '' },
    content: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    website: { type: String, default: '' },
    sortOrder: { type: Number, default: 0 },
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);
