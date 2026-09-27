// Lightweight bar chart, no external chart library — bars sized proportionally
// to each day's revenue within the provided dataset.
export default function SalesChart({ data }) {
    if (!data || data.length === 0) {
        return <p className="py-10 text-center text-[13px] text-neutral-400">No sales data yet.</p>;
    }

    const max = Math.max(...data.map((d) => d.total), 1);

    return (
        <div className="flex h-40 items-end gap-2">
            {data.map((d, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-2">
                    <div
                        className="w-full bg-neutral-900"
                        style={{ height: `${Math.max((d.total / max) * 100, 3)}%` }}
                        title={`KES ${d.total.toLocaleString()}`}
                    />
                    <span className="text-[10px] text-neutral-400">{d.label}</span>
                </div>
            ))}
        </div>
    );
}
