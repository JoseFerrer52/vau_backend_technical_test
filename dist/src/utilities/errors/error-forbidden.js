"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forbiddenErrorResponse = forbiddenErrorResponse;
const class_forbidden_error_1 = require("../class_error/class-forbidden-error");
function forbiddenErrorResponse(errorMessage) {
    const error = new Error(errorMessage);
    throw new class_forbidden_error_1.ForbiddenError(error);
}
