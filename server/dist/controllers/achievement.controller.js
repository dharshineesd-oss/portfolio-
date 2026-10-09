"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAchievement = exports.updateAchievement = exports.createAchievement = exports.getAchievements = void 0;
const Achievement_1 = __importDefault(require("../models/Achievement"));
const response_util_1 = require("../utils/response.util");
const getAchievements = async (req, res, next) => {
    try {
        const list = await Achievement_1.default.find().sort({ sortOrder: 1, date: -1 });
        (0, response_util_1.sendSuccess)(res, 'Achievements fetched successfully', list);
    }
    catch (err) {
        next(err);
    }
};
exports.getAchievements = getAchievements;
const createAchievement = async (req, res, next) => {
    try {
        const item = new Achievement_1.default(req.body);
        await item.save();
        (0, response_util_1.sendSuccess)(res, 'Achievement created successfully', item, 201);
    }
    catch (err) {
        next(err);
    }
};
exports.createAchievement = createAchievement;
const updateAchievement = async (req, res, next) => {
    try {
        const updated = await Achievement_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) {
            (0, response_util_1.sendError)(res, 'Achievement not found', 404);
            return;
        }
        (0, response_util_1.sendSuccess)(res, 'Achievement updated successfully', updated);
    }
    catch (err) {
        next(err);
    }
};
exports.updateAchievement = updateAchievement;
const deleteAchievement = async (req, res, next) => {
    try {
        const deleted = await Achievement_1.default.findByIdAndDelete(req.params.id);
        if (!deleted) {
            (0, response_util_1.sendError)(res, 'Achievement not found', 404);
            return;
        }
        (0, response_util_1.sendSuccess)(res, 'Achievement deleted successfully', deleted);
    }
    catch (err) {
        next(err);
    }
};
exports.deleteAchievement = deleteAchievement;
