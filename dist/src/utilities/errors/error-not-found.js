"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundErrorResponse = notFoundErrorResponse;
const class_error_not_found_1 = require("../class_error/class-error-not-found");
function notFoundErrorResponse(errorMessage) {
    const error = new Error(errorMessage);
    throw new class_error_not_found_1.ClientError(error);
}
