import { useRouter } from "next/navigation";
import { Item, Order } from "../../_types";
import { ItemList } from "./ItemList";

const formatDate = (date: Date) => {
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const format = `${day}/${month}/${year}`;
    return format;
};

export const OrderCard = ({ order }: { order: Order }) => {
    const router = useRouter();

    return (
        <div
            className="
                flex flex-col 
                my-5 mx-2
                p-2
                border-2 border-blue-700  dark:border-gray-50
                rounded-md
                hover:cursor-pointer
                hover:border-gray-400
                hover:bg-gray-400 hover:dark:bg-slate-900
                text-black dark:text-gray-100
            "
            onClick={() => router.push(`/orders/${order._id}`)}
        >
            <div className="flex flex-row flex-wrap">
                <div className="mr-5">#{order._id}</div>
                <div>{formatDate(new Date(order.createdAt))}</div>
            </div>
            <div className="flex flex-row flex-wrap flex-1 items-center justify-between">
                <div>Bill Amount</div>
                <div>
                    {"\u20B9"} {order.totalCost}
                </div>
            </div>
            <ul className="flex flex-col flex-wrap">
                {order.items.map((item: Item) => (
                    <ItemList key={item._id} item={item} />
                ))}
            </ul>
        </div>
    );
};
