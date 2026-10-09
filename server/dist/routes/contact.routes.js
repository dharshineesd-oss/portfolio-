"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contact_controller_1 = require("../controllers/contact.controller");
const validate_middleware_1 = require("../middleware/validate.middleware");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
// Public endpoint for submitting contact form
router.post('/', contact_controller_1.submitContactMessage);
// Admin endpoints for viewing & managing messages
router.get('/', auth_middleware_1.authenticateAdmin, contact_controller_1.getContactMessages);
router.patch('/:id/toggle-read', auth_middleware_1.authenticateAdmin, (0, validate_middleware_1.validateObjectId)('id'), contact_controller_1.toggleMessageRead);
router.delete('/:id', auth_middleware_1.authenticateAdmin, (0, validate_middleware_1.validateObjectId)('id'), contact_controller_1.deleteContactMessage);
exports.default = router;
