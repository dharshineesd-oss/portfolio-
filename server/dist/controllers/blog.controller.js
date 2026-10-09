"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlogPost = exports.updateBlogPost = exports.createBlogPost = exports.getBlogPostBySlug = exports.getBlogPosts = void 0;
const BlogPost_1 = __importDefault(require("../models/BlogPost"));
const response_util_1 = require("../utils/response.util");
const getBlogPosts = async (req, res, next) => {
    try {
        const { category, search, all } = req.query;
        const filter = {};
        // If 'all' is not set, only return published posts for public view
        if (!all) {
            filter.status = 'published';
        }
        if (category && category !== 'All') {
            filter.category = category;
        }
        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: 'i' } },
                { excerpt: { $regex: search, $options: 'i' } },
                { content: { $regex: search, $options: 'i' } }
            ];
        }
        const posts = await BlogPost_1.default.find(filter).sort({ publishedAt: -1, createdAt: -1 });
        (0, response_util_1.sendSuccess)(res, 'Blog posts fetched successfully', posts);
    }
    catch (err) {
        next(err);
    }
};
exports.getBlogPosts = getBlogPosts;
const getBlogPostBySlug = async (req, res, next) => {
    try {
        const { slug } = req.params;
        // Look up by slug or ID
        const post = await BlogPost_1.default.findOne({
            $or: [{ slug: slug.toLowerCase() }, { _id: slug.match(/^[0-9a-fA-F]{24}$/) ? slug : null }]
        });
        if (!post) {
            (0, response_util_1.sendError)(res, 'Article not found', 404);
            return;
        }
        (0, response_util_1.sendSuccess)(res, 'Article retrieved successfully', post);
    }
    catch (err) {
        next(err);
    }
};
exports.getBlogPostBySlug = getBlogPostBySlug;
const createBlogPost = async (req, res, next) => {
    try {
        const { title, excerpt, content, coverImage, category, tags, author, status, seoTitle, seoDescription } = req.body;
        if (!title || !content) {
            (0, response_util_1.sendError)(res, 'Title and content are required fields', 400);
            return;
        }
        // Auto-generate slug if not provided
        let slug = req.body.slug
            ? req.body.slug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
            : title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        // Ensure slug uniqueness
        const existing = await BlogPost_1.default.findOne({ slug });
        if (existing) {
            slug = `${slug}-${Date.now().toString().slice(-4)}`;
        }
        const post = new BlogPost_1.default({
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
        (0, response_util_1.sendSuccess)(res, 'Blog article created successfully', post, 201);
    }
    catch (err) {
        next(err);
    }
};
exports.createBlogPost = createBlogPost;
const updateBlogPost = async (req, res, next) => {
    try {
        const updated = await BlogPost_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) {
            (0, response_util_1.sendError)(res, 'Blog article not found', 404);
            return;
        }
        (0, response_util_1.sendSuccess)(res, 'Blog article updated successfully', updated);
    }
    catch (err) {
        next(err);
    }
};
exports.updateBlogPost = updateBlogPost;
const deleteBlogPost = async (req, res, next) => {
    try {
        const deleted = await BlogPost_1.default.findByIdAndDelete(req.params.id);
        if (!deleted) {
            (0, response_util_1.sendError)(res, 'Blog article not found', 404);
            return;
        }
        (0, response_util_1.sendSuccess)(res, 'Blog article deleted successfully', deleted);
    }
    catch (err) {
        next(err);
    }
};
exports.deleteBlogPost = deleteBlogPost;
