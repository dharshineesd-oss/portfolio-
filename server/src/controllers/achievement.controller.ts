import { Request, Response, NextFunction } from 'express';
import Achievement from '../models/Achievement';
import { sendSuccess, sendError } from '../utils/response.util';

export const getAchievements = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const list = await Achievement.find().sort({ sortOrder: 1, date: -1 });
    sendSuccess(res, 'Achievements fetched successfully', list);
  } catch (err) {
    next(err);
  }
};

export const createAchievement = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const item = new Achievement(req.body);
    await item.save();
    sendSuccess(res, 'Achievement created successfully', item, 201);
  } catch (err) {
    next(err);
  }
};

export const updateAchievement = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const updated = await Achievement.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      sendError(res, 'Achievement not found', 404);
      return;
    }
    sendSuccess(res, 'Achievement updated successfully', updated);
  } catch (err) {
    next(err);
  }
};

export const deleteAchievement = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const deleted = await Achievement.findByIdAndDelete(req.params.id);
    if (!deleted) {
      sendError(res, 'Achievement not found', 404);
      return;
    }
    sendSuccess(res, 'Achievement deleted successfully', deleted);
  } catch (err) {
    next(err);
  }
};
