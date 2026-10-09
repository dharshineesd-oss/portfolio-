import mongoose, { Document, Schema } from 'mongoose';

export interface IAchievement extends Document {
  title: string;
  description: string;
  date: string;
  organization: string;
  image: string;
  url: string;
  sortOrder: number;
}

const AchievementSchema: Schema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    date: { type: String, required: true },
    organization: { type: String, required: true },
    image: { type: String, default: '' },
    url: { type: String, default: '' },
    sortOrder: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model<IAchievement>('Achievement', AchievementSchema);
