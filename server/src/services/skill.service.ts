import Skill, { ISkill } from '../models/Skill';

export class SkillService {
  async getAllSkills(): Promise<ISkill[]> {
    return await Skill.find().sort({ category: 1, level: -1 });
  }

  async getSkillById(id: string): Promise<ISkill | null> {
    return await Skill.findById(id);
  }

  async createSkill(data: Partial<ISkill>): Promise<ISkill> {
    const skill = new Skill(data);
    return await skill.save();
  }

  async updateSkill(id: string, data: Partial<ISkill>): Promise<ISkill | null> {
    return await Skill.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  async deleteSkill(id: string): Promise<ISkill | null> {
    return await Skill.findByIdAndDelete(id);
  }
}

export const skillService = new SkillService();
