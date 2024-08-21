import { Schema, model } from "mongoose";
import { OrderStatus, Item } from "../utils/constants";

export interface OrderType {
    _id: string;
    userId: string;
    items: Item[];
    status: string | OrderStatus.failed | OrderStatus.initiated | OrderStatus.success;
    totalCost: number;
}

const orderSchema = new Schema<OrderType>({
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
},  {
    timestamps: true,
    collection: 'orders'
});

const Order = model('Order', orderSchema);
export default Order;