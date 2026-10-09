"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAdmin = exports.validateObjectId = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const response_util_1 = require("../utils/response.util");
// Validate MongoDB ObjectId in URL params (e.g. :id)
const validateObjectId = (paramName = 'id') => {
    return (req, res, next) => {
        const id = req.params[paramName];
        if (!id || !mongoose_1.default.Types.ObjectId.isValid(id)) {
            (0, response_util_1.sendError)(res, `Invalid ID format: "${id}". Must be a valid 24-character hexadecimal MongoDB ObjectId`, 400);
            return;
        }
        next();
    };
};
exports.validateObjectId = validateObjectId;
// Simple admin validation middleware (checks X-Admin-Auth header or auth token)
const requireAdmin = (req, res, next) => {
    const adminSecret = process.env.ADMIN_SECRET || 'portfolio-admin-secret-2026';
    const providedToken = req.headers['x-admin-key'] || req.headers['authorization']?.replace('Bearer ', '');
    if (!providedToken || providedToken !== adminSecret) {
        (0, response_util_1.sendError)(res, 'Unauthorized access: Admin key is missing or invalid', 401);
        return;
    }
    next();
};
exports.requireAdmin = requireAdmin;
