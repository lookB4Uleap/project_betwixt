import { Cart } from "@/types/cart";
import { Button, ButtonGroup } from "@mui/material";
import Image from "next/image";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useContext } from "react";
import { SlidingCartContext } from "@/context/SlidingCartContext";

export default function CartItems() {
    const { cart, onAddToCart, onRemoveFromCart } = useContext(SlidingCartContext);

    return (
        cart &&
        Object.keys(cart).map((id: string, index: number) =>
            !cart || cart[id].quantity === 0 ? (
                <></>
            ) : (
                <li
                    key={cart ? cart[id].item._id : index}
                    className="flex py-6"
                >
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border dark:border-gray-950 border-gray-200">
                        <Image
                            width={100}
                            height={100}
                            src={cart ? cart[id].item.images[0] : ""}
                            alt="Food Image"
                            className="h-full w-full object-cover object-center"
                        />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                        <div>
                            <div className="flex justify-between text-base font-medium dark:text-white text-gray-900">
                                <h3>
                                    {cart && (
                                        <a href={`/item/${cart[id].item._id}`}>
                                            {cart[id].item.dish_name}
                                        </a>
                                    )}
                                </h3>
                                {cart && (
                                    <p className="ml-4">{`${"\u20B9"} ${
                                        cart[id].item.price
                                    }`}</p>
                                )}
                            </div>
                            {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                            {cart && (
                                <p className="dark:text-gray-300 text-gray-500">
                                    Qty {cart[id].quantity}
                                </p>
                            )}

                            <div className="flex">
                                <ButtonGroup
                                    variant="outlined"
                                    aria-label="outlined primary button group"
                                >
                                    <Button
                                        className="border-solid bg-transparent hover:bg-indigo-800 dark:hover:bg-gray-800 dark:hover:opacity-90 dark:border-gray-400"
                                        onClick={e => {
                                            e.preventDefault();
                                            onAddToCart(cart[id].item);
                                        }}
                                    >
                                        <AddIcon
                                            sx={{
                                                fontSize: 15,
                                            }}
                                            className="text-black dark:text-gray-200"
                                        />
                                    </Button>
                                    <Button
                                        className="border-solid bg-indigo-700 dark:bg-transparent hover:bg-indigo-800 dark:hover:bg-gray-800 dark:hover:opacity-90 dark:border-gray-400"
                                        onClick={e => {
                                            e.preventDefault();
                                            onRemoveFromCart(cart[id].item);
                                        }}
                                    >
                                        <RemoveIcon
                                            sx={{ fontSize: 15 }}
                                            className="text-black dark:text-gray-200"
                                        />
                                    </Button>
                                    {/* <div>2</div>s */}
                                </ButtonGroup>
                            </div>
                        </div>
                    </div>
                </li>
            )
        )
    );
}
