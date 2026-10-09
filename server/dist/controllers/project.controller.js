"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reorderProjects = exports.duplicateProject = exports.deleteProject = exports.updateProject = exports.createProject = exports.getProjectById = exports.getProjects = void 0;
const Project_1 = __importDefault(require("../models/Project"));
const response_util_1 = require("../utils/response.util");
const getProjects = async (req, res, next) => {
    try {
        const { technology, category, featured, all } = req.query;
        const filter = {};
        if (!all) {
            filter.active = true;
        }
        if (technology && technology !== 'All') {
            filter.technologies = { $in: [new RegExp(technology, 'i')] };
        }
        if (category && category !== 'All') {
            filter.category = category;
        }
        if (featured === 'true') {
            filter.featured = true;
        }
        const projects = await Project_1.default.find(filter).sort({ sortOrder: 1, createdAt: -1 });
        (0, response_util_1.sendSuccess)(res, 'Projects fetched successfully', projects, 200);
    }
    catch (error) {
        next(error);
    }
};
exports.getProjects = getProjects;
const getProjectById = async (req, res, next) => {
    try {
        const project = await Project_1.default.findById(req.params.id);
        if (!project) {
            (0, response_util_1.sendError)(res, `Project with ID ${req.params.id} not found`, 404);
            return;
        }
        (0, response_util_1.sendSuccess)(res, 'Project retrieved successfully', project, 200);
    }
    catch (error) {
        next(error);
    }
};
exports.getProjectById = getProjectById;
const createProject = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        if (!title || !description) {
            (0, response_util_1.sendError)(res, 'Title and description are required fields', 400);
            return;
        }
        const newProject = new Project_1.default({
            ...req.body,
            technologies: Array.isArray(req.body.technologies)
                ? req.body.technologies
                : (req.body.technologies ? req.body.technologies.split(',').map((t) => t.trim()) : [])
        });
        await newProject.save();
        (0, response_util_1.sendSuccess)(res, 'Project created successfully', newProject, 201);
    }
    catch (error) {
        next(error);
    }
};
exports.createProject = createProject;
const updateProject = async (req, res, next) => {
    try {
        const payload = { ...req.body };
        if (payload.technologies && typeof payload.technologies === 'string') {
            payload.technologies = payload.technologies.split(',').map((t) => t.trim()).filter(Boolean);
        }
        const updated = await Project_1.default.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true });
        if (!updated) {
            (0, response_util_1.sendError)(res, `Project with ID ${req.params.id} not found`, 404);
            return;
        }
        (0, response_util_1.sendSuccess)(res, 'Project updated successfully', updated, 200);
    }
    catch (error) {
        next(error);
    }
};
exports.updateProject = updateProject;
const deleteProject = async (req, res, next) => {
    try {
        const deleted = await Project_1.default.findByIdAndDelete(req.params.id);
        if (!deleted) {
            (0, response_util_1.sendError)(res, `Project with ID ${req.params.id} not found`, 404);
            return;
        }
        (0, response_util_1.sendSuccess)(res, 'Project deleted successfully', deleted, 200);
    }
    catch (error) {
        next(error);
    }
};
exports.deleteProject = deleteProject;
const duplicateProject = async (req, res, next) => {
    try {
        const source = await Project_1.default.findById(req.params.id);
        if (!source) {
            (0, response_util_1.sendError)(res, 'Source project not found', 404);
            return;
        }
        const duplicate = new Project_1.default({
            ...source.toObject(),
            _id: undefined,
            title: `${source.title} (Copy)`,
            createdAt: new Date()
        });
        await duplicate.save();
        (0, response_util_1.sendSuccess)(res, 'Project duplicated successfully', duplicate, 201);
    }
    catch (error) {
        next(error);
    }
};
exports.duplicateProject = duplicateProject;
const reorderProjects = async (req, res, next) => {
    try {
        const { items } = req.body;
        if (Array.isArray(items)) {
            await Promise.all(items.map((it) => Project_1.default.findByIdAndUpdate(it.id, { sortOrder: it.sortOrder })));
        }
        (0, response_util_1.sendSuccess)(res, 'Projects reordered successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.reorderProjects = reorderProjects;
