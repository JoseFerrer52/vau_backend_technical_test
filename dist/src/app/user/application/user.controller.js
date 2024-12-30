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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropUser = exports.putUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const postgresql_1 = require("../../../data/postgresql");
const response_1 = require("../../../utilities/response");
const user_postgresql_1 = require("../infrastructure/user.postgresql");
const delete_user_postgresql_1 = require("../infrastructure/delete-user.postgresql");
const pool = (0, postgresql_1.createPool)();
const putUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    if (!data.password) {
        const UpadteUserFunc = yield (0, user_postgresql_1.UpadteUser)(pool);
        const user = yield UpadteUserFunc(data, null);
        (0, response_1.response)(res, 200, user, {});
    }
    else {
        const encryp = yield bcrypt_1.default.hash(data.password, 5);
        const UpadteUserFunc = yield (0, user_postgresql_1.UpadteUser)(pool);
        const user = yield UpadteUserFunc(data, encryp);
        (0, response_1.response)(res, 200, user, {});
    }
});
exports.putUser = putUser;
const DropUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const deleteUserFunc = yield (0, delete_user_postgresql_1.deleteUser)(pool);
    const result = yield deleteUserFunc(data);
    (0, response_1.response)(res, 200, result, {});
});
exports.DropUser = DropUser;
