"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = void 0;
const decode_header_1 = require("./decode-header");
const error_forbidden_1 = require("../../utilities/errors/error-forbidden");
exports.validateToken = {
    confirmToken: function (req, userId) {
        const decodeToken = (0, decode_header_1.decodeHeader)(req);
        const decode = [decodeToken];
        const mappedRows = decode.map((decode) => ({
            userName: decode.userName,
            userPassword: decode.userPassword,
            id: decode.id,
            iat: decode.iat,
            exp: decode.exp,
        }));
        if (mappedRows[0].id !== userId) {
            throw (0, error_forbidden_1.forbiddenErrorResponse)("No tienes persmiso para realizar esta acción");
        }
    },
};
