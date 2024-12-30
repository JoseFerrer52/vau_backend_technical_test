"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeHeader = decodeHeader;
const get_token_1 = require("./get-token");
const verify_token_1 = require("./verify-token");
function decodeHeader(req) {
    const authorization = req.headers.authorization || "";
    const token = (0, get_token_1.getToken)(authorization);
    const decoded = (0, verify_token_1.verifyToken)(token);
    req = decoded;
    return decoded;
}
