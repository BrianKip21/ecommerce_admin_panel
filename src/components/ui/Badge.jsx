export default function Badge({ children, tone = "neutral" }) {
    const tones = {
        neutral: "bg-neutral-100 text-neutral-600",
        success: "bg-green-100 text-green-700",
        warning: "bg-amber-100 text-amber-700",
        error: "bg-red-100 text-red-700",
        info: "bg-blue-100 text-blue-700"
    };

    return (
        <span className={`inline-block px-2 py-0.5 text-[11px] font-medium ${tones[tone]}`}>
            {children}
        </span>
    );
}
