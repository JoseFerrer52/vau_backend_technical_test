"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.response = void 0;
const response = (res, status, message, object) => {
    res.status(status).json({
        error: false,
        status: status,
        message: message,
        object: object,
    });
};
exports.response = response;
