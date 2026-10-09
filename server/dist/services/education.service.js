"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.educationService = exports.EducationService = void 0;
const Education_1 = __importDefault(require("../models/Education"));
class EducationService {
    async getAllEducation() {
        return await Education_1.default.find().sort({ startYear: -1 });
    }
    async getEducationById(id) {
        return await Education_1.default.findById(id);
    }
    async createEducation(data) {
        const education = new Education_1.default(data);
        return await education.save();
    }
    async updateEducation(id, data) {
        return await Education_1.default.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    }
    async deleteEducation(id) {
        return await Education_1.default.findByIdAndDelete(id);
    }
}
exports.EducationService = EducationService;
exports.educationService = new EducationService();
