"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTestimonial = exports.updateTestimonial = exports.createTestimonial = exports.getTestimonials = void 0;
const Testimonial_1 = __importDefault(require("../models/Testimonial"));
const response_util_1 = require("../utils/response.util");
const getTestimonials = async (req, res, next) => {
    try {
        const list = await Testimonial_1.default.find().sort({ sortOrder: 1, createdAt: -1 });
        (0, response_util_1.sendSuccess)(res, 'Testimonials fetched successfully', list);
    }
    catch (err) {
        next(err);
    }
};
exports.getTestimonials = getTestimonials;
const createTestimonial = async (req, res, next) => {
    try {
        const item = new Testimonial_1.default(req.body);
        await item.save();
        (0, response_util_1.sendSuccess)(res, 'Testimonial created successfully', item, 201);
    }
    catch (err) {
        next(err);
    }
};
exports.createTestimonial = createTestimonial;
const updateTestimonial = async (req, res, next) => {
    try {
        const updated = await Testimonial_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) {
            (0, response_util_1.sendError)(res, 'Testimonial not found', 404);
            return;
        }
        (0, response_util_1.sendSuccess)(res, 'Testimonial updated successfully', updated);
    }
    catch (err) {
        next(err);
    }
};
exports.updateTestimonial = updateTestimonial;
const deleteTestimonial = async (req, res, next) => {
    try {
        const deleted = await Testimonial_1.default.findByIdAndDelete(req.params.id);
        if (!deleted) {
            (0, response_util_1.sendError)(res, 'Testimonial not found', 404);
            return;
        }
        (0, response_util_1.sendSuccess)(res, 'Testimonial deleted successfully', deleted);
    }
    catch (err) {
        next(err);
    }
};
exports.deleteTestimonial = deleteTestimonial;
