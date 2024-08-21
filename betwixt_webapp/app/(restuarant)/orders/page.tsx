import { Orders } from "./_components/Orders";


export default function MyOrders() {
    return (
        <>
            <div className="
                ml-10 my-10 
                self-start justify-self-start 
                text-3xl font-semibold
                text-gray-950 dark:text-gray-100
            ">Orders</div>
            <div className="flex flex-1 flex-col my-10 justify-start items-center">
                <Orders />
            </div>
        </>
    );
}
