export default function Input({ label, error, className = "", ...props }) {
    return (
        <label className="block">
            {label && <span className="mb-1.5 block text-[12px] font-medium text-neutral-600">{label}</span>}
            <input
                className={`h-10 w-full border border-neutral-300 px-3 text-sm outline-none focus:border-neutral-900 ${className}`}
                {...props}
            />
            {error && <span className="mt-1 block text-[12px] text-red-700">{error}</span>}
        </label>
    );
}
