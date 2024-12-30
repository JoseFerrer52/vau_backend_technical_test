"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_routes_1 = __importDefault(require("../app/user/application/user.routes"));
const sign_up_routes_1 = __importDefault(require("../app/login/sign_up/application/sign-up.routes"));
const sign_in_routes_1 = __importDefault(require("../app/login/sign_in/application/sign-in.routes"));
const get_user_routes_1 = __importDefault(require("../app/main/application/get-user.routes"));
const router = (0, express_1.Router)();
router.use("/login", sign_up_routes_1.default);
router.use("/login", sign_in_routes_1.default);
router.use("/user", user_routes_1.default);
router.use("/user", user_routes_1.default);
router.use("/main", get_user_routes_1.default);
exports.default = router;
