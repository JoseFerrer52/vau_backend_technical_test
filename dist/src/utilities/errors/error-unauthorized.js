"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unauthorizedErrorResponse = unauthorizedErrorResponse;
const class_error_unauthorized_1 = require("../class_error/class-error-unauthorized");
function unauthorizedErrorResponse(errorMessage) {
    const error = new Error(errorMessage);
    throw new class_error_unauthorized_1.UnauthorizedError(error);
}
