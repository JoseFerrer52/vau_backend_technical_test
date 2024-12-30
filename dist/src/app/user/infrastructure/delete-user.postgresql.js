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
exports.deleteUser = void 0;
const postgresql_1 = require("../../../data/postgresql");
const checkPassword_1 = require("../domain/checkPassword");
const error_forbidden_1 = require("../../../utilities/errors/error-forbidden");
const error_not_found_1 = require("../../../utilities/errors/error-not-found");
const deleteUser = (pool) => __awaiter(void 0, void 0, void 0, function* () {
    return (data) => __awaiter(void 0, void 0, void 0, function* () {
        const queryData = (0, postgresql_1.query)(pool);
        const executeQuery = (0, postgresql_1.execute)(pool);
        const callProcQuery = `
    CALL sp_delete_user($1, $2, $3, $4);
  `;
        const result = yield queryData(callProcQuery, [
            data.userId,
            null,
            null,
            null,
        ]);
        const stateCode = result[0].o_state_code;
        const message = result[0].o_response;
        const password = result[0].o_password;
        const response = "Usuario eliminado con exito";
        if (stateCode === 3) {
            (0, error_forbidden_1.forbiddenErrorResponse)(message);
        }
        else if (stateCode === 2) {
            (0, error_not_found_1.notFoundErrorResponse)(message);
        }
        else {
            yield (0, checkPassword_1.checkPassword)(data, password);
            yield executeQuery(`
        DELETE FROM users WHERE user_id = $1;
      `, [data.userId]);
            return response;
        }
    });
});
exports.deleteUser = deleteUser;
