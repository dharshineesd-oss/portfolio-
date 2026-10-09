import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/response.util';

export class AppError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number = 400) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

// 404 Not Found Handler
export const notFoundHandler = (req: Request, res: Response, next: NextFunction): void => {
  res.status(404).json({
    success: false,
    message: `API Route not found: ${req.method} ${req.originalUrl}`
  });
};

// Centralized Global Error Handler
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode = err.statusCode || (err.name === 'ValidationError' ? 400 : 500);
  const message = err.message || 'Internal Server Error';

  // Do not expose sensitive stack traces in production
  const errorDetail = process.env.NODE_ENV === 'development' ? err.stack : undefined;

  res.status(statusCode).json({
    success: false,
    message,
    ...(errorDetail && { error: errorDetail })
  });
};
