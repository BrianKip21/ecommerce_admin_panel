import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as orderService from "../../services/order.service";
import OrderTable from "../../components/orders/OrderTable";
import OrderFilters from "../../components/orders/OrderFilters";
import Spinner from "../../components/ui/Spinner";

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({ status: "", paymentStatus: "" });

    useEffect(() => {
        orderService.getAllOrders()
            .then((res) => setOrders(res.data))
            .catch((err) => toast.error(err.message))
            .finally(() => setLoading(false));
    }, []);

    const updateFilter = (key, value) => setFilters((f) => ({ ...f, [key]: value }));

    const filtered = orders.filter((o) => {
        if (filters.status && o.status !== filters.status) return false;
        if (filters.paymentStatus && o.paymentStatus !== filters.paymentStatus) return false;
        return true;
    });

    if (loading) return <Spinner />;

    return (
        <div className="space-y-5">
            <h1 className="text-lg font-medium">Orders</h1>
            <OrderFilters status={filters.status} paymentStatus={filters.paymentStatus} onChange={updateFilter} />
            <OrderTable orders={filtered} />
        </div>
    );
}
