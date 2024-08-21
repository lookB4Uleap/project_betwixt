import { Item } from "../../_types";

export const ItemList = ({ item }: { item: Item }) => {
    return (
        <li className="flex flex-row flex-wrap flex-1 justify-between items-center">
            <div className="flex flex-1 flex-wrap items-start">{item.itemName}</div>
            <div className="flex flex-wrap items-end">
                <div>
                    {"\u20B9"} {item.price}
                </div>
                <div className="ml-3">x{item.quantity}</div>
            </div>
        </li>
    );
};
