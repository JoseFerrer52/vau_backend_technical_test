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
exports.authUser = void 0;
const postgresql_1 = require("../../../../data/postgresql");
const add_token_to_user_1 = require("../domain/add-token-to-user");
const check_password_1 = require("../../../../auth/token/check-password");
const error_validation_1 = require("../../../../utilities/errors/error-validation");
const authUser = (pool) => (data) => __awaiter(void 0, void 0, void 0, function* () {
    const queryData = (0, postgresql_1.query)(pool);
    const executeQuery = (0, postgresql_1.execute)(pool);
    const callProcQuery = `
    CALL sp_sign_in_user($1, $2, $3, $4);
  `;
    const result = yield queryData(callProcQuery, [
        data.email,
        null,
        null,
        null,
    ]);
    const stateCode = result[0].o_state_code;
    const message = result[0].o_response;
    const userId = result[0].o_user_id;
    if (stateCode === 1) {
        (0, error_validation_1.validationErrorResponse)(message);
    }
    if (stateCode === 0) {
        const [result] = yield executeQuery(`
          SELECT
            u.user_id AS "userId",
            u.user_name AS "userName",
            u.user_email AS "userEmail",
            u.confirm_email AS "confirmEmail",
            u.user_password AS "userPassword"
          FROM users u
          WHERE u.user_id = $1
        `, [userId]);
        const password = result.userPassword;
        const id = result.userId;
        const passwordAndToken = yield (0, check_password_1.checkPassword)(data, password, id);
        const token = passwordAndToken;
        const arrayMap = [result];
        const mergedResult = yield (0, add_token_to_user_1.addTokenToUser)(arrayMap, token);
        const dataUser = { dataUser: mergedResult };
        return dataUser;
    }
});
exports.authUser = authUser;
