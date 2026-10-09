"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEducation = exports.updateEducation = exports.createEducation = exports.getEducation = void 0;
const education_service_1 = require("../services/education.service");
const response_util_1 = require("../utils/response.util");
const getEducation = async (req, res, next) => {
    try {
        const list = await education_service_1.educationService.getAllEducation();
        (0, response_util_1.sendSuccess)(res, 'Education records fetched successfully', list, 200);
    }
    catch (error) {
        next(error);
    }
};
exports.getEducation = getEducation;
const createEducation = async (req, res, next) => {
    try {
        const { institution, degree, field, startYear, endYear, description } = req.body;
        if (!institution || !degree || !field || !startYear || !endYear) {
            (0, response_util_1.sendError)(res, 'institution, degree, field, startYear, and endYear are required', 400);
            return;
        }
        const newEdu = await education_service_1.educationService.createEducation({
            institution,
            degree,
            field,
            startYear: String(startYear),
            endYear: String(endYear),
            description: description || ''
        });
        (0, response_util_1.sendSuccess)(res, 'Education record created successfully', newEdu, 201);
    }
    catch (error) {
        next(error);
    }
};
exports.createEducation = createEducation;
const updateEducation = async (req, res, next) => {
    try {
        const updated = await education_service_1.educationService.updateEducation(req.params.id, req.body);
        if (!updated) {
            (0, response_util_1.sendError)(res, `Education record with ID ${req.params.id} not found`, 404);
            return;
        }
        (0, response_util_1.sendSuccess)(res, 'Education record updated successfully', updated, 200);
    }
    catch (error) {
        next(error);
    }
};
exports.updateEducation = updateEducation;
const deleteEducation = async (req, res, next) => {
    try {
        const deleted = await education_service_1.educationService.deleteEducation(req.params.id);
        if (!deleted) {
            (0, response_util_1.sendError)(res, `Education record with ID ${req.params.id} not found`, 404);
            return;
        }
        (0, response_util_1.sendSuccess)(res, 'Education record deleted successfully', deleted, 200);
    }
    catch (error) {
        next(error);
    }
};
exports.deleteEducation = deleteEducation;
