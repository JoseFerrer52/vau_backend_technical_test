"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cached_async_1 = require("../../../utilities/cached-async");
const dafault_controller_1 = require("./dafault.controller");
const router = (0, express_1.Router)();
router.get("/", (0, cached_async_1.cachedAsync)(dafault_controller_1.defaultRoot));
exports.default = router;
