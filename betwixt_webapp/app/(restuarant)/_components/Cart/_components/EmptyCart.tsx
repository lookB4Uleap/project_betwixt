"use client";
import { SlidingCartContext } from "@/context/SlidingCartContext";
import { useContext, useEffect, useRef } from "react";
import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import * as EmptyCartAnimation from "@/public/animations/empty-cart.json";
import Lottie from 'react-lottie';

export default function EmptyCart() {
    const context = useContext(SlidingCartContext);
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: EmptyCartAnimation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    return (
        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 justify-center">
            <div className="flex items-start justify-between">
                <Dialog.Title className="text-lg font-medium dark:text-gray-200 text-gray-900">
                    Empty cart
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

            <div className="flex-1 mt-8">
                <div className="flow-root">
                    <Lottie
                        options={defaultOptions}
                        height={400}
                        width={400}
                    />
                </div>
            </div>
        </div>
    );
}
