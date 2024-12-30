"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cached_async_1 = require("../../../../utilities/cached-async");
const sign_in_validation_1 = require("../../../../middleware/validations/sign-in-validation");
const sign_in_controller_1 = require("./sign-in.controller");
const router = (0, express_1.Router)();
router.post("/singIn", (0, sign_in_validation_1.singInValidate)(sign_in_validation_1.createSingInValidation), (0, cached_async_1.cachedAsync)(sign_in_controller_1.signIn));
exports.default = router;
