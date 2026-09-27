import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import * as orderService from "../../services/order.service";
import OrderDetails from "../../components/orders/OrderDetails";
import Spinner from "../../components/ui/Spinner";

export default function OrderDetailsPage() {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [updating, setUpdating] = useState(false);

    const load = () => {
        orderService.getOrderById(id).then((res) => setOrder(res.data)).catch((err) => toast.error(err.message));
    };

    useEffect(load, [id]);

    const handleStatusChange = async (status) => {
        setUpdating(true);
        try {
            await orderService.updateOrderStatus(id, status);
            toast.success("Order status updated");
            load();
        } catch (err) {
            toast.error(err.message);
        } finally {
            setUpdating(false);
        }
    };

    if (!order) return <Spinner />;

    return <OrderDetails order={order} onStatusChange={handleStatusChange} updating={updating} />;
}
