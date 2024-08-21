import { SlidingCartContext } from "@/context/SlidingCartContext";
import { Cart, CartItem } from "@/types/cart";
import { Item } from "@/types/item";
import { useContext, useEffect, useState } from "react"

const getCart = (items: Cart) => {
    if (!items)
        return;
    const cartIds = Object.keys(items).filter((id: string) => items[id].quantity > 0);
    let cart: Cart = {};
    cartIds.forEach((id: string) => (cart[id] = items[id]));
    return cart;
}

const loadCart = () => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken)
        return;
    const items: Cart = JSON.parse(localStorage.getItem(`items_${authToken}`) ?? JSON.stringify(null));
    return getCart(items);
}

const saveCart = (item: CartItem) => {
    const authToken = localStorage.getItem("authToken");
    const cartKey = `items_${authToken}`;
    if (!authToken)
        return;
    const cart: Cart = JSON.parse(localStorage.getItem(cartKey) ?? JSON.stringify(null));
    const updatedItem: Cart = {};
    updatedItem[item.item._id] = item;
    const updatedCart = {...cart, ...updatedItem};
    localStorage.setItem(`items_${authToken}`, JSON.stringify(updatedCart));
    return getCart(updatedCart);
}

const calTotalAmount = (items?: Cart| null) => {
    let totalAmount = 0;
    if (!items || Object.keys(items).length === 0) 
        return 0;
    Object.keys(items).map(
        (id: string) => {
            totalAmount += items[id].quantity * items[id].item.price;
        }
    );

    // console.log(items, totalAmount);
    return totalAmount;
}

export const useCart = () => {
    // const cartContext = useContext(SlidingCartContext);
    const [items, setItems] = useState<Cart|null>();
    let totalAmount = calTotalAmount(items);

    const addToCart = (item?: CartItem| null) => {
        if (!item || Object.keys(item).length === 0)
            return; 
        item.quantity += 1;
        const updatedCart = saveCart(item);
        setItems(() => ({...updatedCart}));
        // console.log(updatedCart);
        // if (updatedCart)
            // cartContext.onChangeCart(updatedCart);
    }

    const removeFromCart = (item?: CartItem| null) => {
        if (!item || Object.keys(item).length === 0)
            return;
        if(item.quantity > 0)
            item.quantity -= 1;
        const updatedCart = saveCart(item);
        setItems(() => ({...updatedCart}));
        // console.log(updatedCart);
        // if (updatedCart)
        // cartContext.onChangeCart(updatedCart);
    }

    useEffect(() => {
        setItems(() => ({...loadCart()}));
        // cartContext.onChangeCart(loadCart());
        return () => setItems(null);
    }, []);
    
    return {cartItems: {...items}, addToCart, removeFromCart, totalAmount, loadCart, calTotalAmount, itemsCount: items ? Object.keys(items).length : 0};
}