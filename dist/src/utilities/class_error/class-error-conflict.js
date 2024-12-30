"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConflictError = void 0;
class ConflictError extends Error {
    constructor(error) {
        super(error.message);
        this.name = "Conflict";
        this.status = 409;
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
exports.ConflictError = ConflictError;
