import Badge from "../ui/Badge";
import { ORDER_STATUS_COLORS, PAYMENT_STATUS_COLORS } from "../../utils/constants";

const toneMap = { "badge-neutral": "neutral", "badge-info": "info", "badge-warning": "warning", "badge-success": "success", "badge-error": "error" };

export function OrderStatusBadge({ status }) {
    return <Badge tone={toneMap[ORDER_STATUS_COLORS[status]] || "neutral"}>{status}</Badge>;
}

export function PaymentStatusBadge({ status }) {
    return <Badge tone={toneMap[PAYMENT_STATUS_COLORS[status]] || "neutral"}>{status}</Badge>;
}

export default OrderStatusBadge;
