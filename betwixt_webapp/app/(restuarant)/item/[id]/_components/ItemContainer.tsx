"use client";

import React, { useContext, useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { Button, ButtonGroup, CircularProgress } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { SlidingCartContext } from "@/context/SlidingCartContext";
import { Item } from "@/types/item";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase";

function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
}

const ItemContainer = ({ item } : { item: Item }) => {
    const reviews = { href: "#", average: 4, totalCount: 117 };
    const cartContext = useContext(SlidingCartContext);
    const [user] = useAuthState(auth);

    if (cartContext.loading)
        return (
        <div className="flex flex-1 justify-center items-center flex-col">
            <CircularProgress color="inherit" className="text-blue-700 dark:text-gray-100" size={30} />
            <div className="my-10 text-center text-xl sm:text-sm font-medium dark:text-gray-100 text-gray-800">Loading</div>
        </div>
        );

    return (
        <>
            {/* // Image Container */}
            <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
                <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                    <Image
                        width={400}
                        height={400}
                        // src="https://picsum.photos/seed/picsum/400/400"
                        src={item.images[0] ?? ""}
                        alt="item image"
                        className="h-full w-full object-cover object-center"
                    />
                </div>
                <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                    <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                        <Image
                            width={400}
                            height={400}
                            // src="https://picsum.photos/seed/picsum/400/400"
                            src={item.images[0] ?? ""}
                            alt="item image"
                            className="h-full w-full object-cover object-center"
                        />
                    </div>
                    <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                        <Image
                            width={400}
                            height={400}
                            // src="https://picsum.photos/seed/picsum/400/400"
                            src={item.images[0] ?? ""}
                            alt="item image"
                            className="h-full w-full object-cover object-center"
                        />
                    </div>
                </div>
                <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                    <Image
                        width={400}
                        height={400}
                        // src="https://picsum.photos/seed/picsum/400/400"
                        src={item.images[0] ?? ""}
                        alt="item image"
                        className="h-full w-full object-cover object-center"
                    />
                </div>
            </div>

            {/* // Product Info */}
            <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                <div
                    className="lg:col-span-2 
                    lg:border-r lg:border-gray-500 dark:lg:border-gray-200 
                    lg:pr-8"
                >
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-3xl">
                        {item.dish_name}
                    </h1>
                </div>

                {/* Options */}
                <div className="mt-4 lg:row-span-3 lg:mt-0">
                    <h2 className="sr-only">Product information</h2>
                    <p className="text-3xl tracking-tight text-gray-900 dark:text-gray-50">
                        {`${"\u20B9"} ${item.price}`}
                    </p>

                    {/* Reviews */}
                    <div className="mt-6">
                        <h3 className="sr-only">Reviews</h3>
                        <div className="flex items-center">
                            <div className="flex items-center">
                                {[0, 1, 2, 3, 4].map((rating) => (
                                    <StarIcon
                                        key={rating}
                                        className={classNames(
                                            reviews.average > rating
                                                ? "text-gray-900 dark:text-lime-300"
                                                : "text-gray-200 dark:text-gray-500",
                                            "h-5 w-5 flex-shrink-0"
                                        )}
                                        aria-hidden="true"
                                    />
                                ))}
                            </div>
                            <p className="sr-only">
                                {/* {reviews.average}  */}4 out of 5 stars
                            </p>
                            <a
                                // href={reviews.href}
                                className="ml-3 text-sm font-medium
                                 text-indigo-600 dark:text-gray-100 
                                 dark:hover:text-gray-300 hover:text-indigo-500"
                            >
                                {/* {reviews.totalCount}  */}
                                100 reviews
                            </a>
                        </div>
                    </div>

                    <form className="mt-10 lg:justify-end">

                        {/* Quantity */}
                        <div className="flex flex-row items-end justify-between pt-4">
                            <div className="flex flex-1 items-center">
                                <div className="text-lg text-gray-700 dark:text-gray-100">
                                    Quantity
                                </div>
                                <div className="ml-3 font-light text-gray-700 dark:text-gray-100">
                                    {cartContext.cart ? cartContext.cart[item._id]?.quantity ?? 0 : 0}
                                </div>
                                <div className="sm:hidden h-8 flex-1 justify-self-center"></div>
                                <div className="sm:hidden h-8 flex-1 border-l border-solid ml-3 border-gray-800 dark:border-gray-200 justify-self-center"></div>
                            </div>
                            <ButtonGroup
                                variant="outlined"
                                aria-label="outlined primary button group"
                            >
                                <Button
                                    className="
                                        border-solid 
                                        bg-indigo-700 dark:bg-transparent 
                                        hover:bg-indigo-800 dark:hover:bg-gray-800 dark:hover:opacity-90
                                        dark:border-gray-400
                                    "
                                    disabled={!!!user}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        cartContext.onAddToCart(item)
                                    }}
                                >
                                    <AddIcon
                                        sx={{ fontSize: 15 }}
                                        className="text-gray-200"
                                    />
                                </Button>
                                <Button
                                    className="
                                        border-solid 
                                        bg-indigo-700 dark:bg-transparent 
                                        hover:bg-indigo-800 dark:hover:bg-gray-800 dark:hover:opacity-90
                                        dark:border-gray-400
                                    "
                                    disabled={!!!user}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        cartContext.onRemoveFromCart(item);
                                    }}
                                >
                                    <RemoveIcon
                                        sx={{ fontSize: 15 }}
                                        className="text-gray-200"
                                    />
                                </Button>
                                {/* <div>2</div>s */}
                            </ButtonGroup>
                        </div>
                    </form>
                </div>

                <div
                    className="py-10 lg:col-span-2 lg:col-start-1 
                lg:border-r lg:border-gray-500 dark:lg:border-gray-200 
                lg:pb-16 lg:pr-8 lg:pt-6"
                >
                    {/* Description and details */}
                    <div>
                        <h3 className="sr-only">Description</h3>

                        <div className="space-y-6">
                            <p className="text-base text-gray-900 dark:text-gray-200">
                                {/* Item Description */}
                                {item?.description}
                            </p>
                        </div>
                    </div>

                    <div className="mt-10">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-200">
                            Highlights
                        </h3>

                        <div className="mt-4">
                            <ul
                                role="list"
                                className="list-disc space-y-2 pl-4 text-sm"
                            >
                                {/* Item Highlights */}
                                <li className="text-gray-400">
                                    <span className="text-gray-600 dark:text-gray-200">
                                        Item Highlight 1
                                    </span>
                                </li>
                                <li className="text-gray-400">
                                    <span className="text-gray-600 dark:text-gray-200">
                                        Item Highlight 1
                                    </span>
                                </li>
                                <li className="text-gray-400">
                                    <span className="text-gray-600 dark:text-gray-200">
                                        Item Highlight 1
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    
                    {item?.item?.dishDetails?.ingredients &&
                    <div className="mt-10">
                        <h2 className="text-sm font-medium text-gray-900 dark:text-gray-50">
                            Details
                        </h2>
                        
                        <div className="mt-4 space-y-6">
                            <p className="text-sm text-gray-600 dark:text-gray-200">
                                {/* Product Details */}
                                {item?.dishDetails?.ingredients}
                            </p>
                        </div>
                    </div>
                    }
                </div>
            </div>
        </>
    );
};

export default ItemContainer;
