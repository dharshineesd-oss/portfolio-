"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const settings_controller_1 = require("../controllers/settings.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.get('/', settings_controller_1.getSettings);
router.put('/', auth_middleware_1.authenticateAdmin, settings_controller_1.updateSettings);
exports.default = router;
