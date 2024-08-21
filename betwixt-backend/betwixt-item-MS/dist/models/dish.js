"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const dishSchema = new mongoose_1.Schema({
    dish_name: { type: String, required: true },
    price: { type: Number, required: true },
    description: String,
    dish_details: {
        ingredients: [String]
    },
    highlight: [String],
    images: [String],
    types: [String]
}, {
    timestamps: true,
    collection: 'Dishes'
});
const Dish = (0, mongoose_1.model)('Dish', dishSchema);
exports.default = Dish;
