import { Request, Response, NextFunction } from 'express';
import ContactMessage from '../models/ContactMessage';
import { sendSuccess, sendError } from '../utils/response.util';

export const submitContactMessage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      sendError(res, 'Please provide all required fields: name, email, subject, and message', 400);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      sendError(res, 'Please provide a valid email address', 400);
      return;
    }

    const savedMessage = new ContactMessage({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim()
    });
    await savedMessage.save();

    sendSuccess(
      res,
      'Thank you! Your message has been sent successfully. I will get back to you soon.',
      { id: savedMessage._id, createdAt: savedMessage.createdAt },
      201
    );
  } catch (error) {
    next(error);
  }
};

export const getContactMessages = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { search } = req.query;
    const filter: any = {};
    if (search) {
      filter.$or = [
        { name: { $regex: search as string, $options: 'i' } },
        { email: { $regex: search as string, $options: 'i' } },
        { subject: { $regex: search as string, $options: 'i' } },
        { message: { $regex: search as string, $options: 'i' } }
      ];
    }
    const messages = await ContactMessage.find(filter).sort({ createdAt: -1 });
    sendSuccess(res, 'Contact messages fetched successfully', messages, 200);
  } catch (error) {
    next(error);
  }
};

export const toggleMessageRead = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const message = await ContactMessage.findById(req.params.id);
    if (!message) {
      sendError(res, 'Message not found', 404);
      return;
    }
    message.isRead = !message.isRead;
    await message.save();
    sendSuccess(res, `Message marked as ${message.isRead ? 'read' : 'unread'}`, message);
  } catch (error) {
    next(error);
  }
};

export const deleteContactMessage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const deleted = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!deleted) {
      sendError(res, `Contact message with ID ${req.params.id} not found`, 404);
      return;
    }
    sendSuccess(res, 'Contact message deleted successfully', deleted, 200);
  } catch (error) {
    next(error);
  }
};
