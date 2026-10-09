"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.certificationService = exports.CertificationService = void 0;
const Certification_1 = __importDefault(require("../models/Certification"));
class CertificationService {
    async getAllCertifications() {
        return await Certification_1.default.find().sort({ issueDate: -1, createdAt: -1 });
    }
    async getCertificationById(id) {
        return await Certification_1.default.findById(id);
    }
    async createCertification(data) {
        const cert = new Certification_1.default(data);
        return await cert.save();
    }
    async updateCertification(id, data) {
        return await Certification_1.default.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    }
    async deleteCertification(id) {
        return await Certification_1.default.findByIdAndDelete(id);
    }
}
exports.CertificationService = CertificationService;
exports.certificationService = new CertificationService();
