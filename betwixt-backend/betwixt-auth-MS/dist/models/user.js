"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_2 = require("mongoose");
let userSchema = new mongoose_2.Schema({
    name: { type: String, required: true },
    uid: { type: String, required: true },
    email: { type: String, required: true },
    password: String,
    address: String,
    city: String,
    pincode: String,
    phone: String,
    photoUrl: String
}, {
    timestamps: true,
    collection: 'users'
});
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
