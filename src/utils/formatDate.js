export function formatDate(date, options) {
    if (!date) return "—";
    return new Date(date).toLocaleDateString("en-KE", options || {
        year: "numeric",
        month: "short",
        day: "numeric"
    });
}

export function formatDateTime(date) {
    if (!date) return "—";
    return new Date(date).toLocaleString("en-KE", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
}
