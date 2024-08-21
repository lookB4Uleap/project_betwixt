import Order from "./_components/Order";

export default function MyOrder({ params }: { params: { orderId: string } }) {
    // console.log("[Order] ", params.orderId);
    return (
        <Order orderId={params.orderId} />
    );
}
