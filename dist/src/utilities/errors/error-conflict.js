"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.conflictErrorResponse = conflictErrorResponse;
const class_error_conflict_1 = require("../class_error/class-error-conflict");
function conflictErrorResponse(errorMessage) {
    const error = new Error(errorMessage);
    throw new class_error_conflict_1.ConflictError(error);
}
