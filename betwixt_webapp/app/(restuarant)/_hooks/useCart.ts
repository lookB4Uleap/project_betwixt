import { getCart, updateCart as _updateCart, deleteCart as _deleteCart } from "@/app/_actions/cart.actions";
import { Cart } from "@/types/cart";
import { useEffect, useLayoutEffect, useState } from "react";

export const useCart = () => {
    const [cart, setCart] = useState<Cart | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (
            async () => {
                setLoading(true);
                const cart = await getCart();
                if (cart)
                    setCart(() => ({...cart}));
                setLoading(false);
            }
        )();

        return () => setCart(null);
    }, []);

    useEffect(() => {
        return () => setLoading(false);
    }, [])

    const updateCart = async (cart: Cart|null) : Promise<Cart|null>  => {
        if (!cart)
            return null;

        setCart(() => ({...cart}));
        await _updateCart(cart);
        return cart;
    }

    const deleteCart = async () => {
        setCart(null);
        await _deleteCart();
    }

    return {cart, updateCart, deleteCart, loading};
}