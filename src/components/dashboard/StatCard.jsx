export default function StatCard({ label, value, icon: Icon }) {
    return (
        <div className="border border-neutral-200 bg-white p-5">
            <div className="flex items-center justify-between">
                <p className="text-[11px] tracking-[1.5px] text-neutral-400">{label}</p>
                {Icon && <Icon size={16} strokeWidth={1.5} className="text-neutral-300" />}
            </div>
            <p className="mt-2 text-2xl font-medium">{value}</p>
        </div>
    );
}
