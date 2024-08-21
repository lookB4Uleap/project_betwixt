'use server';

import { Cart } from "@/types/cart";
import { cookies } from "next/headers";

export async function getCart() : Promise<Cart|null> {
    const jsonCart = cookies().get('cart')?.value;
    if (!jsonCart)
        return null;
    return JSON.parse(jsonCart);
}

export async function updateCart(cart: Cart) {
    cookies().set('cart', JSON.stringify(cart), {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7,
        path: '/'
    });
}

export async function deleteCart() {
    cookies().delete('cart');
}