"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCertification = exports.updateCertification = exports.createCertification = exports.getCertifications = void 0;
const certification_service_1 = require("../services/certification.service");
const response_util_1 = require("../utils/response.util");
const getCertifications = async (req, res, next) => {
    try {
        const list = await certification_service_1.certificationService.getAllCertifications();
        (0, response_util_1.sendSuccess)(res, 'Certifications fetched successfully', list, 200);
    }
    catch (error) {
        next(error);
    }
};
exports.getCertifications = getCertifications;
const createCertification = async (req, res, next) => {
    try {
        const { title, issuer, issueDate, credentialUrl, image } = req.body;
        if (!title || !issuer || !issueDate) {
            (0, response_util_1.sendError)(res, 'title, issuer, and issueDate are required fields', 400);
            return;
        }
        const newCert = await certification_service_1.certificationService.createCertification({
            title,
            issuer,
            issueDate,
            credentialUrl: credentialUrl || '',
            image: image || ''
        });
        (0, response_util_1.sendSuccess)(res, 'Certification created successfully', newCert, 201);
    }
    catch (error) {
        next(error);
    }
};
exports.createCertification = createCertification;
const updateCertification = async (req, res, next) => {
    try {
        const updated = await certification_service_1.certificationService.updateCertification(req.params.id, req.body);
        if (!updated) {
            (0, response_util_1.sendError)(res, `Certification with ID ${req.params.id} not found`, 404);
            return;
        }
        (0, response_util_1.sendSuccess)(res, 'Certification updated successfully', updated, 200);
    }
    catch (error) {
        next(error);
    }
};
exports.updateCertification = updateCertification;
const deleteCertification = async (req, res, next) => {
    try {
        const deleted = await certification_service_1.certificationService.deleteCertification(req.params.id);
        if (!deleted) {
            (0, response_util_1.sendError)(res, `Certification with ID ${req.params.id} not found`, 404);
            return;
        }
        (0, response_util_1.sendSuccess)(res, 'Certification deleted successfully', deleted, 200);
    }
    catch (error) {
        next(error);
    }
};
exports.deleteCertification = deleteCertification;
