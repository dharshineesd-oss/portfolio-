"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFoundHandler = exports.AppError = void 0;
class AppError extends Error {
    statusCode;
    constructor(message, statusCode = 400) {
        super(message);
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.AppError = AppError;
// 404 Not Found Handler
const notFoundHandler = (req, res, next) => {
    res.status(404).json({
        success: false,
        message: `API Route not found: ${req.method} ${req.originalUrl}`
    });
};
exports.notFoundHandler = notFoundHandler;
// Centralized Global Error Handler
const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || (err.name === 'ValidationError' ? 400 : 500);
    const message = err.message || 'Internal Server Error';
    // Do not expose sensitive stack traces in production
    const errorDetail = process.env.NODE_ENV === 'development' ? err.stack : undefined;
    res.status(statusCode).json({
        success: false,
        message,
        ...(errorDetail && { error: errorDetail })
    });
};
exports.errorHandler = errorHandler;
