"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = verifyToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../config/config");
const error_unauthorized_1 = require("../../utilities/errors/error-unauthorized");
const secret = config_1.CONFIG.app.secret.jwt;
function verifyToken(token) {
    try {
        const tokenDecode = jsonwebtoken_1.default.verify(token, secret);
        return tokenDecode;
    }
    catch (error) {
        return (0, error_unauthorized_1.unauthorizedErrorResponse)("Token invalido");
    }
}
