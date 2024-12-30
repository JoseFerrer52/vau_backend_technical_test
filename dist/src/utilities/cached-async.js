"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cachedAsync = void 0;
const cachedAsync = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch((error) => next(error));
    };
};
exports.cachedAsync = cachedAsync;
