import { Cart } from "@/types/cart";
import { Item } from "@/types/item";
import { createContext } from "react";

type CartContextType = {
    open: boolean;
    loading: boolean;
    cart: Cart | null;
    onClose: (close: boolean) => void;
    // onChangeCart: (cart?: Cart) => void;
    onAddToCart: (item: Item) => void;
    onRemoveFromCart: (item: Item) => void;
    onDeleteCart: () => void;
}

export const SlidingCartContext = createContext<CartContextType>({
    open: false,
    loading: false,
    cart: null,
    onClose: (close: boolean) => {},
    onAddToCart: (item: Item) => {},
    onRemoveFromCart: (item: Item) => {},
    // onChangeCart: (cart?: Cart) => {},
    onDeleteCart: () => {}
});