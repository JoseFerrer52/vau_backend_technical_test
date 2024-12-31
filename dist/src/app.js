"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const index_routes_1 = __importDefault(require("./routes/index.routes"));
const default_routes_1 = __importDefault(require("./app/default/application/default.routes"));
const res_error_1 = require("./utilities/res-error");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.app.use((0, helmet_1.default)());
exports.app.use((0, cors_1.default)({}));
exports.app.use((0, morgan_1.default)("dev"));
exports.app.use(default_routes_1.default);
exports.app.use("/api", index_routes_1.default);
exports.app.use((error, _req, res, _next) => {
    console.log(error);
    const { status, message, path, name } = error;
    (0, res_error_1.resError)(res, status, message, name, path);
});
