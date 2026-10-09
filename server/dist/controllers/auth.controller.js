"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.getMe = exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const response_util_1 = require("../utils/response.util");
const generateToken = (userId, email, role) => {
    const secret = process.env.JWT_SECRET || 'dharshinee-portfolio-jwt-super-secret-key-2026';
    return jsonwebtoken_1.default.sign({ id: userId, email, role }, secret, { expiresIn: '7d' });
};
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            (0, response_util_1.sendError)(res, 'Email and password are required', 400);
            return;
        }
        const user = await User_1.default.findOne({ email: email.toLowerCase() });
        if (!user) {
            (0, response_util_1.sendError)(res, 'Invalid email or password credentials', 401);
            return;
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            (0, response_util_1.sendError)(res, 'Invalid email or password credentials', 401);
            return;
        }
        const token = generateToken(user._id.toString(), user.email, user.role);
        (0, response_util_1.sendSuccess)(res, 'Authentication successful', {
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    }
    catch (err) {
        next(err);
    }
};
exports.login = login;
const getMe = async (req, res, next) => {
    try {
        if (!req.user || !req.user.id) {
            // Secret key fallback admin
            (0, response_util_1.sendSuccess)(res, 'Admin authenticated via master key', {
                user: { name: 'Master Admin', email: 'admin@portfolio.com', role: 'admin' }
            });
            return;
        }
        const user = await User_1.default.findById(req.user.id).select('-password');
        if (!user) {
            (0, response_util_1.sendError)(res, 'User not found', 404);
            return;
        }
        (0, response_util_1.sendSuccess)(res, 'User profile retrieved', { user });
    }
    catch (err) {
        next(err);
    }
};
exports.getMe = getMe;
const changePassword = async (req, res, next) => {
    try {
        const { currentPassword, newPassword } = req.body;
        if (!currentPassword || !newPassword) {
            (0, response_util_1.sendError)(res, 'Please provide current and new passwords', 400);
            return;
        }
        if (newPassword.length < 6) {
            (0, response_util_1.sendError)(res, 'New password must be at least 6 characters long', 400);
            return;
        }
        const user = await User_1.default.findOne({ role: 'admin' });
        if (!user) {
            (0, response_util_1.sendError)(res, 'Admin account not found', 404);
            return;
        }
        const isMatch = await user.comparePassword(currentPassword);
        if (!isMatch) {
            (0, response_util_1.sendError)(res, 'Current password does not match', 400);
            return;
        }
        user.password = newPassword;
        await user.save();
        (0, response_util_1.sendSuccess)(res, 'Password changed successfully');
    }
    catch (err) {
        next(err);
    }
};
exports.changePassword = changePassword;
