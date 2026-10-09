import { Request, Response, NextFunction } from 'express';
import BlogPost from '../models/BlogPost';
import { sendSuccess, sendError } from '../utils/response.util';

export const getBlogPosts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { category, search, all } = req.query;
    const filter: any = {};

    // If 'all' is not set, only return published posts for public view
    if (!all) {
      filter.status = 'published';
    }

    if (category && category !== 'All') {
      filter.category = category;
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search as string, $options: 'i' } },
        { excerpt: { $regex: search as string, $options: 'i' } },
        { content: { $regex: search as string, $options: 'i' } }
      ];
    }

    const posts = await BlogPost.find(filter).sort({ publishedAt: -1, createdAt: -1 });
    sendSuccess(res, 'Blog posts fetched successfully', posts);
  } catch (err) {
    next(err);
  }
};

export const getBlogPostBySlug = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { slug } = req.params;
    // Look up by slug or ID
    const post = await BlogPost.findOne({
      $or: [{ slug: slug.toLowerCase() }, { _id: slug.match(/^[0-9a-fA-F]{24}$/) ? slug : null }]
    });

    if (!post) {
      sendError(res, 'Article not found', 404);
      return;
    }

    sendSuccess(res, 'Article retrieved successfully', post);
  } catch (err) {
    next(err);
  }
};

export const createBlogPost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { title, excerpt, content, coverImage, category, tags, author, status, seoTitle, seoDescription } = req.body;

    if (!title || !content) {
      sendError(res, 'Title and content are required fields', 400);
      return;
    }

    // Auto-generate slug if not provided
    let slug = req.body.slug
      ? req.body.slug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
      : title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    // Ensure slug uniqueness
    const existing = await BlogPost.findOne({ slug });
    if (existing) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    const post = new BlogPost({
      title,
      slug,
      excerpt: excerpt || title,
      content,
      coverImage: coverImage || '',
      category: category || 'Web Development',
      tags: Array.isArray(tags) ? tags : (tags ? [tags] : []),
      author: author || 'Dharshinee SD',
      status: status || 'published',
      publishedAt: new Date(),
      seoTitle: seoTitle || title,
      seoDescription: seoDescription || excerpt || ''
    });

    await post.save();
    sendSuccess(res, 'Blog article created successfully', post, 201);
  } catch (err) {
    next(err);
  }
};

export const updateBlogPost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const updated = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      sendError(res, 'Blog article not found', 404);
      return;
    }
    sendSuccess(res, 'Blog article updated successfully', updated);
  } catch (err) {
    next(err);
  }
};

export const deleteBlogPost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const deleted = await BlogPost.findByIdAndDelete(req.params.id);
    if (!deleted) {
      sendError(res, 'Blog article not found', 404);
      return;
    }
    sendSuccess(res, 'Blog article deleted successfully', deleted);
  } catch (err) {
    next(err);
  }
};
