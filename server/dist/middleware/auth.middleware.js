"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateAdmin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const response_util_1 = require("../utils/response.util");
const authenticateAdmin = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const adminSecretHeader = req.headers['x-admin-key'];
    const expectedSecret = process.env.ADMIN_SECRET || 'portfolio-admin-secret-2026';
    // 1. Allow bypass with valid Admin Secret key
    if (adminSecretHeader && adminSecretHeader === expectedSecret) {
        req.user = { role: 'admin', email: 'admin@portfolio.com' };
        return next();
    }
    // 2. Check JWT Bearer token
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        (0, response_util_1.sendError)(res, 'Authorization token is missing. Please log in as an administrator.', 401);
        return;
    }
    const token = authHeader.split(' ')[1];
    const jwtSecret = process.env.JWT_SECRET || 'dharshinee-portfolio-jwt-super-secret-key-2026';
    try {
        const decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
        req.user = decoded;
        next();
    }
    catch (err) {
        (0, response_util_1.sendError)(res, 'Session expired or invalid token. Please log in again.', 401);
    }
};
exports.authenticateAdmin = authenticateAdmin;
