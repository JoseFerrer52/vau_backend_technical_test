"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.signUpvalidate = signUpvalidate;
exports.createSignUpValidation = createSignUpValidation;
const yup = __importStar(require("yup"));
const class_validation_error_1 = require("../../utilities/class_error/class-validation-error");
function signUpvalidate(createFormValidation) {
    return (req, _res, next) => __awaiter(this, void 0, void 0, function* () {
        console.log(req.body);
        try {
            const validatedData = yield createFormValidation(req.body);
            req.body = validatedData;
            next();
        }
        catch (error) {
            next(new class_validation_error_1.ValidationError(error));
        }
    });
}
function createSignUpValidation(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const schema = yup.object().shape({
            userName: yup
                .string()
                .max(20, "El Nombre de usuario no puede contener más de 20 caracteres")
                .matches(/^[a-zA-Z0-9_]+$/, "Nombre de usario incorrecto")
                .required("El campo Nombre de usuario no puede estar vacio"),
            password: yup
                .string()
                .min(8, "La contraseña debe contener minimo 8-20 caracteres")
                .max(20, "La contraseña debe contener minimo 8-20 caracteres")
                .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,20}$/, "La contraseña debe contener al menos una letra mayúscula, una minúscula, un número y un carácter especial.")
                .required("El campo Contraseña no puede estar vacio"),
            email: yup.string().email("Correo electronico invalido").required(),
        });
        const validatedData = yield schema.validate(data);
        return validatedData;
    });
}
