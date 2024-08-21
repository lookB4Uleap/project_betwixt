"use client";
import { Fragment, useContext, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { SlidingCartContext } from "@/context/SlidingCartContext";
import { useCart } from "@/hooks/useCart";
import CartItems from "./_components/CartItems";
import { Cart } from "@/types/cart";
import ShoppingCart from "./_components/Cart";
import EmptyCart from "./_components/EmptyCart";

const calTotalAmount = (items?: Cart | null) => {
    let totalAmount = 0;
    if (!items || Object.keys(items).length === 0) return 0;
    Object.keys(items).map((id: string) => {
        totalAmount += items[id].quantity * items[id].item.price;
    });
    return totalAmount;
};

export default function SlidingCart() {
    const context = useContext(SlidingCartContext);
    const amount = calTotalAmount(context.cart);

    return (
        <Transition.Root show={context.open} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-10"
                onClose={() => context.onClose(true)}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full sm:pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                    <div className="flex h-full flex-col overflow-y-scroll dark:bg-gray-900 bg-white shadow-xl">
                                        {amount === 0 ? (
                                            <EmptyCart />
                                        ) : (
                                            <ShoppingCart amount={amount} />
                                        )}
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
