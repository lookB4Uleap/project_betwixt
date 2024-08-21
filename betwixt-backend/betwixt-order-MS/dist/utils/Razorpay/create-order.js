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
exports.createRazorpayOrder = void 0;
const razorpay_1 = __importDefault(require("razorpay"));
const createRazorpayOrder = (totalCostInPaisa) => __awaiter(void 0, void 0, void 0, function* () {
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_ID) {
        console.log('[Order-MS] Razorpay Keys Missing!');
        throw "Unable to process order";
    }
    const instance = new razorpay_1.default({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_ID });
    try {
        const order = yield instance.orders.create({
            amount: totalCostInPaisa,
            currency: "INR",
        });
        return order;
    }
    catch (err) {
        console.log('[Order-MS] Error while creating razorpay order', err);
        throw err;
    }
});
exports.createRazorpayOrder = createRazorpayOrder;
