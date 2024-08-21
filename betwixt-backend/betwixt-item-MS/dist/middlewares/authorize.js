"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authorize = (req, res, next) => {
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    if (!req.headers.authorization ||
        !req.headers.authorization.split(" ")[1] ||
        !jwtSecretKey) {
        res.status(403).json({ error: "Authorization Failed!" });
        return;
    }
    const authToken = req.headers.authorization.split(" ")[1];
    try {
        const { userId } = jsonwebtoken_1.default.verify(authToken, jwtSecretKey);
        req.userId = userId;
        next();
    }
    catch (err) {
        res.status(403).json({ error: "Authorization Failed!" });
        return;
    }
};
exports.default = authorize;
