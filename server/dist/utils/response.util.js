"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendError = exports.sendSuccess = void 0;
const sendSuccess = (res, message, data, statusCode = 200) => {
    const responseBody = {
        success: true,
        message,
        ...(data !== undefined && { data })
    };
    return res.status(statusCode).json(responseBody);
};
exports.sendSuccess = sendSuccess;
const sendError = (res, message, statusCode = 500, error) => {
    const responseBody = {
        success: false,
        message,
        ...(error && { error })
    };
    return res.status(statusCode).json(responseBody);
};
exports.sendError = sendError;
