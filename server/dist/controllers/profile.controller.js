"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.getProfile = void 0;
const Profile_1 = __importDefault(require("../models/Profile"));
const response_util_1 = require("../utils/response.util");
const getProfile = async (req, res, next) => {
    try {
        let profile = await Profile_1.default.findOne();
        if (!profile) {
            // create default initial profile if none exists
            profile = await Profile_1.default.create({
                name: 'Dharshinee SD',
                title: 'B.Tech Information Technology Student',
                subtitle: 'Aspiring Full Stack Developer'
            });
        }
        (0, response_util_1.sendSuccess)(res, 'Profile retrieved successfully', profile);
    }
    catch (err) {
        next(err);
    }
};
exports.getProfile = getProfile;
const updateProfile = async (req, res, next) => {
    try {
        let profile = await Profile_1.default.findOne();
        if (!profile) {
            profile = new Profile_1.default(req.body);
        }
        else {
            Object.assign(profile, req.body);
        }
        await profile.save();
        (0, response_util_1.sendSuccess)(res, 'Profile updated successfully', profile);
    }
    catch (err) {
        next(err);
    }
};
exports.updateProfile = updateProfile;
