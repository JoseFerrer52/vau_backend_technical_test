"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cached_async_1 = require("../../../../utilities/cached-async");
const sign_up_validation_1 = require("../../../../middleware/validations/sign-up-validation");
const sign_up_controller_1 = require("./sign-up.controller");
const router = (0, express_1.Router)();
router.post("/signUp", (0, sign_up_validation_1.signUpvalidate)(sign_up_validation_1.createSignUpValidation), (0, cached_async_1.cachedAsync)(sign_up_controller_1.signUp));
exports.default = router;
