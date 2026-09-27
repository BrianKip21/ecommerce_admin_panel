export default function EmptyState({ title = "Nothing here yet", subtitle, action }) {
    return (
        <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
            <p className="text-[14px] text-neutral-500">{title}</p>
            {subtitle && <p className="text-[12px] text-neutral-400">{subtitle}</p>}
            {action}
        </div>
    );
}
