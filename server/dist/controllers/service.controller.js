"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reorderServices = exports.deleteService = exports.updateService = exports.createService = exports.getServices = void 0;
const Service_1 = __importDefault(require("../models/Service"));
const response_util_1 = require("../utils/response.util");
const getServices = async (req, res, next) => {
    try {
        const services = await Service_1.default.find().sort({ sortOrder: 1, createdAt: 1 });
        (0, response_util_1.sendSuccess)(res, 'Services fetched successfully', services);
    }
    catch (err) {
        next(err);
    }
};
exports.getServices = getServices;
const createService = async (req, res, next) => {
    try {
        const service = new Service_1.default(req.body);
        await service.save();
        (0, response_util_1.sendSuccess)(res, 'Service created successfully', service, 201);
    }
    catch (err) {
        next(err);
    }
};
exports.createService = createService;
const updateService = async (req, res, next) => {
    try {
        const updated = await Service_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) {
            (0, response_util_1.sendError)(res, 'Service not found', 404);
            return;
        }
        (0, response_util_1.sendSuccess)(res, 'Service updated successfully', updated);
    }
    catch (err) {
        next(err);
    }
};
exports.updateService = updateService;
const deleteService = async (req, res, next) => {
    try {
        const deleted = await Service_1.default.findByIdAndDelete(req.params.id);
        if (!deleted) {
            (0, response_util_1.sendError)(res, 'Service not found', 404);
            return;
        }
        (0, response_util_1.sendSuccess)(res, 'Service deleted successfully', deleted);
    }
    catch (err) {
        next(err);
    }
};
exports.deleteService = deleteService;
const reorderServices = async (req, res, next) => {
    try {
        const { items } = req.body; // array of { id, sortOrder }
        if (Array.isArray(items)) {
            await Promise.all(items.map((it) => Service_1.default.findByIdAndUpdate(it.id, { sortOrder: it.sortOrder })));
        }
        (0, response_util_1.sendSuccess)(res, 'Services reordered successfully');
    }
    catch (err) {
        next(err);
    }
};
exports.reorderServices = reorderServices;
