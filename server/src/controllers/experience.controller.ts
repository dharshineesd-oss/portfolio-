import { Request, Response, NextFunction } from 'express';
import { experienceService } from '../services/experience.service';
import { sendSuccess, sendError } from '../utils/response.util';

export const getExperiences = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const list = await experienceService.getAllExperiences();
    sendSuccess(res, 'Experience records fetched successfully', list, 200);
  } catch (error) {
    next(error);
  }
};

export const createExperience = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { company, position, startDate, endDate, description, technologies } = req.body;
    if (!company || !position || !startDate) {
      sendError(res, 'company, position, and startDate are required fields', 400);
      return;
    }

    const newExp = await experienceService.createExperience({
      company,
      position,
      startDate,
      endDate: endDate || 'Present',
      description: description || '',
      technologies: Array.isArray(technologies) ? technologies : (technologies ? [technologies] : [])
    });

    sendSuccess(res, 'Experience record created successfully', newExp, 201);
  } catch (error) {
    next(error);
  }
};

export const updateExperience = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const updated = await experienceService.updateExperience(req.params.id, req.body);
    if (!updated) {
      sendError(res, `Experience record with ID ${req.params.id} not found`, 404);
      return;
    }
    sendSuccess(res, 'Experience record updated successfully', updated, 200);
  } catch (error) {
    next(error);
  }
};

export const deleteExperience = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const deleted = await experienceService.deleteExperience(req.params.id);
    if (!deleted) {
      sendError(res, `Experience record with ID ${req.params.id} not found`, 404);
      return;
    }
    sendSuccess(res, 'Experience record deleted successfully', deleted, 200);
  } catch (error) {
    next(error);
  }
};
