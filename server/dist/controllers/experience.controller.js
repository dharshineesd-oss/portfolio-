"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteExperience = exports.updateExperience = exports.createExperience = exports.getExperiences = void 0;
const experience_service_1 = require("../services/experience.service");
const response_util_1 = require("../utils/response.util");
const getExperiences = async (req, res, next) => {
    try {
        const list = await experience_service_1.experienceService.getAllExperiences();
        (0, response_util_1.sendSuccess)(res, 'Experience records fetched successfully', list, 200);
    }
    catch (error) {
        next(error);
    }
};
exports.getExperiences = getExperiences;
const createExperience = async (req, res, next) => {
    try {
        const { company, position, startDate, endDate, description, technologies } = req.body;
        if (!company || !position || !startDate) {
            (0, response_util_1.sendError)(res, 'company, position, and startDate are required fields', 400);
            return;
        }
        const newExp = await experience_service_1.experienceService.createExperience({
            company,
            position,
            startDate,
            endDate: endDate || 'Present',
            description: description || '',
            technologies: Array.isArray(technologies) ? technologies : (technologies ? [technologies] : [])
        });
        (0, response_util_1.sendSuccess)(res, 'Experience record created successfully', newExp, 201);
    }
    catch (error) {
        next(error);
    }
};
exports.createExperience = createExperience;
const updateExperience = async (req, res, next) => {
    try {
        const updated = await experience_service_1.experienceService.updateExperience(req.params.id, req.body);
        if (!updated) {
            (0, response_util_1.sendError)(res, `Experience record with ID ${req.params.id} not found`, 404);
            return;
        }
        (0, response_util_1.sendSuccess)(res, 'Experience record updated successfully', updated, 200);
    }
    catch (error) {
        next(error);
    }
};
exports.updateExperience = updateExperience;
const deleteExperience = async (req, res, next) => {
    try {
        const deleted = await experience_service_1.experienceService.deleteExperience(req.params.id);
        if (!deleted) {
            (0, response_util_1.sendError)(res, `Experience record with ID ${req.params.id} not found`, 404);
            return;
        }
        (0, response_util_1.sendSuccess)(res, 'Experience record deleted successfully', deleted, 200);
    }
    catch (error) {
        next(error);
    }
};
exports.deleteExperience = deleteExperience;
