import { SlidingCartContext } from "@/context/SlidingCartContext";
import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";
import CartItems from "./CartItems";
import CheckoutButton from "./CheckoutButton";

export default function ShoppingCart({amount}: {amount: number}) {
    const context = useContext(SlidingCartContext);

    return (
        // <div className="flex h-full flex-col overflow-y-scroll dark:bg-gray-900 bg-white shadow-xl">
        <>
            <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                <div className="flex items-start justify-between">
                    <Dialog.Title className="text-lg font-medium dark:text-gray-200 text-gray-900">
                        Shopping cart
                    </Dialog.Title>
                    <div className="ml-3 flex h-7 items-center">
                        <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => context.onClose(true)}
                        >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                </div>

                <div className="mt-8">
                    <div className="flow-root">
                        <ul
                            role="list"
                            className="-my-6 divide-y dark:divide-gray-950 divide-gray-200"
                        >
                            <CartItems />
                        </ul>
                    </div>
                </div>
            </div>

            <div className="border-t dark:border-gray-950 border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex justify-between text-base font-medium dark:text-white text-gray-900">
                    <p>Subtotal</p>
                    <p>{`${"\u20B9"} ${amount.toFixed(2)}`}</p>
                </div>
                <CheckoutButton />
                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                        or
                        <button
                            type="button"
                            className="ml-1 font-medium dark:text-white dark:hover:text-gray-200 text-indigo-600 hover:text-indigo-500"
                            onClick={() => context.onClose(true)}
                        >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                        </button>
                    </p>
                </div>
            </div>
            </>
        // </div>
    );
}
