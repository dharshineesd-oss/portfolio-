import { Request, Response, NextFunction } from 'express';
import Profile from '../models/Profile';
import { sendSuccess, sendError } from '../utils/response.util';

export const getProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      // create default initial profile if none exists
      profile = await Profile.create({
        name: 'Dharshinee SD',
        title: 'B.Tech Information Technology Student',
        subtitle: 'Aspiring Full Stack Developer'
      });
    }
    sendSuccess(res, 'Profile retrieved successfully', profile);
  } catch (err) {
    next(err);
  }
};

export const updateProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = new Profile(req.body);
    } else {
      Object.assign(profile, req.body);
    }
    await profile.save();
    sendSuccess(res, 'Profile updated successfully', profile);
  } catch (err) {
    next(err);
  }
};
