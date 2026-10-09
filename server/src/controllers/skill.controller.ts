import { Request, Response, NextFunction } from 'express';
import Skill from '../models/Skill';
import { sendSuccess, sendError } from '../utils/response.util';

export const getSkills = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { all } = req.query;
    const filter = all ? {} : { active: true };
    const skills = await Skill.find(filter).sort({ sortOrder: 1, category: 1, level: -1 });
    sendSuccess(res, 'Skills fetched successfully', skills, 200);
  } catch (error) {
    next(error);
  }
};

export const createSkill = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, category } = req.body;
    if (!name || !category) {
      sendError(res, 'Skill name and category are required', 400);
      return;
    }

    const newSkill = new Skill(req.body);
    await newSkill.save();
    sendSuccess(res, 'Skill created successfully', newSkill, 201);
  } catch (error) {
    next(error);
  }
};

export const updateSkill = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const updated = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) {
      sendError(res, `Skill with ID ${req.params.id} not found`, 404);
      return;
    }
    sendSuccess(res, 'Skill updated successfully', updated, 200);
  } catch (error) {
    next(error);
  }
};

export const deleteSkill = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const deleted = await Skill.findByIdAndDelete(req.params.id);
    if (!deleted) {
      sendError(res, `Skill with ID ${req.params.id} not found`, 404);
      return;
    }
    sendSuccess(res, 'Skill deleted successfully', deleted, 200);
  } catch (error) {
    next(error);
  }
};

export const reorderSkills = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { items } = req.body;
    if (Array.isArray(items)) {
      await Promise.all(items.map((it: { id: string; sortOrder: number }) => Skill.findByIdAndUpdate(it.id, { sortOrder: it.sortOrder })));
    }
    sendSuccess(res, 'Skills reordered successfully');
  } catch (error) {
    next(error);
  }
};
