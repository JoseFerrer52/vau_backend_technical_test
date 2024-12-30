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
exports.getAllUser = void 0;
const response_1 = require("../../../utilities/response");
const postgresql_1 = require("../../../data/postgresql");
const select_all_user_postgresql_1 = require("../infrastructure/select-all-user.postgresql");
const pool = (0, postgresql_1.createPool)();
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    console.log(data);
    const selectAllUserFunc = yield (0, select_all_user_postgresql_1.selectAllUser)(pool);
    const allUser = yield selectAllUserFunc(data);
    (0, response_1.response)(res, 200, "ok", allUser);
});
exports.getAllUser = getAllUser;
