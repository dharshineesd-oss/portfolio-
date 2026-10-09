"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSettings = exports.getSettings = void 0;
const SiteSettings_1 = __importDefault(require("../models/SiteSettings"));
const response_util_1 = require("../utils/response.util");
const getSettings = async (req, res, next) => {
    try {
        let settings = await SiteSettings_1.default.findOne();
        if (!settings) {
            settings = await SiteSettings_1.default.create({});
        }
        (0, response_util_1.sendSuccess)(res, 'Site settings retrieved successfully', settings);
    }
    catch (err) {
        next(err);
    }
};
exports.getSettings = getSettings;
const updateSettings = async (req, res, next) => {
    try {
        let settings = await SiteSettings_1.default.findOne();
        if (!settings) {
            settings = new SiteSettings_1.default(req.body);
        }
        else {
            if (req.body.theme)
                settings.theme = { ...settings.theme, ...req.body.theme };
            if (req.body.seo)
                settings.seo = { ...settings.seo, ...req.body.seo };
            if (req.body.socialLinks)
                settings.socialLinks = { ...settings.socialLinks, ...req.body.socialLinks };
            if (req.body.contactInfo)
                settings.contactInfo = { ...settings.contactInfo, ...req.body.contactInfo };
            if (req.body.enabledSections)
                settings.enabledSections = { ...settings.enabledSections, ...req.body.enabledSections };
        }
        await settings.save();
        (0, response_util_1.sendSuccess)(res, 'Site settings updated successfully', settings);
    }
    catch (err) {
        next(err);
    }
};
exports.updateSettings = updateSettings;
