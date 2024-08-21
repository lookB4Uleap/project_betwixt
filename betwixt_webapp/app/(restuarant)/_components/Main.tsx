"use client";

import { AuthContext } from "@/context/AuthContext";
import { SlidingCartContext } from "@/context/SlidingCartContext";
import { Cart } from "@/types/cart";
import React, { ReactNode, useEffect, useState } from "react";
import { getAuthToken } from "../../_actions/user.actions";
import { betwixtSignOut } from "@/utils/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth as firebaseAuth } from "@/firebase";
import ResponsiveAppBar from "./ResponsiveAppBar";
import SlidingCart from "./Cart";
import { useCart } from "../_hooks/useCart";
import { Item } from "@/types/item";

const Main = ({ children }: { children: ReactNode }) => {
    const [open, setOpen] = useState<boolean>(false);
    // const [cart, setCart] = useState<Cart | null>(null);
    const { cart, updateCart, deleteCart, loading } = useCart();
    const [auth, setAuth] = useState<string | null>(null);

    // useEffect(() => {
    //     console.log('[Cart]', cart);
    // }, [cart]);

    const handleAddToCart = async (item: Item) => {
        console.log("[Item] Add to cart");

        // handle adding to empty cart
        if (!cart) {
            await updateCart({
                [item._id]: {
                    item,
                    quantity: 1,
                },
            });
            return;
        }

        // add to cart
        await updateCart({
            ...cart,
            [item._id]: {
                item,
                quantity: (cart ? cart[item._id]?.quantity ?? 0 : 0) + 1,
            },
        });
    };

    const handleRemoveFromCart = async (item: Item) => {
        console.log("[Item] Remove from cart");
        // handle removing from empty cart
        if (!cart) return;

        // handle removing from cart when quantity is zero
        if (!cart[item._id]?.quantity || cart[item._id]?.quantity == 0) return;

        // remove from cart
        await updateCart({
            ...cart,
            [item._id]: {
                item,
                quantity: cart[item._id].quantity - 1,
            },
        });
    };

    // useEffect(() => {
    //     (
    //         async () => {
    //             if(loading)
    //                 return;
    //             const cookie = await getAuthToken();
    //             if (!cookie || !user)
    //                 betwixtSignOut();
    //             else
    //                 setAuth(cookie.value);
    //         }
    //     )();
    // }, []);

    return (
        <SlidingCartContext.Provider
            value={{
                open,
                loading,
                cart,
                onClose: (close: boolean) => setOpen(!close),
                onAddToCart: handleAddToCart,
                onRemoveFromCart: handleRemoveFromCart,
                onDeleteCart: deleteCart,
            }}
        >
            <ResponsiveAppBar />
            <SlidingCart />
            {children}
        </SlidingCartContext.Provider>
    );
};

export default Main;
