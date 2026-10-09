import { Request, Response, NextFunction } from 'express';
import { educationService } from '../services/education.service';
import { sendSuccess, sendError } from '../utils/response.util';

export const getEducation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const list = await educationService.getAllEducation();
    sendSuccess(res, 'Education records fetched successfully', list, 200);
  } catch (error) {
    next(error);
  }
};

export const createEducation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { institution, degree, field, startYear, endYear, description } = req.body;
    if (!institution || !degree || !field || !startYear || !endYear) {
      sendError(res, 'institution, degree, field, startYear, and endYear are required', 400);
      return;
    }

    const newEdu = await educationService.createEducation({
      institution,
      degree,
      field,
      startYear: String(startYear),
      endYear: String(endYear),
      description: description || ''
    });

    sendSuccess(res, 'Education record created successfully', newEdu, 201);
  } catch (error) {
    next(error);
  }
};

export const updateEducation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const updated = await educationService.updateEducation(req.params.id, req.body);
    if (!updated) {
      sendError(res, `Education record with ID ${req.params.id} not found`, 404);
      return;
    }
    sendSuccess(res, 'Education record updated successfully', updated, 200);
  } catch (error) {
    next(error);
  }
};

export const deleteEducation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const deleted = await educationService.deleteEducation(req.params.id);
    if (!deleted) {
      sendError(res, `Education record with ID ${req.params.id} not found`, 404);
      return;
    }
    sendSuccess(res, 'Education record deleted successfully', deleted, 200);
  } catch (error) {
    next(error);
  }
};
