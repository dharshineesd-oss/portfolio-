"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mongoose_1 = __importDefault(require("mongoose"));
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    const dbState = mongoose_1.default.connection.readyState;
    const dbStatusMap = {
        0: 'disconnected',
        1: 'connected',
        2: 'connecting',
        3: 'disconnecting'
    };
    res.status(200).json({
        success: true,
        message: 'Portfolio Backend REST API is healthy',
        data: {
            uptime: process.uptime(),
            timestamp: new Date().toISOString(),
            database: dbStatusMap[dbState] || 'unknown',
            environment: process.env.NODE_ENV || 'development'
        }
    });
});
exports.default = router;
