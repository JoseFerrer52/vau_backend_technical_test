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
exports.selectAllUser = void 0;
const postgresql_1 = require("../../../data/postgresql");
const clean_data_user_1 = require("../domain/clean-data-user");
const error_forbidden_1 = require("../../../utilities/errors/error-forbidden");
const selectAllUser = (pool) => __awaiter(void 0, void 0, void 0, function* () {
    return (data) => __awaiter(void 0, void 0, void 0, function* () {
        const executeQuery = (0, postgresql_1.execute)(pool);
        const queryData = (0, postgresql_1.query)(pool);
        const result = yield queryData(`
      SELECT user_id FROM users WHERE user_id = $1;
    `, [data.userId]);
        const userId = result;
        console.log("this", result);
        if (userId === undefined) {
            (0, error_forbidden_1.forbiddenErrorResponse)("No tienes permiso para realizar esta acción");
        }
        else {
            const rows = yield executeQuery(` 
      SELECT * FROM users`);
            const listUser = yield (0, clean_data_user_1.cleanDataUser)(rows);
            console.log("this", listUser);
            const users = { users: listUser };
            return users;
        }
    });
});
exports.selectAllUser = selectAllUser;
