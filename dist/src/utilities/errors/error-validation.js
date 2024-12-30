"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationErrorResponse = validationErrorResponse;
const class_validation_error_1 = require("../class_error/class-validation-error");
function validationErrorResponse(errorMessage) {
    const error = new Error(errorMessage);
    throw new class_validation_error_1.ValidationError(error);
}
