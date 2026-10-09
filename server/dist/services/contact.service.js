"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactService = exports.ContactService = void 0;
const ContactMessage_1 = __importDefault(require("../models/ContactMessage"));
class ContactService {
    async getAllMessages() {
        return await ContactMessage_1.default.find().sort({ createdAt: -1 });
    }
    async createMessage(data) {
        const newMessage = new ContactMessage_1.default(data);
        return await newMessage.save();
    }
    async deleteMessage(id) {
        return await ContactMessage_1.default.findByIdAndDelete(id);
    }
}
exports.ContactService = ContactService;
exports.contactService = new ContactService();
