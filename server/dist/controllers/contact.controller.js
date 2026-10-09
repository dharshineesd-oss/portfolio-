"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContactMessage = exports.toggleMessageRead = exports.getContactMessages = exports.submitContactMessage = void 0;
const ContactMessage_1 = __importDefault(require("../models/ContactMessage"));
const response_util_1 = require("../utils/response.util");
const submitContactMessage = async (req, res, next) => {
    try {
        const { name, email, subject, message } = req.body;
        if (!name || !email || !subject || !message) {
            (0, response_util_1.sendError)(res, 'Please provide all required fields: name, email, subject, and message', 400);
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            (0, response_util_1.sendError)(res, 'Please provide a valid email address', 400);
            return;
        }
        const savedMessage = new ContactMessage_1.default({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            subject: subject.trim(),
            message: message.trim()
        });
        await savedMessage.save();
        (0, response_util_1.sendSuccess)(res, 'Thank you! Your message has been sent successfully. I will get back to you soon.', { id: savedMessage._id, createdAt: savedMessage.createdAt }, 201);
    }
    catch (error) {
        next(error);
    }
};
exports.submitContactMessage = submitContactMessage;
const getContactMessages = async (req, res, next) => {
    try {
        const { search } = req.query;
        const filter = {};
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { subject: { $regex: search, $options: 'i' } },
                { message: { $regex: search, $options: 'i' } }
            ];
        }
        const messages = await ContactMessage_1.default.find(filter).sort({ createdAt: -1 });
        (0, response_util_1.sendSuccess)(res, 'Contact messages fetched successfully', messages, 200);
    }
    catch (error) {
        next(error);
    }
};
exports.getContactMessages = getContactMessages;
const toggleMessageRead = async (req, res, next) => {
    try {
        const message = await ContactMessage_1.default.findById(req.params.id);
        if (!message) {
            (0, response_util_1.sendError)(res, 'Message not found', 404);
            return;
        }
        message.isRead = !message.isRead;
        await message.save();
        (0, response_util_1.sendSuccess)(res, `Message marked as ${message.isRead ? 'read' : 'unread'}`, message);
    }
    catch (error) {
        next(error);
    }
};
exports.toggleMessageRead = toggleMessageRead;
const deleteContactMessage = async (req, res, next) => {
    try {
        const deleted = await ContactMessage_1.default.findByIdAndDelete(req.params.id);
        if (!deleted) {
            (0, response_util_1.sendError)(res, `Contact message with ID ${req.params.id} not found`, 404);
            return;
        }
        (0, response_util_1.sendSuccess)(res, 'Contact message deleted successfully', deleted, 200);
    }
    catch (error) {
        next(error);
    }
};
exports.deleteContactMessage = deleteContactMessage;
