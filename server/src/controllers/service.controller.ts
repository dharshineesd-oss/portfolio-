import { Request, Response, NextFunction } from 'express';
import Service from '../models/Service';
import { sendSuccess, sendError } from '../utils/response.util';

export const getServices = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const services = await Service.find().sort({ sortOrder: 1, createdAt: 1 });
    sendSuccess(res, 'Services fetched successfully', services);
  } catch (err) {
    next(err);
  }
};

export const createService = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const service = new Service(req.body);
    await service.save();
    sendSuccess(res, 'Service created successfully', service, 201);
  } catch (err) {
    next(err);
  }
};

export const updateService = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const updated = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      sendError(res, 'Service not found', 404);
      return;
    }
    sendSuccess(res, 'Service updated successfully', updated);
  } catch (err) {
    next(err);
  }
};

export const deleteService = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const deleted = await Service.findByIdAndDelete(req.params.id);
    if (!deleted) {
      sendError(res, 'Service not found', 404);
      return;
    }
    sendSuccess(res, 'Service deleted successfully', deleted);
  } catch (err) {
    next(err);
  }
};

export const reorderServices = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { items } = req.body; // array of { id, sortOrder }
    if (Array.isArray(items)) {
      await Promise.all(items.map((it: { id: string; sortOrder: number }) => Service.findByIdAndUpdate(it.id, { sortOrder: it.sortOrder })));
    }
    sendSuccess(res, 'Services reordered successfully');
  } catch (err) {
    next(err);
  }
};
