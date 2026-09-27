export default function Spinner({ label }) {
    return (
        <div className="flex flex-col items-center justify-center gap-3 py-20">
            <span className="loading loading-ring loading-md text-neutral-400"></span>
            {label && <p className="text-[12px] text-neutral-400">{label}</p>}
        </div>
    );
}
