"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpadteUser = void 0;
const postgresql_1 = require("../../../data/postgresql");
const error_not_found_1 = require("../../../utilities/errors/error-not-found");
const error_forbidden_1 = require("../../../utilities/errors/error-forbidden");
const UpadteUser = (pool) => __awaiter(void 0, void 0, void 0, function* () {
    return (data, password) => __awaiter(void 0, void 0, void 0, function* () {
        const queryData = (0, postgresql_1.execute)(pool);
        const callProcQuery = `
    CALL sp_update_user($1, $2, $3, $4, $5, $6);
  `;
        const result = yield queryData(callProcQuery, [
            data.userId,
            data.userName,
            password,
            data.email,
            null,
            null,
        ]);
        const stateCode = result[0].o_state_code;
        const message = result[0].o_response;
        if (stateCode === 3) {
            (0, error_forbidden_1.forbiddenErrorResponse)(message);
        }
        else if (stateCode === 2) {
            (0, error_not_found_1.notFoundErrorResponse)(message);
        }
        else {
            return message;
        }
    });
});
exports.UpadteUser = UpadteUser;
