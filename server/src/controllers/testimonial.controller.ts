import { Request, Response, NextFunction } from 'express';
import Testimonial from '../models/Testimonial';
import { sendSuccess, sendError } from '../utils/response.util';

export const getTestimonials = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const list = await Testimonial.find().sort({ sortOrder: 1, createdAt: -1 });
    sendSuccess(res, 'Testimonials fetched successfully', list);
  } catch (err) {
    next(err);
  }
};

export const createTestimonial = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const item = new Testimonial(req.body);
    await item.save();
    sendSuccess(res, 'Testimonial created successfully', item, 201);
  } catch (err) {
    next(err);
  }
};

export const updateTestimonial = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const updated = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      sendError(res, 'Testimonial not found', 404);
      return;
    }
    sendSuccess(res, 'Testimonial updated successfully', updated);
  } catch (err) {
    next(err);
  }
};

export const deleteTestimonial = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const deleted = await Testimonial.findByIdAndDelete(req.params.id);
    if (!deleted) {
      sendError(res, 'Testimonial not found', 404);
      return;
    }
    sendSuccess(res, 'Testimonial deleted successfully', deleted);
  } catch (err) {
    next(err);
  }
};
