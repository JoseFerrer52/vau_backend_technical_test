"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenError = void 0;
class ForbiddenError extends Error {
    constructor(error) {
        super(error.message);
        this.name = "Forbidden";
        this.status = 403;
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
exports.ForbiddenError = ForbiddenError;
