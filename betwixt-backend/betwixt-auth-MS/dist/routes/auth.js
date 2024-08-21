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
require("dotenv/config");
const express_1 = require("express");
const user_1 = __importDefault(require("../models/user"));
const jwt = require("jsonwebtoken");
const router = (0, express_1.Router)();
const generateToken = (userId) => {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    const token = jwt.sign({
        time: Date(),
        userId
    }, jwtSecretKey);
    return token;
};
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    if (!(user === null || user === void 0 ? void 0 : user.email) || !(user === null || user === void 0 ? void 0 : user.name) || !(user === null || user === void 0 ? void 0 : user.uid)) {
        // console.log("[Create Usser]", user);
        res.status(422).json({ message: "Missing Parameters" });
        return;
    }
    try {
        const newUser = new user_1.default(user);
        const createdUser = yield newUser.save();
        res.status(200).json({
            user: {
                name: createdUser.name,
                email: createdUser.email,
                phone: createdUser.phone,
                photoUrl: createdUser.photoUrl,
                address: createdUser.address,
                city: createdUser.city,
                pincode: createdUser.pincode,
                authToken: generateToken(createdUser._id.toString())
            }
        });
    }
    catch (error) {
        console.log('[Error] : ', error.message);
        res.status(500).json({ message: "Something went wrong" });
    }
}));
router.post('/auth', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { email, uid } = req.body;
    if (!email || !uid) {
        res.status(401).json({ message: "Email and UID required" });
        return;
    }
    try {
        const user = yield user_1.default.find({ email, uid });
        if (user.length != 1) {
            res.status(401).json({ message: "Access Denied" });
            return;
        }
        res.status(200).json({
            user: {
                name: user[0].name,
                email: user[0].email,
                phone: user[0].phone,
                photoUrl: (_a = user[0]) === null || _a === void 0 ? void 0 : _a.photoUrl,
                address: user[0].address,
                city: user[0].city,
                pincode: user[0].pincode,
                authToken: generateToken(user[0]._id.toString())
            }
        });
    }
    catch (error) {
        console.log('[Error] : ', error.message);
        res.status(500).json({ message: "Something went wrong" });
    }
}));
router.post('/auth/provider', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    if (!(user === null || user === void 0 ? void 0 : user.email) || !(user === null || user === void 0 ? void 0 : user.name) || !(user === null || user === void 0 ? void 0 : user.uid)) {
        // console.log("[Provider signin]", user);
        res.status(422).json({ message: "Missing Parameters" });
        return;
    }
    try {
        const currentUser = yield user_1.default.findOneAndUpdate({
            email: user.email,
            uid: user.uid
        }, user, {
            new: true,
            upsert: true
        });
        res.status(200).json({
            user: {
                name: currentUser.name,
                email: currentUser.email,
                phone: currentUser.phone,
                photoUrl: currentUser.photoUrl,
                address: currentUser.address,
                city: currentUser.city,
                pincode: currentUser.pincode,
                authToken: generateToken(currentUser._id.toString())
            }
        });
    }
    catch (error) {
        console.log('[Error] : ', error.message);
        res.status(500).json({ message: "Something went wrong" });
    }
}));
exports.default = router;
