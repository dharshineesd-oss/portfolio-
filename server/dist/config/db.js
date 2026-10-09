"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/dharshinee_portfolio';
    try {
        const conn = await mongoose_1.default.connect(mongoURI);
        console.log(`[MongoDB] Connected successfully to host: ${conn.connection.host}, database: ${conn.connection.name}`);
    }
    catch (error) {
        console.error(`[MongoDB Error] Connection failed: ${error.message}`);
        // In production, exit process on fatal DB connection failure
        if (process.env.NODE_ENV === 'production') {
            process.exit(1);
        }
    }
};
exports.connectDB = connectDB;
