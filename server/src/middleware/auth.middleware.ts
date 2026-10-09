import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { sendError } from '../utils/response.util';

export interface AuthRequest extends Request {
  user?: any;
}

export const authenticateAdmin = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  const adminSecretHeader = req.headers['x-admin-key'];
  const expectedSecret = process.env.ADMIN_SECRET || 'portfolio-admin-secret-2026';

  // 1. Allow bypass with valid Admin Secret key
  if (adminSecretHeader && adminSecretHeader === expectedSecret) {
    req.user = { role: 'admin', email: 'admin@portfolio.com' };
    return next();
  }

  // 2. Check JWT Bearer token
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    sendError(res, 'Authorization token is missing. Please log in as an administrator.', 401);
    return;
  }

  const token = authHeader.split(' ')[1];
  const jwtSecret = process.env.JWT_SECRET || 'dharshinee-portfolio-jwt-super-secret-key-2026';

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    next();
  } catch (err: any) {
    sendError(res, 'Session expired or invalid token. Please log in again.', 401);
  }
};
