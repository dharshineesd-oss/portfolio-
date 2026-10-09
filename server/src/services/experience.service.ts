import Experience, { IExperience } from '../models/Experience';

export class ExperienceService {
  async getAllExperiences(): Promise<IExperience[]> {
    return await Experience.find().sort({ startDate: -1 });
  }

  async getExperienceById(id: string): Promise<IExperience | null> {
    return await Experience.findById(id);
  }

  async createExperience(data: Partial<IExperience>): Promise<IExperience> {
    const exp = new Experience(data);
    return await exp.save();
  }

  async updateExperience(id: string, data: Partial<IExperience>): Promise<IExperience | null> {
    return await Experience.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  async deleteExperience(id: string): Promise<IExperience | null> {
    return await Experience.findByIdAndDelete(id);
  }
}

export const experienceService = new ExperienceService();
