import Select from "../ui/Select";
import { ORDER_STATUSES, PAYMENT_STATUSES } from "../../utils/constants";

export default function OrderFilters({ status, paymentStatus, onChange }) {
    return (
        <div className="flex flex-wrap gap-3">
            <Select value={status} onChange={(e) => onChange("status", e.target.value)} className="w-40">
                <option value="">All statuses</option>
                {ORDER_STATUSES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                ))}
            </Select>
            <Select value={paymentStatus} onChange={(e) => onChange("paymentStatus", e.target.value)} className="w-40">
                <option value="">All payments</option>
                {PAYMENT_STATUSES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                ))}
            </Select>
        </div>
    );
}
