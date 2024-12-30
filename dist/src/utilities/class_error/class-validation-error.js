"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = void 0;
class ValidationError extends Error {
    constructor(error) {
        super(error.message);
        this.name = "validationError";
        this.status = 400;
        this.message = this.message;
    }
    toJson() {
        return {
            name: this.name,
            status: this.status,
            message: this.message,
        };
    }
}
exports.ValidationError = ValidationError;
