"use client";

import React, { useContext, useEffect, useState } from 'react';
import MenuSection from './MenuSection';
import { SlidingCartContext } from '@/context/SlidingCartContext';
import MenuContainerSkeleton from './MenuContainerSkeleton';

type MenuType = {
    [key: string]: any;
}

const sections = ['Lunch', 'Bread', 'Salad', 'Biryani']

function MenuContainer({ menu }: { menu: MenuType}) {
    const cartContext = useContext(SlidingCartContext);

    if(cartContext.loading)
        return <MenuContainerSkeleton />;

    return (
        <div className='min-w-full flex-col'>
            {
                sections.map(
                    section => <MenuSection key={section} header={section} items={menu[section as keyof typeof menu]} />)
            }
            {/* <MenuSection header='Section' />
            <MenuSection header='Section' />
            <MenuSection header='Section' />
            <MenuSection header='Section' /> */}
        </div>
    );
};

export default MenuContainer;