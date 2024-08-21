"use client";

import Image from "next/image";
import { Item } from "../../../_types";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

export const OrderDetails = ({ item }: { item: Item }) => {
    return (
        <a
            className="
                flex flex-col-reverse
                md:flex-row
                py-5 px-16 
                hover:opacity-80
                text-gray-800 dark:text-gray-100
            "
            target="_blank"
            href={`/item/${item.itemId}`}
        >
            <Image
                src={item.image}
                alt={`Picture of ${item.itemName}`}
                width={220}
                height={220}
                className="rounded-md aspect-square object-cover"
            />
            <div
                className="
                    flex flex-col 
                    justify-evenly
                    pb-5
                    md:p-5 
                "
            >
                <a
                    className="font-bold text-xl hover:text-gray-950 hover:dark:text-gray-400 my-1"
                    target="_blank"
                    href={`/item/${item.itemId}`}
                >
                    {item.itemName} {<OpenInNewIcon />}
                </a>
                <div className="flex flex-row items-start justify-between my-1">
                    <div className="mr-5">Price</div>
                    <div>
                        {"\u20B9"}
                        {item.price}
                    </div>
                </div>
                <div className="flex flex-row items-start justify-between my-1">
                    <div>Quantity</div>
                    <div>{item.quantity}</div>
                </div>
            </div>
        </a>
    );
};
