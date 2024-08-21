"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    userId: {
        type: String,
        required: true
    },
    items: [
        {
            itemId: String,
            itemName: String,
            quantity: Number,
            price: Number,
            image: String
        }
    ],
    status: {
        type: String,
        required: true
    },
    totalCost: Number
}, {
    timestamps: true,
    collection: 'orders'
});
const Order = (0, mongoose_1.model)('Order', orderSchema);
exports.default = Order;
