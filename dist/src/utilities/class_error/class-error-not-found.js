"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientError = void 0;
class ClientError extends Error {
    constructor(error) {
        super(error.message);
        this.name = "Not Found";
        this.status = 404;
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
exports.ClientError = ClientError;
