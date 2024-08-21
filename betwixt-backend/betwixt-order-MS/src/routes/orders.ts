import { NextFunction, Response, Router } from "express";
import { BetwixtRequest } from "../utils/betwixt-request";
import { createRazorpayOrder } from "../utils/Razorpay/create-order";
import Order, { OrderType } from "../models/order";
import { Item } from "../utils/constants";
import { authorize, verify } from "../middlewares/authorize";

const orderRouter = Router();

const saveOrder = async (userId: string, items: Item[]) => {
    const totalCost = items.reduce(
        (sum: number, cur: Item) => sum + cur.quantity * cur.price, 0
    );

    const newOrder = new Order({
        userId,
        items,
        totalCost,
        status: "paid"
    });

    await newOrder.save();
}

orderRouter.post('/', authorize, verify, async (req: BetwixtRequest, res: Response, next: NextFunction) => {
    const userId = req.userId;
    // const totalCost = req.body.totalCost;
    const items: Item[] = req.body.items;

    if (!userId || !items || items.length === 0) {
        const inputFieldsMissingError = new Error('Input Fields Missing');
        res.status(400); // Set the status code
        return next(inputFieldsMissingError);
    }

    try {
        await saveOrder(userId, items);
        res.status(201).json({ orderSuccess: true });
    }
    catch (err: any) {
        next(err);
    }
});

orderRouter.get('/', authorize, verify, async (req: BetwixtRequest, res: Response, next: NextFunction) => {
    const userId = req.userId;

    try {
        const orders = await Order.find({ userId }).lean();
        res.status(200).json(orders);
    } catch (err: any) {
        next(err);
    }
});

orderRouter.get('/:orderId', authorize, verify, async (req: BetwixtRequest, res: Response, next: NextFunction) => {
    const userId = req.userId;
    const orderId = req.params.orderId;

    if (!userId || !orderId) {
        const missingOrderIdError = new Error('Missing Order ID');
        console.log('[Order] ', { userId, orderId });
        res.status(400); // Set the status code
        return next(missingOrderIdError);
    }

    try {
        const order = await Order.findOne({
            $and: [
                { _id: orderId },
                { userId: userId }
            ]
        }).lean();
        res.status(200).json(order);
    } catch (err: any) {
        next(err);
    }
});

export default orderRouter;