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
exports.signUp = void 0;
const postgresql_1 = require("../../../../data/postgresql");
const bcrypt_1 = __importDefault(require("bcrypt"));
const response_1 = require("../../../../utilities/response");
const sign_up_postgresql_1 = require("../infrastructure/sign-up.postgresql");
const pool = (0, postgresql_1.createPool)();
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const data = req.body;
    const encryp = yield bcrypt_1.default.hash(data.password, 5);
    const resgiterUserFunc = yield (0, sign_up_postgresql_1.registerUser)(pool);
    const signUp = yield resgiterUserFunc(data, encryp);
    (0, response_1.response)(res, 200, signUp, {});
});
exports.signUp = signUp;
