import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { sendSuccess, sendError } from '../utils/response.util';
import { AuthRequest } from '../middleware/auth.middleware';

const generateToken = (userId: string, email: string, role: string): string => {
  const secret = process.env.JWT_SECRET || 'dharshinee-portfolio-jwt-super-secret-key-2026';
  return jwt.sign({ id: userId, email, role }, secret, { expiresIn: '7d' });
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      sendError(res, 'Email and password are required', 400);
      return;
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      sendError(res, 'Invalid email or password credentials', 401);
      return;
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      sendError(res, 'Invalid email or password credentials', 401);
      return;
    }

    const token = generateToken(user._id.toString(), user.email, user.role);

    sendSuccess(res, 'Authentication successful', {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    next(err);
  }
};

export const getMe = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user || !req.user.id) {
      // Secret key fallback admin
      sendSuccess(res, 'Admin authenticated via master key', {
        user: { name: 'Master Admin', email: 'admin@portfolio.com', role: 'admin' }
      });
      return;
    }

    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      sendError(res, 'User not found', 404);
      return;
    }

    sendSuccess(res, 'User profile retrieved', { user });
  } catch (err) {
    next(err);
  }
};

export const changePassword = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      sendError(res, 'Please provide current and new passwords', 400);
      return;
    }

    if (newPassword.length < 6) {
      sendError(res, 'New password must be at least 6 characters long', 400);
      return;
    }

    const user = await User.findOne({ role: 'admin' });
    if (!user) {
      sendError(res, 'Admin account not found', 404);
      return;
    }

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      sendError(res, 'Current password does not match', 400);
      return;
    }

    user.password = newPassword;
    await user.save();

    sendSuccess(res, 'Password changed successfully');
  } catch (err) {
    next(err);
  }
};
