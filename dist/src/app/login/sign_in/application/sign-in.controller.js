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
exports.signIn = void 0;
const postgresql_1 = require("../../../../data/postgresql");
const response_1 = require("../../../../utilities/response");
const sign_in_postgresql_1 = require("../infrastructure/sign-in.postgresql");
const pool = (0, postgresql_1.createPool)();
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const authUserFunc = yield (0, sign_in_postgresql_1.authUser)(pool);
    const dataUser = yield authUserFunc(data);
    (0, response_1.response)(res, 200, "ok", dataUser);
});
exports.signIn = signIn;
