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
const dish_1 = __importDefault(require("../models/dish"));
const router = (0, express_1.Router)();
const mapToObject = (map) => Object.fromEntries(map.entries());
const segmentDishes = (dishes) => {
    const sections = new Map();
    dishes.forEach((dish) => {
        var _a;
        const section = dish.types[0];
        if (!sections.has(section)) {
            sections.set(section, [dish]);
            return;
        }
        (_a = sections.get(section)) === null || _a === void 0 ? void 0 : _a.push(dish);
    });
    return mapToObject(sections);
};
router.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dishes = yield dish_1.default.find().lean();
        const sectionedDishes = segmentDishes(dishes);
        // console.log('[Dishes] ', sectionedDishes);
        res.status(200).json(sectionedDishes);
    }
    catch (err) {
        next(err);
    }
}));
router.get('/:itemId', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const itemId = req.params.itemId;
    if (!itemId) {
        const missingItemIdError = new Error("Missing Item Id");
        res.status(400);
        next(missingItemIdError);
    }
    try {
        const item = yield dish_1.default.findById(itemId).lean();
        res.status(200).json(item);
    }
    catch (err) {
        next(err);
    }
}));
exports.default = router;
