"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedError = void 0;
class UnauthorizedError extends Error {
    constructor(error) {
        super(error.message);
        this.name = "unauthorizedError";
        this.status = 401;
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
exports.UnauthorizedError = UnauthorizedError;
