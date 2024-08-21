"use client";

import Lottie from "react-lottie";
import * as SuccessAnimation from "@/public/animations/success-blue.json";
import { Router } from "next/router";
import { useRouter } from "next/navigation";

export default function Success() {
    const router = useRouter();

    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: SuccessAnimation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    return (
        <div className="flex flex-1 flex-col items-center justify-center">
            <Lottie
                options={defaultOptions}
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "30vw",
                    height: "30vw",
                    maxWidth: 600,
                    maxHeight: 400,
                    minWidth: 300,
                    minHeight: 300,
                }}
            />
            <p className="flex justify-center items-center my-10 text-center text-xl sm:text-sm font-medium text-gray-800 dark:text-gray-100 ">
                Congatulations! Your order is placed.
            </p>
            <button 
                className="items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-lg font-medium text-white shadow-sm hover:bg-indigo-700"
                onClick={() => router.replace('/menu')}
            >
                Back
            </button>
        </div>
    );
}
