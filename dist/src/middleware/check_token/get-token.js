"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getToken = getToken;
const error_unauthorized_1 = require("../../utilities/errors/error-unauthorized");
function getToken(authorization) {
    if (!authorization) {
        (0, error_unauthorized_1.unauthorizedErrorResponse)("Token invalido");
    }
    if (authorization.indexOf("Bearer") === -1) {
        (0, error_unauthorized_1.unauthorizedErrorResponse)("Token invalido");
    }
    let token = authorization.replace("Bearer ", "");
    return token;
}
