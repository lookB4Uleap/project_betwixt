export type Item = {
    itemId: string;
    itemName?: string;
    quantity: number;
    price: number;
    image?: string;
}

export enum OrderStatus {
    success = "success",
    failed = "failed",
    initiated = "initiated"
}
