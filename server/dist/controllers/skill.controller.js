"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reorderSkills = exports.deleteSkill = exports.updateSkill = exports.createSkill = exports.getSkills = void 0;
const Skill_1 = __importDefault(require("../models/Skill"));
const response_util_1 = require("../utils/response.util");
const getSkills = async (req, res, next) => {
    try {
        const { all } = req.query;
        const filter = all ? {} : { active: true };
        const skills = await Skill_1.default.find(filter).sort({ sortOrder: 1, category: 1, level: -1 });
        (0, response_util_1.sendSuccess)(res, 'Skills fetched successfully', skills, 200);
    }
    catch (error) {
        next(error);
    }
};
exports.getSkills = getSkills;
const createSkill = async (req, res, next) => {
    try {
        const { name, category } = req.body;
        if (!name || !category) {
            (0, response_util_1.sendError)(res, 'Skill name and category are required', 400);
            return;
        }
        const newSkill = new Skill_1.default(req.body);
        await newSkill.save();
        (0, response_util_1.sendSuccess)(res, 'Skill created successfully', newSkill, 201);
    }
    catch (error) {
        next(error);
    }
};
exports.createSkill = createSkill;
const updateSkill = async (req, res, next) => {
    try {
        const updated = await Skill_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updated) {
            (0, response_util_1.sendError)(res, `Skill with ID ${req.params.id} not found`, 404);
            return;
        }
        (0, response_util_1.sendSuccess)(res, 'Skill updated successfully', updated, 200);
    }
    catch (error) {
        next(error);
    }
};
exports.updateSkill = updateSkill;
const deleteSkill = async (req, res, next) => {
    try {
        const deleted = await Skill_1.default.findByIdAndDelete(req.params.id);
        if (!deleted) {
            (0, response_util_1.sendError)(res, `Skill with ID ${req.params.id} not found`, 404);
            return;
        }
        (0, response_util_1.sendSuccess)(res, 'Skill deleted successfully', deleted, 200);
    }
    catch (error) {
        next(error);
    }
};
exports.deleteSkill = deleteSkill;
const reorderSkills = async (req, res, next) => {
    try {
        const { items } = req.body;
        if (Array.isArray(items)) {
            await Promise.all(items.map((it) => Skill_1.default.findByIdAndUpdate(it.id, { sortOrder: it.sortOrder })));
        }
        (0, response_util_1.sendSuccess)(res, 'Skills reordered successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.reorderSkills = reorderSkills;
