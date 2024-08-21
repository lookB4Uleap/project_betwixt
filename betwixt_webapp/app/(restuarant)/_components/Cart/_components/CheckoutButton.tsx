"use client";

import { getInstance } from "@/app/(restuarant)/_api/order";
import { SlidingCartContext } from "@/context/SlidingCartContext";
import { auth } from "@/firebase";
import { Cart } from "@/types/cart";
import { CircularProgress } from "@mui/material";
import { User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

type Item = {
    itemId: string,
    itemName?: string,
    quantity: number,
    price: number,
    image?: string
}

const getItems = (cart: Cart) => {
    const items: Item[] = [];
    Object.keys(cart).forEach(
        (id: string) => {
            const quantity = cart[id].quantity;
            const price = cart[id].item.price;
            const image = cart[id].item.images[0];
            const itemName = cart[id].item.dishName
            
            if (!quantity || quantity === 0) 
                return;

            items.push({
                itemId: id,
                itemName, 
                quantity,
                price,
                image
            });
        }
    );
    return items;
}

const createOrder = async (user: User, items: Item[]) => {
    const instance = await getInstance(user);
    await instance?.post('/api/orders', {
        items
    }).then(
        res => console.log(res)
    ).catch(
        err => console.error(err)
    )
}

export default function CheckoutButton() {
    const  [user, loading, error] = useAuthState(auth);
    const [checkoutLoading, setCheckoutLoading] = useState(loading);
    const {cart, onDeleteCart, onClose} = useContext(SlidingCartContext);
    const router = useRouter();

    useEffect(() => {
        return () => setCheckoutLoading(false);
    }, [])
    
    useEffect(() => {
        setCheckoutLoading(loading);
    }, [loading])

    const handleSubmit = async () => {
        setCheckoutLoading(true);
        if (!cart || !user)
            return;
        const items = getItems(cart);
        await createOrder(user, items); 
        onClose(true);
        onDeleteCart();
        setCheckoutLoading(false);
        router.push('/success');
    }

    return (
        <div className="mt-6 w-full">
            <button
                // href="#"
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                onClick={handleSubmit}
            >
                {checkoutLoading ? <CircularProgress color="inherit" size={24} /> : "Checkout"}
            </button>
        </div>
    );
}
