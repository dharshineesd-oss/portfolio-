"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectService = exports.ProjectService = void 0;
const Project_1 = __importDefault(require("../models/Project"));
class ProjectService {
    async getAllProjects(technology) {
        const query = technology
            ? { technologies: { $in: [new RegExp(technology, 'i')] } }
            : {};
        return await Project_1.default.find(query).sort({ createdAt: -1 });
    }
    async getProjectById(id) {
        return await Project_1.default.findById(id);
    }
    async createProject(data) {
        const project = new Project_1.default(data);
        return await project.save();
    }
    async updateProject(id, data) {
        return await Project_1.default.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    }
    async deleteProject(id) {
        return await Project_1.default.findByIdAndDelete(id);
    }
}
exports.ProjectService = ProjectService;
exports.projectService = new ProjectService();
