"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkToken = checkToken;
const decode_token_1 = require("./decode-token");
function checkToken() {
    function middelware(req, _res, next) {
        const userId = Number(req.body.userId);
        decode_token_1.validateToken.confirmToken(req, userId);
        next();
    }
    return middelware;
}
