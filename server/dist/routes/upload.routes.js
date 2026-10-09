"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const response_util_1 = require("../utils/response.util");
const router = (0, express_1.Router)();
// Ensure upload directory exists
const uploadDir = path_1.default.join(process.cwd(), 'uploads');
if (!fs_1.default.existsSync(uploadDir)) {
    fs_1.default.mkdirSync(uploadDir, { recursive: true });
}
// Multer Storage Configuration
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const ext = path_1.default.extname(file.originalname);
        const base = path_1.default.basename(file.originalname, ext).replace(/[^a-zA-Z0-9]/g, '_');
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `${base}-${uniqueSuffix}${ext}`);
    }
});
// File filter (images + pdf)
const fileFilter = (req, file, cb) => {
    const allowedMimes = [
        'image/jpeg',
        'image/png',
        'image/webp',
        'image/gif',
        'image/svg+xml',
        'application/pdf'
    ];
    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(new Error('Invalid file type. Only JPEG, PNG, WEBP, GIF, SVG, and PDF files are allowed.'));
    }
};
const upload = (0, multer_1.default)({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter
});
// Single file upload endpoint: POST /api/upload
router.post('/', upload.single('file'), (req, res) => {
    if (!req.file) {
        (0, response_util_1.sendError)(res, 'No file was provided for upload', 400);
        return;
    }
    const serverUrl = process.env.SERVER_URL || 'http://localhost:5000';
    const fileUrl = `${serverUrl}/uploads/${req.file.filename}`;
    (0, response_util_1.sendSuccess)(res, 'File uploaded successfully', {
        filename: req.file.filename,
        originalName: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        url: fileUrl
    }, 201);
});
exports.default = router;
