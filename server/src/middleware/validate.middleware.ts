import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { sendError } from '../utils/response.util';

// Validate MongoDB ObjectId in URL params (e.g. :id)
export const validateObjectId = (paramName: string = 'id') => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const id = req.params[paramName];
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      sendError(res, `Invalid ID format: "${id}". Must be a valid 24-character hexadecimal MongoDB ObjectId`, 400);
      return;
    }
    next();
  };
};

// Simple admin validation middleware (checks X-Admin-Auth header or auth token)
export const requireAdmin = (req: Request, res: Response, next: NextFunction): void => {
  const adminSecret = process.env.ADMIN_SECRET || 'portfolio-admin-secret-2026';
  const providedToken = req.headers['x-admin-key'] || req.headers['authorization']?.replace('Bearer ', '');

  if (!providedToken || providedToken !== adminSecret) {
    sendError(res, 'Unauthorized access: Admin key is missing or invalid', 401);
    return;
  }
  next();
};
