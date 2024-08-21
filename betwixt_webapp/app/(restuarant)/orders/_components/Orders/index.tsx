"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { Order } from "../../_types";
import { OrderCard } from "./OrderCard";
import { auth } from "@/firebase";
import { use, useEffect, useState } from "react";
import { User } from "firebase/auth";
import { getInstance } from "@/app/(restuarant)/_api/order";

const ORDER_MS = process.env.NEXT_PUBLIC_ORDER_URL;

const getOrders = async (user?: User|null) => {
    if (!user)
        return;
    const instance = await getInstance(user);
    const res = await instance?.get(`${ORDER_MS}/api/orders`);
    return res?.data;
}

export const Orders = () => {
    const [user, loading, error] = useAuthState(auth);
    const [fetching, setFetching] = useState(false);
    const [orders, setOrders] = useState<Order[] | null | undefined>();

    useEffect(() => {
        (
            async () => {
                setFetching(true);
                const orders = await getOrders(user);
                if (orders)
                    setOrders(() => [...orders]);
                setFetching(false);
            }
        )();

        return () => setOrders(null);
    }, [user]);

    if (loading || fetching)
        return <div className="text-gray-700 dark:text-gray-100">Loading...</div>;

    if (!user)
        return <div className="text-gray-700 dark:text-gray-100">Login to see orders</div>;
        
    if (orders)
    return (
        orders.map((order: Order) => <OrderCard key={order?._id} order={order} />)
    );

    return <div className="text-gray-700 dark:text-gray-100">No Orders Yet!</div>;
}