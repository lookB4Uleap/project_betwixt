"use client";

import * as React from "react";
import Image from "next/image";
import { Button, ButtonGroup } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Item } from "@/types/item";
import { SlidingCartContext } from "@/context/SlidingCartContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase";

export default function ItemCard(item: Item) {
    const cartContext = React.useContext(SlidingCartContext);
    const [user] = useAuthState(auth);

    return (
        <a className="group hover:cursor-pointer" href={`/item/${item._id}`}>
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <Image
                    // src="https://picsum.photos/seed/picsum/400/400"
                    src={item.images[0] ?? ""}
                    alt="item image"
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                    width={400}
                    height={400}
                />
            </div>
            <div className="flex flex-1 flex-row">
                <div className="flex flex-1 flex-col">
                    <div className="mt-4 text-sm text-gray-700 dark:text-gray-100">
                        {item?.dishName}
                    </div>
                    <div className="mt-1 text-lg font-medium text-gray-900 dark:text-gray-50">
                        {`${"\u20B9"} ${item.price}`}
                    </div>
                </div>
                <div className="flex flex-col items-end justify-between pt-4">
                    <div className="text-gray-700 dark:text-gray-100">
                        Qty {cartContext.cart ? cartContext.cart[item._id]?.quantity ?? 0 : 0}
                    </div>
                    <ButtonGroup
                        variant="outlined"
                        aria-label="outlined primary button group"
                    >
                        <Button
                            className="
                                border-solid 
                                bg-transparent 
                                hover:bg-indigo-800 dark:hover:bg-gray-800 dark:hover:opacity-90
                                dark:border-gray-400
                            "
                            disabled={!!!user} // disabled user without login
                            onClick={(e) => {
                                e.preventDefault();
                                cartContext.onAddToCart(item);
                            }}
                        >
                            <AddIcon
                                sx={{ fontSize: 15 }}
                                className="text-gray-800 dark:text-gray-200"
                            />
                        </Button>
                        <Button
                            className="
                                border-solid 
                                bg-transparent 
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
                                className="text-gray-800 dark:text-gray-200"
                            />
                        </Button>
                        {/* <div>2</div>s */}
                    </ButtonGroup>
                </div>
            </div>
        </a>
    );
}
