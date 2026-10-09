import mongoose, { Document, Schema } from 'mongoose';

export interface IBlogPost extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  author: string;
  status: 'draft' | 'published';
  publishedAt: Date;
  seoTitle: string;
  seoDescription: string;
}

const BlogPostSchema: Schema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    coverImage: { type: String, default: '' },
    category: { type: String, default: 'Web Development' },
    tags: { type: [String], default: [] },
    author: { type: String, default: 'Dharshinee SD' },
    status: { type: String, enum: ['draft', 'published'], default: 'published' },
    publishedAt: { type: Date, default: Date.now },
    seoTitle: { type: String, default: '' },
    seoDescription: { type: String, default: '' }
  },
  { timestamps: true }
);

export default mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);
