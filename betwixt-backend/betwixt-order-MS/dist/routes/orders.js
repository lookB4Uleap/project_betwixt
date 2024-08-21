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
const express_1 = require("express");
const order_1 = __importDefault(require("../models/order"));
const authorize_1 = require("../middlewares/authorize");
const orderRouter = (0, express_1.Router)();
const saveOrder = (userId, items) => __awaiter(void 0, void 0, void 0, function* () {
    const totalCost = items.reduce((sum, cur) => sum + cur.quantity * cur.price, 0);
    const newOrder = new order_1.default({
        userId,
        items,
        totalCost,
        status: "paid"
    });
    yield newOrder.save();
});
orderRouter.post('/', authorize_1.authorize, authorize_1.verify, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    // const totalCost = req.body.totalCost;
    const items = req.body.items;
    if (!userId || !items || items.length === 0) {
        const inputFieldsMissingError = new Error('Input Fields Missing');
        res.status(400); // Set the status code
        return next(inputFieldsMissingError);
    }
    try {
        yield saveOrder(userId, items);
        res.status(201).json({ orderSuccess: true });
    }
    catch (err) {
        next(err);
    }
}));
orderRouter.get('/', authorize_1.authorize, authorize_1.verify, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    try {
        const orders = yield order_1.default.find({ userId }).lean();
        res.status(200).json(orders);
    }
    catch (err) {
        next(err);
    }
}));
orderRouter.get('/:orderId', authorize_1.authorize, authorize_1.verify, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const orderId = req.params.orderId;
    if (!userId || !orderId) {
        const missingOrderIdError = new Error('Missing Order ID');
        console.log('[Order] ', { userId, orderId });
        res.status(400); // Set the status code
        return next(missingOrderIdError);
    }
    try {
        const order = yield order_1.default.findOne({
            $and: [
                { _id: orderId },
                { userId: userId }
            ]
        }).lean();
        res.status(200).json(order);
    }
    catch (err) {
        next(err);
    }
}));
exports.default = orderRouter;
