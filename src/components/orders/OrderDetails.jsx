import { formatCurrency } from "../../utils/formatCurrency";
import { formatDateTime } from "../../utils/formatDate";
import { OrderStatusBadge, PaymentStatusBadge } from "./OrderStatusBadge";
import Select from "../ui/Select";
import { ORDER_STATUSES } from "../../utils/constants";

export default function OrderDetails({ order, onStatusChange, updating }) {
    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-lg font-medium">Order #{order._id.slice(-8)}</h1>
                    <p className="text-[12px] text-neutral-400">Placed {formatDateTime(order.createdAt)}</p>
                </div>
                <div className="flex items-center gap-3">
                    <OrderStatusBadge status={order.status} />
                    <PaymentStatusBadge status={order.paymentStatus} />
                </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
                <div className="sm:col-span-2 space-y-4">
                    <div className="border border-neutral-200 bg-white">
                        <div className="divide-y divide-neutral-100">
                            {order.items.map((item, i) => (
                                <div key={i} className="flex items-center gap-4 p-4">
                                    <div className="h-14 w-14 shrink-0 overflow-hidden bg-neutral-100">
                                        {item.image && <img src={item.image} alt={item.title} className="h-full w-full object-cover" />}
                                    </div>
                                    <div className="flex-1 text-[13px]">
                                        <p>{item.title}</p>
                                        <p className="text-neutral-400">{item.color} / {item.size} · Qty {item.quantity}</p>
                                    </div>
                                    <p className="text-[13px]">{formatCurrency(item.price * item.quantity)}</p>
                                </div>
                            ))}
                        </div>
                        <div className="border-t border-neutral-200 p-4 text-[13px] space-y-1">
                            <div className="flex justify-between"><span className="text-neutral-500">Subtotal</span><span>{formatCurrency(order.subtotal)}</span></div>
                            <div className="flex justify-between"><span className="text-neutral-500">Shipping</span><span>{order.shippingFee === 0 ? "Free" : formatCurrency(order.shippingFee)}</span></div>
                            <div className="flex justify-between font-medium"><span>Total</span><span>{formatCurrency(order.total)}</span></div>
                        </div>
                    </div>

                    <div className="border border-neutral-200 bg-white p-4 text-[13px]">
                        <p className="mb-2 text-[11px] tracking-[1.5px] text-neutral-400">SHIPPING ADDRESS</p>
                        <p className="leading-relaxed text-neutral-600">
                            {order.shippingAddress.fullName}<br />
                            {order.shippingAddress.address}, {order.shippingAddress.city}<br />
                            {order.shippingAddress.country}<br />
                            {order.shippingAddress.phone}
                        </p>
                    </div>
                </div>

                <div className="border border-neutral-200 bg-white p-4">
                    <p className="mb-3 text-[11px] tracking-[1.5px] text-neutral-400">UPDATE STATUS</p>
                    <Select
                        value={order.status}
                        disabled={updating}
                        onChange={(e) => onStatusChange(e.target.value)}
                    >
                        {ORDER_STATUSES.map((s) => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </Select>
                </div>
            </div>
        </div>
    );
}
