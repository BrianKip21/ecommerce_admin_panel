export const ORDER_STATUSES = ["pending", "processing", "shipped", "delivered", "cancelled"];

export const PAYMENT_STATUSES = ["pending", "paid", "failed", "refunded"];

export const ORDER_STATUS_COLORS = {
    pending: "badge-neutral",
    processing: "badge-info",
    shipped: "badge-warning",
    delivered: "badge-success",
    cancelled: "badge-error"
};

export const PAYMENT_STATUS_COLORS = {
    pending: "badge-neutral",
    paid: "badge-success",
    failed: "badge-error",
    refunded: "badge-warning"
};

export const LOW_STOCK_THRESHOLD = 5;
