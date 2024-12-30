"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generaToken = generaToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../config/config");
const secret = config_1.CONFIG.app.secret.jwt;
function generaToken(data) {
    return jsonwebtoken_1.default.sign(data, secret, { expiresIn: "1h" });
}
