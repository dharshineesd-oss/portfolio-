"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.skillService = exports.SkillService = void 0;
const Skill_1 = __importDefault(require("../models/Skill"));
class SkillService {
    async getAllSkills() {
        return await Skill_1.default.find().sort({ category: 1, level: -1 });
    }
    async getSkillById(id) {
        return await Skill_1.default.findById(id);
    }
    async createSkill(data) {
        const skill = new Skill_1.default(data);
        return await skill.save();
    }
    async updateSkill(id, data) {
        return await Skill_1.default.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    }
    async deleteSkill(id) {
        return await Skill_1.default.findByIdAndDelete(id);
    }
}
exports.SkillService = SkillService;
exports.skillService = new SkillService();
