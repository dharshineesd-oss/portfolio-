import { Request, Response, NextFunction } from 'express';
import SiteSettings from '../models/SiteSettings';
import { sendSuccess, sendError } from '../utils/response.util';

export const getSettings = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create({});
    }
    sendSuccess(res, 'Site settings retrieved successfully', settings);
  } catch (err) {
    next(err);
  }
};

export const updateSettings = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = new SiteSettings(req.body);
    } else {
      if (req.body.theme) settings.theme = { ...settings.theme, ...req.body.theme };
      if (req.body.seo) settings.seo = { ...settings.seo, ...req.body.seo };
      if (req.body.socialLinks) settings.socialLinks = { ...settings.socialLinks, ...req.body.socialLinks };
      if (req.body.contactInfo) settings.contactInfo = { ...settings.contactInfo, ...req.body.contactInfo };
      if (req.body.enabledSections) settings.enabledSections = { ...settings.enabledSections, ...req.body.enabledSections };
    }
    await settings.save();
    sendSuccess(res, 'Site settings updated successfully', settings);
  } catch (err) {
    next(err);
  }
};
