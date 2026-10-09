import ContactMessage, { IContactMessage } from '../models/ContactMessage';

export class ContactService {
  async getAllMessages(): Promise<IContactMessage[]> {
    return await ContactMessage.find().sort({ createdAt: -1 });
  }

  async createMessage(data: { name: string; email: string; subject: string; message: string }): Promise<IContactMessage> {
    const newMessage = new ContactMessage(data);
    return await newMessage.save();
  }

  async deleteMessage(id: string): Promise<IContactMessage | null> {
    return await ContactMessage.findByIdAndDelete(id);
  }
}

export const contactService = new ContactService();
