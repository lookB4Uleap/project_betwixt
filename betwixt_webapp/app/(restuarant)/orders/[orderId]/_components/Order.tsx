"use client";

import { User } from "firebase/auth";
import { Item, Order as OrderType } from "../../_types";
import { OrderDetails } from "./OrderDetails";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase";
import { getInstance } from "@/app/(restuarant)/_api/order";

const formatDate = (date: Date) => {
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const format = `${day}/${month}/${year}`;
    return format;
};

const ORDER_MS = process.env.NEXT_PUBLIC_ORDER_URL;

const getOrder = async (orderId: string, user?: User | null) => {
    if (!user) return;
    const instance = await getInstance(user);
    const res = await instance?.get(`${ORDER_MS}/api/orders/${orderId}`);
    return res?.data;
};

export default function Order({ orderId }: { orderId: string }) {
    const [user, loading, error] = useAuthState(auth);
    const [order, setOrder] = useState<OrderType | null | undefined>();
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        (async () => {
            setFetching(true);
            const order = await getOrder(orderId, user);
            if (order) setOrder(() => ({ ...order }));
            setFetching(false);
        })();
    }, [user]);

    if (loading || fetching) return <div className="text-gray-700 dark:text-gray-100">Loading...</div>;

    if (!user) return <div className="text-gray-700 dark:text-gray-100">Login to see orders</div>

    if (order)
        return (
            <>
                <div className="flex flex-col justify-center items-start self-start justify-self-start">
                    <div
                        className="
                            flex flex-1 flex-wrap
                            justify-between items-start 
                            w-full
                            text-base
                            md:text-3xl font-semibold 
                            py-10 px-10
                            text-gray-950 dark:text-gray-100
                        "
                    >
                        <div className="mr-10">Order</div>
                        <div>#{order._id}</div>
                    </div>
                    <div
                        className="
                            flex flex-1 flex-wrap
                            justify-start items-center 
                            text-sm
                            md:text-base
                            w-full
                            pb-5
                            text-gray-900 dark:text-gray-100
                        "
                    >
                        <div className="flex flex-row justify-start mr-3">
                            <div className="mx-10">Total Amount</div>
                            <div>
                                {"\u20B9"} {order.totalCost}
                            </div>
                        </div>
                        <div className="flex px-10 flex-row md:border-l-2 md:border-l-black md:dark:border-l-gray-100">
                            <div>{formatDate(new Date(order.createdAt))}</div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-1 flex-col my-10 self-start justify-start items-start">
                    {order.items.map((item: Item) => (
                        <OrderDetails key={item._id} item={item} />
                    ))}
                </div>
            </>
        );

    return <></>;
}
