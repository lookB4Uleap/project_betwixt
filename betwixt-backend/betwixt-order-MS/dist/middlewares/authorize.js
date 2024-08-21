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
exports.verify = exports.authorize = void 0;
require("dotenv/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = require("firebase-admin/auth");
const selfAuthorize = (authToken) => {
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    if (!jwtSecretKey) {
        console.log('[Auth] Secret missing!');
        new Error('Authorization Failed');
        return;
    }
    // Synchronous code - error will be handled automatically by the custom error handler
    const { userId } = jsonwebtoken_1.default.verify(authToken, jwtSecretKey);
    // console.log('[Auth] ', {userId});
    return userId;
};
const firebaseAuthorize = (authToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = yield (0, auth_1.getAuth)().verifyIdToken(authToken);
        return token.uid;
    }
    catch (err) {
        console.log('[Firebase] Auth Failed! Trying with self authorization.');
        return selfAuthorize(authToken);
    }
});
const authorize = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.headers.authorization ||
        !req.headers.authorization.split(" ")[1]) {
        console.log('[OrderMS] Authorization Failed! Envs missing. ', { authorization: req.headers.authorization });
        // res.status(403).json({ error: "Authorization Failed!" });
        const authorizationFailedError = new Error('Authorization Failed');
        res.status(401);
        return next(authorizationFailedError);
    }
    const authToken = req.headers.authorization.split(" ")[1];
    const uid = yield firebaseAuthorize(authToken);
    req.userId = uid;
    next();
});
exports.authorize = authorize;
const verify = (req, res, next) => {
    const uid = req.userId;
    // console.log('[Verify] User', uid);
    if (!uid) {
        console.log('[Verify] UID missing!');
        const authorizationFailedError = new Error('Authorization Failed');
        res.status(401);
        return next(authorizationFailedError);
    }
    next();
};
exports.verify = verify;
