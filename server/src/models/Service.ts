import mongoose, { Document, Schema } from 'mongoose';

export interface IService extends Document {
  name: string;
  icon: string;
  description: string;
  price?: string;
  features: string[];
  sortOrder: number;
  active: boolean;
}

const ServiceSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    icon: { type: String, default: 'bi-code-slash' },
    description: { type: String, required: true },
    price: { type: String, default: '' },
    features: { type: [String], default: [] },
    sortOrder: { type: Number, default: 0 },
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model<IService>('Service', ServiceSchema);
