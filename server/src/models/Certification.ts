import mongoose, { Document, Schema } from 'mongoose';

export interface ICertification extends Document {
  title: string;
  issuer: string;
  issueDate: string;
  expirationDate: string;
  certificateId: string;
  credentialUrl: string;
  image: string;
  description: string;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const CertificationSchema: Schema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    issuer: { type: String, required: true, trim: true },
    issueDate: { type: String, required: true, trim: true },
    expirationDate: { type: String, default: '' },
    certificateId: { type: String, default: '' },
    credentialUrl: { type: String, default: '' },
    image: { type: String, default: '' },
    description: { type: String, default: '' },
    sortOrder: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model<ICertification>('Certification', CertificationSchema);
