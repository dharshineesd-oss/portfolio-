import { Request, Response, NextFunction } from 'express';
import Project from '../models/Project';
import { sendSuccess, sendError } from '../utils/response.util';

export const getProjects = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { technology, category, featured, all } = req.query;
    const filter: any = {};

    if (!all) {
      filter.active = true;
    }
    if (technology && technology !== 'All') {
      filter.technologies = { $in: [new RegExp(technology as string, 'i')] };
    }
    if (category && category !== 'All') {
      filter.category = category;
    }
    if (featured === 'true') {
      filter.featured = true;
    }

    const projects = await Project.find(filter).sort({ sortOrder: 1, createdAt: -1 });
    sendSuccess(res, 'Projects fetched successfully', projects, 200);
  } catch (error) {
    next(error);
  }
};

export const getProjectById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      sendError(res, `Project with ID ${req.params.id} not found`, 404);
      return;
    }
    sendSuccess(res, 'Project retrieved successfully', project, 200);
  } catch (error) {
    next(error);
  }
};

export const createProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      sendError(res, 'Title and description are required fields', 400);
      return;
    }

    const newProject = new Project({
      ...req.body,
      technologies: Array.isArray(req.body.technologies)
        ? req.body.technologies
        : (req.body.technologies ? req.body.technologies.split(',').map((t: string) => t.trim()) : [])
    });

    await newProject.save();
    sendSuccess(res, 'Project created successfully', newProject, 201);
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const payload = { ...req.body };
    if (payload.technologies && typeof payload.technologies === 'string') {
      payload.technologies = payload.technologies.split(',').map((t: string) => t.trim()).filter(Boolean);
    }
    const updated = await Project.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true });
    if (!updated) {
      sendError(res, `Project with ID ${req.params.id} not found`, 404);
      return;
    }
    sendSuccess(res, 'Project updated successfully', updated, 200);
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) {
      sendError(res, `Project with ID ${req.params.id} not found`, 404);
      return;
    }
    sendSuccess(res, 'Project deleted successfully', deleted, 200);
  } catch (error) {
    next(error);
  }
};

export const duplicateProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const source = await Project.findById(req.params.id);
    if (!source) {
      sendError(res, 'Source project not found', 404);
      return;
    }
    const duplicate = new Project({
      ...source.toObject(),
      _id: undefined,
      title: `${source.title} (Copy)`,
      createdAt: new Date()
    });
    await duplicate.save();
    sendSuccess(res, 'Project duplicated successfully', duplicate, 201);
  } catch (error) {
    next(error);
  }
};

export const reorderProjects = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { items } = req.body;
    if (Array.isArray(items)) {
      await Promise.all(items.map((it: { id: string; sortOrder: number }) => Project.findByIdAndUpdate(it.id, { sortOrder: it.sortOrder })));
    }
    sendSuccess(res, 'Projects reordered successfully');
  } catch (error) {
    next(error);
  }
};
