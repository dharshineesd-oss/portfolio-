"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = __importDefault(require("./app"));
const db_1 = require("./config/db");
const PORT = process.env.PORT || 5000;
const startServer = async () => {
    try {
        // Connect to MongoDB
        await (0, db_1.connectDB)();
        app_1.default.listen(PORT, () => {
            console.log(`====================================================`);
            console.log(` Portfolio Backend Server running successfully!`);
            console.log(` Port:        http://localhost:${PORT}`);
            console.log(` Health:      http://localhost:${PORT}/api/health`);
            console.log(` Swagger UI:  http://localhost:${PORT}/api-docs`);
            console.log(` Environment: ${process.env.NODE_ENV || 'development'}`);
            console.log(`====================================================`);
        });
    }
    catch (error) {
        console.error(`Failed to start server: ${error.message}`);
        process.exit(1);
    }
};
startServer();
