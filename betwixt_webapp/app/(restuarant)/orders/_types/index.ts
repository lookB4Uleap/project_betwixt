export type Item = {
    _id?: string;
    itemId: string;
    itemName: string;
    quantity: number;
    price: number;
    image: string;
}

export type Order = {
    _id?: string;
    userId: string;
    status: "paid" | "failed" | "retry";
    totalCost: number;
    items: Item[];
    [key: string]: any;
}