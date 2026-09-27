import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";
import Badge from "../ui/Badge";
import { ORDER_STATUS_COLORS } from "../../utils/constants";

const toneMap = { "badge-neutral": "neutral", "badge-info": "info", "badge-warning": "warning", "badge-success": "success", "badge-error": "error" };

export default function RecentOrders({ orders }) {
    if (!orders || orders.length === 0) {
        return <p className="py-6 text-center text-[13px] text-neutral-400">No orders yet.</p>;
    }

    return (
        <div className="divide-y divide-neutral-100">
            {orders.slice(0, 5).map((order) => (
                <Link
                    key={order._id}
                    to={`/orders/${order._id}`}
                    className="flex items-center justify-between py-3 text-[13px]"
                >
                    <div>
                        <p>#{order._id.slice(-8)}</p>
                        <p className="text-[11px] text-neutral-400">{formatDate(order.createdAt)}</p>
                    </div>
                    <div className="text-right">
                        <p>{formatCurrency(order.total)}</p>
                        <Badge tone={toneMap[ORDER_STATUS_COLORS[order.status]] || "neutral"}>
                            {order.status}
                        </Badge>
                    </div>
                </Link>
            ))}
        </div>
    );
}
