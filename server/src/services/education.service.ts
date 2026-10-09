import Education, { IEducation } from '../models/Education';

export class EducationService {
  async getAllEducation(): Promise<IEducation[]> {
    return await Education.find().sort({ startYear: -1 });
  }

  async getEducationById(id: string): Promise<IEducation | null> {
    return await Education.findById(id);
  }

  async createEducation(data: Partial<IEducation>): Promise<IEducation> {
    const education = new Education(data);
    return await education.save();
  }

  async updateEducation(id: string, data: Partial<IEducation>): Promise<IEducation | null> {
    return await Education.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  async deleteEducation(id: string): Promise<IEducation | null> {
    return await Education.findByIdAndDelete(id);
  }
}

export const educationService = new EducationService();
