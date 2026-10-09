"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.experienceService = exports.ExperienceService = void 0;
const Experience_1 = __importDefault(require("../models/Experience"));
class ExperienceService {
    async getAllExperiences() {
        return await Experience_1.default.find().sort({ startDate: -1 });
    }
    async getExperienceById(id) {
        return await Experience_1.default.findById(id);
    }
    async createExperience(data) {
        const exp = new Experience_1.default(data);
        return await exp.save();
    }
    async updateExperience(id, data) {
        return await Experience_1.default.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    }
    async deleteExperience(id) {
        return await Experience_1.default.findByIdAndDelete(id);
    }
}
exports.ExperienceService = ExperienceService;
exports.experienceService = new ExperienceService();
