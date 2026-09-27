import Table from "../ui/Table";
import OrderRow from "./OrderRow";
import EmptyState from "../ui/EmptyState";

export default function OrderTable({ orders }) {
    if (!orders || orders.length === 0) {
        return <EmptyState title="No orders found" />;
    }

    return (
        <Table columns={["Order", "Customer", "Date", "Total", "Status", "Payment"]}>
            {orders.map((order) => (
                <OrderRow key={order._id} order={order} />
            ))}
        </Table>
    );
}
