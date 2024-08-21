"use client";

import React from "react";
import CartItem from "./CartItem";

export const InternalScrollContainer = () => {
    const N = 50;
    return (
        <div className="flex flex-1 flex-col items-center justify-center p-3 ">
            <div className="overflow-y-auto w-full h-[70vh]">
            {
                Array.from(Array(N).keys()).map((val: number) => {
                return <CartItem key={val} /> }
                )
            }
            </div>
        </div>
    );
};
