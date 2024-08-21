import { Item } from "./item"

export type CartItem = {
    item: Item,
    quantity: number
}

export type Cart = {
    [key: string]: CartItem
}