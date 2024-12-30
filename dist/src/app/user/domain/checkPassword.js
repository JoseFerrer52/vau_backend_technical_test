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
exports.checkPassword = checkPassword;
const bcrypt_1 = __importDefault(require("bcrypt"));
const error_validation_1 = require("../../../utilities/errors/error-validation");
function checkPassword(data, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const match = yield new Promise((resolve, reject) => {
            bcrypt_1.default.compare(data.password, password, (err, result) => {
                if (err)
                    reject(err);
                resolve(result);
            });
        });
        if (match) {
            const response = true;
            return response;
        }
        else {
            const errorMessage = "Nombre de usurio o contraseña invalida.";
            (0, error_validation_1.validationErrorResponse)(errorMessage);
            return errorMessage;
        }
    });
}
