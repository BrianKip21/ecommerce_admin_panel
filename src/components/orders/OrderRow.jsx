import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";
import { OrderStatusBadge, PaymentStatusBadge } from "./OrderStatusBadge";

export default function OrderRow({ order }) {
    return (
        <tr>
            <td className="px-4 py-3">
                <Link to={`/orders/${order._id}`} className="hover:underline">
                    #{order._id.slice(-8)}
                </Link>
            </td>
            <td className="px-4 py-3 text-neutral-500">{order.user?.fullName || "—"}</td>
            <td className="px-4 py-3 text-neutral-500">{formatDate(order.createdAt)}</td>
            <td className="px-4 py-3">{formatCurrency(order.total)}</td>
            <td className="px-4 py-3"><OrderStatusBadge status={order.status} /></td>
            <td className="px-4 py-3"><PaymentStatusBadge status={order.paymentStatus} /></td>
        </tr>
    );
}
