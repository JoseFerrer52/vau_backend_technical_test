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
exports.execute = exports.query = exports.createPool = void 0;
const pg_1 = require("pg");
const config_1 = require("../config/config");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const createPool = () => {
    return new pg_1.Pool({
        host: config_1.CONFIG.app.database.host,
        user: config_1.CONFIG.app.database.user,
        password: config_1.CONFIG.app.database.password,
        port: config_1.CONFIG.app.database.port,
        database: config_1.CONFIG.app.database.database,
        ssl: {
            rejectUnauthorized: false,
        },
    });
};
exports.createPool = createPool;
const query = (pool) => (sql, params) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield pool.query(sql, params);
        return res.rows;
    }
    catch (err) {
        throw new Error(`Error en la consulta: ${err.message}`);
    }
});
exports.query = query;
const execute = (pool) => (sql, params) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield pool.query(sql, params);
        return res.rows;
    }
    catch (err) {
        throw new Error(`Error en la consulta: ${err.message}`);
    }
});
exports.execute = execute;
