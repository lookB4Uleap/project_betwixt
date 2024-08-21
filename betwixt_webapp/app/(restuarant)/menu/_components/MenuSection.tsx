"use client";

import ItemCard from "@/app/(restuarant)/_components/ItemCard";
import { Item } from "@/types/item";
import React, { useRef } from "react";

type Section = {
    header: string;
    items?: any[];
}

function MenuSection(props: Section) {
    // console.log(`[MenuSection] Items ${props.header}`, props.items);

    return (

            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
                    {props.header}
                </h2>

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {
                        props.items?.map((item: Item) => 
                            <ItemCard
                                key={item._id}
                                _id={item._id}
                                description={item.description}
                                dishDetails={item.dish_details}
                                dishName={item.dish_name}
                                price={item.price}
                                types={item.types}
                                images={item.images}                       
                            />
                        )
                    }
                    {/* <ItemCard _id={} />
                    <ItemCard />
                    <ItemCard />
                    <ItemCard />
                    <ItemCard />
                    <ItemCard /> */}
                </div>
            </div>

    );
}

export default MenuSection;
