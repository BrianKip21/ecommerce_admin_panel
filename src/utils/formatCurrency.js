export function formatCurrency(amount, currency = "KES") {
    if (amount == null || isNaN(amount)) return `${currency} 0`;
    return `${currency} ${Number(amount).toLocaleString()}`;
}
