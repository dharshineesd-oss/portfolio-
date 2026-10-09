import { Request, Response, NextFunction } from 'express';
import { certificationService } from '../services/certification.service';
import { sendSuccess, sendError } from '../utils/response.util';

export const getCertifications = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const list = await certificationService.getAllCertifications();
    sendSuccess(res, 'Certifications fetched successfully', list, 200);
  } catch (error) {
    next(error);
  }
};

export const createCertification = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { title, issuer, issueDate, credentialUrl, image } = req.body;
    if (!title || !issuer || !issueDate) {
      sendError(res, 'title, issuer, and issueDate are required fields', 400);
      return;
    }

    const newCert = await certificationService.createCertification({
      title,
      issuer,
      issueDate,
      credentialUrl: credentialUrl || '',
      image: image || ''
    });

    sendSuccess(res, 'Certification created successfully', newCert, 201);
  } catch (error) {
    next(error);
  }
};

export const updateCertification = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const updated = await certificationService.updateCertification(req.params.id, req.body);
    if (!updated) {
      sendError(res, `Certification with ID ${req.params.id} not found`, 404);
      return;
    }
    sendSuccess(res, 'Certification updated successfully', updated, 200);
  } catch (error) {
    next(error);
  }
};

export const deleteCertification = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const deleted = await certificationService.deleteCertification(req.params.id);
    if (!deleted) {
      sendError(res, `Certification with ID ${req.params.id} not found`, 404);
      return;
    }
    sendSuccess(res, 'Certification deleted successfully', deleted, 200);
  } catch (error) {
    next(error);
  }
};
